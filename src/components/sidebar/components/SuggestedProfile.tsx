import * as React from 'react'
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import Button from '@mui/material/Button'
import {  useAppSelector } from '../../../redux-store/hooks'
import { selectUserInfoState } from '../../../redux-store/user.slice'
import {
  updateFollowedProfile,
  updateLoggedInUserFollowing,
} from '../../../utils/firebase-functions'

interface Props {
  username: string
  profileId: string
}

const SuggestedProfile = ({ username, profileId }: Props) => {
  const [followed, setFollowed] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  const { userInfo } = useAppSelector(selectUserInfoState)

  const handleFollowers = async () => {
    setLoading(true)

    if (userInfo) {
      await updateLoggedInUserFollowing(userInfo.userId, profileId, false)
      await updateFollowedProfile(userInfo.userId, profileId, false)

      setFollowed(true)
      setLoading(false)
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
            <Link to={`/p/${username}`}>
              <Box sx={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <Avatar src={`/images/avatars/${username}.jpg`} alt='' />
                <Typography component='p' color='#2e2e2e' fontWeight='bold'>
                  {username}
                </Typography>
              </Box>
            </Link>
          </Box>
          <Button
            onClick={handleFollowers}
            sx={{ fontWeight: 600 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={25} /> : 'follow'}
          </Button>
        </Box>
      ) : null}
    </>
  )
}

export default SuggestedProfile
