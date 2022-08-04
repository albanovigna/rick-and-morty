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
        <div className={styles.modalBody}>
          <table className={styles.table}>
            <tr>
              <th>Season and Episode</th>
              <th>Name</th>
              <th>Air date</th>
            </tr>
            {location.state.episodes.map((e) => {
              return (
                <tr>
                  <td>{e.episode}</td>
                  <td>{e.name}</td>
                  <td>{e.air_date}</td>
                </tr>
              );
            })}
          </table>
        </div>
        <button className={styles.customBtn} onClick={() => navigate(-1)}>
          Close
        </button>
      </div>
    </div>
  );
};
