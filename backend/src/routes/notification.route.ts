import { closeUserNotification, getNotifications } from "../controllers/notification.controller";
import express from "express";
const router = express.Router()

router.get('/:id', getNotifications)
router.delete('/:uid/:id', closeUserNotification)

export default router