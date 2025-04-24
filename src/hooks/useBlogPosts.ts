
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
        // Get the list of all markdown files in the blogs directory
        const blogModules = import.meta.glob('../assets/blogs/*.md', { as: 'raw' });
        
        const loadedPosts: BlogPost[] = [];
        
        for (const path in blogModules) {
          try {
            const filename = path.split('/').pop() || '';
            // Load the content as raw text
            const content = await blogModules[path]();
            
            // Extract the date from the filename (YYYY-MM-DD-title.md format)
            const dateMatch = filename.match(/^(\d{4}-\d{2}-\d{2})/);
            const date = dateMatch ? dateMatch[1] : '';
            
            // Split content to separate frontmatter from markdown
            const parts = content.split('---');
            if (parts.length < 3) {
              console.error(`Invalid markdown format in ${filename}`);
              continue;
            }
            
            // Extract frontmatter (it's the second part after the first ---)
            const frontmatter = parts[1];
            // Join the rest as content (in case there are more --- in the content)
            const markdown = parts.slice(2).join('---');
            
            // Parse frontmatter
            const meta: Record<string, any> = {};
            frontmatter.split('\n').forEach((line: string) => {
              if (!line.trim()) return;
              
              const colonIndex = line.indexOf(':');
              if (colonIndex === -1) return;
              
              const key = line.slice(0, colonIndex).trim();
              let value = line.slice(colonIndex + 1).trim();
              
              // Handle tags which are in [tag1, tag2] format
              if (key === 'tags') {
                const match = value.match(/\[(.*)\]/);
                if (match && match[1]) {
                  value = match[1];
                }
                meta[key] = value.split(',').map((tag: string) => tag.trim());
              } else {
                meta[key] = value;
              }
            });

            loadedPosts.push({
              id: filename.replace('.md', ''),
              title: meta.title || '',
              subtitle: meta.subtitle || '',
              date: date,
              tags: meta.tags || [],
              content: markdown.trim()
            });
          } catch (error) {
            console.error(`Error loading blog post ${path}:`, error);
          }
        }
        
        // Sort by date (newest first)
        loadedPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        
        setPosts(loadedPosts);
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
