import axios from "axios";

export const getCharacters = async (page) => {
  const result = await axios.get(`/characters?page=${page}`);
  return result.data;
};

export const getCharacterById = async (id) => {
  const result = await axios.get(`/characters/${id}`);
  return result.data;
};

export const getCharactersByQuery = async (pageNumber, name) => {
  const result = await axios.get(
    `/characters/search?page=${pageNumber}&name=${name}`
  );
  return result.data;
};

export const getEpisodes = async (episodesList) => {
  const result = await axios.post(`/episodes`, { episodes: episodesList });
  return result.data;
};
