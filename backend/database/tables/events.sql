CREATE TABLE events (
    eventId UNIQUEIDENTIFIER PRIMARY KEY,
    eventName NVARCHAR(255) NOT NULL,
    location NVARCHAR(255) NOT NULL,
    eventDate DATE NOT NULL,
    eventTime TIME NOT NULL,
    description NVARCHAR(MAX) NOT NULL,
    createdAt DATETIME NOT NULL DEFAULT GETDATE(),
    updatedAt DATETIME NOT NULL DEFAULT GETDATE()
);

ALTER TABLE Events
ALTER COLUMN eventTime VARCHAR(50); 

ALTER TABLE events ADD image VARCHAR(255);

SELECT * FROM events;
