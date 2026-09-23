// 字級調整、深淺色切換、檢查清單勾選記憶（僅存在本機瀏覽器）
(function () {
  "use strict";
  var root = document.documentElement;
  var KEY_FS = "ctej-font-size";
  var KEY_THEME = "ctej-theme";
  var KEY_CHECK = "ctej-checks";
  var MIN = 16, MAX = 28, STEP = 2;

  function load(key) { try { return localStorage.getItem(key); } catch (e) { return null; } }
  function save(key, val) { try { localStorage.setItem(key, val); } catch (e) { /* 無痕模式等情況忽略 */ } }

  // 字級
  function currentFs() {
    var v = parseInt(getComputedStyle(root).getPropertyValue("--fs"), 10);
    return isNaN(v) ? 20 : v;
  }
  function setFs(px) {
    px = Math.max(MIN, Math.min(MAX, px));
    root.style.setProperty("--fs", px + "px");
    save(KEY_FS, String(px));
  }
  var savedFs = parseInt(load(KEY_FS), 10);
  if (!isNaN(savedFs)) root.style.setProperty("--fs", savedFs + "px");

  // 主題
  var savedTheme = load(KEY_THEME);
  if (savedTheme === "light" || savedTheme === "dark") root.setAttribute("data-theme", savedTheme);

  document.addEventListener("DOMContentLoaded", function () {
    var up = document.getElementById("fs-up");
    var down = document.getElementById("fs-down");
    var theme = document.getElementById("theme");
    if (up) up.addEventListener("click", function () { setFs(currentFs() + STEP); });
    if (down) down.addEventListener("click", function () { setFs(currentFs() - STEP); });
    if (theme) theme.addEventListener("click", function () {
      var isDark = root.getAttribute("data-theme") === "dark" ||
        (!root.getAttribute("data-theme") && window.matchMedia("(prefers-color-scheme: dark)").matches);
      var next = isDark ? "light" : "dark";
      root.setAttribute("data-theme", next);
      save(KEY_THEME, next);
    });

    // 檢查清單
    var state = {};
    try { state = JSON.parse(load(KEY_CHECK) || "{}") || {}; } catch (e) { state = {}; }
    var boxes = document.querySelectorAll(".checklist input[type=checkbox][data-id]");
    boxes.forEach(function (cb) {
      if (state[cb.dataset.id]) cb.checked = true;
      cb.addEventListener("change", function () {
        state[cb.dataset.id] = cb.checked;
        save(KEY_CHECK, JSON.stringify(state));
      });
    });
    var reset = document.getElementById("reset-checks");
    if (reset) reset.addEventListener("click", function () {
      boxes.forEach(function (cb) { cb.checked = false; });
      state = {};
      save(KEY_CHECK, "{}");
    });
  });
})();
