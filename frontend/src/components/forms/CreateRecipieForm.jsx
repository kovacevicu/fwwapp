import React, { Fragment, useState, useContext } from "react";
import axios from "axios";
import Joi from "@hapi/joi";
import Input from "../common/Input";
import TextArea from "./../common/TextArea";
import UserContext from "./../../context/userContext";
import NavBar from "./../common/NavBar";
import "../../styles.css";

const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;

function CreateRecipieForm(props) {
  const [recipie, setRecipie] = useState({
    name: "",
    text: "",
  });
  const [errors, setErrors] = useState({});
  const [ingredientFields, setIngredientFields] = useState([{ name: "" }]);

  const currentUser = useContext(UserContext);

  const schema = {
    name: Joi.string().required().label("Recipie name"),
    text: Joi.string().required().label("Recipie text"),
  };

  const validate = () => {
    const result = Joi.validate(recipie, schema, {
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

  const handleAddFields = () => {
    const values = [...ingredientFields];
    values.push({ name: "" });
    setIngredientFields(values);
  };

  const handleRemoveFields = (index) => {
    const values = [...ingredientFields];
    values.splice(index, 1);
    setIngredientFields(values);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const err = validate();
    setErrors(err || {});
    if (err) return;

    await axios.post(apiEndpoint + "/recipies", {
      name: recipie.name,
      text: recipie.text,
      user_id: currentUser.id,
      ingredients: ingredientFields,
    });

    window.location = "/recipies";
  };

  const handleChange = ({ currentTarget: input }) => {
    const err = { ...errors };
    const errorMessage = validateProperty(input);
    if (errorMessage) err[input.name] = errorMessage;
    else delete err[input.name];

    const rec = { ...recipie };
    rec[input.name] = input.value;
    setRecipie(rec);
    setErrors(err);
  };

  const handleIngredientChange = (index, event) => {
    const values = [...ingredientFields];
    values[index].name = event.target.value;
    setIngredientFields(values);
  };

  return (
    <div>
      <NavBar />
      <div className="formDiv">
        <h1 className="formHead">New recipie</h1>
        <form onSubmit={handleSubmit}>
          <Input
            name="name"
            label="Recipie name:"
            value={recipie.name}
            onChange={handleChange}
            error={errors.name}
          />
          <TextArea
            name="text"
            label="Recipie text:"
            value={recipie.text}
            error={errors.text}
            onChange={handleChange}
          ></TextArea>
          {ingredientFields.map((ingredientField, index) => (
            <Fragment key={`${ingredientField}~${index}`}>
              <div className="row">
                <div className="ingDiv form-group">
                  <label htmlFor="ingredientField">Ingredient:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="ingredientField"
                    name="ingredientField"
                    value={ingredientField[index]}
                    onChange={(event) => handleIngredientChange(index, event)}
                  />
                </div>
                <div className="ingButtonsDiv form-group">
                  <button
                    className="ingBtnMin btn btn-secondary m-2"
                    type="button"
                    onClick={() => handleRemoveFields(index)}
                  >
                    -
                  </button>
                  <button
                    className="ingBtnPl btn btn-secondary"
                    type="button"
                    onClick={() => handleAddFields()}
                  >
                    +
                  </button>
                </div>
              </div>
            </Fragment>
          ))}
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateRecipieForm;
