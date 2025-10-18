import { useState, useEffect } from "react";

const initialTasks = [
  {
    id: 1,
    name: "Server Maintenance",
    department: "IT Department",
    role: "System Admin",
    date: "2025-10-15",
    status: "Completed",
  },
  {
    id: 2,
    name: "Network Upgrade",
    department: "IT Department",
    role: "Network Engineer",
    date: "2025-10-22",
    status: "In Progress",
  },
  {
    id: 3,
    name: "AC Unit Inspection",
    department: "Facility Management",
    role: "Technician",
    date: "2025-11-01",
    status: "Completed",
  },
  {
    id: 4,
    name: "Software Patching",
    department: "IT Department",
    role: "DevOps",
    date: "2025-11-05",
    status: "Pending",
  },
  {
    id: 5,
    name: "Update Website Content",
    department: "Marketing",
    role: "Content Manager",
    date: "2025-11-10",
    status: "In Progress",
  },
];

export const useTaskManager = () => {
  const [allTasks, setAllTasks] = useState(() => {
    try {
      const savedTasks = localStorage.getItem("tasks");
      return savedTasks ? JSON.parse(savedTasks) : initialTasks;
    } catch (error) {
      return initialTasks;
    }
  });

  const [displayTasks, setDisplayTasks] = useState(allTasks);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(allTasks));
    setDisplayTasks(allTasks);
  }, [allTasks]);

  const handleAddTask = (newTaskData) => {
    const newId = Math.max(...allTasks.map((t) => t.id), 0) + 1;
    const taskToAdd = { ...newTaskData, id: newId };

    setAllTasks([taskToAdd, ...allTasks]);

    console.log("Task added:", taskToAdd);
  };

  const handleUpdateTask = (updatedTaskData) => {
    setAllTasks(
      allTasks.map((t) => (t.id === updatedTaskData.id ? updatedTaskData : t))
    );
  };

  const handleDeleteTask = (taskId) => {
    if (window.confirm("Delete this task?")) {
      setAllTasks(allTasks.filter((t) => t.id !== taskId));
    }
  };

  const handleFilter = (filteredData) => {
    setDisplayTasks(filteredData);
  };

  return {
    allTasks,
    displayTasks,
    handleAddTask,
    handleUpdateTask,
    handleDeleteTask,
    handleFilter,
  };
};
