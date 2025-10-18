import React, { useState } from "react";
import { TaskTable } from "./TaskTable";
import { TaskCardSummary } from "./TaskCardSummary"; // opsional kalau mau kartu di atas tabel

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

  return (
    <div className="p-6 text-gray-100">
      <h1 className="text-2xl font-semibold mb-2">Task List</h1>
      <p className="text-gray-400 mb-6">
        Here is a list of all assigned tasks.
      </p>

      {/* Optional: Summary Cards */}
      <TaskCardSummary tasks={tasks} />

      {/* Table */}
      <TaskTable tasks={tasks} />
    </div>
  );
};
