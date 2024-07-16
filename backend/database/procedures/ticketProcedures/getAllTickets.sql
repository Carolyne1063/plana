CREATE PROCEDURE GetAllTickets
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
    JOIN users u ON t.userId = u.userId
    JOIN events e ON t.eventId = e.eventId;
END;


DROP PROCEDURE GetAllTickets;