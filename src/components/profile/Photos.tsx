import React from 'react'
import Skeleton from 'react-loading-skeleton'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { grey } from '@mui/material/colors'
import { PhotoState } from './types'
import styles from './styles'

interface Props {
  photos: PhotoState[]
}

const Photos = ({ photos }: Props) => {
  console.log(photos)

  return (
    <Box
      sx={{
        height: '4rem',
        mt: '3rem',
        pt: '1rem',
        borderTop: `1px solid ${grey[300]}`,
      }}
    >
      <Box sx={styles.photosContainer}>
        {!photos ? (
          <Skeleton count={12} width={320} height={400} />
        ) : (
          <>
            {photos.length > 0
              ? photos.map((photo) => (
                  <Box key={photo.photoId} sx={{ position: 'relative' }}>
                    <Box
                      sx={styles.photo}
                      component='img'
                      src={photo.imageSrc}
                      alt={photo.caption}
                    />

                    <Box sx={styles.hoverPhotos}></Box>
                  </Box>
                ))
              : null}
          </>
        )}
      </Box>

      {!photos ||
        (photos.length === 0 && (
          <Typography
            sx={{
              textAlign: 'center',
              fontSize: '1.3rem',
              fontWeight: 'bold',
              pt: '4rem',
            }}
          >
            No Posts Yet
          </Typography>
        ))}
    </Box>
  )
}

export default Photos
