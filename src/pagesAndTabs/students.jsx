import styles from "../app/page.module.scss";

export function Page_Students({ profiles, setProfileID, setCurrentPage, setCurrentTab }) {

  return (
    <div>
      <div className={styles.textContainer} />

      <main className={styles.main}>
      <h1 className="pageTitle" style={{marginBottom: "12px"}}>Studenten</h1>
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
      </main>
    </div>
  );
}
