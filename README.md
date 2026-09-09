# CodingJr Bot Lab

**CodingJr Bot Lab** is an interactive educational puzzle game designed to introduce students to programming, algorithms, and computational thinking.

The player programs a friendly robot to navigate 3D isometric tile maps, jump across elevation changes, repeat loops, and light up all goal tiles.

---

## Key Features

- **Algorithmic Thinking:** Learn core computer science concepts such as sequencing, procedures, and loops.
- **Visual Drag & Drop Editor:** Assemble code blocks with intuitive drag-and-drop powered by SortableJS.
- **Nested Loops:** Master code efficiency by placing loops inside loops.
- **Multilingual Support:** Full localization in English, German, and French.
- **Theme Customization:** Multiple color themes powered by TailwindCSS & DaisyUI.
- **Offline Ready:** Single-file distribution allows double-click execution anywhere without internet or servers.

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/uday-bhardwaj-15/codingjr-lightbot-lab.git
   cd codingjr-lightbot-lab
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```

---

## Building for Production

### Standalone Single-File Offline Build
Generates a self-contained `dist/index.html` file that can be distributed directly to students:
```bash
npm run build
```

### Web Hosted Build
Generates assets in `dist-web/` optimized for hosting on web servers or CDNs:
```bash
npm run build:web
```

---

## Tech Stack

- **Runtime:** Vanilla JavaScript (ES Modules), HTML5 Canvas 2D, HTML5 Audio
- **Styling:** TailwindCSS v4, DaisyUI v5, theme-change
- **UI Components & Drag-Drop:** SortableJS
- **Localization:** i18next
- **Build System:** Vite 6, vite-plugin-singlefile

---

## License

This project is open source and available under the [MIT License](LICENSE).
