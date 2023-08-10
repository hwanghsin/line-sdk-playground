const express = require("express");
const app = express();
const PORT = process.env.PORT || 3003;

const rootRouter = require("./routes");
const lineRouter = require("./routes/line");

app.use("/", rootRouter);
app.use("line", lineRouter);

app.listen(PORT, () => console.log(`Listening at Port ${PORT}`));
