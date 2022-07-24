import React, { useEffect } from "react";
import styles from "../EpisodesModal/EpisodesModal.module.css";

function EpisodesModal({ show, onClose }) {
  if (!show) {
    return null;
  }
  const closeOnEscapeKeyDown = (e) => {
    if ((e.charCode || e.keyCode) === 27) {
      onClose();
    }
  };
  useEffect(() => {
    document.body.addEventListener("keydown", closeOnEscapeKeyDown);

    return () => {
      document.body.removeEventListener("keydown", closeOnEscapeKeyDown);
    };
  }, []);

  return (
    <div className={styles.modal} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h4 className={styles.modalTitle}>Modal title</h4>
        </div>
        <div className={styles.modalBody}>Modal content</div>
        <div className={styles.modalFooter}>
          <button onClick={onClose} className={styles.btn}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default EpisodesModal;
