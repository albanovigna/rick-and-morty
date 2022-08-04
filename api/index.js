const server = require("./src/app.js");
require("dotenv").config();

const PORT = process.env.PORT;

server.listen(PORT, () => {
  console.log(`%s listening at ${PORT}`); // eslint-disable-line no-console
});
