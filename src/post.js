const SERVER_URL = "https://secure-ravine-69330.herokuapp.com";
const UI_URL = "https://sleepy-garden-43138.herokuapp.com";
const LOCAL_SERVER_URL = "https://quiet-atoll-96617.herokuapp.com";
const LOCAL_UI_URL = "http://localhost:3000";

export const post = ({ body, type }) => {
  var servelUrl, uiUrl;
  if (window.location.hostname === "localhost") {
    servelUrl = LOCAL_SERVER_URL; uiUrl = LOCAL_UI_URL;
  } else {
    servelUrl = SERVER_URL; uiUrl = UI_URL;
  }
  return new Promise((accept, reject) => {
    fetch(`${servelUrl}/api/calculate/${type}`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": uiUrl,
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
