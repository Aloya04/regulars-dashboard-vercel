import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Dashboard from "./components/Dashboard/Dashboard";
import styles from "./App.module.css";

function App() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={styles.appContainer}>
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      {isMobile && !isCollapsed && (
        <div
          className={styles.overlay}
          onClick={() => setIsCollapsed(true)}
        ></div>
      )}
      <Dashboard isCollapsed={isCollapsed} />
    </div>
  );
}

export default App;
