export interface Event {
    eventId?: string;
    eventName: string;
    location: string;
    eventDate: string;
    eventTime: string;
    description: string;
    createdAt?: Date;
    updatedAt?: Date;
    image: string;
}
