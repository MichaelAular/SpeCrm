import React, {useState} from "react";
import { FormElement } from "@/components/formElement/formElement";
import { Spinner } from "@/components/spinner/spinner";
import options from "../../dropdownOptions.json";
import Skeleton from "@mui/material/Skeleton";
import styles from "../app/page.module.scss";

export function Tab_Profiel({ currentProfile, dataLoaded }) {
  var formJson;

  const dateFormatter = (input) => {
    const formattedDays = input.split(" ")[0].split("-");
    const convertedDate = new Date(
      formattedDays[2],
      formattedDays[1] - 1,
      formattedDays[0]
      ).getTime();
      return convertedDate;
    };

    const getAge = (input, source) => {
      /// check epoch!! nog aanpassen!
      const epoch = source === "epoch" ? dateFormatter(input) : input;
      const other_date = new Date(epoch).getTime();
      const difference = Math.abs(new Date().getTime() - other_date);
      const days = Math.abs(difference / (1000 * 3600 * 24));
      const years = Math.floor(days / 365.25);
      return years;
    };

  const [age, setAge] = useState(getAge(currentProfile.birthDate.toDate(), "date"));
  const [birthDate, setBirthDate] = useState(new Date(currentProfile.birthDate.toDate()));

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    formJson = Object.fromEntries(formData.entries());
    setAge(getAge(formJson.birthDate, "epoch"));
    setBirthDate(dateFormatter(formJson.birthDate));
    console.log("formJson:", formJson)
  };

  return (
    <form
      className="tabProfielContainer"
      method="post"
      onSubmit={handleSubmit}
    >
      <div className={styles.textContainer}>
        <h1 className="pageTitle">profielschets</h1>
      </div>

      <main className={styles.main}>
        {dataLoaded && (
          <div className={styles.pageCollumn}>
            <FormElement
              elementTitle="gegevens kind"
              elementBars={[
                {
                  title: "voornaam",
                  input: currentProfile.firstName,
                  name: "firstName",
                  type: "string",
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
                },
                {
                  title: "geslacht",
                  input: currentProfile.sex,
                  name: "sex",
                  type: "dropdown",
                  options: options.sex,
                },
                {
                  title: "geboortedatum",
                  input: birthDate,
                  name: "birthDate",
                  type: "date",
                },
                {
                  title: "leeftijd",
                  input: age,
                  name: "age",
                  type: "string_noInput",
                },
                {
                  title: "straatnaam",
                  input: currentProfile.address.street,
                  name: "address.street",
                  type: "string",
                },
                {
                  title: "huisnummer",
                  input: currentProfile.address.streetNo,
                  name: "address.streetNo",
                  type: "string",
                },
                {
                  title: "postcode",
                  input: currentProfile.address.postalCode,
                  name: "address.postalCode",
                  type: "string",
                },
                {
                  title: "plaats",
                  input: currentProfile.address.city,
                  name: "address.city",
                  type: "string",
                },
                {
                  title: "e-mailadres kind",
                  input: currentProfile.email,
                  name: "email",
                  type: "string",
                },
                {
                  title: "e-mailadres ouder",
                  input: currentProfile.family.parents[0].email,
                  name: "family.parents[0].email",
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
                },
                {
                  title: "thuistaal",
                  input: currentProfile.languages,
                  name: "languages",
                  type: "dropdown_multiple",
                  options: options.languages,
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
                },
                {
                  title: "telefoon bij nood",
                  input: currentProfile.family.contactDetails.phoneNoEmergency,
                  name: "family.contactDetails.phoneNoEmergency",
                  type: "string",
                },
                {
                  title: "nood contactpersoon",
                  input: currentProfile.family.contactDetails.name,
                  name: "family.contactDetails.name",
                  type: "string",
                },
                {
                  title: "nood e-mailadres",
                  input: currentProfile.family.contactDetails.email,
                  name: "family.contactDetails.email",
                  type: "string",
                },
                {
                  title: "aantal kinderen in het gezin",
                  input: currentProfile.family.noOfChildren,
                  name: "family.noOfChildren",
                  type: "string",
                },
                {
                  title: "sport / naschoolse activiteiten",
                  input: currentProfile.afterSchoolActivities,
                  name: "afterSchoolActivities",
                  type: "string",
                },
                {
                  title: "stadpas",
                  input: currentProfile.cityPass,
                  name: "cityPass",
                  type: "dropdown_boolean",
                },
                {
                  title: "bibliotheekpas",
                  input: currentProfile.libraryPass,
                  name: "libraryPass",
                  type: "dropdown_boolean",
                },
                {
                  title: "eigen kamer",
                  input: currentProfile.ownRoom,
                  name: "ownRoom",
                  type: "dropdown_boolean",
                },
                {
                  title: "laptop",
                  input: currentProfile.equipment.laptop,
                  name: "equipment.laptop",
                  type: "dropdown_boolean",
                },
                {
                  title: "tablet",
                  input: currentProfile.equipment.tablet,
                  name: "equipment.tablet",
                  type: "dropdown_boolean",
                },
                {
                  title: "smartphone",
                  input: currentProfile.equipment.smartphone,
                  name: "equipment.smartphone",
                  type: "dropdown_boolean",
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
                  title: "soort school",
                  input: currentProfile.school.type,
                  name: "school.type",
                  type: "dropdown",
                  options: options.schoolType,
                },
                {
                  title: "naam school",
                  input: currentProfile.school.name,
                  name: "school.name",
                  type: "string",
                },
                {
                  title: "richting",
                  input: currentProfile.school.fieldOfStudy,
                  name: "school.fieldOfStudy",
                  type: "dropdown",
                  options: options.schoolFieldOfStudy,
                },
                {
                  title: "leerjaar",
                  input: currentProfile.school.schoolYear,
                  name: "school.schoolYear",
                  type: "string",
                },
                {
                  title: "straatnaam",
                  input: currentProfile.school.address.street,
                  name: "school.address.street",
                  type: "string",
                },
                {
                  title: "huisnummer",
                  input: currentProfile.school.address.streetNo,
                  name: "school.address.streetNo",
                  type: "string",
                },
                {
                  title: "postcode",
                  input: currentProfile.school.address.postalCode,
                  name: "school.address.postalCode",
                  type: "string",
                },
                {
                  title: "plaats",
                  input: currentProfile.school.address.city,
                  name: "school.address.city",
                  type: "string",
                },
                {
                  title: "speciaal onderwijs",
                  input: currentProfile.school.specialEducation,
                  name: "school.specialEducation",
                  type: "dropdown_boolean",
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
                },
              ]}
            />
            <FormElement
              elementTitle="incident registratie"
              elementArray={currentProfile.incidents.map((incident) => {
                return incident;
              })}
            />
            <FormElement
              elementTitle="aandachtspunten"
              elementArray={currentProfile.attentionPoints.map(
                (aandachtspunt) => {
                  return aandachtspunt;
                }
              )}
            />
          </div>
        )}
        {!dataLoaded && (
          <Skeleton variant="rectangular" width={600} height={200} />
        )}
        {!dataLoaded && <Spinner />}
      </main>
    </form>
  );
}
