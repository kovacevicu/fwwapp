import React, { useState, useEffect, Fragment } from "react";
import { useParams, NavLink } from "react-router-dom";
import Rating from "./common/Rating";
import axios from "axios";
import "../styles.css";
import NavBar from "./common/NavBar";
import SearchBox from "./common/SearchBox";

const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;

function UserProfile(props) {
  const [results, setResults] = useState([]);
  const [author, setAuthor] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const { id } = useParams();

  const getResults = async () => {
    const { data } = await axios.get(apiEndpoint + `/recipies/${id}`);
    let getAuthor = "";
    if (data.recipes) {
      getAuthor = `${data.recipes[0][3]} ${data.recipes[0][4]}`;
    }
    setResults(data);
    setAuthor(getAuthor);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const getSearched = () => {
    let searched = results.recipes;
    if (searchQuery) {
      searched = searched.filter((r) =>
        r[1].toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    }
    return searched;
  };

  useEffect(() => {
    getResults();
  }, []);

  const recipes = getSearched();

  return (
    <div>
      <NavBar />
      <div className="profileDiv">
        <div className="row">
          <h1 className="profileHeader">{author}</h1>
          {results.links &&
            results.links.map((link) => (
              <span className="links ml-auto" key={link}>
                {link}
              </span>
            ))}
        </div>
        {recipes ? (
          <Fragment>
            <h4>Recipes</h4>
            <SearchBox value={searchQuery} onChange={handleSearch} />
            <table className="table">
              <thead>
                <tr>
                  <th>Recipe name</th>
                  <th>Rating</th>
                </tr>
              </thead>
              <tbody>
                {recipes.map((recipie) => (
                  <tr key={recipie[0]}>
                    <td className="linktd">
                      <NavLink className="linktd" to={`/recipe/${recipie[0]}`}>
                        {recipie[1]}
                      </NavLink>
                    </td>
                    <td>
                      <Rating checked={recipie[5]} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Fragment>
        ) : (
          <h3>No recipes yet!</h3>
        )}
      </div>
    </div>
  );
}

export default UserProfile;
