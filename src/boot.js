import { themeChange } from "theme-change";

import { createApp } from "./codingjr/app.js";

import { initCanvasView } from "./codingjr/codingjr.view.canvas.js";
import { initI18n } from "./codingjr/codingjr.view.canvas.ui.translate.js";
import { initDialogs } from "./codingjr/codingjr.view.canvas.ui.dialogs.js";
import { initHistory } from "./codingjr/codingjr.view.canvas.ui.history.js";

function initThemeController(abortSignal) {
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
    }, { signal: abortSignal });
  });

  themeChange(false);
}

function initSettingsPopover(abortSignal) {
  var dropdowns = document.querySelectorAll(".dropdown");
  dropdowns.forEach(function (dropdown) {
    var btn = dropdown.querySelector(":scope > button, :scope > [tabindex='0']");
    if (!btn) return;

    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      var wasOpen = dropdown.classList.contains("dropdown-open");
      dropdowns.forEach(function (d) {
        d.classList.remove("dropdown-open");
      });
      if (!wasOpen) {
        dropdown.classList.add("dropdown-open");
      }
    }, { signal: abortSignal });

    var content = dropdown.querySelector(".dropdown-content");
    if (content) {
      content.addEventListener("click", function (e) {
        e.stopPropagation();
      }, { signal: abortSignal });
    }
  });

  document.addEventListener("click", function (e) {
    dropdowns.forEach(function (dropdown) {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove("dropdown-open");
      }
    });
  }, { signal: abortSignal });
}

export async function bootApp() {
  var abortController = new AbortController();
  var signal = abortController.signal;

  // Set sprite sheet css variables on document element
  document.documentElement.style.setProperty("--cjr-achievement-bg", 'url("/img/achievement.png")');
  document.documentElement.style.setProperty("--cjr-medals-bg", 'url("/img/medals.png")');

  var app = createApp();
  initThemeController(signal);
  initSettingsPopover(signal);

  if (app.ui && app.ui.media && typeof app.ui.media.init === "function") {
    app.ui.media.init();
  }
  initDialogs({ ui: app.ui, achievements: app.achievements, signal: signal });

  await initI18n();

  app.ui.editor.initEditor({ signal: signal });
  app.ui.initButtons({ signal: signal });
  app.ui.initSlider({ signal: signal });

  var renderLoop = initCanvasView(app);
  initHistory(app);

  return function cleanup() {
    abortController.abort();
    if (renderLoop && typeof renderLoop.stop === "function") {
      renderLoop.stop();
    }
    if (app.ui && app.ui.editor && typeof app.ui.editor.destroy === "function") {
      app.ui.editor.destroy();
    }
    if (app.ui && app.ui.History && typeof app.ui.History.destroy === "function") {
      app.ui.History.destroy();
    }
    if (app.ui && app.ui.media && typeof app.ui.media.destroy === "function") {
      app.ui.media.destroy();
    }
  };
}
