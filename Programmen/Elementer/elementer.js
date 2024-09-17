const elements = [
  { name: "Wasserstoff", symbol: "H", atomicNumber: 1 },
  { name: "Helium", symbol: "He", atomicNumber: 2 },
  { name: "Lithium", symbol: "Li", atomicNumber: 3 },
  { name: "Beryllium", symbol: "Be", atomicNumber: 4 },
  { name: "Bor", symbol: "B", atomicNumber: 5 },
  { name: "Kohlenstoff", symbol: "C", atomicNumber: 6 },
  { name: "Stickstoff", symbol: "N", atomicNumber: 7 },
  { name: "Sauerstoff", symbol: "O", atomicNumber: 8 },
  { name: "Fluor", symbol: "F", atomicNumber: 9 },
  { name: "Neon", symbol: "Ne", atomicNumber: 10 },
  { name: "Natrium", symbol: "Na", atomicNumber: 11 },
  { name: "Magnesium", symbol: "Mg", atomicNumber: 12 },
  { name: "Aluminium", symbol: "Al", atomicNumber: 13 },
  { name: "Silizium", symbol: "Si", atomicNumber: 14 },
  { name: "Phosphor", symbol: "P", atomicNumber: 15 },
  { name: "Schwefel", symbol: "S", atomicNumber: 16 },
  { name: "Chlor", symbol: "Cl", atomicNumber: 17 },
  { name: "Argon", symbol: "Ar", atomicNumber: 18 },
  { name: "Kalium", symbol: "K", atomicNumber: 19 },
  { name: "Calcium", symbol: "Ca", atomicNumber: 20 },
  { name: "Scandium", symbol: "Sc", atomicNumber: 21 },
  { name: "Titan", symbol: "Ti", atomicNumber: 22 },
  { name: "Vanadium", symbol: "V", atomicNumber: 23 },
  { name: "Chrom", symbol: "Cr", atomicNumber: 24 },
  { name: "Mangan", symbol: "Mn", atomicNumber: 25 },
  { name: "Eisen", symbol: "Fe", atomicNumber: 26 },
  { name: "Kobalt", symbol: "Co", atomicNumber: 27 },
  { name: "Nickel", symbol: "Ni", atomicNumber: 28 },
  { name: "Kupfer", symbol: "Cu", atomicNumber: 29 },
  { name: "Zink", symbol: "Zn", atomicNumber: 30 },
  { name: "Gallium", symbol: "Ga", atomicNumber: 31 },
  { name: "Germanium", symbol: "Ge", atomicNumber: 32 },
  { name: "Arsen", symbol: "As", atomicNumber: 33 },
  { name: "Selen", symbol: "Se", atomicNumber: 34 },
  { name: "Brom", symbol: "Br", atomicNumber: 35 },
  { name: "Krypton", symbol: "Kr", atomicNumber: 36 },
  { name: "Rubidium", symbol: "Rb", atomicNumber: 37 },
  { name: "Strontium", symbol: "Sr", atomicNumber: 38 },
  { name: "Yttrium", symbol: "Y", atomicNumber: 39 },
  { name: "Zirconium", symbol: "Zr", atomicNumber: 40 },
  { name: "Niob", symbol: "Nb", atomicNumber: 41 },
  { name: "Molybdän", symbol: "Mo", atomicNumber: 42 },
  { name: "Technetium", symbol: "Tc", atomicNumber: 43 },
  { name: "Ruthenium", symbol: "Ru", atomicNumber: 44 },
  { name: "Rhodium", symbol: "Rh", atomicNumber: 45 },
  { name: "Palladium", symbol: "Pd", atomicNumber: 46 },
  { name: "Silber", symbol: "Ag", atomicNumber: 47 },
  { name: "Cadmium", symbol: "Cd", atomicNumber: 48 },
  { name: "Indium", symbol: "In", atomicNumber: 49 },
  { name: "Zinn", symbol: "Sn", atomicNumber: 50 },
  { name: "Antimon", symbol: "Sb", atomicNumber: 51 },
  { name: "Tellur", symbol: "Te", atomicNumber: 52 },
  { name: "Iod", symbol: "I", atomicNumber: 53 },
  { name: "Xenon", symbol: "Xe", atomicNumber: 54 },
  { name: "Cäsium", symbol: "Cs", atomicNumber: 55 },
  { name: "Barium", symbol: "Ba", atomicNumber: 56 },
  { name: "Lanthan", symbol: "La", atomicNumber: 57 },
  { name: "Cer", symbol: "Ce", atomicNumber: 58 },
  { name: "Praseodym", symbol: "Pr", atomicNumber: 59 },
  { name: "Neodym", symbol: "Nd", atomicNumber: 60 },
  { name: "Promethium", symbol: "Pm", atomicNumber: 61 },
  { name: "Samarium", symbol: "Sm", atomicNumber: 62 },
  { name: "Europium", symbol: "Eu", atomicNumber: 63 },
  { name: "Gadolinium", symbol: "Gd", atomicNumber: 64 },
  { name: "Terbium", symbol: "Tb", atomicNumber: 65 },
  { name: "Dysprosium", symbol: "Dy", atomicNumber: 66 },
  { name: "Holmium", symbol: "Ho", atomicNumber: 67 },
  { name: "Erbium", symbol: "Er", atomicNumber: 68 },
  { name: "Thulium", symbol: "Tm", atomicNumber: 69 },
  { name: "Ytterbium", symbol: "Yb", atomicNumber: 70 },
  { name: "Lutetium", symbol: "Lu", atomicNumber: 71 },
  { name: "Hafnium", symbol: "Hf", atomicNumber: 72 },
  { name: "Tantal", symbol: "Ta", atomicNumber: 73 },
  { name: "Wolfram", symbol: "W", atomicNumber: 74 },
  { name: "Rhenium", symbol: "Re", atomicNumber: 75 },
  { name: "Osmium", symbol: "Os", atomicNumber: 76 },
  { name: "Iridium", symbol: "Ir", atomicNumber: 77 },
  { name: "Platin", symbol: "Pt", atomicNumber: 78 },
  { name: "Gold", symbol: "Au", atomicNumber: 79 },
  { name: "Quecksilber", symbol: "Hg", atomicNumber: 80 },
  { name: "Thallium", symbol: "Tl", atomicNumber: 81 },
  { name: "Blei", symbol: "Pb", atomicNumber: 82 },
  { name: "Bismut", symbol: "Bi", atomicNumber: 83 },
  { name: "Polonium", symbol: "Po", atomicNumber: 84 },
  { name: "Astat", symbol: "At", atomicNumber: 85 },
  { name: "Radon", symbol: "Rn", atomicNumber: 86 },
  { name: "Francium", symbol: "Fr", atomicNumber: 87 },
  { name: "Radium", symbol: "Ra", atomicNumber: 88 },
  { name: "Actinium", symbol: "Ac", atomicNumber: 89 },
  { name: "Thorium", symbol: "Th", atomicNumber: 90 },
  { name: "Protactinium", symbol: "Pa", atomicNumber: 91 },
  { name: "Uran", symbol: "U", atomicNumber: 92 },
  { name: "Neptunium", symbol: "Np", atomicNumber: 93 },
  { name: "Plutonium", symbol: "Pu", atomicNumber: 94 },
  { name: "Americium", symbol: "Am", atomicNumber: 95 },
  { name: "Curium", symbol: "Cm", atomicNumber: 96 },
  { name: "Berkelium", symbol: "Bk", atomicNumber: 97 },
  { name: "Californium", symbol: "Cf", atomicNumber: 98 },
  { name: "Einsteinium", symbol: "Es", atomicNumber: 99 },
  { name: "Fermium", symbol: "Fm", atomicNumber: 100 },
  { name: "Mendelevium", symbol: "Md", atomicNumber: 101 },
  { name: "Nobelium", symbol: "No", atomicNumber: 102 },
  { name: "Lawrencium", symbol: "Lr", atomicNumber: 103 },
  { name: "Rutherfordium", symbol: "Rf", atomicNumber: 104 },
  { name: "Dubnium", symbol: "Db", atomicNumber: 105 },
  { name: "Seaborgium", symbol: "Sg", atomicNumber: 106 },
  { name: "Bohrium", symbol: "Bh", atomicNumber: 107 },
  { name: "Hassium", symbol: "Hs", atomicNumber: 108 },
  { name: "Meitnerium", symbol: "Mt", atomicNumber: 109 },
  { name: "Darmstadtium", symbol: "Ds", atomicNumber: 110 },
  { name: "Roentgenium", symbol: "Rg", atomicNumber: 111 },
  { name: "Copernicium", symbol: "Cn", atomicNumber: 112 },
  { name: "Nihonium", symbol: "Nh", atomicNumber: 113 },
  { name: "Flerovium", symbol: "Fl", atomicNumber: 114 },
  { name: "Moscovium", symbol: "Mc", atomicNumber: 115 },
  { name: "Livermorium", symbol: "Lv", atomicNumber: 116 },
  { name: "Tennessine", symbol: "Ts", atomicNumber: 117 },
  { name: "Oganesson", symbol: "Og", atomicNumber: 118 },
];

