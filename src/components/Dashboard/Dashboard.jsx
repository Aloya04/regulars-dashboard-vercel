import React, { useState, useEffect } from "react";
import { Bell } from "lucide-react";
import BentoGrid from "../BentoGrid/BentoGrid";
import FilterBar from "../FilterBar/FilterBar";
import NotificationModal from "../NotificationModal/NotificationModal";
import styles from "./Dashboard.module.css";
import { getDashboardDataByFilter } from "../../services/userService";

function Dashboard({ isMenuOpen }) {
  const [activeFilter, setActiveFilter] = useState("30days"); // tracks the current time filter
  const [currentBentoData, setCurrentBentoData] = useState(null); // data for the bento grid
  const [isLoading, setIsLoading] = useState(true); // loading state for data fetching
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false); // notification modal visibility

  useEffect(() => {
    document.title = "Overview - Regulars Dashboard";
  }, []);

  // fetches data when 'activeFilter' changes
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      // simplified data fetching: directly await and set data
      const data = await getDashboardDataByFilter(activeFilter);
      setCurrentBentoData(data);
      setIsLoading(false);
    };

    fetchData();

    return () => {
      // cleanup for the effect, if needed in the future
    };
  }, [activeFilter]);

  const handleFilterChange = (newFilter) => {
    setActiveFilter(newFilter);
  };

  const toggleNotificationModal = () => {
    setIsNotificationModalOpen(!isNotificationModalOpen);
  };

  const handleNotificationButtonMouseDown = (e) => {
    e.stopPropagation();
  };

  return (
    <main
      className={`${styles.dashboard} ${!isMenuOpen ? styles.menuClosed : ""}`}
      role="main"
      aria-labelledby="dashboard-heading"
    >
      <div className={styles.stickyHeaderArea}>
        <div className={styles.header}>
          <h1 id="dashboard-heading">Overview</h1>
          <div className={styles.notificationButtonWrapper}>
            <button
              className={styles.notificationBtn}
              onClick={toggleNotificationModal}
              onMouseDown={handleNotificationButtonMouseDown}
              aria-label="View notifications"
              aria-haspopup="true"
              aria-expanded={isNotificationModalOpen}
            >
              <Bell aria-hidden="true" />
            </button>
            {isNotificationModalOpen && <NotificationModal onClose={() => setIsNotificationModalOpen(false)} />}
          </div>
        </div>
        <FilterBar
          currentActiveFilter={activeFilter}
          onFilterSelect={handleFilterChange}
        />
      </div>
     
      {/* content area with transition */}
      <div 
        className={`${styles.contentTransitionWrapper} ${!isLoading && currentBentoData ? styles.contentVisible : ""}`}
        aria-live="polite"
      >
        {/* show bento grid if not loading and data exists */}
        {!isLoading && currentBentoData && <BentoGrid bentoData={currentBentoData} />}
      </div>
      
      {/* message for no data, shown if not loading and no data is present */}
      {!isLoading && !currentBentoData && (
         <div className={styles.messageContainer} role="status">
           <p>No data available for this filter.</p>
         </div>
      )}
    </main>
  );
}

export default Dashboard;
