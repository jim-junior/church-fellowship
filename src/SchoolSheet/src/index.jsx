import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'
import './index.css'
import store from './store'
import { Provider } from 'react-redux'
import reportWebVitals from './reportWebVitals'
import Root from './routes/root'
import ErrorPage from '../src/errorPage'
import Dashboard from './views/Dashboard'
import Login from './views/Login'
import Email from './views/auth/Email'
import Code from './views/auth/Code'
import PasswordReset from './views/auth/PasswordReset'
import AddMemberForm from './components/members/AddMemberForm'
import EditMemberForm from './components/members/EditMemberForm'
import ShowStudentsForm from './components/members/ShowMembersForm'
import DesktopLoading from './components/DesktopLoading'
import Members from './views/members/Members'
import StartMeeting from './views/meetings/StartMeeting'
import Schedule from './views/meetings/Schedule'
import Attendance from './views/Attendance'
import Notes from './views/Notes'

const router = createBrowserRouter([
  {
    path: '/email',
    element: <Email />,
  },
  {
    path: '/passwordReset',
    element: <PasswordReset />,
  },
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/code',
    element: <Code />,
  },
  // component to show the user is in the wrong route
  {
    path: '/error-page',
    element: <ErrorPage />,
  },
  {
    path: '/desktop-loading-page',
    element: <DesktopLoading />,
  },
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
      {
        path: '/start-meeting',
        element: <StartMeeting />,
      },
      {
        path: '/schedule',
        element: <Schedule />,
      },
      {
        path: '/members',
        element: (
          <Members />
        ),
      },
      {
        path: '/addMemberForm',
        element: (
          <AddMemberForm />
        ),
      },
      {
        path: '/editStudentsForm',
        element: (
          <EditMemberForm />
        ),
      },
      {
        path: '/showStudentsForm',
        element: (
          <ShowStudentsForm />
        ),
      },
      {
        path: '/attendance',
        element: (
          <Attendance/>
        )
      },
      {
        path: '/notes',
        element: (
          <Notes/>
        )
      }
    ],
  },
])

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
