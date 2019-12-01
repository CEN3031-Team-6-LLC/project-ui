import React from "react";
import { configs } from "configs";
import { RadioButtons } from "CustomWidgets";

const LungClass = props => {
  const { isotope, onChange, value } = props;
  const [options, setOptions] = React.useState([]);
  React.useEffect(() => {
    fetch(
      `${configs.SERVER_URL}/api/nuclides/getNuclidesLungClasses/${isotope}`
    )
      .then(resp => resp.text())
      .then(text => {
        const textArr = JSON.parse(text);
        const newOptions = textArr.map(t => ({ value: t, label: t }));
        console.log("New options", newOptions);
        setOptions(newOptions);
      })
      .catch(e => console.log(e));
  }, [isotope]);
  return (
    <RadioButtons
      title="Lung Class"
      options={options}
      onChange={onChange}
      value={value}
    />
  );
};

export default LungClass;
