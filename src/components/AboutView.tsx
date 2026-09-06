import React, { useState } from 'react';
import { 
  User, Mail, MapPin, Globe, Github, Twitter, Edit3, 
  Check, Code2, Sparkles, Layers, Cpu, ShieldCheck, Terminal
} from 'lucide-react';
import { useBlog } from '../context/BlogContext';

export const AboutView: React.FC = () => {
  const { profile, updateProfile, resetToDemoData } = useBlog();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(profile);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
    setIsEditing(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const techStack = [
    { category: 'Languages', items: ['TypeScript', 'JavaScript', 'Python', 'Go', 'Rust', 'SQL'] },
    { category: 'Frontend', items: ['React 19', 'Tailwind CSS', 'Vite', 'Next.js', 'Jekyll', 'HTML5/CSS3'] },
    { category: 'Systems & Cloud', items: ['Docker', 'Linux', 'GCP / Cloud Run', 'GitHub Actions', 'Edge Caching'] },
    { category: 'AI & Tooling', items: ['Gemini API', 'Agent Architectures', 'Neovim', 'Git', 'Starship'] },
  ];

  return (
    <div className="bg-white dark:bg-[#212124] border border-slate-200/80 dark:border-zinc-800 rounded-xl p-6 sm:p-10">
      {/* Top Banner & Profile Header */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-8 border-b border-slate-200 dark:border-zinc-800">
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden ring-4 ring-cyan-500/30 shadow-lg shrink-0">
          <img
            src={profile.avatar}
            alt={profile.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="flex-1 text-center sm:text-left min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-zinc-100 tracking-tight">
                {profile.name}
              </h2>
              <p className="text-sm text-cyan-600 dark:text-cyan-400 font-medium mt-0.5">
                {profile.title}
              </p>
            </div>

            <button
              id="edit-profile-btn"
              onClick={() => {
                setFormData(profile);
                setIsEditing(!isEditing);
              }}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-xs font-semibold text-slate-700 dark:text-zinc-300 hover:border-cyan-500 transition-colors cursor-pointer self-center sm:self-start"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{isEditing ? 'Cancel Edit' : 'Edit Profile'}</span>
            </button>
          </div>

          <p className="mt-3 text-sm text-slate-600 dark:text-zinc-300 leading-relaxed max-w-2xl">
            {profile.bio}
          </p>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 mt-4 text-xs text-slate-500 dark:text-zinc-400">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>{profile.location}</span>
            </div>
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-1.5 hover:text-cyan-500 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              <span>{profile.email}</span>
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-cyan-500 transition-colors"
            >
              <Github className="w-3.5 h-3.5 text-slate-400" />
              <span>GitHub</span>
            </a>
            <a
              href={profile.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-cyan-500 transition-colors"
            >
              <Twitter className="w-3.5 h-3.5 text-slate-400" />
              <span>Twitter</span>
            </a>
          </div>
        </div>
      </div>

      {/* Profile Edit Form */}
      {isEditing && (
        <form onSubmit={handleSave} className="my-6 p-6 rounded-xl bg-slate-50 dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-zinc-200 mb-2">
            Update Author Profile
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-zinc-400 mb-1">
                Display Name
              </label>
              <input
                type="text"
                id="edit-name-input"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-800 dark:text-zinc-200 focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-zinc-400 mb-1">
                Headline / Title
              </label>
              <input
                type="text"
                id="edit-title-input"
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-800 dark:text-zinc-200 focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-zinc-400 mb-1">
                Avatar Image URL
              </label>
              <input
                type="url"
                id="edit-avatar-input"
                value={formData.avatar}
                onChange={e => setFormData({ ...formData, avatar: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-800 dark:text-zinc-200 focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-zinc-400 mb-1">
                Location
              </label>
              <input
                type="text"
                id="edit-location-input"
                value={formData.location}
                onChange={e => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-800 dark:text-zinc-200 focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-zinc-400 mb-1">
                Email
              </label>
              <input
                type="email"
                id="edit-email-input"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-800 dark:text-zinc-200 focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-zinc-400 mb-1">
                GitHub URL
              </label>
              <input
                type="url"
                id="edit-github-input"
                value={formData.github}
                onChange={e => setFormData({ ...formData, github: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-800 dark:text-zinc-200 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-zinc-400 mb-1">
              Biography
            </label>
            <textarea
              id="edit-bio-input"
              rows={3}
              value={formData.bio}
              onChange={e => setFormData({ ...formData, bio: e.target.value })}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-800 dark:text-zinc-200 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-zinc-700 text-xs text-slate-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              id="save-profile-btn"
              className="px-4 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold cursor-pointer"
            >
              Save Profile
            </button>
          </div>
        </form>
      )}

      {saveSuccess && (
        <div className="my-4 p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-500" />
          <span>Profile successfully updated and saved to local storage!</span>
        </div>
      )}

      {/* Main About Content */}
      <div className="mt-8 space-y-8">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-zinc-100 mb-3 flex items-center gap-2">
            <Terminal className="w-4 h-4 text-cyan-500" />
            <span>About This Blog</span>
          </h3>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-zinc-300">
            Welcome to my personal tech notebook! This site is inspired by the iconic{' '}
            <a
              href="https://github.com/cotes2020/jekyll-theme-chirpy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-600 dark:text-cyan-400 font-semibold hover:underline"
            >
              Jekyll Theme Chirpy
            </a>
            , focusing on high readability, distraction-free typography, fast client-side navigation, and comprehensive technical documentation capabilities.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-zinc-300 mt-2">
            Here, I share practical guides, architectural insights, performance experiments, and reflections on distributed systems and software tooling.
          </p>
        </div>

        {/* Tech Stack Matrix */}
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
            <Code2 className="w-4 h-4 text-cyan-500" />
            <span>Technical Skills & Tools</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {techStack.map(stack => (
              <div
                key={stack.category}
                className="p-4 rounded-xl border border-slate-200/80 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-900/30"
              >
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400 mb-2.5">
                  {stack.category}
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {stack.items.map(item => (
                    <span
                      key={item}
                      className="px-2.5 py-1 rounded-md text-xs font-mono bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-700 dark:text-zinc-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chirpy Features Showcase */}
        <div className="p-6 rounded-xl bg-cyan-50/50 dark:bg-cyan-950/20 border border-cyan-200/80 dark:border-cyan-800/40">
          <h4 className="text-sm font-bold text-cyan-900 dark:text-cyan-200 flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-cyan-500" />
            <span>Key Chirpy Theme Highlights Enabled:</span>
          </h4>
          <ul className="text-xs sm:text-sm text-slate-700 dark:text-zinc-300 space-y-1.5 list-disc pl-5">
            <li><strong>Dual Column Desktop Layout:</strong> Fixed sidebar navigation + main post stream + sticky table of contents.</li>
            <li><strong>Jekyll Frontmatter Compatibility:</strong> Easily write and export standard Jekyll markdown files with YAML frontmatter.</li>
            <li><strong>Chirpy Prompt Callouts:</strong> Support for <code className="text-xs font-mono">&gt; [!NOTE]</code>, <code className="text-xs font-mono">&gt; [!TIP]</code>, <code className="text-xs font-mono">&gt; [!WARNING]</code>, and <code className="text-xs font-mono">&gt; [!DANGER]</code>.</li>
            <li><strong>Light & Dark Mode:</strong> Persistent color scheme toggle with high-contrast slate neutrals.</li>
            <li><strong>Instant Client-Side Search:</strong> Keyboard shortcut <code className="text-xs font-mono">Ctrl+K</code> or <code className="text-xs font-mono">/</code> with real-time matching.</li>
          </ul>
        </div>

        {/* Reset Demo Data */}
        <div className="pt-4 border-t border-slate-200 dark:border-zinc-800 flex justify-between items-center text-xs text-slate-400 dark:text-zinc-500">
          <span>Need to restore default demo articles and settings?</span>
          <button
            id="reset-demo-btn"
            onClick={resetToDemoData}
            className="text-cyan-600 dark:text-cyan-400 hover:underline cursor-pointer"
          >
            Reset Demo Data
          </button>
        </div>
      </div>
    </div>
  );
};
