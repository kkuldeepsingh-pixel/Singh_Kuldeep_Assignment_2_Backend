import { Request, Response } from "express";
import { getTickets, getTicketById } from "../services/ticketService";

export const listTickets = (req: Request, res: Response) => {
  res.json(getTickets());
};

export const viewTicket = (req: Request, res: Response) => {
  const ticket = getTicketById(req.params.id as string);
  if (!ticket) return res.status(404).json({ message: "Ticket not found" });
  res.json(ticket);
};
