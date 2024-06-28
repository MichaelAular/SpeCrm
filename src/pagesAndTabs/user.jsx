import { Employee_naw } from "@/components/employee_naw/employee_naw";

export function Page_User({ currentTab }) {

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingRight: "10px",
        }}
      >
        <h1>Werknemer</h1>
      </div>
      <main>
        {currentTab === "NAW" && <Employee_naw/>}
      </main>
    </div>
  );
}
