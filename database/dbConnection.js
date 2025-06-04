import * as mysql from 'mysql2';
import * as dotenv from 'dotenv';
dotenv.config();

const pool = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const conn = {
    query: (sql,params,callback) => pool.query(sql,params,callback),
};

export {conn};