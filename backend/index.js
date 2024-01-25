const express = require("express");
const app = express();
var cookieParser = require("cookie-parser");
var morgan = require("morgan");
const helmet = require("helmet");
const port = 3000;
const userRouter = require("./routes/user");
const financeRouter = require("./routes/finance");
const { databaseConnection } = require("./config/database.config");
const cors = require("cors");

app.use(morgan("dev"));
app.use(cors());
app.use(helmet());
databaseConnection(app);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api", userRouter);
app.use("/api", financeRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
