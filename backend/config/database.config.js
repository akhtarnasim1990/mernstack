const mongoose = require("mongoose");

module.exports.databaseConnection = (app) => {
  mongoose.set("strictQuery", true);
  mongoose.connect(
    process.env.mongoURL
    //      {
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true,
    //   }
  );

  mongoose.connection.on("connected", (connection) => {
    console.log("Database connected.");
  });
  mongoose.connection.on("error", (error) => {
    console.log(error.message);
  });
};
