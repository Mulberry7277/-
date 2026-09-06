import React from 'react';
import { BlogProvider, useBlog } from './context/BlogContext';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { PostCard } from './components/PostCard';
import { PostView } from './components/PostView';
import { CategoriesView } from './components/CategoriesView';
import { TagsView } from './components/TagsView';
import { ArchivesView } from './components/ArchivesView';
import { AboutView } from './components/AboutView';
import { SearchModal } from './components/SearchModal';
import { PostEditorModal } from './components/PostEditorModal';
import { Pin, Filter, X, Heart, ExternalLink, Sparkles } from 'lucide-react';

function BlogMainContent() {
  const { 
    posts, 
    activeTab, 
    selectedPost, 
    filterCategory, 
    filterTag, 
    setFilterCategory, 
    setFilterTag,
    profile,
    openEditor 
  } = useBlog();

  // If reading a specific post
  if (selectedPost) {
    return <PostView post={selectedPost} />;
  }

  // Active secondary tabs
  if (activeTab === 'categories') {
    return <CategoriesView />;
  }
  if (activeTab === 'tags') {
    return <TagsView />;
  }
  if (activeTab === 'archives') {
    return <ArchivesView />;
  }
  if (activeTab === 'about') {
    return <AboutView />;
  }

  // Home Tab: Feed of posts
  let displayedPosts = posts;

  if (filterCategory) {
    displayedPosts = displayedPosts.filter(p => p.categories.includes(filterCategory));
  }
  if (filterTag) {
    displayedPosts = displayedPosts.filter(p => p.tags.includes(filterTag));
  }

  // Pinned posts first, then chronological
  const pinnedPosts = displayedPosts.filter(p => p.pin);
  const regularPosts = displayedPosts.filter(p => !p.pin);
  const sortedPosts = [...pinnedPosts, ...regularPosts];

  return (
    <div className="space-y-6">
      {/* Active Filter Bar (if user filtered by category or tag) */}
      {(filterCategory || filterTag) && (
        <div className="flex items-center justify-between p-3.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-800 dark:text-cyan-300 text-xs">
          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-cyan-500" />
            <span>
              Filtering by {filterCategory ? `category "${filterCategory}"` : `tag "#${filterTag}"`}
            </span>
          </div>
          <button
            onClick={() => {
              setFilterCategory(null);
              setFilterTag(null);
            }}
            className="flex items-center gap-1 px-2 py-0.5 rounded hover:bg-cyan-500/20 transition-colors font-semibold cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
            <span>Clear Filter</span>
          </button>
        </div>
      )}

      {/* Post List Feed */}
      {sortedPosts.length === 0 ? (
        <div className="p-12 text-center bg-white dark:bg-[#212124] border border-slate-200 dark:border-zinc-800 rounded-xl">
          <p className="text-sm font-semibold text-slate-700 dark:text-zinc-300">
            No articles match your current filter.
          </p>
          <button
            onClick={() => {
              setFilterCategory(null);
              setFilterTag(null);
            }}
            className="mt-3 text-xs text-cyan-600 dark:text-cyan-400 hover:underline cursor-pointer"
          >
            Show all articles
          </button>
        </div>
      ) : (
        <div className="space-y-5">
          {sortedPosts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}

function BlogApp() {
  const { profile } = useBlog();

  return (
    <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#1b1b1e] text-slate-900 dark:text-[#cfd0d2] flex flex-col font-sans transition-colors duration-200">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Column */}
      <div className="flex-1 md:ml-64 lg:ml-72 flex flex-col min-h-screen">
        {/* Top Navbar */}
        <TopBar />

        {/* Central Article Container */}
        <main className="flex-1 px-4 sm:px-8 lg:px-12 py-8 max-w-5xl w-full mx-auto">
          <BlogMainContent />
        </main>

        {/* Chirpy Style Minimal Footer */}
        <footer className="border-t border-slate-200/80 dark:border-zinc-800/80 py-6 px-4 sm:px-8 text-center text-xs text-slate-500 dark:text-zinc-500 bg-white/40 dark:bg-zinc-900/30">
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <p>
              © {new Date().getFullYear()}{' '}
              <span className="font-semibold text-slate-700 dark:text-zinc-300">
                {profile.name}
              </span>
              . Some rights reserved.
            </p>
            <p className="flex items-center gap-1">
              <span>Powered by</span>
              <a
                href="https://github.com/cotes2020/jekyll-theme-chirpy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-600 dark:text-cyan-400 font-medium hover:underline inline-flex items-center gap-0.5"
              >
                Jekyll Chirpy
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
              <span>& React 19</span>
            </p>
          </div>
        </footer>
      </div>

      {/* Global Modals */}
      <SearchModal />
      <PostEditorModal />
    </div>
  );
}

export default function App() {
  return (
    <BlogProvider>
      <BlogApp />
    </BlogProvider>
  );
}
