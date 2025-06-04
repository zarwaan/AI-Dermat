import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import bcrypt from 'bcrypt'
import cookieParser from "cookie-parser";
import { conn } from "../database/dbConnection.js";
import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';

const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());
app.use(cookieParser());
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/static',express.static(path.join(__dirname,'../static')));

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'../templates/userDashboard.html'));
});
app.get('/quiz',(req,res)=>{
    res.sendFile(path.join(__dirname,'../templates/quiz.html'));
});
app.get('/chat',(req,res)=>{
    res.sendFile(path.join(__dirname,'../templates/gemini.html'));
});
app.get('/login',(req,res)=>{
    res.sendFile(path.join(__dirname,'../templates/login.html'));
});
app.get('/signup',(req,res)=>{
    res.sendFile(path.join(__dirname,'../templates/signup.html'));
});
app.get('/profile',(req,res)=>{
    res.sendFile(path.join(__dirname,'../templates/profile.html'));
});
app.get('/forgot-password',(req,res)=>{
    res.sendFile(path.join(__dirname,'../templates/forgotPassword.html'));
});
app.get('/skin-analysis',(req,res)=>{
    res.sendFile(path.join(__dirname,'../templates/skinAnalysis.html'));
});
app.get('/booking',(req,res)=>{
    res.sendFile(path.join(__dirname,'../templates/booking.html'));
});
// app.get('/change-password',(req,res)=>{
//     res.sendFile(path.join(__dirname,'../templates/changePassword.html'));
// });

const registerQuery = 'INSERT INTO users(username,email,first_name,last_name,password) values(?,?,?,?,?)';
const loginQuery = 'SELECT * FROM users WHERE username=?';
const passwordChangeQuery = 'UPDATE users SET password = ? WHERE email = ?';
const bookAppointmentQuery = `INSERT INTO appointments(user_id,doctor_id,consultation_type,date,month,year,time_slot,symptoms,symptom_duration) 
                                values(?,?,?,?,?,?,?,?,?)`;

async function emailExists(email){
    return new Promise((resolve, reject) => {
        conn.query('SELECT email FROM users WHERE email = ?', [email], (err, result) => {
            if (err) {
                console.error(err);
                reject(err); // Reject the promise on error
            } else {
                resolve(result.length > 0); // Resolve with true/false
            }
        });
    });
}
// console.log(await emailExists('zarwaanshroff@gmail.com'));

app.post('/register',async (httpReq,httpRes) => {
    const {username, email, password, firstName, lastName} = httpReq.body;
    if(username==='' || password==='' || firstName==='' || email===''){
        return httpRes.status(400).json({message:"Please fill all required fields!", details:null, type: "ERR_EMPTY_CREDENTIALS"});
    }
    if(!email.endsWith('@gmail.com') && !email.endsWith('@somaiya.edu')){
        return httpRes.status(400).json({message:"Please enter a valid email!", details: null, type: "ERR_INVALID_CREDENTIALS"});
    }
    //USE REGEX TO CHECK IF USERNAME DOESNT HAVE SPECIAL CHARACTERS 
    if(!/^(?=.*[a-zA-Z])[a-zA-Z0-9_-]{3,20}$/.test(username)){
        if(username.length < 3){
            return httpRes.status(400).json({message:"Username must be more than 3 characters!", details:null, type: "ERR_INVALID_CREDENTIALS"});
        }
        else if(username.length >20){
            return httpRes.status(400).json({message:"Username must be less than 20 characters!", details:null, type: "ERR_INVALID_CREDENTIALS"});
        }
        else{
            return httpRes.status(400).json({message:"Username must contain atleast one letter and may contain only letters, numbers, hyphens and underscores!", details:null, type: "ERR_INVALID_CREDENTIALS"});
        }
    }
    if(!/^[a-zA-Z]+[-']{0,1}[a-zA-Z]*[a-zA-z]+$/.test(firstName) || (lastName && !/^[a-zA-Z]+[-']{0,1}[a-zA-Z]*[a-zA-z]+$/.test(lastName))){
        return httpRes.status(400).json({message:"Names must begin and end with letters and may contain one single quote or hyphen!", details:null, type: "ERR_INVALID_CREDENTIALS"});
    }
    const hashedPassword = await bcrypt.hash(password,10);
    conn.query(registerQuery,[username, email, firstName, lastName, hashedPassword],(err,result)=>{
        if(err){
            if(err.code === 'ER_DUP_ENTRY'){
                return httpRes.status(400).json({message:"Username or email already exists!", details:null, type: "ERR_DUPLICATE_CREDENTIALS"});
            }
            if(err.code === 'ER_DATA_TOO_LONG'){
                return httpRes.status(400).json({message:"Input fields are too long!", details:null, type: "ERR_INVALID_CREDENTIALS"});
            }
            else{
                return httpRes.status(500).json({message:"Internal Server Error", details:err, type:"ERR_INTERNAL"});
            }
        }
        const user_id = result.insertId;
        const userCreds = {user_id: user_id, username: username, email:email};
        httpRes.cookie('userInfo',JSON.stringify(userCreds),{
            httpOnly: false,
            secure: false,
            sameSite: 'strict', 
            maxAge: 24 * 60 * 60 * 1000 * 7
        });
        return httpRes.status(200).json({message: "Signed up and Logged In Succesfully"});
    });
});

