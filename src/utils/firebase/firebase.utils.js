import { initializeApp } from 'firebase/app'
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBoxoqqIXue5_5v8iJjiIjeOol4nu2Ajk8",
    authDomain: "crwn-clothing-db-3f7d3.firebaseapp.com",
    projectId: "crwn-clothing-db-3f7d3",
    storageBucket: "crwn-clothing-db-3f7d3.appspot.com",
    messagingSenderId: "866468331815",
    appId: "1:866468331815:web:b401e05d6a2da195e86902"
  };
  // Initialize Firebase

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider
provider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid)
    console.log(userDocRef)
    const userSnapshot = await getDoc(userDocRef)
    console.log(userSnapshot.exists())

    if(!userSnapshot.exists()){
        const {displayName, email} = userAuth
        const createdAt = new Date()

        try {
          await setDoc(userDocRef, {
              displayName,
              email,
              createdAt
          })
        } catch (error) {
            console.log('error creating user', error.message)
        }
    }

    return userDocRef
}