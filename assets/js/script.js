"use strict";

/**
 * Toggles .active class on the passed element
 */
const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
};

// ========== SIDEBAR TOGGLE FOR MOBILE ==========
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

if (sidebar && sidebarBtn) {
  sidebarBtn.addEventListener("click", function () {
    elementToggleFunc(sidebar);
  });
}

// ========== TESTIMONIALS MODAL ==========
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// Modal elements
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

/**
 * Toggles .active class on the testimonials modal & overlay
 */
const testimonialsModalFunc = function () {
  if (modalContainer && overlay) {
    modalContainer.classList.toggle("active");
    overlay.classList.toggle("active");
  }
};

// Open testimonials modal
if (testimonialsItem && testimonialsItem.length > 0) {
  for (let i = 0; i < testimonialsItem.length; i++) {
    testimonialsItem[i].addEventListener("click", function () {
      const avatar = this.querySelector("[data-testimonials-avatar]");
      const title = this.querySelector("[data-testimonials-title]");
      const text = this.querySelector("[data-testimonials-text]");

      if (modalImg && avatar) {
        modalImg.src = avatar.src;
        modalImg.alt = avatar.alt;
      }
      if (modalTitle && title) {
        modalTitle.innerHTML = title.innerHTML;
      }
      if (modalText && text) {
        modalText.innerHTML = text.innerHTML;
      }
      testimonialsModalFunc();
    });
  }
}

// Close modal
if (modalCloseBtn) {
  modalCloseBtn.addEventListener("click", testimonialsModalFunc);
}
if (overlay) {
  overlay.addEventListener("click", testimonialsModalFunc);
}

// ========== CUSTOM SELECT & PROJECT FILTERING ==========
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter-item]");

// Toggle select dropdown
if (select) {
  select.addEventListener("click", function () {
    elementToggleFunc(this);
  });
}

/**
 * Show/hide projects based on selected category
 *
 * @param {string} selectedValue - e.g. "all", "personal projects", "academic projects"
 */
const filterFunc = function (selectedValue) {
  if (!filterItems || filterItems.length === 0) {
    console.warn("No filter items found.");
    return;
  }

  for (let i = 0; i < filterItems.length; i++) {
    const item = filterItems[i];
    // Get the category from data-category, e.g. "personal projects"
    const itemCategory = item.dataset.category ? item.dataset.category.toLowerCase() : "";

    if (selectedValue === "all") {
      // Show everything
      item.classList.add("active");
    } else if (selectedValue === itemCategory) {
      // Show matches
      item.classList.add("active");
    } else {
      // Hide non-matches
      item.classList.remove("active");
    }
  }
};

// Dropdown items (for small screens)
if (selectItems && selectItems.length > 0) {
  for (let i = 0; i < selectItems.length; i++) {
    selectItems[i].addEventListener("click", function () {
      let selectedValue = this.innerText.trim().toLowerCase();

      if (selectValue) {
        selectValue.innerText = this.innerText;
      }
      if (select) {
        // Close the dropdown
        elementToggleFunc(select);
      }
      // Filter projects
      filterFunc(selectedValue);
    });
  }
}

// Filter buttons (for large screens)
let lastClickedBtn = null;
if (filterBtn && filterBtn.length > 0) {
  // Initialize the first button as "active"
  lastClickedBtn = filterBtn[0];
  lastClickedBtn.classList.add("active");

  for (let i = 0; i < filterBtn.length; i++) {
    filterBtn[i].addEventListener("click", function () {
      let selectedValue = this.innerText.trim().toLowerCase();

      // Sync select label, if present
      if (selectValue) {
        selectValue.innerText = this.innerText;
      }

      // Run the filtering
      filterFunc(selectedValue);

      // Toggle button states
      if (lastClickedBtn) {
        lastClickedBtn.classList.remove("active");
      }
      this.classList.add("active");
      lastClickedBtn = this;
    });
  }
}

// ========== CONTACT FORM HANDLING ==========
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

if (form && formInputs && formBtn) {
  // Enable/disable button based on validity
  for (let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener("input", function () {
      if (form.checkValidity()) {
        formBtn.removeAttribute("disabled");
      } else {
        formBtn.setAttribute("disabled", "");
      }
    });
  }

  // On form submission
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    formBtn.setAttribute("disabled", "");

    const formData = new FormData(form);

    fetch(form.action, {
      method: "POST",
      body: formData,
      headers: {
        "Accept": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          alert("Thank you for your message! I'll get back to you soon.");
          form.reset();
        } else {
          throw new Error("Form submission failed");
        }
      })
      .catch((error) => {
        alert("Sorry, there was an error sending your message. Please try again later.");
        console.error("Form submission error:", error);
      })
      .finally(() => {
        formBtn.removeAttribute("disabled");
      });
  });
}

