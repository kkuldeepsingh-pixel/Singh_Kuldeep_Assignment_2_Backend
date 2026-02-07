type Ticket = {
  id: string;
  title: string;
  description: string;
  priority: "critical" | "high" | "medium" | "low";
  status: "open" | "in-progress" | "resolved";
  createdAt: string;
};

let tickets: Ticket[] = [];

export const getTickets = () => tickets;
export const getTicketById = (id: string) => tickets.find(t => t.id === id);
export const deleteTicketById = (id: string) => {
  const originalLength = tickets.length;

  tickets = tickets.filter(t => t.id !== id);

  return tickets.length !== originalLength;
};

// Ticket urgency calculation 
export const calculateUrgency = (ticket: Ticket) => {
  if (ticket.status === "resolved") return { score: 0, level: "Resolved" };

  const baseScores = {
    critical: 50,
    high: 30,
    medium: 20,
    low: 10,
  };

  const now = new Date();
  const created = new Date(ticket.createdAt);
  const ageDays = Math.floor((now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24));

  const ageMultiplier = 1; 
  const urgencyScore = baseScores[ticket.priority] + ageDays * ageMultiplier;

  let level: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL" = "LOW";

  if (urgencyScore >= 70) level = "CRITICAL";
  else if (urgencyScore >= 40) level = "HIGH";
  else if (urgencyScore >= 25) level = "MEDIUM";

  return { score: urgencyScore, level };
};

// Update ticket by ID
export const updateTicketById = (
  id: string,
  updates: Partial<Pick<Ticket, "title" | "description" | "priority" | "status">>
) => {
  const ticket = tickets.find(t => t.id === id);
  if (!ticket) return null;

  if (updates.title !== undefined) ticket.title = updates.title;
  if (updates.description !== undefined) ticket.description = updates.description;
  if (updates.priority !== undefined) ticket.priority = updates.priority;
  if (updates.status !== undefined) ticket.status = updates.status;

  return ticket;
};