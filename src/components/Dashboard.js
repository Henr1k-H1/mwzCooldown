import React, { useState, useEffect } from "react";

import axios from "axios";

import EditRecipeTimer from "./Recipe/EditRecipeTimer";
import Recipe from "./Recipe/Recipe";

const Dashboard = () => {
  const initialFormStateStock = {
    name: "",
    category: "",
    timeStarted: "",
    defaultCooldownHours: "",
    defaultCooldownMinutes: "",
    activeCooldownHours: "",
    activeCooldownMinutes: "",
    timeFinished: "",
    favorite: "",
    locked: "",
    onCooldown: "",
  };

  const [recipes, setRecipes] = useState([]);
  const [activeCooldownRecipes, setActiveCooldownRecipes] = useState([]);
  const [lockedRecipes, setLockedRecipes] = useState([]);
  const [readyRecipes, setReadyRecipes] = useState([]);
  const [currentRecipe, setCurrentRecipe] = useState(initialFormStateStock);
  const [editingRecipe, setEditingRecipe] = useState(false);

  //Load Data From JSON Server
  useEffect(() => {
    axios
      .get(
        "https://us-east-1.aws.data.mongodb-api.com/app/mwz-cooldowns-wdcid/endpoint/getAllSchematics"
      )
      .then((res) => {
        const recipes = res.data;
        setRecipes(recipes);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    setActiveCooldownRecipes(recipes.filter((recipe) => recipe.onCooldown === true && recipe.locked === false ))
    setLockedRecipes(recipes.filter((recipe) => recipe.locked === true))
    setReadyRecipes(recipes.filter((recipe) => recipe.onCooldown === false && recipe.locked === false))
  }, [recipes])

  useEffect(() => {
    editingRecipe ? (document.body.style.overflow = "hidden") : (document.body.style.overflow = "unset");
  }, [editingRecipe]);

  const updateRecipe = (updatedRecipe) => {
    delete updatedRecipe._id;
    setEditingRecipe(false);
    axios
      .put(
        "https://us-east-1.aws.data.mongodb-api.com/app/mwz-cooldowns-wdcid/endpoint/updateSchematic",
        updatedRecipe
      )
      .then((res) => {
        setRecipes(
          recipes.map((recipe) =>
            recipe.name === updatedRecipe.name ? updatedRecipe : recipe
          )
        );
      })
      .catch((error) => console.log(error));
  };

  const addTime = (date, hours, minutes) => {
    const hoursToAdd = hours * 60 * 60 * 1000;
    const minutesToAdd = minutes * 60 * 1000;
    date.setTime(date.getTime() + hoursToAdd + minutesToAdd);
    
    return date;
  };

  const editRecipe = (recipe) => {
    setEditingRecipe(true);
    setCurrentRecipe({
      name: recipe.name,
      category: recipe.category,
      timeStarted: recipe.timeStarted,
      defaultCooldownHours: recipe.defaultCooldownHours,
      defaultCooldownMinutes: recipe.defaultCooldownMinutes,
      activeCooldownHours: recipe.activeCooldownHours,
      activeCooldownMinutes: recipe.activeCooldownMinutes,
      timeFinished: recipe.timeFinished,
      favorite: recipe.favorite,
      locked: recipe.locked,
      onCooldown: recipe.onCooldown,
    });
  };

  const cancelCrafting = (updatedRecipe) => {
    let recipeChanged = { ...updatedRecipe };
    recipeChanged.onCooldown = false;
    recipeChanged.timeStarted = 0;
    recipeChanged.activeCooldownHours = 0;
    recipeChanged.activeCooldownMinutes = 0;
    recipeChanged.timeFinished = 0;

    updateRecipe(recipeChanged);
  };

  const finishCrafting = (updatedRecipe) => {
    let recipeChanged = { ...updatedRecipe };
    recipeChanged.onCooldown = false;
    recipeChanged.timeStarted = 0;
    recipeChanged.activeCooldownHours = 0;
    recipeChanged.activeCooldownMinutes = 0;
    recipeChanged.timeFinished = 0;
    updateRecipe(recipeChanged);
  };

  const craftRecipe = (updatedRecipe) => {
    let recipeChanged = { ...updatedRecipe };
    recipeChanged.onCooldown = true;
    recipeChanged.timeStarted = new Date();
    recipeChanged.activeCooldownHours = updatedRecipe.defaultCooldownHours;
    recipeChanged.activeCooldownMinutes = updatedRecipe.defaultCooldownMinutes;
    recipeChanged.timeFinished = addTime(
      new Date(),
      updatedRecipe.defaultCooldownHours,
      updatedRecipe.defaultCooldownMinutes
    );

    updateRecipe(recipeChanged);
  };

  const lockRecipe = (updatedRecipe) => {
    let recipeChanged = { ...updatedRecipe };
    recipeChanged.onCooldown = false;
    recipeChanged.timeStarted = 0;
    recipeChanged.activeCooldownHours = 0;
    recipeChanged.activeCooldownMinutes = 0;
    recipeChanged.timeFinished = 0;
    recipeChanged.locked = !recipeChanged.locked;
    updateRecipe(recipeChanged);
  };

  const faveRecipe = (updatedRecipe) => {
    let recipeChanged = { ...updatedRecipe };
    recipeChanged.favorite = !recipeChanged.favorite;
    updateRecipe(recipeChanged);
  };

  return (
    <div className="container-fluid">
      {editingRecipe ? (
        <EditRecipeTimer
          editingRecipe={editingRecipe}
          setEditingRecipe={setEditingRecipe}
          currentRecipe={currentRecipe}
          updateRecipe={updateRecipe}
          addTime={addTime}
        />
      ) : null}
      <div className="row">
        <React.Fragment>
          <div className="row">
            <div className="col">
              <h1 className="display-7 text-white">Active Cooldowns</h1>
            </div>
          </div>
          <div className="row">
            {activeCooldownRecipes.length > 0 ? (
              activeCooldownRecipes
                .sort((a, b) => (a.timeFinished > b.timeFinished))
                .map((recipe) => (
                  <Recipe
                    key={recipe.name}
                    recipe={recipe}
                    editRecipe={editRecipe}
                    craftRecipe={craftRecipe}
                    cancelCrafting={cancelCrafting}
                    finishCrafting={finishCrafting}
                    lockRecipe={lockRecipe}
                    faveRecipe={faveRecipe}
                  />
                ))
            ) : (
              <div className="row mb-3">
                <h6 className="text-white-50">
                  Craft some items and they will show here!
                </h6>
              </div>
            )}
          </div>

          <div className="row">
            <div className="col">
              <h1 className="display-7 text-white">Ready to Craft</h1>
            </div>
          </div>
          <div className="row">
            {readyRecipes.length > 0 ? (
              readyRecipes
                .sort((a, b) => (a.category > b.category))
                .sort((a, b) => (a.favorite < b.favorite))
                .map((recipe) => (
                  <Recipe
                    key={recipe.name}
                    recipe={recipe}
                    editRecipe={editRecipe}
                    craftRecipe={craftRecipe}
                    cancelCrafting={cancelCrafting}
                    finishCrafting={finishCrafting}
                    lockRecipe={lockRecipe}
                    faveRecipe={faveRecipe}
                  />
                ))
            ) : (
              <div className="row mb-3">
                <h6 className="text-white-50">
                  Guess everything is on cooldown, or there was an issue with
                  fetching schematics...
                </h6>
              </div>
            )}
          </div>

          <div className="row mt-3">
            <div className="col">
              <h1 className="display-7 text-white">Locked Schematics</h1>
            </div>
          </div>
          <div className="row" id="locked">
            {lockedRecipes.length > 0 ? (
              lockedRecipes
                .sort((a, b) => (a.category > b.category))
                .sort((a, b) => (a.favorite < b.favorite))
                .map((recipe) => (
                  <Recipe
                    key={recipe.name}
                    recipe={recipe}
                    editRecipe={editRecipe}
                    craftRecipe={craftRecipe}
                    cancelCrafting={cancelCrafting}
                    finishCrafting={finishCrafting}
                    lockRecipe={lockRecipe}
                    faveRecipe={faveRecipe}
                  />
                ))
            ) : (
              <div className="row mb-3">
                <h6 className="text-white-50">
                  Congratulations! You unlocked all currently availabe
                  schematics!
                </h6>
              </div>
            )}
          </div>
        </React.Fragment>
      </div>
    </div>
  );
};

export default Dashboard;
