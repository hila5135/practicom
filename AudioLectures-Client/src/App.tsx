import './App.css'
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
