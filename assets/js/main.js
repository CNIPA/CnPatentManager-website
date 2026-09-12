/* ==========================================================================
   中国专利管理大师 · 站点交互
   无依赖、无构建：主题 / 强调色 / 导航 / 滚动入场 / 代码复制
   ========================================================================== */
(function () {
  'use strict';

  var root = document.documentElement;
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) { /* 忽略 */ } }
  };

  /* ---------- 深浅色 ---------- */
  var themeBtn = document.getElementById('themeToggle');
  function setTheme(next) {
    root.setAttribute('data-theme', next);
    root.style.colorScheme = next;
    store.set('cpm-theme', next);
    if (themeBtn) {
      themeBtn.setAttribute('aria-label', next === 'dark' ? '切换到浅色主题' : '切换到深色主题');
    }
  }
  function currentTheme() { return root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'; }
  if (themeBtn) {
    setTheme(currentTheme());
    themeBtn.addEventListener('click', function () {
      setTheme(currentTheme() === 'dark' ? 'light' : 'dark');
    });
  }
  // 用户未手动选择时，跟随系统主题变化
  if (window.matchMedia) {
    var mq = window.matchMedia('(prefers-color-scheme: dark)');
    var onSystemChange = function (e) {
      if (!store.get('cpm-theme')) setTheme(e.matches ? 'dark' : 'light');
    };
    if (mq.addEventListener) mq.addEventListener('change', onSystemChange);
    else if (mq.addListener) mq.addListener(onSystemChange);
  }

  /* ---------- 强调色 ---------- */
  var dots = Array.prototype.slice.call(document.querySelectorAll('.accent-dot'));
  function setAccent(next) {
    root.setAttribute('data-accent', next);
    store.set('cpm-accent', next);
    dots.forEach(function (d) {
      d.setAttribute('aria-pressed', d.getAttribute('data-accent-value') === next ? 'true' : 'false');
    });
  }
  if (dots.length) {
    setAccent(root.getAttribute('data-accent') || 'blue');
    dots.forEach(function (d) {
      d.addEventListener('click', function () { setAccent(d.getAttribute('data-accent-value')); });
    });
  }

  /* ---------- 导航 ---------- */
  var nav = document.getElementById('nav');
  if (nav) {
    var onScroll = function () {
      nav.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    var toggle = document.getElementById('navToggle');
    if (toggle) {
      toggle.addEventListener('click', function (e) {
        e.stopPropagation();
        nav.classList.toggle('is-open');
      });
    }
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) nav.classList.remove('is-open');
    });
    document.addEventListener('click', function (e) {
      if (!nav.contains(e.target)) nav.classList.remove('is-open');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') nav.classList.remove('is-open');
    });
  }

  /* ---------- 当前页高亮 ---------- */
  var here = location.pathname.split('/').pop() || 'index.html';
  Array.prototype.forEach.call(document.querySelectorAll('.nav-links a'), function (a) {
    var target = a.getAttribute('href');
    if (target === here) a.setAttribute('aria-current', 'page');
  });

  /* ---------- 滚动入场 ---------- */
  var reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    if (!('IntersectionObserver' in window)) {
      Array.prototype.forEach.call(reveals, function (el) { el.classList.add('is-in'); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            io.unobserve(entry.target);
          }
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0 });
      Array.prototype.forEach.call(reveals, function (el) { io.observe(el); });
    }
  }

  /* ---------- 代码块复制 ---------- */
  Array.prototype.forEach.call(document.querySelectorAll('[data-copy]'), function (btn) {
    btn.addEventListener('click', function () {
      var box = btn.closest('.code-wrap') || btn.parentElement;
      var code = box ? box.querySelector('code') : null;
      if (!code) return;
      var text = code.innerText;
      var done = function () {
        var old = btn.textContent;
        btn.textContent = '已复制';
        setTimeout(function () { btn.textContent = old; }, 1600);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, function () { /* 忽略 */ });
      } else {
        var ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); done(); } catch (e) { /* 忽略 */ }
        document.body.removeChild(ta);
      }
    });
  });

  /* ---------- 页脚年份 ---------- */
  Array.prototype.forEach.call(document.querySelectorAll('[data-year]'), function (el) {
    el.textContent = String(new Date().getFullYear());
  });
})();
