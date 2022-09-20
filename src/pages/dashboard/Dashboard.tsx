import * as React from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Header from '../../components/header'
import Sidebar from '../../components/sidebar'
import Timeline from '../../components/timeline'
import { useAppDispatch } from '../../redux-store/hooks'
import { clearProfile } from '../../redux-store/profile.slice'

const Dashboard = () => {
  const dispatch = useAppDispatch()

  React.useEffect(() => {
    document.title = 'Instagram'
    dispatch(clearProfile())
  }, [dispatch])

  return (
    <Box>
      <Header />

      <Grid container spacing={4} sx={{ mt: '5rem' }}>
        <Grid item xs={10} sm={4}>
          <Sidebar />
        </Grid>

        <Grid item xs={12} sm={8}>
          <Timeline />
        </Grid>
      </Grid>
    </Box>
  )
}

export default Dashboard
