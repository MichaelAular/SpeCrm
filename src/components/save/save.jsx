import "./save.scss";
import React from "react";
import * as FirestoreProfileService from "../../services/firebaseProfiles";

export function Save({
  setModalOpen,
  currentProfile,
  profileID
}) {

  const saveProfile = () => {
    if (profileID === "new_user") {
      console.log("create new profile: ", currentProfile);
      FirestoreProfileService.addProfile(currentProfile);
    } else {
      console.log("update profile: ", currentProfile);
      FirestoreProfileService.updateProfile(currentProfile);
    }
    setModalOpen(false);
  };

  return (
    <div className="saveContainer">
      {profileID === "new_user"
        ? <>U maakt een nieuw profiel aan. <br /> Weet u zeker dat u wilt doorgaan? </>
        : <>Weet u zeker dat u de <br /> vorige gegevens wilt overschrijven?</>}
      <div className="buttonContainer">
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
    </div>
  );
}
