const socketClient = require("socket.io-client");

// export const socket = socketClient("http://localhost:8081", {
//   query: {
//     token: localStorage.getItem("auth_token"),
//   },
// });

export const socket = socketClient("https://myfinalystapi.icodexa.com/", {
  query: {
    token: localStorage.getItem("auth_token"),
  },
});
