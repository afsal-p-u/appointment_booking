import { Request, Response } from "express";
const CryptoJS = require("crypto-js");
import jwt from "jsonwebtoken";

import mysql from "mysql2/promise";

var conn = {
  host: "localhost",
  user: "root",
  password: "1234",
  database: "appoinment_booking",
};

export const signup = async (req: Request, res: Response) => {
  const { username, email } = req.body;
  const password = await CryptoJS.AES.encrypt(
    req.body.password,
    process.env.CRYPTOJS_SECRET
  ).toString();

  try {
    const pool = mysql.createPool(conn);

    var createTableSql = `CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL,
            isAdmin BOOLEAN DEFAULT false
            )`;

    await pool.query(createTableSql);

    const insertUsersSql = `
            INSERT INTO users(username, password, email)
            VALUES (?, ?, ?)`;

    await pool.query(insertUsersSql, [username, password, email]);

    return res.status(200).json("User registration successfull");
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const pool = mysql.createPool(conn);
  const rows = await pool.query(`SELECT * FROM users WHERE email = ?`, [email]);

  const row: any = rows[0];
  const user = row[0];

  if (row.length === 0) {
    return res.status(403).json("User does not exist");
  }

  const decryptedPassword = CryptoJS.AES.decrypt(
    user.password,
    process.env.CRYPTOJS_SECRET
  ).toString(CryptoJS.enc.Utf8);
  if (password !== decryptedPassword) {
    return res.status(400).json("Incorrect password");
  }

  try {
    const accessToken = jwt.sign(
      {
        email: user.email,
        id: user.id,
      },
      process.env.JWT_SECRETKEY,
      {
        expiresIn: "4d",
      }
    );

    res.cookie("token", accessToken);
    return res.status(200).json(accessToken);
  } catch (err) {
    return res.status(500).json(err);
  }
};
