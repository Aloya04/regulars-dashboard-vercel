import React from "react";
import { Bell } from "lucide-react";
import BentoGrid from "../BentoGrid/BentoGrid";
import FilterBar from "../FilterBar/FilterBar";
import styles from "./Dashboard.module.css";

function Dashboard({ isCollapsed }) {
  return (
    <main
      className={`${styles.dashboard} ${isCollapsed ? styles.collapsed : ""}`}
    >
      <div className={styles.header}>
        <h1>Overview</h1>
        <button className={styles.notificationBtn}>
          <Bell />
        </button>
      </div>
      <FilterBar />
      <BentoGrid />
    </main>
  );
}

export default Dashboard;
