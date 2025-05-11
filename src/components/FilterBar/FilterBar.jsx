import React from "react";
import { ChevronDown } from "lucide-react";
import styles from "./FilterBar.module.css";

function FilterBar() {
  return (
    <div className={styles.filterBar}>
      <button>Day</button>
      <button>Week</button>
      <button className={styles.active}>Month</button>
      <button>Year</button>
      <button>All time</button>
      <button className={styles.periodButton}>
        Choose period
        <ChevronDown size={16} />
      </button>
    </div>
  );
}

export default FilterBar;
