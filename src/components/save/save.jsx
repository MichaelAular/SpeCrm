import "./save.scss";
import React, { useState } from "react";
import { getDatabase, ref, set } from "firebase/database";
// import { db } from "@/firebase";

export function Save() {
  const [yesButton, setYesButton] = useState(false);
  const [noButton, setNoButton] = useState(false);

  function writeUserData(userId, name, email, imageUrl) {
    const db = getDatabase();
    console.log(db);
    // set(ref(db, 'users/' + userId), {
    //   username: name,
    //   email: email,
    //   profile_picture : imageUrl
    // });
  }

  const clickedYes =()=> {
    console.log("save")
    writeUserData()
  }
  const clickedNo =()=> {
    console.log("don't save")
  }

  const saveButton = (input, state, setState, handleClick) => {
    return (
      <button
        className="saveButton"
        style={{
            color: state === true ? "rgb(var(--white07))" : "rgb(var(--white07)",
            backgroundColor: state === true ? "rgb(var(--white00)" : "rgb(var(--TextOnWhite)"
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
