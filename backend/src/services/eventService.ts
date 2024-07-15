import * as sql from 'mssql';
import { sqlConfig } from '../sqlConfig';
import { Event } from '../interfaces/events';
import { v4 as uuidv4 } from 'uuid';

export const createEvent = async (event: Event) => {
    const eventId = uuidv4();
    const pool = await sql.connect(sqlConfig);
    await pool.request()
        .input('eventId', sql.UniqueIdentifier, eventId)
        .input('eventName', sql.NVarChar, event.eventName)
        .input('location', sql.NVarChar, event.location)
        .input('eventDate', sql.Date, event.eventDate)
        .input('eventTime', sql.NVarChar, event.eventTime)  // Updated to NVARCHAR
        .input('description', sql.NVarChar, event.description)
        .execute('CreateEvent');
};

export const getAllEvents = async () => {
    const pool = await sql.connect(sqlConfig);
    const result = await pool.request().execute('GetAllEvents');
    return result.recordset;
};

export const getEventById = async (eventId: string) => {
    const pool = await sql.connect(sqlConfig);
    const result = await pool.request()
        .input('eventId', sql.UniqueIdentifier, eventId)
        .execute('GetEventById');
    return result.recordset[0];
};

export const updateEvent = async (eventId: string, event: Partial<Event>) => {
    const pool = await sql.connect(sqlConfig);
    await pool.request()
        .input('eventId', sql.UniqueIdentifier, eventId)
        .input('eventName', sql.NVarChar, event.eventName)
        .input('location', sql.NVarChar, event.location)
        .input('eventDate', sql.Date, event.eventDate)
        .input('eventTime', sql.NVarChar, event.eventTime)  // Updated to NVARCHAR
        .input('description', sql.NVarChar, event.description)
        .execute('UpdateEvent');
};

export const deleteEvent = async (eventId: string) => {
    const pool = await sql.connect(sqlConfig);
    await pool.request()
        .input('eventId', sql.UniqueIdentifier, eventId)
        .execute('DeleteEvent');
};
