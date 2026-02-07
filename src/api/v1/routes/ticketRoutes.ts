import express from "express";
import { listTickets, viewTicket, addTicket } from "../controllers/ticketController";
import { deleteTicket, getTicketUrgency } from "../controllers/ticketController";

const router = express.Router();

router.get("/tickets", listTickets);
router.get("/tickets/:id", viewTicket);
router.post("/tickets", addTicket);
router.delete("/tickets/:id", deleteTicket);
router.get("/tickets/:id/urgency", getTicketUrgency);

export default router;
