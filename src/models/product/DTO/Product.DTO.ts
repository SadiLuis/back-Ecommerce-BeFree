import { ObjectId } from "mongoose";


export default interface ProductDTO{
    readonly name: string;
    readonly description: string;
    readonly price: number;
    readonly image?: string[];
    readonly stock: number;
    readonly size?: string;
    readonly category?: string;    
    
}