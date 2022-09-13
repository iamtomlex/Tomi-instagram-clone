import * as React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import LogoutIcon from '@mui/icons-material/Logout'
import { toast } from 'react-toast'
import { ROUTES } from '../../utils/constants'
import styles from './styles'
import { useAppDispatch, useAppSelector } from '../../redux-store/hooks'
import { logout, selectAuthState } from '../../redux-store/auth.slice'

const Header = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { user } = useAppSelector(selectAuthState)

  const handleLogout = () => {
    dispatch(logout())
    navigate(ROUTES.LOGIN)
    toast.success('Successfully Logged out')
  }

  return (
    <Box>
      <AppBar
        component='nav'
        sx={{
          position: 'fixed',
          background: '#fff',
          padding: { sm: '0px 5px', md: '0px 20px', lg: '0px 40px' },
          height: '60px',
        }}
      >
        <Toolbar sx={styles.headerContainer}>
          <Box>
            <Link to={ROUTES.DASHBOARD}>
              <Box
                component='img'
                src='/images/logo.png'
                alt='logo'
                sx={styles.logo}
              />
            </Link>
          </Box>

          <Box>
            {user ? (
              <Box sx={styles.right}>
                <Tooltip title='Home'  >
                  <IconButton>
                    <HomeOutlinedIcon
                      fontSize='large'
                      sx={{ color: '#262626' }}
                    />
                  </IconButton>
                </Tooltip>

                <Tooltip title='Sign Out' >
                  <IconButton
                    onClick={handleLogout}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleLogout()
                      }
                    }}
                  >
                    <LogoutIcon fontSize='medium' sx={{ color: '##262626' }} />
                  </IconButton>
                </Tooltip>

                <IconButton>
                  <Link to={`/p/${user.displayName}`}>
                    <Avatar
                      alt={`${user.displayName} profile picture`}
                      src={`/images/avatars/${user.displayName}.jpg`}
                      sx={{ width: 30, height: 30 }}
                    />
                  </Link>
                </IconButton>
              </Box>
            ) : (
              <Box sx={styles.right}>
                <Link to={ROUTES.LOGIN}>
                  <Button
                    sx={styles.button}
                    disableElevation
                    variant='contained'
                  >
                    Log In
                  </Button>
                </Link>

                <Link to={ROUTES.SIGN_UP}>
                  <Button sx={styles.button} disableElevation>
                    Sign Up
                  </Button>
                </Link>
              </Box>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Header
