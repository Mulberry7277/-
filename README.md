# Chirpy 技术博客 (Jekyll Theme Chirpy 风格)

这是一个基于 React 19 + Tailwind CSS 构建的高颜值、高性能现代中文技术博客，深度还原了经典 [Jekyll Theme Chirpy](https://github.com/cotes2020/jekyll-theme-chirpy) 的极简美学排版。

## ✨ 特色亮点

- **响应式双栏 / 三栏布局**：经典固定左侧边栏 + 文章主体 + 桌面端粘性文章大纲（TOC）。
- **中文字符精准统计**：自动按汉字及英文单词计算字数与预计阅读时间。
- **Chirpy 专属提示引用块**：支持 `> [!NOTE]`、`> [!TIP]`、`> [!WARNING]` 和 `> [!DANGER]` 语法。
- **内置在线 Markdown 编辑器**：支持实时双屏预览、语法提示、标签分类与置顶。
- **Jekyll 原生兼容**：支持导出符合标准 YAML Frontmatter 的 `.md` 文件。
- **暗黑 / 浅色模式**：高对比度 Slate 配色，专为代码和长文阅读优化。
- **全局毫秒级搜索**：快捷键 `Ctrl + K` 或 `/` 实时查找文章。

---

## 🚀 如何发布到 GitHub 并生成公开访问链接

### 方法 1：一键通过 GitHub Pages 发布（免费、官方托管）

1. **导出代码至 GitHub 仓库**：
   - 在平台右上角菜单选择 **Export to GitHub**，直接将代码推送到你的 GitHub 个人账号新建的仓库（例如 `my-chirpy-blog`）。
   - 或者下载 ZIP 压缩包解压后在本地执行：
     ```bash
     git init
     git add .
     git commit -m "feat: initial chirpy blog"
     git branch -M main
     git remote add origin https://github.com/<你的用户名>/<你的仓库名>.git
     git push -u origin main
     ```

2. **开启 GitHub Pages 自动化部署**：
   - 打开你的 GitHub 仓库页面，点击顶部 **Settings（设置）**。
   - 在左侧菜单点击 **Pages**。
   - 在 **Build and deployment -> Source** 下拉菜单中，选择 **GitHub Actions**。
   - 项目中已内置了 `.github/workflows/deploy.yml` 自动化工作流，每次你推送到 `main` 分支时，GitHub 就会自动编译并发布。

3. **获取公开链接**：
   - 部署完成后（约 1 分钟），在 **Settings -> Pages** 页面顶部即可看到你的专属公开链接：
     `https://<你的用户名>.github.io/<你的仓库名>/`
   - 任何人点击这个链接都可以直接访问你的博客！

---

### 方法 2：使用 Vercel / Netlify / Cloudflare Pages 一键绑定（极速部署）

1. 打开 [Vercel](https://vercel.com/) 或 [Cloudflare Pages](https://pages.cloudflare.com/)，使用 GitHub 账号登录。
2. 点击 **Add New Project**，导入刚才创建的 GitHub 博客仓库。
3. 构建配置会自动识别：
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. 点击 **Deploy**，几十秒内即可获得一个永久免费的 `https://xxxx.vercel.app` 链接，全球 CDN 极速分发，并支持绑定个人独立域名。

---

## 💻 本地开发运行

```bash
# 1. 安装依赖
npm install

# 2. 启动本地开发预览
npm run dev

# 3. 生产环境打包
npm run build
```
