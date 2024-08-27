const express = require("express");
// const fs = require("fs/promises");
const fs = require("fs");

const PORT = 3000;
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Working...");
});

app.get("/todos", async (req, res) => {
  try {
    //  const data = await fs.readFile("todos.json", "utf-8");
    fs.readFile("todos.json", "utf-8", (err, data) => {
      if (err) throw err;
      res.status(200).json({
        success: true,
        error: null,
        data: JSON.parse(data),
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      error: err,
      message: "Server error",
    });
  }
});

app.post("/create", (req, res) => {
  try {
    const newTodo = {
      id: Math.floor(Math.random() * 1000000),
      title: req.body.title,
      description: req.body.description,
    };

    fs.readFile("todos.json", "utf-8", (err, data) => {
      if (err) throw err;
      const todos = JSON.parse(data);
      console.log("Todos is : ", todos);
      todos.push(newTodo);
      fs.writeFile("todos.json", JSON.stringify(todos), (err) => {
        if (err) throw err;
        res.status(201).json({
          success: true,
          error: null,
          data: newTodo,
        });
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      error: err,
      message: "Server error",
    });
  }
});

app.put("/update/:id", (req, res) => {
  try {
    fs.readFile("todos.json", "utf-8", (err, data) => {
      if (err) throw err;
      const todos = JSON.parse(data);
      for (let i = 0; i < todos.length; i++) {
        if (todos[i].id == req.params.id) {
          (todos[i].title = req.body.title),
            (todos[i].description = req.body.description);
        }
      }
      fs.writeFile("todos.json", JSON.stringify(todos), (err) => {
        if (err) throw err;
        fs.readFile("todos.json", "utf-8", (err, data) => {
          res.status(200).json({
            success: true,
            error: null,
            message: JSON.parse(data),
          });
        });
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      error: err,
      message: "Server error",
    });
  }
});

app.delete("/delete/:id", (req, res) => {
  try {
    fs.readFile("todos.json", "utf-8", (err, data) => {
      if (err) throw err;
      const todos = JSON.parse(data);
      // const index = findIndex(todos, parseInt(req.params.id));
      const index = todos.findIndex((todo) => todo.id == req.params.id);

      if (index == -1) {
       return res.status(500).json({
          success: false,
          error: true,
          message: "Id doesn't exist anymore",
        });
      }
      todos.splice(index, 1);
      fs.writeFile("todos.json", JSON.stringify(todos), (err) => {
        if (err) throw err;
        res.status(200).json({
          success: true,
          error: null,
          message: todos,
        });
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      error: err,
      message: "Server error",
    });
  }
});

app.listen(PORT, () => {
  console.log("listening on port", PORT);
});
