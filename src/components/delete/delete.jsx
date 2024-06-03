import "./delete.scss";
import React from "react";

export function Delete({ setDeleteOpen, type }) {

  const clickedYes =()=> {
    setDeleteOpen(false)
  }
  const clickedNo =()=> {
    setDeleteOpen(false)
  }

  const deleteButton = (input, handleClick) => {
    return (
      <button
        type="button"
        className={input === "yes" ? "deleteBtn deleteBtn-danger" : "deleteBtn"}
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
        {deleteButton("yes", clickedYes)}
        {deleteButton("no", clickedNo)}
      </div>
    </div>
  );
}
