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
  const [nuclideList, setNuclideList] = React.useState([]);
  const [value, setValue] = React.useState("H");
  const handleChange = e => {
    setValue(e.target.value);
  };

  React.useEffect(() => {
    fetch(`${configs.SERVER_URL}/api/nuclides/getNuclideList`)
      .then(resp => {
        return resp.text();
      })
      .then(text => {
        const textArr = JSON.parse(text);
        let nuclideSet = new Set();
        textArr.forEach(nuclidePair => {
          nuclideSet.add(nuclidePair.nuclide);
        });
        setNuclideList([...nuclideSet]);
      })
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
        value={value}
        onChange={handleChange}
        style={{ width: "100%" }}
      >
        {nuclideList.map(nuclideName => (
          <MaterialUI.MenuItem key={nuclideName} value={nuclideName}>
            {nuclideName}
          </MaterialUI.MenuItem>
        ))}
      </MaterialUI.Select>
    </MaterialUI.FormControl>
  );
}
