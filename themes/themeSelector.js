function initThemeSelector() {
  const themeSelect = document.getElementById("theme-select");
  const themeStylesheetLink = document.getElementById("theme-set");
  const currentTheme = localStorage.getItem("theme") || "default";

  function activateTheme(themeName) {
    themeStylesheetLink.setAttribute("href", `/themes/${themeName}.css`);
  }

  themeSelect.addEventListener("change", () => {
    activateTheme(themeSelect.value);
    localStorage.setItem("theme", themeSelect.value);
  });
  themeSelect.value = currentTheme;
  activateTheme(currentTheme);
}

initThemeSelector();
