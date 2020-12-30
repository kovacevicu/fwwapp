import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Rate from "./common/Rate";
import NavBar from "./common/NavBar";
import UserContext from "./../context/userContext";
import axios from "axios";
import "../styles.css";

const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;

function RecipieDetails(props) {
  const [results, setResults] = useState([]);
  const { id } = useParams();
  const currentUser = useContext(UserContext);

  const getResults = async () => {
    const { data } = await axios.get(apiEndpoint + `/recipie/${id}`);
    setResults(data);
  };

  useEffect(() => {
    getResults();
  }, []);

  return (
    <div>
      <NavBar />
      {results.recipie && (
        <div className="recipeDetails">
          <div className="row">
            <h1>{results.recipie[1]}</h1>
            {currentUser.id && currentUser.id !== results.recipie[0] ? (
              <Rate />
            ) : null}
          </div>
          <h4 className="recipeAuthor">
            Author - {results.recipie[3]} {results.recipie[4]}
          </h4>
          <div className="row">
            <div className="recipeDesc col-7">
              <span className="descSpan">Description:</span>
              <p>{results.recipie[2]}</p>
            </div>
            <div className="recipeDesc col-4 ml-auto">
              <span className="descSpan">Ingrediens:</span>
              <ul>
                {results.ingredients.map((ing) => (
                  <li key={ing}>{ing}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RecipieDetails;
