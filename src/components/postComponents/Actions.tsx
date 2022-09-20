import * as React from 'react'
import { useAppDispatch, useAppSelector } from '../../redux-store/hooks'
import { selectUserInfoState } from '../../redux-store/user.slice'
import { getPhotos, handleLiked } from '../../utils/firebase-functions'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { FaRegCommentDots } from 'react-icons/fa'
import PuffLoader from '../loader/puffLoader'

interface Props {
  photoId: string
  totalLikes: number
  likedPhoto: boolean
  handleFocus: () => any
}

const Actions = ({ photoId, totalLikes, likedPhoto, handleFocus }: Props) => {
  const { userInfo } = useAppSelector(selectUserInfoState)
  const [toggleLiked, setToggleLiked] = React.useState<boolean>(likedPhoto)
  const [likes, setLikes] = React.useState(totalLikes)
  const [loading,setLoading] =React.useState(false)

  const dispatch = useAppDispatch()

  const handleToggleLiked = async () => {
    setLoading(true)
    if (userInfo) {
      await handleLiked(photoId, userInfo?.userId, toggleLiked)
      await getPhotos(userInfo.userId, userInfo.following, dispatch)
    }

    setToggleLiked((toggleLiked) => !toggleLiked)

    setLikes((likes) => (toggleLiked ? likes - 1 : likes + 1))

    setLoading(false)
  }

  return (
    <>
      <Box
        sx={{ display: 'flex', justifyContent: 'space-between', pl: '0.5rem' }}
      >
        <Box sx={{ display: 'flex' ,justifyContent:'center', alignItems:'center', }}>
          {
            loading ? <PuffLoader/> : 
              <IconButton
            onClick={handleToggleLiked}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleToggleLiked()
              }
            }}
          >
            {toggleLiked ? (
              <FavoriteIcon style={{ fill: 'red' }} />
            ) : (
              <FavoriteBorderIcon />
            )}
          </IconButton>
          }
        
          <IconButton
            onClick={handleFocus}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleFocus()
              }
            }}
          >
            <FaRegCommentDots />
          </IconButton>
        </Box>
      </Box>
      <Typography component='p' fontWeight='bold' sx={{ p: '0rem 1rem' }}>
        {likes > 1 ? `${likes} likes` : `${likes} like`}{' '}
      </Typography>
    </>
  )
}

export default Actions
