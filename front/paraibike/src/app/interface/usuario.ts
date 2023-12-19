import { Carteira } from "./carteira";

export interface Usuario {
    name: string;
    username: string;
    email: string;
    password: string;
    password_confirmation: string;
    flag?: number;
    carteira: Carteira;
}
