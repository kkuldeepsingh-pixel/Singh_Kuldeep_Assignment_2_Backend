import express from "express";
import { listTickets, viewTicket, addTicket } from "../controllers/ticketController";
import { deleteTicket } from "../controllers/ticketController";

const router = express.Router();

router.get("/tickets", listTickets);
router.get("/tickets/:id", viewTicket);
router.post("/tickets", addTicket);
router.delete("/tickets/:id", deleteTicket);

export default router;
