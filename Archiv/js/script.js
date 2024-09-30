function toggleNav() {
  const sideNav = document.getElementById("side-nav");

  // If the sidebar is currently open, close it
  if (sideNav.style.width === "250px") {
    sideNav.style.width = "0";
  }
  // Otherwise, open it
  else {
    sideNav.style.width = "250px";
  }
}

// Function to reset the sidebar based on screen size
function checkScreenSize() {
  const sideNav = document.getElementById("side-nav");
  const mainContent = document.getElementById("main-content");
  const screenWidth = window.innerWidth;

  if (screenWidth > 916) {
    // For larger screens, make sure the sidebar is visible
    sideNav.style.width = "250px";
    sideNav.style.marginTop = "80px";
    mainContent.style.marginLeft = "250px";
  } else {
    // For smaller screens, hide the sidebar by default
    sideNav.style.width = "0";
    mainContent.style.marginLeft = "0";
  }
}

// Event listener for window resize
window.addEventListener("resize", checkScreenSize);

// Ensure the correct state on page load
window.onload = checkScreenSize;
