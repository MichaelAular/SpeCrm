import "./bar.scss";
import { Dropdown } from "../dropdown/dropdown";
import { DropdownMultiple } from "../dropdown/dropdown_multiple";
import { DropdownBoolean } from "../dropdown/dropdown_boolean";
import { Datepicker } from "../datePicker/datePicker";
import { useCapitalize } from "@/hooks/capitalize";
import { AutoComplete } from "../autocomplete/autocomplete";

export function Bar({
  input,
  name,
  options,
  title,
  type,
}) {

  return (
    <div
      className="bar"
      style={{maxHeight: (type === "string_FH" || type === "string_auto" || type === "string_auto_mfs") && input && "none"}}
    >
      <h5 className="barTitle">{useCapitalize(title)}</h5>
      { type === "date" && input && <Datepicker input={input} name={name} /> }
      { type === "dropdown" && <Dropdown options={options} input={input} title={title} name={name}/> }
      { type === "dropdown_boolean" && <DropdownBoolean options={["ja", "nee"]} input={(input === true || input === "ja") ? "ja" : "nee"} title={title} name={name} /> }
      { type === "dropdown_multiple" && <DropdownMultiple options={options} input={input} title={title} name={name}/> }
      { type === "string" && !input && <input className="inputEmpty" placeholder={`vul ${title} in...`} name={name} /> }
      { type === "string" && input && <input className="inputGiven" defaultValue={input} name={name} /> }
      { type === "string_auto" && input &&  <AutoComplete options={options} input={input} multi={false} fs={false} name={name} /> }
      { type === "string_auto_mfs" && <AutoComplete options={options} input={input} multi={true} fs={true} /> }
      { type === "string_FH" && input && <input className="inputGiven" defaultValue={input} name={name} /> }
      { type === "string_readOnly" && input && <input className="inputGiven" defaultValue={input} name={name} readOnly/> }
    </div>
  );
}
