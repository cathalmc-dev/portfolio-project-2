// The interactive instructions dropdown
const instructions = document.getElementById("instructions-badge");
instructions.addEventListener('click', toggleInstructions);

// Empty arrays for desktop card creation
let cards = [];
let backs = [];


// Arrays and variables for card creation
let i = 0;
let largeNumbers = [25, 50, 75, 100];
let largeLength = largeNumbers.length;
let smallNumbers = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10];
let smallLength = smallNumbers.length;
const idArray = ['Large', 'Small'];

const inputContainer = document.getElementById("input-container");
const card = document.createElement('div');
let available = document.getElementsByClassName("available");

// Arrays and variables for user interaction
let userNums = [];
let userCardsContainer = document.getElementById('user-nums');
let targetNum = 0;
let spin = true;
const stopButton = document.getElementById("get-target");
stopButton.addEventListener('click', stopSpinner);
const userPicks = document.getElementsByClassName('user-pick');

// Object to holder the points for each result and the corresponding message
const scores = [{
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
];

// Creates the modal
let modal = document.createElement('div');

/**
 * Allows the user to toggle the instruction by clicking on the instructions title div
 */
function toggleInstructions() {
  document.getElementById("num-instructions").classList.toggle("display-none");
  const chevron = document.getElementById('chevron');
  const down = 'fa-chevron-down';
  const up = 'fa-chevron-up';
  chevron.classList.toggle(down);
  chevron.classList.toggle(up);
}

/**
 * When the page is loaded, or when the game is reset, decide which card set to generate
 */
function desktopOrMobile() {
  if (screen.width > 1024) {
    createCards();
  } else {
    createMobileCards();
  }
}
desktopOrMobile();

/**
 * Create desktop version of cards to be picked by the user
 */
function createCards() {
  // Creates the backs of each card and sets the id of each
  let back = document.createElement('div');
  back.className = 'back';
  backs = [];
	
  for (i = 0; i <= 3; i++) {
    backs.push(back.cloneNode());
    backs[i].setAttribute('id', `large${i+1}`);
  }
  for (i = 0; i <= 19; i++) {
    backs.push(back.cloneNode());
    backs[i + 4].setAttribute('id', `small${i+1}`);
  }

  // Creates the front face and each card container template
  let front = document.createElement('div');
  front.className = 'front';

  card.className = 'card available';
  card.appendChild(front.cloneNode());

  // Iterates each card and then appends the appropriate card back
  for (i = 0; i <= 23; i++) {
    cards.push(card.cloneNode());
    cards[i].appendChild(backs[i]);
  }

  // Creates the card containers and appends the correct cards to them
  let largeContainer = document.createElement('div');
  largeContainer.setAttribute('id', 'large-cards');

  let smallContainer = document.createElement('div');
  smallContainer.setAttribute('id', 'small-cards');

  for (i = 0; i <= 3; i++) {
    largeContainer.appendChild(cards[i]);
  }

  for (i = 0; i <= 19; i++) {
    smallContainer.appendChild(cards[i + 4]);
  }

  inputContainer.appendChild(largeContainer);
  inputContainer.appendChild(smallContainer);

  assignLarge();
  assignSmall();
  addCardListeners();
}

/**
 * Creates mobile version of the cards to be picked by the user
 */
function createMobileCards() {
  card.className = "card mobile";
  for (i = 0; i <= 1; i++) {
    cards.push(card.cloneNode());
    cards[i].setAttribute('id', `${idArray[i]}Mobile`);
    cards[i].innerHTML = `<h3>${idArray[i]}</h3>`;
  }

  let mobileContainer = document.createElement('div');
  mobileContainer.setAttribute('id', 'mobile-container');
  mobileContainer.appendChild(cards[0]);
  mobileContainer.appendChild(cards[1]);
  inputContainer.appendChild(mobileContainer);

  let largeMobile = document.getElementById('LargeMobile');
  let smallMobile = document.getElementById('SmallMobile');
  largeMobile.addEventListener('click', randomLarge);
  smallMobile.addEventListener('click', randomSmall);
}

/**
 * Creates the display cards which hold the numbers that the user has available to them for calculations
 */
function createUserCards() {
  let userCard = document.createElement('div');
  userCard.className = 'user-pick five-plus';
  let userCards = [];
  let userCardsContainer = document.getElementById('user-nums');
  for (i = 0; i <= 5; i++) {
    userCards.push(userCard.cloneNode());
    userCards[i].setAttribute('id', `pick${i+1}`);
    userCardsContainer.appendChild(userCards[i]);
  }
}
createUserCards();

/**
 * Randomly assign the 4 large numbers to the 4 large cards for user selection in the desktop version
 */
function assignLarge() {
  for (i = 1; i <= 4; i++) {
    largeLength = largeNumbers.length;
    let j = Math.floor((Math.random()) * largeLength);
    document.getElementById(`large${i}`).innerHTML = `<h3>${largeNumbers[j]}</h3>`;
    largeNumbers.splice(j, 1);
  }
}

/**
 * For the mobile version, when the user clicks the large card a random index from the large numbers array is chosen
 * then appended to the user numbers array and the innerHTML of the display card is updated
 */
function randomLarge() {
  largeLength = largeNumbers.length;
  if (largeLength !== 0) {
    let index = Math.floor((Math.random()) * largeLength);
    let largeNumber = largeNumbers[index];
    userNums.push(String(largeNumber));
    largeNumbers.splice(index, 1);
    let length = userNums.length;
    document.getElementById(`pick${length}`).innerHTML = `<h3>${largeNumber}</h3>`;
    userNumsFull();
  } else {
    alert('No more large numbers to pick from!');
  }
}

// Randomly assign the 20 small numbers to the 20 small cards for user selection in the desktop version
function assignSmall() {
  for (i = 1; i <= 20; i++) {
    smallLength = smallNumbers.length;
    let j = Math.floor((Math.random()) * smallLength);
    document.getElementById(`small${i}`).innerHTML = `<h3>${smallNumbers[j]}</h3>`;
    smallNumbers.splice(j, 1);
  }
}

/**
 * For the mobile version, when the user clicks the small card a random index from the small numbers array is chosen
 * then appended to the user numbers array and the innerHTML of the display card is updated
 */
function randomSmall() {
  smallLength = smallNumbers.length;
  let index = Math.floor((Math.random()) * smallLength);
  let smallNumber = smallNumbers[index];
  userNums.push(String(smallNumber));
  smallNumbers.splice(index, 1);
  let length = userNums.length;
  document.getElementById(`pick${length}`).innerHTML = `<h3>${smallNumber}</h3>`;
  userNumsFull();
}

// Listeners for when a user wants to flip a card (only called in desktop version)
function addCardListeners() {
  if (userNums.length < 6) {
    for (i = 0; i < 24; i++) {
      cards[i].addEventListener('click', addToUserNums);
      cards[i].addEventListener('click', flipCard);
    }
  }
}

/** 
 *Flips a card to reveal it's value,
 *then removes it from the pool of cards that are available to be flipped
 *Relied heavily on the below link for this functionality
 *https://jefferson-cuartas.medium.com/how-to-create-a-flip-card-effect-using-javascript-767dd945210c
 */
function flipCard() {
  for (i = 0; i < 24; i++) {
    if (this.classList.contains('available')) {
      this.classList.add("flipCard");
      this.classList.remove('available');
    }
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
    document.getElementById(`pick${i}`).innerHTML = `<h3>${x}</h3>`;
    userNumsFull();
  }
}

/**
 * Checks if the users numbers array has 6 values
 * if there are 6 values, this function runs the functions to start the spinner and remove the selection cards.
 * It also makes the stop button visible and adjusts the height of the input container to maintain a consistent overall content area in the vertical plane
 */
function userNumsFull() {
  if (userNums.length === 6) {
    if (screen.width > 1024) {
      replaceCardsDesktop();
    } else {
      replaceCardsMobile();
    }
    startSpinner();
    stopButton.classList.remove('display-none');
    inputContainer.classList.toggle('dynamic-height');
  }
}

// Deletes the elements containing the selectable cards for the desktop version
function replaceCardsDesktop() {
  let largeCards = document.getElementById("large-cards");
  largeCards.remove();
  let smallCards = document.getElementById("small-cards");
  smallCards.remove();
}

// Deletes the elements containing the selectable cards for the desktop version
function replaceCardsMobile() {
  let mobileCards = document.getElementById('mobile-container');
  mobileCards.remove();
}

/**
 * Starts changing the innerHTML of the target number slots every 0.1 seconds until the stop function is called
 * if the stop function has been called it will assign the values of the slots to the target number variable
 */
function startSpinner() {
  let slot1 = document.getElementById('slot1');
  let slot2 = document.getElementById('slot2');
  let slot3 = document.getElementById('slot3');
  if (spin === true) {
    slot1.innerHTML = `${Math.floor(Math.random() * 8.999999) + 1}`;
    slot2.innerHTML = `${Math.floor(Math.random() * 9.999999)}`;
    slot3.innerHTML = `${Math.floor(Math.random() * 9.999999)}`;
    setTimeout(startSpinner, 100);
  } else {
    targetNum = parseInt(slot1.innerText + slot2.innerText + slot3.innerText);
  }
}

/**
 * Stops the target numbers from spinning
 * removes the stop button from DOM flow and resets input container height to previous value
 */
function stopSpinner() {
  spin = false;
  stopButton.classList.add('display-none');
  inputContainer.classList.toggle('dynamic-height');
  createFormHolder();
  createInputRow();
  createDoneButton();
}

function createFormHolder() {
  let formContainer = document.createElement('div');
  formContainer.setAttribute('id', 'form-container');
  inputContainer.appendChild(formContainer);
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
  divide.innerText = "??";

  // Each of the elements in the row
  let operand = document.createElement('input');
  operand.setAttribute("class", "input operand");
  operand.type = "number";
  operand.value = "";
  operand.setAttribute('id', 'operand1');

  let clone = operand.cloneNode(true);
  clone.setAttribute('id', 'operand2');

  let operator = document.createElement('select');
  operator.setAttribute("class", "button operator");
  operator.setAttribute('id', 'operator');

  let compute = document.createElement('input');
  compute.type = "submit";
  compute.value = "=";
  compute.setAttribute("class", "button");
  compute.setAttribute('id', 'compute');

  let result = document.createElement('input');
  result.setAttribute("class", "input");
  result.setAttribute("type", "text");
  result.setAttribute("id", "result");
  result.setAttribute("readonly", "");

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
  form.setAttribute("onsubmit", "handleSubmit(event);");
  let formContainer = document.getElementById('form-container');
  formContainer.appendChild(form);
  addUserCardListeners();
  clearOldCalcRow();
}

/**
 * Creates the done button so that the user can compare their last calculated result to the target number
 * before having used all of their numbers
 */
function createDoneButton() {
  let done = document.createElement('button');
  done.setAttribute('id', 'done');
  done.innerHTML = "<h2>Done</h2>";
  let formContainer = document.getElementById('form-container');
  formContainer.appendChild(done);
  done.addEventListener('click', compareResult);
}

/**
 * Listener for the next function
 */
function addUserCardListeners() {
  for (i = 0; i <= userNums.length - 1; i++) {
    userPicks[i].addEventListener('click', selectOperand);
  }
}

/**
 * Allows the user the option of clicking on one of their displayed number choices rather than having to type it into the input field
 */
function selectOperand() {
  let input1 = document.getElementById('operand1');
  let input2 = document.getElementById('operand2');
  let number = this.innerText;
  if (input1.value === "") {
    input1.value = number;
  } else if ((input1.value === "") && (input2.value !== "")) {
    input1.value = number;
  } else {
    input2.value = number;
  }
}

/**
 * Checks if the user has given valid inputs by comparing the operands to each other and to the user numbers array
 * Computes the value of the user equation depending on the chosen operator
 * Removes the used values from the user numbers array and pushes in the new one
 * Event listener on the form submission so that is in use
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
          break;
        case "-":
          result.value = parseInt(operand1) - parseInt(operand2);
          break;
        case "*":
          result.value = parseInt(operand1) * parseInt(operand2);
          break;
        case "/":
          if (operand1 % operand2 === 0) {
            result.value = parseInt(operand1) / parseInt(operand2);
            break;
          } else {
            alert(`${operand1} is not divisible by ${operand2}!`);
            return;
          }
      }
      userNums.splice(index1, 1);

      // Set index2 here as if it was set before the previous splice it would have been out by 1
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
          break;
        case "-":
          result.value = parseInt(operand1) - parseInt(operand2);
          break;
        case "*":
          result.value = parseInt(operand1) * parseInt(operand2);
          break;
        case "/":
          if (operand1 % operand2 === 0) {
            result.value = parseInt(operand1) / parseInt(operand2);
            break;
          } else {
            alert(`${operand1} is not divisible by ${operand2}!`);
            return;
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
  userCardsHeightAdjust();
}

/**
 * Freezes the just calculated row in place by chaging the input fields to read-only and disabling the dropdown and button
 * This is to allow the user to look back at what they just did
 */
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

/**
 * Replaces the values in each of the display cards with the updated version of the array values post each calculation
 * Also dynamically adjusts the class of the display cards depending on how many are left to make better use of the available screen real estate
 */
function replaceUserCards() {
  for (i = 0; i <= userNums.length; i++) {
    let pick = document.getElementById(`pick${i+1}`);
    pick.innerHTML = `<h3>${userNums[i]}</h3>`;
    if (pick.innerHTML == `<h3>${undefined}</h3>`) {
      pick.remove();
    }
  }
  let picks = document.getElementsByClassName('user-pick');
  for (i = 0; i < picks.length; i++) {
    if (picks.length > 4) {
      // empty rule as no action required if there are more than 3 available user cards
    } else if (picks.length === 4) {
      picks[i].classList.remove('five-plus');
      picks[i].classList.add('four');
    } else if (picks.length === 3) {
      picks[i].classList.remove('four');
      picks[i].classList.add('three');
    } else if (picks.length === 2) {
      picks[i].classList.remove('three');
      picks[i].classList.add('two');
    } else if (picks.length === 1) {
      picks[i].classList.remove('two');
      picks[i].classList.add('one');
    }
  }
}

/**
 * Compares the last value to be added to the user numbers array with the target number
 */
function compareResult() {
  let usersAttempt = parseInt(userNums.pop());
  if (usersAttempt === targetNum) {
    resultModal(10);
    updateScoreboard(10);
  } else if (Math.abs(usersAttempt - targetNum) <= 5) {
    resultModal(7);
    updateScoreboard(7);
  } else if (Math.abs(usersAttempt - targetNum) <= 10) {
    resultModal(5);
    updateScoreboard(5);
  } else {
    resultModal(0);
    updateScoreboard(0);
  }
}

/**
 * Clears the oldest form row after every calculation after the 3rd calculation
 * This prevents the input fields from getting too separated from the display numbers
 */
function clearOldCalcRow() {
  if (userNums.length < 4)
    document.getElementsByTagName('form')[0].remove();
}

/**
 * Creates the modal that appears at the end of a round along with it's message
 */
function resultModal(x) {
  let message;
  switch (x) {
    case 10:
      message = scores[0].message;
      break;
    case 7:
      message = scores[1].message;
      break;
    case 5:
      message = scores[2].message;
      break;
    case 0:
      message = scores[3].message;
  }

  modal.setAttribute('id', 'modal');
  modal.innerHTML = `<div class="modal-text">
    <span class="modal-close" onclick="removeModal();">&times;</span>
    <h2>${message}</h2>
  </div>
	`;
  let body = document.getElementsByTagName('body');
  body[0].appendChild(modal);
}

/**
 * Removes the modal and resets the game for another round
 * Event listener on the modal close button so this in use
 */
function removeModal() {
  modal = document.getElementById('modal');
  modal.remove();
  resetGame();
}

/**
 * Updates the whole scoreboard
 */
function updateScoreboard(p) {
  totalPoints(p);
  exactMatchs(p);
  within5(p);
  within10(p);
  attempts();
}

// Updates the points earned so far by the user
function totalPoints(p) {
  let oldScore = parseInt(document.getElementById('points').innerText);
  document.getElementById('points').innerText = oldScore + p;
}

// Updates the amount of time the user got the target number exactly
function exactMatchs(p) {
  let oldScore = parseInt(document.getElementById('matchs').innerText);
  if (p === 10) {
    document.getElementById('matchs').innerText = oldScore + 1;
  }
}

// Updates the amount of time the user was within 5 of the target number
function within5(p) {
  let oldScore = parseInt(document.getElementById('5s').innerText);
  if (p === 7) {
    document.getElementById('5s').innerText = oldScore + 1;
  }
}

// Updates the amount of time the user was within 10 of the target number
function within10(p) {
  let oldScore = parseInt(document.getElementById('10s').innerText);
  if (p === 5) {
    document.getElementById('10s').innerText = oldScore + 1;
  }
}

// Updates the amount of times the user has attempted the game this session
function attempts() {
  let oldScore = parseInt(document.getElementById('attempts').innerText);
  document.getElementById('attempts').innerText = oldScore + 1;

}

/**
 * Resets the game for the next round
 */
function resetGame() {
  document.getElementById('slot1').innerText = 0;
  document.getElementById('slot2').innerText = 0;
  document.getElementById('slot3').innerText = 0;
  let formContainer = document.getElementById('form-container');
  formContainer.remove();
  cards = [];
  available = [];
  smallNumbers = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10];
  largeNumbers = [25, 50, 75, 100];
  desktopOrMobile();
  userCardsContainer.innerHTML = "";
  createUserCards();
  userNums = [];
  spin = true;
}

/** 
 * Dynamically adjusts the height of the user cards container by changing the class which assigns it's height when there are only a couple of display cards left
 * This is to prevent them from stacking on top of one another
 */
function userCardsHeightAdjust() {
  if (userNums.length > 2) {
    // do nothing
  } else document.getElementById('user-nums').classList.toggle('user-nums-adjusted-height');
}