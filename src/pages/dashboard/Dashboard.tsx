import * as React from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { Link } from 'react-router-dom'
import Header from '../../components/header'
import Sidebar from '../../components/sidebar'
import Timeline from '../../components/timeline'

const Dashboard = () => {
  React.useEffect(() => {
    document.title = 'Instagram'
  }, [])

  return (
    <Box>
      <Header />

      <Grid container spacing={4} sx={{ mt: '5rem' }}>
        <Grid item xs={8} >
          <Timeline />
        </Grid>

        <Grid item xs={4}>
          <Sidebar />
        </Grid>
      </Grid>
    </Box>
  )
}

export default Dashboard
