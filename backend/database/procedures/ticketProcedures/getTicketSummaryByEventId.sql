-- Procedure to get ticket summary for an event
CREATE PROCEDURE GetTicketSummaryByEventId
    @eventId UNIQUEIDENTIFIER
AS
BEGIN
    SELECT
        COUNT(*) AS NumberOfTickets,
        SUM(price * numberOfTickets) AS TotalMoneyGenerated
    FROM
        Tickets
    WHERE
        eventId = @eventId;

    SELECT
        eventName AS EventName,
        location AS EventLocation,
        eventDate AS EventDate
    FROM
        events
    WHERE
        eventId = @eventId;
END;
