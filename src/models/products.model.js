import { db } from '../config/firebase.js';

import { collection, getDocs, getDoc, addDoc, deleteDoc, doc } from 'firebase/firestore';

const productsCollection = collection(db, 'products');

export const getAllProducts = async () => {
  const snapshot = await getDocs(productsCollection);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getProductById = async (id) => {
  const productDoc = doc(db, 'products', id);
  const productSnapshot = await getDoc(productDoc);
  if (!productSnapshot.exists()) throw new Error('Producto no encontrado');
  return { id: productSnapshot.id, ...productSnapshot.data() };
};

export const createProduct = async (productData) => {
  const docRef = await addDoc(productsCollection, productData);
  return { id: docRef.id, ...productData };
};

export const deleteProduct = async (id) => {
  const productDoc = doc(db, 'products', id);
  await deleteDoc(productDoc);
};