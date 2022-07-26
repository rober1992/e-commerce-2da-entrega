import {  ProductI } from '../productsInterfaces';
import { FactoryCartDAO } from '../Factorys/cartsFactory';
import { tipo } from './productsAPI';

 

class cartAPI {
  private cart;
 
  constructor() {
    this.cart = FactoryCartDAO.get(tipo);
  }

  async getProductsCart(id: string | undefined = undefined): Promise<ProductI[] | FirebaseFirestore.DocumentData > {
    if (id) return this.cart.get(id);
    return this.cart.get();
  }

  async addProductCart(productData: ProductI): Promise<ProductI | FirebaseFirestore.DocumentData > {
    console.log(productData);
    const newProduct = await this.cart.add(productData);
    console.log(newProduct);
    return newProduct;
  }


  async deleteProductCart(id: string) {
    await this.cart.delete(id);
  }


}

export const cartsAPI = new cartAPI();