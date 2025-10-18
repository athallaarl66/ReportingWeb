import React from "react";
import { Edit, Trash2 } from "lucide-react";

export const TaskTable = ({ tasks }) => {
  return (
    <div className="overflow-x-auto bg-gray-800 rounded-lg shadow-lg">
      <table className="w-full border-collapse">
        <thead className="bg-gray-700 text-gray-300 text-sm">
          <tr>
            <th className="p-3 text-left w-12">
              <input type="checkbox" />
            </th>
            <th className="p-3 text-left">Task Name</th>
            <th className="p-3 text-left">Assigned To</th>
            <th className="p-3 text-left">Department</th>
            <th className="p-3 text-left">Role</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr
              key={task.id}
              className="border-t border-gray-700 hover:bg-gray-700/30"
            >
              <td className="p-3">
                <input type="checkbox" />
              </td>
              <td className="p-3">{task.name}</td>
              <td className="p-3 text-gray-300">{task.assignedTo}</td>
              <td className="p-3 text-gray-300">{task.department}</td>
              <td className="p-3 text-gray-300">{task.role}</td>
              <td className="p-3">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    task.status === "Completed"
                      ? "bg-green-600/20 text-green-400"
                      : task.status === "Pending"
                      ? "bg-yellow-600/20 text-yellow-400"
                      : "bg-blue-600/20 text-blue-400"
                  }`}
                >
                  {task.status}
                </span>
              </td>
              <td className="p-3 flex gap-2">
                <button className="p-2 rounded hover:bg-gray-600">
                  <Edit size={16} />
                </button>
                <button className="p-2 rounded hover:bg-gray-600 text-red-400">
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
