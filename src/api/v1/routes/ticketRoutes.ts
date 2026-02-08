import express from "express";
import { listTickets, viewTicket, addTicket } from "../controllers/ticketController";
import { deleteTicket, getTicketUrgency, updateTicket } from "../controllers/ticketController";

const router = express.Router();

router.get("/tickets", listTickets);
router.get("/tickets/:id", viewTicket);
router.post("/tickets", addTicket);
router.delete("/tickets/:id", deleteTicket);
router.get("/tickets/:id/urgency", getTicketUrgency);
router.put("/tickets/:id", updateTicket);

export default router;
