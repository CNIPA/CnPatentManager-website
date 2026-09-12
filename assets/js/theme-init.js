/* ==========================================================================
   主题 / 强调色 预置 —— 在 <head> 中以阻塞方式加载，避免首屏闪烁（FOUC）

   ★ 换风格就改下面两行常量，全站四个页面同时生效（无需逐个页面改）：
       DEFAULT_THEME   'auto'  跟随系统  |  'light' | 'dark'
       DEFAULT_ACCENT  'blue'  默认      |  'green' | 'orange' | 'ink'
     四个强调色的取色说明见 assets/css/style.css 的「强调色备选方案」一节。

   页面里的 <html data-theme data-accent> 是「脚本不可用」时的兜底值，
   建议与这里保持一致。用户手动切换过（localStorage）时以用户选择优先。
   ========================================================================== */
(function () {
  var DEFAULT_THEME = 'auto';
  var DEFAULT_ACCENT = 'blue';

  var THEMES = ['light', 'dark'];
  var ACCENTS = ['blue', 'green', 'orange', 'ink'];

  var root = document.documentElement;
  root.classList.add('js');

  var storedTheme = null;
  var storedAccent = null;
  try {
    storedTheme = localStorage.getItem('cpm-theme');
    storedAccent = localStorage.getItem('cpm-accent');
  } catch (e) { /* 隐私模式下 localStorage 不可用，忽略 */ }

  var theme = THEMES.indexOf(storedTheme) >= 0 ? storedTheme
            : THEMES.indexOf(DEFAULT_THEME) >= 0 ? DEFAULT_THEME
            : 'auto';

  if (theme === 'auto') {
    theme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark' : 'light';
  }

  var accent = ACCENTS.indexOf(storedAccent) >= 0 ? storedAccent : DEFAULT_ACCENT;
  if (ACCENTS.indexOf(accent) < 0) accent = 'blue';

  root.setAttribute('data-theme', theme);
  root.setAttribute('data-accent', accent);
  root.style.colorScheme = theme;
})();
