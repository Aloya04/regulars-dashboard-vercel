import React, { useEffect, useRef } from 'react';
import { Bell as BellIcon, X } from 'lucide-react'; // Assuming X for a close button, optional
import styles from './NotificationModal.module.css';

const notificationsData = [
  { id: 1, text: 'Steffen is the most loyal member! Send a push notification to reward her!', unread: true },
  { id: 2, text: 'Your weekly recap is ready: Check out your analytics', unread: false },
  // Add more notifications as needed
];

const NotificationModal = ({ onClose }) => {
  const modalRef = useRef();

  // Handle click outside to close
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
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent} ref={modalRef}>
        <div className={styles.modalHeader}>
          <h2>Notifications</h2>
          {/* Optional: Close button inside the modal */}
          {/* <button onClick={onClose} className={styles.closeButtonInternal}>
            <X size={20} />
          </button> */}
        </div>
        <ul className={styles.notificationList}>
          {notificationsData.length > 0 ? (
            notificationsData.map(notification => (
              <li key={notification.id} className={styles.notificationItem}>
                <div className={styles.iconContainer}>
                  <BellIcon size={24} />
                  {notification.unread && <span className={styles.redDot}></span>}
                </div>
                <p className={styles.notificationText}>{notification.text}</p>
              </li>
            ))
          ) : (
            <p className={styles.noNotifications}>No new notifications.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default NotificationModal;
