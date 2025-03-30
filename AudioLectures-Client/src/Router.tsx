import { createBrowserRouter } from "react-router"
import AppLayout from "./components/AppLayout"
import Auth from "./components/auth";
import ActionsForUsers from "./components/actionsForUsers";
import HomePage from "./components/HomePage";
import UserAvatar from "./components/UserAvatar";




export const myRouter = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        errorElement: <>main error</>,
        children: [
            { path: "/home", element:<HomePage/> },
            {path:"/avatar", element:<UserAvatar/>},
            { path: "/actionsForUsers", element: <ActionsForUsers /> },

        ]
    }

])
export default myRouter;

