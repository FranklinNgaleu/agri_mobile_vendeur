import { User } from "../auth/connexion/User.model";


export interface Produit {
    id:number;
    type: string;
    description: string;
    photo: string;
    stock: number;
    size: string;
    price: number;
    status:string;
    category:string;
    user_id : User;

}