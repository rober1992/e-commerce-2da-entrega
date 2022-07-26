import mongoose from 'mongoose';
import {
    Cart,
  ProductI
} from '../../models/productsInterfaces';
import Config from '../../config/config';

const productsSchema = new mongoose.Schema<Cart>({
    timestamp : {type : Number, default : Date.now()},
    products : []
});

export class CartMongoDAO {
  private srv: string;
  private cart;

  constructor(local: boolean = false) {
    if (local)
      this.srv = `mongodb://localhost:27017/${Config.MONGO_LOCAL_DBNAME}`;
    else
      this.srv = `mongodb+srv://${Config.MONGO_ATLAS_USER}:${Config.MONGO_ATLAS_PASSWORD}@${Config.MONGO_ATLAS_CLUSTER}/${Config.MONGO_ATLAS_DBNAME}?retryWrites=true&w=majority`;
    mongoose.connect(this.srv);
    this.cart = mongoose.model<ProductI>('cart', productsSchema);
  }

  async get(id?: string): Promise<ProductI[]> {
    let output: ProductI[] = [];
    try {
      if (id) {
        const document = await this.cart.findById(id);
        if (document) output.push(document);
      } else {
        output = await this.cart.find();
      }

      return output;
    } catch (err) {
      return output;
    }
  }

  async add(data: ProductI): Promise<ProductI> {
    const newProduct = new this.cart(data);
    await newProduct.save();

    return newProduct;
  }

  async delete(id: string) {
    await this.cart.findByIdAndDelete(id);
  }

}