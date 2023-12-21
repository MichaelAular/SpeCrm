import "./header.scss";
import { Searchbar } from "../searchbar/searchbar";
import { TabMenu } from "../tabMenu/tabMenu";

export function Header({ currentTab, setCurrentTab }) {
  return (
    <div className="headerContainer">
      <div className="header">
        <TabMenu currentTab={currentTab} setCurrentTab={setCurrentTab} />
        <Searchbar/>
      </div>
    </div>
  );
}
