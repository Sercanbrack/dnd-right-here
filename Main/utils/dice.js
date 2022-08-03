const roll = function() {
const dicerpg = require('dice-rpg')
const inputAmount = document.getElementById('inputRollAmt').value
const selectDice = document.getElementById('diceRolled')
const inputDice = selectDice.options[selectDice.selectedIndex].value
const input = inputAmount + inputDice

const rollDice = dicerpg.rolled(input)
let rolledValues = Object.values(rollDice)[0]
let output = rolledValues.toString()
console.log(output)

const outputField = document.getElementById('rollOutput')
outputField.innerText = output
}
module.exports = roll