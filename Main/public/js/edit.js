var confirmCharBtn = document.getElementById('createCharBtn');
var updateBtn = document.getElementById('updateBtn');
var createCharacter = document.getElementById('createChar');
var goToEdit = document.getElementById('editTheChar')

createCharacter.onclick = function goToCharPage() {
    document.location.replace('/create');
};

goToEdit.onclick = function goToEditPage() {
    document.location.replace('/edit')
}

const confirmChar = async (event) => {
    event.preventDefault();
  
    const race = document.querySelector('#inputRace').value.trim();
    const str = document.querySelector('#inputStr').value.trim();
    const int = document.querySelector('#inputInt').value.trim();
    const dex = document.querySelector('#inputDex').value.trim();;
    const wis = document.querySelector('#inputWis').value.trim();;
    const con = document.querySelector('#inputCon').value.trim();;
    const char = document.querySelector('#inputCha').value.trim();;
  
    if (race && str && int && dex && wis && con && char) {
      const response = await fetch(`/api/users`, {
        method: 'POST',
        body: JSON.stringify({ race, str, int, dex, wis, con, char }),
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

  const confirmEdit = async (event) => {
    event.preventDefault();
  
    const race = document.querySelector('#inputRace').value.trim();
    const str = document.querySelector('#inputStr').value.trim();
    const int = document.querySelector('#inputInt').value.trim();
    const dex = document.querySelector('#inputDex').value.trim();;
    const wis = document.querySelector('#inputWis').value.trim();;
    const con = document.querySelector('#inputCon').value.trim();;
    const char = document.querySelector('#inputCha').value.trim();;
  
    if (race && str && int && dex && wis && con && char) {
      const response = await fetch(`/api/users`, {
        method: 'PUT',
        body: JSON.stringify({ race, str, int, dex, wis, con, char }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/homepage');
      } else {
        alert('Failed to update character');
      }
    }
  };