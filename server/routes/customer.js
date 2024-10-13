import { Router } from 'express';
import { default as CustomerController } from '../controller/CustomerController.js';
const route = Router();
const customerController = new CustomerController();

route.get('/', customerController.index.bind(customerController));
route.post('/', customerController.create);
route.put('/create/:id', customerController.update);
route.delete('/delete/:id', customerController.delete);

export default route;

