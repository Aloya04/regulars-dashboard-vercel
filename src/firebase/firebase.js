import { initializeApp } from "firebase/app";
// we're using firestore, which is firebase's database.
import { getFirestore, enableIndexedDbPersistence} from "firebase/firestore"; 

// this is your unique configuration info from firebase.
// it tells your app which firebase project to connect to.
// now using environment variables for security and flexibility.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// initialize the firebase app with our config.
const app = initializeApp(firebaseConfig);

// get a reference to the firestore database service.
const db = getFirestore(app);

// 
// this tries to enable offline persistence - means app can still work with some data even if the internet connection is lost.
enableIndexedDbPersistence(db)
  .catch((err) => {
    // if it fails, we're not logging detailed errors to the console anymore for simplicity.
    if (err.code === 'failed-precondition') {
      // this can happen if multiple tabs are open.
    } else if (err.code === 'unimplemented') {
      // this means the browser doesn't support it.
    }
  });

// we export 'db' so other parts of our app can use it to interact with the database.
export { db, app };