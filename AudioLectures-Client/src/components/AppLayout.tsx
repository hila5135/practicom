import { Outlet } from "react-router"
// import { useContext , useState } from "react";
import {useReducer} from "react";
import { UserContext } from "./userContext";
import { User, userReducer } from "./user"
import NavBar from "./NavBar";


/*************  ✨ Windsurf Command 🌟  *************/
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
             
                  {/* <HomePage/> */}
                <NavBar />
                <Outlet />
            </UserContext>
        </>
    )
}

export default AppLayout;

