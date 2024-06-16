import "./save.scss";
import React, { useState } from "react";
import * as FirestoreProfileService from "../../services/firebaseProfiles";

export function Save({
  setModalOpen,
  currentProfile,
  profileID,
  setCurrentPage,
  setCurrentTab,
  setProfileID
}) {

  const initialModalText = profileID === "new_user" 
    ? <>U maakt een nieuw profiel aan. <br /> Weet u zeker dat u wilt doorgaan?</> 
    : <>Weet u zeker dat u de <br /> vorige gegevens wilt overschrijven?</>;

  const [modalText, setModalText] = useState(initialModalText);
  const [saveCompleted, setSaveCompleted] = useState(false);


  const saveProfile = () => {
    if (profileID === "new_user") {
      console.log("create new profile: ", currentProfile);
      FirestoreProfileService.addProfile(currentProfile).then(() =>{
        setModalText("Gegevens zijn succesvol opgeslagen.")
        setSaveCompleted(true)
      });
    } else {
      console.log("update profile: ", currentProfile);
      FirestoreProfileService.updateProfile(currentProfile).then(() =>{
          setModalText("Gegevens zijn succesvol opgeslagen.")
          setSaveCompleted(true)
        });
    }
  };

  const backToHome = () => {
    setModalOpen(false);
    setCurrentPage("Studenten")
    setCurrentTab("Profielschets")
    setProfileID(null)
  };

  return (
    <div className="saveContainer">
      {modalText}
      <div className={`buttonContainer ${saveCompleted ? "hidden" : ""}`}>
        <button
          type="button"
          className="saveButton saveButton-secundair"
          onClick={saveProfile}
        >
          Ja
        </button>
        <button
          type="button"
          className="saveButton"
          onClick={() => setModalOpen(false)}
        >
          Nee
        </button>
      </div>
      <div className={`buttonContainer ${saveCompleted ? "" : "hidden"}`}>
        <button
          type="button"
          className="saveButton saveButton-secundair"
          onClick={backToHome}
        >
          Oké
        </button>
      </div>
    </div>
  );
}
