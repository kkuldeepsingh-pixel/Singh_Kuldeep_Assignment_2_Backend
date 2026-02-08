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

// Validation helpers
export const isValidPriority = (priority: any) => 
  ["critical", "high", "medium", "low"].includes(priority);

export const isValidStatus = (status: any) =>
  ["open", "in-progress", "resolved"].includes(status);

// Ticket urgency calculation 

export const calculateUrgency = (ticket: Ticket) => {
  if (ticket.status === "resolved") {
    return { score: 0, level: "LOW" };
  }

  const baseScores = {
    critical: 50,
    high: 30,
    medium: 20,
    low: 10,
  };

  const now = new Date();
  const created = new Date(ticket.createdAt);
  const ageDays = Math.floor(
    (now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24)
  );

  let urgencyScore = baseScores[ticket.priority] + ageDays;

  let level: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL" = "LOW";

  if (urgencyScore >= 70) level = "CRITICAL";
  else if (urgencyScore >= 30) level = "HIGH";
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

// Validate priority
export const validatePriority = (priority: any): priority is "critical" | "high" | "medium" | "low" =>
  ["critical", "high", "medium", "low"].includes(priority);

// Validate status
export const validateStatus = (status: any): status is "open" | "in-progress" | "resolved" =>
  ["open", "in-progress", "resolved"].includes(status);
