const SERVER_URL = "https://quiet-atoll-96617.herokuapp.com";

export const post = ({ body, type }) => {
  return new Promise((accept, reject) => {
    fetch(`${SERVER_URL}/api/calculate/${type}`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
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
