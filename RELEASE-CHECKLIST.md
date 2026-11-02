# 发布检查报告 — Artifact Space 1.0.0

生成时间：2026-11-01
发布目录：`D:\Users\24169\WorkBuddy\2026-10-22-23-21-16\artifact-space-publish`

---

## 一、代码就绪状态

| 项 | 状态 | 说明 |
| --- | --- | --- |
| 语法 | ✅ | `node --check` 通过 |
| prop 一致性 | ✅ | 4 个组件的调用处 prop 全部完整 |
| 渲染冒烟 | ✅ | 16 个场景，含"故意漏传 prop 必须报错"的回归用例 |
| 折叠逻辑 | ✅ | 自动折叠、手动覆盖、面板缩放、测量前全展开 |
| 搜索逻辑 | ✅ | 三级匹配、高亮、多词 OR 语义 |
| 收藏夹 | ✅ | 19 项，含"取消收藏后磁盘归零""重启后不复活" |
| 复制功能 | ✅ | 10 项，含"完全不可用时不谎报成功" |
| 发布包 | ✅ | `npm pack` 演练通过，14 个文件 |
| README 双语 | ✅ | 默认中文、英文附属，章节一一对应，配对记录未过期 |

**总计 9 关卡全绿。**

---

## 二、规范符合性（依据 `app.asar` 内权威源码查证，非猜测）

### 兼容性判定

宿主 `dsh-app-boot` 的 `unmetRequirements` 逻辑：
- `engines.dsh` 存在时**它决定一切**，`peerDependencies` 被忽略。
- 运行时版本 = 宿主 `app-boot/package.json` 的 `version`。
  ⚠️ **不同机器上的 DSH 版本可能不同** —— 门槛按打包者本机版本定，会挡住别人。

**门槛由 `check-min-version-full.mjs` 逐版本实测得出**，不是估计的。每个候选版本下载其宿主包，
验证三件事：

1. **宿主 API** —— `readTitleSnapshots`、`readSession`、`list`、`stat`、`contains`、`resolve`、`read`
2. **客户端 slot** —— `sidebar.panellist`（侧栏入口）、`main`（主面板）
3. **客户端插件机制** —— `dsh.client.inject`、`platform`、`__ModuleLoader__`

实测结果：

| 范围 | 判定 |
| --- | --- |
| **`>=0.1.5-alpha.2`（本插件采用）** | ✅ 覆盖 0.1.5-alpha.2 起至 1.0.0 的全部版本 |
| `>=0.1.5-alpha.1` | ❌ 客户端包缺 `sidebar.panellist`，无法注册侧栏入口 |
| `>=0.1.2` | ❌ `dsh-api-workspace-files` 包不存在，`dsh-client-ui-sidebar` 缺 slot |

> **踩坑记录（三次）**
>
> 1. 初判 `^0.2.1-alpha.2` 是"阻塞问题"，实测 semver 后发现**它实际兼容**（同 minor 内 prerelease 都满足）。
> 2. 初版门槛 `>=0.2.1-rc.4` —— 那是**打包者本机**的版本。
>    在 DSH 0.2.1-rc.3 的机器上被直接拒绝。
> 3. 下调到 `>=0.2.1-rc.3` 后仍嫌保守，继续下调 —— 最终由逐版本实测得出 `>=0.1.5-alpha.2`。
>
> **教训：`engines.dsh` 必须按插件真正需要的最低版本定，不能按本机版本定，也不能凭感觉下调。**
> `verify-publish.mjs` 会拿实测清单逐一验证覆盖范围，并要求拒绝未验证的旧版本。

### 市场索引格式（`dsh-plugin-market-index`）

| 规则 | 本插件 |
| --- | --- |
| `name` 必须是合法 npm 包名（`PACKAGE_NAME` 正则，≤214 字符） | ✅ `@dushuai/artifact-space` |
| 不得占用 `@deepseek-ai/` 官方 scope | ✅ 未占用 |
| `version` 必须是精确 SemVer | ✅ `1.0.0` |
| `icon` 须为合法 SVG/PNG/JPEG/WebP（内联 ≤32 KiB） | ✅ `./icon.svg`，306 B |
| `localizedText` 必须含 `en` | ✅ 中英双份 locale |
| `publishConfig.access` | ✅ `public` |

### 插件包样板（对照官方 `dsh-experimental-plugin-market-bundle`）

| 字段 | 状态 |
| --- | --- |
| `name` / `version` / `description` / `license` | ✅ |
| `type: module` | ✅ |
| `icon` | ✅ |
| `publishConfig.access: public` | ✅ |
| `exports` | ✅ 含 `./client`、`./locale/*.json`、`./icon` |
| `files` 白名单 | ✅ 11 个文件 |
| `dsh.bundle.patch` | ✅ `./cordis.patch.yml` |
| `dsh.client.platform` + `inject` | ✅ `web` + 4 项 |
| `peerDependencies` + `peerDependenciesMeta` | ✅ 全部 optional |
| `engines.dsh` | ✅ `>=0.1.5-alpha.2` |

---

## 三、依赖与隐私审计

