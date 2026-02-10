export interface User{
    userId: string;
    name: string;
    email: string;
    mobile: string;
    createdAt?: Date;
}

export interface UserRequest{
    name: string;
    email: string;
    mobile: string;
    password?: string;
}
