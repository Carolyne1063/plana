import { Request, Response } from 'express';
import { createPromotion, getAllPromotions, getPromotionById, updatePromotion, deletePromotion } from '../services/promotionService';
import { Promotion } from '../interfaces/promotions';

// Create a new promotion
export const createPromotionController = async (req: Request, res: Response) => {
  try {
    const promotionData: Omit<Promotion, 'promotionId'> = req.body;
    const promotion = await createPromotion(promotionData);
    res.status(201).json({ message: 'Promotion created successfully.', promotion });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Get all promotions
export const getAllPromotionsController = async (req: Request, res: Response) => {
  try {
    const promotions = await getAllPromotions();
    res.status(200).json(promotions);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Get a promotion by ID
export const getPromotionByIdController = async (req: Request, res: Response) => {
  try {
    const { promotionId } = req.params;
    const promotion = await getPromotionById(promotionId);
    if (promotion) {
      res.status(200).json(promotion);
    } else {
      res.status(404).json({ message: 'Promotion not found.' });
    }
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Update a promotion
export const updatePromotionController = async (req: Request, res: Response) => {
  try {
    const { promotionId } = req.params;
    const promotion: Partial<Omit<Promotion, 'promotionId'>> = req.body;
    await updatePromotion(promotionId, promotion);
    res.status(200).json({ message: 'Promotion updated successfully.' });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Delete a promotion
export const deletePromotionController = async (req: Request, res: Response) => {
  try {
    const { promotionId } = req.params;
    await deletePromotion(promotionId);
    res.status(200).json({ message: 'Promotion deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
