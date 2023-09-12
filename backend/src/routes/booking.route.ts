import { cancelUserBooking, getUserBooking, newBooking } from "../controllers/booking.controller";
import express from "express";
const router = express.Router()

router.post('/', newBooking)
router.get('/:id', getUserBooking)
router.delete('/:uid/:id', cancelUserBooking)

export default router