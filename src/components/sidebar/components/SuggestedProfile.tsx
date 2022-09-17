import * as React from 'react'
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { useAppDispatch, useAppSelector } from '../../../redux-store/hooks'
import { selectUserInfoState } from '../../../redux-store/user.slice'
import {
  getPhotos,
  updateFollowedProfile,
  updateLoggedInUserFollowing,
} from '../../../utils/firebase-functions'

interface Props {
  username: string
  profileId: string
}

const SuggestedProfile = ({ username, profileId }: Props) => {
  const [followed, setFollowed] = React.useState(false)

  const { userInfo } = useAppSelector(selectUserInfoState)
  const dispatch = useAppDispatch()

  const handleFollowers = async () => {
    if (userInfo) {
      await updateLoggedInUserFollowing(userInfo.userId, profileId, false)
      await updateFollowedProfile(userInfo.userId, profileId, false)
      await getPhotos(userInfo.userId, userInfo.following, dispatch)

      setFollowed(true)
    }
  }

  return (
    <>
      {!followed ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: '1rem',
              alignItems: 'center',
            }}
          >
            <Avatar src={`/images/avatars/${username}.jpg`} alt='' />
            <Link to={`/p/${username}`}>
              <Typography component='p' color='#2e2e2e' fontWeight='bold'>
                {username}
              </Typography>
            </Link>
          </Box>
          <Button onClick={handleFollowers} sx={{ fontWeight: 600 }}>
            Follow
          </Button>
        </Box>
      ) : null}
    </>
  )
}

export default SuggestedProfile
