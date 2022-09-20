import * as React from 'react'
import Box from '@mui/material/Box'
import Header from './Header'
import { getUserPhotosByUsername } from '../../utils/firebase-functions'
import { useAppDispatch, useAppSelector } from '../../redux-store/hooks'
import {
  selectProfileState,
  updateFollowerCount,
} from '../../redux-store/profile.slice'
import Photos from './Photos'
import { ProfileState } from '../../redux-store/types'

interface Props {
  username?: string
}

const Profile = ({ username }: Props) => {
  const dispatch = useAppDispatch()
  const { profile }: ProfileState = useAppSelector(selectProfileState)
  const user = profile[0]

  const { photosCollection } = useAppSelector(selectProfileState)
  const { followerCount } = useAppSelector(selectProfileState)

  React.useEffect(() => {
    ;(async () => {
      await getUserPhotosByUsername(username, dispatch)
      dispatch(updateFollowerCount(user.followers.length))
    })()
  }, [username, dispatch, user.followers.length])

  return (
    <Box>
      <Header
        photosCount={photosCollection ? photosCollection.length : 0}
        profile={user}
        followerCount={followerCount}
      />
      <Photos photos={photosCollection} />
    </Box>
  )
}

export default Profile
