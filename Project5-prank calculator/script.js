let btn = document.querySelector("button");
let display = document.querySelector(".display span");

display.innerText = "";

function ToDisplay(btn) {
  if (display.innerText == "ERROR") {
    ac();
  }
  display.innerText += `${btn}`;
}

// --------------Function for AC

function ac() {
  display.innerText = "";
}

// --------------Function for C

function c() {
  display.innerText = display.innerText.slice(0, -1);
}

const nonrepeat = ["/", "+", "*", "-"];

function operator(ope) {
  if (display.innerText == "ERROR") {
    ac();
  }
  let len = display.innerText.length;
  if (display.innerText[len - 1] !== ope) {
    display.innerText += `${ope}`;
    if (nonrepeat.includes(display.innerText[len - 1])) {
      display.innerText = display.innerText.slice(0, -2); // will work since it's adding 2 inputs.
      display.innerText += `${ope}`; // why is it adding 2 inputs?
    }
  }
}

// ----------------function for solving ---------
function solve() {
  if (nonrepeat.includes(display.innerText[len - 1])) {
    c();
  }
  try {
    display.innerText = eval(display.innerText);
  } catch (error) {
    display.innerText = "ERROR";
  }
}
