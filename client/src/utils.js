import axios from "axios";

export const getCharacters = async (page) => {
  const result = await axios.get(`/characters?page=${page}`);
  return result.data;
};

export const getCharacterById = async (id) => {
  const result = await axios.get(`/characters/${id}`);
  return result.data;
};

export const getCharactersByQuery = async (name) => {
  const result = await axios.get(`/characters/search?name=${name}`);
  return result.data;
};
