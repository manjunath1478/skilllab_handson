/**
 * ====================================================================
 * MANJU — PLACEMENT PORTFOLIO CLIENT APPLICATION
 * ====================================================================
 * Clean, robust vanilla JavaScript (ES6+) with zero dependencies.
 *
 * Modules & Responsibilities:
 *   1. Theme Management (Light/Dark + Persistence + System Sync)
 *   2. Responsive Navigation & Accessible Mobile Drawer
 *   3. Dynamic DOM Rendering from `data.js`
 *   4. Project Filtering & Details Modal (Dialog API)
 *   5. Clipboard Copy Feedback & Toast Notifications
 *   6. Scroll Spies & Reveal Animations
 *   7. Accessibility (Focus Traps & Escape Listeners)
 * ====================================================================
 */

(function () {
  "use strict";

  // Cache portfolio data from window
  const data = window.portfolioData;
  if (!data) {
    console.warn("Portfolio data not found on window. Ensure data.js is loaded prior to script.js.");
    return;
  }

  /* ------------------------------------------------------------------
   * 1. THEME SWITCHING (LIGHT / DARK)
   * ------------------------------------------------------------------ */
  const THEME_STORAGE_KEY = "manju_portfolio_theme";
  const themeToggleBtn = document.getElementById("theme-toggle-btn");

  const sunIconSvg = `
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="5"></circle>
      <line x1="12" y1="1" x2="12" y2="3"></line>
      <line x1="12" y1="21" x2="12" y2="23"></line>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
      <line x1="1" y1="12" x2="3" y2="12"></line>
      <line x1="21" y1="12" x2="23" y2="12"></line>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
    </svg>`;

  const moonIconSvg = `
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
    </svg>`;

  function getPreferredTheme() {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === "light" || saved === "dark") {
      return saved;
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);

    // Update meta theme-color tag
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute("content", theme === "dark" ? "#191A18" : "#F5F3ED");
    }

    if (themeToggleBtn) {
      themeToggleBtn.innerHTML = theme === "dark" ? sunIconSvg : moonIconSvg;
      const label = theme === "dark" ? "Switch to light theme" : "Switch to dark theme";
      themeToggleBtn.setAttribute("aria-label", label);
      themeToggleBtn.setAttribute("title", label);
    }
  }

  function initTheme() {
    const currentTheme = getPreferredTheme();
    applyTheme(currentTheme);

    if (themeToggleBtn) {
      themeToggleBtn.addEventListener("click", () => {
        const activeTheme = document.documentElement.getAttribute("data-theme") || "light";
        const nextTheme = activeTheme === "dark" ? "light" : "dark";
        applyTheme(nextTheme);
      });
    }

    // Listen for OS system preference changes
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
      if (!localStorage.getItem(THEME_STORAGE_KEY)) {
        applyTheme(e.matches ? "dark" : "light");
      }
    });
  }

  /* ------------------------------------------------------------------
   * 2. RESPONSIVE NAVIGATION & ACTIVE SECTION HIGHLIGHT
   * ------------------------------------------------------------------ */
  const mobileNavToggle = document.getElementById("mobile-nav-toggle");
  const navMenu = document.getElementById("nav-menu");
  const drawerOverlay = document.getElementById("drawer-overlay");
  const navLinks = document.querySelectorAll(".nav-link");

  function openMobileNav() {
    if (!navMenu || !mobileNavToggle) return;
    navMenu.classList.add("is-open");
    drawerOverlay?.classList.add("is-active");
    mobileNavToggle.setAttribute("aria-expanded", "true");
    mobileNavToggle.setAttribute("aria-label", "Close navigation menu");
  }

  function closeMobileNav() {
    if (!navMenu || !mobileNavToggle) return;
    navMenu.classList.remove("is-open");
    drawerOverlay?.classList.remove("is-active");
    mobileNavToggle.setAttribute("aria-expanded", "false");
    mobileNavToggle.setAttribute("aria-label", "Open navigation menu");
  }

  function initNavigation() {
    if (mobileNavToggle) {
      mobileNavToggle.addEventListener("click", () => {
        const isOpen = navMenu?.classList.contains("is-open");
        if (isOpen) {
          closeMobileNav();
        } else {
          openMobileNav();
        }
      });
    }

    if (drawerOverlay) {
      drawerOverlay.addEventListener("click", closeMobileNav);
    }

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        closeMobileNav();
      });
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && navMenu?.classList.contains("is-open")) {
        closeMobileNav();
        mobileNavToggle?.focus();
      }
    });

    // IntersectionObserver for active navigation section
    const observedSections = document.querySelectorAll("section[id]");
    if ("IntersectionObserver" in window && observedSections.length > 0) {
      const observerOptions = {
        root: null,
        rootMargin: "-25% 0px -65% 0px",
        threshold: 0
      };

      const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const currentId = entry.target.getAttribute("id");
            navLinks.forEach((link) => {
              const href = link.getAttribute("href");
              if (href === `#${currentId}`) {
                link.classList.add("active");
                link.setAttribute("aria-current", "page");
              } else {
                link.classList.remove("active");
                link.removeAttribute("aria-current");
              }
            });
          }
        });
      }, observerOptions);

      observedSections.forEach((sec) => sectionObserver.observe(sec));
    }
  }

  /* ------------------------------------------------------------------
   * 3. DYNAMIC RENDERING FROM DATA.JS
   * ------------------------------------------------------------------ */

  // Helper for safe element creation
  function el(tag, className, textContent) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (textContent !== undefined) node.textContent = textContent;
    return node;
  }

  function renderHero() {
    const dossierContainer = document.getElementById("hero-dossier-list");
    if (!dossierContainer || !data.hero.metaPoints) return;

    dossierContainer.innerHTML = "";
    data.hero.metaPoints.forEach((point) => {
      const row = el("div", "dossier-row");
      const label = el("span", "dossier-label", point.label);
      const val = el("span", "dossier-value", point.value);
      if (point.label.includes("CGPA")) {
        val.classList.add("highlight");
      }
      row.appendChild(label);
      row.appendChild(val);
      dossierContainer.appendChild(row);
    });
  }

  function renderAbout() {
    const bodyContainer = document.getElementById("about-body");
    const pillarsContainer = document.getElementById("about-pillars");

    if (bodyContainer && data.about.paragraphs) {
      bodyContainer.innerHTML = "";
      data.about.paragraphs.forEach((pText) => {
        const p = el("p", null, pText);
        bodyContainer.appendChild(p);
      });
    }

    if (pillarsContainer && data.about.philosophies) {
      pillarsContainer.innerHTML = "";
      data.about.philosophies.forEach((pillar) => {
        const card = el("div", "pillar-card");
        const title = el("h3", "pillar-title", pillar.title);
        const desc = el("p", "pillar-desc", pillar.description);
        card.appendChild(title);
        card.appendChild(desc);
        pillarsContainer.appendChild(card);
      });
    }
  }

  function renderAcademics() {
    const cardsGrid = document.getElementById("academic-cards-grid");
    if (!cardsGrid || !data.academics.items) return;

    cardsGrid.innerHTML = "";
    data.academics.items.forEach((item) => {
      const card = el("article", "academic-card");
      if (item.badge.includes("CGPA")) {
        card.classList.add("highlight");
      }

      const badge = el("span", "card-badge", item.badge);

      const metricBox = el("div", "academic-metric-box");
      const metric = el("span", "academic-metric", item.metric);
      const scale = el("span", "academic-metric-scale", item.metricScale);
      metricBox.appendChild(metric);
      metricBox.appendChild(scale);

      const label = el("h3", "academic-card-label", item.label);
      const sub = el("p", "academic-card-subtext", item.subtext);

      card.appendChild(badge);
      card.appendChild(metricBox);
      card.appendChild(label);
      card.appendChild(sub);
      cardsGrid.appendChild(card);
    });

    const disclaimer = document.getElementById("academic-disclaimer");
    if (disclaimer && data.academics.note) {
      disclaimer.textContent = data.academics.note;
    }
  }

  function renderSkills() {
    const skillsGrid = document.getElementById("skills-container-grid");
    if (!skillsGrid || !data.skills.categories) return;

    skillsGrid.innerHTML = "";
    data.skills.categories.forEach((cat) => {
      const card = el("article", "skills-category-card");

      const header = el("div", "skills-card-header");
      const name = el("h3", "skills-category-name", cat.name);
      const statusBadge = el("span", "skills-status-badge", cat.status);
      header.appendChild(name);
      header.appendChild(statusBadge);

      const desc = el("p", "skills-category-desc", cat.description);
      const list = el("div", "skills-items-list");

      cat.items.forEach((item) => {
        const row = el("div", "skill-row");
        const title = el("div", "skill-name-title", item.name);
        const tagsGroup = el("div", "skill-tags-group");

        item.tags.forEach((tagText) => {
          const tag = el("span", "skill-tag", tagText);
          tagsGroup.appendChild(tag);
        });

        row.appendChild(title);
        row.appendChild(tagsGroup);
        list.appendChild(row);
      });

      card.appendChild(header);
      card.appendChild(desc);
      card.appendChild(list);
      skillsGrid.appendChild(card);
    });
  }

  function renderJourney() {
    const journeyContainer = document.getElementById("journey-timeline");
    if (!journeyContainer || !data.journey.milestones) return;

    journeyContainer.innerHTML = "";
    data.journey.milestones.forEach((item) => {
      const row = el("div", "journey-item");

      const step = el("div", "journey-step", item.step);
      const content = el("div", "journey-content");
      const title = el("h3", "journey-title", item.title);
      const desc = el("p", "journey-desc", item.description);
      content.appendChild(title);
      content.appendChild(desc);

      const status = el("span", "journey-status-pill", item.status);

      row.appendChild(step);
      row.appendChild(content);
      row.appendChild(status);
      journeyContainer.appendChild(row);
    });
  }

  /* ------------------------------------------------------------------
   * 4. PROJECT SHOWCASE, FILTERING & MODAL DIALOG
   * ------------------------------------------------------------------ */
  let activeProjectFilter = "All";
  const projectDialog = document.getElementById("project-modal");
  const modalCloseBtn = document.getElementById("modal-close-btn");
  let lastFocusedElement = null;

  function renderFilterButtons() {
    const filterContainer = document.getElementById("project-filter-bar");
    if (!filterContainer || !data.projects.categories) return;

    filterContainer.innerHTML = "";
    data.projects.categories.forEach((cat) => {
      const btn = el("button", "filter-btn", cat);
      btn.type = "button";
      if (cat === activeProjectFilter) {
        btn.classList.add("active");
        btn.setAttribute("aria-pressed", "true");
      } else {
        btn.setAttribute("aria-pressed", "false");
      }

      btn.addEventListener("click", () => {
        activeProjectFilter = cat;
        renderFilterButtons();
        renderProjects();
      });

      filterContainer.appendChild(btn);
    });
  }

  function renderProjects() {
    const featuredSlot = document.getElementById("featured-project-slot");
    const gridSlot = document.getElementById("projects-grid-slot");
    if (!featuredSlot || !gridSlot) return;

    featuredSlot.innerHTML = "";
    gridSlot.innerHTML = "";

    const filtered = data.projects.items.filter((p) => {
      if (activeProjectFilter === "All") return true;
      return p.category === activeProjectFilter;
    });

    if (filtered.length === 0) {
      const empty = el(
        "div",
        "projects-empty-state",
        `No project showcases currently configured under "${activeProjectFilter}". Edit data.js to assign custom categories.`
      );
      gridSlot.appendChild(empty);
      return;
    }

    // Separate featured project if showing 'All' or if matched
    const featuredProject = filtered.find((p) => p.featured) || (activeProjectFilter === "All" ? filtered[0] : null);
    const supportingProjects = filtered.filter((p) => p !== featuredProject);

    // 1. Featured Project Card
    if (featuredProject) {
      const card = el("article", "featured-card");

      // Left column: Visual Terminal Blueprint
      const visual = el("div", "featured-visual");
      const badge = el("div", "featured-badge");
      badge.innerHTML = `<span class="pulse-dot"></span> FEATURED ENGINEERING SPOTLIGHT`;

      const terminal = el("div", "featured-visual-terminal");
      const termHead = el("div", "terminal-header");
      termHead.innerHTML = `<span>module: ${featuredProject.id}.c</span><span>TARGET // CSE LAB</span>`;
      
      const termCode = el("div", "terminal-code");
      termCode.innerHTML = `
        <span style="color: var(--text-muted)">// Architecture Specification</span><br>
        #include &lt;stdio.h&gt;<br>
        #include &lt;stdlib.h&gt;<br>
        <span style="color: var(--accent)">typedef struct</span> MemoryBlock {<br>
        &nbsp;&nbsp;size_t block_size;<br>
        &nbsp;&nbsp;struct MemoryBlock* next;<br>
        } BlockNode;<br>
        <span style="color: var(--text-muted)">/* Status: Core Optimization Active */</span>
      `;

      terminal.appendChild(termHead);
      terminal.appendChild(termCode);
      visual.appendChild(badge);
      visual.appendChild(terminal);

      // Right column: Content Details
      const content = el("div", "featured-content");

      const metaRow = el("div", "featured-meta-row");
      const catTag = el("span", "project-category-tag", featuredProject.category);
      metaRow.appendChild(catTag);

      if (featuredProject.isPlaceholder) {
        const tmplBadge = el("span", "template-badge", "Editable Showcase");
        metaRow.appendChild(tmplBadge);
      }

      const title = el("h3", "project-title", featuredProject.title);
      const summary = el("p", "project-summary", featuredProject.summary);

      const techPills = el("div", "project-tech-pills");
      featuredProject.technologies.forEach((tech) => {
        techPills.appendChild(el("span", "tech-pill", tech));
      });

      const actions = el("div", "project-card-actions");
      const detailBtn = el("button", "btn btn-primary btn-sm", "View Technical Dossier");
      detailBtn.type = "button";
      detailBtn.setAttribute("data-project-id", featuredProject.id);
      detailBtn.addEventListener("click", () => openProjectModal(featuredProject, detailBtn));
      actions.appendChild(detailBtn);

      if (featuredProject.repoUrl && featuredProject.repoUrl.startsWith("http")) {
        const repoLink = el("a", "btn btn-secondary btn-sm", "Source Code →");
        repoLink.href = featuredProject.repoUrl;
        repoLink.target = "_blank";
        repoLink.rel = "noopener noreferrer";
        actions.appendChild(repoLink);
      }

      content.appendChild(metaRow);
      content.appendChild(title);
      content.appendChild(summary);
      content.appendChild(techPills);
      content.appendChild(actions);

      card.appendChild(visual);
      card.appendChild(content);
      featuredSlot.appendChild(card);
    }

    // 2. Supporting Projects Grid
    supportingProjects.forEach((proj) => {
      const card = el("article", "project-card");

      const cardHead = el("div", "project-card-header");
      const metaRow = el("div", "featured-meta-row");
      metaRow.appendChild(el("span", "project-category-tag", proj.category));

      if (proj.isPlaceholder) {
        metaRow.appendChild(el("span", "template-badge", "Editable Slot"));
      }

      const title = el("h3", "project-title", proj.title);
      const summary = el("p", "project-summary", proj.summary);
      cardHead.appendChild(metaRow);
      cardHead.appendChild(title);
      cardHead.appendChild(summary);

      const techPills = el("div", "project-tech-pills");
      proj.technologies.slice(0, 4).forEach((tech) => {
        techPills.appendChild(el("span", "tech-pill", tech));
      });

      const actions = el("div", "project-card-actions");
      const detailBtn = el("button", "btn btn-secondary btn-sm", "Explore Details");
      detailBtn.type = "button";
      detailBtn.setAttribute("data-project-id", proj.id);
      detailBtn.addEventListener("click", () => openProjectModal(proj, detailBtn));
      actions.appendChild(detailBtn);

      if (proj.repoUrl && proj.repoUrl.startsWith("http")) {
        const repoLink = el("a", "btn btn-sm btn-outline-accent", "GitHub →");
        repoLink.href = proj.repoUrl;
        repoLink.target = "_blank";
        repoLink.rel = "noopener noreferrer";
        actions.appendChild(repoLink);
      }

      card.appendChild(cardHead);
      card.appendChild(techPills);
      card.appendChild(actions);
      gridSlot.appendChild(card);
    });
  }

  function openProjectModal(project, triggerBtn) {
    if (!projectDialog) return;
    lastFocusedElement = triggerBtn || document.activeElement;

    // Populate Modal Fields
    const titleEl = document.getElementById("modal-project-title");
    const kickerEl = document.getElementById("modal-project-kicker");
    const problemEl = document.getElementById("modal-project-problem");
    const contribEl = document.getElementById("modal-project-contribution");
    const featuresList = document.getElementById("modal-project-features");
    const challengesEl = document.getElementById("modal-project-challenges");
    const learningsEl = document.getElementById("modal-project-learnings");
    const techGroup = document.getElementById("modal-project-tech");
    const actionsGroup = document.getElementById("modal-project-actions");

    if (titleEl) titleEl.textContent = project.title;
    if (kickerEl) kickerEl.textContent = `${project.category} // PROJECT DOSSIER`;
    if (problemEl) problemEl.textContent = project.problem;
    if (contribEl) contribEl.textContent = project.contribution;
    if (challengesEl) challengesEl.textContent = project.challenges;
    if (learningsEl) learningsEl.textContent = project.learnings;

    if (featuresList) {
      featuresList.innerHTML = "";
      project.features.forEach((feat) => {
        const li = el("li", null, feat);
        featuresList.appendChild(li);
      });
    }

    if (techGroup) {
      techGroup.innerHTML = "";
      project.technologies.forEach((tech) => {
        techGroup.appendChild(el("span", "tech-pill", tech));
      });
    }

    if (actionsGroup) {
      actionsGroup.innerHTML = "";
      if (project.repoUrl && project.repoUrl.startsWith("http")) {
        const repoLink = el("a", "btn btn-primary btn-sm", "View Repository on GitHub");
        repoLink.href = project.repoUrl;
        repoLink.target = "_blank";
        repoLink.rel = "noopener noreferrer";
        actionsGroup.appendChild(repoLink);
      }
      if (project.demoUrl && project.demoUrl.startsWith("http")) {
        const demoLink = el("a", "btn btn-secondary btn-sm", "Live Demo");
        demoLink.href = project.demoUrl;
        demoLink.target = "_blank";
        demoLink.rel = "noopener noreferrer";
        actionsGroup.appendChild(demoLink);
      }
    }

    if (typeof projectDialog.showModal === "function") {
      projectDialog.showModal();
    } else {
      projectDialog.setAttribute("open", "");
    }

    modalCloseBtn?.focus();
  }

  function closeProjectModal() {
    if (!projectDialog) return;
    if (typeof projectDialog.close === "function") {
      projectDialog.close();
    } else {
      projectDialog.removeAttribute("open");
    }
    if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
      lastFocusedElement.focus();
    }
  }

  function initModalEvents() {
    if (modalCloseBtn) {
      modalCloseBtn.addEventListener("click", closeProjectModal);
    }

    if (projectDialog) {
      // Backdrop click closes dialog
      projectDialog.addEventListener("click", (e) => {
        const rect = projectDialog.getBoundingClientRect();
        const isInDialog =
          rect.top <= e.clientY &&
          e.clientY <= rect.top + rect.height &&
          rect.left <= e.clientX &&
          e.clientX <= rect.left + rect.width;
        if (!isInDialog) {
          closeProjectModal();
        }
      });

      // Escape key handler
      projectDialog.addEventListener("cancel", (e) => {
        e.preventDefault();
        closeProjectModal();
      });
    }
  }

  /* ------------------------------------------------------------------
   * 5. CONTACT SECTION, EMAIL COPY & TOAST
   * ------------------------------------------------------------------ */
  const toastNotice = document.getElementById("toast-notice");
  let toastTimer = null;

  function showToast(message) {
    if (!toastNotice) return;
    const msgEl = toastNotice.querySelector(".toast-message");
    if (msgEl) msgEl.textContent = message;

    toastNotice.classList.add("is-active");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastNotice.classList.remove("is-active");
    }, 3200);
  }

  function renderContact() {
    const emailBadge = document.getElementById("contact-email-badge");
    const mailtoBtn = document.getElementById("contact-mailto-btn");
    const copyEmailBtn = document.getElementById("copy-email-btn");
    const resumeBtnSlot = document.getElementById("resume-btn-slot");
    const socialLinksList = document.getElementById("social-links-list");
    const placementObjText = document.getElementById("placement-objective-text");

    if (placementObjText && data.contact.placementObjective) {
      placementObjText.textContent = data.contact.placementObjective;
    }

    const email = data.contact.email && data.contact.email.trim();

    if (email) {
      if (emailBadge) emailBadge.textContent = email;
      if (mailtoBtn) {
        mailtoBtn.href = `mailto:${email}`;
        mailtoBtn.style.display = "inline-flex";
      }

      if (copyEmailBtn) {
        copyEmailBtn.style.display = "inline-flex";
        copyEmailBtn.addEventListener("click", () => {
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard
              .writeText(email)
              .then(() => showToast(`Copied ${email} to clipboard.`))
              .catch(() => fallbackCopy(email));
          } else {
            fallbackCopy(email);
          }
        });
      }
    } else {
      if (emailBadge) emailBadge.textContent = "Email available upon verified contact";
      if (mailtoBtn) mailtoBtn.style.display = "none";
      if (copyEmailBtn) copyEmailBtn.style.display = "none";
    }

    function fallbackCopy(text) {
      const tempInput = document.createElement("input");
      tempInput.value = text;
      document.body.appendChild(tempInput);
      tempInput.select();
      try {
        document.execCommand("copy");
        showToast(`Copied ${text} to clipboard.`);
      } catch (err) {
        showToast("Unable to copy email automatically.");
      }
      document.body.removeChild(tempInput);
    }

    // Resume Button - ONLY show if an actual URL is provided
    if (resumeBtnSlot) {
      resumeBtnSlot.innerHTML = "";
      const resumeUrl = data.contact.resumeUrl && data.contact.resumeUrl.trim();
      if (resumeUrl && resumeUrl.startsWith("http")) {
        const resumeBtn = el("a", "btn btn-primary", "View Academic Resume / CV →");
        resumeBtn.href = resumeUrl;
        resumeBtn.target = "_blank";
        resumeBtn.rel = "noopener noreferrer";
        resumeBtnSlot.appendChild(resumeBtn);
      }
    }

    // Social & Profile Links (GitHub & LinkedIn)
    if (socialLinksList) {
      socialLinksList.innerHTML = "";

      const githubUrl = data.contact.github && data.contact.github.trim();
      if (githubUrl && githubUrl.startsWith("http")) {
        const ghRow = el("a", "social-link-row");
        ghRow.href = githubUrl;
        ghRow.target = "_blank";
        ghRow.rel = "noopener noreferrer";
        ghRow.innerHTML = `<span>GitHub Profile</span><span class="arrow-icon">↗</span>`;
        socialLinksList.appendChild(ghRow);
      }

      const linkedinUrl = data.contact.linkedin && data.contact.linkedin.trim();
      if (linkedinUrl && linkedinUrl.startsWith("http")) {
        const liRow = el("a", "social-link-row");
        liRow.href = linkedinUrl;
        liRow.target = "_blank";
        liRow.rel = "noopener noreferrer";
        liRow.innerHTML = `<span>LinkedIn Profile</span><span class="arrow-icon">↗</span>`;
        socialLinksList.appendChild(liRow);
      }

      const locationRow = el("div", "social-link-row");
      locationRow.style.cursor = "default";
      locationRow.innerHTML = `<span>Location</span><span style="color: var(--text-muted); font-size: 0.78rem;">${data.contact.location || "Karnataka, India"}</span>`;
      socialLinksList.appendChild(locationRow);
    }
  }

  /* ------------------------------------------------------------------
   * 6. SCROLL REVEAL & BACK TO TOP
   * ------------------------------------------------------------------ */
  const floatingBackTop = document.getElementById("floating-back-top");
  const footerBackTop = document.getElementById("footer-back-to-top");

  function initScrollControls() {
    function scrollToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    if (floatingBackTop) {
      floatingBackTop.addEventListener("click", scrollToTop);
    }

    if (footerBackTop) {
      footerBackTop.addEventListener("click", scrollToTop);
    }

    window.addEventListener(
      "scroll",
      () => {
        if (window.scrollY > 400) {
          floatingBackTop?.classList.add("is-visible");
        } else {
          floatingBackTop?.classList.remove("is-visible");
        }
      },
      { passive: true }
    );

    // Scroll reveal observer
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!prefersReducedMotion && "IntersectionObserver" in window) {
      const revealItems = document.querySelectorAll(".reveal-item");
      const revealObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.remove("reveal-pending");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12 }
      );

      revealItems.forEach((item) => {
        item.classList.add("reveal-pending");
        revealObserver.observe(item);
      });
    }
  }

  /* ------------------------------------------------------------------
   * 7. APPLICATION INITIALIZATION
   * ------------------------------------------------------------------ */
  function init() {
    initTheme();
    initNavigation();
    renderHero();
    renderAbout();
    renderAcademics();
    renderSkills();
    renderJourney();
    renderFilterButtons();
    renderProjects();
    initModalEvents();
    renderContact();
    initScrollControls();
  }

  // Run on DOM ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
