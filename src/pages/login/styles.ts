import { styled } from '@mui/material/styles'
import InputBase from '@mui/material/InputBase'

const styles = {
  box: {
    width: '100vw',
    height: '100vh',
    p: 0,
    m: 0,
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    display: {
      xs: 'flex',
    },
    justifyContent: {
      xs: 'center',
    },
  },
  logo: {
    width: '10rem',
  },
  left: {
    textAlign: 'right',
    display: {
      xs: 'none',
      md: 'block',
    },
  },
  iphone: {
    width: {
      md: '30rem',
      lg: '32rem',
    },
    height: {
      md: '90%',
      lg: '100%',
    },
  },
  rightContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    background: {
      xs: 'transparent',
      sm: '#fff',
    },
    width: {
      xs: '28rem',
      md: '22rem',
      lg: '27rem',
    },
    p: '3rem 2rem',
    border: {
      xs: 'none',
      sm: '3px solid  #f2f2f2',
    },
    marginTop: {
      xs: 0,
      md: '2rem',
    },
  },
  formItem: {
    marginBottom: '10px',
  },
  textFieldLabel: {
    fontSize: 16,
  },
  textFieldInput: {
    width: {
      xs: '320px',
      md: '280px',
      lg: '350px',
    },
  },
  button: {
    color: '#fff',
    fontSize: 18,
    background: '#b2dffc',
    height: {
      xs: '35px',
      md: '40px',
    },

    marginTop: '10px',
    fontWeight: 600,
    mb: '1.5rem',
    '&:hover': {
      background: '#0095f6',
    },
  },
  divider: {
    color: '#b5a49a',
    fontSize: 16,
    fontWeight: 600,
  },
}

export default styles

export const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
    color: '#222',
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: '#fafafa',
    border: '1px solid #ced4da',
    fontSize: 16,
    width: '100%',
    height: '20px',
    padding: '10px 15px',
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow',
    ]),

    '&:focus': {
      borderColor: '#b2dffc',
    },
  },
}))
