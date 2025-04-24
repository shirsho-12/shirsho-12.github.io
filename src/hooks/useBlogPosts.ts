
import { useState, useEffect } from "react";

interface BlogPost {
  id: string;
  title: string;
  subtitle?: string;
  date: string;
  tags: string[];
  content: string;
}

export const useBlogPosts = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBlogPosts = async () => {
      try {
        // Define the list of blog posts to load
        const blogFiles = [
          '2020-08-03-lenet5.md',
          '2021-05-30-rl_preface.md',
          '2021-06-20-mc.md',
          '2021-06-25-mc_roulette.md'
        ];
        
        const loadedPosts = await Promise.all(
          blogFiles.map(async (filename) => {
            try {
              // Dynamic import to load the markdown content
              const content = await import(`../assets/blogs/${filename}`);
              const fileContent = content.default;
              
              // Split content to separate frontmatter from markdown
              const parts = fileContent.split('---');
              if (parts.length < 3) {
                console.error(`Invalid markdown format in ${filename}`);
                return null;
              }
              
              // Extract frontmatter (it's the second part after the first ---)
              const frontmatter = parts[1];
              // Join the rest as content (in case there are more --- in the content)
              const markdown = parts.slice(2).join('---');
              
              // Parse frontmatter into an object
              const meta = frontmatter.split('\n').reduce((acc: any, line: string) => {
                if (!line.trim()) return acc;
                
                const colonIndex = line.indexOf(':');
                if (colonIndex === -1) return acc;
                
                const key = line.slice(0, colonIndex).trim();
                let value = line.slice(colonIndex + 1).trim();
                
                // Handle special cases like tags which are in [tag1, tag2] format
                if (key === 'tags') {
                  // Extract values between [ and ]
                  const match = value.match(/\[(.*)\]/);
                  if (match && match[1]) {
                    value = match[1];
                  }
                  acc[key] = value.split(',').map((tag: string) => tag.trim());
                } else {
                  acc[key] = value;
                }
                
                return acc;
              }, {});

              // Extract date from filename (format: YYYY-MM-DD-title.md)
              const dateMatch = filename.match(/^(\d{4}-\d{2}-\d{2})/);
              const date = dateMatch ? dateMatch[1] : '';
              
              return {
                id: filename.replace('.md', ''),
                title: meta.title || '',
                subtitle: meta.subtitle || '',
                date,
                tags: meta.tags || [],
                content: markdown.trim()
              };
            } catch (error) {
              console.error(`Error loading blog post ${filename}:`, error);
              return null;
            }
          })
        );
        
        // Filter out null values and sort by date (newest first)
        const validPosts = loadedPosts.filter(Boolean) as BlogPost[];
        validPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        
        setPosts(validPosts);
      } catch (error) {
        console.error("Error loading blog posts:", error);
      } finally {
        setLoading(false);
      }
    };

    loadBlogPosts();
  }, []);

  return { posts, loading };
};
