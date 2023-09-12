import mysql from 'mysql2/promise'

var conn = {
    host: "localhost",
    user: "root",
    password: "1234",
    database: "appoinment_booking",
};

export const pool =  mysql.createPool(conn);