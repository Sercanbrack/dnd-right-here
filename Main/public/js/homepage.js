console.log("homepage.js loaded")

const deleteButton = document.querySelector('#deleteButton')
                      


const deleteFunction = async (event) => {

    console.log("hello")
    if (event.target.hasAttribute('data-id')) {
      maybe = 1
      const id = event.target.getAttribute('data-id');
      console.log(id)
      const response = await fetch(`/api/character/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        alert("Character successfully deleted.")
        document.location.replace('/');
        // document.location.reload();

      } else {
        alert('Error: Failed to delete character.');
      }
    }
  };

const createFunction = () => {
  document.location.replace('api/character/create');

}

const condListener = () => {
  document
  .querySelector('#deleteButton')
  .addEventListener('click', deleteFunction);
}
  document
  .querySelector('#createButton')
  .addEventListener('click', createFunction);

  if (deleteButton !== null) {
    condListener()
  }