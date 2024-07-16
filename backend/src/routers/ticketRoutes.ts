import { Router } from 'express';
import * as ticketController from '../controllers/ticketController';

const router = Router();

router.post('/create', ticketController.createTicket);
router.get('/', ticketController.getAllTickets);
router.get('/:ticketId', ticketController.getTicketById);
router.get('/user/:userId', ticketController.getTicketsByUserId);
router.get('/event/:eventId', ticketController.getTicketsByEventId);
router.put('/update/:ticketId', ticketController.updateTicket);
router.delete('/:ticketId', ticketController.deleteTicket);
router.get('/summary/:eventId', ticketController.getTicketSummary);

export default router;
