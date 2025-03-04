

'use strict';

// element toggle function
const elementToggleFunc = function (elem) { 
  elem.classList.toggle("active"); 
}

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { 
  elementToggleFunc(sidebar); 
});


// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variables for testimonials
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function for testimonials
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all testimonials modal items
for (let i = 0; i < testimonialsItem.length; i++) {
  testimonialsItem[i].addEventListener("click", function () {
    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;
    testimonialsModalFunc();
  });
}

// add click event to testimonials modal close button and overlay
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);


// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]");

const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { 
  elementToggleFunc(this); 
});

// add event to all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
}

// add event to all filter button items for lartionLinks.length > 0 && pages.lengthge screens
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);
    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}


// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input fields
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {
    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
}


const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

navigationLinks.forEach((navLink, index) => {
  navLink.addEventListener("click", function () {
    pages.forEach((page, j) => {
      if (this.innerHTML.trim().toLowerCase() === page.dataset.page) {
        page.classList.add("active");
        navigationLinks[j].classList.add("active");
      } else {
        page.classList.remove("active");
        navigationLinks[j].classList.remove("active");
      }
    });
    window.scrollTo(0, 0);
  });
});



// ... [existing code above remains unchanged] ...

/*---------------------------------------------
   New Project Details Modal Functionality
---------------------------------------------*/
// Build an array of all project links
const projectLinksArr = Array.from(document.querySelectorAll(".project-link"));

// Select project modal elements – ensure these exist in your HTML!
const projectModal = document.querySelector("[data-project-modal]");
if (!projectModal) {
  console.warn("Project modal container not found. Please check your HTML.");
}
const projectOverlay = projectModal ? projectModal.querySelector("[data-overlay]") : null;
const projectCloseBtn = projectModal ? projectModal.querySelector("[data-project-modal-close-btn]") : null;
const projectModalImg = projectModal ? projectModal.querySelector("[data-project-modal-img]") : null;
const projectModalTitle = projectModal ? projectModal.querySelector("[data-project-modal-title]") : null;
const projectModalBlurb = projectModal ? projectModal.querySelector("[data-project-modal-blurb]") : null;
const projectModalTech = projectModal ? projectModal.querySelector("[data-project-modal-tech]") : null;
const projectModalLink = projectModal ? projectModal.querySelector("[data-project-modal-link]") : null;

// Arrow buttons – ensure these exist in your HTML as well!
const projectModalPrevBtn = projectModal ? projectModal.querySelector("[data-project-modal-prev-btn]") : null;
const projectModalNextBtn = projectModal ? projectModal.querySelector("[data-project-modal-next-btn]") : null;

if (!projectCloseBtn) {
  console.warn("Project modal close (X) button not found. Please add an element with data-project-modal-close-btn.");
}
if (!projectModalPrevBtn) {
  console.warn("Project modal previous arrow button not found. Please add an element with data-project-modal-prev-btn.");
}
if (!projectModalNextBtn) {
  console.warn("Project modal next arrow button not found. Please add an element with data-project-modal-next-btn.");
}

// Track the current project index
let currentProjectIndex = 0;

// Move the toggle function to global scope so it's accessible everywhere.
const projectModalToggleFunc = function (forceOpen) {
  if (forceOpen === true) {
    projectModal.classList.add("active");
    projectOverlay.classList.add("active");
  } else {
    projectModal.classList.toggle("active");
    projectOverlay.classList.toggle("active");
  }
};

// Function to open and populate project modal by index
function openProjectModal(index) {
  currentProjectIndex = index;
  const projectData = JSON.parse(projectLinksArr[index].getAttribute("data-project"));
  
  // Populate image, title, blurb, and tech info as before
  if (projectModalImg) {
    projectModalImg.src = projectData.img;
    projectModalImg.alt = projectData.title;
  }
  if (projectModalTitle) {
    projectModalTitle.textContent = projectData.title;
  }
  if (projectModalBlurb) {
    projectModalBlurb.innerHTML = `<strong>Project Description:</strong> <span style="margin-left: 1em;">${projectData.blurb}</span>`;
  }
  if (projectModalTech) {
    projectModalTech.innerHTML = `<strong>Technologies:</strong> <span style="margin-left: 1em;">${projectData.tech}</span>`;
  }
  
  // Handle the links: if projectData.links exists and is an array, create buttons for each
  const linksContainer = projectModal.querySelector("[data-project-modal-links]");
  if (linksContainer) {
    // Clear previous links
    linksContainer.innerHTML = "";
    
    if (projectData.links && Array.isArray(projectData.links) && projectData.links.length > 0) {
      // Ensure the container is visible
      linksContainer.style.display = "flex";
      
      projectData.links.forEach(linkObj => {
        // Create a new anchor element for each link
        const a = document.createElement("a");
        a.href = linkObj.url;
        a.textContent = linkObj.btnText || "Visit Project";
        a.target = "_blank";
        a.classList.add("modal-project-link");
        // Append to the container
        linksContainer.appendChild(a);
      });
    } else {
      // If no links are provided, hide the container
      linksContainer.style.display = "none";
    }
  }
  
  // Open the modal (force open)
  projectModalToggleFunc(true);
}

// Attach event listener to each project link
projectLinksArr.forEach((link, index) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    openProjectModal(index);
  });
});

// Arrow button event listeners
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

// Close project modal on clicking close button or overlay
if (projectCloseBtn) {
  projectCloseBtn.addEventListener("click", function(e) {
    e.stopPropagation();
    projectModalToggleFunc();
  });
}
if (projectOverlay) {
  projectOverlay.addEventListener("click", function(e) {
    e.stopPropagation();
    projectModalToggleFunc();
  });
}