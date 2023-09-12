import { Request, Response } from "express";
import { pool } from "../utils/connection";
import { createTableBookingsSql, insertBookingSql, getUserBookingSql, cancelUserBookingSql } from "../schemas/booking.schema";
import { createTableNotificationSql, insertNotificationSql } from "../schemas/notification.schema";

export const newBooking = async (req: Request, res: Response) => {
  const { name, number, age, gender, user_id, date, time } = req.body;

  try {
    await pool.query(createTableBookingsSql)
    await pool.query(insertBookingSql, [user_id, name, number, age, gender, date, time])

    await pool.query(createTableNotificationSql)
    await pool.query(insertNotificationSql, [user_id, `Your booking ${date} successfull`])

    return res.status(200).json('Booked successfully')
  } catch (err) {
    return res.status(500).json("Error exexuting query")
  }
};

export const getUserBooking = async (req: Request, res: Response) => {
  const id = req.params.id

  try {
    const bookings = await pool.query(getUserBookingSql(id))

    return res.status(200).json(bookings[0])
  } catch (err) {
    return res.status(500).json("Error exexuting query")
  }
};

export const cancelUserBooking = async (req: Request, res: Response) => {
  const uid = req.params.uid
  const id = req.params.id

  try {
    await pool.query(cancelUserBookingSql(uid, id))
    
    await pool.query(createTableNotificationSql)
    await pool.query(insertNotificationSql, [uid, `Your booking cancelled`])

    return res.status(200).json("Deleted Successfully")
  } catch (err) {
    return res.status(500).json("Error exexuting query")
  }
};
