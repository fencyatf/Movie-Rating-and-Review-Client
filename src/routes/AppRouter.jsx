import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Movies from '../pages/Movies';
import About from '../pages/About';
import Contact from '../pages/Contact';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';

import RootLayout from '../layout/RootLayout';
//import UserDashboard from '../pages/user/UserDashboard';
import Review from '../pages/user/Review';
import Profile from '../pages/user/Profile';
import Watchlist from '../pages/user/Watchlist';
import ProtectedRoutes from './ProtectedRoutes';
import ErrorPage from '../pages/ErrorPage'; 
import EditProfile from '../pages/user/EditProfile';
import ChangePassword from '../pages/user/ChangePassword';
import DeleteAccount from '../pages/user/DeleteAccount';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />, 
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      { path: "movies", element: <Movies /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "forgot-password", element: <ForgotPassword /> },
      { path: "reset-password", element: <ResetPassword /> },
      {
        element: <ProtectedRoutes />,
        children: [
          //{ path: "user-dashboard", element: <UserDashboard /> },
          { path: "review", element: <Review /> },
          { path: "profile", element: <Profile /> },
          { path: "edit-profile", element: <EditProfile /> },
          { path: "change-password", element: <ChangePassword /> },
          { path: "delete-account", element: <DeleteAccount /> },
          { path: "watchlist", element: <Watchlist /> },
        ],
      },
      { path: "*", element: <ErrorPage /> }, 
    ],
  },
]);
