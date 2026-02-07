import { Request, Response } from "express";
import { getTickets, getTicketById } from "../services/ticketService";

// List all tickets
export const listTickets = (req: Request, res: Response) => {
  res.json(getTickets());
};

// View a single ticket by ID
export const viewTicket = (req: Request, res: Response) => {
  const ticket = getTicketById(req.params.id as string);
  if (!ticket) return res.status(404).json({ message: "Ticket not found" });
  res.json(ticket);
};

// Add a new ticket (optional, based on your notes)
export const addTicket = (req: Request, res: Response) => {
  const { title, description, priority } = req.body;

  // Validation
  if (!title) return res.status(400).json({ message: "Missing required field: title" });
  if (!description) return res.status(400).json({ message: "Missing required field: description" });
  if (!["critical", "high", "medium", "low"].includes(priority))
    return res.status(400).json({ message: "Invalid priority. Must be one of: critical, high, medium, low" });

  const id = (getTickets().length + 1).toString();

  const ticket = {
    id,
    title,
    description,
    priority,
    status: "open" as const,
    createdAt: new Date().toISOString(),
  };

  getTickets().push(ticket);

  res.status(201).json(ticket);
};
