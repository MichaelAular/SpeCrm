import "./delete.scss";
import React, { useState } from "react";
import { getDatabase, ref, set } from "firebase/database";
// import { db } from "@/firebase";

export function Delete() {
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
    console.log("delete")
    writeUserData()
  }
  const clickedNo =()=> {
    console.log("don't delete")
  }

  const deleteButton = (input, state, setState, handleClick) => {
    return (
      <button
        className="deleteButton"
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
      Are you sure you want to delete<br/>
      this incident?
      <div className="buttonContainer">
        {deleteButton("yes", yesButton, setYesButton, clickedYes)}
        {deleteButton("no", noButton, setNoButton, clickedNo)}
      </div>
    </div>
  );
}
