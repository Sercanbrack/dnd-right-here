console.log("detail.js loaded")
const deleteFunction = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
      console.log(id)
      const response = await fetch(`/api/character/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        alert("Character successfully deleted.")
        document.location.replace('/');
      } else {
        alert('Error: Failed to delete character.');
      }
    }
  };

  document
  .querySelector('#deleteButton')
  .addEventListener('click', deleteFunction);