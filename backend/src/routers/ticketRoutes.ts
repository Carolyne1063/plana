import { Router } from 'express';
import * as ticketController from '../controllers/ticketController';

const router = Router();

router.post('/create', ticketController.createTicket);
router.get('/', ticketController.getAllTickets);
router.get('/:ticketId', ticketController.getTicketById);
router.put('/update/:ticketId', ticketController.updateTicket);
router.delete('/:ticketId', ticketController.deleteTicket);

export default router;
