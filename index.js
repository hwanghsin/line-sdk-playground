const express = require("express");
const app = express();
const PORT = process.env.PORT || 3003;

const rootRouter = require("./routes");
const lineRouter = require("./routes/line");

// 解析request.body，沒有定義body會回undefined
app.use(express.json());

app.use("/", rootRouter);
app.use("/line", lineRouter);

app.listen(PORT, () => console.log(`Listening at Port ${PORT}`));
