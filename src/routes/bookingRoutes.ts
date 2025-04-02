import express from "express";
import { bookBed, updateBooking, cancelBooking } from "../controllers/bookingController";

const bookingRouter = express.Router();

// Route to book a bed
bookingRouter.post("/book", bookBed);

// Route to update booking details
bookingRouter.put("/:id", updateBooking);

// Route to cancel a booking
bookingRouter.delete("/:id", cancelBooking);

export default bookingRouter;
