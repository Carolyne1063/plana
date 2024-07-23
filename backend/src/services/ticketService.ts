import * as sql from 'mssql';
import { sqlConfig } from '../sqlConfig';
import { v4 as uuidv4 } from 'uuid';
import { Ticket } from '../interfaces/tickets';
import { sendEmail } from './mailService';

const ticketPrices = {
    single: 100.00,    // example price for single ticket
    couple: 200.00,    // example price for couple ticket
    groupOf5: 500.00   // example price for group of 5 ticket
};

export const createTicket = async (ticket: Ticket) => {
    const pool = await sql.connect(sqlConfig);

    // Check if user already booked a ticket for the same event
    const existingTickets = await pool.request()
        .input('userId', sql.UniqueIdentifier, ticket.userId)
        .input('eventId', sql.UniqueIdentifier, ticket.eventId)
        .query('SELECT * FROM tickets WHERE userId = @userId AND eventId = @eventId');

    if (existingTickets.recordset.length > 0) {
        throw new Error('User has already booked a ticket for this event');
    }

    const ticketId = uuidv4();

    // Determine the price based on the ticket type
    let pricePerTicket;
    switch (ticket.type) {
        case 'single':
            pricePerTicket = ticketPrices.single;
            break;
        case 'couple':
            pricePerTicket = ticketPrices.couple;
            break;
        case 'groupOf5':
            pricePerTicket = ticketPrices.groupOf5;
            break;
        default:
            throw new Error('Invalid ticket type');
    }

    // Calculate the total price
    const totalPrice = pricePerTicket * ticket.numberOfTickets;

    const request = pool.request()
        .input('ticketId', sql.UniqueIdentifier, ticketId)
        .input('userId', sql.UniqueIdentifier, ticket.userId)
        .input('eventId', sql.UniqueIdentifier, ticket.eventId)
        .input('type', sql.NVarChar, ticket.type)
        .input('numberOfTickets', sql.Int, ticket.numberOfTickets)
        .input('price', sql.Decimal(10, 2), totalPrice)  // Store total price
        .input('status', sql.NVarChar, 'confirmed'); // Setting status to confirmed

    const result = await request.query(
        `EXEC CreateTicket @ticketId, @userId, @eventId, @type, @numberOfTickets, @price, @status`
    );

    // Send email notification
    const user = await pool.request()
        .input('userId', sql.UniqueIdentifier, ticket.userId)
        .query('SELECT email FROM users WHERE userId = @userId');
    
    const email = user.recordset[0].email;
    const subject = 'Ticket Booking Confirmation';
    const text = `Your booking for the event has been successfully confirmed. Ticket ID: ${ticketId}`;
    
    await sendEmail(email, subject, text);

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

export const getSummaryByEventId = async (eventId: string) => {
    const pool = await sql.connect(sqlConfig);
    const request = pool.request()
        .input('eventId', sql.UniqueIdentifier, eventId);

    const result = await request.query(
        `EXEC GetTicketSummaryByEventId @eventId`
    );

    const summary = result.recordset[0];

    if (summary) {
        return {
            eventName: summary.EventName,
            eventLocation: summary.EventLocation,
            eventDate: summary.EventDate,
            totalRevenue: summary.TotalRevenue,
            totalTicketsSold: summary.TotalTicketsSold
        };
    } else {
        return null;
    }
};


//   export const getEventSummariesWithTickets = async () => {
//     const pool = await sql.connect(sqlConfig);
//     // Fetch all events with tickets booked
//     const result = await pool.request().query(`
//         SELECT DISTINCT t.eventId
//         FROM tickets t
//         JOIN events e ON t.eventId = e.eventId
//     `);
//     const eventIds = result.recordset.map((row: { eventId: string }) => row.eventId);

//     const summaries = [];
//     for (const eventId of eventIds) {
//         const summary = await getSummaryByEventId(eventId);
//         summaries.push(summary);
//     }

//     return summaries;
// };