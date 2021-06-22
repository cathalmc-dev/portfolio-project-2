let userNums = [];
let targetNum
let scores = [
  {
    value: 10,
    message: "You Win! 10 Points!",
  },
  {
    value: 7,
    message: "Almost! 7 Points!",
  },
  {
    value: 5,
    message: "Close, keep practicing! 5 Points!",
  },
  {
    value: 0,
    message: "Sorry, 0 points!",
  }
]

/**
 * Allows the user to toggle the instruction by clicking on the instructions title div
 */
let instructions = document.getElementById("instructions-badge");
instructions.addEventListener('click', toggleInstructions);

function toggleInstructions() {
  document.getElementById("num-instructions").classList.toggle("display-none");
}

var inputContainer = document.getElementById("input-container");

// function createCards() {
//   let front = document.createElement('div');
//   front.setAttribute("class", "front");
//   let back = document.createElement('div');
//   back.setAttribute("class", "back");
//   let card = document.createElement('div');
//   card.setAttribute('class', 'card available');
//   let largeContainer = document.createElement('div');
//   largeContainer.setAttribute('id', 'large-cards');
//   for (i = 1; i <= 4; i++) {
//     card.appendChild(front.cloneNode());
//     back.setAttribute('id', `large${i}`);
//     card.appendChild(back.cloneNode());
//     largeContainer.appendChild(card.cloneNode());
//   }
//   let smallContainer = document.createElement('div');
//   smallContainer.setAttribute('id', 'small-cards');
//   for (i = 1; i <= 20; i++) {
//     card.appendChild(front.cloneNode());
//     back.setAttribute('id', `small${i}`);
//     card.appendChild(back.cloneNode());
//     smallContainer.appendChild(card.cloneNode());
//   }
//   inputContainer.appendChild(largeContainer);
//   inputContainer.appendChild(smallContainer);
// }
// createCards();

/**
 * Randomly assign the 4 large numbers to the 4 large cards for user selection
 */
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

// Randomly assign the 20 small numbers to the 20 small cards for user selection
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

// Listeners for when a user wants to flip a card
let cards = document.getElementsByClassName("available");
if (userNums.length < 6) {
  for (i = 0; i < 24; i++) {
    cards[i].addEventListener('click', addToUserNums);
    cards[i].addEventListener('click', flipCard);
  }
}

/** 
 *Flips a card to reveal it's value,
 *then removes it from the pool of cards that are available to be flipped 
 */
function flipCard() {
  for (i = 0; i < 24; i++) {
    this.classList.add("flipCard");
    this.classList.remove('available');
  }
}

/**
 * Adds a selected card's value to the array of user numbers
 * Adds the value to the row displaying the users cards to them
 * Checks if the users numbers array has 6 values
 * and if it does then it runs the functions to start the spinner and remove the selection cards.
 * It also makes the stop button visible
 */
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

// Deletes the elements containing the selectable cards
function replaceCards() {
  let largeCards = document.getElementById("large-cards");
  largeCards.remove();
  let smallCards = document.getElementById("small-cards");
  smallCards.remove();
}

let spin = true;
let stopButton = document.getElementById("get-target");

/**
 * Starts changing the innerHTML of the target number slots every 0.1 seconds until the stop function is called
 * if the stop function has been called it will assign the values of the slots to the target number variable
 */
function startSpinner() {
  let slot1 = document.getElementById('slot1');
  let slot2 = document.getElementById('slot2');
  let slot3 = document.getElementById('slot3');
  if (spin === true) {
    slot1.innerHTML = `${Math.floor(Math.random() * 8.999999) + 1}`
    slot2.innerHTML = `${Math.floor(Math.random() * 9.999999)}`
    slot3.innerHTML = `${Math.floor(Math.random() * 9.999999)}`
    setTimeout(startSpinner, 100);
  } else {
    targetNum = parseInt(slot1.innerText + slot2.innerText + slot3.innerText);
    console.log(targetNum);
  }
}

stopButton.addEventListener('click', stopSpinner);

function stopSpinner() {
  spin = false;
  stopButton.classList.add('hidden');
  createInputRow();
  createDoneButton();
}

// Creates an input row for the user
function createInputRow() {
  // The dropdown operator options
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
  divide.setAttribute('value', '/');
  divide.innerText = "÷";

  // Each of the elements in the row
  let operand = document.createElement('input');
  operand.setAttribute("class", "input operand");
  operand.type = "number";
  operand.setAttribute('id', 'operand1')

  let clone = operand.cloneNode(true);
  clone.setAttribute('id', 'operand2')

  let operator = document.createElement('select');
  operator.setAttribute("class", "button operator");
  operator.setAttribute('id', 'operator');

  let compute = document.createElement('input');
  compute.type = "submit";
  compute.value = "="
  compute.setAttribute("class", "button");
  compute.setAttribute('id', 'compute');

  let result = document.createElement('input');
  result.setAttribute("class", "input");
  result.setAttribute("type", "text");
  result.setAttribute("id", "result");
  result.setAttribute("readonly", "")

  let span = document.createElement('span');
  let form = document.createElement('form');

  // Appends the operator dropdown options to the select element
  operator.appendChild(add);
  operator.appendChild(subtract);
  operator.appendChild(multiply);
  operator.appendChild(divide);

  // Appends the row elements to the span element
  span.appendChild(operand);
  span.appendChild(operator);
  span.appendChild(clone);
  span.appendChild(compute);
  span.appendChild(result);

  // Nests the entire row within a form which calls the handleSubmit function when it is computed
  form.appendChild(span);
  form.setAttribute("onsubmit", "handleSubmit(event);")
  inputContainer.appendChild(form);
  clearOldCalcRow();
}

