const otp = document.getElementById('otp');
const otpForm = document.getElementById('otp-form');
const errorText = document.getElementById('error-text');

const emailInput = document.getElementById('email');
const emailForm = document.getElementById('send-email-form');

const changePassForm = document.getElementById('change-pass-form');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');

// document.getElementById('head-text').textContent = 'Change your password';
// document.getElementById('subtext').hidden = true;
// document.getElementById('otp-sent').hidden = true;
// otpForm.hidden = true;
// emailForm.hidden = true;
// changePassForm.hidden = false;
// setErrorMessage('');

let generatedOTP, email;

function setErrorMessage(message){
    errorText.textContent = message
}

async function verifyEmail(otp,generatedOTP){
    if(otp === generatedOTP){
        // window.open('/',"_self");
        document.getElementById('head-text').textContent = 'Change your password';
        document.getElementById('subtext').hidden = true;
        document.getElementById('otp-sent').hidden = true;
        otpForm.hidden = true;
        emailForm.hidden = true;
        changePassForm.hidden = false;
        setErrorMessage('');
    }
    else{
        setErrorMessage("Incorrect OTP!")
    }
}

async function sendEmail(recipient){
    const response = await fetch('/send-email-otp',{
        method: 'POST',
        headers: {
            'content-type':'application/json'
        },
        body: JSON.stringify({recipient})
    });
    const result = await response.json();
    if(response.ok){
        return result['OTP']
    }
    else{
        console.log(result);
        setErrorMessage(result['message']);
        return null;
    }
}

emailForm.onsubmit = async (e) => {
    e.preventDefault();
    const recipient = emailInput.value;
    generatedOTP = await sendEmail(recipient);
    console.log(generatedOTP);
    if(generatedOTP !== null){
        email = emailInput.value;
        otpForm.querySelector('input').disabled = false;
        otpForm.querySelector('button').disabled = false;
        document.getElementById('otp-sent').style.display= '';
    }
}

otpForm.onsubmit = (e) => {
    e.preventDefault();
    verifyEmail(otp.value,generatedOTP);
}

changePassForm.onsubmit = async (e) => {
    e.preventDefault();
    if(passwordInput.value.trim() !== confirmPasswordInput.value.trim()){
        return setErrorMessage("Passwords don't match!")
    }
    const password = passwordInput.value.trim();
    const response = await fetch('/change-password',{
        method: 'POST',
        headers: {
            'content-type':'application/json'
        },
        body: JSON.stringify({email, password})
    });
    const result = await response.json();
    if(response.ok){
        window.open('/',"_self")
    }
    else{
        setErrorMessage(result['message'])
    }
}