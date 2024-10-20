import { Router } from 'express';
import { default as CustomerController } from '../controller/CustomerController.js';
const route = Router();
const customerController = new CustomerController();

route.get('/', customerController.index.bind(customerController));
route.post('/create', customerController.create);
route.post('/login', customerController.check);
route.put('/update/:id', customerController.update);
route.delete('/delete/:id', customerController.delete);

export default route;

