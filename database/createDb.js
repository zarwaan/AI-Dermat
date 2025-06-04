import * as mysql from 'mysql2';
import * as dotenv from 'dotenv';
dotenv.config();

var conn = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
})

const DB_NAME = process.env.DB_NAME;
const dbCreationQuery = `CREATE DATABASE IF NOT EXISTS ${DB_NAME}`;

conn.connect((connectErr)=>{
    if(connectErr) throw connectErr;
    else
    {
        console.log('Connected!');
    }
});

conn.query(dbCreationQuery,(dbCreateError) => {
    if(dbCreateError) throw dbCreateError;
    console.log("Created!");
})

conn.end();