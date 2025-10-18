import React, { useState } from "react";
import { TaskTable } from "./TaskTableAdmin";
import { TaskCardSummary } from "./TaskCardSummaryAdmin";
import { AddTaskForm } from "./AddTaskForm";

export const TaskContent = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      name: "Inspect Generator",
      assignedTo: "John Doe",
      department: "Electrical",
      role: "Technician",
      status: "In Progress",
    },
    {
      id: 2,
      name: "Calibrate Sensor",
      assignedTo: "Jane Smith",
      department: "Instrumentation",
      role: "Engineer",
      status: "Completed",
    },
    {
      id: 3,
      name: "Replace Filter",
      assignedTo: "Mike Johnson",
      department: "Mechanical",
      role: "Supervisor",
      status: "Pending",
    },
  ]);

  // function buat add task

  const [isAddFormOpen, setIsAddFormOpen] = useState(false);

  const handleAddTask = (newTask) => {
    const taskWithId = {
      id: Date.now(),
      ...newTask,

      status: newTask.status || "Pending",
    };

    setTasks((prevTasks) => [...prevTasks, taskWithId]);
    setIsAddFormOpen(false);
  };

  const handleDeleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const handleUpdateTasks = (updatedTasks) => {
    setTasks(updatedTasks);
  };

  return (
    <div className="p-6 text-gray-100">
      <header className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Task List</h1>
          <p className="text-gray-400">Here is a list of all assigned tasks.</p>
        </div>
        <button
          onClick={() => setIsAddFormOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow transition"
        >
          + Add New Task
        </button>
      </header>

      {/* Summary Cards */}
      <TaskCardSummary tasks={tasks} />

      {/* Task Table */}
      <TaskTable
        tasks={tasks}
        onUpdateTasks={handleUpdateTasks}
        onDeleteTask={handleDeleteTask}
      />

      {/* Add Task Modal */}
      {isAddFormOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-gray-900 rounded-lg shadow-lg w-[600px] p-6 max-h-[90vh] overflow-y-auto">
            <AddTaskForm
              onSubmit={handleAddTask}
              onCancel={() => setIsAddFormOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};
