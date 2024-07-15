import * as sql from 'mssql';
import { sqlConfig } from '../sqlConfig';
import { Promotion } from '../interfaces/promotions';
import { v4 as uuidv4 } from 'uuid';

// Create a new promotion
const createPromotion = async (promotion: Omit<Promotion, 'promotionId'>) => {
  const promotionId = uuidv4(); // Generate a new UUID for the promotion
  const pool = await sql.connect(sqlConfig);
  await pool.request()
    .input('promotionId', sql.VarChar, promotionId)
    .input('name', sql.NVarChar, promotion.name)
    .input('type', sql.NVarChar, promotion.type)
    .input('discountAmount', sql.Decimal(5, 2), promotion.discountAmount)
    .input('startDate', sql.Date, promotion.startDate)
    .input('endDate', sql.Date, promotion.endDate)
    .input('createdAt', sql.DateTime, new Date())
    .input('updatedAt', sql.DateTime, new Date())
    .query(`
      INSERT INTO Promotions (promotionId, name, type, discountAmount, startDate, endDate, createdAt, updatedAt)
      VALUES (@promotionId, @name, @type, @discountAmount, @startDate, @endDate, @createdAt, @updatedAt)
    `);

  return { ...promotion, promotionId };
};

// Get all promotions
const getAllPromotions = async () => {
  const pool = await sql.connect(sqlConfig);
  const result = await pool.request().query('SELECT * FROM Promotions');
  return result.recordset;
};

// Get a promotion by ID
const getPromotionById = async (promotionId: string) => {
  const pool = await sql.connect(sqlConfig);
  const result = await pool.request()
    .input('promotionId', sql.VarChar, promotionId)
    .query('SELECT * FROM Promotions WHERE promotionId = @promotionId');
  return result.recordset[0];
};

// Update a promotion
const updatePromotion = async (promotionId: string, promotion: Partial<Omit<Promotion, 'promotionId'>>) => {
  const pool = await sql.connect(sqlConfig);
  const request = pool.request()
    .input('promotionId', sql.VarChar, promotionId)
    .input('name', sql.NVarChar, promotion.name || null)
    .input('type', sql.NVarChar, promotion.type || null)
    .input('discountAmount', sql.Decimal(5, 2), promotion.discountAmount || null)
    .input('startDate', sql.Date, promotion.startDate || null)
    .input('endDate', sql.Date, promotion.endDate || null)
    .input('updatedAt', sql.DateTime, new Date());

  await request.query(`
    UPDATE Promotions SET 
      name = COALESCE(@name, name),
      type = COALESCE(@type, type),
      discountAmount = COALESCE(@discountAmount, discountAmount),
      startDate = COALESCE(@startDate, startDate),
      endDate = COALESCE(@endDate, endDate),
      updatedAt = @updatedAt
    WHERE
      promotionId = @promotionId
  `);
};

// Delete a promotion
const deletePromotion = async (promotionId: string) => {
  const pool = await sql.connect(sqlConfig);
  await pool.request()
    .input('promotionId', sql.VarChar, promotionId)
    .query('DELETE FROM Promotions WHERE promotionId = @promotionId');
};

export {
  createPromotion,
  getAllPromotions,
  getPromotionById,
  updatePromotion,
  deletePromotion
};
