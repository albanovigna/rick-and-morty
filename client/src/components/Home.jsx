import React, { useEffect } from "react";
import { useState } from "react";
import { getCharacters } from "../utils";
import { getCharactersByQuery } from "../utils";
import styles from "./Home.module.css";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";

function Home() {
  const [page, setPage] = useState(1);
  const [characters, setCharacters] = useState({});
  const [searchName, setSearchName] = useState("");
  useEffect(() => {
    getCharacters(page).then((data) => setCharacters(data));
  }, []);
  const changePage = (data) => {
    console.log(data, "data es");
    setPage(data.selected + 1);
    getCharacters(data.selected + 1).then((data) => setCharacters(data));
  };
  const handleSubmit = (e, name) => {
    e.preventDefault();
    getCharactersByQuery(name).then((data) => setCharacters(data));
  };
  const handleChange = (e) => {
    e.preventDefault();
    setSearchName(e.target.value);
    console.log(searchName, "searchName es");
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
          </div>
          {characters.results &&
            characters.results.map((c) => {
              return (
                <div key={c.id} className={styles.row}>
                  <h4>{c.name}</h4>
                  <h4>{c.status}</h4>
                  <h4>{c.species}</h4>
                  <h4>{c.gender}</h4>
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
          />
        </div>
      ) : (
        <h4>...Loading</h4>
      )}
    </div>
  );
}

export default Home;
