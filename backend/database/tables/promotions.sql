CREATE TABLE Promotions (
    promotionId VARCHAR(255) PRIMARY KEY NOT NULL,
    name NVARCHAR(255) NOT NULL,
    type NVARCHAR(50) NOT NULL,  -- E.g., 'Percentage' or 'Fixed Amount'
    discountAmount DECIMAL(5, 2) NOT NULL,  -- E.g., 10.00 or 15% discount
    startDate DATE NOT NULL,
    endDate DATE NOT NULL,
    createdAt DATETIME NOT NULL DEFAULT GETDATE(),
    updatedAt DATETIME NOT NULL DEFAULT GETDATE()
);

DROP TABLE Promotions;
