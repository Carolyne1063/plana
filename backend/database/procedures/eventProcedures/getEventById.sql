CREATE PROCEDURE GetEventById
    @eventId UNIQUEIDENTIFIER
AS
BEGIN
    SELECT * FROM events WHERE eventId = @eventId;
END;