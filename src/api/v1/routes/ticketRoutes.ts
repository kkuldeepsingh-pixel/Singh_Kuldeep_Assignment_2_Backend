import express from "express";
import { listTickets, viewTicket } from "../controllers/ticketController";

const router = express.Router();

router.get("/tickets", listTickets);
router.get("/tickets/:id", viewTicket);

export default router;
