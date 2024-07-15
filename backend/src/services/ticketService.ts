import * as sql from 'mssql';
import { sqlConfig } from '../sqlConfig';
import { Ticket } from '../interfaces/tickets';
import { v4 as uuidv4 } from 'uuid';

export const createTicket = async (ticket: Ticket) => {
    const ticketId = uuidv4();
    const pool = await sql.connect(sqlConfig);
    await pool.request()
        .input('ticketId', sql.NVarChar, ticketId)
        .input('eventId', sql.UniqueIdentifier, ticket.eventId)
        .input('userId', sql.NVarChar, ticket.userId)
        .input('type', sql.NVarChar, ticket.type)
        .input('numberOfTickets', sql.Int, ticket.numberOfTickets)
        .input('promotionId', sql.NVarChar, ticket.promotionId)
        .execute('CreateTicket');
};

export const getAllTickets = async () => {
    const pool = await sql.connect(sqlConfig);
    const result = await pool.request().execute('GetAllTickets');
    return result.recordset;
};

export const getTicketById = async (ticketId: string) => {
    const pool = await sql.connect(sqlConfig);
    const result = await pool.request()
        .input('ticketId', sql.NVarChar, ticketId)
        .execute('GetTicketById');
    return result.recordset[0];
};

export const updateTicket = async (ticketId: string, ticket: Partial<Ticket>) => {
    const pool = await sql.connect(sqlConfig);
    await pool.request()
        .input('ticketId', sql.NVarChar, ticketId)
        .input('eventId', sql.UniqueIdentifier, ticket.eventId)
        .input('userId', sql.NVarChar, ticket.userId)
        .input('type', sql.NVarChar, ticket.type)
        .input('numberOfTickets', sql.Int, ticket.numberOfTickets)
        .input('promotionId', sql.NVarChar, ticket.promotionId)
        .execute('UpdateTicket');
};

export const deleteTicket = async (ticketId: string) => {
    const pool = await sql.connect(sqlConfig);
    await pool.request()
        .input('ticketId', sql.NVarChar, ticketId)
        .execute('DeleteTicket');
};
