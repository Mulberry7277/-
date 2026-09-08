import React, { useState, useEffect } from 'react';
import { 
  X, Save, Eye, Edit3, Pin, Image, Tag, Folder, 
  HelpCircle, Download, Sparkles 
} from 'lucide-react';
import { useBlog } from '../context/BlogContext';
import { Post } from '../types';
import { MarkdownRenderer } from './MarkdownRenderer';

export const PostEditorModal: React.FC = () => {
  const { isEditorOpen, setIsEditorOpen, editingPost, savePost } = useBlog();

  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [categoriesInput, setCategoriesInput] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [pin, setPin] = useState(false);
  const [activeTab, setActiveTab] = useState<'write' | 'preview'>('write');

  useEffect(() => {
    if (editingPost) {
      setTitle(editingPost.title || '');
      setSubtitle(editingPost.subtitle || '');
      setCategoriesInput(editingPost.categories?.join(', ') || '');
      setTagsInput(editingPost.tags?.join(', ') || '');
      setDescription(editingPost.description || '');
      setContent(editingPost.content || '');
      setCoverImage(editingPost.coverImage || '');
      setPin(editingPost.pin || false);
    } else {
      // Default template for a new Chirpy post
      setTitle('');
      setSubtitle('');
      setCategoriesInput('技术前沿, 前端开发');
      setTagsInput('chirpy, 博客, 架构');
      setDescription('');
      setContent(`# 欢迎使用 Chirpy 博客写作

在这里输入文章引言或导语。

---

## 一、核心思考

使用简洁纯粹的 Markdown 记录你的技术深度思考。

> [!TIP]
> 支持使用 Chirpy 风格的提示引用块，如 \`> [!TIP]\`、\`> [!NOTE]\` 或 \`> [!WARNING]\`！

\`\`\`typescript
const greeting = "你好，世界！";
console.log(greeting);
\`\`\`
`);
      setCoverImage('https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80');
      setPin(false);
    }
  }, [editingPost, isEditorOpen]);

  if (!isEditorOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const categories = categoriesInput
      .split(',')
      .map(c => c.trim())
      .filter(Boolean);

    const tags = tagsInput
      .split(',')
      .map(t => t.trim().replace(/^#/, ''))
      .filter(Boolean);

    savePost({
      title: title.trim(),
      subtitle: subtitle.trim(),
      categories: categories.length > 0 ? categories : ['综合技术'],
      tags: tags.length > 0 ? tags : ['博客'],
      description: description.trim() || content.slice(0, 150) + '...',
      content,
      coverImage: coverImage.trim() || undefined,
      pin,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
        onClick={() => setIsEditorOpen(false)}
      />

      {/* Editor Modal Window */}
      <div className="relative w-full max-w-4xl h-[92vh] max-h-[900px] bg-white dark:bg-[#212124] border border-slate-200 dark:border-zinc-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-10">
        {/* Editor Top Bar */}
        <div className="px-5 py-3.5 border-b border-slate-200 dark:border-zinc-800 flex items-center justify-between bg-slate-50 dark:bg-zinc-900/50">
          <div className="flex items-center gap-2">
            <Edit3 className="w-4 h-4 text-cyan-500" />
            <h3 className="text-sm font-bold text-slate-800 dark:text-zinc-200">
              {editingPost ? '编辑博文' : '撰写新博文 (Chirpy 规范)'}
            </h3>
          </div>

          <div className="flex items-center gap-3">
            {/* Write / Preview Tab Switcher */}
            <div className="flex items-center p-0.5 rounded-lg bg-slate-200 dark:bg-zinc-800">
              <button
                type="button"
                onClick={() => setActiveTab('write')}
                className={`px-3 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'write'
                    ? 'bg-white dark:bg-zinc-700 text-slate-900 dark:text-zinc-100 shadow-xs'
                    : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <Edit3 className="w-3 h-3" />
                  编辑
                </span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('preview')}
                className={`px-3 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'preview'
                    ? 'bg-white dark:bg-zinc-700 text-slate-900 dark:text-zinc-100 shadow-xs'
                    : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <Eye className="w-3 h-3" />
                  预览
                </span>
              </button>
            </div>

            <button
              onClick={() => setIsEditorOpen(false)}
              className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Editor Form & Scroll Area */}
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
            {/* Title & Pin */}
            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
              <div className="flex-1 w-full">
                <input
                  type="text"
                  id="post-title-input"
                  placeholder="文章标题 (例如：深入解析现代分布式存储体系架构)"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  required
                  className="w-full text-lg sm:text-xl font-bold px-3.5 py-2.5 rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-900 dark:text-zinc-100 placeholder:text-slate-400 dark:placeholder:text-zinc-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <label className="flex items-center gap-2 px-3 py-2.5 rounded-lg border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 cursor-pointer text-xs font-medium text-slate-700 dark:text-zinc-300 shrink-0">
                <input
                  type="checkbox"
                  id="post-pin-checkbox"
                  checked={pin}
                  onChange={e => setPin(e.target.checked)}
                  className="rounded text-cyan-600 focus:ring-cyan-500 w-4 h-4"
                />
                <Pin className="w-3.5 h-3.5 text-amber-500 rotate-45" />
                <span>置顶推荐</span>
              </label>
            </div>

            {/* Subtitle */}
            <input
              type="text"
              id="post-subtitle-input"
              placeholder="副标题 (可选，简要阐述文章核心提要)"
              value={subtitle}
              onChange={e => setSubtitle(e.target.value)}
              className="w-full text-xs sm:text-sm px-3.5 py-2 rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-800 dark:text-zinc-200 placeholder:text-slate-400 dark:placeholder:text-zinc-500 focus:outline-none focus:border-cyan-500"
            />

            {/* Frontmatter row: Categories, Tags, Cover Image */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-500 dark:text-zinc-400 uppercase tracking-wider mb-1">
                  分类目录 (逗号分隔)
                </label>
                <div className="relative">
                  <Folder className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    id="post-categories-input"
                    placeholder="架构设计, 云原生"
                    value={categoriesInput}
                    onChange={e => setCategoriesInput(e.target.value)}
                    className="w-full text-xs pl-8 pr-3 py-2 rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-800 dark:text-zinc-200 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-500 dark:text-zinc-400 uppercase tracking-wider mb-1">
                  文章标签 (逗号分隔)
                </label>
                <div className="relative">
                  <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    id="post-tags-input"
                    placeholder="react, typescript, 性能优化"
                    value={tagsInput}
                    onChange={e => setTagsInput(e.target.value)}
                    className="w-full text-xs pl-8 pr-3 py-2 rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-800 dark:text-zinc-200 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-500 dark:text-zinc-400 uppercase tracking-wider mb-1">
                  封面图 URL (可选)
                </label>
                <div className="relative">
                  <Image className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="url"
                    id="post-cover-input"
                    placeholder="https://images.unsplash.com/..."
                    value={coverImage}
                    onChange={e => setCoverImage(e.target.value)}
                    className="w-full text-xs pl-8 pr-3 py-2 rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-800 dark:text-zinc-200 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>
            </div>

            {/* Content / Preview Area */}
            {activeTab === 'write' ? (
              <div className="flex flex-col h-[320px] sm:h-[380px]">
                <div className="flex items-center justify-between text-xs text-slate-400 dark:text-zinc-500 pb-1.5">
                  <span className="font-mono">Markdown 正文内容 (支持 GFM 规范语法)</span>
                  <span className="text-[11px]">提示：使用 &gt; [!NOTE] 或 &gt; [!TIP] 插入高亮提示框</span>
                </div>
                <textarea
                  id="post-content-textarea"
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  placeholder="使用 Markdown 语法书写你的博文..."
                  className="flex-1 w-full p-4 font-mono text-xs sm:text-sm rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-[#1b1b1e] text-slate-800 dark:text-zinc-200 focus:outline-none focus:border-cyan-500 resize-none leading-relaxed"
                />
              </div>
            ) : (
              <div className="h-[320px] sm:h-[380px] overflow-y-auto p-6 rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-[#1b1b1e]">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-zinc-100 mb-2">
                  {title || '无标题文章'}
                </h1>
                {subtitle && (
                  <p className="text-sm text-slate-600 dark:text-zinc-400 mb-6 italic">
                    {subtitle}
                  </p>
                )}
                <MarkdownRenderer content={content} />
              </div>
            )}
          </div>

          {/* Editor Footer */}
          <div className="px-5 py-3.5 border-t border-slate-200 dark:border-zinc-800 flex items-center justify-between bg-slate-50 dark:bg-zinc-900/50">
            <span className="text-xs text-slate-400 dark:text-zinc-500">
              保存时将自动按中文字符精准计算字数与预计阅读时间
            </span>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsEditorOpen(false)}
                className="px-3.5 py-1.5 rounded-lg border border-slate-200 dark:border-zinc-700 text-xs font-medium text-slate-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800 cursor-pointer"
              >
                取消
              </button>
              <button
                type="submit"
                id="save-post-submit-btn"
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{editingPost ? '更新文章' : '立即发布'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
