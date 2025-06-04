import { addHeader } from "./header.js";
addHeader(document.body);

document.addEventListener('DOMContentLoaded', function() {
    // Quick action cards click handler
    const actionCards = document.querySelectorAll('.action-card');
    actionCards.forEach(card => {
        card.addEventListener('click', function() {
            const action = this.querySelector('h3').textContent;
            
            switch(action) {
                case 'Book Appointment':
                    window.location.href = '/booking';
                    break;
                case 'Skin Analysis':
                    window.location.href = '/skin-analysis';
                    break;
                case 'Take Quiz':
                    window.location.href = '/quiz';
                    break;
                case 'Chat with AI':
                    window.location.href = '/chat';
                    break;
            }
        });
    });

    // Cancel appointment button handler
    // const cancelButtons = document.querySelectorAll('.btn-outline');
    // cancelButtons.forEach(button => {
    //     button.addEventListener('click', function(e) {
    //         e.stopPropagation();
    //         if (confirm('Are you sure you want to cancel this appointment?')) {
    //             // Here you would normally send a request to your backend
    //             // For demo purposes, we'll just remove the appointment card
    //             this.closest('.appointment-card').remove();
    //         }
    //     });
    // });
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

async function displayUserDetails(){
    const userDetails = await fetchUserData();
    const userHistory = await fetchMedicalHistory();
    
    document.getElementById('display-username').textContent = "Welcome back, "+userDetails.username+"!";
    document.querySelector('#display-full-name p').textContent = userDetails.first_name + ' ' + userDetails.last_name;
    document.querySelector('#display-email p').textContent = userDetails.email || 'Not provided';
    document.querySelector('#display-dob p').textContent = userDetails.date_of_birth || 'Not provided';
    document.querySelector('#display-contact p').textContent = userDetails.contact || 'Not provided';
    document.querySelector('#display-meds p').textContent = userHistory.current_medication || 'Not provided';
    document.querySelector('#display-allgs p').textContent = userHistory.known_allergies || 'Not provided';
    document.querySelector('#display-past-info p').textContent = userHistory.past_information || 'Not provided';

}

async function fetchAppointements(){
    const response = await fetch('/get-appointments',{
        method: "GET",
        headers: {
            'content-type': 'application/json'
        }
    });
    const result = await response.json();
    if(response.ok){
        return result['result']
    }
    else{
        console.log(result)
    }
}

async function fetchDoctor(doctorId){
    //fetch from database
    //John Doe for now
    const result = {
        doctor_id: 1,
        email: 'drjohndoe@gmail.com',
        first_name: "John",
        last_name: "Doe"
    };
    return result;
}

async function displayAppointments(){
    const appointments = await fetchAppointements();
    if(appointments.length===0){
        document.querySelector(".appointments-list").append("No scheduled appointments!");
        return;
    }

    appointments.forEach(async app => {
        const card = document.createElement('div');
        card.classList.add('appointment-card');
        card.dataset.appointmentId = app.appointment_id;

        const doctor = await fetchDoctor(app.doctor_id);

        card.innerHTML = `
            <div class="appointment-date">
                <div class="month">${app.month.substring(0,3)}</div>
                <div class="day">${app.date}</div>
            </div>
            <div class="appointment-details">
                <h3>${app.consultation_type}</h3>
                <p>Dr. ${doctor.first_name} ${doctor.last_name}</p>
                <p>${app.time_slot}</p>
                <p>Symptoms enlisted: ${app.symptoms}</p>
                <p>Symptom duration: ${app.symptom_duration}</p>
            </div>
        `
        card.append(createCancelButton());

        document.querySelector(".appointments-list").append(card);
    });
}

function createCancelButton(){
    const cancelButtonCont = Object.assign(document.createElement('div'),{
        className: "appointment-actions"
    });
    const cancelButton = Object.assign(document.createElement('button'),{
        className: "btn btn-outline",
        textContent: "Cancel"
    });
    cancelButton.onclick = async (e) => {
        e.stopPropagation();
        const appointmentId = e.target.closest(".appointment-card").dataset.appointmentId;
        if (confirm('Are you sure you want to cancel this appointment?')){
            await cancelAppointment(appointmentId);
        }
    }
    cancelButtonCont.append(cancelButton);
    return cancelButtonCont;
}

async function cancelAppointment(appointmentId){
    const response = await fetch('/cancel-appointment',{
        method: "POST",
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({appointmentId})
    });
    const result = await response.json();
    if(response.ok){
        alert('Deleted successfully');
        window.location.reload();
    }
    else{
        console.log(result)
    }
}

if(Cookies.get('userInfo')){
    document.getElementById('not-logged-in').hidden = true;
    await displayUserDetails();
    await displayAppointments();
}
else{
    document.querySelector('.appointment-history').hidden = true;
    document.querySelector('.patient-information').hidden = true;
    document.getElementById('go-to-booking').style.display='none';
}