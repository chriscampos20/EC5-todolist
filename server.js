const express = require("express");
const bodyParser = require("body-parser");
const { PrismaClient } = require("@prisma/client");
const path = require("path");

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "todoapp"))); // Servir archivos estáticos desde la carpeta 'todoapp'

// Obtener todas las tareas
app.get("/api/tasks", async (req, res) => {
  try {
    const tasks = await prisma.task.findMany();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "No se pudieron obtener las tareas" });
  }
});

// Crear una nueva tarea
app.post("/api/tasks", async (req, res) => {
  const { name } = req.body;

  try {
    const newTask = await prisma.task.create({
      data: {
        name,
        completed: false,
      },
    });
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: "No se pudo crear la tarea" });
  }
});

// Eliminar una tarea
app.delete("/api/tasks/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTask = await prisma.task.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: "No se pudo eliminar la tarea" });
  }
});

// Ruta principal que sirve 'index.html'
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "todoapp", "index.html"));
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
