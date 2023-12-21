import styles from "../../app/page.module.scss";
import { FormEmelent } from "@/components/formElement/formElement";
import data from "../../../crm_DB.json"
import options from "../../../dropdownOptions.json"


export function Tab_Profiel() {

  /// data email ouder liever naar boven?
  /// geen data voor tel vast
  /// geen data voor gegevens CP van van noodnummer plus relatie tot kind
  /// persoonlijke vraag: geen tel en email ed van school???
  /// kopie rapport bespreken (document zelf!)

  return (
    <div>
      <div className={styles.textContainer}>
        <h1 className="pageTitle">profielschets</h1>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus omnis
        accusantium ratione iusto. Pariatur ratione possimus, odio nam
        repellendus praesentium, vitae quibusdam ducimus minus consequuntur,
        laboriosam neque consectetur. Repellat, rem.
      </div>

      <main className={styles.main}>
        <div className={styles.pageCollumn}>
          <FormEmelent
            elementTitle="gegevens kind"
            elementBars={[
              { title: "achternaam", input: data.lastName, type: "string" },
              { title: "roepnaam", input: data.nickName, type: "string" },
              { title: "voornaam", input: data.firstName, type: "string" },
              { title: "geslacht", input: data.sex, type: "dropdown", options: options.sex },
              { title: "geboortedatum", input: data.birthDate, type: "date" },
              { title: "leeftijd", input: data.birthDate, type: "age" },
              { title: "straatnaam", input: data.address.street, type: "string" },
              { title: "huisnummer", input: data.address.streetNo, type: "string" },
              { title: "postcode", input: data.address.postalCode, type: "string" },
              { title: "plaats", input: data.address.city, type: "string" },
              { title: "buurt / wijk", input: data.address.district, type: "string" },
              { title: "e-mailadres kind", input: data.email, type: "string" },
              { title: "e-mailadres ouder", input: data.family.parents[0].email, type: "string" },
              { title: "geboorteland", input: data.countryOfBirth, type: "string" },
              { title: "nationaliteit", input: data.nationality, type: "string" },
              { title: "thuistaal", input: data.languages, type: "string" },
              { title: "telefoon vast", input: '', type: "string" },
              { title: "telefoon mobiel", input: data.family.mobileNo, type: "string" },
              { title: "telefoon bij nood", input: data.family.emergencyNo, type: "string" },
              { title: "nood contactpersoon", input: "", type: "string" },
              { title: "aantal kinderen in het gezin", input: data.family.noOfChildren, type: "string" },
              { title: "stadpas", input: data.cityPass, type: "dropdown_boolean" },
              { title: "bibliotheekpas", input: data.libraryPass, type: "dropdown_boolean" },
              { title: "eigen kamer", input: data.ownRoom, type: "dropdown_boolean" },
              { title: "laptop", input: data.equipment.laptop, type: "dropdown_boolean" },
              { title: "tablet", input: data.equipment.tablet, type: "dropdown_boolean" },
              { title: "smartphone", input: data.equipment.smartphone, type: "dropdown_boolean" },
              { title: "sport / naschoolse activiteiten", input: data.afterSchoolActivities, type: "string" },
            ]}
          />
        </div>

        <div className={styles.pageCollumn}>
          <FormEmelent
            elementTitle="gegevens school / bijles"
            elementBars={[
              { title: "soort school", input: data.school.type, type: "dropdown", options: ["Basis school", "Middelbare school", "Voortgezet onderwijs"] },
              { title: "naam school", input: data.school.name, type: "string" },
              { title: "richting", input: data.school.fieldOfStudy, type: "dropdown", options: ["VMBO", "Mavo/Havo", "VWO"] },
              { title: "leerjaar", input: data.school.schoolYear, type: "string" },
              { title: "straatnaam", input: data.school.address.street, type: "string" },
              { title: "huisnummer", input: data.school.address.streetNo, type: "string" },
              { title: "postcode", input: data.school.address.postalCode, type: "string" },
              { title: "plaats", input: data.school.address.city, type: "string" },
              { title: "Buurt / wijk", input: data.school.address.district, type: "string" },
              { title: "speciaal onderwijs", input: data.school.specialEducation, type: "dropdown_boolean" },
              { title: "voorlopig advies (groep 7/8)", input: data.school.preliminaryAdvise, type: "string" },
              { title: "cito-toets score", input: data.school.citoScore, type: "string" },
              { title: "link kopie rapport", input: data.school.rapportCopy, type: "string" },
              { title: "bijlesdagen", input: data.daysOfLessons, type: "dropdown_multiple", options: options.days },
            ]}
          />
          <FormEmelent
            elementTitle="incident registratie"
            elementArray= {data.incidents.map((incident)=>{return incident})}
            add={true}
          />
          <FormEmelent
            elementTitle="aandachtspunten"
            elementBars={[
              { title: "omschrijving", input: "", type: "string" },
              { title: "plan van aanpak", input: "", type: "string" },
              { title: "afspraken", input: "", type: "string" },
            ]}
          />
        </div>
      </main>
    </div>
  );
}
