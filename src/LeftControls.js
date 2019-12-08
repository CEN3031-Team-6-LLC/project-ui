import React from "react";
import * as MaterialUI from "@material-ui/core";
import clsx from "clsx";
import GeneralPlume from "./GeneralPlume/GeneralPlume";
import GeneralFire from "./GeneralFire/GeneralFire";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFireAlt, faCloudMeatball } from "@fortawesome/free-solid-svg-icons";

const useStyles = MaterialUI.makeStyles(theme => {
  return {
    controls: {
      height: "100%",
      width: "100%",
      overflowY: "scroll"
    },
    leftControlTabs: {
      width: "100%"
    }
  };
});

const LeftControls = props => {
  const {
    className,
    onFireShowGraphClick,
    onPlumeShowGraphClick,
    onSwitchTabs
  } = props;
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [generalFire, setGeneralFire] = React.useState("General Fire");
  const [generalPlume, setGeneralPlume] = React.useState("General Plume");

  const leftControlRef = React.useRef();

  const handleChange = (event, newValue) => {
    onSwitchTabs(newValue);
    setValue(newValue);
  };

  React.useEffect(() => {
    const checkLeftControlWidth = () => {
      const leftControlRect = leftControlRef.current.getBoundingClientRect();
      if (leftControlRect.width < 320) {
        setGeneralFire("");
        setGeneralPlume("");
      } else {
        setGeneralFire("General Fire");
        setGeneralPlume("General Plume");
      }
    };

    checkLeftControlWidth();

    window.addEventListener("resize", e => {
      checkLeftControlWidth();
    });
  });

  return (
    <MaterialUI.Paper className={clsx(className, classes.controls)} square>
      <div ref={leftControlRef}>
        <MaterialUI.Tabs
          value={value}
          className={classes.leftControlTabs}
          indicatorColor="secondary"
          textColor="secondary"
          onChange={handleChange}
          aria-label="disabled tabs example"
        >
          <MaterialUI.Tab
            label={generalFire}
            fullWidth
            icon={<FontAwesomeIcon icon={faFireAlt} />}
          />
          <MaterialUI.Tab
            label={generalPlume}
            fullWidth
            icon={<FontAwesomeIcon icon={faCloudMeatball} />}
          />
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
