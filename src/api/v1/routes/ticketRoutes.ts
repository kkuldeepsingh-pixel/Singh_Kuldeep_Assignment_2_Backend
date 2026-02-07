import express from "express";
import { listTickets, viewTicket, addTicket } from "../controllers/ticketController";

const router = express.Router();

router.get("/tickets", listTickets);
router.get("/tickets/:id", viewTicket);
router.post("/tickets", addTicket);

export default router;
