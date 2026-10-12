const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector("#site-nav");

if (menuToggle instanceof HTMLButtonElement && siteNav instanceof HTMLElement) {
  menuToggle.addEventListener("click", () => {
    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isExpanded));
    menuToggle.setAttribute("aria-label", isExpanded ? "Open navigation" : "Close navigation");
    siteNav.classList.toggle("is-open", !isExpanded);
  });

  siteNav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
      siteNav.classList.remove("is-open");
    }
  });
}

const year = document.querySelector("#year");

if (year) {
  year.textContent = String(new Date().getFullYear());
}

const projectGrid = document.querySelector(".project-grid");
const projectDialog = document.querySelector("#project-dialog");
const projectDialogTitle = document.querySelector("#project-dialog-title");
const projectDialogDescription = document.querySelector("#project-dialog-description");
const projectDialogRole = document.querySelector("#project-dialog-role");
const projectDialogTechnologies = document.querySelector("#project-dialog-technologies");
const projectDialogHighlights = document.querySelector("#project-dialog-highlights");
const projectDialogClose = document.querySelector(".project-dialog-close");

const projectDetails = {
  sprout: {
    title: "Sprout",
    description:
      "Example concept: a wellness brand and responsive website that helps people build small, mindful food habits.",
    role: "Example role: brand and interface design, responsive page layouts, and front-end implementation.",
    technologies: "Example tools: HTML, CSS, JavaScript, and Figma.",
    highlights:
      "Example outcome: brought the weekly-planning journey together in one clear, easy-to-follow flow.",
  },
  sunday: {
    title: "Sunday Studio",
    description:
      "Example concept: a calm digital home for a creative studio, designed to make its work easy to explore.",
    role: "Example role: content structure, visual direction, interaction design, and responsive development.",
    technologies: "Example tools: HTML, CSS, JavaScript, and Figma.",
    highlights:
      "Example outcome: created a consistent browsing experience across the studio's work and service pages.",
  },
  fieldnotes: {
    title: "Fieldnotes",
    description:
      "Example concept: a pocket-guide brand and website for discovering thoughtful outdoor routes.",
    role: "Example role: visual identity, information design, page layouts, and front-end development.",
    technologies: "Example tools: HTML, CSS, JavaScript, and Figma.",
    highlights:
      "Example outcome: made route information easier to scan with a reusable, guide-focused page structure.",
  },
  "common-ground": {
    title: "Common Ground",
    description:
      "Example concept: a neighborhood platform that helps local people find nearby events and places.",
    role: "Example role: product design, interface prototyping, responsive layouts, and front-end development.",
    technologies: "Example tools: HTML, CSS, JavaScript, and Figma.",
    highlights:
      "Example outcome: organized community updates and local listings in one approachable experience.",
  },
};

if (
  projectGrid instanceof HTMLElement &&
  projectDialog instanceof HTMLDialogElement &&
  projectDialogTitle instanceof HTMLElement &&
  projectDialogDescription instanceof HTMLElement &&
  projectDialogRole instanceof HTMLElement &&
  projectDialogTechnologies instanceof HTMLElement &&
  projectDialogHighlights instanceof HTMLElement &&
  projectDialogClose instanceof HTMLButtonElement
) {
  let lastFocusedProject = null;

  // Fill in the example details and open the modal for the selected card.
  const openProjectDetails = (projectCard) => {
    const project = projectDetails[projectCard.dataset.project];

    if (!project) {
      console.error("No example details found for this project card.");
      return;
    }

    projectDialogTitle.textContent = project.title;
    projectDialogDescription.textContent = project.description;
    projectDialogRole.textContent = project.role;
    projectDialogTechnologies.textContent = project.technologies;
    projectDialogHighlights.textContent = project.highlights;
    lastFocusedProject = projectCard;
    projectDialog.showModal();
    projectDialogClose.focus();
  };

  // Close the modal and return keyboard focus to the card that opened it.
  const closeProjectDetails = () => {
    if (projectDialog.open) {
      projectDialog.close();
    }
  };

  projectGrid.addEventListener("click", (event) => {
    if (!(event.target instanceof Element)) {
      return;
    }

    const projectCard = event.target.closest(".project-card");

    if (projectCard instanceof HTMLElement && projectGrid.contains(projectCard)) {
      openProjectDetails(projectCard);
    }
  });

  projectGrid.addEventListener("keydown", (event) => {
    if (
      event.key !== "Enter" &&
      event.key !== " "
    ) {
      return;
    }

    if (!(event.target instanceof Element)) {
      return;
    }

    const projectCard = event.target.closest(".project-card");

    if (projectCard instanceof HTMLElement && projectGrid.contains(projectCard)) {
      event.preventDefault();
      openProjectDetails(projectCard);
    }
  });

  projectDialogClose.addEventListener("click", closeProjectDetails);

  projectDialog.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      closeProjectDetails();
    }
  });

  projectDialog.addEventListener("click", (event) => {
    if (event.target === projectDialog) {
      closeProjectDetails();
    }
  });

  projectDialog.addEventListener("close", () => {
    lastFocusedProject?.focus();
    lastFocusedProject = null;
  });
}