var difficulty;
var score = 0;
var randomElement;
var counter = 0;
var maxScore;

function game() {
  if (counter < maxScore) {
    switch (difficulty) {
      case "easy":
        easyGameMode();
        break;
      case "hard":
        hardGameMode();
        break;
      case "ultra":
        ultraGameMode();
        break;
      default:
        break;
    }
  } else {
    alert("Dir hutt ee Score vun: " + score);
    document.getElementById("start-button").disabled = false;
  }
  updateView();
}

function startButtonPressed() {
  var button = document.getElementById("start-button");
  button.disabled = true;
  difficulty = document.getElementById("difficulty").value;

  clearGame();

  switch (difficulty) {
    case "easy":
      maxScore = 10;
      break;
    case "hard":
      maxScore = 15;
      break;
    case "ultra":
      maxScore = 20;
      break;
    default:
      break;
  }
  document.getElementById("max-score").innerHTML = maxScore;
  game();
}
function easyGameMode() {
  randomElement = getRandomElement();
  document.getElementById("input-name").value = randomElement.name;
  document.getElementById("input-atomic-number").value =
    randomElement.atomicNumber;
}
function hardGameMode() {
  randomElement = getRandomElement();
  document.getElementById("input-symbol").value = randomElement.symbol;
  document.getElementById("input-atomic-number").value =
    randomElement.atomicNumber;
}
function ultraGameMode() {
  randomElement = getRandomElement();
  document.getElementById("input-atomic-number").value =
    randomElement.atomicNumber;
}

