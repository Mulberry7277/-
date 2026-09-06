import React from 'react';
import { Tag, Calendar, ArrowLeft, Hash } from 'lucide-react';
import { useBlog } from '../context/BlogContext';

export const TagsView: React.FC = () => {
  const { posts, viewPost, filterTag, setFilterTag } = useBlog();

  // Aggregate tags and post counts
  const tagMap: Record<string, typeof posts> = {};
  posts.forEach(post => {
    post.tags.forEach(tag => {
      if (!tagMap[tag]) tagMap[tag] = [];
      tagMap[tag].push(post);
    });
  });

  const tags = Object.keys(tagMap).sort();
  const maxCount = Math.max(...tags.map(t => tagMap[t].length), 1);

  // If a tag is selected
  if (filterTag) {
    const matchedPosts = tagMap[filterTag] || [];
    return (
      <div className="bg-white dark:bg-[#212124] border border-slate-200/80 dark:border-zinc-800 rounded-xl p-6 sm:p-8">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200 dark:border-zinc-800">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setFilterTag(null)}
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 dark:hover:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              title="Back to all tags"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                Tag Filter
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-zinc-100">
                #{filterTag}
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
              id={`tag-post-${post.id}`}
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
          Tags Cloud ({tags.length})
        </h2>
        <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">
          Click any tag to view corresponding technical write-ups
        </p>
      </div>

      {/* Chirpy Tag Cloud with font-size scale */}
      <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 py-4">
        {tags.map(tag => {
          const count = tagMap[tag].length;
          // Scale size from 12px to 18px based on count
          const isHeavy = count >= 2;

          return (
            <button
              key={tag}
              id={`tag-cloud-${tag}`}
              onClick={() => setFilterTag(tag)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                isHeavy
                  ? 'bg-cyan-500/10 dark:bg-cyan-950/30 border-cyan-500/30 text-cyan-700 dark:text-cyan-300 font-semibold'
                  : 'bg-slate-50 dark:bg-zinc-800/60 border-slate-200 dark:border-zinc-700/80 text-slate-700 dark:text-zinc-300 hover:border-cyan-500/40 hover:text-cyan-500'
              }`}
            >
              <Hash className="w-3 h-3 text-cyan-500" />
              <span className="text-xs sm:text-sm">{tag}</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white dark:bg-zinc-900 font-mono text-slate-500 dark:text-zinc-400">
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
