const signupForm = document.getElementById('signup-form');
const errorMessage = document.getElementById('error-text');
let userInput = {};
document.querySelectorAll('.form-group input').forEach((input) => {
    const id = input.id;
    userInput[`${id}`] = input;
});

function setErrorMessage(message) {
    errorMessage.innerHTML = message;
}

async function signup(username, email, password, firstName, lastName) {
    try {
        const response = await fetch('/register',{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username,email,firstName,lastName,password})
        });
        const result = await response.json();
        if(response.ok){
            window.open('/',"_self")
        }
        else{
            console.log(result)
            setErrorMessage(result['message'])
        }
    } catch (error) {
        console.log(error)
    }
}

signupForm.onsubmit = async (e) => {
    e.preventDefault();
    if(userInput.password.value.trim() !== userInput.confirmPassword.value.trim()){
        return setErrorMessage("Passwords don't match!")
    }
    await signup(userInput.username.value.trim(),userInput.email.value.trim(),userInput.password.value.trim(),
                userInput.firstName.value.trim(),userInput.lastName.value.trim());
}