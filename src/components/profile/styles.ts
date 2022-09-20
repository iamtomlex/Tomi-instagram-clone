import { grey } from '@mui/material/colors'

const styles = {
  photosContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat( auto-fit, minmax(250px, 1fr))',
    gap: '1.5rem',
    width: '90%',
    m: '0 auto',
  },
  photo: {
    width: '100%',
    borderRadius: '5px',
  },

  hoverPhotos: {
    borderRadius: '5px',
    '&:hover': {
      display: 'flex',
      //   background: 'red',
      position: 'absolute',
      bottom: 0,
      left: 0,
      background: grey[400],
      zIndex: 10,
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'space-evenly',
    },
  },
}

export default styles