app.post('/signin',(HTTPreq,HTTPres) => {
    const {username, password} = HTTPreq.body;
    if(username === '' || password === ''){
        return HTTPres.status(401).json({message:"Please enter username and password!", details:null, type: "ERR_INVALID_CREDENTIALS"});
    }
    conn.query(loginQuery,[username],async (err,result)=>{
        if(err){
            console.log(err);
            return HTTPres.status(500).json({message:"Internal Server Error", details:err, type:"ERR_INTERNAL"});
        }
        if(result.length === 0){
            return HTTPres.status(401).json({message:"No such username exists!", details:err, type: "ERR_INVALID_CREDENTIALS"});
        }
        if(await bcrypt.compare(password,result[0]['password'])){
            const {user_id , username} = result[0];
            const userCreds = {user_id: user_id, username: username};

            HTTPres.cookie('userInfo',JSON.stringify(userCreds),{
                httpOnly: false,
                secure: false,  
                sameSite: 'strict', 
                maxAge: 24 * 60 * 60 * 1000 * 7
            });

            return HTTPres.status(200).json({message: "Logged In Succesfully"});
        }
        else
            return HTTPres.status(401).json({message:"Incorrect password!", details:err, type: "ERR_INVALID_CREDENTIALS"});
    });
});

app.get('/logout', (httpReq, httpRes) => {
    const userInfoCookie = httpReq.cookies.userInfo;
    if(userInfoCookie){
        httpRes.clearCookie('userInfo');
        return httpRes.status(200).json({message: "Logged out successfully"});
    }
    else
        return httpRes.status(401).json({message: "User is not logged in"});
});

app.post('/send-email-otp', async (httpReq, httpRes) => {
    // const userInfoCookie = httpReq.cookies.userInfo;
    const {recipient} = httpReq.body;
    if(recipient){
        if(await emailExists(recipient)){

            const generateOTP = () => {
                let otp = '';
                for (let i = 0; i < 6; i++) {
                    otp += Math.floor(Math.random() * 10); // Append a random digit (0-9)
                }
                return otp;
            };
            const otp = generateOTP();

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASSWORD
                }
            });

            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: recipient,
                subject: 'AI Dermat - Verify your email for password updation',
                html: `<div style="width:100%; text-align:center">
                            <h1>Hello from AI Dermat!</h1>
                            <h2>Your OTP for verifying your email is</h2>
                            <h1>${otp}</h1>    
                        </div>`
            }

            transporter.sendMail(mailOptions, (mailError, mailResult) => {
                if(mailError){
                    console.log(mailError);
                    return httpRes.status(500).json({message:"Internal Server Error", details:mailError, type:"ERR_INTERNAL"});
                }
            })

            return httpRes.status(200).json({message:"Email sent successfully",OTP:otp})
        }
        else{
            return httpRes.status(400).json({message:"User does not exist", type:"ERR_INTERNAL"});
        }
    }
    else{
        return httpRes.status(400).json({message:"No email address", type:"ERR_INTERNAL"});
    }
})

