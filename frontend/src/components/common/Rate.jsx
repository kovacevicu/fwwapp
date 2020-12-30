import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import RateButton from "./RateButton";
import UserContext from "./../../context/userContext";
import axios from "axios";
import "../../styles.css";

const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;

function Rate(props) {
  const [checked, setChecked] = useState(1);
  const [rated, setRated] = useState(null);
  const { id: recipieId } = useParams();
  const currentUser = useContext(UserContext);

  const handleRate = async (e) => {
    e.preventDefault();
    const { data } = await axios.post(apiEndpoint + "/rate", {
      user_id: currentUser.id,
      recipie_id: recipieId,
      rating: checked,
    });
    setRated(data);
  };

  let handleHover = (e) => {
    setChecked(e.currentTarget.id);
  };

  return (
    <div className="rateDiv ml-auto">
      <span className="rateSpan">Rate this recipie</span>
      <form className="ratingForm" onSubmit={handleRate}>
        <RateButton
          id={1}
          value={1}
          onMouseEnter={handleHover}
          checked={checked}
          rated={rated}
        />
        <RateButton
          id={2}
          value={2}
          onMouseEnter={handleHover}
          checked={checked}
          rated={rated}
        />
        <RateButton
          id={3}
          value={3}
          onMouseEnter={handleHover}
          checked={checked}
          rated={rated}
        />
        <RateButton
          id={4}
          value={4}
          onMouseEnter={handleHover}
          checked={checked}
          rated={rated}
        />
        <RateButton
          id={5}
          value={5}
          onMouseEnter={handleHover}
          checked={checked}
          rated={rated}
        />
      </form>
    </div>
  );
}

export default Rate;
