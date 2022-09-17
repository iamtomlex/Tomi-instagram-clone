export interface Comment {
  displayName: string | undefined | null
  comment: string
}

export interface Posts {
  username: string
  userLatitude: string
  comments: Comment[]
  caption: string
  dateCreated: number
  likes: string[]
  photoId: string
  userLongitude: string
  userId: string
  imageSrc: string
  userLikedPhotos: boolean
}

export interface PostState {
  content: Posts
}
