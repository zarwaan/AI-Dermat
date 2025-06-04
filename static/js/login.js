const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginFrom = document.getElementById('login-form');
const errorMessage = document.getElementById('error-text');

function setErrorMessage(message) {
    errorMessage.innerHTML = message;
}

async function login(username, password) {
    try {
        const response = await fetch('/signin',{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username,password})
        });
        const result = await response.json();
        if(response.ok){
            window.open('/',"_self");
        }
        else{
            console.log(result);
            setErrorMessage(result.message);
        }
    } catch (error) {
        console.log(error)
    }
}

loginFrom.onsubmit = async (e) => {
    e.preventDefault();
    await login(usernameInput.value, passwordInput.value);
}