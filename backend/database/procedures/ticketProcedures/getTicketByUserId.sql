CREATE PROCEDURE GetTicketsByUserId
    @userId VARCHAR(255)
AS
BEGIN
    SELECT *
    FROM Tickets
    WHERE userId = @userId;
END;
