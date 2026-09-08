import React, { createContext, useContext, useState, useEffect } from 'react';
import { Post, BlogProfile, Comment, ActiveTab, ThemeMode } from '../types';
import { INITIAL_POSTS, INITIAL_PROFILE, INITIAL_COMMENTS } from '../data/initialData';

interface BlogContextType {
  posts: Post[];
  profile: BlogProfile;
  comments: Comment[];
  activeTab: ActiveTab;
  selectedPost: Post | null;
  filterCategory: string | null;
  filterTag: string | null;
  theme: ThemeMode;
  isSearchOpen: boolean;
  isEditorOpen: boolean;
  editingPost: Post | null;
  isMobileSidebarOpen: boolean;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  setIsSearchOpen: (open: boolean) => void;
  setIsEditorOpen: (open: boolean) => void;
  setIsMobileSidebarOpen: (open: boolean) => void;
  setFilterCategory: (cat: string | null) => void;
  setFilterTag: (tag: string | null) => void;
  navigateTo: (tab: ActiveTab, filter?: { category?: string; tag?: string }) => void;
  viewPost: (postId: string | null) => void;
  openEditor: (post?: Post) => void;
  savePost: (postData: Partial<Post>) => void;
  deletePost: (postId: string) => void;
  togglePin: (postId: string) => void;
  addComment: (postId: string, author: string, content: string) => void;
  toggleTheme: () => void;
  updateProfile: (profile: BlogProfile) => void;
  resetToDemoData: () => void;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const BlogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme state
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('chirpy_theme');
    if (saved === 'light' || saved === 'dark') return saved;
    return 'dark';
  });

  // Data states with version check for Chinese localization
  const STORAGE_VERSION = 'chirpy_zh_v2';

  const [posts, setPosts] = useState<Post[]>(() => {
    try {
      const version = localStorage.getItem('chirpy_storage_version');
      if (version !== STORAGE_VERSION) {
        localStorage.setItem('chirpy_storage_version', STORAGE_VERSION);
        localStorage.setItem('chirpy_posts', JSON.stringify(INITIAL_POSTS));
        return INITIAL_POSTS;
      }
      const saved = localStorage.getItem('chirpy_posts');
      return saved ? JSON.parse(saved) : INITIAL_POSTS;
    } catch {
      return INITIAL_POSTS;
    }
  });

  const [profile, setProfile] = useState<BlogProfile>(() => {
    try {
      const version = localStorage.getItem('chirpy_storage_version');
      if (version !== STORAGE_VERSION) {
        localStorage.setItem('chirpy_profile', JSON.stringify(INITIAL_PROFILE));
        return INITIAL_PROFILE;
      }
      const saved = localStorage.getItem('chirpy_profile');
      return saved ? JSON.parse(saved) : INITIAL_PROFILE;
    } catch {
      return INITIAL_PROFILE;
    }
  });

  const [comments, setComments] = useState<Comment[]>(() => {
    try {
      const version = localStorage.getItem('chirpy_storage_version');
      if (version !== STORAGE_VERSION) {
        localStorage.setItem('chirpy_comments', JSON.stringify(INITIAL_COMMENTS));
        return INITIAL_COMMENTS;
      }
      const saved = localStorage.getItem('chirpy_comments');
      return saved ? JSON.parse(saved) : INITIAL_COMMENTS;
    } catch {
      return INITIAL_COMMENTS;
    }
  });

  // Navigation states
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<string | null>(null);
  const [filterTag, setFilterTag] = useState<string | null>(null);

  // UI modal states
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('chirpy_posts', JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem('chirpy_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('chirpy_comments', JSON.stringify(comments));
  }, [comments]);

  useEffect(() => {
    localStorage.setItem('chirpy_theme', theme);
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
  }, [theme]);

  // Global keyboard shortcut: Ctrl+K or / for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      } else if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        e.preventDefault();
        setIsSearchOpen(true);
      } else if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setIsMobileSidebarOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const navigateTo = (tab: ActiveTab, filter?: { category?: string; tag?: string }) => {
    setActiveTab(tab);
    setSelectedPostId(null);
    setIsMobileSidebarOpen(false);
    if (filter) {
      if (filter.category !== undefined) setFilterCategory(filter.category);
      if (filter.tag !== undefined) setFilterTag(filter.tag);
    } else {
      setFilterCategory(null);
      setFilterTag(null);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const viewPost = (postId: string | null) => {
    setSelectedPostId(postId);
    setIsMobileSidebarOpen(false);
    if (postId) {
      // Increment post views
      setPosts(prev =>
        prev.map(p => (p.id === postId ? { ...p, views: (p.views || 0) + 1 } : p))
      );
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const openEditor = (post?: Post) => {
    setEditingPost(post || null);
    setIsEditorOpen(true);
  };

  const savePost = (postData: Partial<Post>) => {
    if (editingPost) {
      // Update existing post
      setPosts(prev =>
        prev.map(p => {
          if (p.id === editingPost.id) {
            return {
              ...p,
              ...postData,
              lastModified: new Date().toISOString().split('T')[0],
              readingTime: calculateReadingTime(postData.content || p.content)
            } as Post;
          }
          return p;
        })
      );
    } else {
      // Create new post
      const title = postData.title || '无标题文章';
      const slug = title.toLowerCase().replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-').replace(/(^-|-$)/g, '');
      const newPost: Post = {
        id: `post-${Date.now()}`,
        slug: slug || `post-${Date.now()}`,
        title,
        subtitle: postData.subtitle || '',
        date: new Date().toISOString().split('T')[0],
        categories: postData.categories && postData.categories.length > 0 ? postData.categories : ['随笔'],
        tags: postData.tags && postData.tags.length > 0 ? postData.tags : ['博客'],
        description: postData.description || (postData.content ? postData.content.replace(/[#*`>]/g, '').slice(0, 150).trim() + '...' : ''),
        content: postData.content || '# ' + title + '\n\n在此开始撰写您的 Markdown 内容...',
        coverImage: postData.coverImage || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80',
        coverAlt: title,
        pin: postData.pin || false,
        views: 1,
        readingTime: calculateReadingTime(postData.content || '')
      };
      setPosts(prev => [newPost, ...prev]);
      setSelectedPostId(newPost.id);
    }
    setIsEditorOpen(false);
    setEditingPost(null);
  };

  const deletePost = (postId: string) => {
    setPosts(prev => prev.filter(p => p.id !== postId));
    if (selectedPostId === postId) {
      setSelectedPostId(null);
      setActiveTab('home');
    }
  };

  const togglePin = (postId: string) => {
    setPosts(prev =>
      prev.map(p => (p.id === postId ? { ...p, pin: !p.pin } : p))
    );
  };

  const addComment = (postId: string, author: string, content: string) => {
    const avatars = [
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
      'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&q=80',
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&q=80'
    ];
    const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)];
    const newComment: Comment = {
      id: `c-${Date.now()}`,
      postId,
      author: author.trim() || 'Anonymous Reader',
      avatar: randomAvatar,
      date: new Date().toISOString().split('T')[0],
      content: content.trim()
    };
    setComments(prev => [newComment, ...prev]);
  };

  const updateProfile = (newProfile: BlogProfile) => {
    setProfile(newProfile);
  };

  const resetToDemoData = () => {
    setPosts(INITIAL_POSTS);
    setProfile(INITIAL_PROFILE);
    setComments(INITIAL_COMMENTS);
    setSelectedPostId(null);
    setActiveTab('home');
    setFilterCategory(null);
    setFilterTag(null);
  };

  const selectedPost = selectedPostId ? posts.find(p => p.id === selectedPostId) || null : null;

  return (
    <BlogContext.Provider
      value={{
        posts,
        profile,
        comments,
        activeTab,
        selectedPost,
        filterCategory,
        filterTag,
        theme,
        isSearchOpen,
        isEditorOpen,
        editingPost,
        isMobileSidebarOpen,
        searchQuery,
        setSearchQuery,
        setIsSearchOpen,
        setIsEditorOpen,
        setIsMobileSidebarOpen,
        setFilterCategory,
        setFilterTag,
        navigateTo,
        viewPost,
        openEditor,
        savePost,
        deletePost,
        togglePin,
        addComment,
        toggleTheme,
        updateProfile,
        resetToDemoData,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
};

function calculateReadingTime(text: string): number {
  if (!text) return 1;
  const cnChars = (text.match(/[\u4e00-\u9fa5]/g) || []).length;
  const enWords = text.replace(/[\u4e00-\u9fa5]/g, ' ').trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil((cnChars + enWords) / 300));
}
