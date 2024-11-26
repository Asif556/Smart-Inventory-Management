import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Landing from './Components/Landing';
import Features from './Components/Features';
import Additems from './Components/Additems';
import Display from './Components/Display';
import Login from './Components/Login';
import Signup from './Components/SignUp';
import Retrive from './Components/Retrive';

function App() {
  const r = createBrowserRouter([
    {
      path: '/',
      element: <Login/>,
    },
    {
      path:'/main',
      element:<Landing/>
    },
    {
      path:'/retrive',
      element:<Retrive/>
    },
    {
      path:'/signup',
      element:<Signup/>
    },
    {
      path: '/Features',
      element: <Features />,
    },
    {
      path:'/Additems',
      element:<Additems/>
    },
    {
      path:'login2',
      element:<Login/>
    },
    {
      path:'/Display',
      element:<Display/>
    }
  ]);

  return (
    <RouterProvider router={r} />
  );
}

export default App;
