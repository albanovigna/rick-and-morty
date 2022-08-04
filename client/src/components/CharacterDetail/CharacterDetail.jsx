import React, { useEffect } from "react";
import { getCharacterById } from "../../utils";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import styles from "../CharacterDetail/CharacterDetail.module.css";

function CharacterDetail() {
  const { id } = useParams();
  const [characterDetail, setCharacterDetail] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    getCharacterById(id).then((data) => setCharacterDetail(data));
    document.body.style.overflow = "hidden";
    return () => {
      setCharacterDetail({});
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className={styles.container} onClick={() => navigate(-1)}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {characterDetail.name ? (
          <div className={styles.infoContainer}>
            <img
              className={styles.characterImage}
              src={characterDetail.image}
              alt="character image"
            />
            <div className={styles.details}>
              <div className={styles.sectionInfo}>
                <h4>Name</h4>
                <div className={styles.dataContainer}>
                  <h3>{characterDetail.name}</h3>
                </div>
              </div>
              <div className={styles.sectionInfo}>
                <h4>Status</h4>
                <div className={styles.dataContainer}>
                  <h3>{characterDetail.status}</h3>
                </div>
              </div>
              <div className={styles.sectionInfo}>
                <h4>Type</h4>
                <div className={styles.dataContainer}>
                  <h3>
                    {characterDetail.type !== ""
                      ? characterDetail.type
                      : "None"}
                  </h3>
                </div>
              </div>
              <div className={styles.sectionInfo}>
                <h4>Gender</h4>
                <div className={styles.dataContainer}>
                  <h3>{characterDetail.gender}</h3>
                </div>
              </div>
              <div className={styles.sectionInfo}>
                <h4>Origin</h4>
                <div className={styles.dataContainer}>
                  <h3>{characterDetail.origin.name}</h3>
                </div>
              </div>
              <div className={styles.sectionInfo}>
                <h4>Location</h4>
                <div className={styles.dataContainer}>
                  <h3>{characterDetail.location.name}</h3>
                </div>
              </div>
            </div>
            <button className={styles.customBtn} onClick={() => navigate(-1)}>
              Close
            </button>
          </div>
        ) : (
          <h4>...Loading</h4>
        )}
      </div>
    </div>
  );
}

export default CharacterDetail;
