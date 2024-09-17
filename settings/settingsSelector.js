function initThemeSelector() {
  const navSettingSelect = document.getElementById("navigator-select");
  const navSettingSelectStylesheetLink =
    document.getElementById("navigator-set");
  const currentNavSetting = localStorage.getItem("navSetting") || "relative";

  function activateNavSetting(name) {
    navSettingSelectStylesheetLink.setAttribute(
      "href",
      `/settings/navigator/${name}.css`
    );
  }

  navSettingSelect.addEventListener("change", () => {
    activateNavSetting(navSettingSelect.value);
    localStorage.setItem("navSetting", navSettingSelect.value);
  });
  navSettingSelect.value = currentNavSetting;
  activateNavSetting(currentNavSetting);
  console.log(currentNavSetting);
}

initThemeSelector();

// side nav apply code

function initSideNavToggle() {
  const sideNavToggle = document.getElementById("side-nav-toggle");
  const sideNavStylesheetLink = document.getElementById("side-nav-stylesheet");
  const currentSideNavSetting = localStorage.getItem("sideNavSetting") || "on";

  function activateSideNavSetting(setting) {
    sideNavStylesheetLink.setAttribute(
      "href",
      `/settings/sideNavigator/${setting}.css`
    );
  }

  // Initialize the toggle based on the stored setting
  sideNavToggle.checked = currentSideNavSetting === "on";
  activateSideNavSetting(currentSideNavSetting);

  sideNavToggle.addEventListener("change", () => {
    const newSetting = sideNavToggle.checked ? "on" : "off";
    activateSideNavSetting(newSetting);
    localStorage.setItem("sideNavSetting", newSetting);
    console.log(newSetting); // Log the new setting instead of the old one
  });
}

initSideNavToggle();

// no max width apply code

function initNoMaxWidthToggle() {
  const noMaxWidthToggle = document.getElementById("no-max-width-toggle");
  const noMaxWidthStylesheetLink = document.getElementById(
    "no-max-width-stylesheet"
  );
  const currentNoMaxWidthSetting =
    localStorage.getItem("maxWidthSetting") || "on";

  function activateNoMaxWidthSetting(setting) {
    noMaxWidthStylesheetLink.setAttribute(
      "href",
      `/settings/noMaxWidth/${setting}.css`
    );
  }

  // Initialize the toggle based on the stored setting
  noMaxWidthToggle.checked = currentNoMaxWidthSetting === "on";
  activateNoMaxWidthSetting(currentNoMaxWidthSetting);

  noMaxWidthToggle.addEventListener("change", () => {
    const newWidthSetting = noMaxWidthToggle.checked ? "on" : "off";
    activateNoMaxWidthSetting(newWidthSetting);
    localStorage.setItem("maxWidthSetting", newWidthSetting);
    console.log(newWidthSetting); // Log the new setting instead of the old one
  });
}

initNoMaxWidthToggle();

function noSplashTextsToggle() {
  // Get the checkbox element
  const checkbox = document.getElementById("no-splash-text");

  // Check if the value exists in localStorage, if not set default to true (checked)
  const savedSetting = localStorage.getItem("showSplashText");

  // Set the checkbox based on the saved setting
  if (savedSetting !== null) {
    checkbox.checked = JSON.parse(savedSetting);
  } else {
    checkbox.checked = true; // Default state
  }

  // Add event listener to update localStorage when checkbox is toggled
  checkbox.addEventListener("change", function () {
    localStorage.setItem("showSplashText", checkbox.checked);
    console.log("showSplashText: " + localStorage.getItem("showSplashText"));
  });
}
noSplashTextsToggle();

document.addEventListener("DOMContentLoaded", () => {
  const selectElement = document.getElementById("font-select");

  // Load the saved font preference from localStorage
  const savedFont = localStorage.getItem("font");
  if (savedFont) {
    applyFont(savedFont);
    selectElement.value = savedFont;
  }

  selectElement.addEventListener("change", (event) => {
    const font = event.target.value;
    if (font !== "none") {
      localStorage.setItem("font", font);
      applyFont(font);
    } else {
      localStorage.removeItem("font");
      removeFont();
    }
  });

  function applyFont(font) {
    let linkElement = document.getElementById("font-style");
    if (linkElement) {
      linkElement.href = `/settings/fonts/${font}.css`; // Update the href to point to the new CSS
    } else {
      linkElement = document.createElement("link");
      linkElement.id = "font-style";
      linkElement.rel = "stylesheet";
      linkElement.href = `/settings/fonts/${font}.css`; // Add the new CSS file
      document.head.appendChild(linkElement);
    }
  }

  function removeFont() {
    const linkElement = document.getElementById("font-style");
    if (linkElement) {
      document.head.removeChild(linkElement);
    }
  }
});
