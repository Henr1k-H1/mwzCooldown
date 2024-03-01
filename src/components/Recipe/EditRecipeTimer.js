import React, { useState, useEffect } from "react";

const EditRecipeTimer = (props) => {
  const [recipe, setRecipe] = useState(props.currentRecipe);

  useEffect(
    () => {
      setRecipe(props.currentRecipe);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  function calculateTimeRemaining() {
    const currentTime = new Date().getTime();
    const endTime = new Date(recipe.timeFinished).getTime();
    return Math.max(0, endTime - currentTime);
  }

  const minutesRemaining = Math.floor(calculateTimeRemaining() / (1000 * 60)) % 60;
  const hoursRemaining = Math.floor(calculateTimeRemaining() / (1000 * 60 * 60));

  function handleInputChange(event) {
    const { name, value } = event.target;
    if (name === "activeCooldownHours") {
      setRecipe({
        ...recipe,
        [name]: Number(value),
        timeFinished: props.addTime(
          new Date(),
          value,
          recipe.activeCooldownMinutes
        ),
      });
    }
    if (name === "activeCooldownMinutes") {
      setRecipe({
        ...recipe,
        [name]: Number(value),
        timeFinished: props.addTime(
          new Date(),
          recipe.activeCooldownHours,
          value
        ),
      });
    }
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <form
          onSubmit={(event) => {
            event.preventDefault();

            props.updateRecipe(recipe);
          }}
        >
          <div className="row">
            <div className="mb-3">
              <label htmlFor="Name">
                <h6>Schematics Name</h6>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Schmematics Name"
                className="form-control form-control-sm darkInput"
                value={recipe.name}
                readOnly
              />
            </div>
            <div className="mb-3">
              <label htmlFor="activeCooldownHours">
                <h6>Remaining Hours</h6>
              </label>
              <input
                type="number"
                name="activeCooldownHours"
                placeholder="Remaining Hours"
                className="form-control form-control-sm darkInput"
                defaultValue={hoursRemaining || 0 }
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="activeCooldownMinutes">
                <h6>Remaining Minutes</h6>
              </label>
              <input
                type="number"
                name="activeCooldownMinutes"
                placeholder="Remaining Minutes"
                className="form-control form-control-sm darkInput"
                defaultValue={minutesRemaining || 0 }
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="row text-center mt-3">
            <div className="col">
              <button className="btn btn-primary btn-sm">Update</button>
              &nbsp;&nbsp;
              <button
                className="btn btn-danger btn-sm"
                onClick={() => props.setEditingRecipe(false)}
              >
                Close
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditRecipeTimer;
