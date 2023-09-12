import { Request, Response } from "express";
const CryptoJS = require("crypto-js");
import jwt from "jsonwebtoken";
import { pool } from '../utils/connection'
import { createTableUsersSql, insertUserSql, userEmailFindSql } from "../schemas/auth.schema";

export const signup = async (req: Request, res: Response) => {
  const { username, email } = req.body;
  const password = await CryptoJS.AES.encrypt(
    req.body.password,
    process.env.CRYPTOJS_SECRET
  ).toString();

  try {
    await pool.query(createTableUsersSql);
    await pool.query(insertUserSql, [username, password, email]);

    return res.status(200).json("User registration successfull");
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const rows: any = await pool.query(userEmailFindSql, [email]);

  const row = rows[0];
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
    return res.status(200).json({ accessToken, user: user.id });
  } catch (err) {
    return res.status(500).json(err);
  }
};