app.post('/send-email-confirmation', async (httpReq, httpRes) => {
    const {
        email, doctorId, first_name, last_name, 
        consultationType, date, month, year, timeSlot, symptoms, symptomDuration
    } = httpReq.body;

    // const doctorDetails = fetchDoctorDetails(doctorId)
    const doctorDetails = {
        email: "drjohndoe@gmail.com",
        first_name: "John",
        last_name: "Doe"
    };

    if(email){
        if(emailExists(email)){
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASSWORD
                }
            });

            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: email,
                subject: 'AI Dermat - Appointment Confirmation Details',
                html: `
                    <h1>Thank you for booking with AI dermat !</h1>
                    <h2>Please find your appointment details below</h2>
                    <hr style="color:rgb(190, 190, 190); background-color: #bebebe">

                    <h3>Patient Details:</h3>
                    <p>Patient name: ${first_name} ${last_name}</p>
                    <p>Patient email address: ${email}</p>
                    <hr style="color:rgb(190, 190, 190); background-color: #bebebe">

                    <h3>Doctor Details:</h3>
                    <p>Doctor name: Dr. ${doctorDetails.first_name} ${doctorDetails.last_name}</p>
                    <p>Doctor email address: ${doctorDetails.email}</p>
                    <hr style="color:rgb(190, 190, 190); background-color: #bebebe">

                    <h3>Appointment Details:</h3>
                    <p>Consultation Type: ${consultationType}</p>
                    <p>Appointment Date: ${month} ${date}, ${year}</p>
                    <p>Appointment Time: ${timeSlot}</p>
                    <hr style="color:rgb(190, 190, 190); background-color: #bebebe">

                    <h3>Symptoms</h3>
                    <p>Enlisted Symptoms: ${symptoms}</p>
                    <p>Symptom Duration: ${symptomDuration}</p>
                    <hr style="color:rgb(190, 190, 190); background-color: #bebebe">
                `
            }

            transporter.sendMail(mailOptions, (mailError, mailResult) => {
                if(mailError){
                    console.log(mailError);
                    return httpRes.status(500).json({message:"Internal Server Error", details:mailError, type:"ERR_INTERNAL"});
                }
                return httpRes.status(200).json({message:"Successful"});
            })
        }
    }
})

app.post('/change-password',async (httpReq, httpRes) => {
    const {email, password} = httpReq.body;
    const hashedPassword = await bcrypt.hash(password,10);
    conn.query(passwordChangeQuery,[hashedPassword, email],async (err,resutl) => {
        if(err){
            return httpRes.status(500).json({message:"Internal Server Error", details:err, type:"ERR_INTERNAL"});
        }
        return httpRes.status(200).json({message: "Changed password successfully!"});
    })
})

app.post('/book-appointment', async (httpReq, httpRes) => {
    const userInfoCookie = httpReq.cookies.userInfo;
    const {
        doctorId, consultationType, date, month, year, timeSlot, symptoms, symptomDuration
    } = httpReq.body;
    if(!userInfoCookie) return httpRes.status(400).json({message:"User not logged in!", type:"ERR_INTERNAL"});
    const user = JSON.parse(userInfoCookie);
    const userId = user.user_id;
    conn.query(bookAppointmentQuery,
        [userId,doctorId, consultationType, date, month, year, timeSlot, symptoms, symptomDuration],
            (err, result) => {
                if(err){
                    console.log(err);
                    if(err.code === 'ER_DATA_TOO_LONG'){
                        return httpRes.status(400).json({message:"Input fields are too long!", details:null, type: "ERR_INVALID_CREDENTIALS"});
                    }
                    else{
                        return httpRes.status(500).json({message:"Internal Server Error", details:err, type:"ERR_INTERNAL"});
                    }
                }
                return httpRes.status(200).json({message: "Booked Successfully!"})
            }
    )
});

app.post('/update-medical-history', (httpReq, httpRes) => {
    const userInfoCookie = httpReq.cookies.userInfo;
    if(!userInfoCookie) return httpRes.status(400).json({message:"User not logged in!", type:"ERR_INTERNAL"});
    const user = JSON.parse(userInfoCookie);
    const userId = user.user_id;
    const {
        currentMedication, knownAllergies, pastInformation
    } = httpReq.body;
    conn.query(`INSERT INTO medical_history (user_id, current_medication, known_allergies, past_information)
                VALUES (?, ?, ?, ?)
                ON DUPLICATE KEY UPDATE 
                current_medication = VALUES(current_medication), 
                known_allergies = VALUES(known_allergies), 
                past_information = VALUES(past_information)`,
                [userId, currentMedication, knownAllergies, pastInformation],
                (err,result) => {
                    if(err){
                        if(err.code === 'ER_DATA_TOO_LONG'){
                            return httpRes.status(400).json({message:"Input fields are too long!", details:null, type: "ERR_INVALID_CREDENTIALS"});
                        }
                        else{
                            return httpRes.status(500).json({message:"Internal Server Error", details:err, type:"ERR_INTERNAL"});
                        }
                    }
                    return httpRes.status(200).json({message: "Update Successfully!"})
                })
});

