# Manju — Placement & Engineering Portfolio

A bespoke, responsive, editorial-minimal personal portfolio engineered specifically for **Manju**, a second-year Computer Science and Engineering (CSE) undergraduate student preparing for internships, campus placements, and software engineering opportunities.

Built exclusively with **HTML5, CSS3, and Vanilla JavaScript (ES6+)**—strictly zero frontend frameworks, zero build tooling, and zero external runtime dependencies.

---

## Table of Contents

1. [Design Philosophy & Highlights](#1-design-philosophy--highlights)
2. [File Architecture](#2-file-architecture)
3. [Running the Website Locally](#3-running-the-website-locally)
4. [Customization Guide (`data.js`)](#4-customization-guide-datajs)
   - [Updating Personal Bio & Name](#a-updating-personal-bio--name)
   - [Updating Academic Information](#b-updating-academic-information)
   - [Managing Technical Skills](#c-managing-technical-skills)
   - [Adding & Editing Projects](#d-adding--editing-projects)
   - [Configuring Contact, Email & Resume Links](#e-configuring-contact-email--resume-links)
5. [Styling & Color System (`style.css`)](#5-styling--color-system-stylecss)
6. [Static Deployment Guide](#6-static-deployment-guide)
7. [Accessibility & Browser Support](#7-accessibility--browser-support)

---

## 1. Design Philosophy & Highlights

- **Editorial-Minimal Aesthetic**: Generous whitespace, precise typography (serif display paired with geometric sans-serif and technical monospace), fine hairline dividers, and muted olive/lime accents.
- **Accurate Placement Presentation**: Strictly verified details:
  - Second-year CSE student status.
  - **9.7 First-Year CGPA** clearly labeled as first-year academic achievement (Semesters 1 & 2), not misrepresented as cumulative or overall.
  - C and C++ as confirmed programming languages with zero fabricated percentage bars or false star ratings.
  - Substantial projects prepared with a rich engineering dossier schema (`problem`, `contribution`, `features`, `challenges`, `learnings`).
- **Interactive Capabilities**:
  - **Theme Switching**: Instant light/dark mode toggle, localStorage persistence, OS preference detection, and zero theme flashing on load.
  - **Dynamic Rendering**: All content is populated via `data.js` using safe DOM APIs.
  - **Project Filter & Modal Dossier**: Interactive category tabs and a native dialog modal with focus restoration and `Escape` key handling.
  - **Email Clipboard Action**: One-click email copy with accessible feedback toast and `mailto:` action.
  - **Conditional Resume Button**: Automatically displays only when a valid resume URL is provided; remains hidden otherwise.
  - **Responsive & Accessible**: Seamless fluid scaling across 360px, 390px, 768px, 1024px, and 1440px with `prefers-reduced-motion` compliance.

---

## 2. File Architecture

```text
├── index.html       # Semantic HTML5 document structure & metadata
├── style.css        # Editorial design system, typography, CSS variables, & responsive queries
├── script.js       # Client interaction: themes, navigation, filtering, modal dialog, clipboard
├── data.js          # Central configuration: bio, academics, skills, projects, and contact info
└── README.md        # Comprehensive documentation & update guide
```

---

## 3. Running the Website Locally

Because this project is built entirely on native browser standards, it requires **no `npm install`**, **no package manager**, and **no compiler**.

### Option A: Direct File Opening
Double-click `index.html` or open it directly in any modern browser (Chrome, Edge, Firefox, Safari).

### Option B: Using VS Code Live Server (Recommended)
1. Open the folder in Visual Studio Code.
2. Install the **Live Server** extension (if not already installed).
3. Right-click `index.html` and click **"Open with Live Server"**.

### Option C: Using Python Built-in Server
Open a terminal in the project directory and run:

```bash
# Python 3
python -m http.server 8000
```
Then navigate to `http://localhost:8000` in your web browser.

---

## 4. Customization Guide (`data.js`)

All dynamic content lives inside `data.js`. You will rarely need to edit `index.html`.

### A. Updating Personal Bio & Name
Open `data.js` and edit the `profile`, `hero`, and `about` objects:

```javascript
profile: {
  name: "Manju",
  formalTitle: "Computer Science and Engineering Student",
  branch: "Computer Science and Engineering (CSE)",
  ...
}
```

You can customize the paragraphs in `about.paragraphs`:
```javascript
about: {
  paragraphs: [
    "Your updated introduction paragraph...",
    "Your updated paragraph about your C/C++ experience..."
  ],
  ...
}
```

### B. Updating Academic Information
Under `academics.items`, you can update milestones as you advance through semesters:

```javascript
academics: {
  items: [
    {
      metric: "9.7",
      metricScale: "/ 10.0",
      label: "First-Year Academic Achievement",
      subtext: "Secured across comprehensive first-year foundational coursework...",
      badge: "First-Year CGPA"
    },
    ...
  ]
}
```

### C. Managing Technical Skills
Under `skills.categories`, add or modify skills. Each skill object contains a `name` and an array of `tags`:

```javascript
{
  name: "Confirmed Programming Languages",
  status: "Core Competency",
  description: "Primary languages actively utilized for academic coursework and labs.",
  items: [
    { name: "C", tags: ["Pointers", "Memory Allocation", "Data Structures", "System Calls"] },
    { name: "C++", tags: ["OOP", "STL", "Templates", "Algorithmic Logic"] }
  ]
}
```

### D. Adding & Editing Projects
To showcase your actual projects, replace or append entries to the `projects.items` array. Every project supports the full engineering schema:

```javascript
{
  id: "my-real-project-id",
  title: "Distributed Key-Value Store in C++",
  category: "C / C++",              // Must match one of projects.categories
  featured: true,                    // Set to true to display in top spotlight card
  isPlaceholder: false,              // Set to false for genuine projects
  summary: "A high-performance in-memory key-value store using write-ahead logging.",
  problem: "Explain the engineering problem this project solves.",
  contribution: "Describe your specific implementation and architectural decisions.",
  technologies: ["C++20", "POSIX Sockets", "CMake", "GTest"],
  features: [
    "LSM-tree storage engine for write-optimized throughput",
    "Crash recovery via write-ahead logging (WAL)",
    "Custom LRU buffer cache"
  ],
  challenges: "Describe concurrency synchronization issues resolved using mutexes and lock-free queues.",
  learnings: "What you learned about storage systems and multi-threaded systems programming.",
  image: "",                         // Path to project image, or leave empty
  demoUrl: "",                       // Live URL or leave empty ""
  repoUrl: "https://github.com/manju-cse/my-project" // GitHub repository URL
}
```

### E. Configuring Contact, Email & Resume Links
Update your real contact information in `contact`:

```javascript
contact: {
  // If provided, email copy and mailto: actions activate automatically
  email: "manju.cse.connect@gmail.com",

  // GitHub & LinkedIn links (hidden automatically if left as empty "")
  github: "https://github.com/manju-cse",
  linkedin: "https://linkedin.com/in/manju-cse",

  // RESUME: Leave empty "" until your resume is ready.
  // The "View Academic Resume" button only renders when a valid http/https URL is set.
  resumeUrl: "", 

  location: "Karnataka, India",
  placementObjective: "Preparing for Software Engineer (SWE) Campus Placements & Engineering Internships"
}
```

---

## 5. Styling & Color System (`style.css`)

Colors and themes are managed via CSS custom properties at the top of `style.css`:

```css
/* Light Theme */
:root {
  --bg: #F5F3ED;
  --surface: #FFFEFA;
  --text-primary: #22231F;
  --text-secondary: #696B61;
  --border: #DEDED4;
  --accent: #788B4A;
}

/* Dark Theme */
[data-theme="dark"] {
  --bg: #191A18;
  --surface: #222420;
  --text-primary: #F1F0E8;
  --text-secondary: #B2B4A9;
  --border: #393B34;
  --accent: #B8CE83;
}
```

Fonts utilized with system fallbacks:
- **Headings & Display**: `'Instrument Serif', Georgia, 'Times New Roman', serif`
- **Body & Editorial**: `'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`
- **Metadata & Technical Labels**: `'IBM Plex Mono', 'SF Mono', Consolas, Menlo, monospace`

---

## 6. Static Deployment Guide

Because the website consists strictly of static HTML, CSS, and JS, it can be deployed for free on any modern static host in under 2 minutes:

### GitHub Pages (Easiest)
1. Initialize git and push the files to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "feat: complete placement portfolio"
   git branch -M main
   git remote add origin https://github.com/<your-username>/portfolio.git
   git push -u origin main
   ```
2. In your GitHub repository, navigate to **Settings > Pages**.
3. Under **Branch**, select `main` and `/ (root)`, then click **Save**.
4. Your website will be live at `https://<your-username>.github.io/portfolio/`.

### Vercel / Netlify / Cloudflare Pages
- **Vercel**: Import your GitHub repo at [vercel.com](https://vercel.com). Leave build command and output directory empty. Click **Deploy**.
- **Netlify**: Drag-and-drop the project folder directly onto [app.netlify.com/drop](https://app.netlify.com/drop).
- **Cloudflare Pages**: Connect your repository at [dash.cloudflare.com](https://dash.cloudflare.com) and deploy without a build step.

---

## 7. Accessibility & Browser Support

- **Semantic HTML5 landmarks**: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<dialog>`, and `<footer>`.
- **Keyboard Navigation**: Full tab ordering, focus trap in mobile menu and project dialog, visible `:focus-visible` rings, and escape-key dismissal.
- **Screen Reader Support**: Meaningful `aria-label`, `aria-expanded`, `aria-current`, and `aria-live` live regions for clipboard notifications.
- **Motion Sensitivity**: Respects `@media (prefers-reduced-motion: reduce)` by disabling scroll animations and transitions.
- **High Contrast**: Fully WCAG AA compliant contrast ratios across both light and dark themes.

---

© 2026 Manju. All rights reserved.
