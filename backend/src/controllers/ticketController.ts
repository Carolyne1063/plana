import { Request, Response } from 'express';
import * as ticketService from '../services/ticketService';
import { getTicketSummaryByEventId } from '../services/ticketService';

// Create a new ticket
export const createTicket = async (req: Request, res: Response) => {
    try {
        const ticket = await ticketService.createTicket(req.body);
        res.status(201).json(ticket);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
};

// Get all tickets
export const getAllTickets = async (req: Request, res: Response) => {
    try {
        const tickets = await ticketService.getAllTickets();
        res.status(200).json(tickets);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
};

// Get a specific ticket by ID
export const getTicketById = async (req: Request, res: Response) => {
    try {
        const ticket = await ticketService.getTicketById(req.params.ticketId);
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }
        res.status(200).json(ticket);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
};

// Get tickets by user ID
export const getTicketsByUserId = async (req: Request, res: Response) => {
    try {
        const tickets = await ticketService.getTicketsByUserId(req.params.userId);
        res.status(200).json(tickets);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
};

// Get tickets by event ID
export const getTicketsByEventId = async (req: Request, res: Response) => {
    try {
        const tickets = await ticketService.getTicketsByEventId(req.params.eventId);
        res.status(200).json(tickets);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
};

// Update a specific ticket by ID
export const updateTicket = async (req: Request, res: Response) => {
    try {
        await ticketService.updateTicket(req.params.ticketId, req.body);
        res.status(204).send();
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
};

// Delete a specific ticket by ID
export const deleteTicket = async (req: Request, res: Response) => {
    try {
        await ticketService.deleteTicket(req.params.ticketId);
        res.status(204).send();
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
};

export const getTicketSummary = async (req: Request, res: Response) => {
    try {
        const { eventId } = req.params;
        const summary = await getTicketSummaryByEventId(eventId);
        if (summary) {
            res.status(200).json(summary);
        } else {
            res.status(404).json({ error: 'Event not found or no tickets available.' });
        }
    } catch (error) {
        console.error('Error fetching ticket summary:', error);  // Log the error
        res.status(500).json({ error: 'Error fetching ticket summary' });
    }
};
