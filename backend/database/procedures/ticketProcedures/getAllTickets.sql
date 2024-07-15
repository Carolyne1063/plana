CREATE PROCEDURE GetAllTickets
AS
BEGIN
    SELECT 
        t.ticketId,
        t.eventId,
        e.eventName,
        e.eventDate,
        e.eventTime,
        e.location,
        e.description,
        t.userId,
        u.firstname AS userFirstname,
        u.lastname AS userLastname,
        u.email AS userEmail,
        u.phoneNumber AS userPhoneNumber,
        t.type,
        t.numberOfTickets,
        t.promotionId,
        p.name AS promotionName,
        p.discountAmount,
        t.createdAt,
        t.updatedAt
    FROM Tickets t
    JOIN events e ON t.eventId = e.eventId
    JOIN users u ON t.userId = u.userId
    LEFT JOIN Promotions p ON t.promotionId = p.promotionId;
END;

DROP PROCEDURE GetAllTickets;