CREATE PROCEDURE GetTicketSummaryByEventId
    @eventId UNIQUEIDENTIFIER
AS
BEGIN
    -- Get event details and ticket summary
    SELECT
        e.eventName AS EventName,
        e.location AS EventLocation,
        e.eventDate AS EventDate,
        COUNT(t.ticketId) AS TotalTicketsSold,
        SUM(t.price) AS TotalRevenue
    FROM
        tickets t
    JOIN
        events e ON t.eventId = e.eventId
    WHERE
        t.eventId = @eventId
    GROUP BY
        e.eventName, e.location, e.eventDate;
END;


DROP PROCEDURE GetTicketSummaryByEventId;
