CREATE PROCEDURE DeleteTicket
    @ticketId UNIQUEIDENTIFIER
AS
BEGIN
    DELETE FROM Tickets WHERE ticketId = @ticketId;
END;


DROP PROCEDURE DeleteTicket;