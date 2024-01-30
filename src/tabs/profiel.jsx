import styles from "../app/page.module.scss";
import * as FirestoreProfileService from '../services/firebaseProfiles';
import React, { useEffect, useState } from "react";
import { FormElement } from "@/components/formElement/formElement";
import options from "../../dropdownOptions.json"
import profile from "../models/profile.json"
import Skeleton from '@mui/material/Skeleton';
import { Spinner } from "@/components/spinner/spinner";

export function Tab_Profiel() {
  const [currentProfile, setCurrentProfile] = useState(profile);
  const [dataLoaded, setLoaded] = useState(false);

  useEffect(() => {
    FirestoreProfileService.getProfile('SennaKaterberg')
      .then(doc => {
        if (doc.exists) {
          setCurrentProfile(doc.data());
          setLoaded(true);
        } else {
          // Not found
          console.log('Document not found')
        }
      })
      .catch(() => console.log('Error'));
  }, [])

  return (
    <div>
      <div className={styles.textContainer} style={{ display: "flex", justifyContent: "space-between", paddingRight: "10px"}}>
        <h1 className="pageTitle">profielschets</h1>
      </div>

      <main className={styles.main}>
        {dataLoaded && <div className={styles.pageCollumn}>
          <FormElement
            elementTitle="gegevens kind"
            elementBars={[
              { title: "voornaam", input: currentProfile.firstName, type: "string" },
              { title: "roepnaam", input: currentProfile.nickname, type: "string" },
              { title: "achternaam", input: currentProfile.lastName, type: "string" },
              { title: "geslacht", input: currentProfile.sex, type: "dropdown", options: options.sex },
              { title: "geboortedatum", input: new Date(currentProfile.birthDate.toDate()), type: "date" },
              { title: "leeftijd", input: new Date(currentProfile.birthDate.toDate()), type: "age" },
              { title: "straatnaam", input: currentProfile.address.street, type: "string" },
              { title: "huisnummer", input: currentProfile.address.streetNo, type: "string" },
              { title: "postcode", input: currentProfile.address.postalCode, type: "string" },
              { title: "plaats", input: currentProfile.address.city, type: "string" },
              { title: "e-mailadres kind", input: currentProfile.email, type: "string" },
              { title: "e-mailadres ouder", input: currentProfile.family.parents[0].email, type: "string" },
              { title: "geboorteland", input: currentProfile.countryOfBirth, type: "string" },
              { title: "nationaliteit", input: currentProfile.nationality, type: "string" },
              { title: "thuistaal", input: currentProfile.languages, type: "dropdown_multiple", options: options.languages },
              { title: "telefoon vast", input: currentProfile.family.contactDetails.phoneNoHome, type: "string" },
              { title: "telefoon mobiel", input: currentProfile.family.contactDetails.phoneNoMobile, type: "string" },
              { title: "telefoon bij nood", input: currentProfile.family.contactDetails.phoneNoEmergency, type: "string" },
              { title: "nood contactpersoon", input: currentProfile.family.contactDetails.name, type: "string" },
              { title: "nood e-mailadres", input: currentProfile.family.contactDetails.email, type: "string" },
              { title: "aantal kinderen in het gezin", input: currentProfile.family.noOfChildren, type: "string" },
              { title: "sport / naschoolse activiteiten", input: currentProfile.afterSchoolActivities, type: "string" },
              { title: "stadpas", input: currentProfile.cityPass, type: "dropdown_boolean" },
              { title: "bibliotheekpas", input: currentProfile.libraryPass, type: "dropdown_boolean" },
              { title: "eigen kamer", input: currentProfile.ownRoom, type: "dropdown_boolean" },
              { title: "laptop", input: currentProfile.equipment.laptop, type: "dropdown_boolean" },
              { title: "tablet", input: currentProfile.equipment.tablet, type: "dropdown_boolean" },
              { title: "smartphone", input: currentProfile.equipment.smartphone, type: "dropdown_boolean" }
            ]}
          />
        </div>}

        {dataLoaded && <div className={styles.pageCollumn}>
          <FormElement
            elementTitle="gegevens school / bijles"
            elementBars={[
              { title: "soort school", input: currentProfile.school.type, type: "dropdown", options: options.schoolType },
              { title: "naam school", input: currentProfile.school.name, type: "string" },
              { title: "richting", input: currentProfile.school.fieldOfStudy, type: "dropdown", options: options.schoolFieldOfStudy },
              { title: "leerjaar", input: currentProfile.school.schoolYear, type: "string" },
              { title: "straatnaam", input: currentProfile.school.address.street, type: "string" },
              { title: "huisnummer", input: currentProfile.school.address.streetNo, type: "string" },
              { title: "postcode", input: currentProfile.school.address.postalCode, type: "string" },
              { title: "plaats", input: currentProfile.school.address.city, type: "string" },
              { title: "speciaal onderwijs", input: currentProfile.school.specialEducation, type: "dropdown_boolean" },
              { title: "voorlopig advies (groep 7/8)", input: currentProfile.school.preliminaryAdvise, type: "string" },
              { title: "cito-toets score", input: currentProfile.school.citoScore, type: "string" },
              { title: "link kopie rapport", input: currentProfile.school.rapportCopy, type: "string" },
              { title: "bijlesdagen", input: currentProfile.lessonSchedule, type: "dropdown_multiple", options: options.days },
            ]}
          />
          <FormElement
            elementTitle="incident registratie"
            elementArray={currentProfile.incidents.map((incident) => { return incident })}
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

        {!dataLoaded && <Skeleton variant="rectangular" width={600} height={200}/>}
        {!dataLoaded && <Spinner/>}
      </main>
    </div>
  );
}
