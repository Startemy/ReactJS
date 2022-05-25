import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyCIhY5c3VWSzATXUvpFWACXoyyGSyMOgZE',
  authDomain: 'reactchat-80cac.firebaseapp.com',
  projectId: 'reactchat-80cac',
  storageBucket: 'reactchat-80cac.appspot.com',
  messagingSenderId: '718022856394',
  appId: '1:718022856394:web:6d3adea4e17a29210e6e33',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const signUp = async (email: string, password: string) =>
  await createUserWithEmailAndPassword(auth, email, password);

export const logIn = async (email: string, password: string) =>
  await signInWithEmailAndPassword(auth, email, password);

export const logOut = async () => await signOut(auth);

const database = getDatabase(app);
export const userRef = ref(database, 'user');
export const chatsRef = ref(database, 'chats');

export const getChatsById = (chatId: string) =>
  ref(database, `chats/${chatId}`);

export const getMessageListById = (chatId: string) =>
  ref(database, `chats/${chatId}/messageList/`);
