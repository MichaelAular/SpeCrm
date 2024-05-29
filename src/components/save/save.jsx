import "./save.scss";
import React, { useState } from "react";
import * as FirestoreProfileService from "../../services/firebaseProfiles";

export function Save({
  setModalOpen,
  currentProfile,
  profileID
}) {
  const [yesButton, setYesButton] = useState(false);
  const [noButton, setNoButton] = useState(false);

  const clickedYes =()=> {
    if (profileID === "new_user") {
      console.log("create new profile: ", currentProfile);
      FirestoreProfileService.addProfile(currentProfile);
    } else {
      console.log("update profile: ", currentProfile);
      FirestoreProfileService.updateProfile(currentProfile);
    }
    setModalOpen(false);
  }
  const clickedNo =()=> {
    setModalOpen(false)
  }

  const saveButton = (input, state, setState, handleClick) => {
    return (
      <button
        type="button"
        className="saveButton"
        style={{
            color: state === true ? "rgb(var(--white07))" : "rgb(var(--white07)",
            backgroundColor: state === true && input === "Ja" ? "rgb(var(--secundair)" :
            state === true && input === "Nee" ? "rgb(var(--white00)" :
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
      {profileID === "new_user" 
      ? <>U maakt een nieuw profiel aan. <br /> Weet u zeker dat u wilt doorgaan? </>
      : <>Weet u zeker dat u de <br /> vorige gegevens wilt overschrijven?</>}
      <div className="buttonContainer">
        {saveButton("Ja", yesButton, setYesButton, clickedYes)}
        {saveButton("Nee", noButton, setNoButton, clickedNo)}
      </div>
    </div>
  );
}