app.get('/get-appointments',(httpReq, httpRes) => {
    const userInfoCookie = httpReq.cookies.userInfo;
    if(!userInfoCookie) return httpRes.status(400).json({message:"User not logged in!", type:"ERR_INTERNAL"});
    const user = JSON.parse(userInfoCookie);
    const userId = user.user_id;
    conn.query(`SELECT * FROM appointments WHERE user_id = ?
         AND STR_TO_DATE(CONCAT(year, ' ', month, ' ', date), '%Y %M %d') > CURDATE()
         ORDER BY STR_TO_DATE(CONCAT(year, ' ', month, ' ', date), '%Y %M %d') ASC`,
         [userId],(err,result)=>{
            if(err){
                return httpRes.status(500).json({message:"Internal Server Error", details:err, type:"ERR_INTERNAL"});
            }
            return httpRes.status(200).json({message:"Retrieved successfully", result: result});
    });
});

app.get('/get-user-details',(HTTPreq,HTTPres) => { 
    const userInfo = HTTPreq.cookies.userInfo;
    if(!userInfo){
        return HTTPres.status(401).json({message: 'User not logged in.'});
    }
    const user = JSON.parse(userInfo);
    const userId = user.user_id;
    conn.query(`SELECT * FROM users WHERE user_id = ?`,[userId],(err,result) => {
        if(err){
            return HTTPres.status(500).json({message:"Internal Server Error", details:err, type:"ERR_INTERNAL"});
        }
        return HTTPres.status(200).json({message:"Retrieved successfully", result: result});
    });
});

app.get('/get-medical-history',(HTTPreq,HTTPres) => { 
    const userInfo = HTTPreq.cookies.userInfo;
    if(!userInfo){
        return HTTPres.status(401).json({message: 'User not logged in.'});
    }
    const user = JSON.parse(userInfo);
    const userId = user.user_id;
    conn.query(`SELECT * FROM medical_history WHERE user_id = ?`,[userId],(err,result) => {
        if(err){
            return HTTPres.status(500).json({message:"Internal Server Error", details:err, type:"ERR_INTERNAL"});
        }
        return HTTPres.status(200).json({message:"Retrieved successfully", result: result});
    });
});

app.post('/update-user-details', (httpReq, httpRes) => {
    const userInfoCookie = httpReq.cookies.userInfo;
    if(!userInfoCookie) return httpRes.status(400).json({message:"User not logged in!", type:"ERR_INTERNAL"});
    const user = JSON.parse(userInfoCookie);
    const userId = user.user_id;
    const {
        firstName, lastName, username, email, dob, contact
    } = httpReq.body;
    conn.query('UPDATE users SET username=?,email=?,first_name=?,last_name=?,date_of_birth=?,contact=? WHERE user_id=?',
                [username, email, firstName, lastName, dob, contact, userId],
                (err,result) => {
                    if(err){
                        if(err.code === 'ER_DATA_TOO_LONG'){
                            return httpRes.status(400).json({message:"Input fields are too long!", details:null, type: "ERR_INVALID_CREDENTIALS"});
                        }
                        else{
                            return httpRes.status(500).json({message:"Internal Server Error", details:err, type:"ERR_INTERNAL"});
                        }
                    }
                    return httpRes.status(200).json({message: "Update Successfully!"})
                })
});

app.post('/booked-times', (httpReq,httpRes) => {
    const {date, month, year} = httpReq.body;
    conn.query('SELECT time_slot FROM appointments WHERE date=? AND month=? AND year=?',[date,month,year],(err,result)=>{
        if(err) return httpRes.status(500).json({message:"Internal Server Error", details:err, type:"ERR_INTERNAL"});
        return httpRes.status(200).json({message:"Retrieved success",result:result});
    })
})

app.post('/cancel-appointment', (httpReq,httpRes) => {
    const {appointmentId} = httpReq.body;
    conn.query('DELETE FROM appointments WHERE appointment_id = ?',[appointmentId],(err,result)=>{
        if(err) return httpRes.status(500).json({message:"Internal Server Error", details:err, type:"ERR_INTERNAL"});
        return httpRes.status(200).json({message:"Deleted success",result:result});
    })
})

app.listen(port, ()=> console.log(`Server running at http://localhost:${port}`))