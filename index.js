const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const PORT = process.env.PORT || 3000;
const contactsRouter = require("./api/contacts/router");

app.use(morgan("dev"));
app.use(cors());

app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.listen(PORT, function () {
  console.log(`CORS-enabled web server listening on port ${PORT}`);
});
