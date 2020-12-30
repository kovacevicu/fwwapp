import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import Recipies from "./Recipies";
import RecipieDetails from "./RecipieDetails";
import RegisterForm from "./forms/RegisterForm";
import LoginForm from "./forms/LoginForm";
import Logout from "./Logout";
import UserContext from "./../context/userContext";
import jwtDecode from "jwt-decode";
import UserProfile from "./UserProfile";
import CreateRecipieForm from "./forms/CreateRecipieForm";

function App() {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    try {
      const jwt = localStorage.getItem("token");
      const user = jwtDecode(jwt);
      setCurrentUser(user);
    } catch (ex) {}
  }, []);

  return (
    <UserContext.Provider value={currentUser}>
      <Switch>
        <Route path="/recipe/:id">
          <RecipieDetails />
        </Route>
        <Route path="/profile/:id">
          <UserProfile />
        </Route>
        <Route path="/recipes">
          <Recipies />
        </Route>
        <Route path="/register">
          <RegisterForm />
        </Route>
        <Route path="/login">
          <LoginForm />
        </Route>
        <Route path="/create">
          <CreateRecipieForm />
        </Route>
        <Route path="/logout">
          <Logout />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </UserContext.Provider>
  );
}

export default App;
