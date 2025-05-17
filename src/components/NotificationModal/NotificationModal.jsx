import { useEffect, useRef } from 'react';
import { Bell as BellIcon } from 'lucide-react'; 
import styles from './NotificationModal.module.css';

// some sample notification data. Normally, this would be in the firebase, but for the sake of this prototype, we are hardcoding it.
const notificationsData = [
  { id: 1, text: 'Steffen is the most loyal member! Send a push notification to reward her!', unread: true },
  { id: 2, text: 'Your weekly recap is ready: Check out your analytics', unread: false },
];

// 'onClose' is a function passed from the parent to tell this modal to close.
const NotificationModal = ({ onClose }) => {
  // 'modalRef' gives us a way to directly access the modal's main div element.
  const modalRef = useRef();

  // this 'useEffect' handles closing the modal if you click outside of it.
  useEffect(() => {
    const handleClickOutside = (event) => {
      // if the click is outside the modal content...
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose(); // ...call the onClose function.
      }
    };
    // start listening for clicks when the modal is shown.
    document.addEventListener('mousedown', handleClickOutside);
    // stop listening when the modal is hidden or removed.
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]); // this effect depends on the 'onClose' function.

  return (
    // this is the semi-transparent background.
    <div className={styles.modalOverlay}>
      {/* this is the main content box of the modal. */}
      <div className={styles.modalContent} ref={modalRef}>
        <div className={styles.modalHeader}>
          <h2>Notifications</h2>
          {/* an internal close button was previously here but removed for simplicity. */}
        </div>
        {/* this list will hold all our notification items. */}
        <ul className={styles.notificationList}>
          {notificationsData.length > 0 ? (
            // if there are notifications, we loop through them and create an item for each.
            notificationsData.map(notification => (
              <li key={notification.id} className={styles.notificationItem}>
                <div className={styles.iconContainer}>
                  <BellIcon size={24} />
                  {/* if a notification is unread, show a red dot. */}
                  {notification.unread && <span className={styles.redDot}></span>}
                </div>
                <p className={styles.notificationText}>{notification.text}</p>
              </li>
            ))
          ) : (
            // if there are no notifications, show a message.
            <p className={styles.noNotifications}>No new notifications.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default NotificationModal;
