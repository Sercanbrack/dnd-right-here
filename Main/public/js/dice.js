const rollButton = document.getElementById('rollButton')

const roll = function() {
const inputAmount = document.getElementById('inputRollAmt').value
console.log(inputAmount)
const selectDice = document.getElementById('diceRolled')
const inputDice = selectDice.options[selectDice.selectedIndex].value
const input = inputAmount + inputDice
console.log(inputAmount)
console.log(inputDice)
fetch(`/api/character/roll/${input}`)
  .then((res) => res.json())
    .then((data) => {
      console.log('Successful GET request:', data);
      const outputField = document.getElementById('rollOutput')
      outputField.innerText = data.output
    })
    .catch((error) => {
      console.error('Error in GET request:', error);
    });




}

rollButton.addEventListener('click', roll)