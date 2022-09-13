import * as React from 'react'
import Box from '@mui/material/Box'
import { useAppDispatch, useAppSelector } from '../../redux-store/hooks'
import { selectAuthState } from '../../redux-store/auth.slice'
import { getUserByUserId } from '../../utils/firebase-functions'
import User from './components/User'

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
    <Box sx={{ p: '1rem' }}>
      <User />
    </Box>
  )
}

export default Sidebar
