import * as React from 'react'
import Box from '@mui/material/Box'


interface Props {
  caption: string
  src: string
}

const Image = ({ caption, src }: Props) => {
  return <Box>
    <Box sx={{width:'100%'}} component='img' src={src} alt={caption} />
  </Box>
}

export default Image
