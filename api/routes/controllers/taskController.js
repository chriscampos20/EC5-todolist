// api/controllers/taskController.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Obtener todas las tareas
const getAllTasks = async (req, res) => {
  try {
    const tasks = await prisma.task.findMany();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "No se pudieron obtener las tareas" });
  }
};

// Crear una nueva tarea
const createTask = async (req, res) => {
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
};

// Eliminar una tarea
const deleteTask = async (req, res) => {
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
};

module.exports = {
  getAllTasks,
  createTask,
  deleteTask,
};
