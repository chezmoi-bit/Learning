const express = require("express");

const PORT  = 3000;
const app = express();

app.use(express.json());

const todos = [];

app.get('/',(req,res) => {
    res.send(todos);
})

let count = 1;
app.post('/create', (req,res) => {
    const data = {
        id : count,
        title: req.body.title,
        description: req.body.description,
    };
    try {
        todos.push(data);
        count += 1;
        res.status(201).send({
            message: "Successfully created the task",
            error: null,
            data: todos,
        })
    } catch (err) {
        console.error(err);
    }
})

app.put('/update/:id', (req,res) => {
    try {
        const index = req.params.id;
        todos[index].title  = req.body.title;
        todos[index].description = req.body.description;
        res.status(201).json({
            message: "Successfully updated the task",
            error: null,
            data: todos,
        })
    } catch (err) {
        console.log("Couldn't update ",err);
    }
})

app.delete('/delete/:id', (req,res) => {
    try {
        const index = req.params.id;
        todos.splice(index, 1);
        res.status(200).send(todos);
    } catch (err){
        console.log("Couldn't delete ",err);
    }
})

app.listen(PORT, () => {
    console.log("listening on port " +PORT);
})