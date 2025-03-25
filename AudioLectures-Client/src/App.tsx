import { useState } from 'react';
import './App.css'
import ActionsForUsers from './components/actionsForUsers'
import HomePage from './components/HomePage';
import { UserContext } from './components/userContext'
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [typeAction, setTypeAction] = useState("Sign"); // סוג הפעולה: Sign או Log
  const [open, setOpen] = useState(false); // לקביעת אם חלון הלוגין פתוח
  const successLogin = () => {
    setIsLoggedIn(true); // שים true כאשר ההתחברות מצליחה
    setOpen(false); // סגור את חלון הלוגין
  };
 const close = () => setOpen(false);
  return (
    <>
{/* <HomePage></HomePage> */}
<ActionsForUsers></ActionsForUsers>
    </>
  )
}

export default App
