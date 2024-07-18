CREATE PROCEDURE CreateEvent
    @eventId UNIQUEIDENTIFIER,
    @eventName NVARCHAR(100),
    @location NVARCHAR(100),
    @eventDate DATE,
    @eventTime VARCHAR(50),
    @description NVARCHAR(MAX), 
    @image VARCHAR(255)
AS
BEGIN
    INSERT INTO events (eventId, eventName, location, eventDate, eventTime, description, image)
    VALUES (@eventId, @eventName, @location, @eventDate, @eventTime, @description, @image);
END;


DROP PROCEDURE CreateEvent;