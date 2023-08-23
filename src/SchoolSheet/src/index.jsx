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
import Settings from './views/settings/Settings'
import ClassesStreams from './views/settings/ClassesStreams'
import SubjectsGrading from './views/settings/SubjectsGrading'
import FeesStrructures from './views/fees/FeesStrructures'
import Fees from './views/fees/Fees'
import GroupsAndTypes from './views/members/GroupsAndTypes'
import ScholarShip from './views/scholarship/ScholarShip'
import AddMemberForm from './components/members/AddMemberForm'
import EditMemberForm from './components/members/EditMemberForm'
import ShowStudentsForm from './components/members/ShowMembersForm'
import Sample from './views/Sample'
import RoleGuard from './components/RoleGuard'
import DesktopLoading from './components/DesktopLoading'
import Members from './views/members/Members'

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
        path: '/sample',
        element: <Sample />,
      },
      {
        path: '/settings',
        element: <Settings />,
      },
      {
        path: '/classesStreams',
        element: <ClassesStreams />,
      },
      {
        path: '/subjectsGrading',
        element: <SubjectsGrading />,
      },
      {
        path: '/feesStrructures',
        element: (
          <RoleGuard allowedRoles={['admin', 'fees']}>
            <FeesStrructures />
          </RoleGuard>
        ),
      },
      {
        path: '/fees',
        element: (
          <RoleGuard allowedRoles={['admin', 'fees']}>
            <Fees />
          </RoleGuard>
        ),
      },
      {
        path: '/scholarShip',
        element: <ScholarShip />,
      },
      {
        path: '/members',
        element: (
          <Members />
        ),
      },
      {
        path: '/groupsAndTypes',
        element: (
          <RoleGuard allowedRoles={['student', 'admin']}>
            <GroupsAndTypes />
          </RoleGuard>
        ),
      },
      // students
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
