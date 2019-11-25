import React from "react";
import * as MaterialUI from "@material-ui/core";

const useStyles = MaterialUI.makeStyles(theme => {
  return {
    datasheet: {
      maxHeight: 450,
      overflowY: "scroll"
    }
  };
});

const DataTable = props => {
  const { data } = props;
  const classes = useStyles();
  return (
    <MaterialUI.Paper className={classes.datasheet}>
      <MaterialUI.Table aria-label="simple table">
        <MaterialUI.TableHead>
          <MaterialUI.TableRow>
            <MaterialUI.TableCell>Distance From Source</MaterialUI.TableCell>
            <MaterialUI.TableCell align="right">
              Concentration
            </MaterialUI.TableCell>
          </MaterialUI.TableRow>
        </MaterialUI.TableHead>
        <MaterialUI.TableBody>
          {data
            ? data.map((d, i) => {
                if (i % 100 === 0) {
                  return (
                    <MaterialUI.TableRow key={i}>
                      <MaterialUI.TableCell component="th" scope="row">
                        {d.distance}
                      </MaterialUI.TableCell>
                      <MaterialUI.TableCell align="right">
                        {d.concentration}
                      </MaterialUI.TableCell>
                    </MaterialUI.TableRow>
                  );
                } else {
                  return null;
                }
              })
            : null}
        </MaterialUI.TableBody>
      </MaterialUI.Table>
    </MaterialUI.Paper>
  );
};

export default DataTable;
