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