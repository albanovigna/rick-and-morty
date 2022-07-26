import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import styles from "../EpisodesModal/EpisodesModal.module.css";
import CharactersContext from "../../context/CharactersContext";
import { useContext } from "react";

function EpisodesModal({ show, onClose, episodes }) {
  const location = useLocation();
  const { characters, setCharacters } = useContext(CharactersContext);
  const closeOnEscapeKeyDown = (e) => {
    if ((e.charCode || e.keyCode) === 27) {
      onClose();
    }
  };
  useEffect(() => {
    console.log(episodes, "episodes es");
    document.body.addEventListener("keydown", closeOnEscapeKeyDown);

    return () => {
      document.body.removeEventListener("keydown", closeOnEscapeKeyDown);
    };
  }, []);
  if (!show) {
    return null;
  }
  return (
    <div className={styles.modal} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h4 className={styles.modalTitle}>Modal title</h4>
        </div>
        <div className={styles.modalBody}>
          Modal content
          {episodes.map((e) => (
            <p>{e}</p>
          ))}
        </div>
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
