import "./delete.scss";
import React, { useState } from "react";

export function Delete({ setDeleteOpen, type }) {
  const [yesButton, setYesButton] = useState(false);
  const [noButton, setNoButton] = useState(false);

  const clickedYes =()=> {
    console.log("delete")
    setDeleteOpen(false)
  }
  const clickedNo =()=> {
    console.log("don't delete")
    setDeleteOpen(false)
  }

  const deleteButton = (input, state, setState, handleClick) => {
    return (
      <button
        type="button"
        className="deleteBtn"
        style={{
            color: "rgb(var(--white07)",
            backgroundColor: state === true && input === "yes" ? "rgb(var(--danger)" :
            state === true && input === "no" ? "rgb(var(--white00)" :
            "rgb(var(--TextOnWhite)"
        }}
        onMouseEnter={()=> setState(true)}
        onMouseLeave={()=> setState(false)}
        onMouseOut={()=> setState(false)}
        onClick={()=>handleClick()}
      >
        {input}
      </button>
    );
  };

  return (
    <div >
      Are you sure you want to delete this 
      {type === "incident" && " incident?"}
      {type === "aandacht" && " focus point?"}
      <div className="buttonContainer">
        {deleteButton("yes", yesButton, setYesButton, clickedYes)}
        {deleteButton("no", noButton, setNoButton, clickedNo)}
      </div>
    </div>
  );
}
