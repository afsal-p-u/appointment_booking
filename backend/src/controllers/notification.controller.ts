import { Request, Response } from "express";
import { pool } from "../utils/connection";
import { closeUserNotificationSql, getUserNotificationSql } from "../schemas/notification.schema";

export const getNotifications = async (req: Request, res: Response) => {
    const id = req.params.id

    try {
        const notification = await pool.query(getUserNotificationSql(id)) 

        return res.status(200).json(notification[0])
    } catch (err) {
        return res.status(500).json(err)
    }
}

export const closeUserNotification = async (req: Request, res: Response) => {
    const uid = req.params.uid
    const id = req.params.id
  
    try {
      await pool.query(closeUserNotificationSql(uid, id))
  
      return res.status(200).json("Deleted Successfully")
    } catch (err) {
      return res.status(500).json("Error exexuting query")
    }
  };