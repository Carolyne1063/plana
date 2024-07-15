CREATE PROCEDURE CreateEvent
    @eventId UNIQUEIDENTIFIER,
    @eventName NVARCHAR(100),
    @location NVARCHAR(100),
    @eventDate DATE,
    @eventTime VARCHAR(50),
    @description NVARCHAR(MAX)
AS
BEGIN
    INSERT INTO events (eventId, eventName, location, eventDate, eventTime, description)
    VALUES (@eventId, @eventName, @location, @eventDate, @eventTime, @description);
END;


DROP PROCEDURE CreateEvent;