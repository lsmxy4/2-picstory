import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import ProtectApp from './ProtectApp'
import PublicLayout from './PublicLayout'
import Landing from '../pages/Landing/Landing'
import Login from '../pages/Auth/Login'
import Signup from '../pages/Auth/Signup'
import ProtectRoute from '../store/ProtectRoute'
import PostDashboard from '../pages/posts/PostDashboard'
export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: '/', element: <Landing /> },
      { path: '/login', element: <Login /> },
      { path: '/signup', element: <Signup /> }
    ]
  }, {
    path:'/app',
    element:(
      <ProtectRoute>
        <ProtectApp/>
      </ProtectRoute>
    ),
    children:[
      {
        index:true,
        element:<PostDashboard/>
      }
    ]
  }
])
