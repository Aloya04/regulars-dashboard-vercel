import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Dashboard from "./components/Dashboard/Dashboard";
import styles from "./App.module.css";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(true); // true = menu open, false = menu closed
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={styles.appContainer}>
      <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      {isMobile && (
        <div
          className={`${styles.overlay} ${isMenuOpen ? styles.overlayVisible : ""}`}
          onClick={() => setIsMenuOpen(false)} // Close menu when overlay is clicked
        ></div>
      )}
      <Dashboard isMenuOpen={isMenuOpen} />
    </div>
  );
}

export default App;
