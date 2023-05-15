import {initializeApp} from "firebase/app";
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    User,
    NextOrObserver,
} from "firebase/auth";

import { Category } from "../../store/categories/category.types";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
  QueryDocumentSnapshot,
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

  export type ObjectToAdd = {
    title: string;
  }

  export const addCollectionAndDocuments = async <T extends ObjectToAdd>(
    collectionKey: string, 
    objectsToAdd: T[]
  ): Promise<void> => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((object) => {
      const docRef = doc(collectionRef, object.title.toLowerCase());
      batch.set(docRef, object);
    })
    await batch.commit();
    console.log('done');
  }

  export const getCategoriesandDocuments = async (): Promise<Category[]> => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(docSnapShot => docSnapShot.data() as Category);
  }

  export type AdditionalInfo = {
    displayName?: string;
  }

  export type UserData = {
    createdAt: Date;
    displayName: string;
    email: string;
  }

  export const createUserDocumentFromAuth = async (
    userAuth: User, 
    additionalInfo = {} as AdditionalInfo
  ): Promise<void | QueryDocumentSnapshot<UserData>> => {
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
          console.log('Error creating user document', error);
        }     
    }
    return userSnapShot as QueryDocumentSnapshot<UserData>;
  }

  export const createAuthUserWithEmailAndPassword = async (email: string, password: string) => {
    if (!email || !password)
      return;
    
    return await createUserWithEmailAndPassword(auth, email, password);
  }

  export const signInAuthUserWithEmailAndPassword = async (email: string, password: string) => {
    if (!email || !password)
      return;
    
    return await signInWithEmailAndPassword(auth, email, password);
  }

  export const signOutUser = async () => await signOut(auth);

  export const onAuthStateChangedListener = (callback: NextOrObserver<User>) => onAuthStateChanged(auth, callback);

  export const getCurrentUser = (): Promise<User | null> => {
    return new Promise((resolve, reject) =>  {
      const unsubscribe = onAuthStateChanged(auth,
        (userAuth) => {
          unsubscribe();
          resolve(userAuth);
        },
        reject)
    })
  }