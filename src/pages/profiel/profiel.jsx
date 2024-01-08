import styles from "../../app/page.module.scss";
import Skeleton from '@mui/material/Skeleton';
import React, { useEffect, useState } from "react";
import { db } from '@/firebase';
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { FormElement } from "@/components/formElement/formElement";
import profile from "../../models/profile.json"
import options from "../../../dropdownOptions.json"

/// persoonlijke vraag: geen tel en email ed van school???
/// kopie rapport bespreken (document zelf!)
export function Tab_Profiel() {
  const [data, setData] = useState(profile);
  const [dataLoaded, setLoaded] = useState(false);

  // Get all profiles from Firestore Database
  // TODO: Haal specifieke document op
  const fetchProfiles = async () => {
    await getDocs(collection(db, "profiles"))
      .then((querySnapshot) => {
        const newData = querySnapshot.docs
          .map((doc) => ({ ...doc.data(), id: doc.id }));
        setData(newData[0]);
        setLoaded(true);
        console.log(data, newData);
      })
  }

  // Add new profile to Firestore Database
  // TODO: geeft random firestore ID in plaats van VoornaamAchternaam
  const addProfile = async (e) => {
    e.preventDefault();

    try {
      const docRef = await addDoc(collection(db, "profiles"), data);
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  // Update excisting profile to Firestore Database
  // TODO: Werkt nog niet
  const updateProfile = async (e) => {
    e.preventDefault();

    try {
      const profileRef = doc(db, 'profiles', data.id);
      console.log(data, profileRef);
      const docRef = await updateDoc(profileRef, data);
      console.log("Document updated with ID: ", docRef.id);
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  }

  useEffect(() => {
    fetchProfiles();
  }, [])

  return (
    <div>
      <div className={styles.textContainer}>
        <h1 className="pageTitle">profielschets</h1>
        <div className="btn-container">
          <button type="submit" className="btn" onClick={updateProfile}>
            Opslaan
          </button>
        </div>
      </div>

      <main className={styles.main}>
        {dataLoaded && <div className={styles.pageCollumn}>
          <FormElement
            elementTitle="gegevens kind"
            elementBars={[
              { title: "voornaam", input: data.firstName, type: "string" },
              { title: "roepnaam", input: data.nickname, type: "string" },
              { title: "achternaam", input: data.lastName, type: "string" },
              { title: "geslacht", input: data.sex, type: "dropdown", options: options.sex },
              { title: "geboortedatum", input: new Date(data.birthDate.toDate()), type: "date" },
              { title: "leeftijd", input: new Date(data.birthDate.toDate()), type: "age" },
              { title: "straatnaam", input: data.address.street, type: "string" },
              { title: "huisnummer", input: data.address.streetNo, type: "string" },
              { title: "postcode", input: data.address.postalCode, type: "string" },
              { title: "plaats", input: data.address.city, type: "string" },
              { title: "e-mailadres kind", input: data.email, type: "string" },
              { title: "e-mailadres ouder", input: data.family.parents[0].email, type: "string" },
              { title: "geboorteland", input: data.countryOfBirth, type: "string" },
              { title: "nationaliteit", input: data.nationality, type: "string" },
              { title: "thuistaal", input: data.languages, type: "dropdown_multiple", options: options.languages },
              { title: "telefoon vast", input: data.family.contactDetails.phoneNoHome, type: "string" },
              { title: "telefoon mobiel", input: data.family.contactDetails.phoneNoMobile, type: "string" },
              { title: "telefoon bij nood", input: data.family.contactDetails.phoneNoEmergency, type: "string" },
              { title: "nood contactpersoon", input: data.family.contactDetails.name, type: "string" },
              { title: "nood e-mailadres", input: data.family.contactDetails.email, type: "string" },
              { title: "aantal kinderen in het gezin", input: data.family.noOfChildren, type: "string" },
              { title: "sport / naschoolse activiteiten", input: data.afterSchoolActivities, type: "string" },
              { title: "stadpas", input: data.cityPass, type: "dropdown_boolean" },
              { title: "bibliotheekpas", input: data.libraryPass, type: "dropdown_boolean" },
              { title: "eigen kamer", input: data.ownRoom, type: "dropdown_boolean" },
              { title: "laptop", input: data.equipment.laptop, type: "dropdown_boolean" },
              { title: "tablet", input: data.equipment.tablet, type: "dropdown_boolean" },
              { title: "smartphone", input: data.equipment.smartphone, type: "dropdown_boolean" }
            ]}
          />
        </div>}

        {dataLoaded && <div className={styles.pageCollumn}>
          <FormElement
            elementTitle="gegevens school / bijles"
            elementBars={[
              { title: "soort school", input: data.school.type, type: "dropdown", options: options.schoolType },
              { title: "naam school", input: data.school.name, type: "string" },
              { title: "richting", input: data.school.fieldOfStudy, type: "dropdown", options: options.schoolFieldOfStudy },
              { title: "leerjaar", input: data.school.schoolYear, type: "string" },
              { title: "straatnaam", input: data.school.address.street, type: "string" },
              { title: "huisnummer", input: data.school.address.streetNo, type: "string" },
              { title: "postcode", input: data.school.address.postalCode, type: "string" },
              { title: "plaats", input: data.school.address.city, type: "string" },
              { title: "speciaal onderwijs", input: data.school.specialEducation, type: "dropdown_boolean" },
              { title: "voorlopig advies (groep 7/8)", input: data.school.preliminaryAdvise, type: "string" },
              { title: "cito-toets score", input: data.school.citoScore, type: "string" },
              { title: "link kopie rapport", input: data.school.rapportCopy, type: "string" },
              { title: "bijlesdagen", input: data.lessonSchedule, type: "dropdown_multiple", options: options.days },
            ]}
          />
          <FormElement
            elementTitle="incident registratie"
            elementArray={data.incidents.map((incident) => { return incident })}
            add={true}
          />
          <FormElement
            elementTitle="aandachtspunten"
            elementBars={[
              { title: "omschrijving", input: "", type: "string" },
              { title: "plan van aanpak", input: "", type: "string" },
              { title: "afspraken", input: "", type: "string" },
            ]}
          />
        </div>}

        {!dataLoaded && <Skeleton variant="rectangular" width={600} height={200} />}
      </main>
    </div>
  );
}
