import { Router } from 'express';
import { default as SiteController } from '../controller/SiteController.js';

const route = Router();
const siteController = new SiteController();

route.get('/', siteController.index);


export default route;