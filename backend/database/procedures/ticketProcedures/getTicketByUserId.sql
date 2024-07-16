CREATE PROCEDURE GetTicketsByUserId
    @userId VARCHAR(255)
AS
BEGIN
    SELECT 
        t.ticketId,
        t.type,
        t.numberOfTickets,
        t.price,
        t.status,
        e.eventName AS eventName,
        e.location AS eventLocation,
        e.eventDate AS eventDate,
        u.firstname AS firstname,
        u.lastname AS lastname,
        u.email AS userEmail,
        u.phoneNumber AS userPhoneNumber
    FROM Tickets t
    INNER JOIN events e ON t.eventId = e.eventId
    INNER JOIN users u ON t.userId = u.userId
    WHERE t.userId = @userId;
END;


DROP PROCEDURE GetTicketsByUserId;