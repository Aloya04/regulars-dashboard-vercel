import React from 'react';
import styles from './ToggleSwitch.module.css';

const ToggleSwitch = ({ id, checked, onChange, label }) => {
  return (
    <div className={styles.toggleSwitchContainer}>
      <input
        type="checkbox"
        className={styles.toggleSwitchCheckbox}
        id={id}
        checked={checked}
        onChange={onChange}
      />
      <label className={styles.toggleSwitchLabel} htmlFor={id}>
        <span className={styles.toggleSwitchInner} />
        <span className={styles.toggleSwitchSwitch} />
      </label>
      {label && <span className={styles.labelText}>{label}</span>}
    </div>
  );
};

export default ToggleSwitch;
