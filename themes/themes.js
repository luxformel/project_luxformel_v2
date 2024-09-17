const currentTheme = localStorage.getItem("theme") || "default";
const themeStylesheetLink = document.getElementById("theme-set");

function activateTheme(themeName) {
  themeStylesheetLink.setAttribute("href", `/themes/${themeName}.css`);
}
function setTheme() {
  activateTheme(currentTheme);
}
setTheme();
