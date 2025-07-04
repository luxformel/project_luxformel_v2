// MathJax configuration
// See: https://docs.mathjax.org/en/latest/options/index.html
window.MathJax = {
  tex: {
    inlineMath: [
      ["$", "$"],
      ["\\(", "\\)"],
    ],
    displayMath: [
      ["$$", "$$"],
      ["\\[", "\\]"],
    ],
    processEscapes: true, // Allow escaped delimiters
    processEnvironments: true, // Enable environments like align, equation, etc.
  },
  options: {
    skipHtmlTags: ["script", "noscript", "style", "textarea", "pre", "code"],
    ignoreHtmlClass: "tex2jax_ignore",
    processHtmlClass: "tex2jax_process",
  },
  chtml: {
    scale: 1.1,
    displayAlign: "center",
    displayIndent: "0em",
  },
  svg: {
    scale: 1.1,
    displayAlign: "center",
    displayIndent: "0em",
  },
  loader: {
    load: ["[tex]/ams", "[tex]/newcommand"], // Load extra TeX extensions
  },
};
