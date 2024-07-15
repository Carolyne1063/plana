import { Request, Response } from 'express';
import { createEvent, getAllEvents, getEventById, updateEvent, deleteEvent } from '../services/eventService';
import { Event } from '../interfaces/events';

export const createEventController = async (req: Request, res: Response) => {
    try {
        const event: Event = req.body;

        // Validate eventTime format
        if (event.eventTime && !/^(\d{1,2}:\d{2}\s[AP]M)$/.test(event.eventTime)) {
            return res.status(400).json({ error: 'Invalid eventTime format. Expected format is HH:MM AM/PM.' });
        }

        await createEvent(event);
        res.status(201).json({ message: 'Event created successfully' });
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

export const getAllEventsController = async (req: Request, res: Response) => {
    try {
        const events = await getAllEvents();
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

export const getEventByIdController = async (req: Request, res: Response) => {
    try {
        const eventId = req.params.eventId;
        const event = await getEventById(eventId);
        if (event) {
            res.status(200).json(event);
        } else {
            res.status(404).json({ message: 'Event not found' });
        }
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

export const updateEventController = async (req: Request, res: Response) => {
    try {
        const eventId = req.params.eventId;
        const event: Partial<Event> = req.body;

        // Validate eventTime format
        if (event.eventTime && !/^(\d{1,2}:\d{2}\s[AP]M)$/.test(event.eventTime)) {
            return res.status(400).json({ error: 'Invalid eventTime format. Expected format is HH:MM AM/PM.' });
        }

        await updateEvent(eventId, event);
        res.status(200).json({ message: 'Event updated successfully' });
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

export const deleteEventController = async (req: Request, res: Response) => {
    try {
        const eventId = req.params.eventId;
        await deleteEvent(eventId);
        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};
