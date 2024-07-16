import * as sql from 'mssql';
import { sqlConfig } from '../sqlConfig';
import { v4 as uuidv4 } from 'uuid';
import { Ticket } from '../interfaces/tickets';

export const createTicket = async (ticket: Ticket) => {
    const ticketId = uuidv4();
    const pool = await sql.connect(sqlConfig);

    const request = pool.request()
        .input('ticketId', sql.UniqueIdentifier, ticketId)
        .input('userId', sql.UniqueIdentifier, ticket.userId)
        .input('eventId', sql.UniqueIdentifier, ticket.eventId)
        .input('type', sql.NVarChar, ticket.type)
        .input('numberOfTickets', sql.Int, ticket.numberOfTickets)
        .input('price', sql.Decimal(10, 2), ticket.price)
        .input('status', sql.NVarChar, ticket.status);

    const result = await request.query(
        `EXEC CreateTicket @ticketId, @userId, @eventId, @type, @numberOfTickets, @price, @status`
    );

    return result;
};

export const getAllTickets = async () => {
    const pool = await sql.connect(sqlConfig);
    const result = await pool.request().query(`EXEC GetAllTickets`);
    return result.recordset;
};

export const getTicketById = async (ticketId: string) => {
    const pool = await sql.connect(sqlConfig);
    const result = await pool.request()
        .input('ticketId', sql.UniqueIdentifier, ticketId)
        .query(`EXEC GetTicketById @ticketId`);
    return result.recordset[0];
};

export const getTicketsByUserId = async (userId: string) => {
    const pool = await sql.connect(sqlConfig);
    const result = await pool.request()
        .input('userId', sql.VarChar, userId)
        .query(`EXEC GetTicketsByUserId @userId`);
    return result.recordset;
};

export const getTicketsByEventId = async (eventId: string) => {
    const pool = await sql.connect(sqlConfig);
    const result = await pool.request()
        .input('eventId', sql.UniqueIdentifier, eventId)
        .query(`EXEC GetTicketsByEventId @eventId`);
    return result.recordset;
};

export const updateTicket = async (ticketId: string, ticketUpdates: Partial<Ticket>) => {
    const pool = await sql.connect(sqlConfig);
    const request = pool.request()
        .input('ticketId', sql.UniqueIdentifier, ticketId)
        .input('userId', sql.UniqueIdentifier, ticketUpdates.userId)
        .input('eventId', sql.UniqueIdentifier, ticketUpdates.eventId)
        .input('type', sql.NVarChar, ticketUpdates.type)
        .input('numberOfTickets', sql.Int, ticketUpdates.numberOfTickets)
        .input('price', sql.Decimal(10, 2), ticketUpdates.price)
        .input('status', sql.NVarChar, ticketUpdates.status);

    await request.query(`EXEC UpdateTicket @ticketId, @userId, @eventId, @type, @numberOfTickets, @price, @status`);
};

export const deleteTicket = async (ticketId: string) => {
    const pool = await sql.connect(sqlConfig);
    const result = await pool.request()
        .input('ticketId', sql.UniqueIdentifier, ticketId)
        .query('EXEC DeleteTicket @ticketId');
    return result;
};

export const getTicketSummaryByEventId = async (eventId: string) => {
    const pool = await sql.connect(sqlConfig);
    try {
        const result = await pool.request()
            .input('eventId', sql.UniqueIdentifier, eventId)
            .query(`
                SELECT 
                    e.eventName AS EventName,
                    e.location AS Location,
                    e.eventDate AS Date,
                    COUNT(t.ticketId) AS NumberOfTickets,
                    SUM(t.price * t.numberOfTickets) AS TotalMoneyGenerated
                FROM Tickets t
                JOIN Events e ON t.eventId = e.eventId
                WHERE t.eventId = @eventId
                GROUP BY e.eventName, e.location, e.eventDate
            `);

        if (result.recordset.length > 0) {
            return result.recordset[0];
        } else {
            return null;  // No records found
        }
    } catch (error) {
        console.error('Error fetching ticket summary:', error);  // Log the error
        throw new Error('Error fetching ticket summary');
    }
};