import { routeConfigs } from "../configs/routeConfig";
import CreateProduct from "../pages/CreateProduct";
import HomePage from "../pages/HomePage";
import ProductDetail from "../pages/ProductDetail";
import UpdateProduct from "../pages/UpdateProduct";
import UserDetail from "../pages/UserDetail";

const publicRoute = [
    {
        path: routeConfigs.home,
        component: HomePage
    },
    {
        path: routeConfigs.createProduct,
        component: CreateProduct,
    },
    {
        path: routeConfigs.userdetail,
        component: UserDetail,
        layout: null
    },
    {
        path: routeConfigs.product,
        component: ProductDetail,
        layout: null
    },
    {
        path: routeConfigs.editProduct,
        component: UpdateProduct,
        layout: null
    },


]

const privateRoute = [];

export { publicRoute, privateRoute };