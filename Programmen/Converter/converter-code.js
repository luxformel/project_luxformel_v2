var property = new Array();
var unit = new Array();
var factor = new Array();
var tempIncrement = [0, 273.15, 0, 0];

property[0] = "Beschleunigung";
unit[0] = new Array("m/s^2", "cm/s^1", "Gal", "g");
factor[0] = new Array(1, 0.01, 0.01, 9.80665);

property[1] = "Distanz";
unit[1] = new Array("m", "km", "Å", "lj", "sm", "ft", "in", "yd", "mi");
factor[1] = new Array(
  1,
  1e3,
  10e-5,
  9_460_730_472_580_800,
  1852,
  0.3048,
  0.0254,
  0.9144,
  1609.344
);

property[2] = "Druck";
unit[2] = new Array("Pa", "bar", "atm");
factor[2] = new Array(1, 1e5, 101_325);

property[3] = "Energie";
unit[3] = new Array("J", "cal", "kcal", "eV");
factor[3] = new Array(1, 4.184, 4_184, 1.602_176_634e-19);

property[4] = "Fläche";
unit[4] = new Array("m2", "ha");
factor[4] = new Array(1, 1e-4);

property[5] = "Frequenz";
unit[5] = new Array("Hz", "MHz", "GHz", "THz", "1/min");
factor[5] = new Array(1, 1_000_000, 1_000_000_000, 1_000_000_000_000, 60e-1);

property[6] = "Geschwindigkeit";
unit[6] = new Array("m/s", "km/h", "kn", "mi/h");
factor[6] = new Array(1, 1 / 3.6, 0.514444444444444444e-1, 0.447_04);

property[7] = "Masse";
unit[7] = new Array("kg", "g", "u", "t", "lb");
factor[7] = new Array(1, 1000, 1.660_539_066_605e-27, 1000, 0.4535922922);

// property[8] = "Temperatur";
// unit[8] = new Array("°C", "K", "°F");
// factor[8] = new Array(1, 1, 5 / 9);

property[8] = "Temperatur";
unit[8] = new Array("°C", "°F", "K", "°R");
factor[8] = new Array(1, 0.555555555555555555555, 1, 0.555555555555555555555);
tempIncrement = new Array(0, -32, -273.15, -491.67);

property[9] = "Winkel";
unit[9] = new Array("RAD", "DEG", "min", "s");
factor[9] = new Array(
  1,
  0.017_453_292_519_943_295,
  0.000_290_888_208_665_721_6,
  4.848_136_811_095_36e-6
);

property[10] = "Volumen";
unit[10] = new Array("m3", "dm3", "cm3", "L", "dL", "cL", "mL");
factor[10] = new Array(1, 0.1e-2, 1e-6, 0.1e-2, 1e-4, 1e-5, 1e-6);

property[11] = "Zeit";
unit[11] = new Array("s", "ms", "min", "h");
factor[11] = new Array(1, 0.001, 60, 3_600);

function UpdateUnitMenu(propMenu, unitMenu) {
  var i;
  i = propMenu.selectedIndex;
  FillMenuWithArray(unitMenu, unit[i]);
}

function FillMenuWithArray(myMenu, myArray) {
  var i;
  myMenu.length = myArray.length;
  for (i = 0; i < myArray.length; i++) {
    myMenu.options[i].text = myArray[i];
  }
}

function CalculateUnit(sourceForm, targetForm) {
  var sourceValue = sourceForm.unit_input.value;
  sourceValue = parseFloat(sourceValue);
  if (!isNaN(sourceValue) || sourceValue == 0) {
    sourceForm.unit_input.value = sourceValue;
    ConvertFromTo(sourceForm, targetForm);
  }
}

function ConvertFromTo(sourceForm, targetForm) {
  var propIndex;
  var sourceIndex;
  var sourceFactor;
  var targetIndex;
  var targetFactor;
  var result;

  propIndex = document.property_form.the_menu.selectedIndex;

  sourceIndex = sourceForm.unit_menu.selectedIndex;
  sourceFactor = factor[propIndex][sourceIndex];

  targetIndex = targetForm.unit_menu.selectedIndex;
  targetFactor = factor[propIndex][targetIndex];

  result = sourceForm.unit_input.value;

  result = sourceForm.unit_input.value;

  if (
    sourceFactor != 1 &&
    targetFactor != 1 &&
    property[propIndex] == "Temperatur"
  ) {
    result = (result * sourceFactor) / targetFactor;
    result = parseFloat(result.toPrecision(15)); // Adjust precision as needed
  } else if (property[propIndex] == "Temperatur") {
    result = parseFloat(result) + tempIncrement[sourceIndex];
    result = parseFloat(result) - tempIncrement[targetIndex];
    result = parseFloat(result.toPrecision(15)); // Adjust precision as needed
  } else {
    result = (result * sourceFactor) / targetFactor;
  }

  targetForm.unit_input.value = result; //.toFixed(5); // Round to 2 decimal places
}

window.onload = function (e) {
  FillMenuWithArray(document.property_form.the_menu, property);
  UpdateUnitMenu(document.property_form.the_menu, document.form_A.unit_menu);
  UpdateUnitMenu(document.property_form.the_menu, document.form_B.unit_menu);
};

document.querySelectorAll(".numbersonly").forEach(function (element) {
  element.addEventListener("keydown", function (event) {
    var key = event.key;
    var caretPosition = event.target.selectionStart;
    var allowedKeys = [
      "Backspace",
      "Tab",
      "Enter",
      "Escape",
      "Delete",
      "Control",
      "Command",
      "a",
      "c",
      "v",
      "Home",
      "End",
      "ArrowLeft",
      "ArrowRight",
      "ArrowUp",
      "ArrowDown",
      ".",
      "-",
    ];
    if (
      (!isNaN(parseInt(key)) && !event.shiftKey && !event.altKey) ||
      allowedKeys.includes(key) ||
      key === "e" ||
      key === "E" || // Allow "e" or "E" key
      (key === "-" && caretPosition === event.target.value.indexOf("e") + 1) ||
      (key === "-" && caretPosition === event.target.value.indexOf("E") + 1) || // Allow "-" key only after "e" or "E"
      (key === "." && event.target.value.indexOf(".") === -1) // Allow "." key if it's not already present
    ) {
      return;
    }

    event.preventDefault();
  });
  // Listen for the paste event
  element.addEventListener("paste", function (event) {
    // Get the pasted data
    var clipboardData = event.clipboardData || window.clipboardData;
    var pastedData = clipboardData.getData("text");

    // Check if pasted data contains only numbers
    if (!/^\d*\.?\d*$/.test(pastedData)) {
      event.preventDefault();
    }
  });
});
