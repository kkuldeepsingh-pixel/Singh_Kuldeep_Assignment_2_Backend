import { Request, Response } from "express";
import { getTickets, getTicketById } from "../services/ticketService";
import { deleteTicketById } from "../services/ticketService";
import { calculateUrgency } from "../services/ticketService";
import { updateTicketById } from "../services/ticketService";
import { isValidPriority } from "../services/ticketService";

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

// Add a new ticket 
export const addTicket = (req: Request, res: Response) => {
  const { title, description, priority } = req.body;

  // Validation
  if (!title) return res.status(400).json({ message: "Missing required field: title" });
  if (!description) return res.status(400).json({ message: "Missing required field: description" });
 if (!isValidPriority(priority))
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

// Update an existing ticket
export const updateTicket = (req: Request, res: Response) => {
  const { id } = req.params;
  const updates = req.body;

  const updatedTicket = updateTicketById(id as string, updates);

  if (!updatedTicket) {
    return res.status(404).json({ message: "Ticket not found" });
  }

  res.json(updatedTicket);
};

// Delete a ticket
export const deleteTicket = (req: Request, res: Response) => {
  const deleted = deleteTicketById(req.params.id as string);

  if (!deleted) {
    return res.status(404).json({ message: "Ticket not found" });
  }

  res.status(200).json({ message: "Ticket deleted successfully" });
};

// Calculate ticket urgency
export const getTicketUrgency = (req: Request, res: Response) => {
  const ticket = getTicketById(req.params.id as string);
  if (!ticket) return res.status(404).json({ message: "Ticket not found" });

  const urgency = calculateUrgency(ticket);
  res.json({ ...ticket, urgency });
};


