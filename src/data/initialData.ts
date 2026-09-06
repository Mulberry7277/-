import { Post, BlogProfile, Comment } from '../types';

export const INITIAL_PROFILE: BlogProfile = {
  name: 'Amira Aqilah',
  title: 'Full-Stack Developer & Tech Explorer',
  bio: 'Writing about modern web engineering, distributed systems, AI developer tools, and minimalist software craftsmanship.',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  location: 'Kuala Lumpur / Remote',
  github: 'https://github.com',
  twitter: 'https://twitter.com',
  email: 'amira_aqilah90@yahoo.com',
  siteUrl: 'https://chirpy-blog.app',
};

export const INITIAL_POSTS: Post[] = [
  {
    id: 'chirpy-theme-guide',
    slug: 'getting-started-with-chirpy-theme',
    title: 'Getting Started with Jekyll Chirpy: Theme Architecture & Markdown Magic',
    subtitle: 'A deep dive into building an elegant, blazing-fast personal blog with Chirpy design aesthetics.',
    date: '2025-02-18',
    lastModified: '2025-02-20',
    categories: ['Blogging', 'Jekyll'],
    tags: ['chirpy', 'tutorial', 'github-pages', 'markdown', 'webdev'],
    description: 'Explore the key features of the iconic Jekyll Chirpy theme: responsive dual sidebar layout, dynamic table of contents, syntax highlighting, callout prompts, and dark mode.',
    pin: true,
    views: 1420,
    readingTime: 6,
    coverImage: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80',
    coverAlt: 'Chirpy Theme Workspace',
    content: `# Getting Started with Jekyll Chirpy

**Jekyll Theme Chirpy** (created by [Cotes Chung](https://github.com/cotes2020/jekyll-theme-chirpy)) is celebrated across the developer community for its ultra-clean layout, dark mode aesthetic, fast loading performance, and rich typography.

In this guide, we break down how Chirpy transforms standard Markdown into a beautiful, magazine-quality technical reading experience.

---

## 1. Key Design Philosophy

Chirpy emphasizes **content hierarchy** without visual clutter:

- **Persistent Left Sidebar:** Houses the author avatar, quick navigation (Home, Categories, Tags, Archives, About), and social links.
- **Dynamic Right Table of Contents (TOC):** On desktop viewports, an outline automatically detects headings and tracks scroll progress in real time.
- **Dark & Light Mode:** Tailored color palettes with high-contrast neutral slates and signature teal accent highlights.
- **Prompt Callouts:** Visual quote boxes that draw attention to tips, warnings, and vital notices.

> [!TIP]
> Chirpy is fully responsive. On mobile screens, the sidebar collapses into a slide-out drawer, while the TOC adapts seamlessly.

---

## 2. Interactive Callout Prompts

Chirpy supports distinctive blockquote callouts for emphasizing important insights:

> [!NOTE]
> This is a general note box. Use it to provide helpful context or background information.

> [!TIP]
> Pin your best articles! Pinned posts stay sticky at the top of your index feed with a pin badge.

> [!WARNING]
> Always verify frontmatter indentation in YAML files. A misplaced space can cause parsing issues.

> [!DANGER]
> Avoid publishing unencrypted private keys or development passwords into public Git repositories.

---

## 3. Code Highlighting & Copy Button

Chirpy provides clean monospace syntax styling with one-click code copy and language labels:

\`\`\`typescript
interface PostConfig {
  title: string;
  date: string;
  categories: string[];
  tags: string[];
  pin?: boolean;
}

export function calculateReadingTime(text: string): number {
  const wordsPerMinute = 200;
  const wordCount = text.trim().split(/\\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}
\`\`\`

You can also run shell snippets in terminal blocks:

\`\`\`bash
# Clone the repository starter
git clone https://github.com/cotes2020/chirpy-starter.git my-blog

# Install dependencies and launch dev server
bundle install
bundle exec jekyll serve
\`\`\`

---

## 4. Markdown Tables & Checklists

Chirpy renders clean tables and GitHub-flavored markdown checklists:

| Feature | Chirpy Theme | Standard Jekyll |
| :--- | :--- | :--- |
| **Dark Mode** | Built-in toggle & auto-detect | Manual CSS |
| **Table of Contents** | Real-time scrollspy TOC | Plugin required |
| **Search Engine** | Fast client-side index | External integration |
| **PWA Support** | Offline caching ready | None |

### Checklist of Chirpy Setup Steps:

- [x] Configure \`_config.yml\` with your avatar and bio
- [x] Customize social links (GitHub, Twitter, Email)
- [x] Create first post under \`_posts/YYYY-MM-DD-title.md\`
- [x] Set up GitHub Pages automated deployment via Actions
- [ ] Write your next technical masterpiece!

---

## 5. Conclusion

Whether you are publishing computer science tutorials, devops logs, or personal reflections, the Chirpy aesthetic offers the perfect blend of readability and developer credibility. Feel free to explore the interactive search, category tree, and archive timeline!
`
  },
  {
    id: 'react-19-performance',
    slug: 'react-19-web-performance-patterns',
    title: 'Modern Frontend Engineering in 2025: React 19, Compiler & Micro-Optimizations',
    subtitle: 'Understanding Actions, useTransition, automatic memoization, and optimal asset delivery.',
    date: '2025-02-12',
    categories: ['Frontend', 'React'],
    tags: ['react', 'javascript', 'performance', 'webdev'],
    description: 'How React 19 reshapes frontend development by eliminating manual useMemo/useCallback boilerplate and elevating asynchronous UI states to first-class primitives.',
    pin: true,
    views: 980,
    readingTime: 5,
    coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1200&q=80',
    coverAlt: 'React 19 Architecture',
    content: `# Modern Frontend Engineering in 2025: React 19 & Beyond

The release of React 19 marks a major evolution in how we think about reactivity, asynchronous state updates, and rendering overhead.

---

## 1. Automatic Memoization with the React Compiler

For years, developers had to manually wrap functions in \`useCallback\` and expensive computations in \`useMemo\` to prevent unwanted re-renders:

\`\`\`tsx
// The Old Way (Pre-React 19)
const memoizedList = useMemo(() => {
  return rawItems.filter(item => item.isActive).sort((a, b) => b.score - a.score);
}, [rawItems]);

const handleSelect = useCallback((id: string) => {
  setSelectedId(id);
}, []);
\`\`\`

With the React Compiler, memoization occurs at compile-time:
- No manual dependency arrays to debug
- Granular component tree invalidation
- Dramatically cleaner and more readable codebases

---

## 2. First-Class Actions & Asynchronous Transitions

React 19 introduces **Actions** to simplify form submissions, optimistic updates, and background mutations:

\`\`\`tsx
import { useTransition, useState } from 'react';

function LikeButton({ postId, initialLikes }: { postId: string; initialLikes: number }) {
  const [isPending, startTransition] = useTransition();
  const [likes, setLikes] = useState(initialLikes);

  const handleLike = () => {
    startTransition(async () => {
      // Optimistic update
      setLikes(prev => prev + 1);
      await api.likePost(postId);
    });
  };

  return (
    <button onClick={handleLike} disabled={isPending} className="btn-accent">
      {isPending ? 'Syncing...' : \`❤️ \${likes}\`}
    </button>
  );
}
\`\`\`

> [!NOTE]
> When coupled with server-side endpoints, \`useActionState\` manages pending flags, optimistic fallbacks, and validation errors with zero external libraries.

---

## 3. Core Web Vitals Takeaways

When tuning your web apps:
1. Keep INP (Interaction to Next Paint) under 200ms using non-blocking transitions.
2. Inline critical CSS and pre-connect to external font CDN domains.
3. Compress images to AVIF or WebP formats.
`
  },
  {
    id: 'ai-coding-agents-architecture',
    slug: 'building-autonomous-ai-coding-agents',
    title: 'Architecting Autonomous Coding Agents: Context Windows, Tools & Verification Loops',
    subtitle: 'From prompt engineering to deterministic tool execution and self-healing compilers.',
    date: '2025-01-28',
    categories: ['Artificial Intelligence', 'System Design'],
    tags: ['ai', 'llm', 'agents', 'typescript', 'systems'],
    description: 'An architectural exploration of how modern agentic systems coordinate file operations, language model context, and feedback verification loops.',
    pin: false,
    views: 1845,
    readingTime: 7,
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    coverAlt: 'AI Agent Architecture Network',
    content: `# Architecting Autonomous Coding Agents

Agentic AI systems have moved from theoretical demos to everyday developer tools. Rather than simply generating static text blocks, modern agents act within an environment via structured tools.

---

## 1. The Core Agent Loop: ReAct & Tool Use

An agent operates in a continuous control loop:
1. **Perceive:** Observe current environment state (files, directory tree, build output).
2. **Reason:** Formulate immediate intent and select the appropriate tool.
3. **Act:** Execute the tool via a deterministic API (read file, patch file, run compiler).
4. **Verify:** Check results (linting, test runs, TypeScript diagnostics).

\`\`\`
   ┌──────────────┐
   │ Environment  │
   └──────┬───────┘
          │ (Observation)
          ▼
   ┌──────────────┐       ┌──────────────┐
   │  LLM Engine  ├──────►│ Tool Dispatch│
   └──────┬───────┘       └──────┬───────┘
          ▲                      │ (Execution)
          │                      ▼
          └────────(Feedback)────┘
\`\`\`

---

## 2. Preventing Hallucinations with Exact Substring Patching

One common pitfall in automated code modification is hallucinated line numbers. To make file edits bulletproof, state-of-the-art agents use exact matching:

\`\`\`typescript
interface FileEditTool {
  filePath: string;
  targetContent: string;
  replacementContent: string;
}

function applyEdit(original: string, edit: FileEditTool): string {
  if (!original.includes(edit.targetContent)) {
    throw new Error('Target content not found in target file');
  }
  return original.replace(edit.targetContent, edit.replacementContent);
}
\`\`\`

> [!TIP]
> Always verify through an automated compilation check immediately after modifying code. The fastest agent is one that self-heals compiler errors before finishing its turn.
`
  },
  {
    id: 'developer-productivity-stack-2025',
    slug: 'developer-productivity-stack-2025',
    title: 'My Developer Environment & Productivity Stack in 2025',
    subtitle: 'Terminal workflows, Neovim, Fish shell, Raycast, and minimalist keyboard ergonomics.',
    date: '2025-01-15',
    categories: ['Tooling', 'Productivity'],
    tags: ['tools', 'terminal', 'productivity', 'linux'],
    description: 'A walkthrough of the tools, configs, and habits that provide seamless developer ergonomics without cognitive overload.',
    pin: false,
    views: 650,
    readingTime: 4,
    coverImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    coverAlt: 'Developer Desk Setup',
    content: `# My Developer Environment & Productivity Stack in 2025

A productive development environment should disappear into the background, allowing uninterrupted focus on problem solving.

---

## 1. Terminal & Shell Ergonomics

- **Ghostty & WezTerm:** Blazing fast GPU-accelerated terminals with native tabs and font ligature support.
- **Fish Shell & Starship:** Intelligent autosuggestions based on command history, zero configuration latency.
- **Zoxide:** Intelligent directory jumper that replaces standard \`cd\`.

\`\`\`bash
# Jump directly to active project
z chirpy-blog
\`\`\`

---

## 2. Keyboard & Window Management

Using a split 36-key ortholinear keyboard mapped with Miryoku layout minimizes finger travel and strain. Everything is controlled via home row mods and navigation layers.
`
  },
  {
    id: 'distributed-systems-raft-consensus',
    slug: 'distributed-systems-raft-consensus-edge',
    title: 'Understanding Distributed Consensus: Raft, Quorums & Edge Caching',
    subtitle: 'Demystifying leader election, log replication, and edge cache consistency.',
    date: '2024-12-20',
    categories: ['Backend', 'System Design'],
    tags: ['distributed-systems', 'raft', 'backend', 'architecture'],
    description: 'A beginner-friendly breakdown of how modern distributed databases achieve consensus across unreliable networks using the Raft protocol.',
    pin: false,
    views: 1120,
    readingTime: 6,
    coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    coverAlt: 'Distributed Cloud Network',
    content: `# Understanding Distributed Consensus: Raft & Quorums

When you build systems that span multiple datacenters, network partitions and machine crashes are inevitable. How do nodes agree on the truth?

---

## 1. The Core Challenge

In a distributed database:
- Servers may reboot or drop packets.
- Messages can arrive out of order.
- A split-brain scenario must never corrupt data.

---

## 2. The Three States of Raft

Every server in a Raft cluster exists in one of three states:
1. **Leader:** Handles all client requests, appends to log, and replicates to followers.
2. **Follower:** Completely passive; responds to Heartbeats and RPCs from the leader.
3. **Candidate:** Initiates an election if no heartbeat is received within the randomized timeout.

> [!NOTE]
> By randomizing the election timeout (e.g. 150ms – 300ms), split votes are nearly always avoided on the first ballot.
`
  }
];

export const INITIAL_COMMENTS: Comment[] = [
  {
    id: 'c1',
    postId: 'chirpy-theme-guide',
    author: 'Kenji Sato',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
    date: '2025-02-19',
    content: 'Love this theme! The table of contents and dark mode implementation is so satisfying to read on desktop and tablet.'
  },
  {
    id: 'c2',
    postId: 'chirpy-theme-guide',
    author: 'Elena Rostova',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
    date: '2025-02-21',
    content: 'The callout prompts (> [!TIP]) look pristine. Jekyll Chirpy really sets the gold standard for developer blogs.'
  },
  {
    id: 'c3',
    postId: 'react-19-performance',
    author: 'David Miller',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&q=80',
    date: '2025-02-14',
    content: 'React Compiler is going to eliminate so much mental overhead around dependency arrays. Great breakdown!'
  }
];
