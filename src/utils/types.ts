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
  //   user: {
  email: string | null
  displayName: string | null
  uid: string
  //   }
}
