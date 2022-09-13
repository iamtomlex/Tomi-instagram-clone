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

export interface UserInfoState {
  userInfo: {
    email: string
    userId: string
    username: string
    fullName: string
    followers: string[]
    following: string[]
    dateCreated: string
  }
}
