const express = require("express");

const app = express();

function middleware(req, res, next) {
  console.log("Inside the middleware function");
  next();
}

app.use(middleware);
app.use(express.json());
const PORT = 3000;

app.get("/", (req, res) => {
  console.log("Body is : ", req.body);
  res.send("Welcome");
});

app.listen(PORT, () => {
  console.log("Running on PORT : ", PORT);
});
