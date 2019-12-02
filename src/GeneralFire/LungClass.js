import React from "react";
import { configs } from "configs";
import { RadioButtons } from "CustomWidgets";

const LungClass = props => {
  const { isotope, onChange, icrp, value } = props;
  const [options, setOptions] = React.useState([]);
  React.useEffect(() => {
    if (isotope.length > 0) {
      let lungClassUrl = `${configs.SERVER_URL}/api/nuclides/getNuclidesLungClasses/${isotope}`;
      if (icrp) {
        lungClassUrl = `${configs.SERVER_URL}/api/nuclides/getNuclidesICRPLungClass/${isotope}`;
      }
      fetch(lungClassUrl)
        .then(resp => {
          return resp.text();
        })
        .then(text => {
          let textArr;
          if (icrp) {
            setOptions([{ value: text, label: text }]);
          } else {
            textArr = JSON.parse(text);
            const newOptions = textArr.map(t => ({ value: t, label: t }));
            setOptions(newOptions);
          }
        })
        .catch(e => console.log("you are the one", e));
    }
  }, [isotope, icrp]);

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
