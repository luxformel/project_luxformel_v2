document.querySelectorAll(".collapsible").forEach((button) => {
  button.addEventListener("click", () => {
    button.classList.toggle("active");
    const content = button.nextElementSibling;

    // Toggle display of the content
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
});

// Ensure all content is shown by default
document.querySelectorAll(".content").forEach((content) => {
  content.style.display = "block"; // Show all content sections initially
});
