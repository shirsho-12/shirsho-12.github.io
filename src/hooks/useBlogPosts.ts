
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
      const blogFiles = [
        '2020-08-03-lenet5.md',
        '2021-05-30-rl_preface.md',
        '2021-06-20-mc.md',
        '2021-06-25-mc_roulette.md'
      ];
      
      const loadedPosts = await Promise.all(
        blogFiles.map(async (filename) => {
          const content = await import(`../assets/blogs/${filename}`);
          const fileContent = content.default;
          
          const [, frontmatter, ...contentParts] = fileContent.split('---');
          const markdown = contentParts.join('---');
          
          const meta = frontmatter.split('\n').reduce((acc: any, line: string) => {
            const [key, ...values] = line.split(':').map(str => str.trim());
            if (key && values.length) {
              if (key === 'tags') {
                acc[key] = values.join(':').replace(/[\[\]]/g, '').split(',').map(tag => tag.trim());
              } else {
                acc[key] = values.join(':');
              }
            }
            return acc;
          }, {});

          const dateMatch = filename.match(/^\d{4}-\d{2}-\d{2}/);
          const date = dateMatch ? dateMatch[0] : '';
          
          return {
            id: filename.replace('.md', ''),
            title: meta.title || '',
            subtitle: meta.subtitle || '',
            date,
            tags: meta.tags || [],
            content: markdown.trim()
          };
        })
      );
      
      loadedPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setPosts(loadedPosts);
      setLoading(false);
    };

    loadBlogPosts();
  }, []);

  return { posts, loading };
};
