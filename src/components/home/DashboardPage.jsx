import { useState } from "react";
import { DashboardCards } from "@/components/home/DashboardCards";
import { TasksTable } from "@/components/home/TaskTable";
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
];

export const DashboardPage = () => {
  // 1. State dan logika sekarang tinggal di komponen induk ini
  const [tasks, setTasks] = useState(initialTasks);

  const handleAddTask = (newTaskData) => {
    const newId = Math.max(...tasks.map((t) => t.id), 0) + 1;
    setTasks([{ ...newTaskData, id: newId }, ...tasks]);
  };

  const handleUpdateTask = (updatedTaskData) => {
    setTasks(
      tasks.map((t) => (t.id === updatedTaskData.id ? updatedTaskData : t))
    );
  };

  const handleDeleteTask = (taskId) => {
    if (window.confirm("Delete this task?")) {
      setTasks(tasks.filter((t) => t.id !== taskId));
    }
  };

  const handleDeleteSelectedTasks = (selectedIds) => {
    if (
      selectedIds.size > 0 &&
      window.confirm(`Delete ${selectedIds.size} selected tasks?`)
    ) {
      setTasks(tasks.filter((t) => !selectedIds.has(t.id)));
    }
  };

  return (
    <div className="space-y-8">
      {/* 2. Kirim 'tasks' sebagai prop ke DashboardCards */}
      <DashboardCards tasks={tasks} />

      {/* 3. Kirim 'tasks' dan fungsi-fungsi sebagai props ke TasksTable */}
      <TasksTable
        tasks={tasks}
        onAddTask={handleAddTask}
        onUpdateTask={handleUpdateTask}
        onDeleteTask={handleDeleteTask}
        onDeleteSelected={handleDeleteSelectedTasks}
      />
    </div>
  );
};
