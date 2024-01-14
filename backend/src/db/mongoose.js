const mongoose = require("mongoose");

const connectionURL = "mongodb://127.0.0.1:27017/cv-manager-api";
mongoose.connect(connectionURL, { useNewUrlParser: true });
