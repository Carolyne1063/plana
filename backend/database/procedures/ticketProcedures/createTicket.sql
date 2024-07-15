CREATE PROCEDURE CreateTicket
    @ticketId VARCHAR(255),
    @eventId UNIQUEIDENTIFIER,
    @userId VARCHAR(255),
    @type NVARCHAR(50),
    @numberOfTickets INT,
    @promotionId VARCHAR(255) NULL
AS
BEGIN
    INSERT INTO Tickets (ticketId, eventId, userId, type, numberOfTickets, promotionId)
    VALUES (@ticketId, @eventId, @userId, @type, @numberOfTickets, @promotionId);
END;