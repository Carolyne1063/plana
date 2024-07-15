CREATE TABLE Tickets (
    ticketId VARCHAR(255) PRIMARY KEY NOT NULL,
    eventId UNIQUEIDENTIFIER NOT NULL,
    userId VARCHAR(255) NOT NULL,
    type NVARCHAR(50) NOT NULL,  -- E.g., 'Single', 'Couple', 'Group of 5', 'VIP'
    numberOfTickets INT NOT NULL,
    promotionId VARCHAR(255) NULL,
    createdAt DATETIME NOT NULL DEFAULT GETDATE(),
    updatedAt DATETIME NOT NULL DEFAULT GETDATE(),
    FOREIGN KEY (eventId) REFERENCES events(eventId),
    FOREIGN KEY (userId) REFERENCES users(userId),
    FOREIGN KEY (promotionId) REFERENCES Promotions(promotionId)
);

SELECT * FROM Tickets;