// ========== PAGE NAVIGATION ==========
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

if (navigationLinks && navigationLinks.length > 0 && pages && pages.length > 0) {
  navigationLinks.forEach((navLink, index) => {
    navLink.addEventListener("click", function () {
      const currentPage = this.innerHTML.trim().toLowerCase();

      pages.forEach((page, j) => {
        if (page.dataset.page === currentPage) {
          page.classList.add("active");
          // Also highlight the corresponding nav
          if (navigationLinks[j]) {
            navigationLinks[j].classList.add("active");
          }
        } else {
          page.classList.remove("active");
          if (navigationLinks[j]) {
            navigationLinks[j].classList.remove("active");
          }
        }
      });
      // Scroll to top whenever a new page is activated
      window.scrollTo(0, 0);
    });
  });
} else {
  console.warn("Navigation elements not found. Check your HTML structure.");
}

// ========== PROJECT DETAILS MODAL (for Portfolio items) ==========
const projectModal = document.querySelector("[data-project-modal]");
const projectLinksArr = Array.from(document.querySelectorAll(".project-link"));

if (projectModal) {
  const projectOverlay = projectModal.querySelector("[data-overlay]");
  const projectCloseBtn = projectModal.querySelector("[data-project-modal-close-btn]");
  const projectModalImg = projectModal.querySelector("[data-project-modal-img]");
  const projectModalTitle = projectModal.querySelector("[data-project-modal-title]");
  const projectModalBlurb = projectModal.querySelector("[data-project-modal-blurb]");
  const projectModalTech = projectModal.querySelector("[data-project-modal-tech]");
  const projectModalPrevBtn = projectModal.querySelector("[data-project-modal-prev-btn]");
  const projectModalNextBtn = projectModal.querySelector("[data-project-modal-next-btn]");
  const linksContainer = projectModal.querySelector("[data-project-modal-links]");

  let currentProjectIndex = 0;

  const projectModalToggleFunc = function (forceOpen) {
    if (forceOpen === true) {
      projectModal.classList.add("active");
      projectOverlay.classList.add("active");
    } else {
      projectModal.classList.toggle("active");
      projectOverlay.classList.toggle("active");
    }
  };

  // Open and populate project modal
  function openProjectModal(index) {
    currentProjectIndex = index;
    const projectDataString = projectLinksArr[index].getAttribute("data-project");
    if (!projectDataString) return;
    const projectData = JSON.parse(projectDataString);

    // Populate modal
    if (projectModalImg) {
      projectModalImg.src = projectData.img;
      projectModalImg.alt = projectData.title;
    }
    if (projectModalTitle) {
      projectModalTitle.textContent = projectData.title;
    }
    if (projectModalBlurb) {
      projectModalBlurb.innerHTML = `
        <strong>Project Description:</strong> 
        <span style="margin-left: 1em;">${projectData.blurb}</span>`;
    }
    if (projectModalTech) {
      projectModalTech.innerHTML = `
        <strong>Technologies:</strong> 
        <span style="margin-left: 1em;">${projectData.tech}</span>`;
    }

    // Handle multiple links, if any
    if (linksContainer) {
      linksContainer.innerHTML = "";
      if (Array.isArray(projectData.links) && projectData.links.length > 0) {
        linksContainer.style.display = "flex";
        projectData.links.forEach((linkObj) => {
          const a = document.createElement("a");
          a.href = linkObj.url;
          a.textContent = linkObj.btnText || "Visit Project";
          a.target = "_blank";
          a.classList.add("modal-project-link");
          linksContainer.appendChild(a);
        });
      } else {
        linksContainer.style.display = "none";
      }
    }

    // Finally open the modal
    projectModalToggleFunc(true);
  }

  // Click handler for each project link
  projectLinksArr.forEach((link, index) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      openProjectModal(index);
    });
  });

  // Prev/Next Arrows
  if (projectModalPrevBtn) {
    projectModalPrevBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      currentProjectIndex = (currentProjectIndex - 1 + projectLinksArr.length) % projectLinksArr.length;
      openProjectModal(currentProjectIndex);
    });
  }
  if (projectModalNextBtn) {
    projectModalNextBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      currentProjectIndex = (currentProjectIndex + 1) % projectLinksArr.length;
      openProjectModal(currentProjectIndex);
    });
  }

  // Close modal on overlay or close btn
  if (projectCloseBtn) {
    projectCloseBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      projectModalToggleFunc();
    });
  }
  if (projectOverlay) {
    projectOverlay.addEventListener("click", function (e) {
      e.stopPropagation();
      projectModalToggleFunc();
    });
  }
} else {
  console.warn("Project modal container not found. Please check your HTML.");
}
