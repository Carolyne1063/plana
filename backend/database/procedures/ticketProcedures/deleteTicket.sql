CREATE PROCEDURE DeleteTicket
    @ticketId VARCHAR(255)
AS
BEGIN
    DELETE FROM Tickets WHERE ticketId = @ticketId;
END;