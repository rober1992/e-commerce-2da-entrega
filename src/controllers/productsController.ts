import { productsAPI } from "../models/APIS/productsAPI";
import { Request, Response, NextFunction} from 'express';
import {ProductQuery,} from '../models/productsInterfaces';

class ProductController {

    checkAddProduct (req: Request, res: Response, next: NextFunction) {

        const { name, price, description, thumbnail, stock } = req.body;

        if (!name || !price || !description || !thumbnail || !stock ||  
            typeof name !== 'string' || 
            typeof description !== 'string' ||
            typeof thumbnail !== 'string' ||
            isNaN(stock) ||
            isNaN(price)) {
        return res.status(400).json({
            msg: 'Campos del body invalidos',
        });
        }

    next();
    }

    checkProductExist (req: Request, res: Response, next: NextFunction) {
        const {id} = req.params;
        const producto = productsAPI.getProducts(id);

        if(!producto) {
            return res.status(404).json({
                msg: 'Product not found'
            });
        }

        next();
    }

    async getProducts(req: Request, res: Response) {
        const {id} = req.params;
        const {name ,stockMin, stockMax, priceMin, priceMax} = req.query;
        const producto = id
        ? await productsAPI.getProducts(id)
        : await productsAPI.getProducts();
        
        console.log(req.query);
        if(producto.length == 0){ 
            res.json({
                msg : 'Empty'
            })
        } else {
            const query: ProductQuery = {};

            if (name) query.name = name.toString();
    
            if (priceMin) query.priceMin = Number(priceMin);
            if (priceMax) query.priceMax = Number(priceMax);

            if (stockMin) query.stockMin = Number(stockMin);
            if (stockMax) query.stockMax = Number(stockMax);
    
            if (Object.keys(query).length) {
                res.json({
                data: await productsAPI.query(query),
                });
            } else {
                res.json({
                    data: producto,
                })
            }
        }
    };


        
    

    async addProduct(req: Request, res: Response) {
        const newProduct =  await productsAPI.addProduct(req.body);

        res.json({
            msg : 'Producto agregado con exito',
            data : newProduct
        })
    }

    async updateProduct(req: Request, res: Response) {
        const {id} = req.params;
        const productUpdated = await productsAPI.updateProduct(id,req.body)

        res.json({
            msg : 'Producto actualizado con exito',
            data : productUpdated
        })
    }

    async delete(req: Request, res: Response) {
        const {id} = req.params;
        await productsAPI.deleteProduct(id);

        res.json({
            msg : 'Producto borrado con exito'
        })
    }
}

export const productController = new ProductController();