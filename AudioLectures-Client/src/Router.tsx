import { createBrowserRouter } from "react-router"
import AppLayout from "./components/AppLayout"
import Auth from "./components/auth";
import ActionsForUsers from "./components/actionsForUsers";
import HomePage from "./components/HomePage";
import UserAvatar from "./components/UserAvatar";
import LecturerDetailsPage from "./components/lecturerDetails";
import LecturersListPage from "./components/lecturersList";
import ChatComponent from "./components/chat";




export const myRouter = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        errorElement: <>main error</>,
        children: [
            { path: "/home", element: <HomePage /> },
            { path: "/avatar", element: <UserAvatar /> },
            { path: "/actionsForUsers", element: <ActionsForUsers /> },
            { path: "/lecturers", element: <LecturersListPage /> },
            { path: "/lecturers/:lecturerId", element: <LecturerDetailsPage /> },
            { path:"/chat", element:<ChatComponent/>}
        ]
    }

])
export default myRouter;

