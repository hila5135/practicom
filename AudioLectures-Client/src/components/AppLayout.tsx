
import NavBar from "./NavBar"
import { Outlet } from "react-router"
// import { useContext , useState } from "react";
import {useReducer} from "react";
import { UserContext } from "./userContext";
import HomePage from "./HomePage";
import { User, userReducer } from "./user"



const AppLayout = () => {
    
    const initialUser: User = {
        id: '',
        name: '',
        email: '',
        password: '',
     
    }

    const [user, userDispatch] = useReducer(userReducer, initialUser)
    return (
        <>
            <UserContext value={{ user, userDispatch }}>
                <HomePage/>
                <NavBar />
                <div></div>
                <Outlet />
            </UserContext>
        </>
    )
}

export default AppLayout;