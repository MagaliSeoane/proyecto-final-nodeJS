import { db } from '../config/firebase.js';
import { collection, query, where, getDocs } from 'firebase/firestore';

export const getUserByEmail = async (email) => {
  const usersRef = collection(db, 'users');
  const q = query(usersRef, where('email', '==', email));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    return querySnapshot.docs[0].data(); // devuelve el primer usuario encontrado
  } else {
    return null;
  }
};
