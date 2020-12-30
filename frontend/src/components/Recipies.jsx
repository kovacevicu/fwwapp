import React, { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import Rating from "./common/Rating";
import NavBar from "./common/NavBar";
import SearchBox from "./common/SearchBox";
import UserContext from "./../context/userContext";
import axios from "axios";
import "../styles.css";

const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;

function Recipies(props) {
  const [recipies, setRecipies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const currentUser = useContext(UserContext);

  const getRecipies = async () => {
    const { data } = await axios.get(apiEndpoint + "/recipies");
    setRecipies(data);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const getSearched = () => {
    let searched = recipies;
    if (searchQuery) {
      searched = searched.filter((r) =>
        r[2].toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    }
    return searched;
  };

  useEffect(() => {
    getRecipies();
  }, []);

  const recipes = getSearched();

  return (
    <div>
      <NavBar />
      <div className="recipesDiv">
        <h1>Recipes</h1>
        <div className="row mx-1">
          <SearchBox value={searchQuery} onChange={handleSearch} />
          {currentUser.id && (
            <NavLink to="/create" className="btn btn-primary ml-auto my-3">
              Add recipe
            </NavLink>
          )}
        </div>
        {recipies ? (
          <table className="table">
            <thead>
              <tr>
                <th>Recipe name</th>
                <th>Author</th>
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
              {recipes.map((recipie) => (
                <tr key={recipie[0]}>
                  <td className="linktd">
                    <NavLink className="linktd" to={`/recipe/${recipie[0]}`}>
                      {recipie[2]}
                    </NavLink>
                  </td>
                  <td>
                    <NavLink className="linktd" to={`/profile/${recipie[1]}`}>
                      {recipie[3]} {recipie[4]}
                    </NavLink>
                  </td>
                  <td>
                    <Rating checked={recipie[5]} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <h3>No recipes yet!</h3>
        )}
      </div>
    </div>
  );
}

export default Recipies;
