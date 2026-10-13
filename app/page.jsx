"use client";

import { useEffect } from "react";

export default function GamePage() {
  useEffect(() => {
    let cleanupFn = null;
    let isCancelled = false;

    import("../src/boot.js").then(({ bootApp }) => {
      if (isCancelled) return;
      bootApp().then((cleanup) => {
        if (isCancelled) {
          if (typeof cleanup === "function") cleanup();
        } else {
          cleanupFn = cleanup;
        }
      });
    });

    return () => {
      isCancelled = true;
      if (typeof cleanupFn === "function") {
        cleanupFn();
      }
    };
  }, []);

  return (
    <>
      <div id="audioContainer">
        <audio id="audioPlayer" preload="auto"></audio>
      </div>

      <div id="codingjr-app" className="relative w-[980px] h-[740px]">
        <div
          id="welcomeScreen"
          className="cjr-screen absolute top-5 inset-x-0 bottom-4 rounded-box shadow-xl overflow-hidden flex flex-col items-center justify-between py-6 px-4 select-none"
          style={{
            background:
              "linear-gradient(135deg, #fdfbf7 0%, #ffffff 45%, #ecf8fa 100%)",
          }}
        >
          {/* Background Corner Circuit SVG Ornaments */}
          <div className="absolute bottom-0 left-0 pointer-events-none opacity-40">
            <svg
              width="220"
              height="220"
              viewBox="0 0 220 220"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 180 H60 L100 140 H160 L190 110 V60"
                stroke="#7dd3fc"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle cx="190" cy="60" r="4" fill="#0284c7" />
              <path
                d="M0 140 H40 L70 110 H120 L150 80 V20"
                stroke="#bae6fd"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle cx="150" cy="20" r="4" fill="#38bdf8" />
              <path
                d="M0 210 H90 L130 170 H180"
                stroke="#94a3b8"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                strokeLinecap="round"
              />
              <circle cx="180" cy="170" r="3" fill="#94a3b8" />
            </svg>
          </div>

          <div className="absolute bottom-0 right-0 pointer-events-none opacity-40">
            <svg
              width="220"
              height="220"
              viewBox="0 0 220 220"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M220 180 H160 L120 140 H60 L30 110 V60"
                stroke="#7dd3fc"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle cx="30" cy="60" r="4" fill="#0284c7" />
              <path
                d="M220 140 H180 L150 110 H100 L70 80 V20"
                stroke="#bae6fd"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle cx="70" cy="20" r="4" fill="#38bdf8" />
              <path
                d="M220 210 H130 L90 170 H40"
                stroke="#94a3b8"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                strokeLinecap="round"
              />
              <circle cx="40" cy="170" r="3" fill="#94a3b8" />
            </svg>
          </div>

          {/* Top Logo */}
          <div className="mt-3 flex items-center justify-center">
            <img
              src="img/codingjr.webp"
              alt="CodingJr Logo"
              className="h-12 mb-4 md:h-14 w-auto max-w-[240px] object-contain drop-shadow-sm transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* Title & Subtitle */}
          <div className="text-center px-4 -mt-4">
            <h1
              className="text-2xl mt-4 md:text-4xl font-black text-slate-900 tracking-tight"
              data-i18n="welcomeScreen.title"
              suppressHydrationWarning
            >
              Welcome to the Lab
            </h1>
            <p
              className="text-sm md:text-base text-slate-600 mt-2 font-semibold"
              data-i18n="welcomeScreen.subtitle"
              suppressHydrationWarning
            >
              Learn logical thinking and programming with fun challenges.
            </p>
          </div>

          {/* Central Robot Graphic */}
          <div className="flex items-center justify-center my-auto py-2 w-full max-w-[580px]">
            <img
              src="img/robot.webp"
              alt="CodingJr Robot Mascot"
              className="w-full max-h-[250px] object-contain drop-shadow-md select-none pointer-events-none transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* Bottom Floating Navigation Dock / Capsule */}
          <div className="w-full flex justify-center pb-2 z-10">
            <div className="bg-slate-200/85 dark:bg-slate-800/90 backdrop-blur-md rounded-2xl p-2 px-3 shadow-xl border border-white/70 dark:border-slate-700/60 flex items-center justify-between gap-3 w-full max-w-[840px]">
              {/* GUIDES Button */}
              <button className="helpButton btn btn-ghost btn-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-white/60 dark:hover:bg-slate-700/60 rounded-xl px-3 gap-2 normal-case text-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="size-4 text-slate-700 dark:text-slate-200"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-8-5a.75.75 0 0 1 .75.75v.5a.75.75 0 0 1-1.5 0v-.5A.75.75 0 0 1 10 5Zm0 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM8 8a2 2 0 1 1 3.938.5c-.066.329-.35.65-.65.9-.344.286-.62.515-.71.722-.113.26-.078.47-.078.628a.75.75 0 0 1-1.5 0c0-.332.062-.714.288-1.077.21-.336.527-.6.82-.843.203-.17.392-.328.434-.492A.5.5 0 0 0 10 7.5a.5.5 0 0 0-.5.5.75.75 0 0 1-1.5 0A2 2 0 0 1 8 8Z"
                    clipRule="evenodd"
                  />
                </svg>
                <span data-i18n="welcomeScreen.guides" suppressHydrationWarning>
                  GUIDES
                </span>
              </button>

              {/* MY TRACKS Button */}
              <button className="achievementsButton btn btn-ghost btn-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-white/60 dark:hover:bg-slate-700/60 rounded-xl px-3 gap-2 normal-case text-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="size-4 text-slate-700 dark:text-slate-200"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                <span
                  data-i18n="welcomeScreen.myTracks"
                  suppressHydrationWarning
                >
                  MY TRACKS
                </span>
              </button>

              {/* START LAB SESSION Button */}
              <button className="levelSelectButton btn btn-sm bg-[#3b82f6] hover:bg-[#2563eb] text-white font-bold px-6 rounded-xl shadow-md border-0 gap-2 normal-case text-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-4"
                >
                  <path d="M8 5v14l11-7-11-7Z" />
                </svg>
                <span data-i18n="welcomeScreen.start" suppressHydrationWarning>
                  START LAB SESSION
                </span>
              </button>

              {/* LANGUAGE Dropdown */}
              <div
                id="languageDropdown"
                className="dropdown dropdown-top dropdown-end shrink-0"
              >
                <button
                  type="button"
                  id="languageDropdownBtn"
                  className="btn btn-ghost btn-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-white/60 dark:hover:bg-slate-700/60 rounded-xl px-2.5 gap-1.5 normal-case text-sm cursor-pointer min-w-0"
                  data-i18n-title="welcomeScreen.language"
                  suppressHydrationWarning
                  title="Language"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="size-4 shrink-0 text-slate-700 dark:text-slate-200"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM9.555 3.033A6.502 6.502 0 0 0 4.103 8h3.987a17.29 17.29 0 0 1 1.465-4.967ZM8.09 9.5H3.57a6.505 6.505 0 0 0 0 1h4.52c-.068-.328-.09-.66-.09-1Zm.16 2.5H4.103a6.502 6.502 0 0 0 5.452 4.967A17.288 17.288 0 0 1 8.25 12ZM9.59 10.5h.82c.046.68.14 1.348.277 2H9.313a15.82 15.82 0 0 1-.277-2Zm.82-1h-.82a15.82 15.82 0 0 1 .277-2h1.564c-.137.652-.231 1.32-.277 2Zm1.49 4.967c.602-.74 1.107-1.597 1.49-2.534h1.507a6.502 6.502 0 0 1-5.452 4.967ZM12.91 9.5h4.52a6.505 6.505 0 0 0 0-1h-4.52c.068.328.09.66.09 1Zm-.16-2.5h4.147a6.502 6.502 0 0 0-5.452-4.967A17.288 17.288 0 0 1 12.75 7ZM10.445 3.033c-.602.74-1.107 1.597-1.49 2.534H7.391a6.502 6.502 0 0 1 3.054-2.534Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span
                    id="currentLanguageLabel"
                    suppressHydrationWarning
                    className="text-xs font-semibold whitespace-nowrap truncate max-w-[80px]"
                  >
                    English
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="size-3 opacity-60 shrink-0"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <div
                  tabIndex={0}
                  className="dropdown-content menu p-3 shadow-2xl bg-base-100/95 backdrop-blur-md rounded-2xl w-48 border border-base-300 mb-2 space-y-2 z-50 overflow-hidden box-border"
                >
                  <div className="px-1 min-w-0">
                    <label
                      className="text-xs font-bold uppercase opacity-70 block mb-1 truncate"
                      data-i18n="welcomeScreen.language"
                      suppressHydrationWarning
                    >
                      Language
                    </label>
                    <select className="cjr-language-select select select-bordered select-xs w-full max-w-full font-medium truncate focus:outline-none focus:border-primary">
                      <option value="en">English</option>
                      <option value="de">Deutsch</option>
                      <option value="fr">Français</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* SETTINGS Dropdown */}
              <div
                id="settingsDropdown"
                className="dropdown dropdown-top dropdown-end shrink-0"
              >
                <button
                  type="button"
                  id="settingsDropdownBtn"
                  className="btn btn-ghost btn-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-white/60 dark:hover:bg-slate-700/60 rounded-xl px-2.5 gap-1.5 normal-case text-sm cursor-pointer min-w-0"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="size-4 shrink-0"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.84 1.804A1 1 0 0 1 8.82 1h2.36a1 1 0 0 1 .98.804l.331 1.652a6.993 6.993 0 0 1 1.929 1.115l1.598-.54a1 1 0 0 1 1.186.447l1.18 2.044a1 1 0 0 1-.205 1.251l-1.267 1.113a7.047 7.047 0 0 1 0 2.228l1.267 1.113a1 1 0 0 1 .206 1.25l-1.18 2.045a1 1 0 0 1-1.187.447l-1.598-.54a6.993 6.993 0 0 1-1.929 1.115l-.33 1.652a1 1 0 0 1-.98.804H8.82a1 1 0 0 1-.98-.804l-.331-1.652a6.993 6.993 0 0 1-1.929-1.115l-1.598.54a1 1 0 0 1-1.186-.447l-1.18-2.044a1 1 0 0 1 .205-1.251l1.267-1.114a7.05 7.05 0 0 1 0-2.227L1.821 7.773a1 1 0 0 1-.206-1.25l1.18-2.045a1 1 0 0 1 1.187-.447l1.598.54A6.993 6.993 0 0 1 7.51 3.456l.33-1.652ZM10 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span
                    data-i18n="welcomeScreen.settings"
                    suppressHydrationWarning
                    className="truncate"
                  >
                    Settings
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="size-3 opacity-60 shrink-0"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <div
                  tabIndex={0}
                  className="dropdown-content menu p-3 shadow-2xl bg-base-100/95 backdrop-blur-md rounded-2xl w-64 max-w-[calc(100vw-2rem)] border border-base-300 mb-2 space-y-2.5 z-50 overflow-hidden box-border"
                >
                  {/* Audio Sound Row */}
                  <div className="flex items-center justify-between gap-2 px-1 min-w-0">
                    <span
                      className="text-xs font-bold uppercase opacity-70 truncate"
                      data-i18n="welcomeScreen.toggleAudio"
                      suppressHydrationWarning
                    >
                      Audio Sound
                    </span>
                    <button
                      className="audioToggleButton btn btn-xs btn-circle btn-ghost shrink-0"
                      data-i18n-title="welcomeScreen.toggleAudio"
                      suppressHydrationWarning
                      title="Toggle audio"
                    >
                      <svg
                        className="cjr-audio-on hidden size-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M10.5 3.75a.75.75 0 0 0-1.264-.546L5.203 7H2.667a.75.75 0 0 0-.7.48A6.985 6.985 0 0 0 1.5 10c0 .887.165 1.737.468 2.52.111.29.39.48.7.48h2.535l4.033 3.796a.75.75 0 0 0 1.264-.546V3.75ZM16.45 5.05a.75.75 0 0 0-1.06 1.061 5.5 5.5 0 0 1 0 7.778.75.75 0 0 0 1.06 1.06 7 7 0 0 0 0-9.899Z" />
                      </svg>
                      <svg
                        className="cjr-audio-off size-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M10.047 3.062a.75.75 0 0 1 .453.688v12.5a.75.75 0 0 1-1.264.546L5.203 13H2.667a.75.75 0 0 1-.7-.48A6.985 6.985 0 0 1 1.5 10c0-.887.165-1.737.468-2.52a.75.75 0 0 1 .7-.48h2.535l4.033-3.796a.75.75 0 0 1 .811-.142ZM13.78 7.22a.75.75 0 1 0-1.06 1.06L14.44 10l-1.72 1.72a.75.75 0 0 0 1.06 1.06l1.72-1.72 1.72 1.72a.75.75 0 1 0 1.06-1.06L16.56 10l1.72-1.72a.75.75 0 0 0-1.06-1.06L15.5 8.94l-1.72-1.72Z" />
                      </svg>
                    </button>
                  </div>

                  {/* Divider */}
                  <div className="divider my-0 opacity-30"></div>

                  {/* Language Selection */}
                  <div className="px-1 min-w-0">
                    <label
                      className="text-xs font-bold uppercase opacity-70 block mb-1 truncate"
                      data-i18n="welcomeScreen.language"
                      suppressHydrationWarning
                    >
                      Language
                    </label>
                    <select
                      id="languageSelect"
                      className="cjr-language-select select select-bordered select-xs w-full max-w-full font-medium truncate focus:outline-none focus:border-primary"
                    >
                      <option value="en">English</option>
                      <option value="de">Deutsch</option>
                      <option value="fr">Français</option>
                    </select>
                  </div>

                  {/* Divider */}
                  <div className="divider my-0 opacity-30"></div>

                  {/* Theme Selection */}
                  <div className="px-1 min-w-0">
                    <label
                      className="text-xs font-bold uppercase opacity-70 block mb-1 truncate"
                      data-i18n="welcomeScreen.theme"
                      suppressHydrationWarning
                    >
                      Theme
                    </label>
                    <select
                      data-choose-theme
                      className="select select-bordered select-xs w-full max-w-full font-medium capitalize truncate focus:outline-none focus:border-primary"
                    >
                      <option value="codingjr">codingjr</option>
                      <option value="light">light</option>
                      <option value="dark">dark</option>
                      <option value="cupcake">cupcake</option>
                      <option value="bumblebee">bumblebee</option>
                      <option value="emerald">emerald</option>
                      <option value="corporate">corporate</option>
                      <option value="synthwave">synthwave</option>
                      <option value="retro">retro</option>
                      <option value="cyberpunk">cyberpunk</option>
                      <option value="valentine">valentine</option>
                      <option value="halloween">halloween</option>
                      <option value="garden">garden</option>
                      <option value="forest">forest</option>
                      <option value="aqua">aqua</option>
                      <option value="lofi">lofi</option>
                      <option value="pastel">pastel</option>
                      <option value="wireframe">wireframe</option>
                      <option value="black">black</option>
                      <option value="luxury">luxury</option>
                      <option value="dracula">dracula</option>
                      <option value="cmyk">cmyk</option>
                      <option value="autumn">autumn</option>
                      <option value="business">business</option>
                      <option value="acid">acid</option>
                      <option value="lemonade">lemonade</option>
                      <option value="night">night</option>
                      <option value="coffee">coffee</option>
                      <option value="winter">winter</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          id="achievementsScreen"
          className="cjr-screen hidden absolute top-5 inset-x-0 bottom-4 rounded-box bg-base-100 shadow p-6 flex flex-col gap-4"
        >
          <h1
            className="text-3xl font-black uppercase"
            data-i18n="achievementsScreen.title"
            suppressHydrationWarning
          ></h1>
          <ul
            id="achievementsList"
            suppressHydrationWarning
            className="list bg-base-200 rounded-box shadow overflow-auto"
          ></ul>
          <div className="mt-auto">
            <button className="mainMenuButton btn btn-sm gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="size-4 fill-current"
              >
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8h5Z" />
              </svg>
              <span
                data-i18n="achievementsScreen.mainMenu"
                suppressHydrationWarning
              ></span>
            </button>
          </div>
        </div>

        <div
          id="helpScreen"
          className="cjr-screen hidden absolute top-5 inset-x-0 bottom-4 rounded-box bg-base-100 shadow p-6"
        >
          <div className="grid grid-cols-[1fr_12px_400px] gap-6 h-full">
            <div
              id="helpScreenAccordion"
              className="space-y-2 overflow-auto pr-2 text-sm"
            >
              <div
                className="collapse collapse-arrow bg-base-200 rounded-box"
                data-video="0"
              >
                <input type="radio" name="help-accordion" defaultChecked />
                <div
                  className="collapse-title font-bold"
                  data-i18n="helpScreen.goal.title"
                  suppressHydrationWarning
                ></div>
                <div className="collapse-content">
                  <p
                    data-i18n="helpScreen.goal.content"
                    suppressHydrationWarning
                  ></p>
                </div>
              </div>
              <div
                className="collapse collapse-arrow bg-base-200 rounded-box"
                data-video="1"
              >
                <input type="radio" name="help-accordion" />
                <div
                  className="collapse-title font-bold"
                  data-i18n="helpScreen.howTo.title"
                  suppressHydrationWarning
                ></div>
                <div className="collapse-content">
                  <p
                    data-i18n="helpScreen.howTo.content"
                    suppressHydrationWarning
                  ></p>
                </div>
              </div>
              <div
                className="collapse collapse-arrow bg-base-200 rounded-box"
                data-video="2"
              >
                <input type="radio" name="help-accordion" />
                <div
                  className="collapse-title font-bold"
                  data-i18n="helpScreen.objects.title"
                  suppressHydrationWarning
                ></div>
                <div className="collapse-content">
                  <p
                    data-i18n="helpScreen.objects.content"
                    suppressHydrationWarning
                  ></p>
                </div>
              </div>
              <div
                className="collapse collapse-arrow bg-base-200 rounded-box"
                data-video="3"
              >
                <input type="radio" name="help-accordion" />
                <div
                  className="collapse-title font-bold"
                  data-i18n="helpScreen.walkForward.title"
                  suppressHydrationWarning
                ></div>
                <div className="collapse-content">
                  <p
                    data-i18n="helpScreen.walkForward.content"
                    suppressHydrationWarning
                  ></p>
                </div>
              </div>
              <div
                className="collapse collapse-arrow bg-base-200 rounded-box"
                data-video="4"
              >
                <input type="radio" name="help-accordion" />
                <div
                  className="collapse-title font-bold"
                  data-i18n="helpScreen.turnRight.title"
                  suppressHydrationWarning
                ></div>
                <div className="collapse-content">
                  <p
                    data-i18n="helpScreen.turnRight.content"
                    suppressHydrationWarning
                  ></p>
                </div>
              </div>
              <div
                className="collapse collapse-arrow bg-base-200 rounded-box"
                data-video="5"
              >
                <input type="radio" name="help-accordion" />
                <div
                  className="collapse-title font-bold"
                  data-i18n="helpScreen.turnLeft.title"
                  suppressHydrationWarning
                ></div>
                <div className="collapse-content">
                  <p
                    data-i18n="helpScreen.turnLeft.content"
                    suppressHydrationWarning
                  ></p>
                </div>
              </div>
              <div
                className="collapse collapse-arrow bg-base-200 rounded-box"
                data-video="6"
              >
                <input type="radio" name="help-accordion" />
                <div
                  className="collapse-title font-bold"
                  data-i18n="helpScreen.jump.title"
                  suppressHydrationWarning
                ></div>
                <div className="collapse-content">
                  <p
                    data-i18n="helpScreen.jump.content"
                    suppressHydrationWarning
                  ></p>
                </div>
              </div>
              <div
                className="collapse collapse-arrow bg-base-200 rounded-box"
                data-video="7"
              >
                <input type="radio" name="help-accordion" />
                <div
                  className="collapse-title font-bold"
                  data-i18n="helpScreen.light.title"
                  suppressHydrationWarning
                ></div>
                <div className="collapse-content">
                  <p
                    data-i18n="helpScreen.light.content"
                    suppressHydrationWarning
                  ></p>
                </div>
              </div>
              <div
                className="collapse collapse-arrow bg-base-200 rounded-box"
                data-video="8"
              >
                <input type="radio" name="help-accordion" />
                <div
                  className="collapse-title font-bold"
                  data-i18n="helpScreen.repeat.title"
                  suppressHydrationWarning
                ></div>
                <div className="collapse-content">
                  <p
                    data-i18n="helpScreen.repeat.content"
                    suppressHydrationWarning
                  ></p>
                </div>
              </div>
              <div
                className="collapse collapse-arrow bg-base-200 rounded-box"
                data-video="9"
              >
                <input type="radio" name="help-accordion" />
                <div
                  className="collapse-title font-bold"
                  data-i18n="helpScreen.medals.title"
                  suppressHydrationWarning
                ></div>
                <div className="collapse-content">
                  <p
                    data-i18n="helpScreen.medals.content"
                    suppressHydrationWarning
                  ></p>
                </div>
              </div>
            </div>
            <div className="divider divider-horizontal m-0"></div>
            <div className="flex flex-col h-full">
              <div className="flex-1 flex items-center justify-center">
                <div id="videoContainer" className="w-[402px]">
                  <video
                    id="videoPlayer"
                    className="w-[402px] h-[300px] bg-black rounded-box"
                    width="400"
                    height="300"
                    controls
                    preload="metadata"
                    playsInline
                  ></video>
                </div>
              </div>
              <div className="pt-4">
                <button className="mainMenuButton btn btn-sm gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="size-4 fill-current"
                  >
                    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8h5Z" />
                  </svg>
                  <span
                    data-i18n="helpScreen.mainMenu"
                    suppressHydrationWarning
                  ></span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          id="levelSelectScreen"
          className="cjr-screen hidden absolute top-5 inset-x-0 bottom-4 rounded-box bg-base-100 shadow p-6 flex flex-col gap-4"
        >
          <h1
            className="text-3xl font-black uppercase"
            data-i18n="levelSelectScreen.title"
            suppressHydrationWarning
          ></h1>
          <div
            id="levelList"
            suppressHydrationWarning
            className="flex flex-wrap gap-3 justify-start overflow-auto p-2"
          ></div>
          <div className="mt-auto">
            <button className="mainMenuButton btn btn-sm gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="size-4 fill-current"
              >
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8h5Z" />
              </svg>
              <span
                data-i18n="levelSelectScreen.mainMenu"
                suppressHydrationWarning
              ></span>
            </button>
          </div>
        </div>

        <div
          id="gameScreen"
          className="cjr-screen hidden absolute top-5 inset-x-0 bottom-4 rounded-box bg-base-100 shadow p-2"
        >
          <div className="grid grid-cols-[690px_1fr] gap-2 h-full">
            <div className="relative">
              <div
                id="canvasContainer"
                className="bg-base-200 rounded-box overflow-hidden"
              >
                <canvas
                  id="gameCanvas"
                  width="690"
                  height="690"
                  className="block"
                ></canvas>
              </div>
              <div
                id="buttonContainer"
                className="absolute bottom-2 left-2 flex flex-wrap items-center gap-2 p-2 rounded-box bg-base-100/80 backdrop-blur shadow"
              >
                <button
                  className="levelSelectButton btn btn-sm btn-square"
                  data-i18n-title="gameScreen.back"
                  suppressHydrationWarning
                  title="Back"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="size-4 fill-current"
                  >
                    <path d="M19 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H19v-2Z" />
                  </svg>
                </button>
                <button
                  className="audioToggleButton btn btn-sm btn-square"
                  data-i18n-title="gameScreen.toggleAudio"
                  suppressHydrationWarning
                  title="Toggle audio"
                >
                  <svg
                    className="cjr-audio-on hidden size-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10.5 3.75a.75.75 0 0 0-1.264-.546L5.203 7H2.667a.75.75 0 0 0-.7.48A6.985 6.985 0 0 0 1.5 10c0 .887.165 1.737.468 2.52.111.29.39.48.7.48h2.535l4.033 3.796a.75.75 0 0 0 1.264-.546V3.75ZM16.45 5.05a.75.75 0 0 0-1.06 1.061 5.5 5.5 0 0 1 0 7.778.75.75 0 0 0 1.06 1.06 7 7 0 0 0 0-9.899Z" />
                    <path d="M14.329 7.172a.75.75 0 0 0-1.061 1.06 2.5 2.5 0 0 1 0 3.536.75.75 0 0 0 1.06 1.06 4 4 0 0 0 0-5.656Z" />
                  </svg>
                  <svg
                    className="cjr-audio-off size-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10.047 3.062a.75.75 0 0 1 .453.688v12.5a.75.75 0 0 1-1.264.546L5.203 13H2.667a.75.75 0 0 1-.7-.48A6.985 6.985 0 0 1 1.5 10c0-.887.165-1.737.468-2.52a.75.75 0 0 1 .7-.48h2.535l4.033-3.796a.75.75 0 0 1 .811-.142ZM13.78 7.22a.75.75 0 1 0-1.06 1.06L14.44 10l-1.72 1.72a.75.75 0 0 0 1.06 1.06l1.72-1.72 1.72 1.72a.75.75 0 1 0 1.06-1.06L16.56 10l1.72-1.72a.75.75 0 0 0-1.06-1.06L15.5 8.94l-1.72-1.72Z" />
                  </svg>
                </button>
                <button
                  id="clearButton"
                  className="btn btn-sm btn-square"
                  data-i18n-title="gameScreen.clear"
                  suppressHydrationWarning
                  title="Clear"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="size-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 3.25V4H2.75a.75.75 0 0 0 0 1.5h.3l.815 8.15A1.5 1.5 0 0 0 5.357 15h5.285a1.5 1.5 0 0 0 1.493-1.35l.815-8.15h.3a.75.75 0 0 0 0-1.5H11v-.75A2.25 2.25 0 0 0 8.75 1h-1.5A2.25 2.25 0 0 0 5 3.25Zm2.25-.75a.75.75 0 0 0-.75.75V4h3v-.75a.75.75 0 0 0-.75-.75h-1.5ZM6.05 6a.75.75 0 0 1 .787.713l.275 5.5a.75.75 0 0 1-1.498.075l-.275-5.5A.75.75 0 0 1 6.05 6Zm3.9 0a.75.75 0 0 1 .712.787l-.275 5.5a.75.75 0 0 1-1.498-.075l.275-5.5a.75.75 0 0 1 .786-.711Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <button
                  id="runButton"
                  suppressHydrationWarning
                  className="btn btn-sm btn-primary btn-square"
                  data-i18n-title="gameScreen.run"
                  title="Run"
                >
                  <svg
                    className="cjr-run-icon size-4 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7-11-7Z" />
                  </svg>
                  <svg
                    className="cjr-stop-icon hidden size-4 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M6 6h12v12H6V6Z" />
                  </svg>
                </button>
                <div id="speedControl" className="flex items-center gap-2 pl-2">
                  <label
                    htmlFor="speedSlider"
                    className="text-sm font-semibold"
                    data-i18n="gameScreen.speed"
                    suppressHydrationWarning
                  ></label>
                  <input
                    id="speedSlider"
                    type="range"
                    min="0.5"
                    max="3.0"
                    step="0.01"
                    defaultValue="2"
                    className="range range-xs range-primary w-28"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 min-h-0">
              <div
                id="instructionsContainer"
                suppressHydrationWarning
                className="card bg-base-200 shadow"
              >
                <div className="card-body p-3">
                  <h2 className="card-title text-base">
                    <span
                      data-i18n="instructions.title"
                      suppressHydrationWarning
                    ></span>
                  </h2>
                  <div className="overflow-auto max-h-[220px]">
                    <ul className="space-y-0">
                      <li className="cjr-instruction">
                        <p className="walk cjr-instruction-row">
                          <span
                            className="cjr-instruction-label"
                            data-i18n="instructions.walk"
                            suppressHydrationWarning
                          ></span>
                          <button
                            type="button"
                            className="cjr-instruction-delete btn btn-ghost btn-xs btn-square"
                            title="Remove"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              className="size-4 fill-current"
                            >
                              <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41Z" />
                            </svg>
                          </button>
                        </p>
                      </li>
                      <li className="cjr-instruction">
                        <p className="turnRight cjr-instruction-row">
                          <span
                            className="cjr-instruction-label"
                            data-i18n="instructions.turnRight"
                            suppressHydrationWarning
                          ></span>
                          <button
                            type="button"
                            className="cjr-instruction-delete btn btn-ghost btn-xs btn-square"
                            title="Remove"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              className="size-4 fill-current"
                            >
                              <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41Z" />
                            </svg>
                          </button>
                        </p>
                      </li>
                      <li className="cjr-instruction">
                        <p className="turnLeft cjr-instruction-row">
                          <span
                            className="cjr-instruction-label"
                            data-i18n="instructions.turnLeft"
                            suppressHydrationWarning
                          ></span>
                          <button
                            type="button"
                            className="cjr-instruction-delete btn btn-ghost btn-xs btn-square"
                            title="Remove"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              className="size-4 fill-current"
                            >
                              <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41Z" />
                            </svg>
                          </button>
                        </p>
                      </li>
                      <li className="cjr-instruction">
                        <p className="jump cjr-instruction-row">
                          <span
                            className="cjr-instruction-label"
                            data-i18n="instructions.jump"
                            suppressHydrationWarning
                          ></span>
                          <button
                            type="button"
                            className="cjr-instruction-delete btn btn-ghost btn-xs btn-square"
                            title="Remove"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              className="size-4 fill-current"
                            >
                              <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41Z" />
                            </svg>
                          </button>
                        </p>
                      </li>
                      <li className="cjr-instruction">
                        <p className="light cjr-instruction-row">
                          <span
                            className="cjr-instruction-label"
                            data-i18n="instructions.light"
                            suppressHydrationWarning
                          ></span>
                          <button
                            type="button"
                            className="cjr-instruction-delete btn btn-ghost btn-xs btn-square"
                            title="Remove"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              className="size-4 fill-current"
                            >
                              <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41Z" />
                            </svg>
                          </button>
                        </p>
                      </li>
                      <li className="cjr-instruction">
                        <p className="repeat cjr-instruction-row">
                          <span className="cjr-repeat-left flex items-center gap-2">
                            <span
                              className="cjr-instruction-label"
                              data-i18n="instructions.repeat.label"
                              suppressHydrationWarning
                            ></span>
                            <span className="cjr-repeat-count flex items-center gap-2">
                              <input
                                type="number"
                                min="1"
                                max="99"
                                step="1"
                                defaultValue="2"
                                className="input input-bordered input-xs w-16"
                              />
                              <span
                                className="text-xs opacity-70"
                                data-i18n="instructions.repeat.times"
                                suppressHydrationWarning
                              ></span>
                            </span>
                          </span>
                          <button
                            type="button"
                            className="cjr-instruction-delete btn btn-ghost btn-xs btn-square"
                            title="Remove"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              className="size-4 fill-current"
                            >
                              <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41Z" />
                            </svg>
                          </button>
                        </p>
                        <div className="cjr-repeat-body droppable">
                          <div className="cjr-repeat-body-inner">
                            <ul className="space-y-2"></ul>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div
                id="programContainer"
                suppressHydrationWarning
                className="card bg-base-200 shadow flex-1 min-h-0"
              >
                <div className="card-body p-3 min-h-0">
                  <h2 className="card-title text-base">
                    <span
                      data-i18n="program.title"
                      suppressHydrationWarning
                    ></span>
                  </h2>
                  <div className="droppable flex-1 overflow-x-hidden overflow-y-auto min-h-0">
                    <ul className="space-y-0 min-h-[360px]"></ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          id="credits2"
          className="absolute bottom-0 inset-x-0 h-4 text-center text-xs opacity-70"
        >
          <div style={{ float: "left" }}></div>
          <div style={{ float: "right" }}></div>
        </div>
      </div>

      <dialog id="levelCompleteDialog" className="modal">
        <div className="modal-box">
          <h3
            className="font-bold text-lg"
            data-i18n="dialogs.levelComplete.title"
            suppressHydrationWarning
          ></h3>
          <div className="py-4 flex gap-3 items-start">
            <span className="medal shrink-0"></span>
            <div className="flex-1">
              <p
                className="message"
                data-i18n="dialogs.levelComplete.message"
                suppressHydrationWarning
              ></p>
              <p className="hint mt-2 text-sm opacity-80"></p>
            </div>
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-sm">OK</button>
            </form>
          </div>
        </div>
      </dialog>

      <dialog id="achievementDialog" className="modal">
        <div className="modal-box">
          <h3
            className="font-bold text-lg"
            data-i18n="dialogs.achievement.title"
            suppressHydrationWarning
          ></h3>
          <div className="py-4 flex gap-3 items-start">
            <span className="achievement shrink-0"></span>
            <p className="message flex-1"></p>
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-sm">OK</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
