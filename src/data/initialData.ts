import { Post, BlogProfile, Comment } from '../types';

export const INITIAL_PROFILE: BlogProfile = {
  name: '阿米拉 (Amira)',
  title: '全栈工程师 & 技术探险家',
  bio: '专注于现代 Web 前端工程、分布式系统架构、AI 智能体工具链与极简软件工程美学。',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  location: '北京 / 远程办公 (Remote)',
  github: 'https://github.com',
  twitter: 'https://twitter.com',
  email: 'amira_aqilah90@yahoo.com',
  siteUrl: 'https://chirpy-blog.app',
};

export const INITIAL_POSTS: Post[] = [
  {
    id: 'chirpy-theme-guide',
    slug: 'getting-started-with-chirpy-theme',
    title: 'Jekyll Chirpy 深度上手指南：主题架构、排版规范与 Markdown 艺术',
    subtitle: '如何借助 Chirpy 极简美学打造优雅、极致飞速的个人技术独立博客。',
    date: '2025-02-18',
    lastModified: '2025-02-20',
    categories: ['博客搭建', 'Jekyll'],
    tags: ['chirpy', '教程', 'github-pages', 'markdown', '前端'],
    description: '深入探索经典 Jekyll Chirpy 主题的核心特色：响应式双栏布局、实时滚动文章大纲（TOC）、代码高亮与一键复制、提示卡片（Callouts）及深浅色模式切换。',
    pin: true,
    views: 1420,
    readingTime: 6,
    coverImage: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80',
    coverAlt: 'Chirpy 主题工作台',
    content: `# Jekyll Chirpy 深度上手指南

**Jekyll Theme Chirpy**（由 [Cotes Chung](https://github.com/cotes2020/jekyll-theme-chirpy) 倾力开源）因其极致干净的版面、惊艳的深色模式（Dark Mode）、极速的加载性能以及优雅的排版层次，在开发者群体中广受推崇。

本文将深入拆解 Chirpy 的设计哲学，展示如何将标准 Markdown 渲染成杂志级的高品质技术阅读体验。

---

## 1. 核心设计哲学

Chirpy 强调**内容为王**，杜绝任何喧宾夺主的视觉干扰：

- **常驻左侧导航栏：** 集中展示博主头像、个人简介、导航入口（首页、分类、标签、归档、关于）及社交网络矩阵。
- **右侧动态文章大纲（TOC）：** 在桌面屏幕上，系统会自动解析文章中的 Markdown 标题，并随着页面滚动实时高亮当前阅读进度。
- **高对比度双色模式：** 专为夜间编程调配的高级炭黑灰色调，搭配清爽的青色（Cyan/Teal）作为交互强调色。
- **醒目的提示引用框（Callouts）：** 用于突出显示小技巧、重要提示、警告与风险警告。

> [!TIP]
> Chirpy 具备无缝的自适应能力。在移动设备屏幕上，侧边栏会自动折叠为平滑抽屉菜单，文章大纲也会自适应优化。

---

## 2. 交互式提示卡片（Callout Prompts）

Chirpy 原生支持独特的引用块语法，让重点内容一目了然：

> [!NOTE]
> 这是一个常规提示框。常用于提供背景知识、补充说明或延伸阅读链接。

> [!TIP]
> 记得善用置顶（Pin）功能！置顶的文章会常驻在首页列表顶部，并带有专属图钉徽标。

> [!WARNING]
> 请格外注意 YAML Frontmatter 中的缩进与空格。一个不规范的空格可能会导致 Jekyll 解析失败。

> [!DANGER]
> 切勿将未加密的生产环境私钥、数据库凭证或 API 密钥提交至公共代码仓库中！

---

## 3. 代码高亮与一键复制代码块

Chirpy 提供清晰的代码等宽字体排版，并原生内置语言徽标与一键复制功能：

\`\`\`typescript
interface PostConfig {
  title: string;
  date: string;
  categories: string[];
  tags: string[];
  pin?: boolean;
}

// 自动计算中文阅读时长与字数
export function calculateReadingTime(text: string): number {
  const cnChars = (text.match(/[\\u4e00-\\u9fa5]/g) || []).length;
  const enWords = text.replace(/[\\u4e00-\\u9fa5]/g, ' ').trim().split(/\\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil((cnChars + enWords) / 300));
}
\`\`\`

命令行执行代码块也非常直观：

\`\`\`bash
# 克隆 Chirpy 主题启动脚手架
git clone https://github.com/cotes2020/chirpy-starter.git my-blog

# 安装依赖并启动本地预览服务器
bundle install
bundle exec jekyll serve
\`\`\`

---

## 4. 表格与任务复选清单

支持标准 GFM 扩展语法，包含响应式表格与交互清单：

| 核心特性 | Chirpy 主题 | 原生 Jekyll |
| :--- | :--- | :--- |
| **深浅色主题** | 原生无缝切换 & 系统跟随 | 需手动编写 CSS |
| **文章目录 (TOC)** | 动态滚动监听 (Scrollspy) | 需额外插件支持 |
| **全站全文检索** | 纯客户端毫秒级检索 | 需第三方服务托管 |
| **PWA 离线支持** | 开箱即用离线缓存 | 无 |

### 本博客已就绪的配置清单：

- [x] 配置个人头像、博主昵称与个性签名
- [x] 设定常用社交媒体账号链接（GitHub、Twitter、Email）
- [x] 在本地撰写第一篇并使用一键同步导入
- [x] 享受沉浸式 Markdown 纯净技术写作
- [ ] 开启你的下一篇深度技术长文！

---

## 5. 结语

无论是记录计算机科学探索笔记、架构设计心得还是个人技术随笔，Chirpy 的极简美学都能带给你最舒适的创作体验。现在就去右上角点击 **「写文章」** 或 **「本地同步」** 试试吧！
`
  },
  {
    id: 'react-19-performance',
    slug: 'react-19-web-performance-patterns',
    title: '2025 现代前端工程：React 19、React Compiler 与微优化实战',
    subtitle: '深度解析 Actions、useTransition、自动记忆化编译与 Web 核心指标调优。',
    date: '2025-02-12',
    categories: ['前端开发', 'React'],
    tags: ['react', 'javascript', '性能优化', '前端工程'],
    description: 'React 19 如何彻底摆脱繁冗的 useMemo/useCallback 手动优化心智负担，并将异步 UI 状态提升为第一等公民。',
    pin: true,
    views: 980,
    readingTime: 5,
    coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1200&q=80',
    coverAlt: 'React 19 架构全景',
    content: `# 2025 现代前端工程：React 19 与性能革新

React 19 的发布，标志着前端响应式数据流、异步状态处理与渲染性能优化迈入了全新的纪元。

---

## 1. 告别手动优化的 React Compiler

多年来，React 开发者不得不花费大量心力在 \`useCallback\` 与 \`useMemo\` 上，以避免子组件因引用改变而发生无谓重渲染：

\`\`\`tsx
// React 19 之前的繁琐手动优化写法
const memoizedList = useMemo(() => {
  return rawItems.filter(item => item.isActive).sort((a, b) => b.score - a.score);
}, [rawItems]);

const handleSelect = useCallback((id: string) => {
  setSelectedId(id);
}, []);
\`\`\`

而在配合 **React Compiler** 后，记忆化将在编译期自动完成：
- 零依赖项数组维护心智负担
- 极细粒度的组件树重渲染控制
- 代码还原为最纯粹、最优雅的 JavaScript 表达

---

## 2. 原生 Actions 与异步过渡状态

React 19 正式引入了 **Actions** 概念，大幅简化了表单提交、乐观更新（Optimistic Updates）与后台数据突变：

\`\`\`tsx
import { useTransition, useState } from 'react';

function LikeButton({ postId, initialLikes }: { postId: string; initialLikes: number }) {
  const [isPending, startTransition] = useTransition();
  const [likes, setLikes] = useState(initialLikes);

  const handleLike = () => {
    startTransition(async () => {
      // 乐观更新界面数值
      setLikes(prev => prev + 1);
      await api.likePost(postId);
    });
  };

  return (
    <button onClick={handleLike} disabled={isPending} className="btn-accent">
      {isPending ? '同步中...' : \`❤️ \${likes}\`}
    </button>
  );
}
\`\`\`

> [!NOTE]
> 结合全新的 \`useActionState\` 钩子，无需引入第三方状态库，即可原生优雅地处理 pending 加载中、成功回执及表单验证错误反馈。

---

## 3. Web 性能指标（Core Web Vitals）实战建议

在调优现代 Web 网页时：
1. **控制 INP（Interaction to Next Paint）在 200ms 以内**：善用非阻塞的过渡更新。
2. **字体与核心样式内联**：预先建立对字体 CDN 域名的 DNS 预连接。
3. **图像格式现代化**：优先采用 AVIF 或 WebP 格式，避免未经压缩的大图阻塞关键渲染路径。
`
  },
  {
    id: 'ai-coding-agents-architecture',
    slug: 'building-autonomous-ai-coding-agents',
    title: '构建自主编程智能体 (Coding Agents)：上下文管理、工具调度与自愈闭环',
    subtitle: '从 Prompt 工程到确定性工具执行、精确子串补丁与代码自愈编译器。',
    date: '2025-01-28',
    categories: ['人工智能', '系统架构'],
    tags: ['ai', '大语言模型', '智能体', 'typescript', '架构设计'],
    description: '现代 Agent 系统如何协调文件系统、语言模型上下文窗口与即时诊断验证闭环的深度工程架构剖析。',
    pin: false,
    views: 1845,
    readingTime: 7,
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    coverAlt: 'AI Agent 架构网络',
    content: `# 构建自主编程智能体：架构、闭环与工具调度

Agentic AI（智能体）系统正在从前期的对话 Demo 进化为真正能够交付端到端工程结果的自动化系统。与传统一次性文本补全不同，现代编程智能体具备环境感知能力与确定性执行能力。

---

## 1. 核心控制循环：ReAct 与工具派发

一个高鲁棒性的智能体持续运行在一个闭环控制循环中：
1. **感知（Perceive）：** 观察当前环境状态（目标文件内容、文件目录树、构建报错日志）。
2. **推理（Reason）：** 明确下一步目标，选择对应的函数工具（Tool）。
3. **行动（Act）：** 通过结构化参数调用确定性工具（读文件、精准补丁替换、执行诊断）。
4. **验证（Verify）：** 即时校验修改结果（运行 TypeScript 诊断或测试用例）。

\`\`\`
   ┌──────────────┐
   │  环境真实状态  │
   └──────┬───────┘
          │ (环境观察)
          ▼
   ┌──────────────┐       ┌──────────────┐
   │ 大语言模型核心 ├──────►│  工具调度中心 │
   └──────┬───────┘       └──────┬───────┘
          ▲                      │ (执行修改)
          │                      ▼
          └───────(编译/诊断反馈)─┘
\`\`\`

---

## 2. 精确子串替换与抗幻觉机制

在自动化代码重构中，大模型经常产生“行号幻觉”。为确保修改的准确性，业界顶尖智能体普遍采用**确定性子串精准匹配替换（Exact Substring Replacement）**：

\`\`\`typescript
interface FileEditTool {
  filePath: string;
  targetContent: string;     // 必须在原文件中唯一存在
  replacementContent: string; // 替换后的全新代码块
}

function applyEdit(original: string, edit: FileEditTool): string {
  if (!original.includes(edit.targetContent)) {
    throw new Error('未在目标文件中找到待替换的目标代码段');
  }
  return original.replace(edit.targetContent, edit.replacementContent);
}
\`\`\`

> [!TIP]
> 每次修改代码后立即调用编译校验工具。最强大的智能体往往是能够自主发现并纠正语法错误、自我迭代直至完全通过的自愈系统。
`
  },
  {
    id: 'developer-productivity-stack-2025',
    slug: 'developer-productivity-stack-2025',
    title: '我的 2025 极客开发者环境与生产力工具栈',
    subtitle: '现代终端工作流、Neovim、Fish Shell、Raycast 与分体人体工学键盘实践。',
    date: '2025-01-15',
    categories: ['开发工具', '生产力'],
    tags: ['开发工具', '终端命令行', '生产力', 'linux'],
    description: '分享让心流不被打断的高效开发工具、配置哲学与日常习惯，打造纯粹极简的工作环境。',
    pin: false,
    views: 650,
    readingTime: 4,
    coverImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    coverAlt: '极客开发桌面环境',
    content: `# 我的 2025 极客开发者环境与生产力工作流

一个真正高效的开发环境应当“隐入无形”，让开发者能够毫无阻力地沉浸在解决核心问题的心流之中。

---

## 1. 终端与 Shell 生产力基石

- **Ghostty & WezTerm：** 基于 GPU 硬件加速的极致现代化终端，原生支持连字字体（Font Ligatures）与平滑分屏。
- **Fish Shell & Starship 提示符：** 基于历史命令的高智能自动补全，开箱即用且零启动延迟。
- **Zoxide：** 智能目录跳转工具，全面替代传统古老的 \`cd\` 命令。

\`\`\`bash
# 直接智能跳转到活跃项目
z chirpy-blog
\`\`\`

---

## 2. 键盘布局与窗口管理

使用 36 键分体正交人体工学键盘并配合 Miryoku 布局，手腕无需反复移动即可完成所有快捷键派发。配合全键盘快捷键工具，所有窗口操作均可在毫秒间完成。
`
  },
  {
    id: 'distributed-systems-raft-consensus',
    slug: 'distributed-systems-raft-consensus-edge',
    title: '深入浅出分布式共识算法：Raft 机制、法定人数与边缘缓存一致性',
    subtitle: '拨开 Leader 选举、日志复制与网络分区脑裂的迷雾。',
    date: '2024-12-20',
    categories: ['后端架构', '分布式系统'],
    tags: ['分布式系统', 'raft', '后端', '系统设计'],
    description: '用通俗易懂的图解方式理解现代分布式数据库如何在不可靠网络中借助 Raft 协议达成数据最终一致。',
    pin: false,
    views: 1120,
    readingTime: 6,
    coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    coverAlt: '分布式云架构拓扑',
    content: `# 深入浅出分布式共识算法：Raft 机制与原理解析

在跨越多个数据中心的分布式网络中，网络抖动、延迟分片与机器崩溃是不可避免的常态。各个节点如何对数据状态达成不容置疑的统一共识？

---

## 1. 分布式系统的核心挑战

在分布式集群中：
- 节点可能随时宕机或丢包。
- 网络数据包可能会乱序到达。
- 绝不允许出现双主冲突（脑裂 / Split-Brain）损坏核心数据。

---

## 2. Raft 节点的三个关键状态

Raft 集群中的所有节点在任一时刻必然处于以下三种状态之一：
1. **Leader（领导者）：** 处理所有客户端写请求，统一向日志追加并复制给 Follower。
2. **Follower（追随者）：** 完全被动接收，仅响应来自 Leader 的心跳与 RPC 请求。
3. **Candidate（候选人）：** 若在随机选举超时内未收到 Leader 心跳，则自增任期并发起选举投票。

> [!NOTE]
> 通过采用随机化选举超时（如 150ms ~ 300ms），绝大多数情况下可以在首轮投票中迅速选出新 Leader，避免选票平分僵局。
`
  }
];

export const INITIAL_COMMENTS: Comment[] = [
  {
    id: 'c1',
    postId: 'chirpy-theme-guide',
    author: '陈立峰 (TechLead)',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
    date: '2025-02-19',
    content: '太喜欢这个主题了！右侧的实时滚动目录大纲与暗黑模式适配得非常舒适，在电脑和大屏平板上阅读长文简直是一种享受。'
  },
  {
    id: 'c2',
    postId: 'chirpy-theme-guide',
    author: '林雅婷 (Frontend Dev)',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
    date: '2025-02-21',
    content: '那几个提示框（> [!TIP]、> [!NOTE]）的样式细节还原得真棒，Jekyll Chirpy 确实堪称独立技术博客的美学标杆。'
  },
  {
    id: 'c3',
    postId: 'react-19-performance',
    author: '张伟 (Senior Architect)',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&q=80',
    date: '2025-02-14',
    content: 'React Compiler 确实省去了以前天天纠结 useMemo 依赖项的心智负担，分析得很清晰透彻！'
  }
];
