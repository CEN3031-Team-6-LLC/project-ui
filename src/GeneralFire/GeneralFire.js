import React from "react";
import * as MaterialUI from "@material-ui/core";
import * as CustomWidgets from "../CustomWidgets";

const useStyles = MaterialUI.makeStyles(theme => {
  return {
    generalFire: {
      height: "100%",
      padding: 20,
      overflowY: "scroll"
    }
  };
});

const GeneralFire = props => {
  const { onFireClick } = props;
  const classes = useStyles();
  const [state, setState] = React.useState({
    sourceAmount: 0,
    fireCloudTop: 0,
    windSpeed: 0,
    receptorHeight: 0,
    fireRadius: 0,
    stability: "a"
  });

  return (
    <div {...props} className={classes.generalFire}>
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
        placeholder="Receptor Height"
        unit="m"
        onChange={e => {
          setState({
            ...state,
            receptorHeight: window.parseInt(e.target.value)
          });
        }}
      />
      <CustomWidgets.InputField
        placeholder="Fire Radius"
        unit="m"
        onChange={e => {
          setState({
            ...state,
            fireRadius: window.parseInt(e.target.value)
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
      <MaterialUI.Button variant="contained" onClick={() => onFireClick(state)}>
        Show Graph
      </MaterialUI.Button>
    </div>
  );
};

export default GeneralFire;
