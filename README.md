# 中国专利管理大师 · 产品官网

本仓库存放**产品官网的静态页面与安装包**，通过 GitHub Pages 对外发布。
软件本身的源代码不在这里，也未公开。

- 线上地址：<https://cnpatentmanager.cn/>（GitHub Pages + 自定义域名）
- 站点为纯静态文件：无构建步骤、无依赖、无 CDN，克隆下来直接打开即可。
- 仓库名以项目名开头，作用域明确：这里公开的只是**本项目的官网页面**，
  不代表 CNIPA 账号的官网；软件程序的源代码不在这里，也未公开。

## 目录

```
├─ index.html        首页
├─ features.html     功能详解
├─ guide.html        使用指南
├─ download.html     下载与运行要求
├─ downloads/        安装包（Setup_CnPatentManager.exe，全机器唯一一份）
├─ .nojekyll         关闭 Jekyll 处理（保证 assets/ 等目录原样发布）
└─ assets/
   ├─ css/style.css  设计系统：设计令牌 + 组件 + 响应式 + 深色主题
   ├─ js/            主题预置与页面交互
   └─ img/           logo
```

## 本地预览

直接双击 `index.html` 即可（`file://` 下功能正常）。

## 怎么更新网站

**页面直接在这个仓库里改**，改完提交推送即可，GitHub Pages 约 1 分钟自动重新发布：

```powershell
git add <改过的页面>
git commit -m "<改了什么>"
git push
```

安装包**不在**这里编译：它在主仓库 `CnPatentManager` 的 `installer/` 里构建
（`dotnet publish` + `ISCC.exe installer\install.iss`），`install.iss` 的 `OutputDir`
指向本仓库的 `downloads/`，所以编译完的安装包会直接落在这里，再连同页面一起提交推送。
发版要同步的版本/大小/日期信息见主仓库的 `installer/README.md`。

## 自定义域名

已启用 <https://cnpatentmanager.cn>（仓库里有 `CNAME` 文件，DNS 已指向 GitHub Pages，
已在仓库 Settings → Pages 勾选 Enforce HTTPS）。

若将来要换成国内对象存储托管、让国内访问更稳，另需 ICP 备案。
