import {initializeApp} from "firebase/app";
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB9M7OXuJykb478RF923XOCFxl0Ai8ECDM",
  authDomain: "e-clothing-e3396.firebaseapp.com",
  projectId: "e-clothing-e3396",
  storageBucket: "e-clothing-e3396.appspot.com",
  messagingSenderId: "230309049793",
  appId: "1:230309049793:web:076cfe019869d1d844eb40"
};
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();

  provider.setCustomParameters({
    prompt: 'select_account',
  });

  export const auth = getAuth();
  export const signInWithGooglePopUp = () => signInWithPopup(auth, provider);

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth, additionalInfo) => {
    if (!userAuth)
      return;
    const userDocRef = doc(db, "users", userAuth.uid);
    // console.log(userDocRef);
    const userSnapShot = await getDoc(userDocRef);
    // console.log(userSnapShot);

    if(!userSnapShot.exists()) {
      const {displayName, email} = userAuth;
      const createdAt = new Date();

      try {
        await setDoc(userDocRef, {
          displayName,
          email,
          createdAt,
          ...additionalInfo
        });} catch (error) {
          console.log('Error creating user document', error.message);
        }     
    }
    return userDocRef;
  }

  export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password)
      return;
    
    return await createUserWithEmailAndPassword(auth, email, password);
  }

  export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password)
      return;
    
    return await signInWithEmailAndPassword(auth, email, password);
  }

  export const signOutUser = async () => await signOut(auth);

  export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);