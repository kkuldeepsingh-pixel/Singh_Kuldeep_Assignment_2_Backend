type Ticket = {
  id: string;
  title: string;
  description: string;
  priority: "critical" | "high" | "medium" | "low";
  status: "open" | "in-progress" | "resolved";
  createdAt: string;
};

const tickets: Ticket[] = [];

export const getTickets = () => tickets;
export const getTicketById = (id: string) => tickets.find(t => t.id === id);
