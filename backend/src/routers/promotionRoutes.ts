import express from 'express';
import { 
  createPromotionController,
  getAllPromotionsController,
  getPromotionByIdController,
  updatePromotionController,
  deletePromotionController 
} from '../controllers/promotionController';

const router = express.Router();

router.post('/', createPromotionController);
router.get('/', getAllPromotionsController);
router.get('/:promotionId', getPromotionByIdController);
router.put('/:promotionId', updatePromotionController);
router.delete('/:promotionId', deletePromotionController);

export default router;
