import * as React from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import { Link } from 'react-router-dom'

interface Props {
  username: string
}

const Header: React.FC<Props> = ({ username }) => {
  return (
    <Paper sx={{ display: 'flex', height: '4rem', p: '2rem 1rem' }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Link to={`/p/${username}`}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap:'1rem' }}>
            <Avatar
              src={`/images/avatars/${username}.jpg`}
              alt={`${username} profile picture`}
            />
            <Typography fontWeight='bold' sx={{color:'#2e2e2e'}}>{username}</Typography>
          </Box>
        </Link>
      </Box>
    </Paper>
  )
}

export default Header
