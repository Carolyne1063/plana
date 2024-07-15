CREATE PROCEDURE UpdateTicket
    @ticketId VARCHAR(255),
    @eventId UNIQUEIDENTIFIER,
    @userId VARCHAR(255),
    @type NVARCHAR(50),
    @numberOfTickets INT,
    @promotionId VARCHAR(255) NULL
AS
BEGIN
    UPDATE Tickets
    SET eventId = @eventId,
        userId = @userId,
        type = @type,
        numberOfTickets = @numberOfTickets,
        promotionId = @promotionId,
        updatedAt = GETDATE()
    WHERE ticketId = @ticketId;
END;