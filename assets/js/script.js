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

let cards = document.getElementsByClassName("card");
for (i = 0; i < 24; i++) {
  cards[i].addEventListener('click', flipCard);
}


function flipCard() {
  for (i = 0; i < 24; i++) {
    this.classList.add("flipCard");
  }
}

// function flipCard() {
//   this.classList.add("flipCard");
// }

// cards.forEach((card) => card.addEventListener("click", flipCard));