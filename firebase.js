import { initializeApp } from "firebase/app";
import { 
  getFirestore, 
  collection, 
  getDocs, 
  addDoc, 
  doc, 
  updateDoc, 
  deleteDoc, 
  setDoc,
  onSnapshot 
} from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCx4qT7rGxJplyvN1Fbd6n3MgGDJrfBZfA",
  authDomain: "inventory-system-vite.firebaseapp.com",
  projectId: "inventory-system-vite",
  storageBucket: "inventory-system-vite.firebasestorage.app",
  messagingSenderId: "382759891084",
  appId: "1:382759891084:web:a07e100fe53b1a64968ba9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Firestore collection references
const productsCollectionRef = collection(db, 'products');
const usersCollectionRef = collection(db, 'users');

// Product functions
const getProducts = async () => {
  const data = await getDocs(productsCollectionRef);
  return data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
};

const getProductsRealtime = (callback) => {
  const productsCollectionRef = collection(db, 'products');
  return onSnapshot(productsCollectionRef, (snapshot) => {
    const productsData = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    callback(productsData);
  });
};

const addProduct = async (productData) => {
  await addDoc(productsCollectionRef, productData);
};

const updateProduct = async (id, productData) => {
  const productDoc = doc(db, 'products', id);
  await updateDoc(productDoc, productData);
};

const deleteProduct = async (id) => {
  const productDoc = doc(db, 'products', id);
  await deleteDoc(productDoc);
};

// Authentication functions
const registerUser = async (email, password) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  // Add the new user to the 'users' collection with a default role
  await setDoc(doc(db, "users", userCredential.user.uid), {
    email: userCredential.user.email,
    role: 'guest',
    createdAt: new Date()
  });
};

const loginUser = async (email, password) => {
  await signInWithEmailAndPassword(auth, email, password);
};

const logoutUser = async () => {
  await signOut(auth);
};

// User management functions
const getUsers = async () => {
  const data = await getDocs(usersCollectionRef);
  return data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
};

const updateUserRole = async (userId, newRole) => {
  const userDoc = doc(db, 'users', userId);
  await updateDoc(userDoc, { role: newRole });
};

const deleteUser = async (userId) => {
  const userDoc = doc(db, 'users', userId);
  await deleteDoc(userDoc);
};

export { 
  db, 
  getProducts,
  getProductsRealtime,
  addProduct, 
  updateProduct, 
  deleteProduct,
  auth,
  registerUser,
  loginUser,
  logoutUser,
  getUsers,
  updateUserRole,
  deleteUser
};