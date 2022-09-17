import * as React from 'react'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import Button from '@mui/material/Button'
import { Comment } from '../post/types'
import { BootstrapInput } from './styles'
import { grey } from '@mui/material/colors'
import { useAppSelector } from '../../redux-store/hooks'
import { selectAuthState } from '../../redux-store/auth.slice'
import { addComments } from '../../utils/firebase-functions'
import CircularProgress from '@mui/material/CircularProgress'

interface Props {
  photoId: string
  comments: Comment[]
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>
  commentInput: React.RefObject<HTMLInputElement>
}

const AddComments = ({
  photoId,
  comments,
  setComments,
  commentInput,
}: Props) => {
  const [comment, setComment] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const { user } = useAppSelector(selectAuthState)
  const displayName = user?.displayName

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    setComments([{ displayName, comment }, ...comments])
    setComment('')

    await addComments(photoId, displayName, comment)

    setLoading(false)
  }
  return (
    <Box sx={{ borderTop: '2px solid #fafafa' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pl: '0rem',
          pr: '1.25rem',
        }}
        component='form'
        onSubmit={(e) =>
          comment.length >= 1 ? handleSubmitComment(e) : e.preventDefault()
        }
        method='POST'
      >
        <FormControl sx={{ display: 'flex', flex: '1' }}>
          <BootstrapInput
            aria-label='Add a comment'
            autoFocus
            required
            fullWidth
            autoComplete='off'
            type='text'
            name='add-comment'
            placeholder='Add a comment...'
            value={comment}
            onChange={({ target }) => setComment(target.value)}
            ref={commentInput}
            sx={{
              fontSize: '1rem',
              color: grey[500],
              width: '100%',
              py: '1.25rem',
              px: '1rem',
            }}
          />
        </FormControl>
        <Button
          variant='outlined'
          sx={{ height: '40px' }}
          disabled={comment.length < 1 || loading}
          onClick={handleSubmitComment}
        >
          {loading ? <CircularProgress size={25} /> : 'POST'}
        </Button>
      </Box>
    </Box>
  )
}

export default AddComments
