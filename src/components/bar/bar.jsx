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
  required
}) {

  return (
    <div
      className="bar"
      style={{maxHeight: (type === "string_FH" || type === "string_auto" || type === "string_auto_mfs") && input && "none"}}
    >
      <h5 className="barTitle">{useCapitalize(title)}</h5>
      { type === "date" && input && <Datepicker required={required} input={input} name={name} /> }
      { type === "dropdown" && <Dropdown required={required} options={options} input={input} title={title} name={name}/> }
      { type === "dropdown_boolean" && <DropdownBoolean required={required} options={["ja", "nee"]} input={(input === true || input == "ja") ? "ja" : "nee"} title={title} name={name} /> }
      { type === "dropdown_multiple" && <DropdownMultiple required={required} options={options} input={input} title={title} name={name}/> }
      { type === "string" && !input && <input required={required} className="inputEmpty" placeholder={`vul ${title} in...`} name={name} /> }
      { type === "string" && input && <input required={required} className="inputGiven" defaultValue={input} name={name} /> }
      { type === "string_auto" && input &&  <AutoComplete required={required} options={options} input={input} multi={false} fs={false} name={name} /> }
      { type === "string_auto_mfs" && <AutoComplete required={required} options={options} input={input} multi={true} fs={true} name={name} /> }
      { type === "string_FH" && !input && <input required={required} className="inputEmpty" placeholder={`vul ${title} in...`} name={name} /> }
      { type === "string_FH" && input && <input required={required} className="inputGiven" defaultValue={input} name={name} /> }
      { type === "string_readOnly" && !input && <input required={required} className="inputGiven" defaultValue={0} name={name} readOnly/> }
      { type === "string_readOnly" && input !== 0 && <input required={required} className="inputGiven" defaultValue={input} name={name} readOnly/> }
    </div>
  );
}
