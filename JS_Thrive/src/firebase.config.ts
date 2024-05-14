import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBJLsDxC0Bvsl_Zpvh6Hrd8Tb9XW9AIC_k',
  authDomain: 'jsthrive.firebaseapp.com',
  projectId: 'jsthrive',
  storageBucket: 'jsthrive.appspot.com',
  messagingSenderId: '1017285000341',
  appId: '1:1017285000341:web:2ab635799c744493cdef9c',
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);

export { app, auth, firestore };
