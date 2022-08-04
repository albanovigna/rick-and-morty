import React, { useEffect } from "react";
import { useState } from "react";
import { getCharacters } from "../../utils";
import { getCharactersByQuery } from "../../utils";
import { getEpisodes } from "../../utils";
import styles from "./Home.module.css";
import ReactPaginate from "react-paginate";
import PagesContext from "../../context/PagesContext";
import CharactersContext from "../../context/CharactersContext";
import EpisodesContext from "../../context/EpisodesContext";
import { useContext } from "react";
import Table from "../Table/Table";
import searchIcon from "../../assets/magnifyingglass.png";
import siriusImage from "../../assets/logo_alta_ 1 1.png";
import { Oval } from "react-loader-spinner";

function Home() {
  const [searchName, setSearchName] = useState("");
  const [sendData, setSendData] = useState(false);
  const { pageNumber, setPageNumber } = useContext(PagesContext);
  const { characters, setCharacters } = useContext(CharactersContext);
  const { episodes, setEpisodes } = useContext(EpisodesContext);
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSubmit(event, searchName);
    }
  };
  useEffect(() => {
    if (!characters.info && !characters.msg) {
      getCharacters(pageNumber).then((data) => {
        setCharacters(data);
        const urls = data.results.map((c) => c.episode);
        getEpisodes(urls).then((data) => setEpisodes(data));
      });
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);
  const changePage = (data) => {
    setSendData(true);
    setPageNumber(data.selected + 1);
    characters.isQuery
      ? getCharactersByQuery(data.selected + 1, searchName).then((data) => {
          setCharacters(data);
          setSendData(false);
        })
      : getCharacters(data.selected + 1).then((data) => {
          setCharacters(data);
          setSendData(false);
        });
  };
  const handleSubmit = (e, name) => {
    e.preventDefault();
    setSendData(true);
    getCharactersByQuery(pageNumber, name).then((data) => {
      setCharacters(data);

      setSendData(false);
    });
    setPageNumber(1);
  };
  const handleChange = (e) => {
    e.preventDefault();
    setSearchName(e.target.value);
  };

  return (
    <div>
      {(characters.results && episodes.length > 1) || characters.msg ? (
        <div>
          <div className={styles.wrapper}>
            <div className={styles.title}>
              <h3>Rick and Morty characters</h3>
            </div>
            <div className={styles.logo}>
              <img src={siriusImage} alt="" />
            </div>
          </div>

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
          </div>
          {characters.results && !sendData ? (
            <Table data={characters.results} episodes={episodes}></Table>
          ) : characters.msg ? (
            <h3>Characters not found</h3>
          ) : (
            <div className={styles.loaderDiv}>
              <Oval
                ariaLabel="loading-indicator"
                height={100}
                width={100}
                strokeWidth={5}
                color="blue"
                secondaryColor="white"
              />
            </div>
          )}
          {characters.results && episodes.length > 1 && (
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
          )}
        </div>
      ) : (
        <div className={styles.loaderDiv}>
          <Oval
            ariaLabel="loading-indicator"
            height={100}
            width={100}
            strokeWidth={5}
            color="blue"
            secondaryColor="white"
          />
        </div>
      )}
    </div>
  );
}

export default Home;
