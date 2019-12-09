import { configs } from "./configs";
import moment from 'moment';

export const exportData = ({ body, type }) => {
  return new Promise((accept, reject) => {
    fetch(`${configs.SERVER_URL}/api/export/${type}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": configs.UI_URL,
        "Access-Control-Request-Method": "POST"
      },
      body: JSON.stringify(body)
    })
      .then(resp => resp.text().then(text => {
        const urlPreHeaders = "data:text/csv;charset=utf-8,";
        const csvUrl = urlPreHeaders + text;
        const encodedCSVURI = encodeURI(csvUrl);
        var link = document.createElement("a");
        link.setAttribute("href", encodedCSVURI);
        link.setAttribute("download", `${type}_export_${moment().format("DD_MMM_YYYY_HH:mm:ss")}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        accept('Exporting')
      }))
      .catch(e => {
        reject(e);
      });
  });
};