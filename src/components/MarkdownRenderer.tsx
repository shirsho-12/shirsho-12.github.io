import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import "katex/dist/katex.min.css";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

interface CodeProps {
  node: any;
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const MarkdownRenderer = ({
  content,
  className = "",
}: MarkdownRendererProps) => {
  const processedContent = content.replace(/{%\s*include.*?%}/g, "");

  const baseUrl = import.meta.env.BASE_URL || "/";
  const processedWithImagePaths = processedContent.replace(
    /!\[(.*?)\]\((?!http)(.*?)\)/g,
    (match, alt, path) => {
      const newPath = path.startsWith("/")
        ? `${baseUrl}${path.substring(1)}`
        : `${baseUrl}${path}`;
      return `![${alt}](${newPath})`;
    }
  );

  return (
    <div
      className={`prose prose-slate dark:prose-invert max-w-none ${className}`}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeRaw, rehypeKatex]}
        components={{
          h1: ({ node, ...props }) => <h1 className="heading-1" {...props} />,
          h2: ({ node, ...props }) => <h2 className="heading-3" {...props} />,
          h3: ({ node, ...props }) => <h3 className="heading-4" {...props} />,
          p: ({ node, ...props }) => <p className="paragraph" {...props} />,
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
              alt={props.alt || "Blog post image"}
            />
          ),
          ul: ({ node, ...props }) => (
            <ul className="list-disc pl-6 my-4" {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol className="list-decimal pl-6 my-4" {...props} />
          ),
          li: ({ node, ...props }) => <li className="my-1" {...props} />,
          code({ node, inline, className, children, ...props }: CodeProps) {
            const match = /language-(\w+)/.exec(className || "");
            const value = String(children).replace(/\n$/, "");

            if (inline) {
              return (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            }

            return !inline && match ? (
              <SyntaxHighlighter
                language={match[1]}
                PreTag="div"
                {...props}
                style={oneDark}
              >
                {value}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
          blockquote: ({ node, ...props }) => (
            <blockquote
              className="border-l-4 border-teal pl-4 italic my-4 text-gray-600"
              {...props}
            />
          ),
          table: ({ node, ...props }) => (
            <div className="overflow-x-auto my-6">
              <table
                className="min-w-full border-collapse border border-gray-300"
                {...props}
              />
            </div>
          ),
          th: ({ node, ...props }) => (
            <th
              className="border border-gray-300 bg-gray-100 px-4 py-2 text-left"
              {...props}
            />
          ),
          td: ({ node, ...props }) => (
            <td className="border border-gray-300 px-4 py-2" {...props} />
          ),
        }}
      >
        {processedWithImagePaths}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
