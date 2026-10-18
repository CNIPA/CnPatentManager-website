/* ==========================================================================
   中国专利管理大师 · 版本信息
   页面上的版本号 / 安装包大小 / 更新日期统一取自 version.json：
   发版时只改 version.json（version / size / releasedAt / notes）与内容段落，
   各页面的徽标、页脚、下载行会自动跟上。
   HTML 里仍写着最近一次发版的值作为兜底：JS 被禁用、断网或本地 file:// 打开时显示它。
   ========================================================================== */
(function () {
  'use strict';

  function baseUrl() {
    var script = document.currentScript;
    if (!script) {
      var scripts = document.getElementsByTagName('script');
      script = scripts[scripts.length - 1];
    }
    if (script && script.src) {
      return script.src.replace(/assets\/js\/version\.js(\?.*)?$/, '');
    }
    return '';
  }

  function formatSize(bytes) {
    if (typeof bytes !== 'number' || !isFinite(bytes) || bytes <= 0) return '';
    return (bytes / 1048576).toFixed(1) + ' MB';
  }

  function apply(data) {
    if (!data || !data.version) return;

    var version = String(data.version);
    var size = formatSize(data.size);

    document.querySelectorAll('[data-version]').forEach(function (el) {
      el.textContent = 'v' + version;
    });

    document.querySelectorAll('[data-download-meta]').forEach(function (el) {
      var parts = ['版本 ' + version, 'Setup_CnPatentManager.exe'];
      if (size) parts.push(size);
      if (data.releasedAt) parts.push('最近更新 ' + data.releasedAt);
      el.textContent = parts.join(' · ');
    });

    document.querySelectorAll('[data-hero-meta]').forEach(function (el) {
      var parts = ['版本 ' + version];
      if (size) parts.push(size);
      el.textContent = parts.join(' · ');
    });
  }

  function load() {
    if (typeof fetch !== 'function') return Promise.resolve(null);
    return fetch(baseUrl() + 'version.json?ts=' + Date.now(), { cache: 'no-store' })
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.json();
      });
  }

  try {
    load().then(apply).catch(function () {
      /* 保持 HTML 里的静态兜底值 */
    });
  } catch (e) {
    /* 同上 */
  }
})();
