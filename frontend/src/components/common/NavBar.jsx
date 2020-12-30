import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import UserContext from "./../../context/userContext";
import "../../styles.css";

function NavBar(props) {
  const currentUser = useContext(UserContext);

  return (
    <div>
      <nav className="navbar navbar-expand-sm navbar-dark bg-primary">
        <div className="navDiv">
          <div className="navbar-nav myNavBar">
            <div className="navItemsContainer">
              {currentUser.id && (
                <a
                  className="nav-item nav-link"
                  href={`/profile/${currentUser.id}`}
                >
                  Profile <span className="sr-only">(current)</span>
                </a>
              )}
              <NavLink className="nav-item nav-link" exact to="/recipes">
                Recipes
              </NavLink>
            </div>
            {currentUser.id ? (
              <div className="navRight ml-auto">
                <span className="navSpan nav-item nav-link">
                  {currentUser.first_name}
                </span>
                <NavLink className="nav-item nav-link" to="/logout">
                  Log out
                </NavLink>
              </div>
            ) : (
              <div className="navRight ml-auto">
                <NavLink className="nav-item nav-link" to="/register">
                  Sign up
                </NavLink>
                <NavLink className="nav-item nav-link" to="/login">
                  Log in
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
