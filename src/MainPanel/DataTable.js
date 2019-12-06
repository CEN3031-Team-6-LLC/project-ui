import React from "react";
import * as MaterialUI from "@material-ui/core";
import moment from "moment";

const useStyles = MaterialUI.makeStyles(theme => {
  return {
    datasheet: {
      overflowY: "scroll",
      maxHeight: "100%"
    }
  };
});

const DataTable = props => {
  const { data } = props;
  console.log("data", data);
  const classes = useStyles();
  return (
    <MaterialUI.Paper className={classes.datasheet}>
      <MaterialUI.Table stickyHeader aria-label="simple table">
        <MaterialUI.TableHead>
          <MaterialUI.TableRow>
            <MaterialUI.TableCell>
              Distance From Source (m or ft)
            </MaterialUI.TableCell>
            <MaterialUI.TableCell align="right">
              Concentration
            </MaterialUI.TableCell>
            <MaterialUI.TableCell align="right">
              Dose (Ci or Bq)
            </MaterialUI.TableCell>
            <MaterialUI.TableCell align="right">
              Arrival Time (h:m:s)
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
                      {moment(0)
                        .set("hours", 0)
                        .add("seconds", d.arrivalTime)
                        .format("HH:mm:ss.SSSS")}
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
