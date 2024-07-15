CREATE PROCEDURE UpdateEvent
    @eventId UNIQUEIDENTIFIER,
    @eventName NVARCHAR(100),
    @location NVARCHAR(100),
    @eventDate DATE,
    @eventTime VARCHAR(50),
    @description NVARCHAR(MAX)
AS
BEGIN
    UPDATE events
    SET eventName = @eventName,
        location = @location,
        eventDate = @eventDate,
        eventTime = @eventTime,
        description = @description
    WHERE eventId = @eventId;
END;


DROP PROCEDURE UpdateEvent;