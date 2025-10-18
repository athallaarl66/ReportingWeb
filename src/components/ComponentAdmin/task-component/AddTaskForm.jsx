import React, { useState, useEffect } from "react";
import {
  MapPin,
  UploadCloud,
  CalendarDays,
  BookText,
  User,
  LayoutGrid,
  FileImage,
} from "lucide-react";

export const AddTaskForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    assignedTo: "",
    department: "",
    role: "",
    location: "",
    date: "",
    description: "",
    status: "Pending",
  });

  const [evidenceFile, setEvidenceFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEvidenceFile(file);
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
    }
  };

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.department ||
      !formData.date ||
      !formData.role ||
      !formData.assignedTo
    ) {
      alert(
        "⚠️ Please fill in all required fields (Task Name, Department, Role, Assigned To, Due Date)!"
      );
      return;
    }

    const finalData = {
      ...formData,
      evidence: evidenceFile,
    };
    onSubmit(finalData);

    setFormData({
      name: "",
      assignedTo: "",
      department: "",
      role: "",
      location: "",
      date: "",
      description: "",
      status: "Pending",
    });
    setEvidenceFile(null);
    setPreviewUrl(null);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 p-6 bg-gray-800/60 rounded-xl border border-gray-700 shadow-lg"
    >
      <h2 className="text-xl font-semibold text-white mb-4">
        Add Task Details
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            <User className="inline-block h-4 w-4 mr-1 text-indigo-400" /> Task
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g., Server Maintenance"
            className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2.5 text-white placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            required
          />
        </div>

        <div>
          <label
            htmlFor="assignedTo"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            <User className="inline-block h-4 w-4 mr-1 text-indigo-400" />{" "}
            Assigned To
          </label>
          <input
            type="text"
            id="assignedTo"
            name="assignedTo"
            value={formData.assignedTo}
            onChange={handleChange}
            placeholder="e.g., John Doe"
            className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2.5 text-white placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            required
          />
        </div>

        <div>
          <label
            htmlFor="department"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            <LayoutGrid className="inline-block h-4 w-4 mr-1 text-indigo-400" />{" "}
            Department
          </label>
          <input
            type="text"
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            placeholder="e.g., IT Department"
            className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2.5 text-white placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label
            htmlFor="role"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            <User className="inline-block h-4 w-4 mr-1 text-indigo-400" /> Role
          </label>
          <input
            type="text"
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            placeholder="e.g., System Admin"
            className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2.5 text-white placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            required
          />
        </div>

        <div>
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            <CalendarDays className="inline-block h-4 w-4 mr-1 text-indigo-400" />{" "}
            Due Date
          </label>
          <input
            type="datetime-local"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2.5 text-white placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            required
          />
        </div>

        <div>
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            <MapPin className="inline-block h-4 w-4 mr-1 text-indigo-400" />{" "}
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g., 2nd Avenue, Downtown"
            className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2.5 text-white placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-300 mb-1"
        >
          <BookText className="inline-block h-4 w-4 mr-1 text-indigo-400" />{" "}
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
          placeholder="Detailed description of the task..."
          className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2.5 text-white placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
        ></textarea>
      </div>

      <div>
        <label
          htmlFor="evidence-upload"
          className="block text-sm font-medium text-gray-300 mb-1"
        >
          <UploadCloud className="inline-block h-4 w-4 mr-1 text-indigo-400" />{" "}
          Evidence (Optional)
        </label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-600 border-dashed rounded-md cursor-pointer hover:border-indigo-500 transition-colors">
          <div className="space-y-2 text-center">
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Evidence Preview"
                className="mx-auto h-32 w-auto rounded-md object-contain"
              />
            ) : (
              <FileImage className="mx-auto h-12 w-12 text-gray-500" />
            )}

            <div className="flex text-sm text-gray-500 justify-center">
              <label
                htmlFor="evidence-upload"
                className="relative cursor-pointer bg-gray-700 rounded-md font-medium text-indigo-400 hover:text-indigo-300 px-3 py-1"
              >
                <span>{evidenceFile ? "Change file" : "Upload a file"}</span>
                <input
                  id="evidence-upload"
                  name="evidence"
                  type="file"
                  className="sr-only"
                  onChange={handleFileChange}
                  accept="image/*,.pdf,.doc,.docx"
                />
              </label>
            </div>

            {evidenceFile ? (
              <p className="text-sm text-white">
                File:{" "}
                <span className="font-medium text-indigo-400">
                  {evidenceFile.name}
                </span>
              </p>
            ) : (
              <p className="text-xs text-gray-400">
                PNG, JPG, PDF, DOCX up to 10MB
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons (tetap sama) */}
      <div className="flex justify-end gap-4 border-t border-gray-700 pt-6 mt-6">
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-300 bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
        >
          Add Task
        </button>
      </div>
    </form>
  );
};
