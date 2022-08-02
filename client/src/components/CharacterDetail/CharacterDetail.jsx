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
          <div>
            <img src={characterDetail.image} alt="character image" />
            <h4>Name: {characterDetail.name}</h4>
            <h4>Status: {characterDetail.status}</h4>
            <h4>Species: {characterDetail.species}</h4>
            <h4>
              Type:{" "}
              {characterDetail.type !== "" ? characterDetail.type : "None"}
            </h4>
            <h4>Gender: {characterDetail.gender}</h4>
            <h4>Origin: {characterDetail.origin.name}</h4>
            <h4>Location name: {characterDetail.location.name}</h4>
          </div>
        ) : (
          <h4>...Loading</h4>
        )}
      </div>
    </div>
  );
}

export default CharacterDetail;
