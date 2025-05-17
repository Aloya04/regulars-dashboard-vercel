// this is the main component that wraps our entire application.
import React, { useState, useEffect } from "react";
// 'routes' and 'route' help us show different pages based on the url.
import { Routes, Route } from "react-router-dom"; 
import Sidebar from "./components/Sidebar/Sidebar"; // our navigation sidebar.
import Dashboard from "./components/Dashboard/Dashboard"; // the main dashboard page.
import LoyaltyCardsPage from "./pages/LoyaltyCardsPage/LoyaltyCardsPage"; // page for listing loyalty cards.
import CreateLoyaltyCardPage from "./pages/CreateLoyaltyCardPage/CreateLoyaltyCardPage"; // page for creating/editing cards.
import ToastNotificationContainer from "./components/ToastNotification/ToastNotification"; // for showing pop-up messages.
import styles from "./App.module.css"; // styles specific to this app component.

function App() {
  // 'isMenuOpen' keeps track of whether the sidebar is open or closed.
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  // 'isMobile' checks if the screen width is small (like a mobile phone).
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  // 'toasts' is a list of pop-up messages to show.
  const [toasts, setToasts] = useState([]);

  // this 'useEffect' runs when the component first loads and whenever the window is resized.
  // it helps us know if we're on a mobile-sized screen.
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize); // listen for window resize.
    // cleanup: stop listening when the component is removed.
    return () => window.removeEventListener("resize", handleResize);
  }, []); // empty array means this effect runs once on mount and cleans up on unmount.

  // function to add a new pop-up message (toast).
  const addToast = (toast) => {
    // 'toast' is an object with type, title (optional), and message.
    const id = Date.now() + Math.random(); // create a unique id for the toast.
    // add the new toast to our list of toasts.
    setToasts(prevToasts => [...prevToasts, { ...toast, id }]);
  };

  // function to remove a pop-up message by its id.
  const removeToast = (id) => {
    setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id));
  };

  // we prepare the page components here, passing down necessary props like 'isMenuOpen' and 'addToast'.
  const dashboardElement = <Dashboard isMenuOpen={isMenuOpen} addToast={addToast} />;
  const loyaltyCardsPageElement = <LoyaltyCardsPage isMenuOpen={isMenuOpen} addToast={addToast} />;
  const createLoyaltyCardPageElement = <CreateLoyaltyCardPage isMenuOpen={isMenuOpen} addToast={addToast} />;
  // for editing, we use the same create page component but tell it it's in 'edit mode'.
  const editLoyaltyCardPageElement = <CreateLoyaltyCardPage isMenuOpen={isMenuOpen} isEditMode addToast={addToast} />;


  return (
    // this is the main container for the whole app.
    <div className={styles.appContainer}>
      {/* our sidebar component. */}
      <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      {/* if on mobile and the menu is open, show a dark overlay behind the sidebar. */}
      {isMobile && isMenuOpen && ( 
        <div
          className={`${styles.overlay} ${styles.overlayVisible}`}
          onClick={() => setIsMenuOpen(false)} // clicking overlay closes the menu.
        ></div>
      )}
      {/* 'routes' defines all the different pages (routes) in our app. */}
      <Routes>
        {/* when the url is '/', show the dashboard page. */}
        <Route path="/" element={dashboardElement} />
        {/* when the url is '/loyalty-cards', show the loyalty cards list page. */}
        <Route path="/loyalty-cards" element={loyaltyCardsPageElement} />
        {/* page for creating a new loyalty card. */}
        <Route path="/loyalty-cards/create" element={createLoyaltyCardPageElement} /> 
        {/* page for editing an existing loyalty card (':cardId' is a placeholder for the card's actual id). */}
        <Route path="/loyalty-cards/edit/:cardId" element={editLoyaltyCardPageElement} /> 
        {/* you can add more routes for other pages here. */}
      </Routes>
      {/* this component displays any active pop-up messages (toasts). */}
      <ToastNotificationContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
}

export default App;
