CREATE PROCEDURE UpdateTicket
    @ticketId UNIQUEIDENTIFIER,
    @userId UNIQUEIDENTIFIER,
    @eventId UNIQUEIDENTIFIER,
    @type NVARCHAR(50),
    @numberOfTickets INT,
    @price DECIMAL(10, 2),
    @status NVARCHAR(50)
AS
BEGIN
    UPDATE Tickets
    SET 
        userId = COALESCE(@userId, userId),
        eventId = COALESCE(@eventId, eventId),
        type = COALESCE(@type, type),
        numberOfTickets = COALESCE(@numberOfTickets, numberOfTickets),
        price = COALESCE(@price, price),
        status = COALESCE(@status, status)
    WHERE ticketId = @ticketId;
END;


DROP PROCEDURE UpdateTicket;