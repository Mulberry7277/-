import React, { useState } from 'react';
import { 
  Calendar, Clock, Eye, Folder, Tag, Share2, Edit3, Trash2, Pin, 
  ArrowLeft, ArrowRight, MessageSquare, Send, Check, Sparkles, ExternalLink, Bookmark
} from 'lucide-react';
import { Post } from '../types';
import { useBlog } from '../context/BlogContext';
import { MarkdownRenderer } from './MarkdownRenderer';
import { TableOfContents } from './TableOfContents';

interface PostViewProps {
  post: Post;
}

export const PostView: React.FC<PostViewProps> = ({ post }) => {
  const { 
    posts, 
    viewPost, 
    navigateTo, 
    openEditor, 
    deletePost, 
    togglePin, 
    comments, 
    addComment,
    profile 
  } = useBlog();

  const [authorName, setAuthorName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Comments for this post
  const postComments = comments.filter(c => c.postId === post.id);

  // Prev and Next posts
  const currentIndex = posts.findIndex(p => p.id === post.id);
  const prevPost = currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? posts[currentIndex - 1] : null;

  // Related posts (matching categories or tags)
  const relatedPosts = posts
    .filter(p => p.id !== post.id && (
      p.categories.some(c => post.categories.includes(c)) ||
      p.tags.some(t => post.tags.includes(t))
    ))
    .slice(0, 2);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    addComment(post.id, authorName, commentText);
    setCommentText('');
  };

  const wordCount = post.content ? post.content.trim().split(/\s+/).length : 0;

  // Export Jekyll Markdown Frontmatter
  const handleExportMarkdown = () => {
    const frontmatter = `---
title: "${post.title.replace(/"/g, '\\"')}"
date: ${post.date} 12:00:00 +0800
categories: [${post.categories.map(c => `"${c}"`).join(', ')}]
tags: [${post.tags.map(t => `"${t}"`).join(', ')}]
pin: ${post.pin ? 'true' : 'false'}
description: "${post.description.replace(/"/g, '\\"')}"
---

${post.content}`;

    const blob = new Blob([frontmatter], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${post.date}-${post.slug || 'post'}.md`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col xl:flex-row gap-8 items-start w-full">
      {/* Main Post Article Area */}
      <article className="flex-1 min-w-0 w-full bg-white dark:bg-[#212124] border border-slate-200/80 dark:border-zinc-800 rounded-xl p-6 sm:p-10 shadow-xs">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 dark:text-zinc-400 mb-6">
          <button
            onClick={() => navigateTo('home')}
            className="hover:text-cyan-500 cursor-pointer"
          >
            Home
          </button>
          <span>/</span>
          {post.categories && post.categories.length > 0 && (
            <>
              <button
                onClick={() => navigateTo('categories', { category: post.categories[0] })}
                className="hover:text-cyan-500 cursor-pointer"
              >
                {post.categories[0]}
              </button>
              <span>/</span>
            </>
          )}
          <span className="text-slate-800 dark:text-zinc-200 truncate max-w-[200px] sm:max-w-md">
            {post.title}
          </span>
        </nav>

        {/* Post Title */}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-zinc-100 tracking-tight leading-tight mb-3">
          {post.title}
        </h1>

        {/* Subtitle */}
        {post.subtitle && (
          <p className="text-base sm:text-lg text-slate-600 dark:text-zinc-400 font-normal mb-6 leading-relaxed">
            {post.subtitle}
          </p>
        )}

        {/* Metadata Bar (Chirpy Style) */}
        <div className="flex flex-wrap items-center gap-y-2 gap-x-4 pb-6 mb-8 border-b border-slate-200 dark:border-zinc-800 text-xs text-slate-500 dark:text-zinc-400">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-cyan-500" />
            <span>Published {post.date}</span>
          </div>

          {post.lastModified && (
            <div className="flex items-center gap-1.5 text-slate-400 dark:text-zinc-500">
              <span>(Updated {post.lastModified})</span>
            </div>
          )}

          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-cyan-500" />
            <span>{post.readingTime || 5} min read</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span>{wordCount} words</span>
          </div>

          {post.views !== undefined && (
            <div className="flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-cyan-500" />
              <span>{post.views} views</span>
            </div>
          )}

          {post.pin && (
            <div className="flex items-center gap-1 text-amber-500 font-medium">
              <Pin className="w-3 h-3 fill-amber-500/20 rotate-45" />
              <span>Pinned</span>
            </div>
          )}

          {/* Quick Action Tools in Header */}
          <div className="flex items-center gap-2 ml-auto">
            <button
              id="header-edit-btn"
              onClick={() => openEditor(post)}
              className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 text-slate-700 dark:text-zinc-300 transition-colors text-xs cursor-pointer"
              title="Edit Post"
            >
              <Edit3 className="w-3 h-3" />
              <span className="hidden sm:inline">Edit</span>
            </button>
            <button
              id="header-pin-btn"
              onClick={() => togglePin(post.id)}
              className={`p-1 rounded text-xs transition-colors cursor-pointer ${
                post.pin
                  ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/30'
                  : 'text-slate-400 hover:text-slate-600 dark:hover:text-zinc-300'
              }`}
              title={post.pin ? 'Unpin post' : 'Pin post'}
            >
              <Pin className="w-3.5 h-3.5" />
            </button>
            <button
              id="header-export-btn"
              onClick={handleExportMarkdown}
              className="flex items-center gap-1 px-2 py-1 rounded bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 text-slate-600 dark:text-zinc-400 transition-colors text-xs cursor-pointer"
              title="Export as Jekyll Markdown"
            >
              <Bookmark className="w-3 h-3" />
              <span className="hidden md:inline">Jekyll .md</span>
            </button>
          </div>
        </div>

        {/* Cover Image (if available) */}
        {post.coverImage && (
          <div className="mb-8 overflow-hidden rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-100 dark:bg-zinc-900 max-h-[440px]">
            <img
              src={post.coverImage}
              alt={post.coverAlt || post.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        )}

        {/* Markdown Post Body */}
        <div className="post-content">
          <MarkdownRenderer content={post.content} />
        </div>

        {/* Post Tags Footer */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-10 pt-6 border-t border-slate-200 dark:border-zinc-800 flex flex-wrap items-center gap-2">
            <Tag className="w-3.5 h-3.5 text-slate-400 dark:text-zinc-500 mr-1" />
            {post.tags.map(tag => (
              <button
                key={tag}
                id={`tag-badge-${tag}`}
                onClick={() => navigateTo('tags', { tag })}
                className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-zinc-800 hover:bg-cyan-500/10 hover:text-cyan-500 dark:hover:text-cyan-400 text-xs font-medium text-slate-700 dark:text-zinc-300 transition-colors cursor-pointer"
              >
                #{tag}
              </button>
            ))}
          </div>
        )}

        {/* Share & Actions Toolbar */}
        <div className="mt-6 p-4 rounded-xl bg-slate-50 dark:bg-zinc-900/60 border border-slate-200/80 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-zinc-400">
              Share:
            </span>
            <button
              id="copy-link-btn"
              onClick={handleCopyLink}
              className="flex items-center gap-1 px-3 py-1.5 rounded bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-xs font-medium text-slate-700 dark:text-zinc-200 hover:border-cyan-500 transition-colors cursor-pointer"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Copy Link</span>
                </>
              )}
            </button>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-3 py-1.5 rounded bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-xs font-medium text-slate-700 dark:text-zinc-200 hover:border-cyan-500 transition-colors cursor-pointer"
            >
              <span>Twitter / X</span>
            </a>
          </div>

          <div className="flex items-center gap-3">
            <button
              id="delete-post-btn"
              onClick={() => setShowDeleteConfirm(true)}
              className="flex items-center gap-1 px-3 py-1.5 rounded text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-xs font-medium transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete Post</span>
            </button>
          </div>
        </div>

        {/* Delete Confirmation Dialog */}
        {showDeleteConfirm && (
          <div className="mt-4 p-4 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-sm">
            <p className="text-rose-900 dark:text-rose-200 font-medium mb-3">
              Are you sure you want to delete this post? This action cannot be undone.
            </p>
            <div className="flex items-center gap-3">
              <button
                id="confirm-delete-btn"
                onClick={() => deletePost(post.id)}
                className="px-3 py-1.5 rounded bg-rose-600 hover:bg-rose-700 text-white text-xs font-medium cursor-pointer"
              >
                Yes, Delete
              </button>
              <button
                id="cancel-delete-btn"
                onClick={() => setShowDeleteConfirm(false)}
                className="px-3 py-1.5 rounded bg-slate-200 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 text-xs font-medium cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Post Navigation: Previous & Next */}
        <div className="mt-8 pt-8 border-t border-slate-200 dark:border-zinc-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {prevPost ? (
            <button
              id={`nav-prev-${prevPost.id}`}
              onClick={() => viewPost(prevPost.id)}
              className="text-left p-4 rounded-xl border border-slate-200 dark:border-zinc-800 hover:border-cyan-500/50 dark:hover:border-cyan-500/40 bg-slate-50/50 dark:bg-zinc-900/40 transition-all group cursor-pointer"
            >
              <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-zinc-400 mb-1">
                <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                <span>Previous Post</span>
              </div>
              <h4 className="text-sm font-semibold text-slate-800 dark:text-zinc-200 group-hover:text-cyan-500 line-clamp-1">
                {prevPost.title}
              </h4>
            </button>
          ) : (
            <div />
          )}

          {nextPost ? (
            <button
              id={`nav-next-${nextPost.id}`}
              onClick={() => viewPost(nextPost.id)}
              className="text-right p-4 rounded-xl border border-slate-200 dark:border-zinc-800 hover:border-cyan-500/50 dark:hover:border-cyan-500/40 bg-slate-50/50 dark:bg-zinc-900/40 transition-all group cursor-pointer"
            >
              <div className="flex items-center justify-end gap-1.5 text-xs text-slate-500 dark:text-zinc-400 mb-1">
                <span>Next Post</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
              <h4 className="text-sm font-semibold text-slate-800 dark:text-zinc-200 group-hover:text-cyan-500 line-clamp-1">
                {nextPost.title}
              </h4>
            </button>
          ) : (
            <div />
          )}
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-10 pt-8 border-t border-slate-200 dark:border-zinc-800">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400 mb-4">
              Related Posts
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedPosts.map(rel => (
                <div
                  key={rel.id}
                  id={`related-post-${rel.id}`}
                  onClick={() => viewPost(rel.id)}
                  className="p-4 rounded-xl border border-slate-200 dark:border-zinc-800 hover:border-cyan-500/40 bg-slate-50/40 dark:bg-zinc-900/30 cursor-pointer transition-colors group"
                >
                  <span className="text-[11px] text-cyan-600 dark:text-cyan-400 font-medium">
                    {rel.categories.join(' / ')}
                  </span>
                  <h4 className="text-sm font-semibold text-slate-800 dark:text-zinc-200 group-hover:text-cyan-500 line-clamp-2 mt-1">
                    {rel.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-2 text-xs text-slate-400 dark:text-zinc-500">
                    <span>{rel.date}</span>
                    <span>•</span>
                    <span>{rel.readingTime || 5} min read</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Comments Section (Chirpy / Giscus Style) */}
        <section className="mt-12 pt-8 border-t border-slate-200 dark:border-zinc-800">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-cyan-500" />
              <h3 className="text-base font-bold text-slate-900 dark:text-zinc-100">
                Comments ({postComments.length})
              </h3>
            </div>
            <span className="text-xs text-slate-500 dark:text-zinc-500">
              Join the conversation
            </span>
          </div>

          {/* New Comment Input */}
          <form onSubmit={handleCommentSubmit} className="mb-8 p-4 rounded-xl bg-slate-50 dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                id="comment-author-input"
                placeholder="Your Name / GitHub Username"
                value={authorName}
                onChange={e => setAuthorName(e.target.value)}
                className="px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-800 dark:text-zinc-200 focus:outline-none focus:border-cyan-500"
              />
            </div>
            <textarea
              id="comment-content-input"
              placeholder="Leave a comment (supports thoughts, feedback, or questions)..."
              value={commentText}
              onChange={e => setCommentText(e.target.value)}
              rows={3}
              required
              className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-800 dark:text-zinc-200 focus:outline-none focus:border-cyan-500 resize-y"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                id="comment-submit-btn"
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Post Comment</span>
              </button>
            </div>
          </form>

          {/* Comments List */}
          <div className="space-y-4">
            {postComments.length === 0 ? (
              <p className="text-center py-6 text-xs text-slate-500 dark:text-zinc-500 italic">
                No comments yet. Be the first to share your thoughts!
              </p>
            ) : (
              postComments.map(comment => (
                <div
                  key={comment.id}
                  id={`comment-${comment.id}`}
                  className="p-4 rounded-xl bg-slate-50/70 dark:bg-zinc-900/40 border border-slate-200/80 dark:border-zinc-800/80 flex items-start gap-3"
                >
                  <img
                    src={comment.avatar}
                    alt={comment.author}
                    className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-300 dark:ring-zinc-700 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-xs font-bold text-slate-900 dark:text-zinc-200">
                        {comment.author}
                      </h4>
                      <span className="text-[11px] text-slate-400 dark:text-zinc-500">
                        {comment.date}
                      </span>
                    </div>
                    <p className="text-sm text-slate-700 dark:text-zinc-300 leading-relaxed">
                      {comment.content}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </article>

      {/* Right Column Table of Contents (Desktop Sticky) */}
      <TableOfContents content={post.content} />
    </div>
  );
};
