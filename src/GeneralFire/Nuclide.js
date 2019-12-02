import React from "react";
import * as MaterialUI from "@material-ui/core";
import { configs } from "../configs";

const useStyles = MaterialUI.makeStyles(theme => {
  return {
    nuclide: {
      display: "block",
      width: "100%",
      marginBottom: 20
    },
    label: {
      transform: "translate(10px, 20px)"
    }
  };
});

export default function Nuclide(props) {
  const { setValue, value, icrp } = props;
  const classes = useStyles();
  const [options, setOptions] = React.useState([]);

  console.log("Nuclide value", value);
  console.log("Nuclide value value", value.value);
  React.useEffect(() => {
    fetch(`${configs.SERVER_URL}/api/nuclides/getNuclideList`)
      .then(resp => {
        return resp.text();
      })
      .then(text => {
        const textArr = JSON.parse(text);
        let nuclideSet = new Set();
        textArr.forEach(nuclidePair => {
          nuclideSet.add(nuclidePair);
        });

        // TODO: Figure out why this isn't sorting correctly
        let newOptions = [...nuclideSet];
        newOptions.sort((a, b) => a.isotop.localeCompare(b.isotop));
        setOptions(newOptions);
      })
      .catch(e => console.log("Error", e));
  }, [icrp]);

  return (
    <MaterialUI.FormControl className={classes.nuclide}>
      <MaterialUI.InputLabel
        className={classes.label}
        id="demo-customized-select-label"
      >
        Nuclides
      </MaterialUI.InputLabel>

      <MaterialUI.Select
        variant="outlined"
        labelId="demo-customized-select-label"
        id="demo-customized-select"
        value={value.value}
        onChange={e => {
          const value = e.target.value;
          console.log("new value", value);
        }}
        style={{ width: "100%" }}
      >
        {options.map(option => {
          return (
            <MaterialUI.MenuItem key={option.isotop} value={option.isotop}>
              {option.isotop}
            </MaterialUI.MenuItem>
          );
        })}
      </MaterialUI.Select>
    </MaterialUI.FormControl>
  );
}
