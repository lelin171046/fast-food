import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import ErrorPage from "../Page/ErrorPage";
import Home from "../Page/Home";

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

            }

        ]
    }

])


export default router;