let display = document.querySelector(".display span");
let displayArea = document.querySelector(".display");

display.innerText = "";

function ToDisplay(btn) {
  if (display.innerText == "error") {
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
  let len = display.innerText.length;
  errorThrow();
  if (nonrepeat.includes(display.innerText[len - 1])) {
    c();
  }
  try {
    display.innerText = eval(display.innerText);
    errorThrow();
  } catch (error) {
    display.innerText = "ERROR";
  }
}

// ----------------function for % operand

// SO how does % actually work in Calculator:

/*
case 1: additional percentage, => num + a% = num + a% of num
case2: subtraction. similar to that of additon.
case3: multiplication: num * a% = a% of num.
case3: num/a% = num is a% of ?

*/

function percentile() {
  let len = display.innerText.length;
  // let's find out the previous operator sign used.
  try {
    let indx = 0;
    for (let j = 0; j < len; j++) {
      indxt = display.innerText.lastIndexOf(nonrepeat[j]);
      if (indxt >= indx) {
        indx = indxt;
      }
    }
    let lastOperand = display.innerText[indx];
    let numBefore = eval(display.innerText.substring(0, indx)); // eval to make sure they are numbers.
    let numAfter = parseInt(display.innerText.substring(indx + 1, len), 10);
    if (indx == 0) {
      numAfter = eval(display.innerText);
    } //eval to make sure they are numbers.
    // console.log(numBefore, typeof numBefore); // for debugging
    // console.log(numAfter, typeof numAfter);//
    let answer = null;

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
    console.log(answer);
    display.innerText = answer;
  } catch (error) {
    display.innerText = "ERROR";
    display.style.background = "red";
  }
}
// -----------------------Adding Prank ELements ----------------------

// ---------let's make  error effect-------------
//
