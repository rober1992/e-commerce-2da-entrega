import generateRandomString from '../../utils/generateCode';
import {
    newProductI,
    ProductI,
    ProductQuery,
} from '../../models/productsInterfaces';


export class ProductsDAOMemory {

    private productos: ProductI[] = [];

    findProduct (id : string) : ProductI | undefined  {
        return  this.productos.find(element => element._id == id);
    }

    findIndex(id: string) {
        return this.productos.findIndex((aProduct) => aProduct._id == id);
    }

    async get(id: string | undefined = undefined) : Promise<ProductI[]> {
        if(id) {
            return this.productos.filter((aProduct) => aProduct._id === id);
        }
        return this.productos;
    }

    async add(data : newProductI) : Promise<ProductI> {

        const newProduct : ProductI = {
            _id : generateRandomString(7),
            name : data.name,
            price : data.price,
            description : data.description,
            thumbnail : data.thumbnail,
            stock : data.stock,
            timestamp : Date.now(),
        }

        this.productos.push(newProduct);
        return newProduct
    }


    async update (id : string, data : newProductI) : Promise<ProductI> {
        const index = this.findIndex(id);
        const oldProduct = this.productos[index];

        const updatedProduct: ProductI = { ...oldProduct, ...data };
        this.productos.splice(index, 1, updatedProduct);

        return updatedProduct;
    }


    async delete (id : string) :  Promise<void> {
        const index = this.findIndex(id);
        this.productos.splice(index, 1);
    }

    async query (options: ProductQuery): Promise<ProductI[]> {
        type Conditions = (aProduct: ProductI) => boolean;
        const query: Conditions[] = [];
    
        if (options.name)
          query.push((aProduct: ProductI) => aProduct.name == options.name);
    
        if (options.priceMin)
          query.push((aProduct: ProductI) => aProduct.price > Number(options.priceMin));
        
        if (options.priceMax)
          query.push((aProduct: ProductI) => aProduct.price < Number(options.priceMax));

        if(options._id)
            query.push((aProduct: ProductI) => aProduct._id == options._id);

        if (options.stockMin)
            query.push((aProduct: ProductI) => aProduct.stock < Number(options.stockMin));

        if (options.stockMax)
            query.push((aProduct: ProductI) => aProduct.stock < Number(options.stockMax));
        
        return this.productos.filter((aProduct) => query.every((x) => x(aProduct)));
      }
}



