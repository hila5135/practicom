import Login from "./auth";
import { useState } from "react";
import { Box, Button } from "@mui/material";
import { cyan } from "@mui/material/colors";
import { User } from "./user";


const HomePage = () => {

        const initialUser: User = {
        id: '',
        name:'',
        email: '',
        password: '',
        
    }
    const [isLogin, setIsLogin] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [type, setType] = useState('Login');

    const handleLoginSuccess = () => {
        setIsLogin((prev) => {
            if (!prev) setIsLoginOpen(false);
            return !prev;
        });
    }
    return (<>
            <Box
                sx={{ position: "absolute", top: 10, left: 10, display: "flex", gap: 2 }}>
                <Button variant="contained"
                    sx={{
                        background: "black", color: "white",
                        borderRadius: "10px", border: `2px solid ${cyan[300]}`,
                        "&:hover": { backgroundColor: "white", borderColor: cyan[300], color: "#4dd0e1" },
                    }}
                    onClick={() => { setIsLoginOpen(true); setType('Sign'); }}>
                    Sign Up
                </Button>

                <Button
                    variant="contained"
                    sx={{
                        background: "black", color: "white",
                        borderRadius: "10px", border: `2px solid ${cyan[300]}`,
                        "&:hover": { backgroundColor: "white", borderColor: cyan[300], color: "#4dd0e1" },
                    }}
                    onClick={() => { setIsLoginOpen(true); setType('Login'); }}
                >
                    Login
                </Button>
            </Box>

            {/* אם חלון הלוגין פתוח, הצג את הטופס */}
            {isLoginOpen && <Login successLogin={handleLoginSuccess} typeAction={type} close={() => setIsLoginOpen(false)} />}
            {/* {isLogin && <UserAvatar/>} */}

        </>
)
}
export default HomePage;