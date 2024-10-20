import customerRouter from './customer.js';
import productRouter from './product.js';
import siteRouter from './site.js';

function route(app) {
    app.use('/', siteRouter)
    app.use('/product', productRouter);
    app.use('/customer', customerRouter);
}

export default route;
