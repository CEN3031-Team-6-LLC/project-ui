/**
 *  Author: Lester G Dela Cruz
 * 
 *  Description: 
 * 
 */

import { configs } from "./configs";

export const post = ({ body, type }) => {
  return new Promise((accept, reject) => {
    fetch(`${configs.SERVER_URL}/api/calculate/${type}`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": configs.UI_URL,
        "Access-Control-Request-Method": "POST"
      },
      body: JSON.stringify(body) //
    })
      .then(resp => resp.json())
      .then(json => {
        accept(json);
      })
      .catch(e => {
        reject();
      });
  });
};
