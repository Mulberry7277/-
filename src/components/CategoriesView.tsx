import React, { useState } from 'react';
import { Folder, FolderOpen, ChevronRight, ChevronDown, Calendar, Clock, ArrowLeft } from 'lucide-react';
import { useBlog } from '../context/BlogContext';

export const CategoriesView: React.FC = () => {
  const { posts, viewPost, filterCategory, setFilterCategory } = useBlog();
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});

  // Group posts by primary and sub categories
  const categoryMap: Record<string, typeof posts> = {};
  posts.forEach(post => {
    post.categories.forEach(cat => {
      if (!categoryMap[cat]) categoryMap[cat] = [];
      categoryMap[cat].push(post);
    });
  });

  const categories = Object.keys(categoryMap).sort();

  const toggleCategory = (cat: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [cat]: !prev[cat]
    }));
  };

  // If a specific category was clicked from a post card
  if (filterCategory) {
    const matchedPosts = categoryMap[filterCategory] || [];
    return (
      <div className="bg-white dark:bg-[#212124] border border-slate-200/80 dark:border-zinc-800 rounded-xl p-6 sm:p-8">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200 dark:border-zinc-800">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setFilterCategory(null)}
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 dark:hover:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              title="Back to all categories"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                Category
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-zinc-100">
                {filterCategory}
              </h2>
            </div>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400 font-mono">
            {matchedPosts.length} posts
          </span>
        </div>

        <div className="space-y-4">
          {matchedPosts.map(post => (
            <div
              key={post.id}
              id={`cat-post-${post.id}`}
              onClick={() => viewPost(post.id)}
              className="p-4 rounded-xl border border-slate-200/70 dark:border-zinc-800/80 hover:border-cyan-500/40 bg-slate-50/40 dark:bg-zinc-900/30 cursor-pointer transition-all group"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold text-slate-800 dark:text-zinc-200 group-hover:text-cyan-500 transition-colors">
                  {post.title}
                </h3>
                <span className="text-xs text-slate-400 dark:text-zinc-500 shrink-0 ml-3">
                  {post.date}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1 line-clamp-2">
                {post.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-[#212124] border border-slate-200/80 dark:border-zinc-800 rounded-xl p-6 sm:p-8">
      <div className="mb-6 pb-4 border-b border-slate-200 dark:border-zinc-800">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-zinc-100 tracking-tight">
          Categories ({categories.length})
        </h2>
        <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">
          Explore articles categorized by domain and topic
        </p>
      </div>

      <div className="space-y-3">
        {categories.map(cat => {
          const catPosts = categoryMap[cat];
          const isExpanded = expandedCategories[cat] !== false; // default open

          return (
            <div
              key={cat}
              className="border border-slate-200/80 dark:border-zinc-800 rounded-xl overflow-hidden bg-slate-50/40 dark:bg-zinc-900/30"
            >
              {/* Category Header Card */}
              <button
                id={`category-item-${cat}`}
                onClick={() => toggleCategory(cat)}
                className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-slate-100/70 dark:hover:bg-zinc-800/60 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  {isExpanded ? (
                    <FolderOpen className="w-4 h-4 text-cyan-500" />
                  ) : (
                    <Folder className="w-4 h-4 text-slate-400 dark:text-zinc-500" />
                  )}
                  <span className="text-sm font-bold text-slate-800 dark:text-zinc-200">
                    {cat}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-slate-200/80 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400 font-mono">
                    {catPosts.length}
                  </span>
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  )}
                </div>
              </button>

              {/* Sub Post List */}
              {isExpanded && (
                <div className="px-4 py-2 border-t border-slate-200/60 dark:border-zinc-800/60 bg-white/60 dark:bg-zinc-900/50 divide-y divide-slate-100 dark:divide-zinc-800/50">
                  {catPosts.map(post => (
                    <div
                      key={post.id}
                      onClick={() => viewPost(post.id)}
                      className="py-2.5 flex items-center justify-between text-xs cursor-pointer group hover:text-cyan-500"
                    >
                      <span className="font-medium text-slate-700 dark:text-zinc-300 group-hover:text-cyan-500 transition-colors truncate max-w-[70%]">
                        {post.title}
                      </span>
                      <div className="flex items-center gap-2 text-slate-400 dark:text-zinc-500 shrink-0">
                        <Calendar className="w-3 h-3" />
                        <span>{post.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
