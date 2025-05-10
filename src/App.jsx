import React, { useState } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Dashboard from "./components/Dashboard/Dashboard";
import styles from "./App.module.css";

function App() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={styles.appContainer}>
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <Dashboard isCollapsed={isCollapsed} />
    </div>
  );
}

export default App;
