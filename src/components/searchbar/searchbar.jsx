import "./searchbar.scss";
import { AutoComplete } from "../autocomplete/autocomplete";

export function Searchbar({
  profiles,
  setProfileID,
  profileID,
  setCurrentPage,
  setCurrentTab,
 }) {
  let options = [];
  let input = `${profiles.list[0].firstName} ${profiles.list[0].lastName}`;

  for (let i = 0; i < profiles.list.length; i++) {
    options.push({
      label: `${profiles.list[i].firstName} ${profiles.list[i].lastName}`,
      id: `${profiles.list[i].id}`,
    });
  }

  return (
    <div className="searchbarContainer">
      <AutoComplete
        options={options.map((option) => option.label)}
        input={input}
        fullOptions={options}
        setProfileID={setProfileID}
        profileID={profileID}
        setCurrentPage={setCurrentPage}
        setCurrentTab={setCurrentTab}
      />
    </div>
  );
}
