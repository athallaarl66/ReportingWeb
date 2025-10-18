import { useState, useEffect } from "react";
import { Plus, Trash2, Pencil, Check, X } from "lucide-react";

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

const StatusBadge = ({ status }) => {
  const colors = {
    Completed: "bg-green-500/20 text-green-400",
    "In Progress": "bg-yellow-500/20 text-yellow-400",
    Pending: "bg-gray-500/20 text-gray-300",
  };
  return (
    <span
      className={`px-2 py-1 rounded-lg text-xs font-medium ${
        colors[status] || "bg-gray-700 text-gray-300"
      }`}
    >
      {status}
    </span>
  );
};

const TaskRow = ({ task, isSelected, onSelect, onEdit, onDelete }) => (
  <tr className="border-b border-gray-700 hover:bg-gray-700/50 transition">
    <td className="p-3">
      <input
        type="checkbox"
        checked={isSelected}
        onChange={() => onSelect(task.id)}
        className="bg-gray-700 border-gray-600 rounded w-4 h-4"
      />
    </td>
    <td className="p-3 text-gray-200 whitespace-nowrap">{task.name}</td>
    <td className="p-3 text-gray-300 hidden sm:table-cell">
      {task.department}
    </td>
    <td className="p-3 text-gray-300 hidden lg:table-cell">{task.role}</td>
    <td className="p-3 text-gray-300 whitespace-nowrap">{task.date}</td>
    <td className="p-3">
      <div className="flex items-center gap-3 text-gray-400">
        <StatusBadge status={task.status} />
        <button onClick={() => onEdit(task)} aria-label="Edit Task">
          <Pencil className="h-4 w-4 hover:text-indigo-400" />
        </button>
        <button onClick={() => onDelete(task.id)} aria-label="Delete Task">
          <Trash2 className="h-4 w-4 hover:text-red-500" />
        </button>
      </div>
    </td>
  </tr>
);

const TaskFormRow = ({ taskData, onInputChange, onSave, onCancel }) => {
  const isNew = !taskData.id;
  return (
    <tr className="border-b border-gray-700 bg-indigo-900/30">
      <td className="p-3 text-center text-gray-400">
        {isNew ? <Plus size={16} /> : <Pencil size={16} />}
      </td>
      <td className="p-3">
        <input
          type="text"
          value={taskData.name}
          onChange={(e) => onInputChange(e, "name")}
          placeholder="Task name"
          className="w-full bg-gray-700 p-2 rounded text-sm"
        />
      </td>
      <td className="p-3 hidden sm:table-cell">
        <input
          type="text"
          value={taskData.department}
          onChange={(e) => onInputChange(e, "department")}
          placeholder="Department"
          className="w-full bg-gray-700 p-2 rounded text-sm"
        />
      </td>
      <td className="p-3 hidden lg:table-cell">
        <input
          type="text"
          value={taskData.role}
          onChange={(e) => onInputChange(e, "role")}
          placeholder="Role"
          className="w-full bg-gray-700 p-2 rounded text-sm"
        />
      </td>
      <td className="p-3">
        <input
          type="date"
          value={taskData.date}
          onChange={(e) => onInputChange(e, "date")}
          className="w-full bg-gray-700 p-2 rounded text-sm"
        />
      </td>
      <td className="p-3">
        <div className="flex gap-3 text-gray-400">
          <button onClick={onSave}>
            <Check className="h-4 w-4 hover:text-green-400" />
          </button>
          <button onClick={onCancel}>
            <X className="h-4 w-4 hover:text-red-400" />
          </button>
        </div>
      </td>
    </tr>
  );
};

