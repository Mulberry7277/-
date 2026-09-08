import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Calendar, Folder, Tag, ArrowRight, FileText } from 'lucide-react';
import { useBlog } from '../context/BlogContext';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, posts, viewPost } = useBlog();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const trimmed = query.trim().toLowerCase();
  const filteredPosts = trimmed
    ? posts.filter(post => {
        return (
          post.title.toLowerCase().includes(trimmed) ||
          post.description.toLowerCase().includes(trimmed) ||
          post.content.toLowerCase().includes(trimmed) ||
          post.categories.some(c => c.toLowerCase().includes(trimmed)) ||
          post.tags.some(t => t.toLowerCase().includes(trimmed))
        );
      })
    : [];

  const handleSelect = (postId: string) => {
    viewPost(postId);
    setIsSearchOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
        onClick={() => setIsSearchOpen(false)}
      />

      {/* Modal Box */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#212124] border border-slate-200 dark:border-zinc-700/80 rounded-2xl shadow-2xl overflow-hidden z-10 animate-in fade-in-0 zoom-in-95 duration-150">
        {/* Search Header */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-200 dark:border-zinc-800 gap-3">
          <Search className="w-5 h-5 text-cyan-500 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            id="search-modal-input"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="搜索文章标题、正文、分类或标签..."
            className="flex-1 bg-transparent text-sm sm:text-base text-slate-900 dark:text-zinc-100 placeholder:text-slate-400 dark:placeholder:text-zinc-500 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono text-slate-400 dark:text-zinc-500 bg-slate-100 dark:bg-zinc-800 rounded border border-slate-200 dark:border-zinc-700">
            ESC 键关闭
          </kbd>
        </div>

        {/* Search Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-3 divide-y divide-slate-100 dark:divide-zinc-800/60">
          {!trimmed ? (
            <div className="py-12 text-center text-slate-500 dark:text-zinc-400">
              <FileText className="w-8 h-8 mx-auto mb-2 text-slate-400 dark:text-zinc-600" />
              <p className="text-sm font-medium">输入关键词搜索文章</p>
              <p className="text-xs text-slate-400 dark:text-zinc-500 mt-1">
                支持检索文章标题、正文 Markdown 内容、分类目录与 #标签
              </p>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="py-12 text-center text-slate-500 dark:text-zinc-400">
              <p className="text-sm font-medium">未找到与 &ldquo;{query}&rdquo; 相关的文章</p>
              <p className="text-xs text-slate-400 dark:text-zinc-500 mt-1">
                请尝试更换关键词后重试
              </p>
            </div>
          ) : (
            <div className="space-y-1">
              <div className="px-3 py-1.5 text-[11px] font-semibold tracking-wider text-slate-400 dark:text-zinc-500">
                共检索到 {filteredPosts.length} 篇文章
              </div>
              {filteredPosts.map(post => (
                <div
                  key={post.id}
                  id={`search-result-${post.id}`}
                  onClick={() => handleSelect(post.id)}
                  className="p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-zinc-800/80 cursor-pointer transition-colors group"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-zinc-100 group-hover:text-cyan-500 transition-colors line-clamp-1">
                      {post.title}
                    </h4>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-500 group-hover:translate-x-1 transition-all shrink-0 ml-2" />
                  </div>
                  <p className="text-xs text-slate-500 dark:text-zinc-400 line-clamp-2 mt-1">
                    {post.description}
                  </p>
                  <div className="flex items-center gap-3 mt-2 text-[11px] text-slate-400 dark:text-zinc-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </span>
                    {post.categories?.[0] && (
                      <span className="flex items-center gap-1 text-cyan-600 dark:text-cyan-400">
                        <Folder className="w-3 h-3" />
                        {post.categories[0]}
                      </span>
                    )}
                    {post.tags?.[0] && (
                      <span className="hidden sm:flex items-center gap-1">
                        <Tag className="w-3 h-3" />
                        #{post.tags[0]}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
