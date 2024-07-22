import * as sql from 'mssql';
import { sqlConfig } from '../sqlConfig';
import { v4 as uuidv4 } from 'uuid';
import { Ticket } from '../interfaces/tickets';

const ticketPrices = {
    single: 100.00,    // example price for single ticket
    couple: 200.00,    // example price for couple ticket
    groupOf5: 500.00   // example price for group of 5 ticket
};

export const createTicket = async (ticket: Ticket) => {
    const ticketId = uuidv4();
    const pool = await sql.connect(sqlConfig);

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
      `SELECT e.eventName, e.location, e.eventDate, 
              SUM(t.price) as totalRevenue, COUNT(*) as totalTicketsSold 
       FROM tickets t
       JOIN events e ON t.eventId = e.eventId
       WHERE t.eventId = @eventId
       GROUP BY e.eventName, e.location, e.eventDate`
    );
  
    const summary = result.recordset[0];
    return {
      eventName: summary.name,
      eventLocation: summary.location,
      eventDate: summary.date,
      totalRevenue: summary.totalRevenue,
      totalTicketsSold: summary.totalTicketsSold
    };
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