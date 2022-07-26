import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "../Modal/Modal.module.css";

export const Modal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className={styles.modalDiv} onClick={() => navigate(-1)}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h3>Modal</h3>
        {location.state.episodes.map((e) => {
          return <p>{e}</p>;
        })}
        <button onClick={() => navigate(-1)}>Close</button>
      </div>
    </div>
  );
};
