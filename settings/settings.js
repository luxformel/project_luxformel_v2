// settings.js

// Insert the link tag into the document head
let insertSettingsSheets = `
  <link
    rel="stylesheet"
    id="navigator-set"
    href="/settings/navigator/relative.css"
 
  />
  <link
    rel="stylesheet"
    id="side-nav-stylesheet"
    href="/settings/sideNavigator/on.css"
    type="text/css"
  />
  <link
    rel="stylesheet"
    id="no-max-width-stylesheet"
    href="/settings/noMaxWidth/on.css"
    type="text/css"
  />
`;
document.head.insertAdjacentHTML("beforeend", insertSettingsSheets);

// Function to activate a specific nav setting
function activateNavSetting(name) {
  const navStyleSheetLink = document.getElementById("navigator-set");
  navStyleSheetLink.setAttribute("href", `/settings/navigator/${name}.css`);
  localStorage.setItem("navSetting", name); // Save the setting to localStorage
}

// Function to set the nav setting based on saved preference or default
function setNavSetting() {
  const navigatorSetting = localStorage.getItem("navSetting") || "relative";
  activateNavSetting(navigatorSetting);
}

// Call the setNavSetting function to apply the setting on page load
setNavSetting();

// side Nav settings apply

function activateSideNavSetting(name) {
  const sideNavStylesheetLink = document.getElementById("side-nav-stylesheet");
  sideNavStylesheetLink.setAttribute(
    "href",
    `/settings/sideNavigator/${name}.css`
  );
  localStorage.setItem("sideNavSetting", name); // Save the setting to localStorage
  console.log("localStorage:", localStorage.getItem("sideNavSetting"));
}

function setSideNavSetting() {
  const sideNavigatorSetting = localStorage.getItem("sideNavSetting") || "on";
  activateSideNavSetting(sideNavigatorSetting);
}

// Initialize the side navigation setting when the page loads

setSideNavSetting();

function activateNoMaxWidth(name) {
  const noMaxWidthStylesheetLink = document.getElementById(
    "no-max-width-stylesheet"
  );
  noMaxWidthStylesheetLink.setAttribute(
    "href",
    `/settings/noMaxWidth/${name}.css`
  );
  localStorage.setItem("maxWidthSetting", name); // Save the setting to localStorage
  console.log("localStorage:", localStorage.getItem("maxWidthSetting"));
}

function setNoMaxWidthSetting() {
  const noMaxWidthSetting = localStorage.getItem("maxWidthSetting") || "on";
  activateNoMaxWidth(noMaxWidthSetting);
}

// Initialize the side navigation setting when the page loads
setNoMaxWidthSetting();
