import React from 'react';
import styles from './FilterBar.module.css'; // Adjust path as needed
import { ChevronDown } from 'lucide-react'; // Import ChevronDown

// Assuming onFilterSelect is the prop passed from Dashboard (handleFilterChange)
// And currentActiveFilter is the prop to highlight the active button
function FilterBar({ currentActiveFilter, onFilterSelect }) {
  const filters = [
    { id: 'today', label: 'Today' },
    { id: '7days', label: 'Last 7 Days' },
    { id: '30days', label: 'Last 30 Days' },
    { id: 'thisMonth', label: 'This Month' },
    { id: 'allTime', label: 'All Time' },
    { id: 'customPeriod', label: 'Choose Period', icon: <ChevronDown size={16} /> },
  ];

  return (
    <div className={styles.filterBar}>
      {filters.map(filter => (
        <button
          key={filter.id}
          className={`${currentActiveFilter === filter.id ? styles.active : ''} ${filter.icon ? styles.hasIcon : ''}`}
          onClick={() => onFilterSelect(filter.id)}
        >
          {filter.label}
          {filter.icon && <span className={styles.iconWrapper}>{filter.icon}</span>}
        </button>
      ))}
    </div>
  );
}

export default FilterBar;
