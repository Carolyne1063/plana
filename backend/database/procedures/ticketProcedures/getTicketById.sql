CREATE PROCEDURE GetTicketById
    @ticketId UNIQUEIDENTIFIER
AS
BEGIN
    SELECT 
        t.ticketId, 
        t.price, 
        t.status, 
        t.type, 
        t.numberOfTickets, 
        u.userId, 
        u.firstname, 
        u.lastname, 
        u.email, 
        u.phoneNumber, 
        e.eventId, 
        e.eventName, 
        e.eventDate, 
        e.location
    FROM Tickets t
    JOIN Users u ON t.userId = u.userId
    JOIN Events e ON t.eventId = e.eventId
    WHERE t.ticketId = @ticketId;
END;


DROP PROCEDURE GetTicketById;