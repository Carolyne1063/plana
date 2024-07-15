import express from 'express';
import * as TicketController from '../controllers/ticketController';

const router = express.Router();

router.post('/create', TicketController.createTicket);
router.get('/', TicketController.getAllTickets);
router.get('/:ticketId', TicketController.getTicketById);
router.put('/update/:ticketId', TicketController.updateTicket);
router.delete('/delete/:ticketId', TicketController.deleteTicket);

export default router;
