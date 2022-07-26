import React, { useEffect } from "react";
import { useState } from "react";
import { getCharacters } from "../utils";
import { getCharactersByQuery } from "../utils";
import styles from "./Home.module.css";
import ReactPaginate from "react-paginate";
import { Link, Outlet, useLocation } from "react-router-dom";
import PagesContext from "../context/PagesContext";
import CharactersContext from "../context/CharactersContext";
import { useContext } from "react";
import EpisodesModal from "./EpisodesModal/EpisodesModal";

function Home() {
  // const [page, setPage] = useState(1);
  // const [characters, setCharacters] = useState({});
  const location = useLocation();
  const [searchName, setSearchName] = useState("");
  const [show, setShow] = useState(false);
  const { pageNumber, setPageNumber } = useContext(PagesContext);
  const { characters, setCharacters } = useContext(CharactersContext);
  useEffect(() => {
    if (!characters.info) {
      getCharacters(pageNumber).then((data) => setCharacters(data));
    }
  }, []);
  const changePage = (data) => {
    console.log(data.selected + 1, "page es");
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
      {characters.results ? (
        <div>
          <h3>Rick and Morty characters</h3>
          <div>
            <input
              type="text"
              onChange={(e) => handleChange(e)}
              value={searchName}
            />
            <button type="submit" onClick={(e) => handleSubmit(e, searchName)}>
              Submit
            </button>
            <button onClick={(e) => handleReset(e)}>Reset search</button>
          </div>
          {characters.results &&
            characters.results.map((c, i) => {
              return (
                <div key={c.id} className={styles.row}>
                  <h4>{c.name}</h4>
                  <h4>{c.status}</h4>
                  <h4>{c.species}</h4>
                  <h4>{c.gender}</h4>
                  {/* <h4>Episodes list</h4> */}
                  <div>
                    <Link
                      // onClick={() => setShow(true)}
                      // to={`/episodes`}
                      to="episodes"
                      state={{ background: location, episodes: c.episode }}
                    >
                      {" "}
                      <h5>Episodes list</h5>
                    </Link>
                    <Outlet />
                  </div>
                  {/* <button onClick={() => setShow(true)}>Episodes List</button>
                  <EpisodesModal
                    onClose={() => setShow(false)}
                    show={show}
                    episodes={c.episode}
                  /> */}
                  <Link to={`/character/${c.id}`}>
                    {" "}
                    <h5>Detail</h5>
                  </Link>
                </div>
              );
            })}
          <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={changePage}
            pageRangeDisplayed={5}
            pageCount={characters.info.pages}
            activeClassName={styles.active}
            previousLabel="< previous"
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
