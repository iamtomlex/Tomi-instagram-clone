import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Comment } from '../post/types'
import { grey } from '@mui/material/colors'
import { Link } from 'react-router-dom'
import { formatDistance } from 'date-fns'
import AddComments from './AddComments'

interface Props {
  photoId: string
  comments: Comment[]
  posted: number
  commentInput: React.RefObject<HTMLInputElement>
}

const Comments = ({
  photoId,
  comments: allComments,
  posted,
  commentInput,
}: Props) => {
  const [comments, setComments] = React.useState(allComments)

  return (
    <>
      <Box sx={{ p: '1rem', pt: '0.25rem', pb: '1rem' }}>
        {comments.length >= 3 && (
          <Typography
            sx={{ mb: '0.25rem', color: grey[500], cursor: 'pointer' }}
          >
            View all {comments.length} comments
          </Typography>
        )}
        {comments.slice(0, 3).map((item) => (
          <Typography
            key={`${item.comment}-${item.displayName}`}
            sx={{ mb: '0.25rem' }}
          >
            <Link to={`/p/${item.displayName}`}>
              <Typography
                component='span'
                sx={{ mr: '0.5rem', fontWeight: 'bold', color: '#2e2e2e' }}
              >
                {item.displayName}
              </Typography>
            </Link>
            <Typography variant='body2' component='span'>
              {item.comment}
            </Typography>
          </Typography>
        ))}
        <Typography
          variant='body2'
          sx={{ color: grey[500], textTransform: 'uppercase' }}
        >
          {formatDistance(posted, new Date())} ago
        </Typography>
      </Box>
      <AddComments
        photoId={photoId}
        comments={comments}
        setComments={setComments}
        commentInput={commentInput}
      />
    </>
  )
}

export default Comments
