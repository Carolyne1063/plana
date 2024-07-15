// controllers/ticket.controller.ts

import { Request, Response } from 'express';
import * as TicketService from '../services/ticketService';
import { Ticket } from '../interfaces/tickets';

// Utility function for handling errors
const handleError = (error: unknown): string => {
    if (error instanceof Error) {
        return error.message;
    } else {
        return 'An unknown error occurred';
    }
};

export const createTicket = async (req: Request, res: Response) => {
    try {
        const ticket: Ticket = req.body;
        await TicketService.createTicket(ticket);
        res.status(201).json({ message: 'Ticket created successfully.' });
    } catch (error) {
        res.status(500).json({ error: handleError(error) });
    }
};

export const getAllTickets = async (req: Request, res: Response) => {
    try {
        const tickets = await TicketService.getAllTickets();
        res.status(200).json(tickets);
    } catch (error) {
        res.status(500).json({ error: handleError(error) });
    }
};

export const getTicketById = async (req: Request, res: Response) => {
    try {
        const { ticketId } = req.params;
        const ticket = await TicketService.getTicketById(ticketId);
        if (ticket) {
            res.status(200).json(ticket);
        } else {
            res.status(404).json({ message: 'Ticket not found.' });
        }
    } catch (error) {
        res.status(500).json({ error: handleError(error) });
    }
};

export const updateTicket = async (req: Request, res: Response) => {
    try {
        const { ticketId } = req.params;
        const ticket: Partial<Ticket> = req.body;
        await TicketService.updateTicket(ticketId, ticket);
        res.status(200).json({ message: 'Ticket updated successfully.' });
    } catch (error) {
        res.status(500).json({ error: handleError(error) });
    }
};

export const deleteTicket = async (req: Request, res: Response) => {
    try {
        const { ticketId } = req.params;
        await TicketService.deleteTicket(ticketId);
        res.status(200).json({ message: 'Ticket deleted successfully.' });
    } catch (error) {
        res.status(500).json({ error: handleError(error) });
    }
};
