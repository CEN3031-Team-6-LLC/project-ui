import React from "react";
import * as MaterialUI from "@material-ui/core";
import { configs } from "../configs";

export default function Nuclide(props) {
  const age = 20;
  const handleChange = e => {};

  React.useEffect(() => {
    fetch(`${configs.SERVER_URL}/api/nuclides/getNuclideList`)
      .then(resp => {
        console.log("Nuclide results", resp);
      })
      .catch(e => console.log("Error", e));
  }, []);

  return (
    <MaterialUI.FormControl>
      <MaterialUI.InputLabel id="demo-customized-select-label">
        Nuclides
      </MaterialUI.InputLabel>
      <MaterialUI.Select
        labelId="demo-customized-select-label"
        id="demo-customized-select"
        value={age}
        onChange={handleChange}
      ></MaterialUI.Select>
    </MaterialUI.FormControl>
  );
}
