import { Router } from 'express';
import { default as CustomerController } from '../controller/CustomerController.js';
import authenticateToken from '../middleware/authenticateToken.js';
const route = Router();
const customerController = new CustomerController();

route.get('/', customerController.index);
route.get('/countDeleted', customerController.countDelete);
route.get('/restore/:id', customerController.restore);
route.post('/create', customerController.create);
route.post('/login', authenticateToken, customerController.check);
route.put('/restore/:id', customerController.restore);
route.put('/update/:id', customerController.update);
route.delete('/delete/:id', customerController.delete);
route.delete('/deleteSoft/:id', customerController.deleteSoft);

export default route;

