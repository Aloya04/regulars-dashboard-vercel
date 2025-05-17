
import  { useEffect, useRef } from 'react';
import styles from './ConfirmationModal.module.css';

// this is our confirmationmodal component.
// it takes a few inputs (props) to customize its behavior and appearance.
const ConfirmationModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message, // an optional extra message or description.
  confirmButtonText = "Confirm", 
  cancelButtonText = "Cancel" 
}) => {
  // useref helps us get a direct reference to the modal's main div in 
  const modalRef = useRef();

  
  //  for closing the modal if the user clicks outside of it.
  useEffect(() => {
    // this function checks if the click was outside the modal.
    const handleClickOutside = (event) => {
      // if the modal exists and the click was not inside it...
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose(); // ...then call the onclose function.
      }
    };
    // if the modal is open, we start listening for mouse clicks on the whole document.
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    // this is a cleanup function: when the modal closes or unmounts, we stop listening for clicks.
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]); // this effect re-runs if 'isopen' or 'onclose' changes.

  // if the modal isn't supposed to be open, we just show nothing (null).
  if (!isOpen) {
    return null;
  }

  // this is what the modal looks like in html (jsx).
  return (
    // the semi-transparent background for the modal.
    <div className={styles.modalOverlay}>
      {/* the actual content box of the modal. */}
      <div className={styles.modalContent} ref={modalRef}>
        {/* this section holds the title and message. */}
        <div className={styles.modalBody}>
          {/* if there's a title, we show it. */}
          {title && <p className={styles.title}>{title}</p>}
          {/* if there's a message, we show it. */}
          {message && <p className={styles.message}>{message}</p>}
        </div>
        {/* this section holds the action buttons (like confirm and cancel). */}
        <div className={styles.modalActions}>
          {/* the cancel button. */}
          <button onClick={onClose} className={`${styles.modalButton} ${styles.cancelButton}`}>
            {cancelButtonText}
          </button>
          {/* the confirm button. */}
          <button onClick={onConfirm} className={`${styles.modalButton} ${styles.confirmButton}`}>
            {confirmButtonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
