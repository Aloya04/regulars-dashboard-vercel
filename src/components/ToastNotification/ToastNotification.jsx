import { useEffect } from 'react';
import { CheckCircle, XCircle, Info } from 'lucide-react';
import styles from './ToastNotification.module.css';

// an object to easily pick an icon based on the toast type.
const icons = {
  success: <CheckCircle size={28} />,
  error: <XCircle size={28} />,
  info: <Info size={28} />,
};

// this is a single toast message component.
// 'id' is unique, 'type' can be 'success', 'error', 'info'.
// 'title' and 'message' are the text to show.
// 'onClose' is a function to call when the toast should be removed.
const Toast = ({ id, type = 'info', title, message, onClose }) => {
  // this 'useEffect' sets a timer to automatically close the toast after 5 seconds.
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id); // call the onClose function with this toast's id.
    }, 5000); // Auto-dismiss after 5 seconds

    // this is a cleanup function: if the toast is closed early, we clear the timer.
    return () => {
      clearTimeout(timer);
    };
  }, [id, onClose]); // this effect depends on 'id' and 'onClose'.

  return (
    // the main div for the toast. its class changes based on the 'type'.
    // clicking the toast will also close it.
    <div className={`${styles.toast} ${styles[type]}`} onClick={() => onClose(id)}>
      {/* this area holds the icon. */}
      <div className={`${styles.iconArea} ${styles[type]}`}>
        {icons[type]}
      </div>
      {/* this area holds the text content. */}
      <div className={styles.contentArea}>
        {title && <div className={styles.title}>{title}</div>}
        <div className={styles.message}>{message}</div>
      </div>
    </div>
  );
};

// this component is a container that holds all the active toast messages.
// 'toasts' is a list of toast objects.
// 'removeToast' is a function to remove a toast by its id.
const ToastNotificationContainer = ({ toasts, removeToast }) => {
  // if there are no toasts, don't show anything.
  if (!toasts || toasts.length === 0) {
    return null;
  }

  return (
    // the container that positions all the toasts on the screen.
    <div className={styles.toastContainer}>
      {/* loop through the 'toasts' list and create a 'Toast' component for each one. */}
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          id={toast.id}
          type={toast.type}
          title={toast.title}
          message={toast.message}
          onClose={removeToast}
        />
      ))}
    </div>
  );
};

export default ToastNotificationContainer;
