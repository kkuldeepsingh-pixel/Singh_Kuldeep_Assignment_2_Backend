import { Request, Response } from "express";
import * as ticketController from "../src/api/v1/controllers/ticketController";
import * as ticketService from "../src/api/v1/services/ticketService";

describe("Ticket Controller (Scenario B)", () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;

  beforeEach(() => {
    // Reset tickets before each test
    ticketService.getTickets().length = 0;

    jsonMock = jest.fn();
    statusMock = jest.fn(() => ({ json: jsonMock }));

    mockRes = {
      json: jsonMock,
      status: statusMock,
    };
  });

  
  // List Tickets
  
  it("listTickets - should return empty array when no tickets", () => {
    // Arrange
    mockReq = {};

    // Act
    ticketController.listTickets(mockReq as Request, mockRes as Response);

    // Assert
    expect(jsonMock).toHaveBeenCalledWith([]);
  });

  
  // Add Ticket

  it("addTicket - should add a ticket with valid data", () => {
    // Arrange
    mockReq = {
      body: {
        title: "Test ticket",
        description: "Test description",
        priority: "high",
      },
    };

    // Act
    ticketController.addTicket(mockReq as Request, mockRes as Response);

    // Assert
    const tickets = ticketService.getTickets();
    expect(tickets.length).toBe(1);
    expect(tickets[0].title).toBe("Test ticket");
    expect(jsonMock).toHaveBeenCalledWith(expect.objectContaining({ title: "Test ticket" }));
  });

  it("addTicket - should reject missing title", () => {
    // Arrange
    mockReq = { body: { description: "desc", priority: "medium" } };

    // Act
    ticketController.addTicket(mockReq as Request, mockRes as Response);

    // Assert
    expect(statusMock).toHaveBeenCalledWith(400);
    expect(jsonMock).toHaveBeenCalledWith({ message: "Missing required field: title" });
  });

  it("addTicket - should reject invalid priority", () => {
    // Arrange
    mockReq = { body: { title: "t", description: "d", priority: "wrong" } };

    // Act
    ticketController.addTicket(mockReq as Request, mockRes as Response);

    // Assert
    expect(statusMock).toHaveBeenCalledWith(400);
    expect(jsonMock).toHaveBeenCalledWith({
      message: "Invalid priority. Must be one of: critical, high, medium, low",
    });
  });

  
  // Update Ticket
 
  it("updateTicket - should update an existing ticket", () => {
    // Arrange
    ticketService.getTickets().push({
      id: "1",
      title: "Old title",
      description: "desc",
      priority: "medium",
      status: "open",
      createdAt: new Date().toISOString(),
    });

    mockReq = {
      params: { id: "1" },
      body: { title: "New title", priority: "high" },
    };

    // Act
    ticketController.updateTicket(mockReq as Request, mockRes as Response);

    // Assert
    expect(jsonMock).toHaveBeenCalledWith(
      expect.objectContaining({ title: "New title", priority: "high" })
    );
  });

  it("updateTicket - should return 404 if ticket not found", () => {
    // Arrange
    mockReq = { params: { id: "999" }, body: {} };

    // Act
    ticketController.updateTicket(mockReq as Request, mockRes as Response);

    // Assert
    expect(statusMock).toHaveBeenCalledWith(404);
    expect(jsonMock).toHaveBeenCalledWith({ message: "Ticket not found" });
  });

  // Delete Ticket
  
  it("deleteTicket - should delete existing ticket", () => {
    // Arrange
    ticketService.getTickets().push({
      id: "1",
      title: "Test",
      description: "desc",
      priority: "low",
      status: "open",
      createdAt: new Date().toISOString(),
    });

    mockReq = { params: { id: "1" } };

    // Act
    ticketController.deleteTicket(mockReq as Request, mockRes as Response);

    // Assert
    expect(jsonMock).toHaveBeenCalledWith({ message: "Ticket deleted successfully" });
    expect(ticketService.getTickets().length).toBe(0);
  });

  it("deleteTicket - should return 404 if ticket not found", () => {
    // Arrange
    mockReq = { params: { id: "999" } };

    // Act
    ticketController.deleteTicket(mockReq as Request, mockRes as Response);

    // Assert
    expect(statusMock).toHaveBeenCalledWith(404);
    expect(jsonMock).toHaveBeenCalledWith({ message: "Ticket not found" });
  });

 
  // Ticket Urgency
  
  it("getTicketUrgency - should calculate urgency correctly", () => {
  // Arrange
  const createdAt = new Date();
  createdAt.setDate(createdAt.getDate() - 25); // 25 days old

  ticketService.getTickets().push({
    id: "1",
    title: "Urgent",
    description: "desc",
    priority: "critical",
    status: "open",
    createdAt: createdAt.toISOString(),
  });

  mockReq = { params: { id: "1" } };

  // Act
  ticketController.getTicketUrgency(mockReq as Request, mockRes as Response);

  // Assert
  const calledArg = jsonMock.mock.calls[0][0];
  expect(calledArg.urgency.score).toBeGreaterThan(50);
  expect(calledArg.urgency.level).toBe("CRITICAL"); // now this should pass
});


  it("getTicketUrgency - should return 404 if ticket not found", () => {
    // Arrange
    mockReq = { params: { id: "999" } };

    // Act
    ticketController.getTicketUrgency(mockReq as Request, mockRes as Response);

    // Assert
    expect(statusMock).toHaveBeenCalledWith(404);
    expect(jsonMock).toHaveBeenCalledWith({ message: "Ticket not found" });
  });
});
