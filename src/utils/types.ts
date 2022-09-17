export interface MakeSignUpRequestInterface {
  username: string
  fullName: string
  email: string
  password: string
}

export interface MakeLoginRequestInterface {
  email: string
  password: string
}

export interface UserData {
  email: string | null
  displayName: string | null
  uid: string
}

export interface uuu {
  photos: {
    userLikedPhotos: boolean
    username: string
  }[]
}
