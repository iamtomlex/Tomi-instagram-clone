import * as React from 'react'
import { Link } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import { selectUserInfoState } from '../../../redux-store/user.slice'
import { useAppSelector } from '../../../redux-store/hooks'

const User = () => {
  const { userInfo } = useAppSelector(selectUserInfoState)

  console.log(userInfo.username);
  

  return (
    <Box>
      {/* {!username || !fullName ? (
        <Skeleton count={1} height={61} />
      ) : (
        <Link to={`/p/${username}`}>
          <Box
            sx={{
              display: 'flex',
              gap: '1rem',
              alignItems: 'center',
            }}
          >
            <Avatar
              sx={{ width: '4rem', height: '4rem' }}
              src={`/images/avatars/${username}.jpg`}
              alt={`${fullName}`}
            />

            <Box sx={{ color: '#2e2e2e' }}>
              <Typography fontWeight={600} variant='h6' component='p'>
                {username}
              </Typography>
              <Typography variant='body1' component='p'>
                {fullName}
              </Typography>
            </Box>
          </Box>
        </Link> */}
      {/* )} */}
    </Box>
  )
}

export default User
