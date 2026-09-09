// Vite entry point: create the app instance, initialize UI/i18n/history, then start the canvas render loop.
import "./styles/main.css";

var assetBaseUrl = import.meta.env.BASE_URL || "/";
document.documentElement.style.setProperty("--cjr-achievement-bg", 'url("' + assetBaseUrl + 'img/achievement.png")');
document.documentElement.style.setProperty("--cjr-medals-bg", 'url("' + assetBaseUrl + 'img/medals.png")');

import { themeChange } from "theme-change";

import { createApp } from "./codingjr/app.js";

import { initCanvasView } from "./codingjr/codingjr.view.canvas.js";
import { initI18n } from "./codingjr/codingjr.view.canvas.ui.translate.js";
import { initDialogs } from "./codingjr/codingjr.view.canvas.ui.dialogs.js";
import { initHistory } from "./codingjr/codingjr.view.canvas.ui.history.js";

function runWhenDomReady(fn) {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", fn, { once: true });
  } else {
    fn();
  }
}

function initThemeController() {
  var savedTheme = localStorage.getItem("theme") || "codingjr";
  document.documentElement.setAttribute("data-theme", savedTheme);

  var themeSelects = document.querySelectorAll("select[data-choose-theme]");
  themeSelects.forEach(function (select) {
    if (select.querySelector('option[value="' + savedTheme + '"]')) {
      select.value = savedTheme;
    }
    select.addEventListener("change", function () {
      var nextTheme = this.value || "codingjr";
      document.documentElement.setAttribute("data-theme", nextTheme);
      try {
        localStorage.setItem("theme", nextTheme);
      } catch (e) {}
      themeSelects.forEach(function (s) {
        if (s !== select && s.querySelector('option[value="' + nextTheme + '"]')) {
          s.value = nextTheme;
        }
      });
    });
  });

  themeChange(false);
}

function initSettingsPopover() {
  var dropdown = document.getElementById("settingsDropdown");
  var btn = document.getElementById("settingsDropdownBtn");
  if (!dropdown || !btn) return;

  btn.addEventListener("click", function (e) {
    e.stopPropagation();
    dropdown.classList.toggle("dropdown-open");
  });

  var content = dropdown.querySelector(".dropdown-content");
  if (content) {
    content.addEventListener("click", function (e) {
      e.stopPropagation();
    });
  }

  document.addEventListener("click", function (e) {
    if (!dropdown.contains(e.target)) {
      dropdown.classList.remove("dropdown-open");
    }
  });
}

async function boot() {
  // `createApp()` is the composition root: it wires together all models + UI + rendering extensions.
  var app = createApp();
  initThemeController();
  initSettingsPopover();

  // Hook up DOM elements and event handlers once the document is ready.
  if (app.ui && app.ui.media && typeof app.ui.media.init === "function") app.ui.media.init();
  initDialogs({ ui: app.ui, achievements: app.achievements });

  // Apply translations before we initialize UI controls that use i18next.t().
  await initI18n();

  app.ui.editor.initEditor();
  app.ui.initButtons();
  app.ui.initSlider();

  // Start the render/update loop and then apply the initial route.
  initCanvasView(app);
  initHistory(app);
}

runWhenDomReady(function () {
  boot().catch(function (e) {
    console.error("CodingJr boot failed:", e);
  });
});
