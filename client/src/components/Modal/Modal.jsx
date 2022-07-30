import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "../Modal/Modal.module.css";

export const Modal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    console.log(location.state);
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className={styles.modalDiv} onClick={() => navigate(-1)}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <h3>Season and Episode</h3>
          <h3>Name</h3>
          <h3>Air date</h3>
        </div>

        {location.state.episodes.map((e) => {
          return (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <h3>{e.episode}</h3>
              <h3>{e.name}</h3>
              <h3>{e.air_date}</h3>
            </div>
          );
        })}
        <button onClick={() => navigate(-1)}>Close</button>
      </div>
    </div>
  );
};
