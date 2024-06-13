const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 4000;

let tasks = [];
let idCounter = 0;

// Middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, "todoapp")));

// Ruta para la API
app.get("/api/tasks", (req, res) => {
    res.json(tasks);
});

app.post("/api/tasks", (req, res) => {
    const newTask = {
        id: idCounter++,
        name: req.body.name,
        completed: false
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

app.delete("/api/tasks/:id", (req, res) => {
    tasks = tasks.filter(task => task.id != req.params.id);
    res.status(204).end();
});

// Ruta principal que sirve `index.html`
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "todoapp", "index.html"));
});

// Iniciar servidor en el puerto especificado
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
