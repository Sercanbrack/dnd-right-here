const loginFormHandler = async (event) => {
    event.preventDefault();
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (email && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json'},
        });

        if (response.ok) {
            document.location.replace('/homepage');
            // document.location.replace('/homepage');
        } else {
            console.log(response)
            alert(response.statusText)
        }
    }
}

const signupFormHandler = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    const confirmPassword = document.querySelector('#confirm-signup').value.trim();
    let checkedPassword = checkPassword();

    function checkPassword () { 
        if (password !== confirmPassword) {
        alert("passwords must match")
        return false;
    } else {
        return true;
    }
    } 

    if (name && email && password && (checkedPassword=true)) {
        console.log(name, email, password)
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ name, email, password }),
            headers: { 'Content-Type': 'application/json' },
        });
     if (response.ok) {
        alert("character created");
        
        document.location.replace('/');        
    } else {
        console.log("browser"+response)
        alert(response.statusText);
    }
    }}

// changing bindings for buttons

document
    .querySelector('#loginButton')
    .addEventListener('click', loginFormHandler);

document
    .querySelector('#createButton')
    .addEventListener('click', signupFormHandler);