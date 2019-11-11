import React from "react";
import * as MaterialUI from "@material-ui/core";
import * as CustomWidgets from "../CustomWidgets";

const useStyles = MaterialUI.makeStyles(theme => {
  return {
    generalFire: {
      height: "100vh",
      padding: 20
    }
  };
});

const GeneralFire = props => {
  const { onClick } = props;
  const classes = useStyles();
  const [state, setState] = React.useState({
    sourceAmount: 0,
    fireCloudTop: 0,
    windSpeed: 0,
    receptorHeights: 0,
    stability: "a"
  });

  return (
    <MaterialUI.Paper {...props} square className={classes.generalFire}>
      <CustomWidgets.InputField
        placeholder="Source Amount"
        unit="Ci"
        unitTogglelable={true}
        unit2="Bq"
        onChange={e => {
          setState({ ...state, sourceAmount: window.parseInt(e.target.value) });
        }}
      />
      <CustomWidgets.InputField
        placeholder="Fire Cloud Top"
        unit="m"
        onChange={e => {
          setState({ ...state, fireCloudTop: window.parseInt(e.target.value) });
        }}
      />
      <CustomWidgets.InputField
        placeholder="Wind Speed"
        unit="m/s"
        onChange={e => {
          setState({ ...state, windSpeed: window.parseInt(e.target.value) });
        }}
      />
      <CustomWidgets.InputField
        placeholder="Receptor Heights"
        unit="m"
        onChange={e => {
          setState({
            ...state,
            receptorHeights: window.parseInt(e.target.value)
          });
        }}
      />
      <CustomWidgets.RadioButtons
        title="Stability"
        options={[
          { value: "a", label: "A" },
          { value: "b", label: "B" },
          { value: "c", label: "C" },
          { value: "d", label: "D" }
        ]}
        onChange={e => {
          setState({ ...state, stability: e.target.value });
        }}
        value={state.stability}
      />
      <MaterialUI.Button
        variant="contained"
        onClick={() => {
          console.log("da", state);
          onClick(state);
        }}
      >
        Show Graph
      </MaterialUI.Button>
    </MaterialUI.Paper>
  );
};

export default GeneralFire;
