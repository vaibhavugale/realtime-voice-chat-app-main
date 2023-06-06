function DbConnect() {
  const mongoose = require("mongoose");
  const dbUrl = process.env.DB_URL;

  mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;

  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", function () {
    console.log("Connected to MongoDB");
  });
}

module.exports = DbConnect;