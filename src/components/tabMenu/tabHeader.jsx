import "./tabMenu.scss";

export function TabHeader({ currentTab, setCurrentTab }) {
  const Scroll =()=> ScrollBack()
  const tab = (title) => {
    return (
      <div
      className="tab prevent-select"
      style={{
        color: currentTab === title && "rgb(var(--secundair))",
        backgroundColor: currentTab === title && "rgb(var(--white07))",
        fontWeight: currentTab === title && 600,
    }}
      onClick={()=>{
        setCurrentTab(title)
        window.scrollTo(0, 0)
      }}
      >
        {title}
      </div>
    );
  };
  return (
    <div className="tabMenuContainer">
      {tab("Profielschets")}
      {tab("Evaluatie")}
      {tab("Voortgang")}
    </div>
  );
}
