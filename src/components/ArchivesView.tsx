import React from 'react';
import { Calendar, Archive, ArrowUpRight } from 'lucide-react';
import { useBlog } from '../context/BlogContext';

export const ArchivesView: React.FC = () => {
  const { posts, viewPost } = useBlog();

  // Group posts by Year
  const yearMap: Record<string, typeof posts> = {};
  posts.forEach(post => {
    const year = post.date.split('-')[0] || 'Earlier';
    if (!yearMap[year]) yearMap[year] = [];
    yearMap[year].push(post);
  });

  const years = Object.keys(yearMap).sort((a, b) => Number(b) - Number(a));

  return (
    <div className="bg-white dark:bg-[#212124] border border-slate-200/80 dark:border-zinc-800 rounded-xl p-6 sm:p-8">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200 dark:border-zinc-800">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-zinc-100 tracking-tight">
            Archives
          </h2>
          <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">
            Chronological timeline of all published essays & logs
          </p>
        </div>
        <span className="text-xs px-3 py-1 rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400 font-mono">
          Total {posts.length} articles
        </span>
      </div>

      <div className="space-y-10">
        {years.map(year => {
          const yearPosts = yearMap[year];
          return (
            <div key={year} className="relative">
              {/* Year Header */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl font-black text-slate-900 dark:text-zinc-100 font-mono tracking-tight">
                  {year}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-mono font-medium">
                  {yearPosts.length} posts
                </span>
                <div className="flex-1 h-px bg-slate-200 dark:border-zinc-800" />
              </div>

              {/* Timeline list */}
              <div className="relative pl-6 border-l-2 border-slate-200 dark:border-zinc-800 space-y-5">
                {yearPosts.map(post => {
                  const dateParts = post.date.split('-');
                  const monthDay = `${dateParts[1]}/${dateParts[2]}`;

                  return (
                    <div
                      key={post.id}
                      id={`archive-post-${post.id}`}
                      onClick={() => viewPost(post.id)}
                      className="group flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4 cursor-pointer relative"
                    >
                      {/* Timeline dot */}
                      <div className="absolute -left-[31px] top-1.5 w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-zinc-700 group-hover:bg-cyan-500 transition-colors ring-4 ring-white dark:ring-[#212124]" />

                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono text-slate-400 dark:text-zinc-500 shrink-0 w-12">
                          {monthDay}
                        </span>
                        <h4 className="text-sm font-semibold text-slate-800 dark:text-zinc-200 group-hover:text-cyan-500 transition-colors">
                          {post.title}
                        </h4>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-zinc-500 pl-15 sm:pl-0 shrink-0">
                        {post.categories?.[0] && (
                          <span className="text-[11px] px-2 py-0.5 rounded bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400">
                            {post.categories[0]}
                          </span>
                        )}
                        <ArrowUpRight className="w-3.5 h-3.5 text-slate-300 dark:text-zinc-600 group-hover:text-cyan-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
