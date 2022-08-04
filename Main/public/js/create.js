const confirmCharBtn = document.getElementById('createCharBtn');


const confirmChar = async (event) => {
    event.preventDefault(event);
    
    const name = document.querySelector('#inputName').value.trim();
    const characterClass = document.querySelector('#inputClass').value.trim();
    const player = document.querySelector('#inputClass').value.trim();
    const race = document.querySelector('#inputRace').value.trim();
    const level = document.querySelector('#inputLevel').value.trim();
    const armorClass = document.querySelector('#inputAC').value.trim();
    const hitPoints = document.querySelector('#inputCurrentHP').value.trim();
    const strength = document.querySelector('#inputStr').value.trim();
    const intelligence = document.querySelector('#inputInt').value.trim();
    const dexterity = document.querySelector('#inputDex').value.trim();
    const wisdom = document.querySelector('#inputWis').value.trim();
    const constitution = document.querySelector('#inputCon').value.trim();
    const charisma = document.querySelector('#inputCha').value.trim();
    
  
    if (name && characterClass && player && race && level && armorClass && hitPoints && strength && intelligence && dexterity && wisdom && constitution && charisma) {
      const response = await fetch(`/api/character`, {
        method: 'POST',
        body: JSON.stringify({ name, characterClass, player, race, level, armorClass, hitPoints, strength, intelligence, dexterity, wisdom, constitution, charisma }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/homepage');
      } else {
        alert('Failed to create character');
      }
    }
  };

confirmCharBtn.addEventListener('click', confirmChar)