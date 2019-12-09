/**
 *  Author: Lester G Dela Cruz
 * 
 *  Description: 
 * 
 */

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
  const { setValue, value } = props;
  const classes = useStyles();
  const formRef = React.useRef();
  const [title, setTitle] = React.useState('Nuclides');
  const [options, setOptions] = React.useState([]);

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

        let newOptions = [...nuclideSet];
        newOptions.sort((a, b) => a.isotop.localeCompare(b.isotop));
        setOptions(newOptions);
      })
      .catch(e => console.log("Error", e));
  }, []);

  React.useEffect(() => {
    if (options.length > 0) setValue(options[0]);
    // eslint-disable-next-line
  }, [options]);

  React.useEffect(() => {
    const onResize = e => {
      const nuclideRect = formRef.current.getBoundingClientRect();
      if (nuclideRect.width < 280) {
        setTitle("");
      } else {
        setTitle("Nuclides")
      }
    }
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)

    }
  }, []);


  return (
    <MaterialUI.FormControl ref={formRef} className={classes.nuclide}>
      <MaterialUI.InputLabel
        className={classes.label}
        id="demo-customized-select-label"
      >
        {title}
      </MaterialUI.InputLabel>

      <MaterialUI.Select
        variant="outlined"
        labelId="demo-customized-select-label"
        id="demo-customized-select"
        value={value.value}
        onChange={e => {
          const value = e.target.value;
          const isotopPair = options.find(op => op.isotop === value);
          setValue(isotopPair);
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
