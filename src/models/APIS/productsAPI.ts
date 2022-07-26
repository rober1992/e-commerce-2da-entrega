import { newProductI, ProductI, ProductQuery } from '../productsInterfaces';
import { FactoryDAO } from '../Factorys/productsFactory';
import { TipoPersistencia } from '../Factorys/productsFactory';


export const tipo = TipoPersistencia.Memoria;

class prodAPI {
  private productos;

  constructor() {
    this.productos = FactoryDAO.get(tipo);
  }

  async getProducts(id: string | undefined = undefined): Promise<ProductI[] | ProductI | FirebaseFirestore.DocumentData > {
    if (id) return this.productos.get(id);

    return this.productos.get();
  }

  async addProduct(productData: newProductI): Promise<ProductI | FirebaseFirestore.DocumentData > {
    const newProduct = await this.productos.add(productData);
    return newProduct;
  }

  async updateProduct(id: string, productData: newProductI) {
    const updatedProduct = await this.productos.update(id, productData);
    return updatedProduct;
  }

  async deleteProduct(id: string) {
    await this.productos.delete(id);
  }

  async query(options: ProductQuery) {
    return await this.productos.query(options);
  }
}

export const productsAPI = new prodAPI();