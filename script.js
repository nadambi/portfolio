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
  lumio: {
    title: "Lumio",
    description:
      "Example concept: a lighting brand and responsive website that makes it easier to find a warm, comfortable light for every room.",
    role: "Example role: visual identity, product page design, and responsive front-end implementation.",
    technologies: "Example tools: HTML, CSS, vanilla JavaScript, and Figma.",
    highlights:
      "Example outcome: organized product choices by room and mood to make browsing feel simple and personal.",
  },
  mori: {
    title: "Mori",
    description:
      "Example concept: a gentle self-care brand and online shop focused on simple, mindful daily routines.",
    role: "Example role: brand direction, shopping experience design, and responsive front-end development.",
    technologies: "Example tools: HTML, CSS, vanilla JavaScript, and Figma.",
    highlights:
      "Example outcome: created a clear path from product discovery to care guidance in one calm experience.",
  },
  "ondo-studio": {
    title: "Ondo Studio",
    description:
      "Example concept: a portfolio website for an independent creative studio sharing its work and approach.",
    role: "Example role: content structure, visual direction, interaction design, and front-end development.",
    technologies: "Example tools: HTML, CSS, vanilla JavaScript, and Figma.",
    highlights:
      "Example outcome: brought the studio's selected work, services, and contact details into one cohesive site.",
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
