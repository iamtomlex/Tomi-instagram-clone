import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

interface Props {
  caption: string
  username: string
}

const Footer = ({ caption, username }: Props) => {
  return (
    <Box sx={{ p: '1rem', pt: '0.3rem', pb: '0rem' }}>
      <Typography component='span'  fontWeight='bold' sx={{ mr: '0.5rem',fontSize:'1.1rem' }}>
        {username}
      </Typography>
      <Typography variant='body2' component='span'>{caption}</Typography>
    </Box>
  )
}

export default Footer
