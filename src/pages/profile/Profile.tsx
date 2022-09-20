import * as React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ROUTES } from '../../utils/constants'
import { getUserByUsername } from '../../utils/firebase-functions'
import Box from '@mui/material/Box'
import Header from '../../components/header'
import UserProfile from '../../components/profile'
import { useAppDispatch, useAppSelector } from '../../redux-store/hooks'
import { selectProfileState } from '../../redux-store/profile.slice'
import { ProfileState } from '../../redux-store/types'
import GridLoader from '../../components/loader/grid-loader'

const Profile = () => {
  const { username } = useParams()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const { profile }: ProfileState = useAppSelector(selectProfileState)

  React.useEffect(() => {
    ;(async () => {
      await getUserByUsername(username, dispatch)

      if (profile) {
        if (profile.length >= 1) {
          navigate(`/p/${username}`, { replace: true })
        } else {
          navigate(ROUTES.ERROR, { replace: true })
        }
      }
    })()

    document.title = `${username}'s profile`
  }, [dispatch, username, navigate, profile.length])

  return profile.length > 0 ? (
    <>
      <Box>
        <Header />
        <Box sx={{ mt: '7rem' }}>
          <UserProfile username={username} />
        </Box>
      </Box>
    </>
  ) : (
    <GridLoader />
  )
}

export default Profile
