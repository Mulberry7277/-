import React from 'react';
import { 
  Home, FolderTree, Tags, Archive, User, Sun, Moon, 
  Github, Twitter, Mail, Rss, PlusCircle, X, ExternalLink
} from 'lucide-react';
import { useBlog } from '../context/BlogContext';
import { ActiveTab } from '../types';

export const Sidebar: React.FC = () => {
  const { 
    profile, 
    activeTab, 
    navigateTo, 
    posts, 
    theme, 
    toggleTheme, 
    openEditor,
    isMobileSidebarOpen,
    setIsMobileSidebarOpen
  } = useBlog();

  // Calculate unique categories and tags count
  const allCategories = new Set(posts.flatMap(p => p.categories));
  const allTags = new Set(posts.flatMap(p => p.tags));

  const navItems: { tab: ActiveTab; label: string; icon: React.ReactNode; count?: number }[] = [
    { tab: 'home', label: 'HOME', icon: <Home className="w-4 h-4" /> },
    { tab: 'categories', label: 'CATEGORIES', icon: <FolderTree className="w-4 h-4" />, count: allCategories.size },
    { tab: 'tags', label: 'TAGS', icon: <Tags className="w-4 h-4" />, count: allTags.size },
    { tab: 'archives', label: 'ARCHIVES', icon: <Archive className="w-4 h-4" />, count: posts.length },
    { tab: 'about', label: 'ABOUT', icon: <User className="w-4 h-4" /> },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full justify-between p-6 overflow-y-auto">
      {/* Top Profile Section */}
      <div className="flex flex-col items-center text-center">
        {/* Mobile close button */}
        <div className="w-full flex justify-end md:hidden mb-2">
          <button
            id="mobile-sidebar-close"
            onClick={() => setIsMobileSidebarOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Avatar with Chirpy ring & hover effect */}
        <div 
          onClick={() => navigateTo('about')}
          className="relative group cursor-pointer mb-4"
        >
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden ring-4 ring-slate-200 dark:ring-zinc-800 shadow-lg transition-transform duration-300 group-hover:scale-105">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute inset-0 rounded-full bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        </div>

        {/* Site Title */}
        <h1 
          onClick={() => navigateTo('home')}
          className="text-lg font-bold text-slate-900 dark:text-zinc-100 tracking-tight hover:text-cyan-500 cursor-pointer transition-colors"
        >
          {profile.name}
        </h1>

        {/* Subtitle / Bio */}
        <p className="mt-1 text-xs text-slate-500 dark:text-zinc-400 font-normal leading-relaxed max-w-[200px]">
          {profile.title}
        </p>

        {/* Write Post Button */}
        <button
          id="sidebar-new-post-btn"
          onClick={() => openEditor()}
          className="mt-4 flex items-center gap-1.5 px-4 py-2 w-full max-w-[200px] justify-center rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
        >
          <PlusCircle className="w-3.5 h-3.5" />
          <span>New Post</span>
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="my-8 space-y-1.5">
        {navItems.map(item => {
          const isActive = activeTab === item.tab;
          return (
            <button
              key={item.tab}
              id={`nav-link-${item.tab}`}
              onClick={() => navigateTo(item.tab)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-semibold tracking-wider transition-all duration-150 cursor-pointer ${
                isActive
                  ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-l-3 border-cyan-500 font-bold'
                  : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-100 hover:bg-slate-100 dark:hover:bg-zinc-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={isActive ? 'text-cyan-500' : 'text-slate-400 dark:text-zinc-500'}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </div>
              {item.count !== undefined && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-500'
                    : 'bg-slate-100 dark:bg-zinc-800 text-slate-500 dark:text-zinc-500'
                }`}>
                  {item.count}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom Section: Social Icons & Theme Toggle */}
      <div className="pt-4 border-t border-slate-200 dark:border-zinc-800/80">
        {/* Social Icons */}
        <div className="flex items-center justify-center gap-3 mb-4 text-slate-500 dark:text-zinc-400">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-zinc-800 hover:text-slate-900 dark:hover:text-zinc-100 transition-colors"
            title="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href={profile.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-zinc-800 hover:text-slate-900 dark:hover:text-zinc-100 transition-colors"
            title="Twitter / X"
          >
            <Twitter className="w-4 h-4" />
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-zinc-800 hover:text-slate-900 dark:hover:text-zinc-100 transition-colors"
            title="Email"
          >
            <Mail className="w-4 h-4" />
          </a>
          <button
            onClick={() => navigateTo('archives')}
            className="p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-zinc-800 hover:text-slate-900 dark:hover:text-zinc-100 transition-colors cursor-pointer"
            title="Feed / Archives"
          >
            <Rss className="w-4 h-4" />
          </button>
        </div>

        {/* Theme Toggle & Version */}
        <div className="flex items-center justify-between px-2 pt-2 text-xs text-slate-500 dark:text-zinc-500">
          <span className="text-[11px] font-mono">Chirpy v7.2</span>
          <button
            id="theme-toggle-btn"
            onClick={toggleTheme}
            className="flex items-center gap-1.5 p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-600 dark:text-zinc-300 transition-colors cursor-pointer"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-cyan-600" />
            )}
            <span className="text-[11px] uppercase font-semibold">
              {theme === 'dark' ? 'Light' : 'Dark'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Fixed Left Sidebar */}
      <aside className="hidden md:flex flex-col w-64 lg:w-72 shrink-0 border-r border-slate-200 dark:border-zinc-800 bg-white/70 dark:bg-[#18181b]/90 backdrop-blur-md fixed top-0 bottom-0 left-0 z-30">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileSidebarOpen(false)}
          />
          <div className="relative w-72 max-w-[80vw] bg-white dark:bg-[#18181b] shadow-2xl h-full z-10 border-r border-slate-200 dark:border-zinc-800">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
