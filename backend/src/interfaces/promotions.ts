export interface Promotion {
    promotionId: string;
    name: string;
    type: string;  // E.g., 'Percentage' or 'Fixed Amount'
    discountAmount: number;  // E.g., 10.00 or 15% discount
    startDate: Date;
    endDate: Date;
    createdAt: Date;
    updatedAt: Date;
}