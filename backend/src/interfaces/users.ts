export interface User{
    userId: string,
    firstname: string,
    lastname: string,
    phoneNumber: string,
    email: string,
    password: string,
    createdAt: string
}

export interface LoginDetails{
    email: string,
    password: string
}