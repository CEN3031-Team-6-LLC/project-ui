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
  const [nuclideList, setNuclideList] = React.useState([]);
  const [isotopList, setIsotopList] = React.useState([]);
  const [firstVal, setFirstVal] = React.useState(null);

  console.log("value", value);

  React.useEffect(() => {
    setValue(firstVal);
  }, [firstVal]);

  React.useEffect(() => {
    fetch(`${configs.SERVER_URL}/api/nuclides/getNuclideList`)
      .then(resp => {
        return resp.text();
      })
      .then(text => {
        const textArr = JSON.parse(text);
        let nuclideSet = new Set();
        let isotopSet = new Set();
        textArr.forEach(nuclidePair => {
          nuclideSet.add(nuclidePair.nuclide);
          isotopSet.add(nuclidePair.isotop);
        });

        setFirstVal(textArr[0]);
        let nuclides = [...nuclideSet];
        let isotops = [...isotopSet];
        nuclides.sort();
        isotops.sort();
        setNuclideList(nuclides);
        setIsotopList(isotops);
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
        value={icrp ? value.nuclide : value.isotop}
        onChange={() => {}}
        style={{ width: "100%" }}
      >
        {icrp ? (
          <div>
            {isotopList.map(isotop => {
              return (
                <MaterialUI.MenuItem key={isotop} value={isotop}>
                  {isotop}
                </MaterialUI.MenuItem>
              );
            })}
          </div>
        ) : (
          <div>
            {nuclideList.map(nuclide => {
              return (
                <MaterialUI.MenuItem key={nuclide} value={nuclide}>
                  {nuclide}
                </MaterialUI.MenuItem>
              );
            })}
          </div>
        )}
      </MaterialUI.Select>
    </MaterialUI.FormControl>
  );
}
