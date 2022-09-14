import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Skeleton from 'react-loading-skeleton'
import { selectUserInfoState } from '../../../redux-store/user.slice'
import { useAppDispatch, useAppSelector } from '../../../redux-store/hooks'
import SuggestedProfile from './SuggestedProfile'
import { getUserSuggestedProfiles } from '../../../utils/firebase-functions'
import { selectSuggestedProfilesState } from '../../../redux-store/suggestedProfiles.slice'

const Suggestions = () => {
  const { userInfo } = useAppSelector(selectUserInfoState)
  const { suggestedProfiles } = useAppSelector(selectSuggestedProfilesState)
  const dispatch = useAppDispatch()
  const userId = userInfo?.userId

  React.useEffect(() => {
    const suggestedProfiles = async () => {
      if (userInfo) {
        await getUserSuggestedProfiles(
          userInfo.userId,
          userInfo.following,
          dispatch
        )
      }
    }

    if (userId) {
      suggestedProfiles()
    }
  }, [dispatch, userInfo, userId])

  return (
    <>
      {!suggestedProfiles ? (
        <Box sx={{ mt: '1.2rem' }}>
          <Skeleton count={1} height={150}></Skeleton>{' '}
        </Box>
      ) : suggestedProfiles.length > 0 ? (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mb: '0.75rem',
              mt: '1rem',
            }}
          >
            <Typography component='p' fontWeight='bold'>
              Suggestions for you
            </Typography>
          </Box>

          <Box sx={{ display: 'grid', gap: '1rem', mt: '1rem' }}>
            {suggestedProfiles.map((profile) => (
              <SuggestedProfile
                key={profile.userId}
                username={profile.username}
                profileId={profile.userId}
              />
            ))}
          </Box>
        </Box>
      ) : null}
    </>
  )
}

export default Suggestions
