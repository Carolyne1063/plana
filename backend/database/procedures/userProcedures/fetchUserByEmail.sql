CREATE PROCEDURE sp_GetUserByEmail
    @email NVARCHAR(100)
AS
BEGIN
    SELECT TOP 1 * FROM users WHERE email = @email;
END;
GO