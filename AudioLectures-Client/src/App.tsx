import { useState } from 'react';
import './App.css'
import ActionsForUsers from './components/actionsForUsers'
import HomePage from './components/HomePage';
import { UserContext } from './components/userContext'
import { RouterProvider } from 'react-router-dom';
import myRouter from './Router';
function App() {
  
  return (
    <>
{/* <HomePage></HomePage> */}
{/* <ActionsForUsers></ActionsForUsers> */}
<RouterProvider router={myRouter} />

    </>
  )
}

export default App
