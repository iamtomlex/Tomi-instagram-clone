import { initializeApp } from 'firebase/app'
import { getFirestore, collection } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyBdZsDCLVdrjYyW-sMeyWtxaI6Ix_juHgA',
  authDomain: 'instagram-1bbe8.firebaseapp.com',
  projectId: 'instagram-1bbe8',
  storageBucket: 'instagram-1bbe8.appspot.com',
  messagingSenderId: '661072392189',
  appId: '1:661072392189:web:3dfaee9d57cdf3d4f67394',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const colRef = collection(db, 'users')
export const auth = getAuth(app)
