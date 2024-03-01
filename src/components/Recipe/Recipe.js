import React from "react";

import Timer from "./Timer";

const Recipe = (props) => {
  const imgURL = "/images/" + props.recipe.name + ".png";

  return (
    <div className="cards d-block mx-auto mx-sm-0">
      <div className="card mb-3 outerCard">
        <div className="card-body">
          <div>
            <h6 className="card-title heading text-white">
              {props.recipe.name}
            </h6>
            <span className="float-right">
              <i
                className={
                  props.recipe.locked === true
                    ? "fa-solid fa-lock text-danger fa-xs pointer"
                    : "fa-solid fa-lock-open text-success fa-xs pointer"
                }
                onClick={() => {
                  props.lockRecipe(props.recipe);
                }}
              ></i>
              &nbsp;&nbsp;
              <i
                className={
                  props.recipe.favorite === true
                    ? "fa-solid fa-star text-warning fa-xs pointer"
                    : "fa-regular fa-star text-warning fa-xs pointer"
                }
                onClick={() => {
                  props.faveRecipe(props.recipe);
                }}
              ></i>
            </span>
          </div>
          <small className="text-white-50">{props.recipe.category}</small>
          <div className="mt-2 mb-2 text-center">
            <img
              src={process.env.PUBLIC_URL + imgURL}
              className="img-fluid"
              alt={props.recipe.name}
              width="100px"
            ></img>
          </div>
          {props.recipe.locked === true ? (
            <h6 className="card-subtitle text-warning text-center">
              SCHEMATIC LOCKED
            </h6>
          ) : null}
          {props.recipe.locked === false &&
          props.recipe.onCooldown === false ? (
            <h6 className="card-subtitle text-success text-center">
              READY TO CRAFT
            </h6>
          ) : null}
          {props.recipe.locked === false && props.recipe.onCooldown === true ? (
            <h6 className="card-subtitle text-danger text-center">
              ON COOLDOWN
            </h6>
          ) : null}

          <div className="mb-2 text-center">
            <small className="text-white-50 mb-2">
              {props.recipe.onCooldown === true ? (
                <Timer
                  recipe={props.recipe}
                  finishCrafting={props.finishCrafting}
                />
              ) : (
                <React.Fragment>
                  Cooldown: {props.recipe.defaultCooldownHours} hours{" "}
                  {props.recipe.defaultCooldownMinutes > 0 ? (
                    <React.Fragment>
                      {props.recipe.defaultCooldownMinutes} minutes{" "}
                    </React.Fragment>
                  ) : null}
                </React.Fragment>
              )}
            </small>
          </div>
          <div className="text-center">
            {props.recipe.locked === true ? (
              <button className="btn btn-secondary btn-sm" disabled>
                Craft Item
              </button>
            ) : null}
            {props.recipe.locked === false &&
            props.recipe.onCooldown === false ? (
              <button
                onClick={() => {
                  props.craftRecipe(props.recipe);
                }}
                className="btn btn-success btn-sm"
              >
                Craft Item
              </button>
            ) : null}
            {props.recipe.locked === false &&
            props.recipe.onCooldown === true ? (
              <React.Fragment>
                <button
                  onClick={() => props.editRecipe(props.recipe)}
                  className="btn btn-secondary btn-sm"
                >
                  Edit
                </button>
                &nbsp;&nbsp;
                <button
                  onClick={() => {
                    if (window.confirm("Are you sure?"))
                      props.cancelCrafting(props.recipe);
                  }}
                  className="btn btn-danger btn-sm"
                >
                  Cancel
                </button>
              </React.Fragment>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recipe;
