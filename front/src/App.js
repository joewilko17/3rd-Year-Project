import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';

import Layout from './Components/Layout/Layout';
import HomePage from './Components/Pages/HomePage';
import FindRecipesPage from './Components/Pages/FindRecipesPage';
import AllRecipesPage from './Components/Pages/AllRecipesPage';
import RecipePage from './Components/Pages/RecipePage';
import RecipeResultPage from './Components/Pages/RecipeResultPage';
import LoginPage from './Components/Pages/LoginPage';
import SignOutPage from './Components/Pages/SignOutPage';
import SignUpPage from './Components/Pages/SignUpPage';
import MyProfilePage from './Components/Pages/MyProfilePage';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/find-recipes',
        element: <FindRecipesPage />,
      },
      {
        path: '/all-recipes',
        element: <AllRecipesPage />,
      },
      {
        path: '/recipe/:id',
        element: <RecipePage />
      },
      {
        path: '/recipe-result',
        element: <RecipeResultPage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/signout',
        element: <SignOutPage />,
      },
      {
        path: '/signup',
        element: <SignUpPage />,
      },
      {
        path: '/myprofile',
        element: <MyProfilePage />,
      },
    ],
  },
])

export const App = () => <RouterProvider router={router} />