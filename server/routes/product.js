import { Router } from 'express';
import { default as ProductController } from '../controller/ProductController.js';

const route = Router();
const productController = new ProductController();

route.get('/', productController.index);
route.get('/read/:id', productController.read);
route.post('/create', productController.create);
route.put('/update/:id', productController.update);
route.delete('/delete/:id', productController.delete);

export default route;