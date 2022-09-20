import * as React from 'react'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Skeleton from 'react-loading-skeleton'
import { UserInfo } from '../../redux-store/types'
import { useAppDispatch, useAppSelector } from '../../redux-store/hooks'
import { selectUserInfoState } from '../../redux-store/user.slice'
import {
  isUserfollowingProfile,
  toggleFollow,
} from '../../utils/firebase-functions'
import { updateFollowerCount } from '../../redux-store/profile.slice'
import { BeatLoader } from 'react-spinners'

interface Props {
  photosCount: number
  profile: UserInfo
  followerCount: number
}

const Header = ({ photosCount, profile, followerCount }: Props) => {
  const [loading, setLoading] = React.useState(false)
  const { userInfo } = useAppSelector(selectUserInfoState)
  const [isFollowingProfile, setIsFollowingProfile] = React.useState(false)
  const dispatch = useAppDispatch()

  const activeBtnFollow =
    userInfo?.username && userInfo.username !== profile.username

  const handleToggleFollow = async () => {
    setLoading(true)
    setIsFollowingProfile((isFollowingProfile) => !isFollowingProfile)

    const updatedFollowerCount: number = isFollowingProfile
      ? followerCount - 1
      : followerCount + 1

    dispatch(updateFollowerCount(updatedFollowerCount))

    if (userInfo) {
      await toggleFollow(userInfo?.userId, profile.userId, isFollowingProfile)
    }

    setLoading(false)
  }

  React.useEffect(() => {
    ;(async () => {
      if (userInfo?.username && profile.userId) {
        const isFollowing = await isUserfollowingProfile(
          userInfo?.username,
          profile.userId
        )
        setIsFollowingProfile(!!isFollowing)
      }
    })()
  }, [profile.userId, isFollowingProfile, userInfo?.username])

  return (
    <>
      {!profile ? (
        <Skeleton count={1} width={400} height={320} />
      ) : (
        <Box
          sx={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'space-between',
            margin: '0 auto',
            width: {
              xs: '90%',
              md: '60%',
            },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              gap: '2rem',
              justifyContent: 'space-between',
            }}
          >
            {
              <Avatar
                src={`/images/avatars/${profile.username}.jpg`}
                alt={`${profile.username} profile picture`}
                sx={{
                  width: { xs: '8rem', md: '10rem' },
                  height: { xs: '8rem', md: '10rem' },
                }}
              />
            }
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
                flexDirection: 'column',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography sx={{ mr: '1rem', fontSize: 'large' }}>
                  {profile.username}
                </Typography>
                {activeBtnFollow && (
                  <Button
                    variant='contained'
                    onClick={handleToggleFollow}
                    disabled={loading}
                  >
                    {loading ? (
                      <CircularProgress sx={{ color: '#fff' }} size={25} />
                    ) : isFollowingProfile ? (
                      'Unfollow'
                    ) : (
                      'Follow'
                    )}
                  </Button>
                )}
              </Box>

              <Box sx={{ display: 'flex', mt: '1rem' }}>
                <Typography sx={{ mr: '2.5rem' }}>
                  <Typography component='span' fontWeight='bold'>
                    {photosCount} photos
                  </Typography>
                </Typography>

                <Typography sx={{ mr: '2.5rem' }}>
                  {loading ? (
                    <BeatLoader />
                  ) : (
                    <Typography component='span' fontWeight='bold'>
                      {followerCount}
                      {` `}
                      {followerCount <= 1 ? 'follower' : ' followers'}
                    </Typography>
                  )}
                </Typography>

                <Typography sx={{ mr: '2.5rem' }}>
                  <Typography component='span' fontWeight='bold'>
                    {profile.following.length} following
                  </Typography>
                </Typography>
              </Box>

              <Box sx={{ mt: '1rem' }}>
                <Typography>
                  {!profile.fullName ? (
                    <Skeleton count={1} height={24} />
                  ) : (
                    `${profile.fullName}`
                  )}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </>
  )
}

export default Header
