import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom"; // Import Routes and Route
import Sidebar from "./components/Sidebar/Sidebar";
import Dashboard from "./components/Dashboard/Dashboard";
import LoyaltyCardsPage from "./pages/LoyaltyCardsPage/LoyaltyCardsPage"; // Import the new page
import styles from "./App.module.css";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={styles.appContainer}>
      <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      {isMobile && isMenuOpen && ( // Show overlay only if menu is open on mobile
        <div
          className={`${styles.overlay} ${styles.overlayVisible}`}
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}
      <Routes>
        <Route path="/" element={<Dashboard isMenuOpen={isMenuOpen} />} />
        <Route path="/loyalty-cards" element={<LoyaltyCardsPage isMenuOpen={isMenuOpen} />} />
        {/* Add other routes here */}
      </Routes>
    </div>
  );
}

export default App;
