import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom"; // Import Routes and Route
import Sidebar from "./components/Sidebar/Sidebar";
import Dashboard from "./components/Dashboard/Dashboard";
import LoyaltyCardsPage from "./pages/LoyaltyCardsPage/LoyaltyCardsPage"; // Import the new page
import SettingsPage from "./pages/SettingsPage/SettingsPage"; // Import the new SettingsPage
import AppearanceSettingsPage from "./pages/AppearanceSettingsPage/AppearanceSettingsPage"; // Import AppearanceSettingsPage
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
        <Route path="/settings" element={<SettingsPage isMenuOpen={isMenuOpen} />} /> {/* Add Settings route */}
        <Route path="/settings/appearance" element={<AppearanceSettingsPage isMenuOpen={isMenuOpen} />} /> {/* Add Appearance Settings route */}
        {/* Add other routes here */}
      </Routes>
    </div>
  );
}

export default App;
