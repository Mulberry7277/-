import React from 'react';
import { Menu, Search, Plus, Sparkles, Command } from 'lucide-react';
import { useBlog } from '../context/BlogContext';

export const TopBar: React.FC = () => {
  const { 
    activeTab, 
    selectedPost, 
    navigateTo, 
    setIsSearchOpen, 
    setIsMobileSidebarOpen,
    openEditor,
    profile
  } = useBlog();

  const getBreadcrumb = () => {
    if (selectedPost) {
      return (
        <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-zinc-400">
          <button 
            onClick={() => navigateTo('home')} 
            className="hover:text-cyan-500 transition-colors cursor-pointer"
          >
            首页
          </button>
          <span>/</span>
          {selectedPost.categories?.[0] && (
            <>
              <button 
                onClick={() => navigateTo('categories', { category: selectedPost.categories[0] })}
                className="hover:text-cyan-500 transition-colors cursor-pointer"
              >
                {selectedPost.categories[0]}
              </button>
              <span>/</span>
            </>
          )}
          <span className="text-slate-800 dark:text-zinc-200 truncate max-w-[150px] sm:max-w-[280px]">
            {selectedPost.title}
          </span>
        </div>
      );
    }

    const titles: Record<string, string> = {
      home: '最新文章',
      categories: '分类目录',
      tags: '标签索引',
      archives: '时间归档',
      about: '关于博主',
    };

    return (
      <div className="flex items-center gap-2">
        <span className="text-sm font-bold text-slate-800 dark:text-zinc-200">
          {titles[activeTab] || activeTab}
        </span>
      </div>
    );
  };

  return (
    <header className="sticky top-0 z-20 w-full h-14 border-b border-slate-200/80 dark:border-zinc-800/80 bg-white/80 dark:bg-[#1b1b1e]/80 backdrop-blur-md px-4 sm:px-8 flex items-center justify-between">
      {/* Left: Mobile Toggle & Breadcrumbs */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          id="mobile-menu-toggle"
          onClick={() => setIsMobileSidebarOpen(true)}
          className="md:hidden p-1.5 rounded-lg text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
          aria-label="切换侧边栏"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="min-w-0">
          {getBreadcrumb()}
        </div>
      </div>

      {/* Right: Search Button & Actions */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Search Bar / Trigger (Iconic Chirpy feature) */}
        <button
          id="search-trigger-btn"
          onClick={() => setIsSearchOpen(true)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700/80 text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-100 hover:border-cyan-500/50 transition-all text-xs cursor-pointer group"
          title="搜索文章 (Ctrl+K 或 /)"
        >
          <Search className="w-3.5 h-3.5 group-hover:text-cyan-500 transition-colors" />
          <span className="hidden sm:inline">搜索文章...</span>
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-white dark:bg-zinc-700 border border-slate-200 dark:border-zinc-600 text-[10px] font-mono text-slate-400 dark:text-zinc-400">
            <Command className="w-2.5 h-2.5" /> K
          </kbd>
        </button>

        {/* New Post Button */}
        <button
          id="topbar-new-post-btn"
          onClick={() => openEditor()}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">写文章</span>
        </button>
      </div>
    </header>
  );
};
