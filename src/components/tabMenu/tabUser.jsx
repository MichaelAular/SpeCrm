import "./tabMenu.scss";

export function TabUser({ currentTab, setCurrentTab }) {
  const tab = (title) => {
    return (
      <div
      className="tab prevent-select"
      style={{
        color: currentTab === title && "rgb(var(--secundair))",
        backgroundColor: currentTab === title && "rgb(var(--white07))",
        fontWeight: currentTab === title && 600,
    }}
      onClick={()=>{setCurrentTab(title)}}
      >
        {title}
      </div>
    );
  };
  return (
    <div className="tabMenuContainer">
      {tab("NAW")}
      {tab("Uren")}
    </div>
  );
}
