import customerRouter from './customer.js';
import productRouter from './product.js';

function route(app) {
    app.use('/', productRouter);
    app.use('/customer', customerRouter);
}

export default route;
