import fs from 'fs';
import {
  newProductI,
  ProductI,
  ProductQuery,
} from '../../models/productsInterfaces';

export class ProductosFSDAO {
  private productos: ProductI[] = [];
  private nombreArchivo: string;

  constructor(fileName: string) {
    this.nombreArchivo = fileName;
    this.productos = [];
    this.guardar();
  }

  async leer(archivo: string): Promise<void> {
    this.productos = JSON.parse(await fs.promises.readFile(archivo, 'utf-8'));
  }

  async guardar(): Promise<void> {
    await fs.promises.writeFile(
      this.nombreArchivo,
      JSON.stringify(this.productos, null, '\t')
    );
  }

  async findIndex(id: string): Promise<number> {
    await this.leer(this.nombreArchivo);
    return this.productos.findIndex((aProduct: ProductI) => aProduct._id == id);
  }

  async find(id: string): Promise<ProductI | undefined> {
    await this.leer(this.nombreArchivo);

    return this.productos.find((aProduct) => aProduct._id === id);
  }

  async get(id?: string): Promise<ProductI[]> {
    await this.leer(this.nombreArchivo);

    if (id) {
      return this.productos.filter((aProduct) => aProduct._id === id);
    }
    return this.productos;
  }

  async add(data: newProductI): Promise<ProductI> {
    if (!data.name || !data.price || !data.description || !data.stock || !data.thumbnail) throw new Error('invalid data');

    await this.leer(this.nombreArchivo);

    const newItem: ProductI = {
      _id: (this.productos.length + 1).toString(),
      name: data.name,
      price: data.price,
      description: data.description,
      stock : data.stock,
      thumbnail : data.thumbnail,
      timestamp : Date.now(),
    };

    this.productos.push(newItem);

    await this.guardar();

    return newItem;
  }

  async update(id: string, newProductData: newProductI): Promise<ProductI>{
    await this.leer(this.nombreArchivo);

    const index = await this.findIndex(id);
    const oldProduct = this.productos[index];

    const updatedProduct: ProductI = { ...oldProduct, ...newProductData };
    this.productos.splice(index, 1, updatedProduct);

    await this.guardar();

    return updatedProduct;
  }

  async delete(id: string): Promise<void> {
    await this.leer(this.nombreArchivo);

    const index = await this.findIndex(id);
    this.productos.splice(index, 1);
    await this.guardar();
  }

  async query(options: ProductQuery): Promise<ProductI[]> {
    await this.leer(this.nombreArchivo);
    type Conditions = (aProduct: ProductI) => boolean;
    const query: Conditions[] = [];

    if (options.name)
      query.push((aProduct: ProductI) => aProduct.name == options.name);

      if (options.priceMin)
      query.push((aProduct: ProductI) => aProduct.price >= Number(options.priceMin));
    
    if (options.priceMax)
      query.push((aProduct: ProductI) => aProduct.price <= Number(options.priceMax));

    if(options._id)
        query.push((aProduct: ProductI) => aProduct._id == options._id);

    if (options.stockMin)
        query.push((aProduct: ProductI) => aProduct.stock >= Number(options.stockMin));

    if (options.stockMax)
        query.push((aProduct: ProductI) => aProduct.stock <= Number(options.stockMax));

    return this.productos.filter((aProduct) => query.every((x) => x(aProduct)));
  }
}