- ✅ **零宿主私有 API**：只用 `ctx.connection.fetch`（公开路由注册）与 `ctx.slots` / `ctx.locale`（公开服务）
- ✅ **零第三方运行时依赖**：`peerDependencies` 全部 `optional: true`，插件不打包任何依赖
- ✅ **无自建网络请求**：不主动发起任何对外请求
- ✅ **持久化只用 `localStorage`**：宿主自己的 `dsh-client-store`、`dsh-client-shortcuts` 等客户端插件均采用同一方式
- ✅ **收藏取消即物理删除**：每个收藏独立存储键 `artifactSpace.favorite.v1.<sessionId>\0<path>`，`removeItem` 删除，不留无头文件
- ✅ **清空全部**：收藏夹头部提供"清空"入口（二次确认），同步删除全部存储键
- ✅ **不自动清理失效收藏**：宿主在会话日志不可读/待迁移时会丢弃整行，"列表里没有"不等于"文件已删除"，自动清扫会误删用户数据

---

## 四、仓库与交付物

**默认语言：中文。** `README.md` 与 `CHANGELOG.md` 是中文版（GitHub / npm 默认展示的那一份），英文版作为附属放在 `README.en.md` / `CHANGELOG.en.md`。

```
artifact-space-publish/
├── .gitattributes        # 统一 LF，避免跨平台 diff 噪声
├── .gitignore
├── CHANGELOG.md          # 中文版（默认）
├── CHANGELOG.en.md       # 英文版（附属）
├── LICENSE               # MIT
├── README.md             # 中文版（默认）：功能表 + 安装 + 隐私说明
├── README.en.md          # 英文版（附属）
├── README.i18n.yaml      # 双语配对一致性记录（每节中/英内容哈希）
├── client.js             # 浏览器半
├── cordis.patch.yml      # 加载补丁
├── docs/
│   └── screenshot-panel.png   # README 主展示图
├── icon.svg
├── index.js              # 宿主半
├── locale/{zh,en}.json
└── package.json
```

Git 仓库已初始化，7 次提交。

### 双语文档规范（对照官方 `dsh-experimental-plugin-market-bundle`）

官方包采用三件套模式，本插件照搬并按「默认中文」调整了主次：

| 文件 | 作用 |
| --- | --- |
| `README.md` | **中文版（默认展示）**，含 frontmatter（`description` + `kind: package-bundle`），顶部 `中文 | [English](README.en.md)` |
| `README.en.md` | 英文版（附属），顶部 `[中文](README.md) | English` |
| `README.i18n.yaml` | 双语配对一致性记录：按章节记录中文与英文内容的哈希 |

> 宿主源码中对 `README.zh.md` **零引用** —— 那个文件名只是官方仓库自己的约定，不影响市场渲染。改用 `README.en.md` 是为了满足「默认中文」：GitHub 与 npm 都默认渲染 `README.md`。

配套校验 `verify-readme-i18n.mjs`（第 9 关卡）检查：
- `README.md` 确实是中文版、`README.en.md` 确实是英文版
- 两版互链存在，且**都不再引用 `README.zh.md`**
- frontmatter 齐全、`kind` 一致、中文版 description 为中文
- **章节数量与层级一一对应**
- 围栏代码块数量、表格行数一致
- 关键引用（截图路径、LICENSE、收藏存储键前缀、路由注册方式、交付事件、DSH 版本要求）两版都有
- **`README.i18n.yaml` 未过期**（生成到临时文件再比对，不覆盖原文件）
- **CHANGELOG 双语**：两版互链存在，版本条目完全一致

> 注意：`files` 白名单**优先于** `.npmignore`，所以仅靠 `.npmignore` 排除不掉文件。本插件按官方惯例把 `README.i18n.yaml` 一并打包。

---

## 五、剩余待办（需要军哥操作）

### 阻塞发布的两项

1. **npm 登录**：当前 `npm whoami` 报 `ENEEDAUTH`。发布前需执行 `npm login`。
2. **GitHub 仓库 + `gh` CLI**：`gh` 未安装。需安装后创建远端仓库并推送：
   ```bash
   gh repo create artifact-space --public --source=. --remote=origin --push
   ```
   仓库地址确定后，把 `repository` 字段补进 `package.json`（市场索引会展示它）。

### 发布命令（前置完成后）

```bash
cd artifact-space-publish
npm publish --access public
```

### 发布到市场索引

市场索引是**独立的 JSON 文件**（format 1），需要单独发布并配置到 Settings → Plugins 的索引源。条目形如：

```json
{
  "plugins": [{
    "name": "@dushuai/artifact-space",
    "title": { "en": "Artifact Space", "zh": "产物空间" },
    "description": { "en": "...", "zh": "..." },
    "icon": "https://…/icon.svg",
    "versions": [{
      "version": "1.0.0",
      "publishTimestamp": 1793000000,
      "source": { "type": "npm" },
      "engines": { "dsh": ">=0.1.5-alpha.2" }
    }]
  }]
}
```

---

## 六、后续功能排期（不阻塞本次发布）

| 优先级 | 功能 |
| --- | --- |
| P1 | 多维度排序（按大小 / 名称）、类型筛选（代码 / 文档 / 图片） |
| P1 | 键盘导航（↑↓ 切换产物、Enter 打开、Esc 关闭）、预览上下个 |
| P1 | 收藏导入导出（跨设备）、首启引导 |
| P2 | 超大文件分页预览（现 512 KB / 4000 行直接拒绝） |
| P2 | 产物变更检测（文件被外部修改后提示刷新） |
