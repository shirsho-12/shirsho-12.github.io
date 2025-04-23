
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  return (
    <div className="prose prose-slate max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          h1: ({ node, ...props }) => <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />,
          h2: ({ node, ...props }) => <h2 className="text-2xl font-bold mt-6 mb-3" {...props} />,
          h3: ({ node, ...props }) => <h3 className="text-xl font-bold mt-5 mb-2" {...props} />,
          p: ({ node, ...props }) => <p className="my-4 text-gray-700 leading-relaxed" {...props} />,
          a: ({ node, ...props }) => (
            <a 
              className="text-teal hover:text-teal/80 underline" 
              target="_blank"
              rel="noopener noreferrer"
              {...props} 
            />
          ),
          img: ({ node, ...props }) => (
            <img
              className="rounded-lg my-6 max-w-full mx-auto"
              {...props}
              alt={props.alt || 'Blog post image'}
            />
          ),
          ul: ({ node, ...props }) => <ul className="list-disc pl-6 my-4" {...props} />,
          ol: ({ node, ...props }) => <ol className="list-decimal pl-6 my-4" {...props} />,
          li: ({ node, ...props }) => <li className="my-1" {...props} />,
          code: ({ node, inline, ...props }) =>
            inline ? (
              <code className="bg-gray-100 px-1 py-0.5 rounded text-navy font-mono text-sm" {...props} />
            ) : (
              <code className="block bg-gray-100 p-4 rounded-md overflow-auto font-mono text-sm" {...props} />
            ),
          blockquote: ({ node, ...props }) => (
            <blockquote className="border-l-4 border-teal pl-4 italic my-4 text-gray-600" {...props} />
          ),
          table: ({ node, ...props }) => (
            <div className="overflow-x-auto my-6">
              <table className="min-w-full border-collapse border border-gray-300" {...props} />
            </div>
          ),
          th: ({ node, ...props }) => (
            <th className="border border-gray-300 bg-gray-100 px-4 py-2 text-left" {...props} />
          ),
          td: ({ node, ...props }) => (
            <td className="border border-gray-300 px-4 py-2" {...props} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
