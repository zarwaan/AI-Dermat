import { addHeader } from "./header.js";
addHeader(document.body);

document.addEventListener('DOMContentLoaded', function() {
    async function loadUserData() {
        const userData = await fetchUserData();
        const medicalHistory = await fetchMedicalHistory();
        const userProfile = {...userData,...medicalHistory}
        console.log(userProfile);

        document.getElementById('firstName').value = userProfile.first_name;
        document.getElementById('lastName').value = userProfile.last_name;
        document.getElementById('username').value = userProfile.username;
        document.getElementById('contact').value = userProfile.contact || '';
        document.getElementById('email').value = userProfile.email;
        document.getElementById('dob').value = userProfile.date_of_birth || '';
        document.getElementById('medications').value = userProfile.current_medication;
        document.getElementById('allergies').value = userProfile.known_allergies;
        document.getElementById('skinConditions').value = userProfile.past_information;
    }
    
    async function saveUserData() {
        const updatedProfile = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            username: document.getElementById('username').value,
            contact: document.getElementById('contact').value,
            email: document.getElementById('email').value,
            dob: document.getElementById('dob').value,
            currentMedication: document.getElementById('medications').value,
            knownAllergies: document.getElementById('allergies').value,
            pastInformation: document.getElementById('skinConditions').value
        };
        
        await updateUserProfile(updatedProfile);
    }

    document.getElementById('saveChanges').addEventListener('click', saveUserData);

    document.getElementById('logout').onclick = async () => {
        const response = await fetch('/logout');
        const result = await response.json();
        if(response.ok){
            window.open('/',"_self")
        }
        else{
            console.log(result);
        }
    }
    
    loadUserData();
});

async function fetchUserData() {
    const response = await fetch('/get-user-details',{
        method: "GET",
        headers: {
            'content-type': 'application/json'
        }
    });
    const result = await response.json();
    if(response.ok) return result['result'][0]
    return null
}

async function fetchMedicalHistory() {
    const response = await fetch('/get-medical-history',{
        method: "GET",
        headers: {
            'content-type': 'application/json'
        }
    });
    const result = await response.json();
    if(response.ok && result['result'].length>0) return result['result'][0]
    else return {
        current_medication: '', known_allergies: '', past_information: ''
    }
}

async function updateUserProfile(updatedProfile){
    const {firstName, lastName, username, email, contact, dob, ...other} = updatedProfile;
    const userDetails = {firstName, lastName, username, email, contact, dob};
    const medicalHistory = {...other};
    const response1 = await fetch('/update-user-details',{
        method: "POST",
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(userDetails)
    });
    const result1 = await response1.json();

    const response2 = await fetch('/update-medical-history',{
        method: "POST",
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(medicalHistory)
    });
    const result2 = await response2.json();

    if(response1.ok && response2.ok){
        alert('Updated!');
        window.location.reload();
    }
    else{
        console.log(result1);
        console.log(result2);
    }
}