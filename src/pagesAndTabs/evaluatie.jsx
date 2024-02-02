import styles from "../app/page.module.scss";
import { EvaluatieInput } from "@/components/evaluatieInput/evaluatieInput";
import { EvaluatieWeek } from "@/components/evaluatieWeek/evaluatieWeek";

export function Tab_Evaluatie() {

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
        <h1 className="pageTitle">Evaluatie</h1>
      </div>
      <main className={styles.evaluatieScheme}>
        <EvaluatieInput />
        <EvaluatieWeek weekNr="01" />
      </main>
    </div>
  );
}
