import React, { useEffect, useRef } from 'react';
import styles from './NotificationModal.module.css';
import { Bell as BellIcon } from 'lucide-react'; // Renamed to avoid conflict

// Sample notifications data matching the image
const notifications = [
  {
    id: 1,
    text: 'Steffen is the most loyal member! Send a push notification to reward her!',
    isNew: true,
  },
  {
    id: 2,
    text: 'Your weekly recap is ready: Check out your analytics',
    isNew: false,
  },
  // Add more notifications as needed
];

function NotificationModal({ onClose }) {
  const modalRef = useRef(null);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className={styles.modalDropdown} ref={modalRef}>
      <h2>Notifications</h2>
      <div className={styles.notificationList}>
        {notifications.map((notification) => (
          <div key={notification.id} className={styles.notificationItem}>
            <div className={styles.notificationIconWrapper}>
              <BellIcon size={20} className={styles.notificationBellIcon} />
              {notification.isNew && <div className={styles.newIndicator}></div>}
            </div>
            <p>{notification.text}</p>
          </div>
        ))}
        {notifications.length === 0 && (
          <p className={styles.noNotifications}>No new notifications.</p>
        )}
      </div>
    </div>
  );
}

export default NotificationModal;
