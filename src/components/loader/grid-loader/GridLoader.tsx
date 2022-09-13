import GridLoader from 'react-spinners/GridLoader'
import Box from '@mui/material/Box'
import styles from '../styles'

const GridLoad = () => {
  return (
    <Box sx={styles.container}>
      <GridLoader color='#b2dffc' size={30} />
    </Box>
  )
}

export default GridLoad
