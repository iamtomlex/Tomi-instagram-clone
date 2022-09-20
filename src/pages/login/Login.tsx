import * as React from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import { toast } from 'react-toast'
import styles, { BootstrapInput } from './styles'
import { ROUTES } from '../../utils/constants'
import { useAppDispatch, useAppSelector } from '../../redux-store/hooks'
import { selectAuthState } from '../../redux-store/auth.slice'
import { makeLoginRequest } from '../../utils/firebase-functions'

const Login = () => {
  const [loading, setLoading] = React.useState(false)
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  const { user } = useAppSelector(selectAuthState)
  const dispatch = useAppDispatch()
  const location = useLocation()
  const navigate = useNavigate()

  //@ts-ignore
  let from = location.state?.from?.pathname || ROUTES.DASHBOARD

  const isInvalid = password === '' || email === '' || loading

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const payload = {
      email,
      password,
    }

    const callback = () => {
      navigate(from, { replace: true })
    }

    try {
      if (!user) {
        await makeLoginRequest(payload, dispatch, callback)
      }
    } catch (err) {
      toast.error('Unable to Login!!')
      setLoading(false)
      setEmail('')
      setPassword('')
    }
  }

  React.useEffect(() => {
    document.title = 'Login - Instagram'
  }, [])

  return (
    <Box sx={styles.box}>
      <Grid container spacing={2} sx={styles.container}>
        <Grid item xs={12} md={6.5} sx={styles.left}>
          <Box
            component='img'
            sx={styles.iphone}
            src='/images/avatars/iphone.jpg'
            alt=''
          />
        </Grid>
        <Grid item md={5.5}>
          <Box sx={styles.rightContent}>
            <Box
              sx={styles.logo}
              component='img'
              src='/images/users/logo.png'
              alt=''
            />

            <Box
              component='form'
              onSubmit={handleLogin}
              sx={{ mt: '2rem' }}
              method='POST'
            >
              <Box sx={styles.formItem}>
                <FormControl variant='standard'>
                  <InputLabel shrink htmlFor='email' sx={styles.textFieldLabel}>
                    Email Address
                  </InputLabel>

                  <BootstrapInput
                    id='email'
                    name='email'
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete='email'
                    required
                    fullWidth
                    sx={styles.textFieldInput}
                  />
                </FormControl>
              </Box>

              <Box sx={styles.formItem}>
                <FormControl variant='standard'>
                  <InputLabel
                    shrink
                    htmlFor='password'
                    sx={styles.textFieldLabel}
                  >
                    Password
                  </InputLabel>

                  <BootstrapInput
                    id='password'
                    name='password'
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    fullWidth
                    sx={styles.textFieldInput}
                  />
                </FormControl>
              </Box>

              <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={styles.button}
                disableElevation
                disabled={isInvalid}
              >
                {loading ? (
                  <CircularProgress sx={{ color: '#fff' }} size={25} />
                ) : (
                  'Log In'
                )}
              </Button>
              <Divider sx={styles.divider}>OR</Divider>
            </Box>

            <Box
              sx={{
                mt: {
                  xs: '6rem',
                  md: '2rem',
                },
              }}
            >
              <Typography component='span' fontSize={17}>
                Don't have an account?
              </Typography>
              <Typography
                sx={{ ml: '10px', color: '#3da0f7' }}
                fontWeight={600}
                fontSize={17}
                component='span'
              >
                <Link to={ROUTES.SIGN_UP}>Sign up</Link>
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Login
