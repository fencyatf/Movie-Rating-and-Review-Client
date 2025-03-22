import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import {Login} from '../pages/Login';
import Signup from '../pages/Signup';
import MovieDetails from '../pages/MovieDetails';
import Movies from '../pages/Movies';
import UserDashboard from '../pages/UserDashboard';
import Profile from '../pages/Profile';
import About from '../pages/About';
import Contact from '../pages/Contact';

import RootLayout from '../layout/RootLayout';

import ErrorPage from '../pages/ErrorPage'; 

export const router = createBrowserRouter([
  {
    path: "",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [

      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      { path: "/moviedetails/:id", element: <MovieDetails /> },
      { path: "/movies", element: <Movies /> },
      //{ path: "/userdashboard", element: <UserDashboard /> },
      { path: "/profile", element: <Profile /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },


      { path: "*", element: <ErrorPage /> }
    ]
  }

]);

