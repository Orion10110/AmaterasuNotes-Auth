import { Document } from 'mongoose';

interface Token {
    fingerprint: string,
    token: string
}

export interface IUser extends Document {
    email: string;
    name: string;
    password: string;
    createdAt: Date;
    tokens: Array<Token>
}