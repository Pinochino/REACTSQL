import { routeConfigs } from "../configs/routeConfig";
import HomePage from "../pages/HomePage";
import Register from "../pages/Register";
import UserDetail from "../pages/UserDetail";

const publicRoute = [
    {
        path: routeConfigs.home,
        component: HomePage
    },
    {
        path: routeConfigs.register,
        component: Register,
        layout: null
    },
    {
        path: routeConfigs.userdetail,
        component: UserDetail,
        layout: null
    },
]

const privateRoute = [];

export { publicRoute, privateRoute };