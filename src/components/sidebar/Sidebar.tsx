import * as React from 'react'
import Box from '@mui/material/Box'
import { useAppDispatch, useAppSelector } from '../../redux-store/hooks'
import { selectAuthState } from '../../redux-store/auth.slice'
import { getUserByUserId } from '../../utils/firebase-functions'
import User from './components/User'
import Suggestions from './components/Suggestions'

const Sidebar = () => {
  const { user } = useAppSelector(selectAuthState)
  const dispatch = useAppDispatch()

  React.useEffect(() => {
    ;(async () => {
      if (user) {
        await getUserByUserId(user.uid, dispatch)
      }
    })()
  }, [dispatch, user])

  return (
    <Box
      sx={{
        pr: {
          xs: '0.5rem',
          md: '2rem',
          lg: '4rem',
        },
        pl:{
          xs:'2rem',
          sm:'3rem'
        }
      }}
    >
      <User />
      <Suggestions />
    </Box>
  )
}

export default Sidebar
