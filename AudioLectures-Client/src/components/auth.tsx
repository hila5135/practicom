
import { Modal, Button, Box, TextField } from "@mui/material";
import { FormEvent, useContext, useRef, useState } from "react";
import { UserContext } from "./userContext";
import { ApiClient, LoginModel, UserDTO } from "../api/client";
import { cyan } from "@mui/material/colors";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: `2px solid ${cyan[300]}`,
  boxShadow: 24,
  p: 4,
};

const buttonStyle = {
  background: "black",
  color: "white",
  borderRadius: "10px",
  border: `2px solid ${cyan[300]}`,
  "&:hover": { backgroundColor: "white", borderColor: cyan[300], color: "#4dd0e1" },
};

const textFieldStyle = {
  mb: 2,
  backgroundColor: "white",
  "& label.Mui-focused": { color: "#4dd0e1" },
  "& .MuiOutlinedInput-root": {
    "& fieldset": { borderColor: "#4dd0e1" },
    "&.Mui-focused fieldset": { borderColor: "#4dd0e1" },
  },
};

const Auth = ({ successLogin, typeAction, close }: { successLogin: Function; typeAction: string; close: Function }) => {
  const context = useContext(UserContext);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null); // הוספת שדה מייל
  const [open, setOpen] = useState(true);

  const handleSubmitLogin = async (e: FormEvent) => {
    e.preventDefault();
    const apiClient = new ApiClient("https://localhost:7129");

    try {
      let res: any;
      if (typeAction === "Sign") {
        // רישום משתמש חדש
        const registerModel = new UserDTO();
        registerModel.userName = firstNameRef.current?.value || "";
        registerModel.userPassword = passwordRef.current?.value || "";
        registerModel.userEmail = emailRef.current?.value || ""; // הוספת מייל

        res = await apiClient.register(registerModel);
        console.log("Response from server:", res);

        // בדיקה אם התקבלה תשובה עם טוקן
        if (res && res.token) {
          console.log("User registered successfully, token received:", res.token);
          // שמירת הטוקן ב-localStorage
          localStorage.setItem("authToken", res.token);

          context?.userDispatch({
            type: "CREATE",
            data: {
              id: firstNameRef.current?.value || "",
              firstName: firstNameRef.current?.value || "",
              password: passwordRef.current?.value || "",
            },
          });

          setOpen(false);
          successLogin();
          alert("נרשמת בהצלחה. כעת נשלחה לך הודעת מייל לאישור הרשמה")
        } else {
          throw new Error("Failed to register user. No token received.");
        }
      } else {
        // התחברות למערכת
        const loginModel = new LoginModel();
        loginModel.userName = firstNameRef.current?.value || "";
        loginModel.userPassword = passwordRef.current?.value || "";

        res = await apiClient.login(loginModel);
        console.log("Response from server:", res);

        // בדיקה אם התקבלה תשובה עם טוקן
        if (res && res.token) {
          console.log("Login successful, token received:", res.token);
          // שמירת הטוקן ב-localStorage
          localStorage.setItem("authToken", res.token);

          context?.userDispatch({
            type: "CREATE",
            data: {
              id: firstNameRef.current?.value || "",
              firstName: firstNameRef.current?.value || "",
              password: passwordRef.current?.value || "",
            },
          });

          setOpen(false);
          successLogin();
        } else {
          throw new Error("Invalid username or password");
        }
      }
    } catch (e: any) {
      console.error("Error:", e);
      alert(typeAction === "Sign" ? "User already exists" : "Invalid username or password");
    }
  };
  return (
    <Modal open={open} onClose={() => close()} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box sx={style}>
        <form onSubmit={handleSubmitLogin}>
          <TextField label="First Name" inputRef={firstNameRef} fullWidth sx={textFieldStyle} />
          <TextField label="Password" inputRef={passwordRef} type="password" fullWidth sx={textFieldStyle} />
          {typeAction === "Sign" && <TextField label="Email" inputRef={emailRef} fullWidth sx={textFieldStyle} />}
          <Button type="submit" variant="contained" sx={buttonStyle}>
            {typeAction}
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default Auth;


