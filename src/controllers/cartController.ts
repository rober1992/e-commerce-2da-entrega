import { Request, Response, NextFunction} from 'express';
import { productsAPI } from '../models/APIS/productsAPI';
import { cartsAPI } from '../models/APIS/cartAPI';
import { ProductI } from '../models/productsInterfaces';



class CartController {
    
    checkProductExist (req: Request, res: Response, next: NextFunction) {
        const idProd = req.params.id;
        const producto = cartsAPI.getProductsCart(idProd);

        if(producto === undefined) {
            return res.status(404).json({
                msg: 'Product not found'
            });
        }

        next();
    }

    async getProducts(req: Request, res: Response) {
        const idProd = req.params.id;
    
       res.json({
             productListCart: await cartsAPI.getProductsCart(idProd)
        });

    }

    async addProductsCartID(req: Request, res: Response) {
        const idProd = req.params.id;

        const productToAdd = await productsAPI.getProducts(idProd);
        console.log(productToAdd);
        await cartsAPI.addProductCart(productToAdd as ProductI);

        res.json({
            msg : 'Product added successfully',
            data : await cartsAPI.getProductsCart()
        });
    }

    async deleteProductCart(req: Request, res: Response) {
        const idProd = req.params.id;
        
        await cartsAPI.deleteProductCart(idProd);

        res.json({
            msg : 'Product deleted successfully'
        });
    }


}

export const cartController = new CartController();
