import * as mysql from 'mysql2';
import { conn } from './dbConnection.js';

const USERS_QUERY = `CREATE TABLE IF NOT EXISTS users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(50) NOT NULL UNIQUE,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    password VARCHAR(60) NOT NULL
)`;

const DOCTORS_QUERY = `CREATE TABLE IF NOT EXISTS doctors (
    doctor_id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(50) NOT NULL UNIQUE,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL
)`;

const APPOINTMENTS_QUERY = `CREATE TABLE IF NOT EXISTS appointments(
    user_id INT NOT NULL,
    doctor_id INT NOT NULL,
    consultation_type VARCHAR(30) NOT NULL,
    date VARCHAR(5) NOT NULL,
    month VARCHAR(10) NOT NULL,
    year VARCHAR(4) NOT NULL,
    time_slot VARCHAR(10) NOT NULL,
    symptoms VARCHAR(100) NOT NULL,
    symptom_duration VARCHAR(30) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (doctor_id) REFERENCES doctors(doctor_id) ON DELETE CASCADE
)`;

const MEDICAL_HISTORY_QUERY = `CREATE TABLE IF NOT EXISTS medical_history(
    user_id INT NOT NULL,
    current_medication VARCHAR(100),
    known_allergies VARCHAR(100),
    past_information VARCHAR(100),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
)`

conn.query(USERS_QUERY,(err,res)=>{
    if(err) throw err;
    console.log('Created Users!');
});

conn.query(DOCTORS_QUERY,(err,res)=>{
    if(err) throw err;
    console.log('Created Doctors!');
});

conn.query(APPOINTMENTS_QUERY,(err,res)=>{
    if(err) throw err;
    console.log('Created Appointments!');
});

conn.query(MEDICAL_HISTORY_QUERY,(err,res)=>{
    if(err) throw err;
    console.log('Created medical history!');
});