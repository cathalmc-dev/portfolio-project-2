let instructions = document.getElementById("instructions-badge");
instructions.addEventListener('click', toggleInstructions);

function toggleInstructions() {
  document.getElementById("num-instructions").classList.toggle("display-none");
}

var inputContainer = document.getElementById("input-container");

function createCards() {
  let front = document.createElement('div');
  front.setAttribute("class", "front");
  let back = document.createElement('div');
  back.setAttribute("class", "back");
  let card = document.createElement('div');
  card.setAttribute('class', 'card available');
  let largeContainer = document.createElement('div');
  largeContainer.setAttribute('id', 'large-cards');
  for (i = 1; i <= 4; i++) {
    card.appendChild(front.cloneNode());
    back.setAttribute('id', `large${i}`);
    card.appendChild(back.cloneNode());
    largeContainer.appendChild(card.cloneNode());
  }
  let smallContainer = document.createElement('div');
  smallContainer.setAttribute('id', 'small-cards');
  for (i = 1; i <= 20; i++) {
    card.appendChild(front.cloneNode());
    back.setAttribute('id', `small${i}`);
    card.appendChild(back.cloneNode());
    smallContainer.appendChild(card.cloneNode());
  }
  inputContainer.appendChild(largeContainer);
  inputContainer.appendChild(smallContainer);
}
createCards();

let largeNumbers = [25, 50, 75, 100];
function assignLarge() {
  for (i = 1; i <= 4; i++) {
    let largeLength = largeNumbers.length;
    let j = Math.floor((Math.random()) * largeLength);
    document.getElementById(`large${i}`).innerHTML = `<h3>${largeNumbers[j]}</h3>`
    largeNumbers.splice(j, 1);
 }
}
assignLarge();

/**
 * Taken from a YouTube tutorial - https://www.youtube.com/watch?v=P3gJr_Rd80g
 * How to count the occurences in a JavaScript Array
 */
// let countOccurence = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);


// let smallNumbers = [];
// let smallLength = smallNumbers.length;
// function assignSmall() {
//   while (smallLength < 20) {
//     let i = Math.ceil(Math.random() * 20);
//     if (countOccurence(smallNumbers, i) < 2) {
//       smallNumbers.push(i);
//       continue;
//     }
//   }
//   console.log(smallNumbers);
// }
// console.log(smallNumbers);
// for (i = 1; i <= 20; i++) {
//   document.getElementById(`small${i}`).innerHTML = `<h3>${smallNumbers[i]}</h3>`
// }

let smallNumbers = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10];
function assignSmall() {
  for (i = 1; i <= 20; i++) {
    let smallLength = smallNumbers.length;
    let j = Math.floor((Math.random()) * smallLength);
    document.getElementById(`small${i}`).innerHTML = `<h3>${smallNumbers[j]}</h3>`
    smallNumbers.splice(j, 1);
 }
}
assignSmall();

let userNums = [];

let cards = document.getElementsByClassName("available");
if (userNums.length < 6) {
  for (i = 0; i < 24; i++) {
    cards[i].addEventListener('click', flipCard);
    cards[i].addEventListener('click', addToUserNums);
    cards[i].addEventListener('click', preventDoublePick);

  }
}

function flipCard() {
  for (i = 0; i < 24; i++) {
    this.classList.add("flipCard");
  }
}

function addToUserNums() {
  let x = this.innerText;
  if (this.classList.contains('available')) {
    userNums.push(x);
    let i = userNums.length;
    document.getElementById(`pick${i}`).innerHTML = `<h3>${x}</h3>`
    if (userNums.length === 6) {
      replaceCards();
      startSpinner();
      stopButton.classList.remove('hidden');
    }
  }
}

function preventDoublePick() {
  this.classList.remove('available');
}

function replaceCards() {
  let largeCards = document.getElementById("large-cards");
  largeCards.remove();
  let smallCards = document.getElementById("small-cards");
  smallCards.remove();
}

let slot1 = document.getElementById('slot1');
let slot2 = document.getElementById('slot2');
let slot3 = document.getElementById('slot3');

var spin = true;
let stopButton = document.getElementById("get-target");
function startSpinner() {
  if (spin === true) {
    slot1.innerHTML = `${Math.floor(Math.random() * 8.999999) + 1}`
    slot2.innerHTML = `${Math.floor(Math.random() * 9.999999)}`
    slot3.innerHTML = `${Math.floor(Math.random() * 9.999999)}`
    setTimeout(startSpinner, 100);
  }
  else {
    var target = slot1.innerText + slot2.innerText + slot3.innerText;
    console.log(target);
  }
}

stopButton.addEventListener('click', stopSpinner);

function stopSpinner() {
  spin = false;
  startSpinner();
  stopButton.classList.add('hidden');
  createInputRow();
}

function createInputRow () {
  let add = document.createElement('option');
  add.setAttribute('value', '+');
  add.innerText = "+";
  let subtract = document.createElement('option');
  subtract.setAttribute('value', '-');
  subtract.innerText = "-";
  let multiply = document.createElement('option');
  multiply.setAttribute('value', '*');
  multiply.innerText = "x";
  let divide = document.createElement('option');
  divide.setAttribute('value', '÷');
  divide.innerText = "÷";
  let result = document.createElement('div');
  result.setAttribute("class", "input result");
  let compute = document.createElement('input');
  compute.type = "submit";
  compute.value = "="
  compute.setAttribute("class", "button compute");
  let operand = document.createElement('input');
  operand.setAttribute("class", "input operand");
  operand.type = "number";
  let operator = document.createElement('select');
  operator.setAttribute("class", "button operator");
  let span = document.createElement('span');
  let form = document.createElement('form');
  operator.appendChild(add);
  operator.appendChild(subtract);
  operator.appendChild(multiply);
  operator.appendChild(divide);
  span.appendChild(operand.cloneNode());
  span.appendChild(operator);
  span.appendChild(operand.cloneNode());
  span.appendChild(compute);
  span.appendChild(result);
  form.appendChild(span);
  inputContainer.appendChild(form);
}