function createDoneButton() {
  let done = document.createElement('button');
  done.setAttribute('id', 'done');
  done.innerHTML = "<h2>Done</h2>";
  inputContainer.appendChild(done);
  done.addEventListener('click', compareResult);
}

/**
 * Checks if the user has given valid inputs by comparing the operands to each other and to the user numbers array
 * Computes the value of the user equation depending on the chosen operator
 * Removes the used values from the user numbers array and pushes in the new one
 */
function handleSubmit(event) {
  event.preventDefault();
  let operator = document.getElementById('operator').value;
  let operand1 = document.getElementById('operand1').value;
  let operand2 = document.getElementById('operand2').value;
  let result = document.getElementById('result');
  let index1 = userNums.indexOf(operand1);
  if (operand1 !== operand2) {
    if (userNums.includes(operand1) && userNums.includes(operand2)) {
      switch (operator) {
        case "+":
          result.value = parseInt(operand1) + parseInt(operand2);
          break
        case "-":
          result.value = parseInt(operand1) - parseInt(operand2);
          break
        case "*":
          result.value = parseInt(operand1) * parseInt(operand2);
          break
        case "/":
          if (operand1 % operand2 === 0) {
            result.value = parseInt(operand1) / parseInt(operand2);
            break
          } else {
            alert('That is not a valid operation');
            return
          }
      }
      userNums.splice(index1, 1);
      let index2 = userNums.indexOf(operand2);
      userNums.splice(index2, 1);
      userNums.push(result.value);
      freezeRow();
      replaceUserCards();
      if (userNums.length > 1) {
        createInputRow();
      } else {
        compareResult();
      }
    } else {
      alert("That number isn't available to you!");
    }
  } else if (operand1 == operand2) {
    userNums.splice(index1, 1);
    if (userNums.includes(operand2)) {
      switch (operator) {
        case "+":
          result.value = parseInt(operand1) + parseInt(operand2);
          break
        case "-":
          result.value = parseInt(operand1) - parseInt(operand2);
          break
        case "*":
          result.value = parseInt(operand1) * parseInt(operand2);
          break
        case "/":
          if (operand1 % operand2 === 0) {
            result.value = parseInt(operand1) / parseInt(operand2);
            break
          } else {
            alert('That is not a valid operation');
            return
          }
      }
      let index2 = userNums.indexOf(operand2);
      userNums.splice(index2, 1);
      userNums.push(result.value);
      freezeRow();
      replaceUserCards();
      if (userNums.length > 1) {
        createInputRow();
      } else {
        compareResult();
      }
    }
  } else {
    alert("That number isn't available to you!");
  }
}

function freezeRow() {
  document.getElementById('operand1').setAttribute('readonly', '');
  document.getElementById('operand1').removeAttribute('id');
  document.getElementById('operand2').setAttribute('readonly', '');
  document.getElementById('operand2').removeAttribute('id');
  document.getElementById('operator').disabled = true;
  document.getElementById('operator').removeAttribute('id');
  document.getElementById('compute').disabled = true;
  document.getElementById('compute').removeAttribute('id');
  document.getElementById('result').removeAttribute('id');
}

function replaceUserCards() {
  for (i = 0; i <= userNums.length; i++) {
    let pick = document.getElementById(`pick${i+1}`);
    pick.innerHTML = `<h3>${userNums[i]}</h3>`
    if (pick.innerHTML == `<h3>${undefined}</h3>`) {
      pick.remove();
    }
  }
}

function compareResult() {
  if (userNums.length > 1) {
    let usersAttempt = userNums.pop();
    if (usersAttempt == targetNum) {
      resultModal(10);
    }
    else if (Math.abs(usersAttempt - targetNum) <= 5) {
      resultModal(7);
    } 
    else if (Math.abs(usersAttempt - targetNum) <= 10) {
      resultModal(5);
    } 
    else {
      resultModal(0);
    }
  }
  else if (userNums.length = 1) {
    if (userNums.includes(targetNum)) {
      resultModal(10);
    } else if (Math.abs(userNums[0] - targetNum) <= 5) {
      resultModal(7);
    } else if (Math.abs(userNums[0] - targetNum) <= 10) {
      resultModal(5);
    } else {
      resultModal(0);
    }
  }
}

function clearOldCalcRow() {
  if (userNums.length < 4)
    document.getElementsByTagName('form')[0].remove();
}

function resultModal(x) {
  let message;
    switch (x) {
      case 10:
        message = scores[0].message;
        break
      case 7:
        message = scores[1].message;
        break
      case 5:
        message = scores[2].message;
        break
      case 0:
        message = scores[3].message;
    }

  modal = document.createElement('div');
  modal.setAttribute('id','modal');
  modal.innerHTML = `<div class="modal-text">
    <h2>${message}</h2>
  </div>
`
let body = document.getElementsByTagName('body');
body[0].appendChild(modal)
setTimeout(removeModal, 7000);
}

function removeModal() {
  let modal = document.getElementById('modal');
  modal.remove();
}
