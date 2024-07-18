CREATE PROCEDURE sp_CreateUser
    @userId UNIQUEIDENTIFIER,
    @firstname NVARCHAR(50),
    @lastname NVARCHAR(50),
    @phoneNumber VARCHAR(100),
    @email NVARCHAR(100),
    @password NVARCHAR(100),
    @image VARCHAR(255),
    @createdAt DATETIME
AS
BEGIN
    INSERT INTO users (userId, firstname, lastname, phoneNumber, email, password, image, createdAt)
    VALUES (@userId, @firstname, @lastname, @phoneNumber, @email, @password, @image, @createdAt);
END;
GO

DROP PROCEDURE sp_CreateUser;