CREATE TABLE Tickets (
    ticketId UNIQUEIDENTIFIER PRIMARY KEY,
    userId VARCHAR(255),
    eventId UNIQUEIDENTIFIER,
    type NVARCHAR(50),
    numberOfTickets INT,
    price DECIMAL(10, 2),
    status NVARCHAR(50),
    FOREIGN KEY (userId) REFERENCES users(userId),
    FOREIGN KEY (eventId) REFERENCES events(eventId)
);


SELECT * FROM Tickets;

DROP TABLE Tickets;

