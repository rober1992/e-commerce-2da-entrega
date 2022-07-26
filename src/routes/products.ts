import {Router} from 'express';
import { productController } from "../controllers/productsController";
import { checkAdmin } from '../middlewares/checkAdm';

const router = Router();


router.get('/list', productController.getProducts);

router.get('/list/:id', productController.checkProductExist, productController.getProducts);

router.post('/add', checkAdmin,  productController.checkAddProduct, productController.addProduct);

router.put('/update/:id', checkAdmin, productController.checkProductExist, productController.updateProduct);

router.delete('/delete/:id', checkAdmin, productController.checkProductExist, productController.delete);


export default router;