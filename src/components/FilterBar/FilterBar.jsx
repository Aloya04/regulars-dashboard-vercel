import styles from './FilterBar.module.css'; 
import { ChevronDown } from 'lucide-react'; 

// this is the main function for our filterbar.
// 'currentActiveFilter' tells us which filter button is currently selected.
// 'onFilterSelect' is a function we call when a button is clicked.
function FilterBar({ currentActiveFilter, onFilterSelect }) {

  // each filter is an object with an id, a label (text for the button), and sometimes an icon.
  const filters = [
    { id: 'today', label: 'Today' },
    { id: '7days', label: 'Last 7 Days' },
    { id: '30days', label: 'Month' },
    { id: 'thisMonth', label: 'Year' }, // note: mishap from firebase, but let's keep it as it is as it works and doesn't obstruct anything.
    { id: 'allTime', label: 'All Time' },
    { id: 'customPeriod', label: 'Choose Period', icon: <ChevronDown size={16} /> },
  ];


  return (
  
    <div className={styles.filterBar} role="toolbar" aria-label="Data period filters">
      {/* we loop through our 'filters' list and create a button for each one. */}
      {filters.map(filter => (
        <button
          key={filter.id} // react needs a unique 'key' for each item in a list.
          // the class name changes if the button is active or has an icon.
          className={`${currentActiveFilter === filter.id ? styles.active : ''} ${filter.icon ? styles.hasIcon : ''}`}
          onClick={() => onFilterSelect(filter.id)} // when clicked, call the 'onFilterSelect' function with this filter's id.
          aria-pressed={currentActiveFilter === filter.id} // for accessibility, tells if the button is "pressed" (active).
          aria-label={`Filter data by ${filter.label}`} // a clear label for screen readers.
        >
          {filter.label} {/* the text on the button. */}
          {/* if the filter has an icon, we show it here. */}
          {filter.icon && <span className={styles.iconWrapper} aria-hidden="true">{filter.icon}</span>}
        </button>
      ))}
    </div>
  );
}

export default FilterBar;
