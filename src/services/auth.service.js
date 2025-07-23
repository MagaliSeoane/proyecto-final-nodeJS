import { db } from '../config/firebase.js';

import { collection, query, where, getDocs } from 'firebase/firestore';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const usersCollection = collection(db, 'users');

export const loginService = async (email, password) => {
  const q = query(usersCollection, where('email', '==', email));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    throw new Error('Usuario no encontrado');
  }

  const userDoc = querySnapshot.docs[0];
  const userData = userDoc.data();

  const passwordValid = await bcrypt.compare(password, userData.passwordHash);
  if (!passwordValid) {
    throw new Error('Contraseña incorrecta');
  }

  // Crear token JWT
  const token = jwt.sign(
    { uid: userDoc.id, email: userData.email },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  return { token, user: { id: userDoc.id, email: userData.email } };
};
