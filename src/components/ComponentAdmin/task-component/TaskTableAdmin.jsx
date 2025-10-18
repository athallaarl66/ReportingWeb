import React, { useState } from "react";
import { Edit, Trash2, FileText } from "lucide-react"; // Import FileText untuk tombol review
import { useNavigate } from "react-router-dom"; // Import useNavigate untuk navigasi

export const TaskTable = ({
  tasks = [],
  onUpdateTasks,
  onDeleteTask,
  // Prop onEditTask tidak diperlukan lagi karena kita menggunakan onUpdateTasks
}) => {
  const navigate = useNavigate(); // Inisialisasi useNavigate
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [editingTask, setEditingTask] = useState(null);

  // Daftar status yang tersedia
  const STATUS_OPTIONS = ["Pending", "In Progress", "Completed", "Rejected"];

  // Fungsi utilitas untuk mendapatkan status background/text
  const getStatusClasses = (status) => {
    switch (status) {
      case "Completed":
      case "Approved": // Tambahkan 'Approved' sebagai sinonim Completed di UI
        return "bg-green-500/20 text-green-400";
      case "In Progress":
        return "bg-yellow-500/20 text-yellow-400";
      case "Rejected":
        return "bg-red-500/20 text-red-400";
      case "Pending":
      default:
        return "bg-gray-500/20 text-gray-300";
    }
  };

  // Handle select single checkbox
  const handleSelectOne = (id) => {
    setSelectedIds((prev) => {
      const newSet = new Set(prev);
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      return newSet;
    });
  };

  // Handle select all checkbox
  const handleSelectAll = (e) => {
    setSelectedIds(
      e.target.checked ? new Set(tasks.map((t) => t.id)) : new Set()
    );
  };

  // Delete single task (Memanggil prop onDeleteTask)
  const handleDelete = (id) => {
    // Ganti confirm() dengan modal UI custom sesuai instruksi
    if (window.confirm("Are you sure want to delete this task?")) {
      if (onDeleteTask) {
        onDeleteTask(id);
      }
      setSelectedIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }
  };

  // Delete selected tasks (Memanggil prop onUpdateTasks)
  const handleDeleteSelected = () => {
    if (selectedIds.size === 0) return;
    // Ganti confirm() dengan modal UI custom sesuai instruksi
    if (
      window.confirm(`Delete ${selectedIds.size} selected tasks permanently?`)
    ) {
      if (onUpdateTasks) {
        const newTasks = tasks.filter((task) => !selectedIds.has(task.id));
        onUpdateTasks(newTasks);
      }
      setSelectedIds(new Set());
    }
  };

  // Start editing
  const handleEdit = (task) => setEditingTask({ ...task });

  // Fungsi helper untuk input yang diedit (agar bisa digunakan untuk semua field)
  const handleEditingChange = (field, value) => {
    setEditingTask((prev) => ({ ...prev, [field]: value }));
  };

  // Save edited task (Memanggil prop onUpdateTasks)
  const handleSaveEdit = (id) => {
    if (onUpdateTasks) {
      const updatedTasks = tasks.map((t) => (t.id === id ? editingTask : t));
      onUpdateTasks(updatedTasks);
    }
    setEditingTask(null);
  };

  const isAllSelected = tasks.length > 0 && selectedIds.size === tasks.length;

  // Handler navigasi ke halaman review
  const handleReviewClick = (taskId) => {
    navigate(`/task/review/${taskId}`);
  };

  return (
    <div className="mt-6 bg-gray-800 rounded-lg shadow-lg border border-gray-700 overflow-hidden">
      {/* Toolbar */}
      <div className="flex justify-between items-center px-4 py-3 bg-gray-900 border-b border-gray-700">
        <h2 className="text-lg font-semibold text-white">Task Management</h2>
        {selectedIds.size > 0 && (
          <button
            onClick={handleDeleteSelected}
            className="bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-1 rounded flex items-center gap-1"
          >
            <Trash2 size={14} /> Delete Selected
          </button>
        )}
      </div>

      {/* Table */}
      <table className="w-full text-sm text-left">
        <thead className="bg-gray-700 text-gray-300 uppercase text-xs">
          <tr>
            <th className="p-3 text-center w-10">
              <input
                type="checkbox"
                className="accent-indigo-600 cursor-pointer"
                checked={isAllSelected}
                onChange={handleSelectAll}
              />
            </th>
            <th className="p-3">Task Name</th>
            <th className="p-3">Assigned To</th>
            <th className="p-3 hidden md:table-cell">Department</th>
            <th className="p-3 hidden lg:table-cell">Role</th>
            <th className="p-3">Status</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length === 0 ? (
            <tr>
              <td colSpan="7" className="p-5 text-center text-gray-500">
                No tasks available
              </td>
            </tr>
          ) : (
            tasks.map((task) => (
              <tr
                key={task.id}
                className="border-t border-gray-700 hover:bg-gray-700/40"
              >
                <td className="text-center p-3">
                  <input
                    type="checkbox"
                    className="accent-indigo-600 cursor-pointer"
                    checked={selectedIds.has(task.id)}
                    onChange={() => handleSelectOne(task.id)}
                  />
                </td>

                {/* Kolom Task Name (Bisa Diedit) */}
                <td className="p-3 text-white">
                  {editingTask?.id === task.id ? (
                    <input
                      className="bg-gray-700 border border-gray-600 px-2 py-1 rounded w-full text-sm focus:border-indigo-500 focus:ring-indigo-500"
                      value={editingTask.name}
                      onChange={(e) =>
                        handleEditingChange("name", e.target.value)
                      }
                    />
                  ) : (
                    task.name
                  )}
                </td>

                {/* Kolom Assigned To (Bisa Diedit) */}
                <td className="p-3 text-gray-300">
                  {editingTask?.id === task.id ? (
                    <input
                      className="bg-gray-700 border border-gray-600 px-2 py-1 rounded w-full text-sm focus:border-indigo-500 focus:ring-indigo-500"
                      value={editingTask.assignedTo}
                      onChange={(e) =>
                        handleEditingChange("assignedTo", e.target.value)
                      }
                    />
                  ) : (
                    task.assignedTo
                  )}
                </td>

                {/* Kolom Department (Hanya Tampil) */}
                <td className="p-3 text-gray-300 hidden md:table-cell">
                  {task.department}
                </td>

                {/* Kolom Role (Hanya Tampil) */}
                <td className="p-3 text-gray-300 hidden lg:table-cell">
                  {task.role}
                </td>

                {/* 💡 Kolom Status (Dropdown saat edit) */}
                <td className="p-3">
                  {editingTask?.id === task.id ? (
                    <select
                      className="bg-gray-700 border border-gray-600 px-2 py-1 rounded text-sm focus:border-indigo-500 focus:ring-indigo-500 text-white w-full"
                      value={editingTask.status}
                      onChange={(e) =>
                        handleEditingChange("status", e.target.value)
                      }
                    >
                      {STATUS_OPTIONS.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${getStatusClasses(
                        task.status
                      )}`}
                    >
                      {task.status}
                    </span>
                  )}
                </td>

                {/* Kolom Actions */}
                <td className="p-3 flex gap-2 justify-center text-gray-300">
                  {editingTask?.id === task.id ? (
                    <>
                      <button
                        onClick={() => handleSaveEdit(task.id)}
                        className="text-xs bg-green-600 hover:bg-green-700 px-2 py-1 rounded transition-colors"
                        title="Save Changes"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingTask(null)}
                        className="text-xs bg-gray-600 hover:bg-gray-500 px-2 py-1 rounded transition-colors"
                        title="Cancel Editing"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      {/* ✅ Tombol Baru: Review Task */}
                      <button
                        onClick={() => handleReviewClick(task.id)}
                        className="text-indigo-400 hover:text-indigo-600"
                        title="Review Task Detail & Approve"
                      >
                        <FileText size={16} />
                      </button>
                      <button
                        onClick={() => handleEdit(task)}
                        className="hover:text-indigo-400"
                        title="Edit Task"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(task.id)}
                        className="text-red-400 hover:text-red-500"
                        title="Delete Task"
                      >
                        <Trash2 size={16} />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
