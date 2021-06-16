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

let smallNumbers = [7];
console.log(smallNumbers);