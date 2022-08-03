var confirmCharBtn = document.getElementById('createCharBtn');
var updateBtn = document.getElementById('updateBtn');
var createCharacter = document.getElementById('createChar');
var goToEdit = document.getElementById('editTheChar')

confirmCharBtn.onclick = function confirmChar() {
    document.location.replace('/homepage');
    
};

updateBtn.onclick = function confirmEdit() {
    document.location.replace('/homepage');
};

createCharacter.onclick = function goToCharPage() {
    document.location.replace('/create');
};

goToEdit.onclick = function goToEditPage() {
    document.location.replace('/edit')
}