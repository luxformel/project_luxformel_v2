function checkInputs() {
  const activeContent = document.querySelector(".content.active");
  const inputs = activeContent.querySelectorAll("input");
  let isEmpty = false;
  inputs.forEach((input) => {
    if (input.value.trim() === "") {
      isEmpty = true;
    }
  });
  return isEmpty;
}

function toggleButton() {
  const activeContent = document.querySelector(".content.active");
  const button = activeContent.querySelector("button");
  button.disabled = checkInputs();
}

function performCalculation(calculateFn, clearInputsFn) {
  if (checkInputs()) return; // Check if any input is empty
  calculateFn();
  clearInputsFn();
}

function calculateRectangle() {
  const length = parseFloat(document.getElementById("rect-length").value);
  const width = parseFloat(document.getElementById("rect-width").value);
  if (isNaN(length) || isNaN(width)) {
    document.getElementById("rect-result").innerHTML =
      "Please provide valid input for length and width.";
    return;
  }
  const area = length * width;
  const perimeter = 2 * (length + width);
  document.getElementById(
    "rect-result"
  ).innerHTML = `Area: ${area}, Perimeter: ${perimeter}`;
}

function calculateSquare() {
  const side = parseFloat(document.getElementById("square-side").value);
  if (isNaN(side)) {
    document.getElementById("square-result").innerHTML =
      "Please provide valid input for the side.";
    return;
  }
  const area = side * side;
  const perimeter = 4 * side;
  document.getElementById(
    "square-result"
  ).innerHTML = `Area: ${area}, Perimeter: ${perimeter}`;
}

function calculateCircle() {
  const radius = parseFloat(document.getElementById("circle-radius").value);
  if (isNaN(radius)) {
    document.getElementById("circle-result").innerHTML =
      "Please provide valid input for the radius.";
    return;
  }
  const area = Math.PI * radius * radius;
  const circumference = 2 * Math.PI * radius;
  document.getElementById("circle-result").innerHTML = `Area: ${area.toFixed(
    2
  )}, Circumference: ${circumference.toFixed(2)}`;
}

function calculateTriangle() {
  const base = parseFloat(document.getElementById("tri-base").value);
  const height = parseFloat(document.getElementById("tri-height").value);
  if (isNaN(base) || isNaN(height)) {
    document.getElementById("tri-result").innerHTML =
      "Please provide valid input for the base and height.";
    return;
  }
  const area = 0.5 * base * height;
  const perimeter = base + 2 * Math.sqrt((base ** 2 + 4 * area) / 2);
  document.getElementById(
    "tri-result"
  ).innerHTML = `Area: ${area}, Perimeter: ${perimeter.toFixed(2)}`;
}

function calculateSphere() {
  const radius = parseFloat(document.getElementById("sphere-radius").value);
  if (isNaN(radius)) {
    document.getElementById("sphere-result").innerHTML =
      "Please provide valid input for the radius.";
    return;
  }
  const volume = (4 / 3) * Math.PI * Math.pow(radius, 3);
  const surfaceArea = 4 * Math.PI * Math.pow(radius, 2);
  document.getElementById(
    "sphere-result"
  ).innerHTML = `Volume: ${volume.toFixed(
    2
  )}, Surface Area: ${surfaceArea.toFixed(2)}`;
}

function calculateCylinder() {
  const radius = parseFloat(document.getElementById("cylinder-radius").value);
  const height = parseFloat(document.getElementById("cylinder-height").value);
  if (isNaN(radius) || isNaN(height)) {
    document.getElementById("cylinder-result").innerHTML =
      "Please provide valid input for the radius and height.";
    return;
  }
  const volume = Math.PI * radius * radius * height;
  const surfaceArea = 2 * Math.PI * radius * (radius + height);
  document.getElementById(
    "cylinder-result"
  ).innerHTML = `Volume: ${volume.toFixed(
    2
  )}, Surface Area: ${surfaceArea.toFixed(2)}`;
}

function calculatePentagon() {
  const side = parseFloat(document.getElementById("pentagon-side").value);
  if (isNaN(side)) {
    document.getElementById("pentagon-result").innerHTML =
      "Please provide valid input for the side.";
    return;
  }
  const area = ((5 / 4) * side ** 2) / Math.tan(Math.PI / 5);
  const perimeter = 5 * side;
  document.getElementById("pentagon-result").innerHTML = `Area: ${area.toFixed(
    2
  )}, Perimeter: ${perimeter.toFixed(2)}`;
}

function calculateEllipse() {
  const a = parseFloat(document.getElementById("ellipse-a").value);
  const b = parseFloat(document.getElementById("ellipse-b").value);
  if (isNaN(a) || isNaN(b)) {
    document.getElementById("ellipse-result").innerHTML =
      "Please provide valid input for the semi-major and semi-minor axes.";
    return;
  }
  const area = Math.PI * a * b;
  const perimeter = 2 * Math.PI * Math.sqrt((a ** 2 + b ** 2) / 2);
  document.getElementById("ellipse-result").innerHTML = `Area: ${area.toFixed(
    2
  )}, Perimeter: ${perimeter.toFixed(2)}`;
}

function clearInputs(shape) {
  const inputs = document.querySelectorAll(`#${shape} input`);
  inputs.forEach((input) => {
    input.value = "";
  });
}

const tabs = document.querySelectorAll(".tab");
tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = tab.getAttribute("data-target");
    document
      .querySelectorAll(".tab")
      .forEach((tab) => tab.classList.remove("active"));
    tab.classList.add("active");
    document
      .querySelectorAll(".content")
      .forEach((content) => content.classList.remove("active"));
    document.getElementById(target).classList.add("active");
    toggleButton();
  });
});

const inputs = document.querySelectorAll("input");
inputs.forEach((input) => {
  input.addEventListener("input", () => {
    toggleButton();
  });
});

const calculationFunctions = {
  rectangle: {
    calculateFn: calculateRectangle,
    clearInputsFn: () => clearInputs("rectangle"),
  },
  square: {
    calculateFn: calculateSquare,
    clearInputsFn: () => clearInputs("square"),
  },
  circle: {
    calculateFn: calculateCircle,
    clearInputsFn: () => clearInputs("circle"),
  },
  triangle: {
    calculateFn: calculateTriangle,
    clearInputsFn: () => clearInputs("triangle"),
  },
  sphere: {
    calculateFn: calculateSphere,
    clearInputsFn: () => clearInputs("sphere"),
  },
  cylinder: {
    calculateFn: calculateCylinder,
    clearInputsFn: () => clearInputs("cylinder"),
  },
  pentagon: {
    calculateFn: calculatePentagon,
    clearInputsFn: () => clearInputs("pentagon"),
  },
  ellipse: {
    calculateFn: calculateEllipse,
    clearInputsFn: () => clearInputs("ellipse"),
  },
};

function handleCalculation(shape) {
  const { calculateFn, clearInputsFn } = calculationFunctions[shape];
  performCalculation(calculateFn, clearInputsFn);
}
