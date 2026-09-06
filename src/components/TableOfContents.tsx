import React, { useEffect, useState } from 'react';
import { ListTree, TrendingUp, Clock } from 'lucide-react';
import { useBlog } from '../context/BlogContext';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ content }) => {
  const { posts, viewPost, selectedPost } = useBlog();
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  // Extract headings from markdown
  useEffect(() => {
    const lines = content.split('\n');
    const items: TocItem[] = [];

    lines.forEach(line => {
      const match = /^(#{1,3})\s+(.+)$/.exec(line);
      if (match) {
        const level = match[1].length;
        const rawText = match[2].trim();
        // Remove markdown formatting like bold, links, code
        const text = rawText
          .replace(/\*\*(.*?)\*\*/g, '$1')
          .replace(/\*(.*?)\*/g, '$1')
          .replace(/\[(.*?)\]\(.*?\)/g, '$1')
          .replace(/`(.*?)`/g, '$1');

        const id = text
          .toLowerCase()
          .trim()
          .replace(/[^\w\s-]/g, '')
          .replace(/[\s_-]+/g, '-')
          .replace(/^-+|-+$/g, '');

        if (id && text) {
          items.push({ id, text, level });
        }
      }
    });

    setHeadings(items);
    if (items.length > 0) {
      setActiveId(items[0].id);
    }
  }, [content]);

  // Track active heading on scroll
  useEffect(() => {
    if (headings.length === 0) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const offset = 120; // top offset buffer

      for (let i = headings.length - 1; i >= 0; i--) {
        const element = document.getElementById(headings[i].id);
        if (element) {
          const top = element.getBoundingClientRect().top + window.scrollY;
          if (scrollY >= top - offset) {
            setActiveId(headings[i].id);
            return;
          }
        }
      }
      setActiveId(headings[0].id);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [headings]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveId(id);
    }
  };

  // Recent posts for right sidebar
  const recentPosts = posts
    .filter(p => p.id !== selectedPost?.id)
    .slice(0, 3);

  return (
    <aside className="w-64 shrink-0 hidden xl:block pl-6">
      <div className="sticky top-20 space-y-8 max-h-[calc(100vh-6rem)] overflow-y-auto pr-2 pb-8 scrollbar-thin">
        {/* TOC Section */}
        {headings.length > 0 && (
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-zinc-400 mb-3 pb-1 border-b border-slate-200 dark:border-zinc-800">
              <ListTree className="w-3.5 h-3.5 text-cyan-500" />
              <span>Contents</span>
            </div>
            <nav className="space-y-1 text-sm">
              {headings.map(item => {
                const isActive = activeId === item.id;
                return (
                  <button
                    key={item.id}
                    id={`toc-item-${item.id}`}
                    onClick={() => scrollToHeading(item.id)}
                    className={`block w-full text-left py-1 text-xs transition-colors duration-150 truncate cursor-pointer ${
                      item.level === 1 ? 'font-medium pl-0' : item.level === 2 ? 'pl-2.5' : 'pl-5'
                    } ${
                      isActive
                        ? 'text-cyan-600 dark:text-cyan-400 font-semibold border-l-2 border-cyan-500 pl-2'
                        : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200'
                    }`}
                    title={item.text}
                  >
                    {item.text}
                  </button>
                );
              })}
            </nav>
          </div>
        )}

        {/* Trending / Recent Posts in Right Panel (Chirpy Style) */}
        {recentPosts.length > 0 && (
          <div className="pt-2">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-zinc-400 mb-3 pb-1 border-b border-slate-200 dark:border-zinc-800">
              <TrendingUp className="w-3.5 h-3.5 text-amber-500" />
              <span>Trending Posts</span>
            </div>
            <div className="space-y-3">
              {recentPosts.map(post => (
                <div
                  key={post.id}
                  id={`recent-post-${post.id}`}
                  onClick={() => viewPost(post.id)}
                  className="group cursor-pointer block"
                >
                  <h4 className="text-xs font-medium text-slate-700 dark:text-zinc-300 group-hover:text-cyan-500 line-clamp-2 leading-relaxed transition-colors">
                    {post.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-400 dark:text-zinc-500">
                    <Clock className="w-3 h-3" />
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readingTime || 5} min</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
