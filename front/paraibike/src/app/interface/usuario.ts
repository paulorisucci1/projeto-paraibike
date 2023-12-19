import { Carteira } from "./carteira";
import {Wallet} from "./wallet";

export interface Usuario {
    name: string;
    username: string;
    email: string;
    password: string;
    password_confirmation: string;
    flag?: number;
    wallet: Wallet;
}
