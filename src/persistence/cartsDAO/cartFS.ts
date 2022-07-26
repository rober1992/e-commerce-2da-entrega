import fs from 'fs';
import {
    Cart,
  ProductI,
} from '../../models/productsInterfaces';
import generateRandomString from '../../utils/generateCode';

export class cartFSDAO {
  cart : Cart;
  private nombreArchivo: string;

  constructor(fileName: string) {
    this.nombreArchivo = fileName;
    this.cart.products = [];
    this.cart.id = generateRandomString(10);
    this.cart.timestamp = Date.now();
    this.guardar();
  }

  async leer(archivo: string): Promise<void> {
    this.cart = JSON.parse(await fs.promises.readFile(archivo, 'utf-8'));
  }

  async guardar(): Promise<void> {
    await fs.promises.writeFile(
      this.nombreArchivo,
      JSON.stringify(this.cart, null, '\t')
    );
  }

  async findIndex(id: string): Promise<number> {
    if(this.cart.products) {
      await this.leer(this.nombreArchivo);
      return this.cart.products.findIndex((aProduct: ProductI) => aProduct._id == id);
    }
    return 1;
  }

  async get(id?: string): Promise<Cart | ProductI[]> {
    if(this.cart.products) {
      await this.leer(this.nombreArchivo);

      if (id) {
        return this.cart.products.filter((aProduct) => aProduct._id === id);
      }
    }
    return this.cart;
  }

  async add(data: ProductI): Promise<ProductI> {
    if(this.cart.products) {
    await this.leer(this.nombreArchivo);

    this.cart.products.push(data);

    await this.guardar();

    return data;
    }
    return data;
  }

  async delete(id: string): Promise<void> {
    if(this.cart.products) {
      await this.leer(this.nombreArchivo);

      const index = await this.findIndex(id);
      this.cart.products.splice(index, 1);
      await this.guardar();
    }
  }

}