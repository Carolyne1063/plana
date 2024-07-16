CREATE PROCEDURE CreateTicket
    @ticketId UNIQUEIDENTIFIER,
    @userId UNIQUEIDENTIFIER,
    @eventId UNIQUEIDENTIFIER,
    @type NVARCHAR(50),
    @numberOfTickets INT,
    @price DECIMAL(10, 2),
    @status NVARCHAR(50)
AS
BEGIN
    INSERT INTO Tickets (ticketId, userId, eventId, type, numberOfTickets, price, status)
    VALUES (@ticketId, @userId, @eventId, @type, @numberOfTickets, @price, @status);
END;


DROP PROCEDURE CreateTicket;