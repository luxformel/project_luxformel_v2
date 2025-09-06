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

// Add this to your settingsSelector.js or create a new file

function initBrowserThemeSetting() {
  const browserThemeToggle = document.getElementById(
    "default-browser-theme-setting"
  );
  const themeSelect = document.getElementById("theme-select");

  // Check saved preference or default to false
  const currentBrowserThemeSetting =
    localStorage.getItem("useBrowserTheme") === "true";

  // Initialize the toggle
  browserThemeToggle.checked = currentBrowserThemeSetting;

  // If browser theme is enabled, apply it immediately
  if (currentBrowserThemeSetting) {
    applyBrowserTheme();
    themeSelect.disabled = true;
  }

  // Toggle event listener
  browserThemeToggle.addEventListener("change", () => {
    const useBrowserTheme = browserThemeToggle.checked;
    localStorage.setItem("useBrowserTheme", useBrowserTheme);

    if (useBrowserTheme) {
      applyBrowserTheme();
      themeSelect.disabled = true;
    } else {
      // Revert to manually selected theme
      themeSelect.disabled = false;
      const savedTheme = localStorage.getItem("theme") || "default";
      document.getElementById("theme-set").href = `/themes/${savedTheme}.css`;
    }
  });

  // Watch for system theme changes if the setting is enabled
  const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  darkModeMediaQuery.addEventListener("change", (e) => {
    if (browserThemeToggle.checked) {
      applyBrowserTheme();
    }
  });
}

function applyBrowserTheme() {
  const themeLink = document.getElementById("theme-set");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (prefersDark) {
    themeLink.href = "/themes/dark.css";
    localStorage.setItem("theme", "dark"); // Keep theme selector in sync
  } else {
    themeLink.href = "/themes/default.css";
    localStorage.setItem("theme", "default"); // Keep theme selector in sync
  }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  initBrowserThemeSetting();

  // Modify your existing theme selector to handle the browser theme setting
  const themeSelect = document.getElementById("theme-select");
  const browserThemeToggle = document.getElementById(
    "default-browser-theme-setting"
  );

  // Load saved theme or default
  const savedTheme = localStorage.getItem("theme") || "default";
  themeSelect.value = savedTheme;

  themeSelect.addEventListener("change", () => {
    if (!browserThemeToggle.checked) {
      // Only change if not using browser theme
      const theme = themeSelect.value;
      document.getElementById("theme-set").href = `/themes/${theme}.css`;
      localStorage.setItem("theme", theme);
    }
  });
});
