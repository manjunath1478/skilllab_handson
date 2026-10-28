/**
 * ====================================================================
 * PORTFOLIO DATA CONFIGURATION — MANJU
 * ====================================================================
 * Second-Year Computer Science and Engineering Student
 *
 * HOW TO USE THIS FILE:
 * All dynamic content across the portfolio is managed through this
 * configuration object. To customize your portfolio:
 *   1. Update your contact links (email, GitHub, LinkedIn, Resume).
 *   2. Fill in your genuine projects in the `projects` array.
 *   3. Add new skills or categories as you progress in your degree.
 *   4. Edit your bio or academic notes whenever needed.
 *
 * No HTML or CSS modifications are required for regular content updates.
 * ====================================================================
 */

const portfolioData = {
  // Global Profile Metadata
  profile: {
    name: "Manju",
    formalTitle: "Computer Science and Engineering Student",
    academicStage: "Second-Year Undergraduate",
    branch: "Computer Science and Engineering (CSE)",
    firstYearCgpa: "9.7",
    cgpaScale: "10.0",
    cgpaDisclaimer: "First-Year Academic Achievement (Semesters 1 & 2)",
    objective: "Actively seeking software engineering internships, technical collaborations, and campus placement opportunities.",
    location: "Karnataka, India",
    statusBadge: "Available for Internships & Projects",
    interests: [
      "Core Programming",
      "UI & System Customization",
      "Exploring Emerging Technologies",
      "Practical Software Engineering"
    ]
  },

  // Hero Section Configuration
  hero: {
    kicker: "PORTFOLIO // SECOND YEAR CSE",
    headline: "Learning the fundamentals.\nBuilding things that matter.",
    intro: "I’m Manju, a Computer Science and Engineering student interested in coding, interface customization, and exploring technology through practical projects. I’m developing my programming and problem-solving skills while building a stronger foundation for a career in software development.",
    actions: {
      primary: { label: "Explore Projects", target: "#projects" },
      secondary: { label: "About Me", target: "#about" }
    },
    metaPoints: [
      { label: "ACADEMIC STAGE", value: "2nd Year Engineering" },
      { label: "BRANCH", value: "Computer Science & Engg" },
      { label: "FIRST-YEAR CGPA", value: "9.7 / 10.0" },
      { label: "CORE LANGUAGES", value: "C & C++" }
    ]
  },

  // About Section Content
  about: {
    sectionNumber: "01",
    sectionTitle: "About Me",
    lead: "A disciplined approach to foundational computer science, software craft, and purposeful technology.",
    paragraphs: [
      "I am a second-year Computer Science and Engineering student driven by a curiosity for how systems operate beneath high-level abstractions. My academic journey has been centered on establishing rigorous fundamentals in computing, mathematics, and problem solving, which culminated in a 9.7 CGPA across my first academic year.",
      "My hands-on exploration revolves around C and C++, focusing on memory management, data structures, and algorithmic efficiency. In parallel, I have a deep appreciation for UI customization, aesthetic simplicity, and developer tooling—refining interfaces so that technical depth meets intuitive design.",
      "As I prepare for industry internships and future software engineering roles, my priority is straightforward: master core computer science principles, build robust software through iterative practice, and collaborate with teams that build impactful technology."
    ],
    philosophies: [
      {
        title: "Rigorous Fundamentals",
        description: "Prioritizing strong memory models, algorithmic problem solving, and system principles over fleeting surface-level trends."
      },
      {
        title: "Craft & Customization",
        description: "Appreciating deliberate design, clean terminal environments, and responsive user interfaces tailored for efficiency."
      },
      {
        title: "Continuous Learning",
        description: "Approaching every technical challenge with humility, disciplined study, and direct hands-on implementation."
      }
    ]
  },

  // Academic Highlights
  academics: {
    sectionNumber: "02",
    sectionTitle: "Academic Standing",
    kicker: "VERIFIED ACADEMIC MILESTONES",
    summary: "Consistent academic dedication combining strong analytical coursework with practical engineering labs.",
    items: [
      {
        metric: "9.7",
        metricScale: "/ 10.0",
        label: "First-Year Academic Achievement",
        subtext: "Secured across comprehensive first-year foundational coursework and laboratory examinations.",
        badge: "First-Year CGPA"
      },
      {
        metric: "CSE",
        metricScale: "Branch",
        label: "Computer Science and Engineering",
        subtext: "Enrolled in core curriculum spanning data structures, digital logic, and object-oriented paradigms.",
        badge: "Field of Study"
      },
      {
        metric: "02",
        metricScale: "Year",
        label: "Second-Year Engineering Stage",
        subtext: "Actively building core competence in systems programming, algorithmic analysis, and collaborative projects.",
        badge: "Academic Stage"
      }
    ],
    note: "Note: 9.7 represents the academic achievement of the first academic year (Semesters 1 & 2)."
  },

  // Technical Skills
  skills: {
    sectionNumber: "03",
    sectionTitle: "Technical Skills",
    kicker: "CAPABILITIES & CURRENT FOCUS",
    summary: "Confirmed programming competencies alongside active areas of academic and independent study. (No fabricated ratings or exaggerated percentages).",
    categories: [
      {
        name: "Confirmed Programming Languages",
        status: "Core Competency",
        description: "Primary languages actively utilized for academic coursework, labs, and foundational programming.",
        items: [
          { name: "C", tags: ["Pointers", "Memory Allocation", "Data Structures", "System Calls"] },
          { name: "C++", tags: ["OOP", "Standard Template Library (STL)", "Templates", "Algorithmic Logic"] }
        ]
      },
      {
        name: "Current Academic & Conceptual Focus",
        status: "In Progress / Active Study",
        description: "Theoretical and algorithmic concepts actively studied during the ongoing academic year.",
        items: [
          { name: "Data Structures & Algorithms", tags: ["Linked Lists", "Trees", "Stacks/Queues", "Sorting & Searching"] },
          { name: "Object-Oriented Design", tags: ["Encapsulation", "Inheritance", "Polymorphism", "Abstraction"] },
          { name: "Computer Systems Fundamentals", tags: ["Memory Layout", "Stack vs Heap", "Binary Representation"] }
        ]
      },
      {
        name: "Developer Environment & Tools",
        status: "Daily Workflow",
        description: "Tools, utilities, and developer environments utilized for coding, versioning, and compilation.",
        items: [
          { name: "GCC / G++ Toolchain", tags: ["Compilation", "Makefiles", "Optimization Flags", "GDB Debugging"] },
          { name: "Git & GitHub", tags: ["Version Control", "Branching", "Repository Organization"] },
          { name: "Visual Studio Code & CLI", tags: ["Terminal Workflows", "Workspace Config", "Shell Navigation"] }
        ]
      },
      {
        name: "Personal Interests & Exploration",
        status: "Exploration Areas",
        description: "Domains of enthusiastic study, experimentation, and independent skill acquisition.",
        items: [
          { name: "UI & Workspace Customization", tags: ["Minimal Aesthetics", "Workflow Ergonomics", "Typography"] },
          { name: "System-Level Utilities", tags: ["CLI Applications", "Low-overhead Tools", "Modular Code"] },
          { name: "New Technology Exploration", tags: ["Software Architecture", "Emerging Open Source Tools"] }
        ]
      }
    ]
  },

  // Academic and Learning Journey
  journey: {
    sectionNumber: "04",
    sectionTitle: "Learning Journey",
    kicker: "PRIORITIES & TRAJECTORY",
    intro: "My current academic roadmap is intentionally centered on long-term software engineering fundamentals rather than superficial shortcuts.",
    milestones: [
      {
        step: "01",
        title: "Deepening C & C++ Fundamentals",
        description: "Gaining an unshakeable grasp of raw memory mechanics, pointer arithmetic, struct alignment, and modular C architecture, progressing toward advanced C++ paradigms and STL design.",
        status: "Active Priority"
      },
      {
        step: "02",
        title: "Strengthening Algorithmic Problem-Solving",
        description: "Systematically implementing classic data structures from scratch and analyzing asymptotic time and space complexities to prepare for rigorous technical placement interviews.",
        status: "Daily Practice"
      },
      {
        step: "03",
        title: "Learning Through Practical Projects",
        description: "Applying classroom theory to standalone projects—building terminal utilities, interactive applications, and algorithmic simulations where clean structure matters.",
        status: "Ongoing"
      },
      {
        step: "04",
        title: "Exploring UI Customization & Ergonomics",
        description: "Investigating how clean interface design, typography, and purposeful micro-interactions enhance human-computer interaction and developer tools.",
        status: "Exploration"
      },
      {
        step: "05",
        title: "Preparing for Campus Placements & Internships",
        description: "Synthesizing theoretical knowledge, collaborative coding etiquette, and technical communication to make an immediate impact in software engineering internships.",
        status: "Target Objective"
      }
    ]
  },

  // Project Showcase
  // NOTE: As requested, these projects are structured as editable placeholder
  // showcases until genuine project details are configured.
  // Each entry supports the full schema: title, summary, problem, contribution,
  // technologies, features, challenges, learnings, image, demoUrl, repoUrl, featured.
  projects: {
    sectionNumber: "05",
    sectionTitle: "Project Showcase",
    kicker: "PRACTICAL WORK & EXPERIMENTS",
    intro: "A curated collection of practical systems, utilities, and software projects. The entries below serve as structured showcases and editable templates ready to be populated with completed repository records.",
    disclaimer: "Editable Showcase: You can update, add, or replace any project entry directly in data.js.",
    categories: ["All", "C / C++", "Systems & Utilities", "Algorithms", "UI Exploration"],
    items: [
      {
        id: "project-c-allocator",
        title: "Custom Memory Allocator & Pool Manager",
        category: "C / C++",
        featured: true,
        isPlaceholder: true,
        summary: "A user-space dynamic memory allocator in C featuring segregated free lists, boundary-tag block coalescing, and memory leak tracking.",
        problem: "Standard heap allocation can cause uncontrollable fragmentation in latency-critical environments. This project explores how system allocators organize contiguous virtual memory and resolve coalescing efficiently.",
        contribution: "Implemented custom malloc, free, calloc, and realloc wrappers utilizing mmap/sbrk system primitives, featuring double-linked explicit free lists and constant-time coalescing.",
        technologies: ["C", "POSIX System Calls", "Valgrind", "GDB", "Makefiles"],
        features: [
          "Segregated free lists for size-tiered block allocation",
          "Immediate bidirectional coalescing via boundary tags",
          "Internal metadata checksums to catch buffer overflows",
          "Diagnostic heap statistics reporting memory overhead and fragmentation percentage"
        ],
        challenges: "Managing word alignment (8/16 bytes) across heterogeneous pointer types and preventing subtle off-by-one boundary bugs when splitting free blocks.",
        learnings: "Deepened practical appreciation for virtual memory page tables, cache locality, and defensive assertion practices in raw C.",
        image: "",
        demoUrl: "",
        repoUrl: "https://github.com/your-username/memory-allocator-template"
      },
      {
        id: "project-terminal-browser",
        title: "Terminal-Based File & Workspace Navigator",
        category: "Systems & Utilities",
        featured: false,
        isPlaceholder: true,
        summary: "An ultra-fast terminal file manager written in C++ with vi-style keybindings, regex search, and configurable themes.",
        problem: "Navigating nested directory structures inside remote servers or lightweight command-line sessions is often slow with standard shell commands.",
        contribution: "Architected an interactive terminal user interface (TUI) utilizing raw mode terminal controls, ANSI escape sequencing, and multi-threaded directory indexing.",
        technologies: ["C++", "ANSI Escape Codes", "POSIX File API", "Multithreading"],
        features: [
          "Keyboard-centric navigation using Vim key conventions (h, j, k, l)",
          "Live fuzzy directory filtering and instant file preview",
          "Custom color configuration via minimalist theme files",
          "Low memory footprint (< 12 MB resident set size)"
        ],
        challenges: "Handling terminal window resize signals (SIGWINCH) asynchronously without redrawing artefacts or corrupting standard output streams.",
        learnings: "Mastered POSIX termios configurations, non-blocking I/O multiplexing, and robust error handling for restricted permissions.",
        image: "",
        demoUrl: "",
        repoUrl: "https://github.com/your-username/tui-file-navigator"
      },
      {
        id: "project-dsa-benchmarking",
        title: "Algorithmic Complexity & Benchmark Suite",
        category: "Algorithms",
        featured: false,
        isPlaceholder: true,
        summary: "An empirical benchmarking framework evaluating algorithmic runtime distributions, cache-miss behaviors, and asymptotic scalability across diverse input topologies.",
        problem: "Theoretical Big-O notation often masks hardware realities like CPU cache misses and branch mispredictions. A practical profiling suite brings theoretical rigor to life.",
        contribution: "Developed an empirical test runner in C++ with high-resolution clock measurements, automated dataset generators, and formatted CSV export for visualization.",
        technologies: ["C++", "chrono API", "Cache Optimization", "CSV Export", "Data Structures"],
        features: [
          "Automated benchmark generators for best, average, and pathological input cases",
          "Comparison of balanced BSTs, Skip Lists, and B-Tree variants",
          "High-precision microsecond timing with warm-up cycles to eliminate CPU frequency throttling",
          "Plain-text statistical summary tables with standard deviation calculations"
        ],
        challenges: "Minimizing timer measurement overhead and ensuring compiler optimizations (-O3) did not optimize away benchmark evaluation loops.",
        learnings: "Gained firsthand insight into hardware prefetching, memory hierarchies, and the gap between asymptotic theory and hardware execution.",
        image: "",
        demoUrl: "",
        repoUrl: "https://github.com/your-username/algorithmic-benchmark-suite"
      },
      {
        id: "project-custom-desktop-shell",
        title: "Minimalist Developer HUD & Status Bar",
        category: "UI Exploration",
        featured: false,
        isPlaceholder: true,
        summary: "A lightweight desktop status monitor displaying system thermals, CPU load, active Git branches, and network throughput with an editorial aesthetic.",
        problem: "Heavy desktop monitoring widgets consume unnecessary CPU cycles and clutter modern minimal workspaces with distracting animations.",
        contribution: "Built an event-driven status daemon that queries `/proc` and hardware sensor APIs at adaptive polling rates, rendering through clean SVG-based visual layouts.",
        technologies: ["C / C++", "Linux APIs", "SVG Rendering", "System Metrics"],
        features: [
          "Zero idle CPU consumption (< 0.2% usage under active polling)",
          "Adaptive interval timing based on laptop battery state",
          "Monochromatic editorial visual theme matching personal workstation aesthetic",
          "Customizable text layouts driven by simple configuration files"
        ],
        challenges: "Efficiently parsing pseudo-filesystem nodes in Linux without repetitive heap allocations on every tick.",
        learnings: "Learned kernel metric extraction, event loop design, and minimalist graphic rendering principles.",
        image: "",
        demoUrl: "",
        repoUrl: "https://github.com/your-username/minimalist-dev-hud"
      }
    ]
  },

  // Contact Information
  // When an email is supplied, the mailto button and copy button are active.
  // Resume button is shown ONLY if resumeUrl has an actual URL configured.
  // Social profiles without URLs are safely hidden.
  contact: {
    sectionNumber: "06",
    sectionTitle: "Contact & Placement",
    kicker: "OPPORTUNITIES & COLLABORATION",
    lead: "Interested in discussing internship opportunities, engineering projects, or technical collaboration? Let's connect.",
    
    // Contact channels — edit with your genuine details:
    email: "manju.cse.connect@gmail.com", // Set your email address here
    github: "https://github.com/manju-cse", // Update with your genuine GitHub URL
    linkedin: "https://linkedin.com/in/manju-cse", // Update with your genuine LinkedIn URL
    resumeUrl: "", // Leave empty "" until your resume is ready; button will auto-hide
    
    location: "Karnataka, India",
    availability: "Available for Summer 2027 Internships & Technical Projects",
    placementObjective: "Preparing for Software Engineer (SWE) Campus Placements & Engineering Internships"
  },

  // Footer Metadata
  footer: {
    quote: "Rigorous fundamentals. Deliberate craft. Lifelong learning.",
    copyrightYear: 2026,
    credits: "Engineered with semantic HTML5, pure CSS3, and vanilla ES6+ JavaScript. No frameworks or dependencies."
  }
};

// Export for ES modules and attach to global window object
if (typeof module !== "undefined" && module.exports) {
  module.exports = portfolioData;
}
if (typeof window !== "undefined") {
  window.portfolioData = portfolioData;
}
