import React, { useState, useEffect } from "react";
import { Bell } from "lucide-react";
import BentoGrid from "../BentoGrid/BentoGrid";
import FilterBar from "../FilterBar/FilterBar";
import NotificationModal from "../NotificationModal/NotificationModal"; // Import the modal
import styles from "./Dashboard.module.css";
import {
  mockData7Days,
  mockData30Days,
  mockDataToday,
  mockDataThisMonth,
  mockDataAllTime,
  mockDataCustomPeriod, // Import new mock data
} from "./mockData";

function Dashboard({ isMenuOpen }) {
  const [activeFilter, setActiveFilter] = useState("30days"); // Default to '30days' (Month)
  const [currentBentoData, setCurrentBentoData] = useState(mockData30Days); // Initialize with 30days data
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false); // State for modal

  useEffect(() => {
    document.title = "Overview - Regulars Dashboard";
  }, []);

  useEffect(() => {
    console.log(`Filter changed to: ${activeFilter}. Updating data...`);
    if (activeFilter === "today") {
      setCurrentBentoData(mockDataToday);
    } else if (activeFilter === "7days") {
      setCurrentBentoData(mockData7Days);
    } else if (activeFilter === "30days") {
      setCurrentBentoData(mockData30Days);
    } else if (activeFilter === "thisMonth") {
      setCurrentBentoData(mockDataThisMonth);
    } else if (activeFilter === "allTime") {
      setCurrentBentoData(mockDataAllTime);
    } else if (activeFilter === "customPeriod") { // Handle custom period
      setCurrentBentoData(mockDataCustomPeriod);
    }
  }, [activeFilter]);

  const handleFilterChange = (newFilter) => {
    setActiveFilter(newFilter);
  };

  const toggleNotificationModal = () => {
    setIsNotificationModalOpen(!isNotificationModalOpen);
  };

  // Prevent mousedown on button from triggering modal's click-outside-to-close
  const handleNotificationButtonMouseDown = (e) => {
    e.stopPropagation();
  };

  return (
    <main
      className={`${styles.dashboard} ${!isMenuOpen ? styles.menuClosed : ""}`}
    >
      <div className={styles.stickyHeaderArea}>
        <div className={styles.header}>
          <h1>Overview</h1>
          <div className={styles.notificationButtonWrapper}> {/* Added wrapper */}
            <button
              className={styles.notificationBtn}
              onClick={toggleNotificationModal}
              onMouseDown={handleNotificationButtonMouseDown} // Added this line
            >
              <Bell />
            </button>
            {isNotificationModalOpen && <NotificationModal onClose={() => setIsNotificationModalOpen(false)} />}
          </div>
        </div>
        <FilterBar
          currentActiveFilter={activeFilter}
          onFilterSelect={handleFilterChange}
        />
      </div>
      <BentoGrid bentoData={currentBentoData} />
    </main>
  );
}

export default Dashboard;
