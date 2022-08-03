var createBtn = document.getElementById('createCharBtn');
var editBtn = document.getElementById('editCharBtn');
var createCharacter = document.getElementById('createChar');

createBtn.onclick = function goToCreatePage() {
    document.location.replace('/homepage');
};

editBtn.onclick = function goToEditPage() {
    document.location.replace('/homepage');
};

createCharacter.onclick = function goToCharPage() {
    document.location.replace('/create');
};