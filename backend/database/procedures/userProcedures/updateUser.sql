CREATE PROCEDURE sp_UpdateUser
    @userId UNIQUEIDENTIFIER,
    @firstname NVARCHAR(50),
    @lastname NVARCHAR(50),
    @phoneNumber VARCHAR(100),
    @email NVARCHAR(100)
AS
BEGIN
    UPDATE users
    SET firstname = @firstname,
        lastname = @lastname,
        phoneNumber = @phoneNumber,
        email = @email
    WHERE userId = @userId;
END;
GO