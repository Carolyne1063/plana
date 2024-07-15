import express from 'express';
import { createEventController, getAllEventsController, getEventByIdController, updateEventController, deleteEventController } from '../controllers/eventController';

const router = express.Router();

router.post('/events', createEventController);
router.get('/events', getAllEventsController);
router.get('/events/:eventId', getEventByIdController);
router.put('/events/:eventId', updateEventController);
router.delete('/events/:eventId', deleteEventController);

export default router;
