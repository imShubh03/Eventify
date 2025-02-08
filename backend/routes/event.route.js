import express from "express";
import { createEvent, getEvents, attendEvent, deleteEvent } from "../controllers/event.controller.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createEvent);
router.get("/", getEvents);
router.post("/:id/attend", protect, attendEvent);
router.delete("/:id", protect, deleteEvent); 

export default router;
