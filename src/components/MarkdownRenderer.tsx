import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Check, Copy, Info, AlertTriangle, AlertCircle, Sparkles } from 'lucide-react';

interface MarkdownRendererProps {
  content: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  return (
    <div className="markdown-content text-[#333333] dark:text-[#d1d5db] leading-relaxed text-base font-normal">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Custom heading anchors for Table of Contents
          h1: ({ children }) => {
            const id = generateHeadingId(children);
            return (
              <h1 id={id} className="scroll-mt-24 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 mt-8 mb-4 border-b border-slate-200 dark:border-zinc-800 pb-3">
                {children}
              </h1>
            );
          },
          h2: ({ children }) => {
            const id = generateHeadingId(children);
            return (
              <h2 id={id} className="scroll-mt-24 text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 mt-8 mb-4 border-b border-slate-200 dark:border-zinc-800/80 pb-2">
                {children}
              </h2>
            );
          },
          h3: ({ children }) => {
            const id = generateHeadingId(children);
            return (
              <h3 id={id} className="scroll-mt-24 text-lg sm:text-xl font-semibold text-slate-900 dark:text-slate-200 mt-6 mb-3">
                {children}
              </h3>
            );
          },
          p: ({ children }) => (
            <p className="my-4 leading-7 text-slate-700 dark:text-zinc-300">
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className="list-disc pl-6 my-4 space-y-1.5 text-slate-700 dark:text-zinc-300">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal pl-6 my-4 space-y-1.5 text-slate-700 dark:text-zinc-300">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="leading-7">
              {children}
            </li>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              target={href?.startsWith('http') ? '_blank' : undefined}
              rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="text-cyan-600 dark:text-cyan-400 font-medium hover:underline underline-offset-4 decoration-cyan-500/50"
            >
              {children}
            </a>
          ),
          // Chirpy signature callouts: > [!NOTE], > [!TIP], > [!WARNING], > [!DANGER]
          blockquote: ({ children }) => {
            return <CalloutBlock>{children}</CalloutBlock>;
          },
          // Custom code block with copy button and language tag
          code: ({ className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || '');
            const isInline = !match && typeof children === 'string' && !children.includes('\n');

            if (isInline) {
              return (
                <code
                  className="px-1.5 py-0.5 rounded text-sm font-mono bg-slate-100 dark:bg-zinc-800 text-cyan-700 dark:text-cyan-300 border border-slate-200 dark:border-zinc-700"
                  {...props}
                >
                  {children}
                </code>
              );
            }

            const codeString = String(children).replace(/\n$/, '');
            const language = match ? match[1] : 'text';

            return (
              <CodeBlock code={codeString} language={language} />
            );
          },
          table: ({ children }) => (
            <div className="overflow-x-auto my-6 border border-slate-200 dark:border-zinc-800 rounded-lg">
              <table className="min-w-full text-left text-sm divide-y divide-slate-200 dark:divide-zinc-800">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-slate-50 dark:bg-zinc-800/80 text-slate-800 dark:text-zinc-200 font-semibold">
              {children}
            </thead>
          ),
          tbody: ({ children }) => (
            <tbody className="divide-y divide-slate-200 dark:divide-zinc-800/60 bg-white dark:bg-zinc-900/40">
              {children}
            </tbody>
          ),
          tr: ({ children }) => (
            <tr className="hover:bg-slate-50/60 dark:hover:bg-zinc-800/40 transition-colors">
              {children}
            </tr>
          ),
          th: ({ children }) => (
            <th className="px-4 py-3 font-semibold text-slate-900 dark:text-zinc-100">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-4 py-3 text-slate-700 dark:text-zinc-300">
              {children}
            </td>
          ),
          hr: () => (
            <hr className="my-8 border-slate-200 dark:border-zinc-800" />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

// Helper to generate consistent heading IDs
function generateHeadingId(children: React.ReactNode): string {
  const text = extractText(children);
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s\u4e00-\u9fa5-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function extractText(node: React.ReactNode): string {
  if (typeof node === 'string') return node;
  if (typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(extractText).join('');
  if (node && typeof node === 'object' && 'props' in node && (node as any).props?.children) {
    return extractText((node as any).props.children);
  }
  return '';
}

// Chirpy Callout Component
const CalloutBlock: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const textContent = extractText(children);

  let type: 'note' | 'tip' | 'warning' | 'danger' | 'default' = 'default';
  let cleanContent = children;

  if (textContent.includes('[!NOTE]')) {
    type = 'note';
  } else if (textContent.includes('[!TIP]')) {
    type = 'tip';
  } else if (textContent.includes('[!WARNING]')) {
    type = 'warning';
  } else if (textContent.includes('[!DANGER]')) {
    type = 'danger';
  }

  // Remove the callout marker from display if present
  const renderCalloutBody = (nodes: React.ReactNode): React.ReactNode => {
    if (typeof nodes === 'string') {
      return nodes
        .replace(/\[!(NOTE|TIP|WARNING|DANGER)\]/gi, '')
        .trim();
    }
    if (Array.isArray(nodes)) {
      return nodes.map((child, idx) => (
        <React.Fragment key={idx}>{renderCalloutBody(child)}</React.Fragment>
      ));
    }
    if (nodes && typeof nodes === 'object' && 'props' in nodes && (nodes as any).props?.children) {
      const childProps = (nodes as any).props;
      return React.cloneElement(nodes as React.ReactElement, {
        ...childProps,
        children: renderCalloutBody(childProps.children),
      });
    }
    return nodes;
  };

  const configs = {
    note: {
      border: 'border-l-4 border-blue-500',
      bg: 'bg-blue-50/70 dark:bg-blue-950/25',
      text: 'text-blue-900 dark:text-blue-300',
      icon: <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />,
      title: '提示 (NOTE)',
    },
    tip: {
      border: 'border-l-4 border-emerald-500',
      bg: 'bg-emerald-50/70 dark:bg-emerald-950/25',
      text: 'text-emerald-900 dark:text-emerald-300',
      icon: <Sparkles className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />,
      title: '技巧 (TIP)',
    },
    warning: {
      border: 'border-l-4 border-amber-500',
      bg: 'bg-amber-50/70 dark:bg-amber-950/25',
      text: 'text-amber-900 dark:text-amber-300',
      icon: <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />,
      title: '警告 (WARNING)',
    },
    danger: {
      border: 'border-l-4 border-rose-500',
      bg: 'bg-rose-50/70 dark:bg-rose-950/25',
      text: 'text-rose-900 dark:text-rose-300',
      icon: <AlertCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />,
      title: '危险 (DANGER)',
    },
    default: {
      border: 'border-l-4 border-slate-300 dark:border-zinc-700',
      bg: 'bg-slate-50 dark:bg-zinc-800/40',
      text: 'text-slate-700 dark:text-zinc-300',
      icon: null,
      title: null,
    },
  };

  const config = configs[type];

  if (type === 'default') {
    return (
      <blockquote className={`my-5 px-4 py-3 rounded-r-md ${config.border} ${config.bg} italic text-slate-600 dark:text-zinc-300`}>
        {children}
      </blockquote>
    );
  }

  return (
    <div className={`my-5 p-4 rounded-r-md ${config.border} ${config.bg} flex gap-3 shadow-xs`}>
      {config.icon}
      <div className="flex-1 min-w-0">
        <div className={`text-xs font-bold tracking-wider mb-1 ${config.text}`}>
          {config.title}
        </div>
        <div className="text-sm text-slate-700 dark:text-zinc-300 [&>p]:my-1">
          {renderCalloutBody(children)}
        </div>
      </div>
    </div>
  );
};

// Code Block with Copy Feedback and Language Badge
const CodeBlock: React.FC<{ code: string; language: string }> = ({ code, language }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="my-5 rounded-lg overflow-hidden border border-slate-200 dark:border-zinc-800 bg-[#1e1e24] text-slate-200 shadow-sm">
      {/* Code Header Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#18181c] border-b border-zinc-800/80 text-xs font-mono text-zinc-400">
        <span className="uppercase font-semibold tracking-wider text-cyan-400">
          {language || 'code'}
        </span>
        <button
          id={`copy-btn-${language}`}
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2 py-1 rounded bg-zinc-800/60 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors text-xs cursor-pointer"
          title="复制到剪贴板"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">已复制!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>复制代码</span>
            </>
          )}
        </button>
      </div>
      {/* Code Body */}
      <div className="p-4 overflow-x-auto font-mono text-sm leading-6 text-zinc-200">
        <pre className="!bg-transparent !p-0 !m-0">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
};
