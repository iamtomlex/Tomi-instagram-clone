import { lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { ROUTES } from '../utils/constants'
import AuthRoute from './Auth'
import UnAuthRoute from './UnAuth'

const Dashboard = lazy(() => import('../pages/dashboard'))
const Login = lazy(() => import('../pages/login'))
const Signup = lazy(() => import('../pages/sign-up'))
const NotFound = lazy(() => import('../pages/not-found'))
const Profile =lazy(()=>import('../pages/profile'))

const App = () => {
  return (
    <>
      <Routes>
        <Route
          path={ROUTES.LOGIN}
          element={
            <UnAuthRoute>
              <Login />
            </UnAuthRoute>
          }
        />
        <Route
          path={ROUTES.SIGN_UP}
          element={
            <UnAuthRoute>
              <Signup />
            </UnAuthRoute>
          }
        />

        <Route path={ROUTES.ERROR} element={<NotFound />} />

        <Route
          path={ROUTES.DASHBOARD}
          element={
            <AuthRoute>
              <Dashboard />
            </AuthRoute>
          }
        />

        <Route
          path={ROUTES.PROFILE}
          element={
            <AuthRoute>
              <Profile />
            </AuthRoute>
          }
        />
        <Route path='*' element={<Navigate to={ROUTES.ERROR} replace />} />
      </Routes>
    </>
  )
}

export default App
