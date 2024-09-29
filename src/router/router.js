import { createBrowserRouter, Navigate } from "react-router-dom";

import ResponsiveDrawer from "../components/NavbarAndSidebar";
import Login from "../pages/auth/Login";
import LoginForm from "../components/LoginForm";
import ProtectedRoute from "../helper/ProtectedRoute";
import CarListPage from "../pages/user/CarListPage";
import CarList from "../components/admin/CarList";
import Register from "../pages/auth/Register";

export const router = createBrowserRouter([

  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/login/admin',
    element: <LoginForm isAdmin={true} />,
  },


  {
    path: '/',
    element: (
      <ProtectedRoute isAdmin={false}>
        <ResponsiveDrawer />
      </ProtectedRoute>
    ),
    children: [

      {
        path: '',
        element: <Navigate to="home" replace />, 
      },
      {
        path: 'home',
        element: <CarListPage />,
      },
    ],
  },


  {
    path: '/admin',
    element: (
      <ProtectedRoute isAdmin={true}>
        <ResponsiveDrawer />
      </ProtectedRoute>
    ),
    children: [
     
      {
        path: '',
        element: <Navigate to="dashboard" replace />, 
      },
      {
        path: 'dashboard',
        element: <CarList />, 
      },
    ],
  },
]);
