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
import AllUser from "../Page/Dashboard/AllUser";
import ManageItem from "../Page/Dashboard/ManageItem";
import AddItem from "../Page/Dashboard/AddItem";
import AdminRoute from "./AdminRoute";
import UpdateItem from "../Page/Dashboard/UpdateItem";
import Payment from "../Page/Dashboard/Payment/Payment";
import PaymentHistory from "../Page/Dashboard/Payment/PaymentHistory";
import AdminHome from "../Page/Dashboard/AdminHome";
import UserHome from "../Page/UserHome/UserHome";


const router = createBrowserRouter([

    {
        path: '/',
        element: <Main></Main>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
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
            },
           

        ]
    },
    {
        path: 'dashboard',
        element: <PrivateRoute> <Dashboard></Dashboard></PrivateRoute>,
        children: [
            {
                path: 'cart',
                element: <Cart></Cart>
            },
             {
                path: 'payment',
                element: <Payment></Payment>
            },
            {
                path: 'payment-history',
                element: <PaymentHistory></PaymentHistory>
            },
            {
                path: 'user-home',
                element: <UserHome></UserHome>
            },
            //admin link
            {
                path: 'allUsers',
                element: <AllUser></AllUser>
            },
            {
                path: 'admin-home',
                element: <AdminRoute><AdminHome></AdminHome></AdminRoute>
            },
            {
                path: 'addItem',
                element: <AdminRoute><AddItem></AddItem></AdminRoute>
            },
            {
                path: 'manageItem',
                element: <ManageItem></ManageItem>
            },
            {
                path: 'updateItem/:id',
                element: <AdminRoute><UpdateItem></UpdateItem></AdminRoute>,
                loader: ({ params }) => fetch(`http://localhost:5000/menu/${params.id}`)
            }
        ]
    }

])


export default router;