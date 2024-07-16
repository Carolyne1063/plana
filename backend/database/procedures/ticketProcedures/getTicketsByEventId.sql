CREATE PROCEDURE GetTicketsByEventId
    @eventId UNIQUEIDENTIFIER
AS
BEGIN
    SELECT *
    FROM Tickets
    WHERE eventId = @eventId;
END;