/* function buat tambah edit apus tabel */
export const TasksTable = ({ tasks: filteredTasks }) => {
  const [tasks, setTasks] = useState(initialTasks);
  const [editingId, setEditingId] = useState(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [formData, setFormData] = useState({});
  const [selectedIds, setSelectedIds] = useState(new Set());

  useEffect(() => {
    if (filteredTasks) setTasks(filteredTasks);
  }, [filteredTasks]);

  const handleOpenForm = (task = null) => {
    if (task) {
      setEditingId(task.id);
      setFormData(task);
      setIsAddingNew(false);
    } else {
      setIsAddingNew(true);
      setFormData({
        name: "",
        department: "",
        role: "",
        date: "",
        status: "Pending",
      });
    }
  };

  const handleCancelForm = () => {
    setEditingId(null);
    setIsAddingNew(false);
    setFormData({});
  };

  const handleFormChange = (e, field) =>
    setFormData({ ...formData, [field]: e.target.value });

  const handleSave = () => {
    if (
      !formData.name ||
      !formData.department ||
      !formData.role ||
      !formData.date
    ) {
      alert("⚠️ Please fill all fields!");
      return;
    }

    if (isAddingNew) {
      const newId = Math.max(...tasks.map((t) => t.id), 0) + 1;
      setTasks([{ ...formData, id: newId }, ...tasks]);
    } else {
      setTasks(tasks.map((t) => (t.id === editingId ? formData : t)));
    }
    handleCancelForm();
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this task?")) {
      setTasks(tasks.filter((t) => t.id !== id));
    }
  };

  const handleSelectOne = (id) => {
    setSelectedIds((prev) => {
      const newSet = new Set(prev);
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      return newSet;
    });
  };

  const handleSelectAll = (e) => {
    setSelectedIds(
      e.target.checked ? new Set(tasks.map((t) => t.id)) : new Set()
    );
  };

  const handleDeleteSelected = () => {
    if (
      selectedIds.size > 0 &&
      window.confirm(`Delete ${selectedIds.size} selected tasks?`)
    ) {
      setTasks(tasks.filter((t) => !selectedIds.has(t.id)));
      setSelectedIds(new Set());
    }
  };

  const isAllSelected = selectedIds.size === tasks.length && tasks.length > 0;

  return (
    <section className="mt-8 bg-gray-800/50 p-4 sm:p-6 rounded-xl border border-gray-700 backdrop-blur-sm">
      <header className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
        {selectedIds.size > 0 ? (
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-bold text-indigo-400">
              {selectedIds.size} selected
            </h2>
            <button
              onClick={handleDeleteSelected}
              className="flex items-center gap-2 px-3 py-2 text-sm text-white bg-red-600 hover:bg-red-700 rounded-lg"
            >
              <Trash2 size={16} /> Delete Selected
            </button>
          </div>
        ) : (
          <h2 className="text-xl font-bold text-white">Tasks Management</h2>
        )}
      </header>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px] text-left">
          <thead className="sticky top-0 bg-gray-800 z-10">
            <tr className="border-b border-gray-700">
              <th className="p-3 w-8">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={handleSelectAll}
                  className="bg-gray-700 border-gray-600 rounded w-4 h-4"
                />
              </th>
              <th className="p-3 text-sm font-semibold text-gray-400">
                Task Name
              </th>
              <th className="p-3 text-sm font-semibold text-gray-400 hidden sm:table-cell">
                Department
              </th>
              <th className="p-3 text-sm font-semibold text-gray-400 hidden lg:table-cell">
                Role
              </th>
              <th className="p-3 text-sm font-semibold text-gray-400">Date</th>
              <th className="p-3 text-sm font-semibold text-gray-400">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {isAddingNew && (
              <TaskFormRow
                taskData={formData}
                onInputChange={handleFormChange}
                onSave={handleSave}
                onCancel={handleCancelForm}
              />
            )}
            {tasks.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-6 text-center text-gray-400">
                  No tasks available.
                </td>
              </tr>
            ) : (
              tasks.map((task) =>
                editingId === task.id ? (
                  <TaskFormRow
                    key={task.id}
                    taskData={formData}
                    onInputChange={handleFormChange}
                    onSave={handleSave}
                    onCancel={handleCancelForm}
                  />
                ) : (
                  <TaskRow
                    key={task.id}
                    task={task}
                    isSelected={selectedIds.has(task.id)}
                    onSelect={handleSelectOne}
                    onEdit={handleOpenForm}
                    onDelete={handleDelete}
                  />
                )
              )
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};
