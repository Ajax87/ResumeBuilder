const express = require("express");
require("./db/mongoose");
const user = require("./routes/user");
const app = express();
const port = 3000;

app.use(express.json());
app.use(user);
app.listen(port, () => {
  console.log("server is running on", port);
});
