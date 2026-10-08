# 肯の基机场介绍与注册指南 (kendeji.rest)

本站点为「肯の基机场」落地页与知识库静态网站，采用 Astro 纯静态输出（SSG）架构构建。构建产物直接输出纯静态 HTML/CSS/JS 文件，正文、导航与文章内链在 HTML 源码中直接完整呈现，无需服务端运行时，可直接部署于 Cloudflare Pages、Vercel、GitHub Pages、Nginx 或各类静态对象存储。

---

## 一、基础资料与定位

- **网站名称**：肯の基机场
- **正式域名**：`https://kendeji.rest`
- **推广注册链接**：`https://varnexa.lingdongaff.com/#/?code=HHoxxHGa`
- **站点定位**：“肯の基机场介绍与注册指南”（未经确认，不标注为服务商官方授权网站）
- **核心职能**：品牌介绍、套餐查询、注册指引、客户端教学及连接问题排查
- **视觉风格**：现代通透浅灰白背景（#F8FAFC / #FFFFFF）、暖橙色重点按钮（#EA580C / #F97316）、高可读性中文排版，完美适配 360px ~ 1440px 全端屏幕。

---

## 二、核准套餐价格一览表

套餐数据统一存储于 `src/data/packages.js`，全系月付并按月重置流量配额：

| 套餐名称 | 月付价格 | 每月流量 | 流量重置周期 | 计费方式 | 适用场景说明 |
|---|---:|---:|---|---|---|
| **经典OK单人餐** | ¥30/月 | 100GB/月 | 每月重置 | 月付订阅 | 日常网页浏览、文字检索与基础出海学习 |
| **七虾堡双人餐** | ¥60/月 | 200GB/月 | 每月重置 | 月付订阅 | 进阶双人额度、常规流媒体与日常资讯查阅 |
| **大神卡专享流量堡** | ¥90/月 | 300GB/月 | 每月重置 | 月付订阅 | 较为频繁的远程办公、多媒体检索与学术资源访问 |
| **全家桶** | ¥150/月 | 500GB/月 | 每月重置 | 月付订阅 | 大容量流量池、多设备协同与高清媒体需求 |

---

## 三、文章清单与路由

网站生成 8 篇中文知识长文，每篇正文严格在 800–1500 字之间，具备独立语义化 URL、自引用 Canonical、SEO/GEO 元标签及结构化数据：

1. `/articles/cheap-airport/` - **便宜机场怎么选？套餐价格与流量成本**
   - 核心意图：单GB流量成本核算、计费周期与流量重置陷阱、低价妥协点与月付防坑法则。
2. `/articles/secure-airport/` - **安全机场如何判断？账户与订阅链接保护**
   - 核心意图：破除绝对匿名宣传迷信、Token防泄露保护、账户凭据安全及应急处置。
3. `/articles/airport-selection/` - **机场推荐怎么比较？按实际需求选择套餐**
   - 核心意图：穿透商业榜单局限、基于业务场景分类匹配套餐、月付验证策略。
4. `/articles/proxy-beginners/` - **科学上网新手指南：代理、订阅与魔法梯子**
   - 核心意图：代理节点/机场/订阅原理解析、规则智能分流机制与新手四步指引。
5. `/articles/stable-nodes/` - **稳定节点怎么选？延迟、丢包与拥堵排查**
   - 核心意图：延迟/带宽/丢包率核心差别、晚高峰拥堵成因、自动测速优选与容灾。
6. `/articles/clash-nodes/` - **Clash节点导入指南：配置格式与连接排查**
   - 核心意图：YAML配置结构、Mihomo内核协议兼容性、常见无法上网故障五步排查。
7. `/articles/clash-party/` - **Clash Party使用指南：兼容性、订阅与代理模式**
   - 核心意图：新一代GUI客户端特性、Rule/Global/Direct模式解析与TUN全局接管。
8. `/articles/global-connectivity/` - **翻墙出海与全球加速：常见问题及使用边界**
   - 核心意图：跨境电商/学术出海场景、IP频繁跳跃风控应对、MTU优化与合规边界。

---

## 四、项目技术架构与文件目录

```text
kendeji.rest/
├── dist/                      # 纯静态构建产物（直接部署到静态托管主机）
│   ├── index.html             # 首页（完整HTML，含全部套餐、指南、FAQ）
│   ├── 404.html               # 自定义 404 错误页
│   ├── sitemap.xml            # 搜索引擎站点地图（含9个页面）
│   ├── robots.txt             # 爬虫控制文件
│   ├── favicon.ico            # 浏览器图标
│   ├── favicon.svg            # 矢量图标
│   ├── _astro/                # 编译生成的轻量样式与资源
│   └── articles/              # 全部 8 篇正文静态目录
├── src/
│   ├── components/            # 组件库（Header、Footer、PackageCard、ArticleCard）
│   ├── data/                  # 集中数据层（packages、articles、faqs、checklist 等）
│   ├── layouts/
│   │   └── Layout.astro       # 页面基础骨架（Meta、SEO、GEO、JSON-LD）
│   └── pages/
│       ├── index.astro        # 落地页首页
│       ├── 404.astro          # 404页面
│       ├── sitemap.xml.js     # 动态生成 sitemap.xml 的构建端点
│       └── articles/
│           └── [slug].astro   # 文章动态路由静态化生成器
├── public/                    # 静态公用文件（robots.txt、favicon）
├── astro.config.mjs           # Astro 配置（output: static, trailingSlash: always）
├── package.json
└── verify-build.js            # 自动化全量质量校验脚本
```

---

## 五、部署操作说明

### 1. 本地开发与构建
```bash
# 开发调试
npm run dev

# 生产环境静态打包构建（输出至 dist 目录）
npm run build

# 本地静态预览
npm run preview

# 自动化测试与质量验收
npm test
```

### 2. 部署到 Cloudflare Pages
- **框架预设**：`Astro`
- **构建命令**：`npm run build`
- **构建输出目录**：`dist`
- **Node.js 版本**：`18+` 或 `20+`

### 3. 部署到 Vercel
直接导入仓库，Vercel 会自动识别 Astro 框架并完成构建发布。
