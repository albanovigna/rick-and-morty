import React, { useEffect } from "react";
import { getCharacterById } from "../utils";
import { useParams } from "react-router-dom";
import { useState } from "react";

function CharacterDetail() {
  const { id } = useParams();
  const [characterDetail, setCharacterDetail] = useState({});
  useEffect(() => {
    getCharacterById(id).then((data) => setCharacterDetail(data));
    return () => {
      setCharacterDetail({});
    };
  }, []);

  return (
    <div>
      {characterDetail.name ? (
        <div>
          <img src={characterDetail.image} alt="character image" />
          <h4>Name: {characterDetail.name}</h4>
          <h4>Status: {characterDetail.status}</h4>
          <h4>Air Date: {characterDetail.species}</h4>
          <h4>
            Type: {characterDetail.type !== "" ? characterDetail.type : "None"}
          </h4>
          <h4>Gender: {characterDetail.gender}</h4>
          <h4>Origin: {characterDetail.origin.name}</h4>
          <h4>Location name: {characterDetail.location.name}</h4>
        </div>
      ) : (
        <h4>...Loading</h4>
      )}
    </div>
  );
}

export default CharacterDetail;
