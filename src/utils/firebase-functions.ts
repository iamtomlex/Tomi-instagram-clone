import { auth, colRef, db } from './firebase'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth'
import { login } from '../redux-store/auth.slice'
import { ThunkDispatch } from 'redux-thunk'
import {
  MakeLoginRequestInterface,
  MakeSignUpRequestInterface,
  UserData,
} from './types'
import {
  AuthState,
  SuggestedProfilesState,
  UserInfoState,
} from '../redux-store/types'
import { PersistPartial } from 'redux-persist/es/persistReducer'
import { AnyAction, Dispatch, EmptyObject } from '@reduxjs/toolkit'
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore'
import { getUserInfo } from '../redux-store/user.slice'
import { getSuggestedProfiles } from '../redux-store/suggestedProfiles.slice'

export const makeSignUpRequest = async (
  payload: MakeSignUpRequestInterface,
  dispatch: ThunkDispatch<
    EmptyObject & {
      auth: AuthState
    } & PersistPartial,
    undefined,
    AnyAction
  > &
    Dispatch<AnyAction>,
  callback: () => void
) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    payload.email,
    payload.password
  )

  const { user } = userCredential

  await updateProfile(user, { displayName: payload.username })

  const docRef = doc(db, 'users', user.uid)

  await setDoc(
    docRef,
    {
      userId: user.uid,
      username: payload.username.toLowerCase(),
      fullName: payload.fullName,
      email: payload.email.toLowerCase(),
      followers: [],
      following: [],
      dateCreated: `${Date.now()}`,
    },
    { merge: true }
  )

  callback()
}

export const makeLoginRequest = async (
  payload: MakeLoginRequestInterface,
  dispatch: ThunkDispatch<
    EmptyObject & {
      auth: AuthState
    } & PersistPartial,
    undefined,
    AnyAction
  > &
    Dispatch<AnyAction>,
  callback: () => void
) => {
  const { user } = await signInWithEmailAndPassword(
    auth,
    payload.email,
    payload.password
  )

  const userData: UserData = {
    email: user.email,
    displayName: user.displayName,
    uid: user.uid,
  }
  dispatch(login(userData))
  callback()
}

export const doesUsernameExist = async (
  username: string
): Promise<boolean[]> => {
  const q = query(colRef, where('usernmae', '==', username))
  const result = await getDocs(q)
  return result.docs.map((user) => user.data().length > 0)
}

export const getUserByUserId = async (
  userId: string,
  dispatch: ThunkDispatch<
    EmptyObject & {
      auth: AuthState
    } & PersistPartial,
    undefined,
    AnyAction
  > &
    Dispatch<AnyAction>
) => {
  const docRef = doc(db, 'users', userId)

  const docSnap = await getDoc(docRef)

  const result = docSnap.data()
  const user: any = { ...result }

  dispatch(getUserInfo({ ...user }))
}

export const getUserSuggestedProfiles = async (
  userId: string,
  following: string[],
  dispatch: ThunkDispatch<
    EmptyObject & {
      auth: AuthState
      user: UserInfoState
      suggestedProfiles: SuggestedProfilesState
    } & PersistPartial,
    undefined,
    AnyAction
  > &
    Dispatch<AnyAction>
) => {
  const q = query(colRef, limit(10))
  const result = await getDocs(q)

  const profiles = result.docs
    .map((user) => ({ ...user.data() }))
    .filter(
      (profile) =>
        profile.userId !== userId && !following.includes(profile.userId)
    )

  dispatch(getSuggestedProfiles([...profiles]))
}

export const updateLoggedInUserFollowing = async (
  userId: string,
  profileId: string,
  isFollowingProfile: boolean
) => {
  const docRef = doc(db, 'users', userId)
  return await updateDoc(docRef, {
    following: isFollowingProfile
      ? arrayRemove(profileId)
      : arrayUnion(profileId),
  })
}

export const updateFollowedProfile = async (
  userId: string,
  profileId: string,
  isFollowed: boolean
) => {
  const docRef = doc(db, 'users', profileId)
  return await updateDoc(docRef, {
    followers: isFollowed ? arrayRemove(userId) : arrayUnion(userId),
  })
}
