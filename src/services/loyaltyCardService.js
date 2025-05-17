// this file helps us talk to our firebase database for loyalty card stuff.
import { db } from '../firebase/firebase'; // our firebase database connection.
// these are functions from firebase that let us do things with the database.
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc, serverTimestamp, getDoc } from 'firebase/firestore';

// this tells firebase which collection (like a folder) in our database we're working with.
const loyaltyCardsCollectionRef = collection(db, 'loyaltyCards');

// create: this function adds a new loyalty card to the database.
export const addLoyaltyCard = async (cardData) => {
  // 'addDoc' adds a new document (our card) to the 'loyaltyCards' collection.
  // 'serverTimestamp()' automatically adds the current time when the card is created on the server.
  const docRef = await addDoc(loyaltyCardsCollectionRef, {
    ...cardData, // includes all the details of the card (name, type, etc.).
    createdAt: serverTimestamp(), // adds a timestamp.
  });
  // we return the new card's data along with its id and a client-side timestamp.
  return { id: docRef.id, ...cardData, createdAt: new Date() };
};

// read: this function gets all the loyalty cards from the database.
export const getLoyaltyCards = async () => {
  // 'getDocs' fetches all documents from our 'loyaltyCards' collection.
  const querySnapshot = await getDocs(loyaltyCardsCollectionRef);
  // we then loop through each document and format it nicely, adding the id to each card's data.
  return querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
};

// read - single card by id: this function gets one specific loyalty card using its id.
export const getLoyaltyCardById = async (cardId) => {
  // 'doc' creates a reference to a specific document in our collection.
  const cardDocRef = doc(db, 'loyaltyCards', cardId);
  // 'getDoc' fetches that specific document.
  const cardSnap = await getDoc(cardDocRef);

  // if the card exists in the database...
  if (cardSnap.exists()) {
    // ...return its data along with its id.
    return { id: cardSnap.id, ...cardSnap.data() };
  } else {
    // if no card is found with that id, return null.
    return null;
  }
};

// update status: this function changes the status (e.g., 'active' or 'inactive') of a card.
export const updateLoyaltyCardStatus = async (cardId, newStatus) => {
  // get a reference to the specific card document.
  const cardDoc = doc(db, 'loyaltyCards', cardId);
  // 'updateDoc' changes the 'status' field of that card to the 'newStatus'.
  await updateDoc(cardDoc, { status: newStatus });
};

// update (generic): this function can update any part of a loyalty card.
export const updateLoyaltyCard = async (cardId, updatedData) => {
  // get a reference to the specific card document.
  const cardDoc = doc(db, 'loyaltyCards', cardId);
  // 'updateDoc' changes the fields in 'updatedData' for that card.
  await updateDoc(cardDoc, updatedData);
};

// delete: this function removes a loyalty card from the database.
export const deleteLoyaltyCard = async (cardId) => {
  // get a reference to the specific card document.
  const cardDoc = doc(db, 'loyaltyCards', cardId);
  // 'deleteDoc' removes that card from the database.
  await deleteDoc(cardDoc);
};
