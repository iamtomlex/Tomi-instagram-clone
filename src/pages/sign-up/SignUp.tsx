import * as React from 'react'
import { useNavigate, Link } from 'react-router-dom'
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
import {
  doesUsernameExist,
  makeSignUpRequest,
} from '../../utils/firebase-functions'
import { useAppDispatch } from '../../redux-store/hooks'

const SignUp = () => {
  const [loading, setLoading] = React.useState(false)
  const [username, setUsername] = React.useState('')
  const [fullName, setFullName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  const isInvalid = password === '' || email === '' || loading

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const payload = {
      email,
      password,
      username,
      fullName,
    }

    const callback = () => {
      navigate(ROUTES.LOGIN, { replace: true })
    }

    const usernameExists = await doesUsernameExist(username)
    if (!usernameExists.length) {
      try {
        await makeSignUpRequest(payload, dispatch, callback)
        toast.success('Successfully Signed Up!!')
      } catch (err: any) {
        toast.error(err.message)
        setLoading(false)
        setEmail('')
        setPassword('')
        setUsername('')
        setFullName('')
      }
    } else {
      toast.error('The username already exist. Try another one!!')
      setLoading(false)
      setEmail('')
      setPassword('')
      setUsername('')
      setFullName('')
    }
  }

  React.useEffect(() => {
    document.title = 'Sign Up - Instagram'
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
              onSubmit={handleSignup}
              sx={{ mt: '2rem' }}
              method='POST'
            >
              <Box sx={styles.formItem}>
                <FormControl variant='standard'>
                  <InputLabel
                    shrink
                    htmlFor='username'
                    sx={styles.textFieldLabel}
                  >
                    Username
                  </InputLabel>

                  <BootstrapInput
                    id='username'
                    name='username'
                    type='username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    autoComplete='username'
                    autoFocus
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
                    htmlFor='fullName'
                    sx={styles.textFieldLabel}
                  >
                    FullName
                  </InputLabel>

                  <BootstrapInput
                    id='fullName'
                    name='fullName'
                    type='fullName'
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    autoComplete='fullName'
                    autoFocus
                    required
                    fullWidth
                    sx={styles.textFieldInput}
                  />
                </FormControl>
              </Box>

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
                    autoFocus
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
                    autoComplete='false'
                    autoFocus
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
                  'Sign Up'
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
                Have an account?
              </Typography>
              <Typography
                sx={{ ml: '10px', color: '#3da0f7' }}
                fontWeight={600}
                fontSize={17}
                component='span'
              >
                <Link to={ROUTES.LOGIN}>Log In</Link>
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default SignUp
