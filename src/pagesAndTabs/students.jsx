import styles from "../app/page.module.scss";
import { Spinner } from "@/components/spinner/spinner";

export function Page_Students({ profiles, setProfileID, setCurrentPage, setCurrentTab }) {

  return (
    <main className={styles.mainCentered} style={{paddingTop: "6rem"}}>
        <h1 className="pageTitle" style={{marginBottom: "12px"}}>Studenten</h1>
        <div style={{ display: "flex", flexDirection: "column"}}>

          {!profiles && <Spinner/>}
          {profiles && profiles.list.map((student) =>
            <button
              className="studentBtn"
              key={student.id}
              onClick={()=>{
                setProfileID(student.id)
                setCurrentPage("Analyse")
                setCurrentTab("Profielschets")
              }}
            >
              {student.firstName} {student.lastName}
            </button>
            )}
        </div>
      </main>
  );
}
