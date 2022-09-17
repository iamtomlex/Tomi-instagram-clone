export interface User {
  email: string | null
  uid: string
  displayName: string | null
}

export interface AuthState {
  isLogged: boolean
  user: User | null
}

export interface SignUpData {
  username: string
  fullName: string
  email: string
  password: string
}

export interface SignInData {
  email: string
  password: string
}

export interface UserInfo {
  email: string
  userId: string
  username: string
  fullName: string
  followers: string[]
  following: string[]
  dateCreated: string
}

export interface UserInfoState {
  userInfo: UserInfo | null
}

export interface SuggestedProfile {
  // suggestedProfiles: {
  email: string
  userId: string
  username: string
  fullName: string
  followers: string[]
  following: string[]
  dateCreated: string
  // }[]
}

export interface SuggestedProfilesState {
  suggestedProfiles: SuggestedProfile[] | null
}

export interface Extras {
  userLikedPhotos: boolean
  username: string
}

interface Comment {
  comment: string
  displayName: string
}

export interface Photos {
  // photos: {
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
    // photosWithUserDetails:Extras[]
    userLikedPhotos: boolean
  }


export interface PhotosState {
  photos: Photos[] | null
}

export interface PhotosAction {
  photos: Photos[]
}
