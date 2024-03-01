import "./save.scss";
import React, { useState } from "react";
import { getDatabase, ref, set } from "firebase/database";
// import { db } from "@/firebase";

export function Save({setModalOpen}) {
  const [yesButton, setYesButton] = useState(false);
  const [noButton, setNoButton] = useState(false);
  const clickedYes =()=> {
    console.log("save")
    setModalOpen(false)
  }
  const clickedNo =()=> {
    console.log("don't save")
    setModalOpen(false)
  }

  const saveButton = (input, state, setState, handleClick) => {
    return (
      <button
        type="submit"
        className="saveButton"
        style={{
            color: state === true ? "rgb(var(--white07))" : "rgb(var(--white07)",
            backgroundColor: state === true && input === "yes" ? "rgb(var(--danger)" :
            state === true && input === "no" ? "rgb(var(--white00)" :
            "rgb(var(--TextOnWhite)"
        }}
        onMouseEnter={()=> setState(true)}
        onMouseLeave={()=> setState(false)}
        onClick={()=>handleClick()}
      >
        {input}
      </button>
    );
  };

  return (
    <div className="saveContainer">
      Are you sure you want to overwrite
      <br />
      previous data?
      <div className="buttonContainer">
        {saveButton("yes", yesButton, setYesButton, clickedYes)}
        {saveButton("no", noButton, setNoButton, clickedNo)}
      </div>
    </div>
  );
}
