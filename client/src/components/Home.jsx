import React, { useEffect } from "react";
import { useState } from "react";
import { getCharacters } from "../utils";
import { getCharactersByQuery } from "../utils";
import { getEpisodes } from "../utils";
import styles from "./Home.module.css";
import ReactPaginate from "react-paginate";
import { Link, Outlet, useLocation } from "react-router-dom";
import PagesContext from "../context/PagesContext";
import CharactersContext from "../context/CharactersContext";
import EpisodesContext from "../context/EpisodesContext";
import { useContext } from "react";
import Table from "./Table/Table";
import searchIcon from "../assets/magnifyingglass.png";

function Home() {
  const [searchName, setSearchName] = useState("");

  const { pageNumber, setPageNumber } = useContext(PagesContext);
  const { characters, setCharacters } = useContext(CharactersContext);
  const { episodes, setEpisodes } = useContext(EpisodesContext);
  useEffect(() => {
    if (!characters.info) {
      getCharacters(pageNumber).then((data) => {
        setCharacters(data);
        const urls = data.results.map((c) => c.episode);
        getEpisodes(urls).then((data) => setEpisodes(data));

        console.log(episodes, "ep es");
      });
      console.log(characters);
    }
  }, []);
  const changePage = (data) => {
    console.log(data.selected + 1, "page es");
    console.log(episodes, "episodes es");
    setPageNumber(data.selected + 1);
    // setPage(data.selected + 1);
    characters.isQuery
      ? getCharactersByQuery(data.selected + 1, searchName).then((data) =>
          setCharacters(data)
        )
      : getCharacters(data.selected + 1).then((data) => setCharacters(data));
    console.log(characters, "char es");
  };
  const handleSubmit = (e, name) => {
    e.preventDefault();
    getCharactersByQuery(pageNumber, name).then((data) => setCharacters(data));
    setPageNumber(1);
  };
  const handleChange = (e) => {
    e.preventDefault();
    setSearchName(e.target.value);
  };
  const handleReset = (e) => {
    e.preventDefault();
    setSearchName("");
    setPageNumber(1);
    getCharacters(pageNumber).then((data) => setCharacters(data));
  };
  return (
    <div>
      {characters.results && episodes.length > 1 ? (
        <div>
          <h3 className={styles.title}>Rick and Morty characters</h3>
          <div className={styles.inputContainer}>
            <button
              className={styles.btnSearch}
              type="submit"
              onClick={(e) => handleSubmit(e, searchName)}
            >
              <img src={searchIcon} alt="" />
            </button>
            <input
              className={styles.inputSearch}
              type="text"
              placeholder="Search Character"
              onChange={(e) => handleChange(e)}
              value={searchName}
            />

            {/* <button onClick={(e) => handleReset(e)}>Reset search</button> */}
          </div>
          {characters.results && (
            <Table data={characters.results} episodes={episodes}></Table>
          )}
          <ReactPaginate
            breakLabel="..."
            nextLabel=">>"
            onPageChange={changePage}
            pageRangeDisplayed={5}
            pageCount={characters.info.pages}
            containerClassName={styles.paginationContainer}
            pageClassName={styles.page}
            breakLinkClassName={styles.breakLink}
            pageLinkClassName={styles.pageLink}
            previousLinkClassName={styles.prevLink}
            nextLinkClassName={styles.nextLink}
            activeClassName={styles.active}
            previousLabel="<<"
            renderOnZeroPageCount={null}
            forcePage={pageNumber - 1}
          />
        </div>
      ) : (
        <h4>...Loading</h4>
      )}
    </div>
  );
}

export default Home;
