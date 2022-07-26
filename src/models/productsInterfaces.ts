export interface newProductI {
    name: string;
    price: number;
    description : string;
    thumbnail: string;
    stock : number;
}
  
export interface ProductI {
    _id: string;
    name: string;
    price: number;
    description : string;
    thumbnail: string;
    stock : number;
    timestamp : number;
}
  
export interface ProductQuery {
    name?: string;
    _id? : string;
    priceMin?: number;
    priceMax?: number;
    stockMin?: number;
    stockMax?: number;
}

export interface Cart {
    id? : string;
    timestamp? : number;
    products? : Array<ProductI>;
}
  
