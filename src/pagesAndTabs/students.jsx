import styles from "../app/page.module.scss";
import { Spinner } from "@/components/spinner/spinner";
import { BasicTable } from "@/components/table/table";

export function Page_Students({ profiles, setProfileID, setCurrentPage, setCurrentTab }) {

  return (
    <main className={styles.mainCentered} style={{paddingTop: "6rem"}}>
        <h1 className="pageTitle" style={{marginBottom: "12px"}}>Leerlingenlijst</h1>
        <div style={{ display: "flex", flexDirection: "column"}}>
          {!profiles && <Spinner/>}
          {profiles && <BasicTable
            profiles={profiles}
            setProfileID={setProfileID}
            setCurrentPage={setCurrentPage}
            setCurrentTab={setCurrentTab}
            />}
        </div>
      </main>
  );
}
