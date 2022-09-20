import { styled } from '@mui/material/styles'
import InputBase from '@mui/material/InputBase'


export const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
    color: '#222',
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: 'transparent',
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