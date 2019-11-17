import React from "react";
import * as MaterialUI from "@material-ui/core";
import clsx from "clsx";
import GeneralPlume from "./GeneralPlume/GeneralPlume";
import GeneralFire from "./GeneralFire/GeneralFire";

const useStyles = MaterialUI.makeStyles(theme => {
  return {
    controls: {
      height: "100%",
      width: "100%"
    }
  };
});

const LeftControls = props => {
  const { className, onFireShowGraphClick, onPlumeShowGraphClick, onSwitchTabs } = props;
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    onSwitchTabs(newValue);
    setValue(newValue);
  };

  return (
    <MaterialUI.Paper className={clsx(className, classes.controls)} square>
      <div>
        <MaterialUI.Tabs
          value={value}
          indicatorColor="secondary"
          textColor="secondary"
          onChange={handleChange}
          aria-label="disabled tabs example"
        >
          <MaterialUI.Tab label="General Fire" />
          <MaterialUI.Tab label="General Plume" />
        </MaterialUI.Tabs>
        <GeneralFire
          value={value}
          index={0}
          hidden={value === 0 ? false : true}
          onFireClick={onFireShowGraphClick}
        />
        <GeneralPlume
          value={value}
          index={1}
          hidden={value === 1 ? false : true}
          onPlumeClick={onPlumeShowGraphClick}
        />
      </div>
    </MaterialUI.Paper>
  );
};

export default LeftControls;
