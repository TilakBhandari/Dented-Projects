let display = document.querySelector(".display span"); // selecting the display
let displayArea = document.querySelector(".display"); // to apply erroe background.

display.innerText = ""; // giving default value to display.

//--------------function to display the inputs.-------

function ToDisplay(btn) {
  if (display.innerText == "ERROR") {
    ac();
  }
  display.innerText += `${btn}`;
}

// --------------Function for AC---------

function ac() {
  display.innerText = ""; //reset value back to default.
  displayArea.classList.remove("error"); // remove the error class
}

// --------------Function for C----------------------

function c() {
  display.innerText = display.innerText.slice(0, -1);
}

const nonrepeat = ["/", "+", "*", "-"]; // array of list of operand.

let len = display.innerText.length;

// ----------Function for appending operator and their behaviour to display.--------------------

function operator(ope) {
  if (display.innerText == "ERROR") {
    // to clear the display, if it is in error class.
    ac();
  }
  len = display.innerText.length;
  if (display.innerText[len - 1] !== ope) {
    display.innerText += `${ope}`;
    if (nonrepeat.includes(display.innerText[len - 1])) {
      display.innerText = display.innerText.slice(0, -2); // will work since it's adding 2 inputs.
      display.innerText += `${ope}`; // why is it adding 2 inputs?
    }
  }
}

// ----------Function for Solving (= button )---------

function solve() {
  len = display.innerText.length;
  if (display.innerText === "") {
    return;
  }
  if (nonrepeat.includes(display.innerText[len - 1])) {
    c();
  }
  try {
    let answer = eval(display.innerText);
    if (answer == undefined || answer == NaN) {
      errorEffect();
    } else {
      display.innerText = answer;
    }
    prank();
  } catch (error) {
    errorEffect();
  }
}

// ----------Function for % calculation. ---------

function percentile() {
  try {
    // let's find out the previous operator sign used.
    let indx = 0; //for finding the last operator in the equation.
    len = display.innerText.length;
    for (let j = 0; j < len; j++) {
      indxt = display.innerText.lastIndexOf(nonrepeat[j]);
      if (indxt >= indx) {
        indx = indxt;
      }
    }
    let lastOperand = display.innerText[indx];
    let numBefore = eval(display.innerText.substring(0, indx)); // eval to compute the first part of equation.
    let numAfter = parseInt(display.innerText.substring(indx + 1, len), 10);
    if (indx == 0) {
      numAfter = eval(display.innerText);
    }

    let answer = null;
    if (display.innerText === "") {
      return;
    }

    switch (lastOperand) {
      case "/":
        answer = (numBefore * 100) / numAfter;
        break;

      case "*":
        answer = numBefore * (numAfter / 100);
        break;

      case "+":
        answer = numBefore + numBefore * (numAfter / 100);
        break;

      case "-":
        answer = numBefore - numBefore * (numAfter / 100);
        break;

      default:
        answer = numAfter / 100;
    }
    if (answer == undefined || answer == NaN) {
      errorEffect();
    } else {
      display.innerText = answer;
    }
    prank(); // calling prank function.
  } catch (error) {
    errorEffect();
  }
}

// ---------------------Function to apply effects for error ------------

function errorEffect() {
  displayArea.classList.add("error");
  display.innerText = "ERROR";
  var sound = new Audio("/audio.mp3");
  sound.volume = 0.2;
  sound.play();
}

// ----- prank part ------------

function prank() {
  let ran = Math.ceil(Math.random() * 3);
  if (ran == 3) {
    errorEffect();
  }
}
