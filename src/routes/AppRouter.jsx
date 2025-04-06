import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Movies from '../pages/Movies';
import AboutUs from '../pages/AboutUs';
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
import AdminDashboard from '../pages/admin/AdminDashboard';
import AdminProtectedRoutes from './AdminProtectedRoutes';
import AdminProfile from '../pages/admin/AdminProfile';
import ManageUsers from '../pages/admin/ManageUsers';
import ManageMovies from '../pages/admin/ManageMovies';
import ManageGenres from '../pages/admin/ManageGenres';
// import ManageReviews from '../pages/admin/ManageReviews';
import ManageReports from '../pages/admin/ManageReports';
import UserMovies from '../pages/user/UserMovies';
import UserMovieDetails from '../pages/user/UserMovieDetails';
import UserReview from '../pages/user/UserReview';


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
      { path: "movies/:id", element: <UserMovieDetails /> },  // ✅ FIXED
      { path: "about", element: <AboutUs /> },
      { path: "contact", element: <Contact /> },
      { path: "forgot-password", element: <ForgotPassword /> },
      { path: "reset-password", element: <ResetPassword /> },
      {
        element: <ProtectedRoutes />,
        children: [
          { path: "profile", element: <Profile /> },
          { path: "edit-profile", element: <EditProfile /> },
          { path: "change-password", element: <ChangePassword /> },
          { path: "delete-account", element: <DeleteAccount /> },
          { path: "watchlist", element: <Watchlist /> },
          { path: "user-review", element: <UserReview /> },
          { path: "user-movies", element: <UserMovies /> },
          { path: "reviews/:id", element: <Review /> }, // ✅ Uncommented if needed
        ],
      },
      {
        element: <AdminProtectedRoutes />,
        children: [
          { path: "admin-dashboard", element: <AdminDashboard /> },
          { path: "admin-profile", element: <AdminProfile /> },
          { path: "manage-users", element: <ManageUsers /> },
          { path: "manage-movies", element: <ManageMovies /> },
          { path: "manage-genres", element: <ManageGenres /> },
          // { path: "manage-reviews", element: <ManageReviews /> },
          { path: "manage-reports", element: <ManageReports /> },
        ],
      },
    ],
  },
  { path: "*", element: <ErrorPage /> }, // ✅ FIXED: Moved outside children
]);
