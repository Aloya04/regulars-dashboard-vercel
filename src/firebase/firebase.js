import { initializeApp } from "firebase/app";
// we're using firestore, which is firebase's database.
import { getFirestore, enableIndexedDbPersistence} from "firebase/firestore"; 

// this is your unique configuration info from firebase.
// it tells your app which firebase project to connect to.
// now using environment variables for security and flexibility.
const firebaseConfig = {
  apiKey: "AIzaSyAe6TwG97dPu-tQPgSH3VIUiCqspK91orU",
  authDomain: "regulars-3a4e8.firebaseapp.com",
  projectId: "regulars-3a4e8",
  storageBucket: "regulars-3a4e8.firebasestorage.app",
  messagingSenderId: "918091340439",
  appId: "1:918091340439:web:b2760681e340106678a7d2"
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