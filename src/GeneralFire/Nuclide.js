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
  const classes = useStyles();
  const age = 20;
  const handleChange = e => {};

  React.useEffect(() => {
    fetch(`${configs.SERVER_URL}/api/nuclides/getNuclideList`)
      .then(resp => {
        return resp.text();
      })
      .then(text => console.log(text))
      .catch(e => console.log("Error", e));
  }, []);

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
        value={age}
        onChange={handleChange}
        style={{ width: "100%" }}
      ></MaterialUI.Select>
    </MaterialUI.FormControl>
  );
}
