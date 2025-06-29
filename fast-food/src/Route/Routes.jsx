import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import ErrorPage from "../Page/ErrorPage";
import Home from "../Home/Home";
import Menu from "../Page/Menu/Menu";
import OrderFood from "../Page/OrderFood/OrderFood";
import Login from "../Page/Login";
import SignIn from "../Page/SignIn";
import Dashbroad from "../Page/Dashboard/Dashboard";
import Dashboard from "../Page/Dashboard/Dashboard";
import Cart from "../Page/Dashboard/Cart";
import PrivateRoute from "./PrivateRoute";


const router = createBrowserRouter([

    {
        path: '/',
        element: <Main></Main>,
        errorElement: <ErrorPage></ErrorPage>,
        children:[
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: 'menu',
                element: <Menu></Menu>
            },
            {
                path: 'order/:category',
                element: <OrderFood></OrderFood>
            },
            {
                path: 'login',
                element: <Login></Login>
            },
            {
                path: 'sign-in',
                element: <SignIn></SignIn>
            }

        ]
    },
    {
        path:  'dashboard',
        element: <PrivateRoute> <Dashboard></Dashboard></PrivateRoute>,
        children: [
            {
                path: 'cart',
                element: <Cart></Cart>
            }
        ]
    }

])


export default router;