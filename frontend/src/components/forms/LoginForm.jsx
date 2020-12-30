import React, { useState } from "react";
import Input from "../common/Input";
import Joi from "@hapi/joi";
import axios from "axios";
import NavBar from "./../common/NavBar";
import "../../styles.css";

const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;

function LoginForm(props) {
  const [account, setAccount] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const schema = {
    email: Joi.string().required().email().label("Email address"),
    password: Joi.string().required().label("Password"),
  };

  const validate = () => {
    const result = Joi.validate(account, schema, {
      abortEarly: false,
    });
    if (!result.error) return null;

    const err = {};
    for (let item of result.error.details) err[item.path[0]] = item.message;

    return err;
  };

  const validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const sch = { [name]: schema[name] };
    const { error } = Joi.validate(obj, sch);
    return error ? error.details[0].message : null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const err = validate();
    setErrors(err || {});
    if (err) return;

    const { data } = await axios.post(apiEndpoint + "/login", {
      email: account.email,
      password: account.password,
    });
    if (data === "Invalid user") {
      window.location = "/login";
    } else {
      localStorage.setItem("token", data);
      window.location = "/recipes";
    }
  };

  const handleChange = ({ currentTarget: input }) => {
    const err = { ...errors };
    const errorMessage = validateProperty(input);
    if (errorMessage) err[input.name] = errorMessage;
    else delete err[input.name];

    const acc = { ...account };
    acc[input.name] = input.value;
    setAccount(acc);
    setErrors(err);
  };

  return (
    <div>
      <NavBar />
      <div className="formDiv">
        <h1 className="formHead">Log in</h1>
        <form onSubmit={handleSubmit}>
          <Input
            name="email"
            label="Email address:"
            value={account.email}
            onChange={handleChange}
            error={errors.email}
          />
          <Input
            name="password"
            label="Password:"
            value={account.password}
            onChange={handleChange}
            error={errors.password}
          />
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
