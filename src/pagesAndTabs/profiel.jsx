import React, { useState } from "react";
import { FormElement } from "@/components/formElement/formElement";
import { Spinner } from "@/components/spinner/spinner";
import options from "../../dropdownOptions.json";
import Skeleton from "@mui/material/Skeleton";
import styles from "../app/page.module.scss";
import { useOverwriteCurrentProfile } from "@/hooks/overwriteCurrentProfile";
import { Modal } from "../components/modal/modal";
import { Save } from "../components//save/save";
import dayjs from "dayjs";

export function Tab_Profiel({
  dataLoaded,
  currentProfile,
  setCurrentProfile,
  profileID,
  setCurrentPage,
  setCurrentTab,
  setProfileID,
  setProfiles
}) {
  const [saveModal, setSaveModal] = useState(false);

  const handleChange = (e, preventDef) => {
    preventDef && e.preventDefault();
    const formData = new FormData(document.getElementById("form"));
    const newFormObject = Object.fromEntries(formData.entries());
    document.querySelector('input[name="age"]').value = dayjs().diff(dayjs(newFormObject.birthDate, "DD-MM-YYYY"), 'year')
    setCurrentProfile(useOverwriteCurrentProfile(currentProfile, newFormObject))
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    handleChange(e, true)
    setSaveModal(true)
  };

  return (
    <div className="profileTabContainer">
      <div className={styles.textContainer}>
        <h1 className="pageTitle">profielschets</h1>
      </div>
      <form
            id="form"
            className="tabProfielContainer"
            method="post"
            onSubmit={handleSubmit}
            onKeyDown={(e) => e.key === "Tab" && handleChange(e, false)}
            onChange={(e) => handleChange(e, true)}
            onBlur={(e) => handleChange(e, true)}
          >
      <main className={styles.main}>
        {dataLoaded && (
          <div className={styles.pageCollumn}>
            <FormElement
              elementTitle="gegevens kind"
              elementBars={[
                {
                  title: "bsn",
                  input: currentProfile.bsn,
                  name: "bsn",
                  type: "string",
                  required: true
                },
                {
                  title: "voornaam",
                  input: currentProfile.firstName,
                  name: "firstName",
                  type: "string",
                  required: true
                },
                {
                  title: "roepnaam",
                  input: currentProfile.nickname,
                  name: "nickname",
                  type: "string",
                },
                {
                  title: "achternaam",
                  input: currentProfile.lastName,
                  name: "lastName",
                  type: "string",
                  required: true
                },
                {
                  title: "geslacht",
                  input: currentProfile.sex,
                  name: "sex",
                  type: "dropdown",
                  options: options.sex,
                  required: true
                },
                {
                  title: "geboortedatum",
                  input: currentProfile.birthDate,
                  name: "birthDate",
                  type: "date",
                  required: true
                },
                {
                  title: "leeftijd",
                  input: dayjs().diff(dayjs(currentProfile.birthDate), 'year'),
                  name: "age",
                  type: "string_readOnly",
                  required: true
                },
                {
                  title: "straatnaam",
                  input: currentProfile.address.street,
                  name: "address.street",
                  type: "string",
                  required: true
                },
                {
                  title: "huisnummer",
                  input: currentProfile.address.streetNo,
                  name: "address.streetNo",
                  type: "string",
                  required: true
                },
                {
                  title: "postcode",
                  input: currentProfile.address.postalCode,
                  name: "address.postalCode",
                  type: "string",
                  required: true
                },
                {
                  title: "plaats",
                  input: currentProfile.address.city,
                  name: "address.city",
                  type: "string",
                  required: true
                },
                {
                  title: "e-mailadres kind",
                  input: currentProfile.email,
                  name: "email",
                  type: "string",
                },
                {
                  title: "geboorteland",
                  input: currentProfile.countryOfBirth,
                  name: "countryOfBirth",
                  type: "string",
                },
                {
                  title: "nationaliteit",
                  input: currentProfile.nationality,
                  name: "nationality",
                  type: "string",
                  required: true
                },
                {
                  title: "thuistaal",
                  input: currentProfile.languages,
                  name: "languages",
                  type: "dropdown_multiple",
                  options: options.languages,
                  required: true
                },
                {
                  title: "Allergiën",
                  input: currentProfile.allergies,
                  name: "allergies",
                  type: "string"
                },
                {
                  title: "Gebruikte medicatie",
                  input: currentProfile.medicinesUsed,
                  name: "medicinesUsed",
                  type: "string"
                },
                {
                  title: "Bekende ziektes",
                  input: currentProfile.knownIllnesses,
                  name: "knownIllnesses",
                  type: "string"
                },
                {
                  title: "Inkomensklasse",
                  input: currentProfile.family.incomeClass,
                  name: "family.incomeClass",
                  type: "string",
                  required: true
                },
                {
                  title: "Krijgt uitkering",
                  input: currentProfile.family.benefits,
                  name: "family.benefits",
                  type: "dropdown_boolean",
                  required: true
                },
                {
                  title: "nood contactpersoon naam",
                  input: currentProfile.family.contactDetails.name,
                  name: "family.contactDetails.name",
                  type: "string",
                  required: true
                },
                {
                  title: "nood e-mailadres",
                  input: currentProfile.family.contactDetails.email,
                  name: "family.contactDetails.email",
                  type: "string",
                  required: true
                },
                {
                  title: "telefoon vast",
                  input: currentProfile.family.contactDetails.phoneNoHome,
                  name: "family.contactDetails.phoneNoHome",
                  type: "string",
                },
                {
                  title: "telefoon mobiel",
                  input: currentProfile.family.contactDetails.phoneNoMobile,
                  name: "family.contactDetails.phoneNoMobile",
                  type: "string",
                  required: true
                },
                {
                  title: "telefoon bij nood",
                  input: currentProfile.family.contactDetails.phoneNoEmergency,
                  name: "family.contactDetails.phoneNoEmergency",
                  type: "string",
                  required: true
                },
                {
                  title: "aantal kinderen in het gezin",
                  input: currentProfile.family.noOfChildren,
                  name: "family.noOfChildren",
                  type: "string",
                  required: true
                },
                {
                  title: "e-mailadres ouder",
                  input: currentProfile.family.parents.email,
                  name: "family.parents.email",
                  type: "string",
                  required: true
                },
                {
                  title: "Voornaam ouder",
                  input: currentProfile.family.parents.firstName,
                  name: "family.parents.firstName",
                  type: "string",
                  required: true
                },
                {
                  title: "Achternaam ouder",
                  input: currentProfile.family.parents.lastName,
                  name: "family.parents.lastName",
                  type: "string",
                  required: true
                },
                {
                  title: "Geslacht ouder",
                  input: currentProfile.family.parents.sex,
                  name: "family.parents.sex",
                  type: "dropdown",
                  options: options.sex,
                  required: true
                },
                {
                  title: "Voogd soort (Vader/Moeder/Tante,etc)",
                  input: currentProfile.family.parents.type,
                  name: "family.parents.type",
                  type: "string",
                  required: true
                },
                {
                  title: "laptop",
                  input: currentProfile.equipment.laptop,
                  name: "equipment.laptop",
                  type: "dropdown_boolean",
                  required: true
                },
                {
                  title: "smartphone",
                  input: currentProfile.equipment.smartphone,
                  name: "equipment.smartphone",
                  type: "dropdown_boolean",
                  required: true
                },
                {
                  title: "tablet",
                  input: currentProfile.equipment.tablet,
                  name: "equipment.tablet",
                  type: "dropdown_boolean",
                  required: true
                },
                {
                  title: "Ontvangen lesmateriaal + datum",
                  input: currentProfile.equipment.lessonMaterial,
                  name: "equipment.lessonMaterial",
                  type: "string",
                  required: true
                },
                {
                  title: "stadpas",
                  input: currentProfile.cityPass,
                  name: "cityPass",
                  type: "dropdown_boolean",
                  required: true
                },
                {
                  title: "bibliotheekpas",
                  input: currentProfile.libraryPass,
                  name: "libraryPass",
                  type: "dropdown_boolean",
                  required: true
                },
                {
                  title: "eigen kamer",
                  input: currentProfile.ownRoom,
                  name: "ownRoom",
                  type: "dropdown_boolean",
                  required: true
                },
                {
                  title: "sport / naschoolse activiteiten",
                  input: currentProfile.afterSchoolActivities,
                  name: "afterSchoolActivities",
                  type: "string",
                },
              ]}
            />
          </div>
        )}
          {dataLoaded && (
          <div className={styles.pageCollumn}>
            <FormElement
              elementTitle="gegevens school / bijles"
              elementBars={[
                {
                  title: "naam school",
                  input: currentProfile.school.name,
                  name: "school.name",
                  type: "string",
                  required: true
                },
                {
                  title: "soort school",
                  input: currentProfile.school.type,
                  name: "school.type",
                  type: "dropdown",
                  options: options.schoolType,
                  required: true
                },
                {
                  title: "richting",
                  input: currentProfile.school.fieldOfStudy,
                  name: "school.fieldOfStudy",
                  type: "dropdown",
                  options: options.schoolFieldOfStudy,
                  required: true
                },
                {
                  title: "Leerjaar (groep/klas)",
                  input: currentProfile.school.schoolYear,
                  name: "school.schoolYear",
                  type: "string",
                  required: true
                },
                {
                  title: "straatnaam",
                  input: currentProfile.school.address.street,
                  name: "school.address.street",
                  type: "string",
                  required: true
                },
                {
                  title: "huisnummer",
                  input: currentProfile.school.address.streetNo,
                  name: "school.address.streetNo",
                  type: "string",
                  required: true
                },
                {
                  title: "postcode",
                  input: currentProfile.school.address.postalCode,
                  name: "school.address.postalCode",
                  type: "string",
                  required: true
                },
                {
                  title: "plaats",
                  input: currentProfile.school.address.city,
                  name: "school.address.city",
                  type: "string",
                  required: true
                },
                {
                  title: "postcode",
                  input: currentProfile.school.address.neighbourhood,
                  name: "school.address.neighbourhood",
                  type: "string",
                  required: true
                },
                {
                  title: "speciaal onderwijs",
                  input: currentProfile.school.specialEducation,
                  name: "school.specialEducation",
                  type: "dropdown_boolean",
                  required: true
                },
                {
                  title: "voorlopig advies (groep 7/8)",
                  input: currentProfile.school.preliminaryAdvise,
                  name: "school.preliminaryAdvise",
                  type: "string",
                },
                {
                  title: "cito-toets score",
                  input: currentProfile.school.citoScore,
                  name: "school.citoScore",
                  type: "string",
                },
                {
                  title: "link kopie rapport",
                  input: currentProfile.school.rapportCopy,
                  name: "school.rapportCopy",
                  type: "string",
                },
                {
                  title: "bijlesdagen",
                  input: currentProfile.lessonSchedule,
                  name: "lessonSchedule",
                  type: "dropdown_multiple",
                  options: options.days,
                  required: true
                },
              ]}
            />
            <FormElement
              elementTitle="incident registratie"
              elementArray={currentProfile.incidents.map((incident) => {
                return incident;
              })}
              currentProfile={currentProfile}
            />
            <FormElement
              elementTitle="aandachtspunten"
              elementArray={currentProfile.attentionPoints.map(
                (aandachtspunt) => {
                  return aandachtspunt;
                }
              )}
              currentProfile={currentProfile}
            />
          </div>
        )}

        {!dataLoaded && <Skeleton variant="rectangular" width={600} height={200} />}
        {!dataLoaded && <Spinner />}
      </main>
      </form>
      <Modal
        modalOpen={saveModal}
        setModalOpen={setSaveModal}
        title="Save"
        input={
          <Save
          setModalOpen={setSaveModal}
          profileID={profileID}
          currentProfile={currentProfile}
          setCurrentPage={setCurrentPage}
          setCurrentTab={setCurrentTab}
          setProfileID={setProfileID}
          setProfiles={setProfiles} />}
      />
      </div>
  );
}
