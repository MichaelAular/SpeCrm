import styles from "../app/page.module.scss";
import { Employee_naw } from "@/components/employee_naw/employee_naw";

export function Page_User({ currentTab }) {
  const uid = sessionStorage.getItem('user');
  console.log(uid);

  return (
    <div>
      <div
        className={styles.textContainer}
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingRight: "10px",
        }}
      >
        <h1 className="pageTitle">Werknemer</h1>
      </div>
      <main className={styles.evaluatieScheme} >
        {currentTab === "NAW" && <Employee_naw/>}
      </main>
    </div>
  );
}
