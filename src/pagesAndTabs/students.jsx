import { BasicTable } from "@/components/table/table";
import Container from '@mui/material/Container';

export function Page_Students({ profiles, setProfileID, setCurrentPage, setCurrentTab }) {

  return (
    <Container maxWidth="md">
      <h1>Leerlingenlijst</h1>
      <BasicTable
        profiles={profiles}
        setProfileID={setProfileID}
        setCurrentPage={setCurrentPage}
        setCurrentTab={setCurrentTab}
      />
    </Container>
  );
}
