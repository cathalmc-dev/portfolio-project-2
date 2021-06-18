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

let cards = document.getElementsByClassName("card");
if (userNums.length < 6) {
  for (i = 0; i < 24; i++) {
    cards[i].addEventListener('click', flipCard);
    cards[i].addEventListener('click', addToUserNums);
  }
}

function flipCard() {
  for (i = 0; i < 24; i++) {
    this.classList.add("flipCard");
  }
}

function addToUserNums() {
  let x = this.innerText;
  userNums.push(x);
  let i = userNums.length;
  document.getElementById(`pick${i}`).innerHTML = `<h3>${x}</h3>`
  if (userNums.length === 6) {
    replaceCards();
    spin = true;
    startSpinner();
  }
}

function replaceCards() {
  let largeCards = document.getElementById("large-cards");
  largeCards.remove();
  let smallCards = document.getElementById("small-cards");
  smallCards.remove();
}

// let spin = true;
// let stopButton = document.getElementById("get-target");
// stopButton.addEventListener('click', stopSpinner);

// function startSpinner() {
//   if (spin === true) {
//     setInterval( function() {
//       document.getElementById("slot1").innerHTML = `${Math.floor(Math.random() * 8.999999) + 1}`
//       document.getElementById("slot2").innerHTML = `${Math.floor(Math.random() * 9.999999)}`
//       document.getElementById("slot3").innerHTML = `${Math.floor(Math.random() * 9.999999)}`
//     }, 100);
//   }
//   stopButton.classList.remove('hidden');
// }

// function stopSpinner() {
//   spin = false;
//   startSpinner();
//   console.log('click')
// }
var spin = true;
let stopButton = document.getElementById("get-target");
function startSpinner() {
  if (spin === true) {
    document.getElementById('slot1').innerHTML = `${Math.floor(Math.random() * 8.999999) + 1}`
    document.getElementById("slot2").innerHTML = `${Math.floor(Math.random() * 9.999999)}`
    document.getElementById("slot3").innerHTML = `${Math.floor(Math.random() * 9.999999)}`
    setTimeout(startSpinner, 100);
  }
  stopButton.classList.remove('hidden');
}

stopButton.addEventListener('click', stopSpinner);

function stopSpinner() {
  spin = false;
  startSpinner();
  console.log('click')
}