import React from 'react';
import { Pin, Calendar, Folder, Tag } from 'lucide-react';
import { Post } from '../types';
import { useBlog } from '../context/BlogContext';

interface PostCardProps {
  post: Post;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { viewPost, navigateTo } = useBlog();

  return (
    <article
      id={`post-card-${post.id}`}
      className="group relative bg-white dark:bg-[#212124] border border-slate-200/80 dark:border-zinc-800 rounded-xl p-5 sm:p-6 transition-all duration-200 hover:border-cyan-500/40 hover:shadow-md hover:shadow-cyan-500/5"
    >
      {/* Pinned Badge */}
      {post.pin && (
        <div className="flex items-center gap-1 text-[11px] font-semibold text-amber-500 mb-2 tracking-wider">
          <Pin className="w-3.5 h-3.5 fill-amber-500/20 rotate-45" />
          <span>置顶推荐</span>
        </div>
      )}

      {/* Post Title */}
      <h2
        onClick={() => viewPost(post.id)}
        className="text-lg sm:text-xl font-bold text-slate-900 dark:text-zinc-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 cursor-pointer transition-colors leading-snug"
      >
        {post.title}
      </h2>

      {/* Excerpt */}
      <p
        onClick={() => viewPost(post.id)}
        className="mt-2.5 text-sm leading-relaxed text-slate-600 dark:text-zinc-400 line-clamp-2 sm:line-clamp-3 cursor-pointer"
      >
        {post.description}
      </p>

      {/* Metadata Bar */}
      <div className="mt-4 pt-4 border-t border-slate-100 dark:border-zinc-800/80 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-slate-500 dark:text-zinc-400">
        {/* Date */}
        <div className="flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-slate-400 dark:text-zinc-500" />
          <span>{post.date}</span>
        </div>

        {/* Primary Category */}
        {post.categories && post.categories.length > 0 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigateTo('categories', { category: post.categories[0] });
            }}
            className="flex items-center gap-1.5 hover:text-cyan-500 transition-colors cursor-pointer"
          >
            <Folder className="w-3.5 h-3.5 text-slate-400 dark:text-zinc-500" />
            <span>{post.categories.join(' / ')}</span>
          </button>
        )}

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="hidden sm:flex items-center gap-1.5 ml-auto">
            <Tag className="w-3 h-3 text-slate-400 dark:text-zinc-500" />
            <div className="flex items-center gap-1">
              {post.tags.slice(0, 3).map(tag => (
                <button
                  key={tag}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateTo('tags', { tag });
                  }}
                  className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-zinc-800 hover:bg-cyan-500/10 hover:text-cyan-500 transition-colors text-[11px] text-slate-600 dark:text-zinc-400 cursor-pointer"
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
};
