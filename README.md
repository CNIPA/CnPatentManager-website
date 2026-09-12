# 中国专利管理大师 · 产品官网

本仓库只存放**产品官网的静态页面**，通过 GitHub Pages 对外发布。
软件本身的源代码不在这里，也未公开。

- 线上地址：https://cnipa.github.io/CnPatentManager-Website/
- 站点为纯静态文件：无构建步骤、无依赖、无 CDN，克隆下来直接打开即可。
- 仓库名是「产品名 + Website」，与软件真实名称 `CnPatentManager` 区分开 ——
  这里公开的只是官网页面，不是程序本身。

## 目录

```
├─ index.html        首页
├─ features.html     功能详解
├─ guide.html        使用指南
├─ download.html     下载与运行要求
├─ .nojekyll         关闭 Jekyll 处理（保证 assets/ 等目录原样发布）
└─ assets/
   ├─ css/style.css  设计系统：设计令牌 + 组件 + 响应式 + 深色主题
   ├─ js/            主题预置与页面交互
   └─ img/           logo
```

## 本地预览

直接双击 `index.html` 即可（`file://` 下功能正常）。

## 怎么更新网站

**不要直接改这个仓库。** 页面内容的源在主仓库的 `website/` 目录里。
在源仓库改完之后，到主仓库运行同步脚本，它会复刻文件、显示差异、提交并推送：

```powershell
pwsh -File Tools\DeployWebsite\sync-from-main.ps1
```

推送后 GitHub Pages 会在约 1 分钟内自动重新发布。

## 自定义域名

拿到域名之后再说，不做也不影响访问：

1. 仓库 Settings → Pages → Custom domain 填入域名；
2. 域名侧加 CNAME 记录指向 `cnipa.github.io`；
3. 勾选 Enforce HTTPS。

若将来要换成国内对象存储托管、让国内访问更稳，另需 ICP 备案。
