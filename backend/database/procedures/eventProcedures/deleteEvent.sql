CREATE PROCEDURE DeleteEvent
    @eventId UNIQUEIDENTIFIER
AS
BEGIN
    DELETE FROM events WHERE eventId = @eventId;
END;