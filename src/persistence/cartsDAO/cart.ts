import generateRandomString from '../../utils/generateCode';
import {
    Cart,
    ProductI,
} from '../../models/productsInterfaces';


export class CartMemoryDAO {

    private cart : Cart = {};
    constructor() {
        this.cart.id = generateRandomString(10);
        this.cart.timestamp = Date.now();
        this.cart.products = [];
    }

    findProduct (id : string) : ProductI | undefined  {
        if(this.cart.products) {
        return  this.cart.products.find(element => element._id == id);
        }
    }

    findIndex(id: string) : number {
        if(this.cart.products) {
            return this.cart.products.findIndex((aProduct) => aProduct._id == id);
        }
        return 1;
    }

    async get(id: string | undefined = undefined) : Promise<Cart | ProductI[]> {
        if(this.cart.products) {
        if(id) {
            return this.cart.products.filter((aProduct) => aProduct._id === id);
        }
        }
        return this.cart;
    }

    async add(data : ProductI) : Promise<ProductI> {
        console.log(data);
        console.log(this.cart.products);
        if(this.cart.products) {
            this.cart.products.push(data);
        }
        return data
    }


    async delete (id : string) :  Promise<void> {
        if (this.findIndex(id) && this.cart.products) {
            const index = this.findIndex(id);
            this.cart.products.splice(index, 1);
        }
    }

}



