/* ==========================================================
   Maximino Phiri - Student Portfolio
   All JavaScript features for Activity 3
   1. Contact form validation and preview (compulsory)
   2. Expandable project details
   3. Photo gallery viewer (Previous / Next)
   4. Dark / light theme switch
   5. Project search and category filter
   6. Corner menu (open / close)
   ========================================================== */

/* ---------- Feature 1: Contact form validation and preview ---------- */

const form = document.getElementById("contact-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const topicSelect = document.getElementById("topic");
const messageInput = document.getElementById("message");
const preview = document.getElementById("form-preview");

// Simple pattern: text, then @, then text, then a dot, then text (no spaces)
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Shows an error message under a field and marks the field as invalid
function showError(input, message) {
    const errorBox = document.getElementById(input.id + "-error");
    errorBox.textContent = message;
    input.classList.add("invalid");
    input.setAttribute("aria-invalid", "true");
}

// Clears the error message of a field
function clearError(input) {
    const errorBox = document.getElementById(input.id + "-error");
    errorBox.textContent = "";
    input.classList.remove("invalid");
    input.removeAttribute("aria-invalid");
}

// Checks all three fields. Returns true only when everything is valid.
function validateForm() {
    let isValid = true;
    let firstInvalid = null;

    // Name: reject empty or spaces-only text
    if (nameInput.value.trim() === "") {
        showError(nameInput, "Please enter your name (spaces only is not allowed).");
        firstInvalid = firstInvalid || nameInput;
        isValid = false;
    } else {
        clearError(nameInput);
    }

    // Email: reject empty or wrongly formatted addresses
    if (!emailPattern.test(emailInput.value.trim())) {
        showError(emailInput, "Please enter a valid email, for example name@example.com.");
        firstInvalid = firstInvalid || emailInput;
        isValid = false;
    } else {
        clearError(emailInput);
    }

    // Message: reject empty or spaces-only text
    if (messageInput.value.trim() === "") {
        showError(messageInput, "Please type a message (spaces only is not allowed).");
        firstInvalid = firstInvalid || messageInput;
        isValid = false;
    } else {
        clearError(messageInput);
    }

    // Move the cursor to the first problem so the visitor can fix it
    if (firstInvalid) {
        firstInvalid.focus();
    }

    return isValid;
}

// Builds one line of the preview using textContent (safe for user text)
function addPreviewLine(label, value) {
    const line = document.createElement("p");
    const strong = document.createElement("strong");
    strong.textContent = label + " ";
    const text = document.createElement("span");
    text.textContent = value;
    line.appendChild(strong);
    line.appendChild(text);
    preview.appendChild(line);
}

// Shows the validated data on the page (nothing is sent anywhere)
function showPreview() {
    preview.textContent = "";

    const heading = document.createElement("h3");
    heading.textContent = "Form validated successfully";
    preview.appendChild(heading);

    const note = document.createElement("p");
    note.textContent = "Your data was validated in the browser. No message was sent or delivered.";
    preview.appendChild(note);

    addPreviewLine("Name:", nameInput.value.trim());
    addPreviewLine("Email:", emailInput.value.trim());
    addPreviewLine("Topic:", topicSelect.value);
    addPreviewLine("Message:", messageInput.value.trim());

    preview.hidden = false;
}

// Runs when the form is submitted
form.addEventListener("submit", function (event) {
    event.preventDefault(); // keep everything local, no page reload

    if (validateForm()) {
        showPreview();
    } else {
        preview.hidden = true;
        preview.textContent = "";
    }
});

/* ---------- Feature 2: Expandable project details ---------- */

const toggleButtons = document.querySelectorAll(".toggle-button");

// Opens or closes the details that belong to the clicked button
function toggleDetails(button) {
    const details = document.getElementById(button.getAttribute("aria-controls"));
    const isOpen = button.getAttribute("aria-expanded") === "true";

    if (isOpen) {
        details.hidden = true;
        button.setAttribute("aria-expanded", "false");
        button.textContent = "Show Details";
    } else {
        details.hidden = false;
        button.setAttribute("aria-expanded", "true");
        button.textContent = "Hide Details";
    }
}

toggleButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        toggleDetails(button);
    });
});

/* ---------- Feature 3: Photo gallery viewer ---------- */

const galleryItems = document.querySelectorAll(".gallery-item");
const prevButton = document.getElementById("prev-photo");
const nextButton = document.getElementById("next-photo");
const photoCounter = document.getElementById("photo-counter");
let currentPhoto = 0;

