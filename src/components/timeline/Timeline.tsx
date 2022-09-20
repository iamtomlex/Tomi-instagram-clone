import * as React from 'react'
import Skeleton from 'react-loading-skeleton'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useAppDispatch, useAppSelector } from '../../redux-store/hooks'
import { selectUserInfoState } from '../../redux-store/user.slice'
import { getPhotos } from '../../utils/firebase-functions'
import { selectPhotosState } from '../../redux-store/photos.slice'
import styles from './styles'
import Post from '../post/Post'

const Timeline = () => {
  const { userInfo } = useAppSelector(selectUserInfoState)
  const { photos } = useAppSelector(selectPhotosState)

  const dispatch = useAppDispatch()

  React.useEffect(() => {
    ;(async () => {
      if (userInfo) {
        if (userInfo?.following?.length > 0) {
          await getPhotos(userInfo.userId, userInfo.following, dispatch)
        }
      }
    })()
  }, [userInfo, dispatch])

  return (
    <Box sx={styles.timeline}>
      {!photos ? (
        <>
          {[...new Array(4)].map((_, i) => (
            <Skeleton key={i} count={1} width={400} height={500} />
          ))}
        </>
      ) : photos.length > 0 ? (
        photos
          .slice()
          .sort((a: any, b: any) => b.dateCreated - a.dateCreated)
          .map((content, i) => <Post key={i} content={content} />)
      ) : (
        <Typography>Follow People to see Photos</Typography>
      )}
    </Box>
  )
}

export default Timeline
