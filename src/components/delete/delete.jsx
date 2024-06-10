import "./delete.scss";
import React from "react";

export function Delete({ setDeleteOpen, index, description, setItemIdToDelete }) {

  const clickedYes =()=> {
    setItemIdToDelete(index)
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
      {description}
      <div className="buttonContainer">
        {deleteButton("yes", clickedYes)}
        {deleteButton("no", clickedNo)}
      </div>
    </div>
  );
}
