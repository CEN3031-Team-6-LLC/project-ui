import React from "react";
import * as MaterialUI from "@material-ui/core";
import moment from "moment";

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
  console.log("data", data);
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
                return (
                  <MaterialUI.TableRow key={d.distance}>
                    <MaterialUI.TableCell component="th" scope="row">
                      {d.distance}
                    </MaterialUI.TableCell>
                    <MaterialUI.TableCell align="right">
                      {d.concentration}
                    </MaterialUI.TableCell>
                    <MaterialUI.TableCell align="right">
                      {d.dose}
                    </MaterialUI.TableCell>
                    <MaterialUI.TableCell align="right">
                      {moment()
                        .add("seconds", d.arrivalTime)
                        .format("HH:mm:ss")}
                    </MaterialUI.TableCell>
                  </MaterialUI.TableRow>
                );
              })
            : null}
        </MaterialUI.TableBody>
      </MaterialUI.Table>
    </MaterialUI.Paper>
  );
};

export default DataTable;
