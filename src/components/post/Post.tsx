import * as React from 'react'
import Paper from '@mui/material/Paper'
import { PostState } from './types'
import Header from '../postComponents/Header'
import Image from '../postComponents/Image'
import Actions from '../postComponents/Actions'
import Footer from '../postComponents/Footer'
import Comments from '../postComponents/Comments'

const Post = ({ content }: PostState) => {
  const commentInput = React.useRef<HTMLInputElement>(null)

  const handleFocus = () => {
    if (commentInput.current) {
     return commentInput.current.focus()
    }
  }

  return (
    <Paper sx={{ mb: '4rem' }}>
      <Header username={content.username} />
      <Image src={content.imageSrc} caption={content.caption} />
      <Actions
        photoId={content.photoId}
        totalLikes={content.likes.length}
        likedPhoto={content.userLikedPhotos}
        handleFocus={handleFocus}
      />
      <Footer caption={content.caption} username={content.username} />
      <Comments
        photoId={content.photoId}
        comments={content.comments}
        posted={content.dateCreated}
        commentInput={commentInput}
      />
    </Paper>
  )
}

export default Post
