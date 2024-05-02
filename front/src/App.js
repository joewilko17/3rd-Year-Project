import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';
import Layout from './components/Layouts/Layout';
import FindRecipePage from './components/Pages/FindRecipePage';
import Home from './components/Pages/Home';
import IngredientsListPage from './components/Pages/IngredientsListPage';
import RecipeDatabasePage from './components/Pages/RecipeDatabasePage';
import Login from './components/Pages/Profile/Login';
import Logout from './components/Pages/Profile/Logout';
import Signup from './components/Pages/Profile/Signup';
import MyProfile from './components/Pages/Profile/MyProfile';
import RecipeResult from './components/Pages/RecipeResult';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/find-recipe',
        element: <FindRecipePage />,
      },
      {
        path: '/ingredients-list',
        element: <IngredientsListPage />,
      },
      {
        path: '/recipe-database',
        element: <RecipeDatabasePage />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/logout',
        element: <Logout />,
      },
      {
        path: '/signup',
        element: <Signup />,
      },
      {
        path: '/myprofile',
        element: <MyProfile />,
      },
      {
        path: '/recipe-result',
        element: <RecipeResult />,
      }
    ],
  },
])

export const App = () => <RouterProvider router={router} />

// const App = () => {
//   return (
//     <Router>
//     <div>
//       <Navbar />
//       <Header />
//       <div className="content">
//         <Routes>
//           <Route path="/" exact element={<Home />} />
//           <Route path="/find-recipe" element={<FindRecipePage />} />
//         </Routes>
//       </div>
//     </div>
//   </Router>
//   );
// }

// export default App;