function checkGuess() {
  var userGuessSymbol = String(document.getElementById("input-symbol").value);
  var userGuessName = String(document.getElementById("input-name").value);
  var userGuessAtomicNumber = String(
    document.getElementById("input-atomic-number").value
  );
  var element = document.getElementById("evaluation");
  if (
    userGuessSymbol == randomElement.symbol &&
    userGuessName == randomElement.name &&
    userGuessAtomicNumber == randomElement.atomicNumber
  ) {
    score++;
    element.setAttribute("style", "color:green;");
    element.innerHTML = "Perfekt!" + "<br>";
  } else {
    element.setAttribute("style", "color:red;");
    element.innerHTML =
      "Falsch! <br> Et wuar: " +
      randomElement.symbol +
      ", " +
      randomElement.name +
      " mat der Ordnungszahl: " +
      randomElement.atomicNumber +
      "<br>";
  }

  document.getElementById("input-name").value = "";
  document.getElementById("input-symbol").value = "";
  document.getElementById("input-atomic-number").value = "";

  counter++;
  updateView();
  game();
}

// Function to select a random element from the array
function getRandomElement() {
  var element = elements[Math.floor(Math.random() * elements.length)];
  return element;
}

function updateView() {
  document.getElementById("score").innerHTML = score;
  document.getElementById("counter").innerHTML = counter;
}

function clearGame() {
  document.getElementById("score").innerHTML = 0;
  document.getElementById("counter").innerHTML = 0;

  document.getElementById("input-name").value = "";
  document.getElementById("input-symbol").value = "";
  document.getElementById("input-atomic-number").value = "";
  document.getElementById("evaluation").value = "";

  counter = 0;
  score = 0;
}
