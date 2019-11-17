import React from "react";
import * as MaterialUI from "@material-ui/core";
import * as CustomWidgets from "../CustomWidgets";

const useStyles = MaterialUI.makeStyles(theme => {
  return {
    generalPlume: {
      height: "100%",
      padding: 20
    }
  };
});

const GeneralPlume = props => {
  const { onPlumeClick } = props;
  const classes = useStyles();
  const [state, setState] = React.useState({
    sourceAmount: 0,
    releaseHeight: 0,
    windSpeed: 0,
    receptorHeight: 0,
    stability: "a"
  });

  return (
    <div {...props} className={classes.generalPlume}>
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
        placeholder="Release Height"
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
      <MaterialUI.Button variant="contained" onClick={() => onPlumeClick(state)}>
        Show Graph
      </MaterialUI.Button>
    </div>
  );
};

export default GeneralPlume;
