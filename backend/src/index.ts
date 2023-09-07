import express from 'express'
import http from 'http'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import cors from 'cors'
import mysql from 'mysql2'
import dotenv from 'dotenv'

import authRoute from './routes/auth.route'

dotenv.config()
const app = express()
app.use(cors())
// app.use(cors({
//     Credentials: true
// }))
app.use(cookieParser())
app.use(bodyParser.json())

app.use('/api/auth', authRoute)

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
})

connection.connect((err) => {
    if (err) {
        console.log(err)
        return
    }
    console.log('Connection successfull')

    const sql = `CREATE DATABASE IF NOT EXISTS appoinment_booking`
    connection.query(sql, function (err, result) {
        if (err) console.log('error', err);
    });
})

app.listen(8080, () => {
    console.log('Server running on port ', 8080)
})