// Shows only the photo at the given position and updates the counter
function showPhoto(index) {
    galleryItems.forEach(function (item, position) {
        item.hidden = position !== index;
    });
    photoCounter.textContent = "Photo " + (index + 1) + " of " + galleryItems.length;
}

// Next: after the last photo, go back to the first
nextButton.addEventListener("click", function () {
    currentPhoto = (currentPhoto + 1) % galleryItems.length;
    showPhoto(currentPhoto);
});

// Previous: before the first photo, go to the last
prevButton.addEventListener("click", function () {
    currentPhoto = (currentPhoto - 1 + galleryItems.length) % galleryItems.length;
    showPhoto(currentPhoto);
});

showPhoto(currentPhoto);

/* ---------- Feature 4: Dark / light theme switch ---------- */

const themeButton = document.getElementById("theme-toggle");
const themeIcon = themeButton.querySelector(".theme-icon");
const themeLabel = themeButton.querySelector(".theme-label");

// Applies the chosen theme (light is the default) and updates the button
function applyTheme(isDark) {
    document.body.classList.toggle("dark-theme", isDark);
    themeIcon.textContent = isDark ? "☀️" : "🌙";
    themeLabel.textContent = isDark ? "Light Mode" : "Dark Mode";
    themeButton.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
}

// Load a saved preference if there is one (saving is optional, so errors are ignored)
try {
    applyTheme(localStorage.getItem("portfolio-theme-v2") === "dark");
} catch (error) {
    applyTheme(false);
}

themeButton.addEventListener("click", function () {
    const makeDark = !document.body.classList.contains("dark-theme");
    applyTheme(makeDark);
    try {
        localStorage.setItem("portfolio-theme-v2", makeDark ? "dark" : "light");
    } catch (error) {
        // Storage not available: the theme still works for this visit
    }
});

/* ---------- Feature 5: Project search and category filter ---------- */

const projectCards = document.querySelectorAll(".project-card");
const searchInput = document.getElementById("project-search");
const categoryButtons = document.querySelectorAll(".pill");
const resetButton = document.getElementById("reset-filters");
const filterStatus = document.getElementById("filter-status");
const noResults = document.getElementById("no-results");
let activeCategory = "all";

// Shows only the cards that match the chosen category and the search words
function applyFilters() {
    const query = searchInput.value.trim().toLowerCase();
    let visibleCount = 0;

    projectCards.forEach(function (card) {
        const categories = card.dataset.category.split(" ");
        const searchableText = (
            card.querySelector("h3").textContent + " " +
            card.querySelector(".project-summary").textContent + " " +
            card.dataset.category
        ).toLowerCase();

        const matchesCategory = activeCategory === "all" || categories.includes(activeCategory);
        const matchesText = searchableText.includes(query);
        const show = matchesCategory && matchesText;

        card.hidden = !show;
        if (show) {
            visibleCount++;
        }
    });

    // Useful message when nothing matches
    noResults.hidden = visibleCount !== 0;
    filterStatus.textContent = "Showing " + visibleCount + " of " + projectCards.length + " projects";
}

// Marks the chosen category button as pressed
function setActiveCategory(category) {
    activeCategory = category;
    categoryButtons.forEach(function (button) {
        button.setAttribute("aria-pressed", String(button.dataset.filter === category));
    });
}

categoryButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        setActiveCategory(button.dataset.filter);
        applyFilters();
    });
});

// Filter while typing
searchInput.addEventListener("input", function () {
    setActiveCategory("all"); // search looks at every skill
    applyFilters();
});

// Reset: show everything again
resetButton.addEventListener("click", function () {
    searchInput.value = "";
    setActiveCategory("all");
    applyFilters();
});

applyFilters();

/* ---------- Feature 6: Corner menu ---------- */

const menuButton = document.getElementById("menu-toggle");
const siteMenu = document.getElementById("site-menu");

// Opens or closes the menu and updates the button state
function setMenu(open) {
    siteMenu.hidden = !open;
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "Close menu" : "Open menu");
}

menuButton.addEventListener("click", function () {
    setMenu(siteMenu.hidden);
});

// Close the menu after choosing a link
siteMenu.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
        setMenu(false);
    });
});

// Close the menu with the Escape key
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && !siteMenu.hidden) {
        setMenu(false);
        menuButton.focus();
    }
});

// Close the menu when clicking anywhere outside it
document.addEventListener("click", function (event) {
    if (!siteMenu.hidden && !siteMenu.contains(event.target) && !menuButton.contains(event.target)) {
        setMenu(false);
    }
});