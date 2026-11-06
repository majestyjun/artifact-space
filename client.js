window.__ModuleLoader__.load({
  id: '@xxjxx/artifact-space',
  factory(require) {
    const React = require('react');
    const h = React.createElement;

    /* ── Dictionary namespaces ─────────────────────────────────────────── */

    const NS = 'artifactSpace';
    const PANEL_ID = 'artifact-space';

    const zh = {
      'panel': '产物空间',
      'page.title': '产物空间',
      'page.subtitle': '{groups} 个工作区 · {sessions} 个会话 · {artifacts} 个产物',
      'group.ungrouped': '未归组会话',
      'group.count': '{count} 个产物',
      'session.count': '{count} 个产物',
      'session.note.migration-required': '会话需要迁移后才能读取',
      'session.note.unreadable': '会话日志无法读取',
      'artifact.presented': '交付',
      'artifact.produced': '产出',
      'filter.label': '分类',
      'filter.all': '全部',
      'filter.presented': '交付',
      'filter.produced': '产出',
      'filter.allCount': '{count}',
      'filter.presentedCount': '{count}',
      'filter.producedCount': '{count}',
      'filter.empty': '当前分类下没有产物',
      'empty.title': '还没有产物',
      'empty.body': '当会话产出或交付文件后，它们会出现在这里。',
      'loading': '正在读取产物…',
      'error.title': '无法读取产物',
      'error.retry': '重试',
      'row.more': '还有 {count} 个产物',
      'row.less': '收起',
      'preview.hint': '在左侧选择一个文件以预览。',
      'preview.loading': '正在读取文件…',
      'preview.empty': '（空文件）',
      'preview.binaryTitle': '二进制文件（{ext}，{size}）不可预览',
      'preview.imageFailed': '图片无法加载（文件可能已被移动或超出预览大小上限）',
      'preview.outsideTitle': '该文件位于工作区之外，无法预览',
      'preview.missingTitle': '该文件已不存在',
      'preview.tooLargeTitle': '文件过大，无法预览（上限 512 KB）',
      'preview.errorTitle': '无法读取该文件',
      'preview.retry': '重试',
      'preview.bytes': '{bytes}',
      'preview.lines': '{count} 行',
      'preview.close': '关闭预览',
      'preview.openInBrowser': '在浏览器中打开',
      'refresh': '刷新',
      'refresh.aria': '刷新产物列表',
      'refresh.busy': '刷新中…',
      'refresh.at': '更新于 {time}',
      'session.expand': '展开该会话的产物',
      'session.collapse': '收起该会话的产物',
      'search.placeholder': '搜索产物…',
      'search.aria': '搜索工作区、会话与产物',
      'search.hits': '{count} 项',
      'search.clear': '清除搜索',
      'search.none': '没有匹配「{query}」的结果',
      'search.noneHint': '试试更短的关键词，或按空格分隔多个词',
      'favorites.toggle': '收藏夹',
      'favorites.add': '收藏 {name}',
      'favorites.remove': '取消收藏 {name}',
      'favorites.title': '收藏夹',
      'favorites.count': '{count} 项',
      'favorites.empty': '还没有收藏',
      'favorites.emptyHint': '在产物行上点击星标，把常看或有意义的产物收藏到这里。',
      'favorites.missing': '产物已不存在',
      'favorites.unknownSession': '会话已删除',
      'favorites.prune': '清理 {count} 项失效',
      'favorites.pruneTitle': '删除已失效的收藏，并清除它们在本地存储中的记录',
      'favorites.clear': '清空',
      'favorites.clearTitle': '删除全部收藏，并清除它们在本地存储中的记录',
      'favorites.clearConfirm': '确认清空？',
      'favorites.clearConfirmTitle': '再次点击以删除全部收藏',
      'artifact.turn': '第 {turn} 轮',
      'artifact.copy': '复制内容',
      'artifact.copyPath': '复制路径',
      'artifact.copied': '已复制',
      'artifact.copyFailed': '复制失败',
      'artifact.copiedPath': '路径已复制',
      'artifact.copiedContent': '内容已复制',
      'time.justNow': '刚刚',
      'time.minutes': '{count} 分钟前',
      'time.hours': '{count} 小时前',
      'time.days': '{count} 天前',
      'time.months': '{count} 个月前',
    };

    const en = {
      'panel': 'Artifact Space',
      'page.title': 'Artifact Space',
      'page.subtitle': '{groups} workspaces · {sessions} sessions · {artifacts} artifacts',
      'group.ungrouped': 'Ungrouped sessions',
      'group.count': '{count} artifacts',
      'session.count': '{count} artifacts',
      'session.note.migration-required': 'This session needs migration before it can be read',
      'session.note.unreadable': 'This session log cannot be read',
      'artifact.presented': 'Delivered',
      'artifact.produced': 'Produced',
      'filter.label': 'Kind',
      'filter.all': 'All',
      'filter.presented': 'Delivered',
      'filter.produced': 'Produced',
      'filter.allCount': '{count}',
      'filter.presentedCount': '{count}',
      'filter.producedCount': '{count}',
      'filter.empty': 'No artifacts in this category',
      'empty.title': 'No artifacts yet',
      'empty.body': 'Files your sessions produce or deliver will appear here.',
      'loading': 'Reading artifacts…',
      'error.title': 'Could not read artifacts',
      'error.retry': 'Retry',
      'row.more': '{count} more artifacts',
      'row.less': 'Show less',
      'preview.hint': 'Select a file on the left to preview it.',
      'preview.loading': 'Reading file…',
      'preview.empty': '(empty file)',
      'preview.binaryTitle': 'Binary file ({ext}, {size}) cannot be previewed',
      'preview.imageFailed': 'The image could not be loaded (the file may have moved or exceed the preview size limit)',
      'preview.outsideTitle': 'This file lies outside the workspace and cannot be previewed',
      'preview.missingTitle': 'This file no longer exists',
      'preview.tooLargeTitle': 'This file is too large to preview (limit 512 KB)',
      'preview.errorTitle': 'Could not read this file',
      'preview.retry': 'Retry',
      'preview.bytes': '{bytes}',
      'preview.lines': '{count} lines',
      'preview.close': 'Close preview',
      'preview.openInBrowser': 'Open in browser',
      'refresh': 'Refresh',
      'refresh.aria': 'Refresh the artifact list',
      'refresh.busy': 'Refreshing…',
      'refresh.at': 'Updated at {time}',
      'session.expand': 'Expand this session’s artifacts',
      'session.collapse': 'Collapse this session’s artifacts',
      'search.placeholder': 'Search artifacts…',
      'search.aria': 'Search workspaces, sessions and artifacts',
      'search.hits': '{count} found',
      'search.clear': 'Clear the search',
      'search.none': 'No results for “{query}”',
      'search.noneHint': 'Try a shorter keyword, or separate several words with spaces',
      'favorites.toggle': 'Favorites',
      'favorites.add': 'Favorite {name}',
      'favorites.remove': 'Remove {name} from favorites',
      'favorites.title': 'Favorites',
      'favorites.count': '{count} items',
      'favorites.empty': 'No favorites yet',
      'favorites.emptyHint': 'Click the star on an artifact to keep the ones you look at often or find meaningful.',
      'favorites.missing': 'This artifact no longer exists',
      'favorites.unknownSession': 'Session removed',
      'favorites.prune': 'Clean up {count} stale',
      'favorites.pruneTitle': 'Remove the stale favorites and delete their local storage records',
      'favorites.clear': 'Clear',
      'favorites.clearTitle': 'Remove every favorite and delete their local storage records',
      'favorites.clearConfirm': 'Confirm clear?',
      'favorites.clearConfirmTitle': 'Click again to remove every favorite',
      'artifact.turn': 'Turn {turn}',
      'artifact.copy': 'Copy content',
      'artifact.copyPath': 'Copy path',
      'artifact.copied': 'Copied',
      'artifact.copyFailed': 'Copy failed',
      'artifact.copiedPath': 'Path copied',
      'artifact.copiedContent': 'Content copied',
      'time.justNow': 'just now',
      'time.minutes': '{count} min ago',
      'time.hours': '{count} h ago',
      'time.days': '{count} d ago',
      'time.months': '{count} mo ago',
    };

    /* ── Styles ────────────────────────────────────────────────────────── */

    // Component-scoped class names under the plugin's own prefix; only
    // `--dsw-alias-*` / `--dsw-radius-*` / `--dsw-font-*` theme tokens are
    // referenced, so a renamed token degrades appearance without breaking
    // rendering. `container-type` makes the narrow-container query below
    // resolve against this panel's own width.
    const CSS = `/* ═══════════════════════════════════════════════════════════
   玻璃令牌：明暗两套
   ═══════════════════════════════════════════════════════════ */
.artifact-space-root{
  /* L0 底衬 */
  --glass-blob-1: rgba(96,158,255,.62);
  --glass-blob-2: rgba(255,132,172,.34);
  --glass-blob-3: rgba(88,226,214,.40);

  /* L1 面板玻璃 */
  --glass-surface: rgba(255,255,255,.14);
  --glass-surface-strong: rgba(255,255,255,.24);
  --glass-edge: rgba(255,255,255,.58);
  --glass-edge-soft: rgba(255,255,255,.28);
  --glass-header: rgba(255,255,255,.10);
  --glass-blur: 16px;
  --glass-saturate: 210%;

  /* 内高光与投影 */
  --glass-inner-top: 0 1px 0 rgba(255,255,255,.55) inset;
  --glass-inner-bottom: 0 -1px 0 rgba(31,38,90,.05) inset;
  --glass-shadow: 0 8px 24px rgba(31,38,90,.10), 0 1px 3px rgba(31,38,90,.06);

  /* L3 选中玻璃 */
  --glass-accent: rgba(70,120,235,.16);
  --glass-accent-edge: rgba(90,140,255,.5);
  --glass-accent-glow: 0 0 0 3px rgba(90,140,255,.10), 0 3px 14px rgba(60,110,255,.24);
  --glass-accent-icon: #4a7fe0;
  /* 收藏星标：琥珀金，与蓝青主调区分但不喧宾夺主 */
  --glass-star: #e0a038;
  /* 失败态：优先用宿主令牌，缺失时回落到一个可读的暖红 */
  --glass-error: var(--dsw-alias-state-error-primary, #c2453d);

  /* 文本在玻璃上的可读性覆盖 */
  --glass-text-primary: var(--dsw-alias-label-primary);
  --glass-text-secondary: var(--dsw-alias-label-secondary);
  --glass-text-tertiary: var(--dsw-alias-label-tertiary);

  /* 底衬 */
  --glass-base-1: #e9edf6;
  --glass-base-2: #eef0f8;
  --glass-base-3: #e4eff6;
  --glass-base-4: #eaeef5;

  position:relative;
  isolation:isolate;
  height:100%;
  min-height:0;
  box-sizing:border-box;
  display:flex;
  flex-direction:column;
  flex:1;
  color:var(--glass-text-primary);
  font-size:13px;
  container-type:inline-size;
  background:
    radial-gradient(32rem 22rem at 84% -6%, var(--glass-blob-1) 0%, transparent 54%),
    radial-gradient(15rem 11rem at 3% 101%, var(--glass-blob-2) 0%, transparent 34%),
    radial-gradient(26rem 20rem at 22% 52%, var(--glass-blob-3) 0%, transparent 56%),
    radial-gradient(24rem 18rem at 62% 88%, var(--glass-blob-3) 0%, transparent 52%),
    linear-gradient(148deg, var(--glass-base-1) 0%, var(--glass-base-2) 38%, var(--glass-base-3) 72%, var(--glass-base-4) 100%);
  background-attachment:local;
}

/* 暗色主题覆盖 —— 通过宿主的主题 class 或 prefers-color-scheme 触发 */
@media (prefers-color-scheme: dark){
  .artifact-space-root{
    --glass-blob-1: rgba(90,150,255,.32);
    --glass-blob-2: rgba(210,110,160,.13);
    --glass-blob-3: rgba(80,200,220,.17);
    --glass-surface: rgba(255,255,255,.07);
    --glass-surface-strong: rgba(255,255,255,.11);
    --glass-edge: rgba(255,255,255,.15);
    --glass-edge-soft: rgba(255,255,255,.09);
    --glass-header: rgba(255,255,255,.05);
    --glass-blur: 28px;
    --glass-saturate: 160%;
    --glass-inner-top: 0 1px 0 rgba(255,255,255,.16) inset;
    --glass-inner-bottom: 0 -1px 0 rgba(0,0,0,.30) inset;
    --glass-shadow: 0 12px 32px rgba(0,0,0,.42);
    --glass-accent: rgba(90,140,255,.17);
    --glass-accent-edge: rgba(130,175,255,.42);
    --glass-accent-glow: 0 0 0 3px rgba(90,140,255,.10), 0 3px 14px rgba(60,110,255,.26);
    --glass-accent-icon: #8ab4ff;
    --glass-star: #f0b455;
    --glass-error: var(--dsw-alias-state-error-primary, #e2726a);
    --glass-base-1: #12131c;
    --glass-base-2: #171722;
    --glass-base-3: #101a26;
    --glass-base-4: #141820;
  }
}

/* 不支持 backdrop-filter 时降级为不透明（保证可读） */
@supports not (backdrop-filter: blur(1px)){
  .artifact-space-root{--glass-surface:rgba(255,255,255,.94);--glass-surface-strong:rgba(255,255,255,.98);--glass-header:rgba(248,250,253,.92);--glass-edge:rgba(31,38,90,.10)}
  @media (prefers-color-scheme: dark){
    .artifact-space-root{--glass-surface:rgba(26,28,38,.96);--glass-surface-strong:rgba(32,35,46,.98);--glass-header:rgba(22,24,33,.94);--glass-edge:rgba(255,255,255,.12)}
  }
}

/* ═══════════════════════════════════════════════════════════
   玻璃面板本体
   ═══════════════════════════════════════════════════════════ */
.artifact-space-root::before{
  content:"";
  position:absolute;
  inset:0;
  z-index:-1;
  pointer-events:none;
  background:linear-gradient(115deg, rgba(255,255,255,.20) 0%, transparent 34%, transparent 66%, rgba(255,255,255,.12) 100%);
}

.artifact-space-shell{
  position:relative;
  z-index:1;
  box-sizing:border-box;
  height:100%;
  min-height:0;
  display:flex;
  flex-direction:column;
  border-radius:12px;
  margin:8px;
  overflow:hidden;
  background:var(--glass-surface);
  border:.5px solid var(--glass-edge);
  box-shadow:var(--glass-inner-top), var(--glass-inner-bottom), var(--glass-shadow);
  -webkit-backdrop-filter:blur(var(--glass-blur)) saturate(var(--glass-saturate));
  backdrop-filter:blur(var(--glass-blur)) saturate(var(--glass-saturate));
}

/* 边缘折射：伪元素画一圈亮线，模拟光线在玻璃棱边聚集 */
.artifact-space-shell::after{
  content:"";
  position:absolute;
  inset:0;
  border-radius:inherit;
  pointer-events:none;
  padding:1px;
  background:linear-gradient(145deg,
    rgba(255,255,255,.85) 0%,
    rgba(255,255,255,.12) 22%,
    rgba(255,255,255,.04) 48%,
    rgba(255,255,255,.30) 78%,
    rgba(255,255,255,.70) 100%);
  -webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);
  -webkit-mask-composite:xor;
  mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);
  mask-composite:exclude;
  z-index:3;
}

/* ═══════════════════════════════════════════════════════════
   Header — 磨砂条
   ═══════════════════════════════════════════════════════════ */
.artifact-space-head{
  box-sizing:border-box;
  height:42px;
  flex:none;
  display:flex;
  align-items:center;
  gap:9px;
  padding:0 12px 0 14px;
  border-bottom:.5px solid var(--glass-edge-soft);
  background:var(--glass-header);
  -webkit-backdrop-filter:blur(10px) saturate(140%);
  backdrop-filter:blur(10px) saturate(140%);
}
.artifact-space-headIcon{width:15px;height:15px;flex:none;color:var(--glass-text-tertiary)}
.artifact-space-title{margin:0;font-size:13px;font-weight:500;line-height:18px;white-space:nowrap}
.artifact-space-subtitle{margin:0;font-size:11px;line-height:16px;color:var(--glass-text-tertiary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.artifact-space-headSpacer{flex:1;min-width:8px}
.artifact-space-tool{
  width:26px;height:26px;flex:none;
  display:inline-flex;align-items:center;justify-content:center;
  padding:0;border:0;border-radius:8px;
  background:rgba(255,255,255,.30);
  color:var(--glass-text-tertiary);
  cursor:pointer;
  box-shadow:0 1px 0 rgba(255,255,255,.45) inset;
  transition:background .12s ease-out,color .12s ease-out;
}
.artifact-space-tool:hover{background:rgba(255,255,255,.48);color:var(--glass-text-primary)}
.artifact-space-tool:active{background:rgba(255,255,255,.24)}
.artifact-space-tool:focus-visible{outline:2px solid var(--glass-accent-edge);outline-offset:2px}
.artifact-space-tool svg{width:13px;height:13px}
/* 刷新中：图标旋转，明确告诉用户点击已经生效 */
.artifact-space-tool[data-busy="true"]{color:var(--glass-accent-icon);cursor:progress}
.artifact-space-tool[data-busy="true"] svg{animation:artifact-space-spin .9s linear infinite}
@keyframes artifact-space-spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}
/* 刷新时间戳 */
.artifact-space-refreshStamp{
  flex:none;
  font-size:11px;
  line-height:16px;
  color:var(--glass-text-tertiary);
  font-variant-numeric:tabular-nums;
  white-space:nowrap;
  min-width:0;
}
.artifact-space-refreshStamp[data-busy="true"]{color:var(--glass-accent-icon)}

/* ── 分类筛选（全部 / 交付 / 产出） ─────────────────────── */
.artifact-space-filter{
  flex:none;
  display:inline-flex;
  align-items:center;
  gap:1px;
  height:26px;
  padding:2px;
  border-radius:9px;
  background:rgba(255,255,255,.22);
  box-shadow:0 1px 0 rgba(255,255,255,.32) inset;
}
.artifact-space-filterBtn{
  display:inline-flex;
  align-items:center;
  gap:4px;
  height:100%;
  padding:0 8px;
  border:0;border-radius:7px;
  background:transparent;
  color:var(--glass-text-tertiary);
  font-family:var(--dsw-font-markdown-base);
  font-size:11px;
  line-height:14px;
  white-space:nowrap;
  cursor:pointer;
  transition:background .12s ease-out,color .12s ease-out;
}
.artifact-space-filterBtn:hover{color:var(--glass-text-primary)}
.artifact-space-filterBtn:focus-visible{outline:2px solid var(--glass-accent-edge);outline-offset:-1px}
/* 选中档：玻璃底 + 主色文字，一眼看出当前分类 */
.artifact-space-filterBtn[aria-pressed="true"]{
  background:rgba(255,255,255,.46);
  color:var(--glass-text-primary);
  box-shadow:0 1px 0 rgba(255,255,255,.5) inset;
}
.artifact-space-filterBtn[data-kind="presented"][aria-pressed="true"]{color:var(--glass-accent-icon)}
.artifact-space-filterCount{
  font-size:10px;
  font-variant-numeric:tabular-nums;
  color:var(--glass-text-tertiary);
}
.artifact-space-filterBtn[aria-pressed="true"] .artifact-space-filterCount{
  color:inherit;
  opacity:.75;
}

/* ── 搜索框 ────────────────────────────────────────────── */
.artifact-space-search{
  box-sizing:border-box;
  flex:0 1 210px;
  min-width:0;
  height:26px;
  display:flex;
  align-items:center;
  gap:5px;
  padding:0 6px 0 8px;
  border-radius:8px;
  background:rgba(255,255,255,.22);
  border:.5px solid transparent;
  box-shadow:0 1px 0 rgba(255,255,255,.32) inset;
  transition:background .14s ease-out,border-color .14s ease-out;
}
.artifact-space-search:hover{background:rgba(255,255,255,.30)}
.artifact-space-search:focus-within{
  background:rgba(255,255,255,.36);
  border-color:var(--glass-accent-edge);
}
.artifact-space-search[data-active="true"]{background:rgba(255,255,255,.34)}
.artifact-space-searchIcon{
  flex:none;
  color:var(--glass-text-tertiary);
}
.artifact-space-search:focus-within .artifact-space-searchIcon{color:var(--glass-accent-icon)}
.artifact-space-searchInput{
  box-sizing:border-box;
  flex:1;
  min-width:0;
  height:100%;
  padding:0;
  border:0;
  outline:none;
  background:transparent;
  color:var(--glass-text-primary);
  font-family:var(--dsw-font-markdown-base);
  font-size:12px;
  line-height:16px;
}
.artifact-space-searchInput::placeholder{color:var(--glass-text-tertiary);opacity:.8}
/* 原生 search 控件的清除按钮会与我们的重复，去掉 */
.artifact-space-searchInput::-webkit-search-cancel-button,
.artifact-space-searchInput::-webkit-search-decoration{-webkit-appearance:none;appearance:none;display:none}
.artifact-space-searchCount{
  flex:none;
  font-size:10px;
  line-height:15px;
  color:var(--glass-text-tertiary);
  font-variant-numeric:tabular-nums;
  white-space:nowrap;
}
.artifact-space-searchClear{
  flex:none;
  width:16px;height:16px;
  display:inline-flex;align-items:center;justify-content:center;
  padding:0;border:0;border-radius:5px;
  background:transparent;color:var(--glass-text-tertiary);cursor:pointer;
  transition:background .12s ease-out,color .12s ease-out;
}
.artifact-space-searchClear:hover{background:rgba(255,255,255,.36);color:var(--glass-text-primary)}
.artifact-space-searchClear:focus-visible{outline:2px solid var(--glass-accent-edge);outline-offset:1px}

/* 搜索命中高亮 */
.artifact-space-hit{
  background:var(--artifact-space-search-hit);
  color:var(--artifact-space-search-hit-fg);
  border-radius:3px;
  padding:0 1px;
  font-weight:600;
}

/* ═══════════════════════════════════════════════════════════
   双栏容器
   ═══════════════════════════════════════════════════════════ */
.artifact-space-body{
  box-sizing:border-box;
  flex:1;min-height:0;
  display:grid;
  grid-template-columns:minmax(0,1fr) minmax(0,1fr);
  position:relative;
}
.artifact-space-tree{
  box-sizing:border-box;min-width:0;overflow:auto;
  padding:8px 0 16px;
  border-right:.5px solid var(--glass-edge-soft);
}
.artifact-space-pane{
  box-sizing:border-box;min-width:0;
  display:flex;flex-direction:column;
  overflow:hidden;
  padding:8px 10px 12px;
}

/* 窄容器降级 */
@container (max-width:720px){
  .artifact-space-body{grid-template-columns:minmax(0,1fr)}
  .artifact-space-tree{border-right:0}
  .artifact-space-pane{
    position:absolute;inset:0;z-index:2;
    background:var(--glass-surface);
    -webkit-backdrop-filter:blur(var(--glass-blur)) saturate(var(--glass-saturate));
    backdrop-filter:blur(var(--glass-blur)) saturate(var(--glass-saturate));
  }
}

/* ═══════════════════════════════════════════════════════════
   工作区行
   ═══════════════════════════════════════════════════════════ */
.artifact-space-group{margin:0;padding:0}
.artifact-space-groupHead{
  box-sizing:border-box;height:32px;
  display:flex;align-items:center;gap:7px;
  padding:0 11px;
  cursor:pointer;user-select:none;
  border-radius:8px;
  margin:0 6px;
  transition:background .12s ease-out;
}
.artifact-space-groupHead:hover{background:rgba(255,255,255,.26)}
.artifact-space-groupHead:focus-visible{outline:2px solid var(--glass-accent-edge);outline-offset:-2px}
.artifact-space-chevron{
  width:11px;height:11px;flex:none;
  color:var(--glass-text-tertiary);
  transition:transform .14s ease-out;
}
.artifact-space-groupHead[data-open="true"] .artifact-space-chevron{transform:rotate(90deg)}
.artifact-space-groupTitle{
  flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;
  font-size:13px;font-weight:500;line-height:18px;
}
.artifact-space-groupMeta{flex:none;font-size:11px;line-height:16px;color:var(--glass-text-tertiary);font-variant-numeric:tabular-nums}
.artifact-space-groupTime{flex:none;width:50px;text-align:right;font-size:11px;line-height:16px;color:var(--glass-text-tertiary);font-variant-numeric:tabular-nums}
.artifact-space-groupBody{padding:3px 0 6px 14px}

/* ═══════════════════════════════════════════════════════════
   会话行
   ═══════════════════════════════════════════════════════════ */
.artifact-space-session{margin:0;padding:0}
.artifact-space-sessionHead{
  box-sizing:border-box;height:27px;
  display:flex;align-items:center;gap:6px;
  padding:0 11px 0 6px;
  cursor:pointer;
  border-radius:8px;
  transition:background .12s ease-out;
}
.artifact-space-sessionHead:hover{background:rgba(255,255,255,.24)}
.artifact-space-sessionHead:focus-visible{outline:2px solid var(--glass-accent-edge);outline-offset:-2px}
/* 会话级 chevron：统一朝右，展开时旋转 90° 指向下方。
   两种状态用同一个基准方向，浅色背景下箭头形状始终清晰可辨。 */
.artifact-space-sessionHead .artifact-space-chevron{
  flex:none;
  width:12px;height:12px;
  color:var(--glass-text-tertiary);
  transition:transform .14s ease-out;
  transform:rotate(0deg);
}
.artifact-space-session[data-folded="false"] .artifact-space-sessionHead .artifact-space-chevron{transform:rotate(90deg)}
/* 折叠态的会话头：更明确的层级感 */
.artifact-space-session[data-folded="true"] .artifact-space-sessionTitle{color:var(--glass-text-tertiary)}
.artifact-space-sessionTitle{
  flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;
  font-size:12px;line-height:18px;font-weight:500;
  color:var(--glass-text-secondary);
}
.artifact-space-sessionMeta{flex:none;font-size:11px;line-height:16px;color:var(--glass-text-tertiary);font-variant-numeric:tabular-nums}
.artifact-space-sessionTime{flex:none;width:50px;text-align:right;font-size:11px;line-height:16px;color:var(--glass-text-tertiary);font-variant-numeric:tabular-nums}
.artifact-space-sessionBody{padding:0 0 5px}

/* 会话行可展开时（group.count > 0 时 DSH 会加 data-expandable）*/
.artifact-space-sessionHead[data-expandable="true"]{cursor:pointer;border-radius:8px;margin:0 6px 0 6px;padding:0 5px 0 0;transition:background .12s ease-out}
.artifact-space-sessionHead[data-expandable="true"]:hover{background:rgba(255,255,255,.24)}
.artifact-space-sessionHead[data-expandable="true"]:focus-visible{outline:2px solid var(--glass-accent-edge);outline-offset:-2px}
.artifact-space-sessionChevron{width:10px;height:10px;flex:none;color:var(--glass-text-tertiary);transition:transform .14s ease-out}
.artifact-space-sessionHead[data-open="true"] .artifact-space-sessionChevron{transform:rotate(90deg)}

/* ═══════════════════════════════════════════════════════════
   文件行 — 玻璃药丸
   ═══════════════════════════════════════════════════════════ */
.artifact-space-list{margin:0;padding:0;list-style:none;display:flex;flex-direction:column;gap:1px}
.artifact-space-row{
  box-sizing:border-box;height:25px;
  display:grid;
  grid-template-columns:15px minmax(0,1fr) auto 48px 18px;
  align-items:center;gap:7px;
  padding:0 8px 0 8px;
  margin:0 6px 0 30px;
  border-radius:8px;
  cursor:pointer;
  border:.5px solid transparent;
  transition:background .1s ease-out,box-shadow .1s ease-out,border-color .1s ease-out;
}.artifact-space-row:hover{
  background:rgba(255,255,255,.30);
  border-color:var(--glass-edge-soft);
}
.artifact-space-row:focus-visible{outline:2px solid var(--glass-accent-edge);outline-offset:-2px}
.artifact-space-row[data-selected="true"]{
  background:var(--glass-accent);
  border-color:var(--glass-accent-edge);
  box-shadow:0 1px 0 rgba(255,255,255,.40) inset, var(--glass-accent-glow);
}
.artifact-space-rowIcon{width:12px;height:12px;flex:none;color:var(--glass-text-tertiary)}
.artifact-space-rowIcon[data-binary="true"]{color:var(--glass-accent-icon)}
.artifact-space-rowName{
  min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;
  font-size:12px;line-height:18px;
  color:var(--glass-text-primary);
}
.artifact-space-rowName[data-outside="true"]{color:var(--glass-text-secondary)}
.artifact-space-row[data-selected="true"] .artifact-space-rowName{font-weight:500}
.artifact-space-rowSize{flex:none;text-align:right;font-size:11px;line-height:16px;color:var(--glass-text-tertiary);font-variant-numeric:tabular-nums;white-space:nowrap}
/* 产物时间：与「最新的在最上面」的排序对应，鼠标悬停给出绝对时间 */
.artifact-space-rowTime{
  flex:none;
  font-size:10px;
  line-height:16px;
  color:var(--glass-text-tertiary);
  font-variant-numeric:tabular-nums;
  white-space:nowrap;
  opacity:.8;
}
/* 空间紧张时（窄面板 / 长文件名）先让位给文件名与大小 */
@container (max-width:420px){
  .artifact-space-rowTime{display:none}
}
.artifact-space-rowMore{
  box-sizing:border-box;height:25px;
  display:flex;align-items:center;gap:6px;
  padding:0 11px 0 42px;margin:0 6px 0 30px;
  border-radius:8px;
  cursor:pointer;
  font-size:11px;line-height:18px;
  color:var(--glass-text-tertiary);
  transition:background .12s ease-out;
}
.artifact-space-rowMore:hover{background:rgba(255,255,255,.26)}
.artifact-space-rowMore:focus-visible{outline:2px solid var(--glass-accent-edge);outline-offset:-2px}

/* ═══════════════════════════════════════════════════════════
   预览面板 — 浮层玻璃
   ═══════════════════════════════════════════════════════════ */
.artifact-space-preview{
  box-sizing:border-box;min-height:0;flex:1;
  display:flex;flex-direction:column;
  overflow:hidden;
  border-radius:11px;
  border:.5px solid var(--glass-edge);
  background:var(--glass-surface-strong);
  box-shadow:0 1px 0 rgba(255,255,255,.45) inset, 0 4px 14px rgba(31,38,90,.07);
  -webkit-backdrop-filter:blur(18px) saturate(160%);
  backdrop-filter:blur(18px) saturate(160%);
}
.artifact-space-previewHead{
  box-sizing:border-box;height:32px;flex:none;
  display:flex;align-items:center;gap:8px;
  padding:0 9px 0 11px;
  border-bottom:.5px solid var(--glass-edge-soft);
  background:var(--glass-header);
}
.artifact-space-previewTitle{
  flex:0 1 auto;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;
  font-size:12px;line-height:18px;font-weight:500;
  font-family:var(--dsw-font-markdown-code-block);
}
.artifact-space-previewMeta{flex:none;font-size:11px;line-height:16px;color:var(--glass-text-tertiary);font-variant-numeric:tabular-nums;white-space:nowrap}
/* 语言徽章（VS Code 的文件类型标签） */
.artifact-space-previewBadge{
  flex:none;
  padding:1px 6px;
  border:.5px solid var(--glass-edge-soft);
  border-radius:var(--dsw-radius-sm);
  background:rgba(255,255,255,.26);
  font-size:10px;
  line-height:15px;
  letter-spacing:.03em;
  text-transform:lowercase;
  color:var(--glass-text-secondary);
}
.artifact-space-previewClose{
  flex:none;width:18px;height:18px;
  display:inline-flex;align-items:center;justify-content:center;
  padding:0;border:0;border-radius:6px;
  background:transparent;color:var(--glass-text-tertiary);cursor:pointer;
  transition:background .12s ease-out;
}
.artifact-space-previewClose:hover{background:rgba(255,255,255,.34);color:var(--glass-text-primary)}
.artifact-space-previewClose:focus-visible{outline:2px solid var(--glass-accent-edge);outline-offset:1px}
.artifact-space-previewClose svg{width:11px;height:11px}
.artifact-space-previewBody{
  box-sizing:border-box;flex:1;min-height:0;overflow:hidden;
  margin:0;padding:10px 12px 12px;
  font-family:var(--dsw-font-markdown-code-block);
  font-size:12px;line-height:1.65;
  color:var(--glass-text-secondary);
}
/* 预览正文的玻璃内衬，强化层次 */
.artifact-space-previewBody::selection{background:var(--glass-accent)}

/* 图片预览：铺满可用区域，居中显示，图片本身不被裁切 */
.artifact-space-previewImageWrap{
  box-sizing:border-box;flex:1;min-height:0;
  display:flex;align-items:center;justify-content:center;
  margin:0;padding:12px;
  overflow:auto;
  background:
    linear-gradient(45deg,rgba(255,255,255,.10) 25%,transparent 25%,transparent 75%,rgba(255,255,255,.10) 75%),
    linear-gradient(45deg,rgba(255,255,255,.10) 25%,transparent 25%,transparent 75%,rgba(255,255,255,.10) 75%);
  background-size:16px 16px;
  background-position:0 0,8px 8px;
}
.artifact-space-previewImage{
  display:block;max-width:100%;max-height:100%;
  width:auto;height:auto;
  object-fit:contain;
  border-radius:6px;
  box-shadow:0 6px 20px rgba(0,0,0,.22),0 0 0 1px rgba(255,255,255,.22) inset;
}
/* HTML 预览：文档在自己的框里滚动，边框把预览区和面板区分开 */
.artifact-space-previewFrame{
  box-sizing:border-box;flex:1;min-height:0;
  width:100%;
  border:0;
  border-top:.5px solid var(--glass-edge-soft);
  border-radius:var(--dsw-radius-md);
  background:#fff;
  box-shadow:0 1px 0 rgba(255,255,255,.45) inset;
}

/* 富文本预览（Markdown / YAML）：代码区自带滚动，正文不再重复滚动 */
.artifact-space-previewRich{
  padding:12px 14px 16px;
  white-space:normal;
  overflow-wrap:break-word;
  overflow:auto;
  min-height:0;
}
.artifact-space-previewRich .artifact-space-mdPre{
  background:rgba(255,255,255,.16);
  box-shadow:0 1px 0 rgba(255,255,255,.35) inset;
}
.artifact-space-previewRich .artifact-space-mdCodeBlock{overflow-x:auto}

/* 预览状态 */
.artifact-space-previewState{
  box-sizing:border-box;flex:1;min-height:0;
  display:flex;flex-direction:column;align-items:flex-start;gap:7px;
  padding:16px 18px;
}
.artifact-space-previewStateIcon{width:16px;height:16px;flex:none;color:var(--glass-text-tertiary)}
.artifact-space-previewStateTitle{margin:0;font-size:13px;line-height:18px;font-weight:500}
.artifact-space-previewStateText{
  margin:0;font-size:11px;line-height:17px;
  color:var(--glass-text-tertiary);
  word-break:break-all;
  font-family:var(--dsw-font-markdown-code-block);
}
.artifact-space-previewState[data-kind="binary"] .artifact-space-previewStateIcon{color:var(--glass-accent-icon)}
.artifact-space-previewState[data-kind="outside"] .artifact-space-previewStateIcon,
.artifact-space-previewState[data-kind="missing"] .artifact-space-previewStateIcon,
.artifact-space-previewState[data-kind="error"] .artifact-space-previewStateIcon{color:var(--dsw-alias-state-error-primary)}
.artifact-space-previewStateAction{
  margin-top:3px;padding:4px 11px;
  border:.5px solid var(--glass-edge);
  border-radius:8px;
  background:rgba(255,255,255,.28);
  color:var(--glass-text-secondary);
  font-size:12px;line-height:18px;cursor:pointer;
  transition:background .12s ease-out;
}
.artifact-space-previewStateAction:hover{background:rgba(255,255,255,.46);color:var(--glass-text-primary)}
.artifact-space-previewStateAction:focus-visible{outline:2px solid var(--glass-accent-edge);outline-offset:2px}

/* ═══════════════════════════════════════════════════════════
   空状态 / 加载
   ═══════════════════════════════════════════════════════════ */
.artifact-space-status{
  box-sizing:border-box;flex:1;
  display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;
  padding:48px 24px;
  color:var(--glass-text-secondary);font-size:13px;line-height:18px;
}
.artifact-space-statusTitle{margin:0;font-size:13px;font-weight:500;color:var(--glass-text-primary)}
.artifact-space-statusBody{margin:0;font-size:12px;line-height:18px;color:var(--glass-text-tertiary);text-align:center;max-width:32em}
.artifact-space-statusAction{
  margin-top:6px;padding:5px 13px;
  border:.5px solid var(--glass-edge);
  border-radius:8px;
  background:rgba(255,255,255,.28);
  color:var(--glass-text-secondary);font-size:12px;cursor:pointer;
  transition:background .12s ease-out;
}
.artifact-space-statusAction:hover{background:rgba(255,255,255,.46);color:var(--glass-text-primary)}

/* ═══════════════════════════════════════════════════════════
   收藏夹
   ═══════════════════════════════════════════════════════════ */
/* 行内星标：默认透明，悬停整行时才浮现；已收藏则常亮 */
.artifact-space-star{
  box-sizing:border-box;
  width:18px;height:18px;flex:none;
  display:inline-flex;align-items:center;justify-content:center;
  padding:0;border:0;border-radius:6px;
  background:transparent;
  color:var(--glass-text-tertiary);
  cursor:pointer;
  opacity:0;
  transition:opacity .12s ease-out,background .12s ease-out,color .12s ease-out;
}
.artifact-space-row:hover .artifact-space-star,
.artifact-space-star:focus-visible,
.artifact-space-star[aria-pressed="true"]{opacity:1}
.artifact-space-star:hover{background:rgba(255,255,255,.42);color:var(--glass-star)}
.artifact-space-star:focus-visible{outline:2px solid var(--glass-accent-edge);outline-offset:1px}
.artifact-space-star[aria-pressed="true"]{color:var(--glass-star)}

/* 头部收藏夹按钮：带计数徽标 */
.artifact-space-favTool{
  position:relative;
  width:auto;min-width:26px;padding:0 6px;gap:3px;
  /* 与搜索框拉开一点距离，两者同属「查找/筛选」这一类控件 */
  margin-right:4px;
}
.artifact-space-favTool[data-active="true"]{color:var(--glass-star);background:rgba(255,255,255,.44)}
.artifact-space-favTool[data-active="true"]:hover{background:rgba(255,255,255,.56)}
.artifact-space-favCount{
  font-size:10px;line-height:12px;
  font-variant-numeric:tabular-nums;
  color:var(--glass-text-tertiary);
}
.artifact-space-favTool[data-active="true"] .artifact-space-favCount{color:var(--glass-star)}

/* 收藏列表 */
.artifact-space-favWrap{
  box-sizing:border-box;flex:1;
  display:flex;flex-direction:column;
  min-height:0;overflow:auto;
  padding:0 0 8px;
}
.artifact-space-favHead{
  position:sticky;top:0;z-index:1;
  display:flex;align-items:center;gap:8px;
  padding:9px 14px 7px;
  background:var(--glass-header);
  backdrop-filter:blur(8px);
  -webkit-backdrop-filter:blur(8px);
}
.artifact-space-favHeadTitle{font-size:12px;font-weight:500;color:var(--glass-text-primary)}
.artifact-space-favHeadCount{font-size:11px;color:var(--glass-text-tertiary);font-variant-numeric:tabular-nums}
.artifact-space-favPrune{
  margin-left:auto;
  padding:2px 8px;
  border:.5px solid var(--glass-edge);
  border-radius:7px;
  background:rgba(255,255,255,.26);
  color:var(--glass-text-secondary);font-size:11px;line-height:16px;cursor:pointer;
  transition:background .12s ease-out,color .12s ease-out;
}
.artifact-space-favPrune:hover{background:rgba(255,255,255,.46);color:var(--glass-text-primary)}
.artifact-space-favPrune:focus-visible{outline:2px solid var(--glass-accent-edge);outline-offset:1px}
/* 清空全部：默认安静，二次确认时才亮出警告色 */
.artifact-space-favClear{
  padding:2px 8px;
  border:.5px solid transparent;
  border-radius:7px;
  background:transparent;
  color:var(--glass-text-tertiary);font-size:11px;line-height:16px;cursor:pointer;
  transition:background .12s ease-out,color .12s ease-out,border-color .12s ease-out;
}
.artifact-space-favClear:hover{background:rgba(255,255,255,.34);color:var(--glass-text-secondary)}
.artifact-space-favClear:focus-visible{outline:2px solid var(--glass-accent-edge);outline-offset:1px}
.artifact-space-favClear[data-confirming="true"]{
  border-color:var(--glass-error);
  background:rgba(255,255,255,.42);
  color:var(--glass-error);
  font-weight:500;
}

.artifact-space-favList{margin:0;padding:0 6px;list-style:none;display:flex;flex-direction:column;gap:1px}
.artifact-space-favItem{
  box-sizing:border-box;
  display:grid;
  grid-template-columns:15px minmax(0,1fr) 50px 18px;
  align-items:center;gap:7px;
  height:31px;
  padding:0 8px 0 10px;
  border-radius:8px;
  border:.5px solid transparent;
  transition:background .12s ease-out,border-color .12s ease-out;
}
.artifact-space-favItem:hover{background:rgba(255,255,255,.30);border-color:var(--glass-edge-soft)}
.artifact-space-favItem[data-missing="true"]{opacity:.62}
.artifact-space-favIcon{width:12px;height:12px;flex:none;color:var(--glass-text-tertiary);display:flex}
.artifact-space-favIcon svg{width:12px;height:12px}
.artifact-space-favMain{
  box-sizing:border-box;
  min-width:0;
  display:flex;flex-direction:column;align-items:flex-start;gap:1px;
  padding:0;border:0;background:transparent;
  font:inherit;color:inherit;text-align:left;cursor:pointer;
}
.artifact-space-favMain:disabled{cursor:default}
.artifact-space-favMain:focus-visible{outline:2px solid var(--glass-accent-edge);outline-offset:2px;border-radius:6px}
.artifact-space-favName{
  max-width:100%;
  font-size:12px;line-height:15px;
  color:var(--glass-text-primary);
  overflow:hidden;text-overflow:ellipsis;white-space:nowrap;
}
.artifact-space-favSource{
  max-width:100%;
  font-size:10px;line-height:13px;
  color:var(--glass-text-tertiary);
  overflow:hidden;text-overflow:ellipsis;white-space:nowrap;
}
.artifact-space-favTime{
  flex:none;text-align:right;
  font-size:11px;line-height:16px;
  color:var(--glass-text-tertiary);
  font-variant-numeric:tabular-nums;
}
.artifact-space-favRemove{opacity:.55;color:var(--glass-star)}
.artifact-space-favItem:hover .artifact-space-favRemove{opacity:1}
.artifact-space-favRemove:hover{color:var(--glass-text-primary)}

/* ═══════════════════════════════════════════════════════════
   产物来源信息（交付/产出 · 第几轮 · 说明）
   ═══════════════════════════════════════════════════════════ */
.artifact-space-meta{
  display:inline-flex;align-items:center;gap:6px;
  min-width:0;flex:none;
}
.artifact-space-metaKind{
  flex:none;
  padding:0 5px;height:15px;
  display:inline-flex;align-items:center;
  border-radius:5px;
  font-size:10px;line-height:15px;
  border:.5px solid var(--glass-edge-soft);
  background:rgba(255,255,255,.26);
  color:var(--glass-text-secondary);
  white-space:nowrap;
}
/* 交付 = 会话明确交付给用户的成果，比「顺手产出」更值得注意 */
.artifact-space-metaKind[data-kind="presented"]{
  border-color:var(--glass-accent-edge);
  background:var(--glass-accent);
  color:var(--glass-accent-icon);
}
/* 列表行里的徽章保持安静，不与文件名争夺注意力 */
.artifact-space-row .artifact-space-metaKind{
  padding:0 4px;height:14px;
  font-size:9px;line-height:14px;
  border-color:transparent;
  background:rgba(255,255,255,.20);
  color:var(--glass-text-tertiary);
}
.artifact-space-row .artifact-space-metaKind[data-kind="presented"]{
  background:var(--glass-accent);
  color:var(--glass-accent-icon);
}
.artifact-space-metaTurn{
  flex:none;
  font-size:10px;line-height:15px;
  color:var(--glass-text-tertiary);
  font-variant-numeric:tabular-nums;
  white-space:nowrap;
}
.artifact-space-metaDesc{
  min-width:0;max-width:26em;
  overflow:hidden;text-overflow:ellipsis;white-space:nowrap;
  font-size:11px;line-height:16px;
  color:var(--glass-text-secondary);
}
.artifact-space-metaTime{
  flex:none;
  font-size:10px;line-height:15px;
  color:var(--glass-text-tertiary);
  font-variant-numeric:tabular-nums;
  white-space:nowrap;
}

/* ═══════════════════════════════════════════════════════════
   预览区操作（复制内容 / 复制路径）
   ═══════════════════════════════════════════════════════════ */
.artifact-space-previewActions{
  display:inline-flex;align-items:center;gap:4px;
  flex:none;
}
.artifact-space-previewAction{
  box-sizing:border-box;
  height:22px;
  display:inline-flex;align-items:center;gap:4px;
  padding:0 6px;
  border:.5px solid transparent;
  border-radius:7px;
  background:rgba(255,255,255,.26);
  color:var(--glass-text-secondary);
  cursor:pointer;
  font-size:11px;line-height:16px;
  white-space:nowrap;
  transition:background .12s ease-out,color .12s ease-out,border-color .12s ease-out;
}
.artifact-space-previewAction:hover{background:rgba(255,255,255,.46);color:var(--glass-text-primary)}
.artifact-space-previewAction:focus-visible{outline:2px solid var(--glass-accent-edge);outline-offset:1px}
.artifact-space-previewAction svg{width:12px;height:12px;flex:none}
.artifact-space-previewAction[data-state="ok"]{
  border-color:var(--glass-accent-edge);
  background:var(--glass-accent);
  color:var(--glass-accent-icon);
}
.artifact-space-previewAction[data-state="failed"]{
  border-color:var(--glass-error);
  color:var(--glass-error);
}
.artifact-space-previewActionLabel{font-size:11px;line-height:16px}

/* ═══════════════════════════════════════════════════════════
   编辑器样式代码区（对齐 WorkBuddy 的 sc-code-* 规范：
   行号列 44px、行号 inset 10px、块圆角 10px）
   ═══════════════════════════════════════════════════════════ */
/* ── 编辑器主体 ──────────────────────────────────────────
   单滚动容器 + sticky 行号：纵向滚动时行号始终贴着代码行，
   横向滚动时行号钉在左边缘，与 VS Code 的行为一致。 */
.artifact-space-code{
  --artifact-space-code-line-height:20px;
  --artifact-space-code-gutter:44px;
  box-sizing:border-box;
  flex:1;
  min-height:0;
  overflow:auto;
  margin:0;
  padding:0;
  background:var(--artifact-space-code-bg);
  border-radius:var(--dsw-radius-md);
  font-family:var(--dsw-font-markdown-code-block);
  font-size:12px;
  line-height:var(--artifact-space-code-line-height);
  tab-size:2;
}

/* 代码内容 */
.artifact-space-codeLine{
  box-sizing:border-box;
  display:grid;
  grid-template-columns:var(--artifact-space-code-gutter) minmax(0,1fr);
  min-height:var(--artifact-space-code-line-height);
}
/* 行号：sticky 左缘，横向滚动时不漂走 */
.artifact-space-codeLineNumber{
  box-sizing:border-box;
  position:sticky;
  left:0;
  z-index:1;
  padding:0 10px 0 0;
  text-align:right;
  font-variant-numeric:tabular-nums;
  font-size:11px;
  line-height:var(--artifact-space-code-line-height);
  color:var(--artifact-space-code-gutter-fg);
  background:var(--artifact-space-code-bg);
  border-right:.5px solid var(--artifact-space-code-gutter-border);
  user-select:none;
}
.artifact-space-codeLineContent{
  box-sizing:border-box;
  min-width:0;
  padding:0 14px 0 12px;
  white-space:pre;
  color:var(--artifact-space-code-plain);
}
.artifact-space-codeToken{font:inherit}
.artifact-space-codeRole{font:inherit}
.artifact-space-codePlain{font:inherit}
/* 选区与当前行高亮 */
.artifact-space-codeLineContent::selection{background:var(--artifact-space-code-selection)}
.artifact-space-codeLine:hover .artifact-space-codeLineNumber{color:var(--artifact-space-code-gutter-fg-active)}

/* 语法配色 —— 对齐 VS Code Dark+ / Light+ 的经典 token 色 */
.artifact-space-root{
  --artifact-space-code-bg:#f6f7fa;
  --artifact-space-code-gutter-fg:#9aa3b2;
  --artifact-space-code-gutter-fg-active:#4a5163;
  --artifact-space-code-gutter-border:#e2e6ee;
  --artifact-space-code-selection:#b5d5ff;
  --artifact-space-search-hit:#ffe08a;
  --artifact-space-search-hit-fg:#4a3608;
  --artifact-space-code-keyword:#a4409f;
  --artifact-space-code-string:#0f7a52;
  --artifact-space-code-comment:#8b93a7;
  --artifact-space-code-number:#b5641a;
  --artifact-space-code-function:#2b62c9;
  --artifact-space-code-property:#0b6f8f;
  --artifact-space-code-operator:#7a8296;
  --artifact-space-code-punctuation:#8a92a6;
  --artifact-space-code-plain:#2b3348;
}
@media (prefers-color-scheme: dark){
  .artifact-space-root{
    --artifact-space-code-bg:#1e222c;
    --artifact-space-code-gutter-fg:#5a6377;
    --artifact-space-code-gutter-fg-active:#c3c9d6;
    --artifact-space-code-gutter-border:#2c313d;
    --artifact-space-code-selection:#264f78;
    --artifact-space-search-hit:#7a5b12;
    --artifact-space-search-hit-fg:#ffe9a8;
    --artifact-space-code-keyword:#d79ae6;
    --artifact-space-code-string:#8ad6a4;
    --artifact-space-code-comment:#6b7488;
    --artifact-space-code-number:#f0b37e;
    --artifact-space-code-function:#7db8ff;
    --artifact-space-code-property:#63d0e0;
    --artifact-space-code-operator:#9aa3b8;
    --artifact-space-code-punctuation:#7f879b;
    --artifact-space-code-plain:#d3d9e8;
  }
}

/* 底部状态栏（VS Code 特征） */
.artifact-space-previewStatus{
  box-sizing:border-box;
  flex:none;
  height:24px;
  display:flex;
  align-items:center;
  justify-content:flex-end;
  gap:14px;
  padding:0 12px;
  border-top:.5px solid var(--glass-edge-soft);
  background:var(--glass-header);
  font-size:11px;
  line-height:16px;
  color:var(--glass-text-tertiary);
  font-variant-numeric:tabular-nums;
  overflow:hidden;
}
.artifact-space-previewStatusItem{white-space:nowrap;flex:none}
/* 窄容器时状态栏只保留语言与行数 */
@container (max-width:520px){
  .artifact-space-previewStatusItem:nth-child(3),
  .artifact-space-previewStatusItem:nth-child(4){display:none}
}

/* ═══════════════════════════════════════════════════════════
   Markdown / YAML 预览排版
   （玻璃主题适配：代码块与表头改用半透明玻璃底，
     避免在玻璃面板上出现实心色块）
   ═══════════════════════════════════════════════════════════ */
.artifact-space-md{font:var(--dsw-font-markdown-base);color:var(--glass-text-primary);overflow-wrap:anywhere}
.artifact-space-md strong{font-weight:600}
.artifact-space-mdHeading{margin:24px 0 8px;font-weight:700;line-height:1.4;color:var(--glass-text-primary);letter-spacing:-.01em}
.artifact-space-mdHeading:first-child{margin-top:0}
.artifact-space-mdHeading[data-level="1"]{font-size:19px}
.artifact-space-mdHeading[data-level="2"]{font-size:17px}
.artifact-space-mdHeading[data-level="3"]{font-size:15px}
.artifact-space-mdHeading[data-level="4"],.artifact-space-mdHeading[data-level="5"],.artifact-space-mdHeading[data-level="6"]{font-size:14px;font-weight:600}
.artifact-space-mdPara{margin:0 0 12px;line-height:1.75}
.artifact-space-mdHr{margin:22px 0;border:0;border-top:.5px solid var(--glass-edge-soft)}
.artifact-space-mdList{margin:0 0 12px;padding-left:18px}
.artifact-space-mdList li{margin:3px 0;line-height:1.7}
.artifact-space-mdList li::marker{color:var(--glass-text-tertiary)}
.artifact-space-mdQuote{margin:0 0 12px;padding:0 0 0 14px;border-left:2px solid var(--glass-accent-edge);color:var(--glass-text-secondary)}
.artifact-space-mdCode{font-family:var(--dsw-font-markdown-code);font-size:.9em;padding:1px 5px;border:.5px solid var(--glass-edge-soft);border-radius:var(--dsw-radius-sm);background:rgba(255,255,255,.22);color:var(--glass-text-primary)}
.artifact-space-mdLink{color:var(--dsw-alias-link);font-weight:500;text-decoration:none}
.artifact-space-mdLink:hover{text-decoration:underline dotted}
.artifact-space-mdPre{box-sizing:border-box;margin:0 0 14px;border:.5px solid var(--glass-edge-soft);border-radius:var(--dsw-radius-md);overflow:hidden;background:rgba(255,255,255,.16);box-shadow:0 1px 0 rgba(255,255,255,.35) inset}
.artifact-space-mdCodeLang{display:block;padding:6px 12px;border-bottom:.5px solid var(--glass-edge-soft);background:rgba(255,255,255,.14);font-size:11px;line-height:16px;color:var(--glass-text-tertiary);text-transform:lowercase}
.artifact-space-mdCodeBlock{display:block;padding:12px 14px;margin:0;font-family:var(--dsw-font-markdown-code-block);font-size:12px;line-height:1.65;white-space:pre;overflow-wrap:normal;overflow-x:auto;color:var(--glass-text-primary)}
.artifact-space-mdTable{width:100%;margin:0 0 14px;border-collapse:collapse;font-size:13px}
.artifact-space-mdTable th,.artifact-space-mdTable td{padding:8px 12px;border-bottom:.5px solid var(--glass-edge-soft);text-align:left;vertical-align:top;line-height:1.6}
.artifact-space-mdTable th{font-weight:600;color:var(--glass-text-primary);background:rgba(255,255,255,.16);border-bottom:.5px solid var(--glass-edge)}
.artifact-space-mdTable tr:last-child td{border-bottom:0}

.artifact-space-yaml{font-family:var(--dsw-font-markdown-code-block);font-size:12px;line-height:1.75;color:var(--glass-text-secondary)}
.artifact-space-yamlRow{display:flex;align-items:baseline;gap:8px;padding-left:0}
.artifact-space-yamlKey{flex:none;color:var(--dsw-alias-markdown-tag);font-weight:500}
.artifact-space-yamlColon{flex:none;color:var(--glass-text-tertiary)}
.artifact-space-yamlScalar{flex:1;min-width:0;color:var(--glass-text-secondary);overflow-wrap:anywhere}

/* ═══════════════════════════════════════════════════════════
   尊重系统「减少动态效果」偏好
   ═══════════════════════════════════════════════════════════ */
@media (prefers-reduced-motion: reduce){
  .artifact-space-chevron,
  .artifact-space-row,
  .artifact-space-groupHead,
  .artifact-space-tool,
  .artifact-space-rowMore,
  .artifact-space-previewClose,
  .artifact-space-previewStateAction,
  .artifact-space-statusAction{transition:none !important}
  .artifact-space-chevron{transform:none !important}
  .artifact-space-groupHead[data-open="true"] .artifact-space-chevron{transform:rotate(90deg) !important}
  .artifact-space-sessionHead .artifact-space-chevron{transform:none !important}
  .artifact-space-session[data-folded="false"] .artifact-space-sessionHead .artifact-space-chevron{transform:none !important}
  .artifact-space-tool[data-busy="true"] svg{animation:none !important}
}
`;

    // The style tag is keyed by the package name so two versions of this
    // plugin cannot fight over one stylesheet.
    const PLUGIN_NAME = '@xxjxx/artifact-space';
    const styleTagId = `${PLUGIN_NAME}/artifact-space.css`;
    if (typeof document !== 'undefined' && document.querySelector(`style[data-plugin-css=${JSON.stringify(styleTagId)}]`) === null) {
      const tag = document.createElement('style');
      tag.dataset.plugin = PLUGIN_NAME;
      tag.dataset.pluginCss = styleTagId;
      tag.textContent = CSS;
      document.head.appendChild(tag);
    }

    const cx = (...parts) => parts.filter(Boolean).join(' ');

    /* ── Clipboard ─────────────────────────────────────────────────────── */

    /**
     * Open an HTML preview in a real browser tab.
     *
     * The panel renders the document inside a sandboxed frame, which is right
     * for reading but wrong for a document the reader wants to print, share or
     * open at full width. The URL is the same authenticated route the frame
     * uses, so the tab shows the same document the panel shows.
     *
     * @param {string} url - the browser-relative document URL.
     * @returns {void}
     */
    function openInBrowser(url) {
      if (typeof url !== 'string' || url === '') return;
      if (typeof window === 'undefined' || typeof window.open !== 'function') return;
      // `noopener` keeps the opened tab from reaching back into the panel.
      window.open(url, '_blank', 'noopener');
    }

    /**
     * Put text on the clipboard.
     *
     * The async Clipboard API is tried first; hosts that omit it — an
     * insecure context, a denied permission — fall back to a hidden textarea
     * and `execCommand('copy')`, which is what the Host's own primitives do.
     * The result says whether the text really landed, so the caller can tell
     * the reader that copying failed instead of pretending it worked.
     *
     * @param {string} text - the exact text to place on the clipboard.
     * @returns {Promise<boolean>} whether the clipboard accepted the text.
     */
    async function writeClipboard(text) {
      if (typeof text !== 'string' || text === '') return false;
      if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
        try {
          await navigator.clipboard.writeText(text);
          return true;
        } catch {
          // Fall through to the legacy path.
        }
      }
      if (typeof document === 'undefined' || typeof document.execCommand !== 'function') return false;
      const field = document.createElement('textarea');
      field.value = text;
      field.setAttribute('readonly', '');
      field.style.position = 'fixed';
      field.style.left = '-9999px';
      document.body.appendChild(field);
      field.select();
      try {
        return document.execCommand('copy');
      } catch {
        return false;
      } finally {
        document.body.removeChild(field);
      }
    }

    /* ── Presentation helpers ──────────────────────────────────────────── */

    /** Human-readable byte size; one decimal above a kilobyte. */
    function formatBytes(bytes) {
      if (bytes === null || bytes === undefined) return '';
      if (bytes < 1024) return `${bytes} B`;
      if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
      return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    }

    const MINUTE = 60000;
    const HOUR = 3600000;
    const DAY = 86400000;
    const MONTH = 2592000000;

    /** Relative time for a millisecond timestamp. */
    function relativeTime(t, ms) {
      if (typeof ms !== 'number' || !Number.isFinite(ms)) return '';
      const diff = Math.max(0, Date.now() - ms);
      if (diff < MINUTE) return t('time.justNow');
      if (diff < HOUR) return t('time.minutes', { count: String(Math.floor(diff / MINUTE)) });
      if (diff < DAY) return t('time.hours', { count: String(Math.floor(diff / HOUR)) });
      if (diff < MONTH) return t('time.days', { count: String(Math.floor(diff / DAY)) });
      return t('time.months', { count: String(Math.floor(diff / MONTH)) });
    }

    /** Absolute time for a millisecond timestamp, used as a tooltip. */
    function absoluteTime(ms) {
      if (typeof ms !== 'number' || !Number.isFinite(ms)) return '';
      const date = new Date(ms);
      const pad = (value) => String(value).padStart(2, '0');
      return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
    }

    /**
     * A wall-clock stamp for the refresh indicator.
     *
     * Only the time of day is shown: the panel lives next to the conversation
     * it belongs to, so the date is noise while the minute is the part that
     * answers "did my refresh land?".
     *
     * @param {number} ms - a millisecond timestamp.
     * @returns {string} the clock time, or '' when there is no timestamp.
     */
    function formatClock(ms) {
      if (typeof ms !== 'number' || !Number.isFinite(ms)) return '';
      const date = new Date(ms);
      const pad = (value) => String(value).padStart(2, '0');
      return `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
    }

    /**
     * Normalize a search term for matching.
     *
     * @param {string} value - the raw input.
     * @returns {string} the term to match against, lowercased.
     */
    function normalizeQuery(value) {
      return typeof value === 'string' ? value.trim().toLowerCase() : '';
    }

    /**
     * Whether a label matches the search term.
     *
     * Every part must appear in the label, so adding words narrows the result
     * instead of widening it.
     *
     * @param {string} label - the text to test.
     * @param {string[]} parts - the normalized search parts.
     * @returns {boolean} true when the label matches.
     */
    function labelMatches(label, parts) {
      if (parts.length === 0) return true;
      const haystack = String(label ?? '').toLowerCase();
      return parts.every((part) => haystack.includes(part));
    }

    /**
     * Whether any of a set of labels matches any part of the term.
     *
     * The parts act as alternatives here: a product called `client.js`
     * satisfies a search for `client js` because one of its words matches.
     *
     * @param {string[]} labels - the texts to test.
     * @param {string[]} parts - the normalized search parts.
     * @returns {boolean} true when any label matches any part.
     */
    function anyLabelMatches(labels, parts) {
      if (parts.length === 0) return true;
      return labels.some((label) => {
        const haystack = String(label ?? '').toLowerCase();
        return parts.some((part) => haystack.includes(part));
      });
    }

    /**
     * Split a label into matched and unmatched parts for highlighting.
     *
     * @param {string} label - the text to split.
     * @param {string[]} parts - the normalized search parts.
     * @returns {Array<{text: string, hit: boolean}>} the pieces, in order.
     */
    function highlightParts(label, parts) {
      const text = String(label ?? '');
      if (parts.length === 0) return [{ text, hit: false }];
      const ranges = [];
      const haystack = text.toLowerCase();
      for (const part of parts) {
        if (part === '') continue;
        let from = 0;
        for (;;) {
          const at = haystack.indexOf(part, from);
          if (at === -1) break;
          ranges.push([at, at + part.length]);
          from = at + part.length;
        }
      }
      if (ranges.length === 0) return [{ text, hit: false }];
      ranges.sort((left, right) => left[0] - right[0]);
      const merged = [];
      for (const range of ranges) {
        const last = merged[merged.length - 1];
        if (last !== undefined && range[0] <= last[1]) {
          last[1] = Math.max(last[1], range[1]);
        } else {
          merged.push([range[0], range[1]]);
        }
      }
      const pieces = [];
      let cursor = 0;
      for (const [start, end] of merged) {
        if (start > cursor) pieces.push({ text: text.slice(cursor, start), hit: false });
        pieces.push({ text: text.slice(start, end), hit: true });
        cursor = end;
      }
      if (cursor < text.length) pieces.push({ text: text.slice(cursor), hit: false });
      return pieces;
    }

    /* ── Artifact provenance ───────────────────────────────────────────── */

    /**
     * The one-line provenance of an artifact: was it delivered to the reader
     * or merely produced along the way.
     *
     * A list row has room for a badge alone — the turn and the description
     * would crowd out the file name, and the preview header shows both in
     * full.
     *
     * @param {object} artifact - the row's artifact.
     * @param {Function} t - the translation function.
     * @returns the element, or null when the artifact says nothing.
     */
    function artifactKind(artifact, t) {
      const kind = artifact?.kind === 'presented' ? 'presented' : (artifact?.kind === 'produced' ? 'produced' : null);
      if (kind === null) return null;
      return h('span', {
        className: cx('artifact-space-metaKind'),
        'data-kind': kind,
      }, t(kind === 'presented' ? 'artifact.presented' : 'artifact.produced'));
    }

    /**
     * The full provenance of one artifact: how it was delivered, in which
     * turn, and what the session said about it.
     *
     * The Host already folds all three out of the session log, so this only
     * renders what is on the row — nothing is inferred here.
     *
     * @param {object} artifact - the row's artifact.
     * @param {Function} t - the translation function.
     * @returns the element, or null when the artifact says nothing extra.
     */
    function artifactMeta(artifact, t) {
      const kind = artifact?.kind === 'presented' ? 'presented' : (artifact?.kind === 'produced' ? 'produced' : null);
      const turn = Number.isSafeInteger(artifact?.turn) && artifact.turn >= 1 ? artifact.turn : null;
      const description = typeof artifact?.description === 'string' && artifact.description.trim() !== ''
        ? artifact.description.trim()
        : null;
      const producedAt = Number.isFinite(artifact?.producedAt) ? artifact.producedAt : null;
      if (kind === null && turn === null && description === null && producedAt === null) return null;

      return h('span', { className: cx('artifact-space-meta') }, [
        kind !== null
          ? h('span', {
            key: 'kind',
            className: cx('artifact-space-metaKind'),
            'data-kind': kind,
          }, t(kind === 'presented' ? 'artifact.presented' : 'artifact.produced'))
          : null,
        turn !== null
          ? h('span', { key: 'turn', className: cx('artifact-space-metaTurn') },
            t('artifact.turn', { turn: String(turn) }))
          : null,
        producedAt !== null
          ? h('span', {
            key: 'time',
            className: cx('artifact-space-metaTime'),
            title: absoluteTime(producedAt),
          }, relativeTime(t, producedAt))
          : null,
        description !== null
          ? h('span', { key: 'desc', className: cx('artifact-space-metaDesc'), title: description }, description)
          : null,
      ]);
    }

    /* ── Icons ─────────────────────────────────────────────────────────── */

    /** A document glyph for text artifacts. */
    function docIcon() {
      return h('svg', {
        className: cx('artifact-space-rowIcon'),
        viewBox: '0 0 16 16',
        width: 12,
        height: 12,
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: 1.2,
        'aria-hidden': true,
      }, [
        h('path', { key: 'p', d: 'M4 2h5l3 3v9H4z' }),
        h('path', { key: 'l', d: 'M9 2v3h3' }),
      ]);
    }

    /** A picture glyph for binary artifacts. */
    function imageIcon() {
      return h('svg', {
        className: cx('artifact-space-rowIcon'),
        'data-binary': 'true',
        viewBox: '0 0 16 16',
        width: 12,
        height: 12,
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: 1.2,
        'aria-hidden': true,
      }, [
        h('rect', { key: 'r', x: 2.5, y: 3.5, width: 11, height: 9, rx: 1.5 }),
        h('circle', { key: 'c', cx: 6, cy: 6.5, r: 1 }),
        h('path', { key: 'm', d: 'M3.5 11l3-2.5 2.5 2 2-1.5 2 2' }),
      ]);
    }

    /* ── Data source ───────────────────────────────────────────────────── */

    /** Browser-relative form of a Host route; the page is served from an app base path. */
    const ROWS_ROUTE = 'api/artifact-space.rows';
    const READ_ROUTE = 'api/artifact-space.read';
    const IMAGE_ROUTE = 'api/artifact-space.image';
    const HTML_ROUTE = 'api/artifact-space.html';

    /**
     * Fetch-once cache of the grouped artifact rows.
     *
     * One read serves the whole page; `load()` coalesces concurrent requests,
     * `reload()` forces a fresh read on the user's refresh gesture, and both
     * leave a failed read retryable. Disposal cancels the in-flight read so no
     * stale response can publish after the plugin unloads.
     */
    function createRowsStore() {
      const listeners = new Set();
      const lifetime = new AbortController();
      let state = { status: 'idle', groups: [] };
      let inflight = null;

      const publish = () => {
        for (const listener of [...listeners]) listener();
      };
      const set = (next) => {
        state = next;
        publish();
      };

      /** Read the rows once, publishing loading, ready, or error. */
      const read = (mode = 'initial') => {
        // A refresh keeps the current rows on screen and only marks the list
        // as busy, so the panel never blanks out mid-read. The first read has
        // nothing to keep and shows the loading state instead.
        if (mode === 'refresh' && state.status === 'ready') {
          set({ status: 'refreshing', groups: state.groups, refreshedAt: Date.now() });
        } else {
          set({ status: 'loading', groups: [] });
        }
        // The sentinel is assigned before the fetch settles, so the finally
        // block always compares against the task that is actually in flight.
        const marker = {};
        inflight = marker;
        const task = fetch(ROWS_ROUTE, { signal: lifetime.signal })
          .then(async (response) => {
            if (!response.ok) throw new Error(`artifact rows read failed: ${response.status}`);
            const value = await response.json();
            const groups = Array.isArray(value?.groups) ? value.groups : [];
            set({ status: 'ready', groups, refreshedAt: Date.now() });
          })
          .catch(() => {
            if (!lifetime.signal.aborted) set({ status: 'error', groups: [] });
          })
          .finally(() => {
            if (inflight === marker) inflight = null;
          });
        return task;
      };
      return {
        getSnapshot: () => state,
        subscribe: (listener) => {
          listeners.add(listener);
          return () => { listeners.delete(listener); };
        },
        /** Read unless a read already stands for the current state. */
        load() {
          if (inflight !== null) return inflight;
          if (state.status === 'ready' || state.status === 'loading') return Promise.resolve();
          return read();
        },
        /** Force a fresh read on an explicit refresh. */
        reload() {
          if (inflight !== null) return inflight;
          return read('refresh');
        },
        dispose() {
          lifetime.abort();
        },
      };
    }

    /**
     * Fetch-once cache of one artifact's preview text, keyed by its coordinates.
     *
     * A cached read is kept; only a failed read is replaced by a later attempt,
     * so re-selecting a row never re-reads a file that already loaded.
     */
    function createPreviewStore() {
      const states = new Map();
      const listeners = new Set();
      const lifetime = new AbortController();
      const pending = new Set();

      const publish = () => {
        for (const listener of [...listeners]) listener();
      };
      const keyOf = (sessionId, path) => `${sessionId}\u0000${path}`;

      return {
        getSnapshot: () => states,
        subscribe: (listener) => {
          listeners.add(listener);
          return () => { listeners.delete(listener); };
        },
        get(sessionId, path) {
          return states.get(keyOf(sessionId, path));
        },
        load(sessionId, path) {
          const key = keyOf(sessionId, path);
          const current = states.get(key);
          if (current !== undefined && current.status !== 'error') return Promise.resolve();
          states.set(key, { status: 'loading' });
          publish();
          const url = `${READ_ROUTE}?${new URLSearchParams({ sessionId, path }).toString()}`;
          // The marker is added before the fetch settles, so the finally block
          // always removes the request that is actually in flight.
          const marker = Symbol(key);
          pending.add(marker);
          return fetch(url, { signal: lifetime.signal })
            .then(async (response) => {
              if (response.status === 404) {
                states.set(key, { status: 'missing' });
                return;
              }
              if (!response.ok) {
                const body = await response.json().catch(() => null);
                const reason = body && typeof body.error === 'string' ? body.error : 'read-failed';
                const detail = body && typeof body.detail === 'string' ? body.detail : undefined;
                console.error('[artifact-space] read failed:', response.status, reason, detail ?? '', path);
                states.set(key, reason === 'too-large'
                  ? { status: 'too-large', limit: body?.limit }
                  : { status: 'error', code: reason, httpStatus: response.status, detail });
                return;
              }
              states.set(key, { status: 'ready', value: await response.json() });
            })
            .catch((err) => {
              console.error('[artifact-space] read fetch threw:', err, path);
              if (!lifetime.signal.aborted) states.set(key, { status: 'error', code: 'network', detail: String(err) });
            })
            .finally(() => {
              pending.delete(marker);
              publish();
            });
        },
        async dispose() {
          lifetime.abort();
          await Promise.allSettled(pending);
        },
      };
    }

    /* ── Favorites ─────────────────────────────────────────────────────── */

    /**
     * The identity of one favorited artifact.
     *
     * Two sessions can produce the same path, and those are different
     * artifacts, so the session is part of the key. The separator is a
     * control character that cannot appear in a path.
     */
    const favoriteKey = (sessionId, path) => `${sessionId}\u0000${path}`;

    /** The snapshot used when no favorites store is available. */
    const EMPTY_FAVORITES = new Map();

    /**
     * The favorites store: artifacts the reader marked worth keeping.
     *
     * Favourites survive restarts through `localStorage`, the same channel
     * the Host's own client store uses, so the plugin needs no private Host
     * API and keeps working when storage is unavailable (private windows,
     * a full quota) by falling back to memory for the session.
     *
     * An artifact is identified by the pair that also addresses a preview
     * read: the session it came from plus its path. Two sessions can
     * produce the same path, and those are different artifacts.
     *
     * Every favorite is stored under its own key rather than in one packed
     * list. Un-starring therefore removes that key outright, so nothing is
     * left behind on disk for an artifact the reader no longer wants — a
     * packed list would have to be rewritten as a whole, and a failed write
     * would keep the canceled entry alive.
     */
    function createFavoritesStore() {
      const STORAGE_PREFIX = 'artifactSpace.favorite.v1.';
      const listeners = new Set();
      /** @type {Map<string, {sessionId: string, path: string, name: string, workspaceId: string, addedAt: number}>} */
      let items = new Map();
      let storageOk = true;

      const publish = () => {
        for (const listener of [...listeners]) listener();
      };
      const keyOf = favoriteKey;

      /** The storage key one favorite lives under. */
      const storageKeyOf = (sessionId, path) => `${STORAGE_PREFIX}${encodeURIComponent(sessionId)}\u0000${encodeURIComponent(path)}`;

      /** One stored entry, or null when the payload cannot be trusted. */
      const parseEntry = (raw) => {
        if (typeof raw !== 'string' || raw === '') return null;
        let parsed;
        try {
          parsed = JSON.parse(raw);
        } catch {
          return null;
        }
        if (parsed === null || typeof parsed !== 'object' || Array.isArray(parsed)) return null;
        const { sessionId, path, name, workspaceId, addedAt } = parsed;
        if (typeof sessionId !== 'string' || sessionId === '') return null;
        if (typeof path !== 'string' || path === '') return null;
        return {
          sessionId,
          path,
          name: typeof name === 'string' ? name : '',
          workspaceId: typeof workspaceId === 'string' ? workspaceId : '',
          addedAt: typeof addedAt === 'number' && Number.isFinite(addedAt) ? addedAt : 0,
        };
      };

      /**
       * Read every favorite back from storage.
       *
       * A key that cannot be parsed is dropped from disk as well, so a
       * corrupted write leaves nothing behind.
       */
      const hydrate = () => {
        if (typeof localStorage === 'undefined') {
          storageOk = false;
          return;
        }
        const restored = new Map();
        try {
          const keys = [];
          for (let index = 0; index < localStorage.length; index += 1) {
            const key = localStorage.key(index);
            if (typeof key === 'string' && key.startsWith(STORAGE_PREFIX)) keys.push(key);
          }
          for (const key of keys) {
            const entry = parseEntry(localStorage.getItem(key));
            if (entry === null) {
              localStorage.removeItem(key);
              continue;
            }
            restored.set(keyOf(entry.sessionId, entry.path), entry);
          }
        } catch {
          storageOk = false;
          return;
        }
        items = restored;
      };

      /** Write one favorite to its own key. */
      const persistOne = (entry) => {
        if (!storageOk || typeof localStorage === 'undefined') return;
        try {
          localStorage.setItem(storageKeyOf(entry.sessionId, entry.path), JSON.stringify(entry));
        } catch {
          storageOk = false;
        }
      };

      /** Remove one favorite's key, so nothing is left on disk for it. */
      const removeOne = (sessionId, path) => {
        if (typeof localStorage === 'undefined') return;
        try {
          localStorage.removeItem(storageKeyOf(sessionId, path));
        } catch {
          storageOk = false;
        }
      };

      hydrate();

      return {
        getSnapshot: () => items,
        subscribe: (listener) => {
          listeners.add(listener);
          return () => { listeners.delete(listener); };
        },
        /** Whether an artifact is already favorited. */
        has(sessionId, path) {
          return items.has(keyOf(sessionId, path));
        },
        /**
         * Add or remove one artifact.
         *
         * Removing deletes the artifact's own storage key, so an artifact
         * the reader no longer wants leaves nothing behind on disk.
         *
         * @returns whether the artifact is favorited afterwards.
         */
        toggle(sessionId, path, name, workspaceId) {
          const key = keyOf(sessionId, path);
          // A fresh map replaces the old one: `useSyncExternalStore` compares
          // snapshots by identity, so mutating the same map would leave the
          // panel showing stale favorites.
          const next = new Map(items);
          if (next.has(key)) {
            next.delete(key);
            items = next;
            removeOne(sessionId, path);
            publish();
            return false;
          }
          const entry = {
            sessionId,
            path,
            name: typeof name === 'string' ? name : '',
            workspaceId: typeof workspaceId === 'string' ? workspaceId : '',
            addedAt: Date.now(),
          };
          next.set(key, entry);
          items = next;
          persistOne(entry);
          publish();
          return true;
        },
        /** Drop every favorite, and every key that backs one. */
        clear() {
          if (items.size === 0) return;
          const next = new Map();
          for (const entry of items.values()) removeOne(entry.sessionId, entry.path);
          items = next;
          publish();
        },
        /**
         * Drop the favorites whose artifact is gone.
         *
         * A favorite outlives the session that produced it, but once that
         * session is deleted the entry points at nothing. Those keys are
         * removed from disk as well, so a deleted session leaves no trace
         * in the reader's storage.
         *
         * @param liveKeys - the keys of the artifacts that still exist.
         * @returns how many favorites were dropped.
         */
        prune(liveKeys) {
          if (items.size === 0) return 0;
          const next = new Map(items);
          let dropped = 0;
          for (const [key, entry] of items) {
            if (liveKeys.has(key)) continue;
            next.delete(key);
            removeOne(entry.sessionId, entry.path);
            dropped += 1;
          }
          if (dropped === 0) return 0;
          items = next;
          publish();
          return dropped;
        },
        /** Whether the favorites can be written back to disk. */
        persistent: () => storageOk,
      };
    }

    /* ── Components ────────────────────────────────────────────────────── */

    /**
     * One artifact row: icon, file name, size, and a favorite toggle.
     *
     * The row is a focusable `role="button"` so the preview is reachable
     * without a pointer; Enter and Space activate it like a click. The
     * favorite toggle is a real nested button, so it stops the click from
     * reaching the row — starring a file never opens its preview.
     */
    function ArtifactRow({ artifact, selected, onSelect, searchParts, t, favorited = false, onToggleFavorite = null }) {
      const activate = () => onSelect(artifact);
      const pieces = highlightParts(artifact.name, searchParts);
      return h('div', {
        className: cx('artifact-space-row'),
        role: 'button',
        tabIndex: 0,
        'data-selected': selected ? 'true' : 'false',
        title: artifact.absolutePath,
        onClick: activate,
        onKeyDown: (event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            activate();
          }
        },
      }, [
        h('span', { key: 'icon' }, artifact.image || artifact.binary ? imageIcon() : docIcon()),
        h('span', {
          key: 'name',
          className: cx('artifact-space-rowName'),
          'data-outside': artifact.outsideWorkspace ? 'true' : 'false',
        }, pieces.map((piece, index) => (piece.hit
          ? h('mark', { key: `m${index}`, className: cx('artifact-space-hit') }, piece.text)
          : h('span', { key: `t${index}` }, piece.text)))),
        artifactKind(artifact, t),
        Number.isFinite(artifact.producedAt)
          ? h('span', {
            key: 'time',
            className: cx('artifact-space-rowTime'),
            title: absoluteTime(artifact.producedAt),
          }, relativeTime(t, artifact.producedAt))
          : null,
        h('span', { key: 'size', className: cx('artifact-space-rowSize') }, formatBytes(artifact.bytes)),
        onToggleFavorite === null ? null : h('button', {
          key: 'star',
          type: 'button',
          className: cx('artifact-space-star'),
          'aria-pressed': favorited ? 'true' : 'false',
          'aria-label': favorited
            ? t('favorites.remove', { name: artifact.name })
            : t('favorites.add', { name: artifact.name }),
          title: favorited
            ? t('favorites.remove', { name: artifact.name })
            : t('favorites.add', { name: artifact.name }),
          onClick: (event) => {
            // The row itself opens the preview; starring must not.
            event.stopPropagation();
            event.preventDefault();
            onToggleFavorite();
          },
          onKeyDown: (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              event.stopPropagation();
            }
          },
        }, h('svg', {
          viewBox: '0 0 16 16',
          width: 12,
          height: 12,
          fill: favorited ? 'currentColor' : 'none',
          stroke: 'currentColor',
          strokeWidth: 1.3,
          strokeLinejoin: 'round',
          'aria-hidden': true,
        }, h('path', { d: 'M8 1.8l1.9 3.9 4.3.6-3.1 3 .7 4.3L8 11.6l-3.8 2 .7-4.3-3.1-3 4.3-.6z' }))),
      ]);
    }

    /** One session's artifact list; long lists fold behind a "more" row. */
    function SessionBlock({ session, selected, onSelect, t, expanded, onToggleExpanded, folded, onToggleFolded, searchParts, favorites, onToggleFavorite }) {
      const artifacts = session.artifacts;
      const count = artifacts.length;
      const note = session.note !== null && session.note !== undefined
        ? t(`session.note.${session.note}`)
        : null;
      // A folded session shows its head only; an open one lists its products,
      // capped at eight until the reader asks for the rest.
      const visible = expanded ? artifacts : artifacts.slice(0, 8);
      const hidden = count - visible.length;
      const toggleFold = () => onToggleFolded(session.sessionId);
      return h('div', {
        className: cx('artifact-space-session'),
        'data-session': session.sessionId,
        'data-folded': folded ? 'true' : 'false',
      }, [
        h('div', {
          key: 'head',
          className: cx('artifact-space-sessionHead'),
          role: 'button',
          tabIndex: 0,
          'aria-expanded': folded ? 'false' : 'true',
          title: folded ? t('session.expand') : t('session.collapse'),
          onClick: toggleFold,
          onKeyDown: (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              toggleFold();
            }
          },
        }, [
          h('svg', {
            key: 'chevron',
            className: cx('artifact-space-chevron'),
            viewBox: '0 0 16 16',
            width: 12,
            height: 12,
            fill: 'none',
            stroke: 'currentColor',
            strokeWidth: 1.4,
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            'aria-hidden': true,
          }, h('path', { d: 'M6 4l4 4-4 4' })),
          h('span', { key: 'title', className: cx('artifact-space-sessionTitle'), title: session.title },
            highlightParts(session.title, searchParts).map((piece, index) => (piece.hit
              ? h('mark', { key: `m${index}`, className: cx('artifact-space-hit') }, piece.text)
              : h('span', { key: `t${index}` }, piece.text)))),
          h('span', { key: 'meta', className: cx('artifact-space-sessionMeta') },
            t('session.count', { count: String(count) })),
          h('span', {
            key: 'time',
            className: cx('artifact-space-sessionTime'),
            title: absoluteTime(session.lastActivity),
          }, relativeTime(t, session.lastActivity)),
        ]),
        folded ? null : [
          note !== null && h('p', { key: 'note', className: cx('artifact-space-sessionNote') }, note),
          h('div', { key: 'body', className: cx('artifact-space-sessionBody') }, [
            h('ul', { key: 'list', className: cx('artifact-space-list') },
              visible.map((artifact) => h('li', { key: artifact.path },
                h(ArtifactRow, {
                  artifact,
                  selected: selected != null && selected.path === artifact.path,
                  onSelect: (chosen) => onSelect(chosen, session.sessionId),
                  searchParts,
                  t,
                  favorited: favorites !== null && favorites !== undefined
                    && favorites.has(favoriteKey(session.sessionId, artifact.path)),
                  onToggleFavorite: () => onToggleFavorite(artifact, session.sessionId),
                })))),
            hidden > 0 && h('div', {
              key: 'more',
              className: cx('artifact-space-rowMore'),
              role: 'button',
              tabIndex: 0,
              onClick: onToggleExpanded,
              onKeyDown: (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  onToggleExpanded();
                }
              },
            }, t('row.more', { count: String(hidden) })),
            expanded && count > 8 && h('div', {
              key: 'less',
              className: cx('artifact-space-rowMore'),
              role: 'button',
              tabIndex: 0,
              onClick: onToggleExpanded,
              onKeyDown: (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  onToggleExpanded();
                }
              },
            }, t('row.less')),
          ]),
        ],
      ]);
    }

    /** One workspace group: a collapsible head plus its sessions. */
    function WorkspaceGroup({ group, open, onToggle, selected, onSelect, t, expandedSessions, onToggleSession, foldedSessions, onToggleFolded, searchParts, favorites, onToggleFavorite }) {
      const title = group.grouped ? group.title : t('group.ungrouped');
      const toggle = () => onToggle(group.workspaceId || 'ungrouped');
      // The count follows what the group actually shows, so a category filter
      // narrows the number instead of contradicting the list below it.
      const visibleCount = (Array.isArray(group.sessions) ? group.sessions : [])
        .reduce((sum, session) => sum + session.artifacts.length, 0);
      return h('section', { className: cx('artifact-space-group'), 'data-workspace-group': group.workspaceId || 'ungrouped' }, [
        h('div', {
          key: 'head',
          className: cx('artifact-space-groupHead'),
          'data-open': open ? 'true' : 'false',
          role: 'button',
          tabIndex: 0,
          'aria-expanded': open ? 'true' : 'false',
          onClick: toggle,
          onKeyDown: (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              toggle();
            }
          },
        }, [
          h('svg', {
            key: 'chevron',
            className: cx('artifact-space-chevron'),
            viewBox: '0 0 16 16',
            width: 12,
            height: 12,
            fill: 'none',
            stroke: 'currentColor',
            strokeWidth: 1.4,
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            'aria-hidden': true,
          }, h('path', { d: 'M6 4l4 4-4 4' })),
          h('span', { key: 'title', className: cx('artifact-space-groupTitle'), title: group.path || title },
            highlightParts(title, searchParts).map((piece, index) => (piece.hit
              ? h('mark', { key: `m${index}`, className: cx('artifact-space-hit') }, piece.text)
              : h('span', { key: `t${index}` }, piece.text)))),
          h('span', { key: 'meta', className: cx('artifact-space-groupMeta') },
            t('group.count', { count: String(visibleCount) })),
          h('span', {
            key: 'time',
            className: cx('artifact-space-groupTime'),
            title: absoluteTime(group.lastActivity),
          }, relativeTime(t, group.lastActivity)),
        ]),
        open && h('div', { key: 'body', className: cx('artifact-space-groupBody') },
          group.sessions.map((session) => h(SessionBlock, {
            key: session.sessionId,
            session,
            selected,
            onSelect,
            t,
            expanded: expandedSessions.has(session.sessionId),
            onToggleExpanded: () => onToggleSession(session.sessionId),
            folded: foldedSessions.has(session.sessionId),
            onToggleFolded: onToggleFolded,
            searchParts,
            favorites,
            onToggleFavorite,
          }))),
      ]);
    }

    /**
     * The favorites list: every artifact the reader starred, newest first.
     *
     * A favorite outlives the session that produced it, so an entry can
     * point at a file that no longer exists. Such an entry is still listed
     * — the reader may want to know it is gone — but it cannot be opened,
     * and the reader can drop the stale entries in one go.
     */
    function FavoritesList({ favorites, rows, onSelect, onToggleFavorite, onPrune, onClear, t, searchParts }) {
      // The live rows, indexed by the same key the favorites use, so a
      // favorite can be matched back to the artifact it points at.
      const live = new Map();
      for (const group of rows) {
        for (const session of group.sessions) {
          for (const artifact of session.artifacts) {
            live.set(favoriteKey(session.sessionId, artifact.path), { artifact, session, group });
          }
        }
      }

      // Clearing every favorite is destructive, so the button asks first and
      // reverts to its quiet state when the reader looks away.
      const [confirming, setConfirming] = React.useState(false);
      React.useEffect(() => {
        if (!confirming) return undefined;
        const timer = setTimeout(() => setConfirming(false), 4000);
        return () => clearTimeout(timer);
      }, [confirming]);

      const entries = [];
      let staleCount = 0;
      for (const [key, item] of favorites) {
        const match = live.get(key);
        const name = match !== undefined ? match.artifact.name : (item.name || item.path);
        if (!anyLabelMatches([name, item.path], searchParts)) continue;
        if (match === undefined) staleCount += 1;
        entries.push({ key, item, match, name });
      }
      // The most recently starred comes first.
      entries.sort((left, right) => right.item.addedAt - left.item.addedAt);

      if (entries.length === 0) {
        return h('div', { className: cx('artifact-space-status'), role: 'status' }, [
          h('span', { key: 'title', className: cx('artifact-space-statusTitle') }, t('favorites.empty')),
          h('span', { key: 'body', className: cx('artifact-space-statusBody') }, t('favorites.emptyHint')),
        ]);
      }

      return h('div', { className: cx('artifact-space-favWrap') }, [
        h('div', { key: 'head', className: cx('artifact-space-favHead') }, [
          h('span', { key: 'title', className: cx('artifact-space-favHeadTitle') }, t('favorites.title')),
          h('span', { key: 'count', className: cx('artifact-space-favHeadCount') },
            t('favorites.count', { count: String(entries.length) })),
          staleCount > 0 && onPrune !== null ? h('button', {
            key: 'prune',
            type: 'button',
            className: cx('artifact-space-favPrune'),
            title: t('favorites.pruneTitle'),
            onClick: onPrune,
          }, t('favorites.prune', { count: String(staleCount) })) : null,
          onClear !== null ? h('button', {
            key: 'clear',
            type: 'button',
            className: cx('artifact-space-favClear'),
            'data-confirming': confirming ? 'true' : 'false',
            'aria-label': confirming ? t('favorites.clearConfirm') : t('favorites.clear'),
            title: confirming ? t('favorites.clearConfirmTitle') : t('favorites.clearTitle'),
            onClick: () => {
              // The first click arms the action; the second one carries it out.
              if (!confirming) {
                setConfirming(true);
                return;
              }
              setConfirming(false);
              onClear();
            },
            onBlur: () => setConfirming(false),
          }, confirming ? t('favorites.clearConfirm') : t('favorites.clear')) : null,
        ]),
        h('ul', { key: 'list', className: cx('artifact-space-favList') }, entries.map((entry) => {
        const { key, item, match, name } = entry;
        const missing = match === undefined;
        const workspaceTitle = match !== undefined
          ? (match.group.grouped ? match.group.title : t('group.ungrouped'))
          : item.workspaceId;
        return h('li', { key, className: cx('artifact-space-favItem'), 'data-missing': missing ? 'true' : 'false' }, [
          h('span', { key: 'icon', className: cx('artifact-space-favIcon') }, docIcon()),
          h('button', {
            key: 'open',
            type: 'button',
            className: cx('artifact-space-favMain'),
            disabled: missing,
            title: missing ? t('favorites.missing') : item.path,
            onClick: () => {
              if (missing) return;
              onSelect(match.artifact, match.session.sessionId);
            },
          }, [
            h('span', { key: 'name', className: cx('artifact-space-favName') }, name),
            h('span', { key: 'source', className: cx('artifact-space-favSource') },
              `${workspaceTitle} · ${match !== undefined ? match.session.title : t('favorites.unknownSession')}`),
          ]),
          h('span', { key: 'time', className: cx('artifact-space-favTime'), title: absoluteTime(item.addedAt) },
            relativeTime(t, item.addedAt)),
          h('button', {
            key: 'remove',
            type: 'button',
            className: cx('artifact-space-star', 'artifact-space-favRemove'),
            'aria-label': t('favorites.remove', { name }),
            title: t('favorites.remove', { name }),
            onClick: () => onToggleFavorite(
              match !== undefined ? match.artifact : { path: item.path, name },
              item.sessionId,
            ),
          }, h('svg', {
            viewBox: '0 0 16 16',
            width: 12,
            height: 12,
            fill: 'currentColor',
            stroke: 'currentColor',
            strokeWidth: 1.3,
            strokeLinejoin: 'round',
            'aria-hidden': true,
          }, h('path', { d: 'M8 1.8l1.9 3.9 4.3.6-3.1 3 .7 4.3L8 11.6l-3.8 2 .7-4.3-3.1-3 4.3-.6z' }))),
        ]);
      })),
      ]);
    }

    /** A preview state: icon, title, optional detail, optional action. */
    function PreviewState({ kind, title, text = null, action = null, onAction = null }) {
      return h('div', { className: cx('artifact-space-previewState'), 'data-kind': kind }, [
        h('svg', {
          key: 'icon',
          className: cx('artifact-space-previewStateIcon'),
          viewBox: '0 0 16 16',
          width: 16,
          height: 16,
          fill: 'none',
          stroke: 'currentColor',
          strokeWidth: 1.3,
          strokeLinecap: 'round',
          'aria-hidden': true,
        }, h('circle', { cx: 8, cy: 8, r: 6.2 })),
        h('p', { key: 'title', className: cx('artifact-space-previewStateTitle') }, title),
        text !== null && text !== undefined && text !== ''
          ? h('p', { key: 'text', className: cx('artifact-space-previewStateText') }, text)
          : null,
        action !== null && action !== undefined
          ? h('button', {
            key: 'action',
            type: 'button',
            className: cx('artifact-space-previewStateAction'),
            onClick: onAction,
          }, action)
          : null,
      ]);
    }

    /**
     * The preview pane for the selected artifact.
     *
     * The binary and outside-workspace verdicts come from the Host's own row
     * flags and are decided BEFORE any request, so those files cost no
     * network round trip and never flash a loading state.
     */
    function PreviewPane({ artifact, sessionId, store, onClose, t }) {
      const path = typeof artifact?.path === 'string' ? artifact.path : '';
      // A picture is loaded straight from the image route as bytes, so it never
      // asks the text route for a preview and never costs a text round trip.
      const image = artifact?.image === true;
      const binary = artifact?.binary === true;
      const outside = artifact?.outsideWorkspace === true;
      // An HTML document is rendered as a page rather than read as source, so
      // it never asks the text route for a preview. The host marks the row as
      // HTML, and the extension is checked as well, so the page keeps working
      // even when the host is older than the panel and sends no such mark.
      const html = artifact?.html === true || detectFormat(artifact) === 'html';
      const readable = !binary && !outside && !image && !html;

      const state = React.useSyncExternalStore(
        store.subscribe,
        React.useCallback(() => (path === '' ? null : (store.get(sessionId, path) ?? null)), [store, sessionId, path]),
      );
      React.useEffect(() => {
        if (readable && path !== '' && state == null) store.load(sessionId, path);
      }, [readable, state, sessionId, path, store]);

      // Which copy action last reported a result, so the button can say so.
      const [copied, setCopied] = React.useState(null);
      React.useEffect(() => {
        if (copied === null) return undefined;
        const timer = setTimeout(() => setCopied(null), 1600);
        return () => clearTimeout(timer);
      }, [copied]);

      /** Copy something and report the outcome on the button that did it. */
      const copy = (text, what) => {
        if (typeof text !== 'string' || text === '') {
          setCopied(`${what}:failed`);
          return;
        }
        writeClipboard(text).then((ok) => setCopied(`${what}:${ok ? 'ok' : 'failed'}`));
      };

      if (image && !outside) {
        // The Host serves the picture's own bytes under its own media type, so
        // the browser renders it without the preview ever holding the file.
        const src = `${IMAGE_ROUTE}?${new URLSearchParams({ sessionId, path }).toString()}`;
        const [imageState, setImageState] = React.useState('loading');
        const [dimensions, setDimensions] = React.useState(null);
        return h('div', { className: cx('artifact-space-preview'), 'data-state': 'image' }, [
          h('div', { key: 'head', className: cx('artifact-space-previewHead') }, [
            h('span', { key: 'title', className: cx('artifact-space-previewTitle') }, artifact.name),
            h('span', { key: 'meta', className: cx('artifact-space-previewMeta') },
              dimensions === null
                ? formatBytes(artifact.bytes)
                : `${dimensions.width}×${dimensions.height} · ${formatBytes(artifact.bytes)}`),
            h('button', {
              key: 'copyPath',
              type: 'button',
              className: cx('artifact-space-previewAction'),
              'data-state': copied !== null && copied.startsWith('path:') ? copied.slice('path:'.length) : null,
              'aria-label': t('artifact.copyPath'),
              title: t('artifact.copyPath'),
              onClick: () => copy(artifact.absolutePath ?? '', 'path'),
            }, [
              h('svg', {
                key: 'icon',
                viewBox: '0 0 16 16',
                width: 12,
                height: 12,
                fill: 'none',
                stroke: 'currentColor',
                strokeWidth: 1.3,
                strokeLinecap: 'round',
                strokeLinejoin: 'round',
                'aria-hidden': true,
              }, [
                h('path', { key: 'p', d: 'M6.4 9.6a2.6 2.6 0 003.9.3l2-2a2.6 2.6 0 00-3.7-3.7l-1.1 1.1' }),
                h('path', { key: 'p2', d: 'M9.6 6.4a2.6 2.6 0 00-3.9-.3l-2 2a2.6 2.6 0 003.7 3.7l1.1-1.1' }),
              ]),
              copied !== null && copied.startsWith('path:')
                ? h('span', { key: 'label', className: cx('artifact-space-previewActionLabel') },
                  copied === 'path:ok' ? t('artifact.copiedPath') : t('artifact.copyFailed'))
                : null,
            ]),
          ]),
          imageState === 'error'
            ? h(PreviewState, {
              key: 'state',
              kind: 'binary',
              title: t('preview.imageFailed'),
              text: artifact.absolutePath,
            })
            : h('div', { key: 'body', className: cx('artifact-space-previewImageWrap') }, [
              h('img', {
                key: 'img',
                className: cx('artifact-space-previewImage'),
                src,
                alt: artifact.name,
                onLoad: (event) => {
                  const node = event.currentTarget;
                  setDimensions({ width: node.naturalWidth, height: node.naturalHeight });
                  setImageState('ready');
                },
                onError: () => setImageState('error'),
              }),
            ]),
        ]);
      }

      if (html && !outside) {
        // The Host serves the document with its relative references rewritten
        // into authenticated asset URLs, so the page renders inside the panel
        // exactly as it does in a browser tab — pictures and all.
        const src = `${HTML_ROUTE}?${new URLSearchParams({ sessionId, path }).toString()}`;
        return h('div', { className: cx('artifact-space-preview'), 'data-state': 'html' }, [
          h('div', { key: 'head', className: cx('artifact-space-previewHead') }, [
            h('span', { key: 'title', className: cx('artifact-space-previewTitle'), title: artifact.absolutePath }, artifact.name),
            artifactMeta(artifact, t),
            h('span', { key: 'meta', className: cx('artifact-space-previewMeta') },
              formatBytes(artifact.bytes)),
            h('div', { key: 'actions', className: cx('artifact-space-previewActions') }, [
              h('button', {
                key: 'open',
                type: 'button',
                className: cx('artifact-space-previewAction'),
                'aria-label': t('preview.openInBrowser'),
                title: t('preview.openInBrowser'),
                onClick: () => openInBrowser(src),
              }, [
                h('svg', {
                  key: 'icon',
                  viewBox: '0 0 16 16',
                  width: 12,
                  height: 12,
                  fill: 'none',
                  stroke: 'currentColor',
                  strokeWidth: 1.3,
                  strokeLinecap: 'round',
                  strokeLinejoin: 'round',
                  'aria-hidden': true,
                }, h('path', { key: 'p', d: 'M6.5 3H3.8a1.3 1.3 0 00-1.3 1.3v7.4A1.3 1.3 0 003.8 13h7.4a1.3 1.3 0 001.3-1.3V9M9.2 2.6h4.2v4.2M13.4 2.6L7.6 8.4' })),
                h('span', { key: 'label', className: cx('artifact-space-previewActionLabel') }, t('preview.openInBrowser')),
              ]),
              h('button', {
                key: 'copyPath',
                type: 'button',
                className: cx('artifact-space-previewAction'),
                'data-state': copied !== null && copied.startsWith('path:') ? copied.slice('path:').slice(0) : null,
                'aria-label': t('artifact.copyPath'),
                title: t('artifact.copyPath'),
                onClick: () => copy(artifact.absolutePath ?? '', 'path'),
              }, [
                h('svg', {
                  key: 'icon',
                  viewBox: '0 0 16 16',
                  width: 12,
                  height: 12,
                  fill: 'none',
                  stroke: 'currentColor',
                  strokeWidth: 1.3,
                  strokeLinecap: 'round',
                  strokeLinejoin: 'round',
                  'aria-hidden': true,
                }, [
                  h('path', { key: 'p', d: 'M6.4 9.6a2.6 2.6 0 003.9.3l2-2a2.6 2.6 0 00-3.7-3.7l-1.1 1.1' }),
                  h('path', { key: 'p2', d: 'M9.6 6.4a2.6 2.6 0 00-3.9-.3l-2 2a2.6 2.6 0 003.7 3.7l1.1-1.1' }),
                ]),
                copied !== null && copied.startsWith('path:')
                  ? h('span', { key: 'label', className: cx('artifact-space-previewActionLabel') },
                    copied === 'path:ok' ? t('artifact.copiedPath') : t('artifact.copyFailed'))
                  : null,
              ]),
            ]),
            h('button', {
              key: 'close',
              type: 'button',
              className: cx('artifact-space-previewClose'),
              'aria-label': t('preview.close'),
              onClick: onClose,
            }, h('svg', {
              viewBox: '0 0 16 16',
              width: 12,
              height: 12,
              fill: 'none',
              stroke: 'currentColor',
              strokeWidth: 1.4,
              strokeLinecap: 'round',
              'aria-hidden': true,
            }, h('path', { key: 'p', d: 'M4 4l8 8M12 4l-8 8' }))),
          ]),
          h('iframe', {
            key: 'frame',
            className: cx('artifact-space-previewFrame'),
            src,
            title: artifact.name,
            sandbox: 'allow-same-origin',
            referrerPolicy: 'no-referrer',
          }),
        ]);
      }

      if (binary) {
        return h('div', { className: cx('artifact-space-preview'), 'data-state': 'binary' }, [
          h('div', { key: 'head', className: cx('artifact-space-previewHead') }, [
            h('span', { key: 'title', className: cx('artifact-space-previewTitle') }, artifact.name),
            h('span', { key: 'meta', className: cx('artifact-space-previewMeta') }, formatBytes(artifact.bytes)),
            h('button', {
              key: 'copyPath',
              type: 'button',
              className: cx('artifact-space-previewAction'),
              'data-state': copied !== null && copied.startsWith('path:') ? copied.slice('path:'.length) : null,
              'aria-label': t('artifact.copyPath'),
              title: t('artifact.copyPath'),
              onClick: () => copy(artifact.absolutePath ?? '', 'path'),
            }, [
              h('svg', {
                key: 'icon',
                viewBox: '0 0 16 16',
                width: 12,
                height: 12,
                fill: 'none',
                stroke: 'currentColor',
                strokeWidth: 1.3,
                strokeLinecap: 'round',
                strokeLinejoin: 'round',
                'aria-hidden': true,
              }, [
                h('path', { key: 'p', d: 'M6.4 9.6a2.6 2.6 0 003.9.3l2-2a2.6 2.6 0 00-3.7-3.7l-1.1 1.1' }),
                h('path', { key: 'p2', d: 'M9.6 6.4a2.6 2.6 0 00-3.9-.3l-2 2a2.6 2.6 0 003.7 3.7l1.1-1.1' }),
              ]),
              copied !== null && copied.startsWith('path:')
                ? h('span', { key: 'label', className: cx('artifact-space-previewActionLabel') },
                  copied === 'path:ok' ? t('artifact.copiedPath') : t('artifact.copyFailed'))
                : null,
            ]),
          ]),
          h(PreviewState, {
            key: 'state',
            kind: 'binary',
            title: t('preview.binaryTitle', {
              ext: artifact.extension || '',
              size: formatBytes(artifact.bytes),
            }),
            text: artifact.absolutePath,
          }),
        ]);
      }
      if (outside) {
        return h('div', { className: cx('artifact-space-preview'), 'data-state': 'outside' }, [
          h('div', { key: 'head', className: cx('artifact-space-previewHead') }, [
            h('span', { key: 'title', className: cx('artifact-space-previewTitle') }, artifact.name),
            h('span', { key: 'meta', className: cx('artifact-space-previewMeta') }, formatBytes(artifact.bytes)),
            h('button', {
              key: 'copyPath',
              type: 'button',
              className: cx('artifact-space-previewAction'),
              'data-state': copied !== null && copied.startsWith('path:') ? copied.slice('path:'.length) : null,
              'aria-label': t('artifact.copyPath'),
              title: t('artifact.copyPath'),
              onClick: () => copy(artifact.absolutePath ?? '', 'path'),
            }, [
              h('svg', {
                key: 'icon',
                viewBox: '0 0 16 16',
                width: 12,
                height: 12,
                fill: 'none',
                stroke: 'currentColor',
                strokeWidth: 1.3,
                strokeLinecap: 'round',
                strokeLinejoin: 'round',
                'aria-hidden': true,
              }, [
                h('path', { key: 'p', d: 'M6.4 9.6a2.6 2.6 0 003.9.3l2-2a2.6 2.6 0 00-3.7-3.7l-1.1 1.1' }),
                h('path', { key: 'p2', d: 'M9.6 6.4a2.6 2.6 0 00-3.9-.3l-2 2a2.6 2.6 0 003.7 3.7l1.1-1.1' }),
              ]),
              copied !== null && copied.startsWith('path:')
                ? h('span', { key: 'label', className: cx('artifact-space-previewActionLabel') },
                  copied === 'path:ok' ? t('artifact.copiedPath') : t('artifact.copyFailed'))
                : null,
            ]),
          ]),
          h(PreviewState, {
            key: 'state',
            kind: 'outside',
            title: t('preview.outsideTitle'),
            text: artifact.absolutePath,
          }),
        ]);
      }

      if (path === '' || state == null || state.status === 'loading') {
        return h('div', { className: cx('artifact-space-preview'), 'data-state': 'loading', role: 'status' },
          h(PreviewState, { kind: 'loading', title: t('preview.loading') }));
      }
      if (state.status === 'missing') {
        return h('div', { className: cx('artifact-space-preview'), 'data-state': 'missing', role: 'alert' }, [
          h('div', { key: 'head', className: cx('artifact-space-previewHead') }, [
            h('span', { key: 'title', className: cx('artifact-space-previewTitle') }, artifact.name),
          ]),
          h(PreviewState, {
            key: 'state',
            kind: 'missing',
            title: t('preview.missingTitle'),
            text: artifact.absolutePath,
            action: t('preview.retry'),
            onAction: () => store.load(sessionId, path),
          }),
        ]);
      }
      if (state.status === 'too-large') {
        return h('div', { className: cx('artifact-space-preview'), 'data-state': 'error', role: 'alert' }, [
          h('div', { key: 'head', className: cx('artifact-space-previewHead') }, [
            h('span', { key: 'title', className: cx('artifact-space-previewTitle') }, artifact.name),
          ]),
          h(PreviewState, {
            key: 'state',
            kind: 'error',
            title: t('preview.tooLargeTitle'),
            text: artifact.absolutePath,
          }),
        ]);
      }
      if (state.status === 'error') {
        const detail = state.detail ? `${state.code ?? ''} ${state.httpStatus ? `HTTP ${state.httpStatus} ` : ''}${state.detail}` : (state.code ?? '');
        return h('div', { className: cx('artifact-space-preview'), 'data-state': 'error', role: 'alert' }, [
          h('div', { key: 'head', className: cx('artifact-space-previewHead') }, [
            h('span', { key: 'title', className: cx('artifact-space-previewTitle') }, artifact.name),
          ]),
          h(PreviewState, {
            key: 'state',
            kind: 'error',
            title: t('preview.errorTitle'),
            text: detail.trim(),
            action: t('preview.retry'),
            onAction: () => store.load(sessionId, path),
          }),
        ]);
      }

      const value = state.value;
      const text = typeof value.text === 'string' ? value.text : '';
      const lang = detectLanguage(artifact);
      const lineCount = value.lines ?? (text === '' ? 0 : text.replace(/\r\n?/g, '\n').split('\n').length);
      return h('div', { className: cx('artifact-space-preview'), 'data-state': 'ready' }, [
        h('div', { key: 'head', className: cx('artifact-space-previewHead') }, [
          h('span', { key: 'title', className: cx('artifact-space-previewTitle'), title: artifact.absolutePath }, artifact.name),
          h('span', { key: 'badge', className: cx('artifact-space-previewBadge') }, (artifact.extension || '').replace(/^\./, '').toLowerCase() || 'txt'),
          artifactMeta(artifact, t),
          h('span', { key: 'meta', className: cx('artifact-space-previewMeta') },
            `${formatBytes(value.bytes ?? artifact.bytes)} · ${t('preview.lines', { count: value.lines ?? 0 })}`),
          h('div', { key: 'actions', className: cx('artifact-space-previewActions') }, [
            h('button', {
              key: 'copy',
              type: 'button',
              className: cx('artifact-space-previewAction'),
              'data-state': copied !== null && copied.startsWith('content:') ? copied.slice('content:'.length) : null,
              'aria-label': t('artifact.copy'),
              title: t('artifact.copy'),
              onClick: () => copy(text, 'content'),
            }, [
              h('svg', {
                key: 'icon',
                viewBox: '0 0 16 16',
                width: 12,
                height: 12,
                fill: 'none',
                stroke: 'currentColor',
                strokeWidth: 1.3,
                strokeLinecap: 'round',
                strokeLinejoin: 'round',
                'aria-hidden': true,
              }, [
                h('rect', { key: 'back', x: 5.2, y: 5.2, width: 7.3, height: 7.3, rx: 1.6 }),
                h('path', { key: 'front', d: 'M10.8 3.4A1.6 1.6 0 009.3 2.6H4.1A1.5 1.5 0 002.6 4.1v5.2c0 .8.6 1.4 1.3 1.5' }),
              ]),
              copied !== null && copied.startsWith('content:')
                ? h('span', { key: 'label', className: cx('artifact-space-previewActionLabel') },
                  copied === 'content:ok' ? t('artifact.copiedContent') : t('artifact.copyFailed'))
                : null,
            ]),
            h('button', {
              key: 'copyPath',
              type: 'button',
              className: cx('artifact-space-previewAction'),
              'data-state': copied !== null && copied.startsWith('path:') ? copied.slice('path:'.length) : null,
              'aria-label': t('artifact.copyPath'),
              title: t('artifact.copyPath'),
              onClick: () => copy(artifact.absolutePath ?? '', 'path'),
            }, [
              h('svg', {
                key: 'icon',
                viewBox: '0 0 16 16',
                width: 12,
                height: 12,
                fill: 'none',
                stroke: 'currentColor',
                strokeWidth: 1.3,
                strokeLinecap: 'round',
                strokeLinejoin: 'round',
                'aria-hidden': true,
              }, [
                h('path', { key: 'p', d: 'M6.4 9.6a2.6 2.6 0 003.9.3l2-2a2.6 2.6 0 00-3.7-3.7l-1.1 1.1' }),
                h('path', { key: 'p2', d: 'M9.6 6.4a2.6 2.6 0 00-3.9-.3l-2 2a2.6 2.6 0 003.7 3.7l1.1-1.1' }),
              ]),
              copied !== null && copied.startsWith('path:')
                ? h('span', { key: 'label', className: cx('artifact-space-previewActionLabel') },
                  copied === 'path:ok' ? t('artifact.copiedPath') : t('artifact.copyFailed'))
                : null,
            ]),
          ]),
          h('button', {
            key: 'close',
            type: 'button',
            className: cx('artifact-space-previewClose'),
            'aria-label': t('preview.close'),
            onClick: onClose,
          }, h('svg', {
            viewBox: '0 0 16 16',
            width: 12,
            height: 12,
            fill: 'none',
            stroke: 'currentColor',
            strokeWidth: 1.4,
            strokeLinecap: 'round',
            'aria-hidden': true,
          }, h('path', { d: 'M4 4l8 8M12 4l-8 8' }))),
        ]),
        text === ''
          ? h('div', { key: 'body', className: cx('artifact-space-previewBody') }, t('preview.empty'))
          : renderPreviewBody(artifact, text),
        h('div', { key: 'status', className: cx('artifact-space-previewStatus') }, [
          h('span', { key: 'lang', className: cx('artifact-space-previewStatusItem') }, lang === 'text' ? 'Plain Text' : lang.toUpperCase()),
          h('span', { key: 'lines', className: cx('artifact-space-previewStatusItem') }, t('preview.lines', { count: lineCount })),
          h('span', { key: 'size', className: cx('artifact-space-previewStatusItem') }, formatBytes(value.bytes ?? artifact.bytes)),
          h('span', { key: 'enc', className: cx('artifact-space-previewStatusItem') }, 'UTF-8'),
        ]),
      ]);
    }

    /**
     * The Artifact Space page: a workspace tree on the left, the selected
     * file's preview on the right. Data flows through the store the Host
     * serves, so the page subscribes to the smallest slice it renders.
     */
    function ArtifactSpacePage(props) {
      const t = props.t;
      const rows = React.useSyncExternalStore(props.rows.subscribe, props.rows.getSnapshot);
      const [selected, setSelected] = React.useState(null);
      const [openGroups, setOpenGroups] = React.useState(() => new Set());
      const [expandedSessions, setExpandedSessions] = React.useState(() => new Set());
      // Sessions the reader folded or unfolded by hand. Only the ids in this
      // set deviate from the automatic first-screen rule.
      const [manualSessions, setManualSessions] = React.useState(() => new Map());
      // The search term typed into the panel's filter field.
      const [query, setQuery] = React.useState('');
      // Whether the panel shows every artifact or only the starred ones.
      const [showFavorites, setShowFavorites] = React.useState(false);
      // The quick category filter: every artifact, only the delivered ones, or
      // only the ones produced along the way.
      const [kindFilter, setKindFilter] = React.useState('all');
      const primedGroups = React.useRef(false);
      const treeRef = React.useRef(null);
      // The viewport height the tree was measured against, so the automatic
      // rule is recomputed when the panel is resized.
      const treeHeight = React.useRef(0);
      const searchRef = React.useRef(null);

      const previewStore = props.preview;
      // The favorites live in their own store so they survive a panel
      // remount and are shared by the tree and the favorites view.
      const favoritesStore = props.favorites ?? null;
      const favorites = React.useSyncExternalStore(
        favoritesStore !== null ? favoritesStore.subscribe : () => () => {},
        favoritesStore !== null ? favoritesStore.getSnapshot : () => EMPTY_FAVORITES,
      );
      React.useEffect(() => { props.rows.load(); }, [props.rows]);

      // Defensive reads: the Host's payload is the only shape authority, and a
      // malformed row must degrade to a smaller list, never crash the panel.
      const groups = Array.isArray(rows?.groups) ? rows.groups : [];
      const safeGroups = React.useMemo(() => groups.map((group) => ({
        ...group,
        title: typeof group?.title === 'string' && group.title !== '' ? group.title : (group?.workspaceId ?? ''),
        sessions: (Array.isArray(group?.sessions) ? group.sessions : []).map((session) => ({
          ...session,
          title: typeof session?.title === 'string' && session.title !== '' ? session.title : String(session?.sessionId ?? ''),
          note: session?.note ?? null,
          artifacts: (Array.isArray(session?.artifacts) ? session.artifacts : [])
            .filter((a) => a && typeof a.path === 'string')
            // Newest first: the file the reader just made leads the list.
            .map((artifact, index) => ({ artifact, index }))
            .sort((left, right) => {
              const leftAt = Number.isFinite(left.artifact.producedAt) ? left.artifact.producedAt : null;
              const rightAt = Number.isFinite(right.artifact.producedAt) ? right.artifact.producedAt : null;
              if (leftAt === null && rightAt === null) return left.index - right.index;
              if (leftAt === null) return 1;
              if (rightAt === null) return -1;
              if (rightAt !== leftAt) return rightAt - leftAt;
              return left.index - right.index;
            })
            .map((entry) => entry.artifact),
        })),
      })), [groups]);

      // The first workspace group starts open; every other group is folded.
      React.useEffect(() => {
        if (primedGroups.current || safeGroups.length === 0) return;
        primedGroups.current = true;
        const first = safeGroups[0].workspaceId || 'ungrouped';
        setOpenGroups(new Set([first]));
      }, [safeGroups]);

      // Ctrl+F / Cmd+F focuses the search field, the way an editor does.
      React.useEffect(() => {
        const onKeyDown = (event) => {
          if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'f') {
            const field = searchRef.current;
            if (field === null) return;
            event.preventDefault();
            field.focus();
            field.select();
          }
        };
        if (typeof window === 'undefined' || typeof window.addEventListener !== 'function') return undefined;
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
      }, []);

      // Track the tree's visible height so the first-screen rule follows the
      // panel when it is resized.
      const [, forceMeasure] = React.useReducer((count) => count + 1, 0);
      React.useEffect(() => {
        const node = treeRef.current;
        if (node === null) return undefined;
        const measure = () => {
          const height = node.clientHeight;
          if (height === treeHeight.current) return;
          treeHeight.current = height;
          forceMeasure();
        };
        measure();
        if (typeof ResizeObserver !== 'function') return undefined;
        const observer = new ResizeObserver(measure);
        observer.observe(node);
        return () => observer.disconnect();
      }, []);

      // How many artifact rows fit in the tree's visible area.
      //
      // A session shows its products in a fixed-height list, so the number of
      // sessions that fit on the first screen follows from the tree's own
      // height. The row height matches the stylesheet's 25px rows plus the
      // 27px session head; the small slack keeps the last row from being
      // clipped by a rounding error.
      const ROW_HEIGHT = 25;
      const HEAD_HEIGHT = 27;
      const visibleRows = React.useMemo(() => {
        const height = treeHeight.current;
        if (height <= 0) return Infinity;
        return Math.max(0, Math.floor((height - 4) / ROW_HEIGHT));
      }, [rows.status, rows.refreshedAt]);

      // Which sessions are open by default: the ones whose products land
      // within the first screen. A session the reader touched by hand keeps
      // the state they chose, whatever the measurement says.
      const autoOpen = React.useMemo(() => {
        const open = new Set();
        // Before the tree has been measured every session stays open, so the
        // panel does not flash closed on the first paint. The measurement
        // arrives right after and narrows the list to the first screen.
        if (!Number.isFinite(visibleRows)) {
          for (const group of safeGroups) {
            for (const session of group.sessions) open.add(session.sessionId);
          }
          return open;
        }
        let used = 0;
        for (const group of safeGroups) {
          for (const session of group.sessions) {
            const rows = Math.min(session.artifacts.length, 8);
            const cost = HEAD_HEIGHT + rows * ROW_HEIGHT;
            if (used + cost > visibleRows * ROW_HEIGHT) continue;
            used += cost;
            open.add(session.sessionId);
          }
        }
        return open;
      }, [safeGroups, visibleRows]);

      // The sessions that are actually folded: the automatic set, minus the
      // ones a reader unfolded, plus the ones a reader folded.
      const foldedSessions = React.useMemo(() => {
        const folded = new Set();
        for (const group of safeGroups) {
          for (const session of group.sessions) {
            const id = session.sessionId;
            const manual = manualSessions.get(id);
            const isOpen = manual === undefined ? autoOpen.has(id) : manual;
            if (!isOpen) folded.add(id);
          }
        }
        return folded;
      }, [safeGroups, autoOpen, manualSessions]);

      // The search filter.
      //
      // A term matches a workspace, a session or a product. Words separated
      // by spaces are alternatives: `client js` finds `client.js` as well as
      // `package.json`, because each of those names carries one of the words.
      const searchParts = React.useMemo(
        () => normalizeQuery(query).split(/\s+/).filter((part) => part !== ''),
        [query],
      );
      const searching = searchParts.length > 0;

      // Star or unstar one artifact.
      //
      // The toggle lives in the store, so the change is written to disk and
      // published to every view at once. Un-starring removes the artifact's
      // own storage key, so nothing is left behind for it.
      const toggleFavorite = React.useCallback((artifact, sessionId) => {
        if (favoritesStore === null) return;
        favoritesStore.toggle(sessionId, artifact.path, artifact.name, '');
      }, [favoritesStore]);

      // The keys of the artifacts that are still listed by the Host.
      const liveKeys = React.useMemo(() => {
        const keys = new Set();
        for (const group of safeGroups) {
          for (const session of group.sessions) {
            for (const artifact of session.artifacts) {
              keys.add(favoriteKey(session.sessionId, artifact.path));
            }
          }
        }
        return keys;
      }, [safeGroups]);

      /**
       * Drop the favorites whose artifact is gone.
       *
       * This is the reader's explicit request, never an automatic sweep: the
       * Host drops a session from its rows while its log is unreadable or
       * awaits migration, so treating an absent row as proof of deletion
       * would throw away favorites the reader still wants.
       */
      const pruneFavorites = React.useCallback(() => {
        if (favoritesStore === null) return;
        // Only a completed read proves what exists; a failed one proves
        // nothing.
        if (rows.status !== 'ready') return;
        favoritesStore.prune(liveKeys);
      }, [favoritesStore, liveKeys, rows.status]);

      /**
       * Drop every favorite.
       *
       * The store removes each storage key as it goes, so clearing the list
       * leaves nothing behind on disk either.
       */
      const clearFavorites = React.useCallback(() => {
        if (favoritesStore === null) return;
        favoritesStore.clear();
      }, [favoritesStore]);

      // How many artifacts each category holds, for the filter chips.
      const kindCounts = React.useMemo(() => {
        let all = 0;
        let presented = 0;
        let produced = 0;
        for (const group of safeGroups) {
          for (const session of group.sessions) {
            for (const artifact of session.artifacts) {
              all += 1;
              if (artifact.kind === 'presented') presented += 1;
              else produced += 1;
            }
          }
        }
        return { all, presented, produced };
      }, [safeGroups]);

      // The category filter runs before the text filter: a reader who asked
      // for delivered artifacts only sees the delivered ones, and the search
      // then narrows that set further.
      const kindGroups = React.useMemo(() => {
        if (kindFilter === 'all') return safeGroups;
        const result = [];
        for (const group of safeGroups) {
          const sessions = [];
          for (const session of group.sessions) {
            const artifacts = session.artifacts.filter((artifact) => artifact.kind === kindFilter);
            if (artifacts.length === 0) continue;
            sessions.push({ ...session, artifacts });
          }
          if (sessions.length === 0) continue;
          result.push({ ...group, sessions });
        }
        return result;
      }, [safeGroups, kindFilter]);

      const filteredGroups = React.useMemo(() => {
        if (!searching) return kindGroups;
        const result = [];
        for (const group of kindGroups) {
          const groupHit = labelMatches(group.title, searchParts);
          const sessions = [];
          for (const session of group.sessions) {
            const sessionHit = groupHit || labelMatches(session.title, searchParts);
            const artifacts = sessionHit
              ? session.artifacts
              : session.artifacts.filter((artifact) => anyLabelMatches([artifact.name], searchParts));
            if (artifacts.length === 0) continue;
            sessions.push({ ...session, artifacts });
          }
          if (sessions.length === 0) continue;
          result.push({ ...group, sessions });
        }
        return result;
      }, [kindGroups, searchParts, searching]);

      // While a search is active every match is shown, so nothing that
      // matched stays hidden behind a folded session. A session the reader
      // folded by hand stays folded even so.
      const effectiveFolded = React.useMemo(() => {
        if (!searching) return foldedSessions;
        const folded = new Set();
        for (const group of filteredGroups) {
          for (const session of group.sessions) {
            if (manualSessions.get(session.sessionId) === false) folded.add(session.sessionId);
          }
        }
        return folded;
      }, [filteredGroups, foldedSessions, manualSessions, searching]);

      // The number of products the search matched, for the result counter.
      const searchHits = React.useMemo(() => {
        if (!searching) return 0;
        let count = 0;
        for (const group of filteredGroups) {
          for (const session of group.sessions) count += session.artifacts.length;
        }
        return count;
      }, [filteredGroups, searching]);

      const totals = React.useMemo(() => {
        let sessions = 0;
        let artifacts = 0;
        for (const group of kindGroups) {
          for (const session of group.sessions) {
            sessions += 1;
            artifacts += session.artifacts.length;
          }
        }
        return { groups: kindGroups.length, sessions, artifacts };
      }, [kindGroups]);

      const selectedSession = React.useMemo(() => {
        if (selected === null) return null;
        for (const group of safeGroups) {
          for (const session of group.sessions) {
            if (session.sessionId === selected.sessionId) return session;
          }
        }
        return null;
      }, [safeGroups, selected]);

      const activeArtifact = React.useMemo(() => {
        if (selected === null || selectedSession === null) return null;
        return selectedSession.artifacts.find((artifact) => artifact.path === selected.path) ?? null;
      }, [selected, selectedSession]);

      const tree = () => {
        if (rows.status === 'loading' || rows.status === 'idle') {
          return h('div', { key: 'loading', className: cx('artifact-space-status'), role: 'status' }, t('loading'));
        }
        if (rows.status === 'error') {
          return h('div', { key: 'error', className: cx('artifact-space-status'), role: 'alert' }, [
            h('span', { key: 'title', className: cx('artifact-space-statusTitle') }, t('error.title')),
            h('button', {
              key: 'retry',
              type: 'button',
              className: cx('artifact-space-statusAction'),
              onClick: () => props.rows.load(),
            }, t('error.retry')),
          ]);
        }
        // The favorites view is independent of the tree: it lists what was
        // starred, even when the session that produced it is gone.
        if (showFavorites) {
          return h(FavoritesList, {
            key: 'favorites',
            favorites,
            rows: safeGroups,
            onSelect: (artifact, sessionId) => setSelected({ sessionId, path: artifact.path }),
            onToggleFavorite: toggleFavorite,
            onPrune: pruneFavorites,
            onClear: clearFavorites,
            t,
            searchParts,
          });
        }
        if (kindCounts.all === 0) {
          return h('div', { key: 'empty', className: cx('artifact-space-status') }, [
            h('span', { key: 'title', className: cx('artifact-space-statusTitle') }, t('empty.title')),
            h('span', { key: 'body', className: cx('artifact-space-statusBody') }, t('empty.body')),
          ]);
        }
        if (searching && filteredGroups.length === 0) {
          return h('div', { key: 'noHits', className: cx('artifact-space-status') }, [
            h('span', { key: 'title', className: cx('artifact-space-statusTitle') }, t('search.none', { query: query.trim() })),
            h('span', { key: 'body', className: cx('artifact-space-statusBody') }, t('search.noneHint')),
          ]);
        }
        if (kindFilter !== 'all' && kindGroups.length === 0) {
          return h('div', { key: 'noKind', className: cx('artifact-space-status') }, [
            h('span', { key: 'title', className: cx('artifact-space-statusTitle') }, t('filter.empty')),
            h('span', { key: 'body', className: cx('artifact-space-statusBody') }, t('search.noneHint')),
          ]);
        }
        return filteredGroups.map((group) => h(WorkspaceGroup, {
          key: group.workspaceId || 'ungrouped',
          group,
          // A search opens every group that still has a match.
          open: searching || openGroups.has(group.workspaceId || 'ungrouped'),
          searchParts,
          onToggle: (id) => setOpenGroups((prev) => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id); else next.add(id);
            return next;
          }),
          selected,
          onSelect: (artifact, sessionId) => setSelected({ sessionId, path: artifact.path }),
          t,
          expandedSessions,
          onToggleSession: (id) => setExpandedSessions((prev) => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id); else next.add(id);
            return next;
          }),
          // The component reads `foldedSessions`; pass the effective set
          // under that name so the lookup never sees undefined.
          foldedSessions: effectiveFolded,
          onToggleFolded: (id) => setManualSessions((prev) => {
            const next = new Map(prev);
            const currentlyOpen = effectiveFolded.has(id) ? false : true;
            next.set(id, !currentlyOpen);
            return next;
          }),
          favorites,
          onToggleFavorite: toggleFavorite,
        }));
      };

      return h('div', { className: cx('artifact-space-root'), 'data-artifact-space': true }, [
        h('div', { key: 'shell', className: cx('artifact-space-shell') }, [
        h('header', { key: 'head', className: cx('artifact-space-head') }, [
          h('svg', {
            key: 'icon',
            className: cx('artifact-space-headIcon'),
            viewBox: '0 0 16 16',
            width: 14,
            height: 14,
            fill: 'none',
            stroke: 'currentColor',
            strokeWidth: 1.3,
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            'aria-hidden': true,
          }, [
            h('rect', { key: 'r', x: 2.5, y: 3, width: 11, height: 10, rx: 1.5 }),
            h('path', { key: 'l', d: 'M2.5 6.5h11' }),
          ]),
          h('h1', { key: 'title', className: cx('artifact-space-title') }, t('page.title')),
          h('p', { key: 'subtitle', className: cx('artifact-space-subtitle') }, t('page.subtitle', {
            groups: String(totals.groups),
            sessions: String(totals.sessions),
            artifacts: String(totals.artifacts),
          })),
          h('div', { key: 'spacer', className: cx('artifact-space-headSpacer') }),
          h('button', {
            key: 'favorites',
            type: 'button',
            className: cx('artifact-space-tool', 'artifact-space-favTool'),
            'data-active': showFavorites ? 'true' : 'false',
            'aria-pressed': showFavorites ? 'true' : 'false',
            'aria-label': t('favorites.toggle'),
            title: t('favorites.toggle'),
            onClick: () => setShowFavorites((prev) => !prev),
          }, [
            h('svg', {
              key: 'icon',
              viewBox: '0 0 16 16',
              width: 14,
              height: 14,
              fill: showFavorites ? 'currentColor' : 'none',
              stroke: 'currentColor',
              strokeWidth: 1.3,
              strokeLinejoin: 'round',
              'aria-hidden': true,
            }, h('path', { d: 'M8 1.8l1.9 3.9 4.3.6-3.1 3 .7 4.3L8 11.6l-3.8 2 .7-4.3-3.1-3 4.3-.6z' })),
            favorites.size > 0
              ? h('span', { key: 'count', className: cx('artifact-space-favCount') }, String(favorites.size))
              : null,
          ]),
          h('div', {
            key: 'filter',
            className: cx('artifact-space-filter'),
            role: 'group',
            'aria-label': t('filter.label'),
          }, [
            h('button', {
              key: 'all',
              type: 'button',
              className: cx('artifact-space-filterBtn'),
              'data-kind': 'all',
              'aria-pressed': kindFilter === 'all' ? 'true' : 'false',
              onClick: () => setKindFilter('all'),
            }, [
              h('span', { key: 'label' }, t('filter.all')),
              h('span', { key: 'count', className: cx('artifact-space-filterCount') },
                t('filter.allCount', { count: String(kindCounts.all) })),
            ]),
            h('button', {
              key: 'presented',
              type: 'button',
              className: cx('artifact-space-filterBtn'),
              'data-kind': 'presented',
              'aria-pressed': kindFilter === 'presented' ? 'true' : 'false',
              title: t('artifact.presented'),
              onClick: () => setKindFilter(kindFilter === 'presented' ? 'all' : 'presented'),
            }, [
              h('span', { key: 'label' }, t('filter.presented')),
              h('span', { key: 'count', className: cx('artifact-space-filterCount') },
                t('filter.presentedCount', { count: String(kindCounts.presented) })),
            ]),
            h('button', {
              key: 'produced',
              type: 'button',
              className: cx('artifact-space-filterBtn'),
              'data-kind': 'produced',
              'aria-pressed': kindFilter === 'produced' ? 'true' : 'false',
              title: t('artifact.produced'),
              onClick: () => setKindFilter(kindFilter === 'produced' ? 'all' : 'produced'),
            }, [
              h('span', { key: 'label' }, t('filter.produced')),
              h('span', { key: 'count', className: cx('artifact-space-filterCount') },
                t('filter.producedCount', { count: String(kindCounts.produced) })),
            ]),
          ]),
          h('div', {
            key: 'search',
            className: cx('artifact-space-search'),
            'data-active': searching ? 'true' : 'false',
          }, [
            h('svg', {
              key: 'icon',
              className: cx('artifact-space-searchIcon'),
              viewBox: '0 0 16 16',
              width: 13,
              height: 13,
              fill: 'none',
              stroke: 'currentColor',
              strokeWidth: 1.35,
              strokeLinecap: 'round',
              'aria-hidden': true,
            }, [
              h('circle', { key: 'c', cx: 7, cy: 7, r: 4.2 }),
              h('path', { key: 'l', d: 'M10.2 10.2L13.5 13.5' }),
            ]),
            h('input', {
              key: 'input',
              ref: searchRef,
              type: 'search',
              className: cx('artifact-space-searchInput'),
              placeholder: t('search.placeholder'),
              'aria-label': t('search.aria'),
              value: query,
              onChange: (event) => setQuery(event.target.value),
              onKeyDown: (event) => {
                if (event.key === 'Escape') {
                  event.preventDefault();
                  setQuery('');
                }
              },
            }),
            searching
              ? h('span', { key: 'hits', className: cx('artifact-space-searchCount') },
                t('search.hits', { count: String(searchHits) }))
              : null,
            searching
              ? h('button', {
                key: 'clear',
                type: 'button',
                className: cx('artifact-space-searchClear'),
                'aria-label': t('search.clear'),
                onClick: () => setQuery(''),
              }, h('svg', {
                viewBox: '0 0 16 16',
                width: 11,
                height: 11,
                fill: 'none',
                stroke: 'currentColor',
                strokeWidth: 1.5,
                strokeLinecap: 'round',
                'aria-hidden': true,
              }, h('path', { d: 'M4 4l8 8M12 4l-8 8' })))
              : null,
          ]),
          h('span', {
            key: 'stamp',
            className: cx('artifact-space-refreshStamp'),
            'data-busy': rows.status === 'refreshing' ? 'true' : null,
          }, rows.status === 'refreshing'
            ? t('refresh.busy')
            : (rows.refreshedAt ? t('refresh.at', { time: formatClock(rows.refreshedAt) }) : '')),
          h('button', {
            key: 'refresh',
            type: 'button',
            className: cx('artifact-space-tool'),
            'data-busy': rows.status === 'refreshing' ? 'true' : null,
            'aria-label': t('refresh.aria'),
            onClick: () => props.rows.reload(),
          }, h('svg', {
            viewBox: '0 0 16 16',
            width: 14,
            height: 14,
            fill: 'none',
            stroke: 'currentColor',
            strokeWidth: 1.3,
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            'aria-hidden': true,
          }, h('path', { d: 'M13.5 8a5.5 5.5 0 1 1-1.6-3.9M13.5 2.5V5h-2.5' }))),
        ]),
        h('div', { key: 'body', className: cx('artifact-space-body') }, [
          h('nav', { key: 'tree', ref: treeRef, className: cx('artifact-space-tree'), 'aria-label': t('page.title') }, tree()),
          h('section', { key: 'pane', className: cx('artifact-space-pane') },
            activeArtifact !== null && selectedSession !== null
              ? h(PreviewPane, {
                key: `${selectedSession.sessionId}\u0000${activeArtifact.path}`,
                artifact: activeArtifact,
                sessionId: selectedSession.sessionId,
                store: previewStore,
                onClose: () => setSelected(null),
                t,
              })
              : h(PreviewState, { kind: 'idle', title: t('preview.hint') })),
        ]),
        ]),
      ]);
    }

    /* ── Format-aware preview rendering ─────────────────────────────────── */

    const MARKDOWN_EXTENSIONS = new Set(['md', 'markdown', 'mdown', 'mkd', 'mdx']);
    const HTML_EXTENSIONS = new Set(['html', 'htm', 'xhtml']);
    const YAML_EXTENSIONS = new Set(['yml', 'yaml']);
    const JSON_EXTENSIONS = new Set(['json', 'jsonc', 'json5']);
    /** Pictures the preview can display; the Host serves their bytes itself. */
    const IMAGE_EXTENSIONS = new Set(['png', 'jpg', 'jpeg', 'gif', 'webp', 'bmp', 'avif', 'ico', 'svg']);

    /** The lowercase extension of a file name, without the dot. */
    function extensionOfName(name) {
      const match = /\.([A-Za-z0-9]+)$/.exec(typeof name === 'string' ? name : '');
      return match === null ? '' : match[1].toLowerCase();
    }

    /**
     * The preview format of a file, derived from its extension.
     *
     * The Host's row already carries the extension; the name is the fallback
     * for rows that omit it.
     */
    function detectFormat(artifact) {
      const ext = (typeof artifact?.extension === 'string' && artifact.extension !== ''
        ? artifact.extension
        : extensionOfName(artifact?.name)).replace(/^\./, '').toLowerCase();
      if (IMAGE_EXTENSIONS.has(ext)) return 'image';
      if (MARKDOWN_EXTENSIONS.has(ext)) return 'markdown';
      if (HTML_EXTENSIONS.has(ext)) return 'html';
      if (YAML_EXTENSIONS.has(ext)) return 'yaml';
      if (JSON_EXTENSIONS.has(ext)) return 'json';
      return 'text';
    }

    /** Split a Markdown table row into its cells. */
    function splitTableRow(line) {
      return line
        .replace(/^\s*\|/, '')
        .replace(/\|\s*$/, '')
        .split('|')
        .map((cell) => cell.trim());
    }

    /**
     * Render the inline spans of a Markdown line.
     *
     * The supported spans are the ones an artifact actually carries in
     * practice: code, strong, emphasis, strikethrough and links. Underscore
     * emphasis is deliberately NOT supported, because `snake_case` identifiers
     * are common in technical artifacts and would be mangled by it.
     */
    function renderInline(text) {
      const nodes = [];
      const pattern = /(`[^`]+`)|(\*\*[^*]+\*\*)|(~~[^~]+~~)|(\*[^*\n]+\*)|(\[[^\]]*\]\([^)\s]+\))/g;
      let last = 0;
      let index = 0;
      let match;
      while ((match = pattern.exec(text)) !== null) {
        if (match.index > last) nodes.push(text.slice(last, match.index));
        const token = match[0];
        if (token.startsWith('`')) {
          nodes.push(h('code', { key: `c${index}`, className: cx('artifact-space-mdCode') }, token.slice(1, -1)));
        } else if (token.startsWith('**')) {
          nodes.push(h('strong', { key: `b${index}` }, token.slice(2, -2)));
        } else if (token.startsWith('~~')) {
          nodes.push(h('del', { key: `d${index}` }, token.slice(2, -2)));
        } else if (token.startsWith('[')) {
          const parts = /^\[([^\]]*)\]\(([^)\s]+)\)$/.exec(token);
          nodes.push(h('a', {
            key: `l${index}`,
            className: cx('artifact-space-mdLink'),
            href: parts === null ? '#' : parts[2],
            target: '_blank',
            rel: 'noreferrer noopener',
          }, parts === null ? token : parts[1]));
        } else {
          nodes.push(h('em', { key: `i${index}` }, token.slice(1, -1)));
        }
        last = pattern.lastIndex;
        index += 1;
      }
      if (last < text.length) nodes.push(text.slice(last));
      return nodes;
    }

    /**
     * Render a Markdown document as React nodes.
     *
     * The parser covers the block forms an artifact carries: fenced code,
     * headings, thematic breaks, block quotes, tables, ordered and unordered
     * lists, and paragraphs. Anything it does not recognise stays a paragraph,
     * so no content is ever dropped.
     */
    function renderMarkdown(source) {
      const lines = String(source).replace(/\r\n?/g, '\n').split('\n');
      const blocks = [];
      let index = 0;

      const isFence = (line) => /^\s*```/.test(line);
      const isHeading = (line) => /^#{1,6}\s/.test(line);
      const isQuote = (line) => /^\s*>/.test(line);
      const isBullet = (line) => /^\s*(?:[-*+]|\d+[.)])\s+/.test(line);
      const isTableDivider = (line) => /^\s*\|?[\s:|-]+\|[\s:|-]*$/.test(line) && line.includes('|');

      while (index < lines.length) {
        const line = lines[index];
        if (line.trim() === '') {
          index += 1;
          continue;
        }

        const fence = /^\s*```+\s*([A-Za-z0-9_+-]*)\s*$/.exec(line);
        if (fence !== null) {
          const language = fence[1];
          const buffer = [];
          index += 1;
          while (index < lines.length && !/^\s*```+\s*$/.test(lines[index])) {
            buffer.push(lines[index]);
            index += 1;
          }
          index += 1;
          blocks.push(h('div', { key: `code${blocks.length}`, className: cx('artifact-space-mdPre') }, [
            language === ''
              ? null
              : h('span', { key: 'lang', className: cx('artifact-space-mdCodeLang') }, language),
            h('pre', { key: 'body', className: cx('artifact-space-mdCodeBlock') }, h('code', null, buffer.join('\n'))),
          ]));
          continue;
        }

        const heading = /^(#{1,6})\s+(.*)$/.exec(line);
        if (heading !== null) {
          const level = heading[1].length;
          blocks.push(h(`h${level}`, { key: `h${blocks.length}`, className: cx('artifact-space-mdHeading'), 'data-level': String(level) }, renderInline(heading[2])));
          index += 1;
          continue;
        }

        if (/^\s*(?:[-*_]\s*){3,}$/.test(line)) {
          blocks.push(h('hr', { key: `hr${blocks.length}`, className: cx('artifact-space-mdHr') }));
          index += 1;
          continue;
        }

        if (isQuote(line)) {
          const buffer = [];
          while (index < lines.length && isQuote(lines[index])) {
            buffer.push(lines[index].replace(/^\s*>\s?/, ''));
            index += 1;
          }
          blocks.push(h('blockquote', { key: `q${blocks.length}`, className: cx('artifact-space-mdQuote') }, renderMarkdown(buffer.join('\n'))));
          continue;
        }

        if (line.includes('|') && index + 1 < lines.length && isTableDivider(lines[index + 1])) {
          const header = splitTableRow(line);
          index += 2;
          const rows = [];
          while (index < lines.length && lines[index].includes('|') && lines[index].trim() !== '') {
            rows.push(splitTableRow(lines[index]));
            index += 1;
          }
          blocks.push(h('table', { key: `t${blocks.length}`, className: cx('artifact-space-mdTable') }, [
            h('thead', { key: 'head' }, h('tr', { key: 'row' }, header.map((cell, cellIndex) => h('th', { key: `c${cellIndex}` }, renderInline(cell))))),
            h('tbody', { key: 'body' }, rows.map((row, rowIndex) => h('tr', { key: `r${rowIndex}` }, row.map((cell, cellIndex) => h('td', { key: `c${cellIndex}` }, renderInline(cell)))))),
          ]));
          continue;
        }

        if (isBullet(line)) {
          const ordered = /^\s*\d+[.)]\s+/.test(line);
          const items = [];
          while (index < lines.length) {
            const item = /^\s*(?:[-*+]|\d+[.)])\s+(.*)$/.exec(lines[index]);
            if (item === null) break;
            items.push(item[1]);
            index += 1;
          }
          const children = items.map((item, itemIndex) => h('li', { key: `i${itemIndex}` }, renderInline(item)));
          blocks.push(ordered
            ? h('ol', { key: `l${blocks.length}`, className: cx('artifact-space-mdList') }, children)
            : h('ul', { key: `l${blocks.length}`, className: cx('artifact-space-mdList') }, children));
          continue;
        }

        const buffer = [];
        while (index < lines.length && lines[index].trim() !== '' && !isFence(lines[index]) && !isHeading(lines[index]) && !isQuote(lines[index]) && !isBullet(lines[index])) {
          buffer.push(lines[index]);
          index += 1;
        }
        if (buffer.length === 0) {
          index += 1;
          continue;
        }
        blocks.push(h('p', { key: `p${blocks.length}`, className: cx('artifact-space-mdPara') }, renderInline(buffer.join('\n'))));
      }

      return h('div', { className: cx('artifact-space-md') }, blocks);
    }

    /**
     * Strip the active content from an HTML document.
     *
     * The preview renders HTML inside a sandboxed frame, which blocks scripts
     * and same-origin access on its own; this pass additionally removes script
     * elements, inline event handlers and `javascript:` URLs, so no active
     * content ever reaches the frame in the first place.
     */
    function sanitizeHtml(source) {
      return String(source)
        .replace(/<\s*script\b[\s\S]*?(?:<\s*\/\s*script\s*>|$)/gi, '')
        .replace(/<\s*\/\s*script\s*>/gi, '')
        .replace(/<\s*(?:iframe|object|embed)\b[\s\S]*?(?:<\s*\/\s*\1\s*>|$)/gi, '')
        .replace(/\son[a-z]+\s*=\s*"[^"]*"/gi, '')
        .replace(/\son[a-z]+\s*=\s*'[^']*'/gi, '')
        .replace(/\son[a-z]+\s*=\s*[^\s>]+/gi, '')
        .replace(/(href|src|xlink:href)\s*=\s*(?:"\s*javascript:[^"]*"|'\s*javascript:[^']*'|javascript:[^\s>]+)/gi, '$1="#"');
    }

    /* ── Editor-style code rendering ────────────────────────────────────── */

    /**
     * Token colours per language family, keyed by token role.
     *
     * The palette follows the editor convention — keywords read warm, strings
     * read cool, comments recede — so a dense file stays scannable without
     * the colour count climbing past the point of usefulness.
     */
    const CODE_THEME = {
      keyword: 'var(--artifact-space-code-keyword)',
      string: 'var(--artifact-space-code-string)',
      comment: 'var(--artifact-space-code-comment)',
      number: 'var(--artifact-space-code-number)',
      function: 'var(--artifact-space-code-function)',
      property: 'var(--artifact-space-code-property)',
      operator: 'var(--artifact-space-code-operator)',
      punctuation: 'var(--artifact-space-code-punctuation)',
      plain: 'var(--artifact-space-code-plain)',
    };

    /**
     * Colour one JSON line.
     *
     * JSON has a rigid shape, so it gets a dedicated pass: a quoted string
     * that is followed by a colon is an object key and reads as a property,
     * every other string is a value, and the literals true/false/null read
     * as keywords.
     */
    function tokenizeJsonLine(line) {
      const spans = [];
      let i = 0;
      while (i < line.length) {
        const ch = line[i];
        if (ch === '"') {
          let j = i + 1;
          while (j < line.length) {
            if (line[j] === '\\') { j += 2; continue; }
            if (line[j] === '"') { j += 1; break; }
            j += 1;
          }
          const literal = line.slice(i, j);
          // Look past the closing quote: a colon means this string is a key.
          let k = j;
          while (k < line.length && (line[k] === ' ' || line[k] === '\t')) k += 1;
          const isKey = line[k] === ':';
          spans.push({ text: literal, role: isKey ? CODE_THEME.property : CODE_THEME.string });
          i = j;
          continue;
        }
        const numberMatch = /^-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/.exec(line.slice(i));
        if (numberMatch) {
          spans.push({ text: numberMatch[0], role: CODE_THEME.number });
          i += numberMatch[0].length;
          continue;
        }
        const wordMatch = /^[A-Za-z]+/.exec(line.slice(i));
        if (wordMatch) {
          const word = wordMatch[0];
          const lower = word.toLowerCase();
          const role = lower === 'true' || lower === 'false' || lower === 'null'
            ? CODE_THEME.keyword
            : CODE_THEME.plain;
          spans.push({ text: word, role });
          i += word.length;
          continue;
        }
        if ('{}[]:,'.includes(ch)) {
          spans.push({ text: ch, role: CODE_THEME.operator });
          i += 1;
          continue;
        }
        spans.push({ text: ch, role: CODE_THEME.plain });
        i += 1;
      }
      return spans;
    }

    /**
     * Colour one YAML line.
     *
     * YAML is line-oriented, so the scanner reads a single entry: an
     * optional list marker, a key up to the first colon, then a scalar
     * value. The key reads as a property, the value reads as a string unless
     * it is a number or a boolean literal, and everything after a '#' is a
     * comment.
     */
    function tokenizeYamlLine(line) {
      const spans = [];
      const commentAt = findYamlComment(line);
      const body = commentAt === -1 ? line : line.slice(0, commentAt);
      const comment = commentAt === -1 ? '' : line.slice(commentAt);

      // Split the entry into key and value around the first colon.
      let key = body;
      let value = '';
      let colonAt = -1;
      let quote = null;
      for (let i = 0; i < body.length; i += 1) {
        const ch = body[i];
        if (quote) {
          if (ch === quote) quote = null;
          continue;
        }
        if (ch === '"' || ch === "'") { quote = ch; continue; }
        if (ch === ':') { colonAt = i; break; }
      }
      if (colonAt === -1) {
        key = body;
      } else {
        key = body.slice(0, colonAt);
        value = body.slice(colonAt + 1);
      }

      // A leading '- ' marks a sequence entry rather than part of the key.
      const listMatch = /^(\s*)-(\s+)/.exec(key);
      const indent = listMatch ? listMatch[1] : '';
      const marker = listMatch ? listMatch[2] : '';
      const name = listMatch ? key.slice(listMatch[0].length) : key;

      if (indent !== '') spans.push({ text: indent, role: CODE_THEME.plain });
      if (listMatch) spans.push({ text: '-', role: CODE_THEME.operator });

      if (name !== '') {
        if (colonAt === -1) {
          // A bare scalar, or a comment-only line.
          spans.push({ text: name, role: CODE_THEME.plain });
        } else {
          spans.push({ text: name, role: CODE_THEME.property });
          spans.push({ text: ':', role: CODE_THEME.operator });
        }
      }

      if (colonAt !== -1) {
        const trimmed = value.trim();
        const lead = value.slice(0, value.length - value.trimStart().length);
        if (lead !== '') spans.push({ text: lead, role: CODE_THEME.plain });
        if (trimmed !== '') {
          let role = CODE_THEME.string;
          if (/^(true|false|null|yes|no|on|off)$/i.test(trimmed)) role = CODE_THEME.keyword;
          else if (/^-?\d+(?:\.\d+)?$/.test(trimmed)) role = CODE_THEME.number;
          else if (/^["']/.test(trimmed)) role = CODE_THEME.string;
          else role = CODE_THEME.plain;
          spans.push({ text: trimmed, role });
        }
      }

      if (comment !== '') spans.push({ text: comment, role: CODE_THEME.comment });
      return spans;
    }

    /** Find where a YAML comment starts, ignoring '#' inside quotes. */
    function findYamlComment(line) {
      let quote = null;
      for (let i = 0; i < line.length; i += 1) {
        const ch = line[i];
        if (quote) {
          if (ch === quote) quote = null;
          continue;
        }
        if (ch === '"' || ch === "'") { quote = ch; continue; }
        if (ch === '#' && (i === 0 || /\s/.test(line[i - 1]))) return i;
      }
      return -1;
    }

    /**
     * Split one source line into coloured spans.
     *
     * A deliberately small, regex-driven scanner: it recognises comments,
     * strings, numbers and a modest keyword set per language, and leaves
     * everything else as plain text. The goal is legibility, not a complete
     * grammar — an imperfect parse still reads far better than a wall of
     * undifferentiated monospace.
     *
     * @param {string} line - one source line, without its newline.
     * @param {string} lang - lowercased language id.
     * @returns {Array<{text: string, role: string}>} spans in source order.
     */
    function tokenizeLine(line, lang) {
      if (lang === 'json') return tokenizeJsonLine(line);
      if (lang === 'yaml') return tokenizeYamlLine(line);
      const KEYWORDS = {
        js: ['const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'class', 'extends', 'import', 'export', 'from', 'default', 'async', 'await', 'new', 'this', 'try', 'catch', 'finally', 'throw', 'typeof', 'instanceof', 'in', 'of', 'null', 'undefined', 'true', 'false', 'break', 'continue', 'switch', 'case', 'delete', 'void', 'yield', 'static', 'get', 'set'],
        ts: ['const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'class', 'extends', 'implements', 'interface', 'type', 'enum', 'import', 'export', 'from', 'default', 'async', 'await', 'new', 'this', 'try', 'catch', 'finally', 'throw', 'typeof', 'instanceof', 'in', 'of', 'null', 'undefined', 'true', 'false', 'break', 'continue', 'switch', 'case', 'public', 'private', 'protected', 'readonly', 'as', 'satisfies', 'keyof', 'infer'],
        py: ['def', 'class', 'return', 'if', 'elif', 'else', 'for', 'while', 'break', 'continue', 'import', 'from', 'as', 'try', 'except', 'finally', 'raise', 'with', 'lambda', 'yield', 'global', 'nonlocal', 'pass', 'assert', 'del', 'is', 'not', 'and', 'or', 'in', 'None', 'True', 'False', 'self'],
        json: ['true', 'false', 'null'],
        yaml: ['true', 'false', 'null', 'yes', 'no', 'on', 'off'],
        sh: ['if', 'then', 'else', 'fi', 'for', 'in', 'do', 'done', 'while', 'case', 'esac', 'function', 'return', 'export', 'local', 'source', 'echo', 'cd', 'set'],
      };
      const keywords = KEYWORDS[lang] ?? KEYWORDS.js;
      const commentStart = lang === 'py' || lang === 'sh' || lang === 'yaml' ? '#' : '//';
      const blockComment = lang === 'js' || lang === 'ts' ? ['/*', '*/'] : null;
      // In JSON and YAML a name followed by a colon is a key, not a value.
      const keyAware = lang === 'json' || lang === 'yaml';

      const spans = [];
      let buffer = '';
      let i = 0;
      const flush = (role) => {
        if (buffer !== '') { spans.push({ text: buffer, role }); buffer = ''; }
      };

      while (i < line.length) {
        const rest = line.slice(i);

        // Block comment (js/ts)
        if (blockComment && rest.startsWith(blockComment[0])) {
          flush(CODE_THEME.plain);
          const end = line.indexOf(blockComment[1], i + 2);
          const stop = end === -1 ? line.length : end + 2;
          spans.push({ text: line.slice(i, stop), role: CODE_THEME.comment });
          i = stop;
          continue;
        }

        // Line comment
        if (rest.startsWith(commentStart)) {
          flush(CODE_THEME.plain);
          spans.push({ text: rest, role: CODE_THEME.comment });
          break;
        }

        // String literal
        const quote = rest[0];
        if (quote === '"' || quote === "'" || quote === '`') {
          flush(CODE_THEME.plain);
          let j = 1;
          while (j < rest.length) {
            if (rest[j] === '\\') { j += 2; continue; }
            if (rest[j] === quote) { j += 1; break; }
            j += 1;
          }
          spans.push({ text: rest.slice(0, j), role: CODE_THEME.string });
          i += j;
          continue;
        }

        // Number
        const numberMatch = /^\d[\d_]*(?:\.\d+)?(?:[eE][+-]?\d+)?/.exec(rest);
        if (numberMatch) {
          flush(CODE_THEME.plain);
          spans.push({ text: numberMatch[0], role: CODE_THEME.number });
          i += numberMatch[0].length;
          continue;
        }

        // Word — keyword, key, function or property
        const wordMatch = /^[A-Za-z_$][\w$-]*/.exec(rest);
        if (wordMatch) {
          const word = wordMatch[0];
          flush(CODE_THEME.plain);
          const lower = word.toLowerCase();
          let role = CODE_THEME.plain;
          if (keywords.includes(word) || keywords.includes(lower)) {
            role = CODE_THEME.keyword;
          } else {
            // A word directly followed by '(' reads as a call target.
            const after = rest.slice(word.length);
            if (after.startsWith('(')) role = CODE_THEME.function;
            else if (/^\s*:/.test(after)) role = CODE_THEME.property;
            else if (keyAware && /^\s*:/.test(after)) role = CODE_THEME.property;
          }
          spans.push({ text: word, role });
          i += word.length;
          continue;
        }

        // Punctuation / operators
        if (/[{}()[\];,.:=<>+\-*/%!&|^~?]/.test(quote)) {
          flush(CODE_THEME.plain);
          spans.push({ text: quote, role: CODE_THEME.operator });
          i += 1;
          continue;
        }

        buffer += quote;
        i += 1;
      }
      flush(CODE_THEME.plain);
      return spans;
    }

    /**
     * Render a source file the way an editor shows it: a numbered gutter on
     * the left, the code on the right, and the language named in the header.
     *
     * The gutter lives inside each code row rather than beside it, and each
     * number is a sticky cell. That way there is exactly one scrolling
     * container: vertical scrolling keeps every number glued to its line,
     * and horizontal scrolling pins the numbers to the left edge the way an
     * editor does, instead of letting them drift away.
     *
     * @param {string} source - the file's text.
     * @param {string} lang - lowercased language id for the scanner.
     * @returns {Array} the rendered editor body.
     */
    function renderCode(source, lang) {
      const lines = String(source).replace(/\r\n?/g, '\n').split('\n');
      while (lines.length > 1 && lines[lines.length - 1].trim() === '') lines.pop();
      const rows = [];
      for (let index = 0; index < lines.length; index += 1) {
        const spans = tokenizeLine(lines[index], lang);
        rows.push(h('div', { key: `l${index}`, className: cx('artifact-space-codeLine') }, [
          h('span', { key: 'n', className: cx('artifact-space-codeLineNumber'), 'aria-hidden': true }, String(index + 1)),
          h('span', { key: 'c', className: cx('artifact-space-codeLineContent') },
            spans.length === 0
              ? h('span', { className: cx('artifact-space-codePlain') }, ' ')
              : spans.map((span, spanIndex) => h('span', { key: `s${spanIndex}`, className: cx('artifact-space-codeToken') }, [
                h('span', { className: cx('artifact-space-codeRole'), style: { color: span.role } }, span.text),
              ])),
          ),
        ]));
      }
      return h('div', { className: cx('artifact-space-code') }, rows);
    }

    /**
     * Map a file extension onto a scanner language id.
     *
     * Anything the scanner does not know falls back to 'text', which simply
     * renders the source without colour.
     *
     * @param {object} artifact - the artifact row.
     * @returns {string} a language id for {@link tokenizeLine}.
     */
    function detectLanguage(artifact) {
      const ext = (typeof artifact?.extension === 'string' && artifact.extension !== ''
        ? artifact.extension
        : extensionOfName(artifact?.name)).replace(/^\./, '').toLowerCase();
      if (ext === 'js' || ext === 'mjs' || ext === 'cjs' || ext === 'jsx') return 'js';
      if (ext === 'ts' || ext === 'mts' || ext === 'cts' || ext === 'tsx') return 'ts';
      if (ext === 'py' || ext === 'pyw') return 'py';
      if (ext === 'json' || ext === 'jsonc' || ext === 'json5') return 'json';
      if (ext === 'yml' || ext === 'yaml') return 'yaml';
      if (ext === 'sh' || ext === 'bash' || ext === 'zsh') return 'sh';
      if (ext === 'css' || ext === 'scss' || ext === 'less') return 'css';
      if (ext === 'html' || ext === 'htm') return 'html';
      return 'text';
    }

    /**
     * Render a file's text in the format its extension asks for.
     *
     * Every format falls back to the plain text body, so an unknown or
     * malformed document still shows its content instead of an error.
     */
    function renderPreviewBody(artifact, text) {
      switch (detectFormat(artifact)) {
        case 'markdown':
          return h('div', { key: 'body', className: cx('artifact-space-previewBody', 'artifact-space-previewRich') }, renderMarkdown(text));
        // An HTML document never reaches here: the preview pane serves it from
        // the HTML route instead. A `srcDoc` frame has no base URL, so the
        // relative pictures in such a document would all come out broken.
        case 'yaml':
        case 'json':
          return h('div', { key: 'body', className: cx('artifact-space-previewBody') }, renderCode(text, detectLanguage(artifact)));
        default:
          return h('div', { key: 'body', className: cx('artifact-space-previewBody') }, renderCode(text, detectLanguage(artifact)));
      }
    }

    /* ── Plugin ────────────────────────────────────────────────────────── */

    return {
      inject: ['slots', 'locale'],
      apply(ctx) {
        ctx.effect(() => ctx.locale.register(NS, { zh, en }), 'artifact-space: dictionaries');

        // Both stores live on the registration, so unloading the plugin cancels
        // every read still in flight and no stale response can publish.
        const stores = createRowsStore();
        const preview = createPreviewStore();
        // The favorites store outlives the panel: it is created once with the
        // plugin, so the starred artifacts are shared by every view and
        // survive the panel being closed and reopened.
        const favorites = createFavoritesStore();
        ctx.effect(() => async () => {
          await Promise.all([stores.dispose(), preview.dispose()]);
        }, 'artifact-space: stores');

        const injectFace = () => ({ rows: stores, preview, favorites });

        // The sidebar entry and the central panel it opens share one id.
        ctx.slots.inject('sidebar.panellist', () => ctx.slots.register({
          name: 'sidebar.panellist',
          id: PANEL_ID,
          order: 20,
          locale: NS,
          label: () => ctx.locale.bind(NS)('panel'),
        }, function ArtifactSpacePanelGlyph({ size, active }) {
          return h('svg', {
            viewBox: '0 0 64 64',
            width: size,
            height: size,
            'aria-hidden': true,
            style: { display: 'block', color: active ? 'var(--dsw-alias-brand-primary)' : 'currentColor' },
          }, [
            h('rect', {
              key: 'frame',
              x: 6, y: 14, width: 52, height: 38, rx: 6,
              fill: 'none', stroke: 'currentColor', strokeWidth: 3,
            }),
            h('path', {
              key: 'lines',
              d: 'M18 28h28M18 38h20',
              fill: 'none', stroke: 'currentColor', strokeWidth: 3, strokeLinecap: 'round',
            }),
            h('circle', { key: 'dot', cx: 46, cy: 20, r: 6, fill: 'currentColor' }),
          ]);
        }));

        ctx.slots.inject('main', () => ctx.slots.register({
          name: 'main',
          key: PANEL_ID,
          locale: NS,
          inject: injectFace,
        }, ArtifactSpacePage));
      },
    };
  },
});




