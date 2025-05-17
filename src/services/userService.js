// this file helps us manage user data in our firebase database.
import { db } from '../firebase/firebase.js'; // our firebase database connection.
// functions from firebase to work with the database.
import { collection, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc, query, where } from "firebase/firestore";

// a reference to the 'users' collection in our database.
const usersCollectionRef = collection(db, "users");

// gets all users from the database.
export const getUsers = async () => {
  const data = await getDocs(usersCollectionRef);
  // formats each user's data and includes their id.
  return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

// gets a single user by their id.
export const getUserById = async (id) => {
  const docRef = doc(db, "users", id); // reference to a specific user document.
  const docSnap = await getDoc(docRef); // fetches the document.

  if (docSnap.exists()) {
    return { ...docSnap.data(), id: docSnap.id }; // returns user data if found.
  } else {
    // if no user is found with that id, return null.
    return null;
  }
};

// adds a new user to the database.
export const addUser = async (userData) => {
  const docRef = await addDoc(usersCollectionRef, userData); // adds the new user.
  return { id: docRef.id, ...userData }; // returns the new user's data with their id.
};

// updates an existing user's data.
export const updateUser = async (id, updatedData) => {
  const docRef = doc(db, "users", id); // reference to the user to update.
  await updateDoc(docRef, updatedData); // updates the user's data.
};

// deletes a user from the database.
export const deleteUser = async (id) => {
  const docRef = doc(db, "users", id); // reference to the user to delete.
  await deleteDoc(docRef); // deletes the user.
};

// gets users based on their role (e.g., 'admin', 'member').
export const getUsersByRole = async (role) => {
  // creates a query to find users where the 'role' field matches the given role.
  const q = query(usersCollectionRef, where("role", "==", role));
  const querySnapshot = await getDocs(q); // fetches users matching the query.
  return querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

// gets specific dashboard data based on a filter type (e.g., 'today', '7days').
// this data is expected to be stored in a 'dashboardData' collection in firebase.
export const getDashboardDataByFilter = async (filterType) => {
  // it's important that filtertype is provided.
  if (!filterType) {
    // if no filtertype is given, we can't fetch the data, so we throw an error.
    // this helps catch problems early if the function is used incorrectly.
    throw new Error("Filter type is required to fetch dashboard data.");
  }
  // reference to a document in 'dashboardData' collection, named after the filtertype.
  const docRef = doc(db, "dashboardData", filterType);
  const docSnap = await getDoc(docRef); // fetches the document.

  if (docSnap.exists()) {
    return docSnap.data(); // returns the dashboard data if found.
  } else {
    // if no data is found for that filter, throw an error.
    // this helps identify if the data isn't set up correctly in firebase.
    throw new Error(`No dashboard data found for filter: ${filterType}. Ensure the document exists in Firestore collection 'dashboardData'.`);
  }
};