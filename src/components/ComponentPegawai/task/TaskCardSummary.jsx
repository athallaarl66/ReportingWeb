import React from "react";

export const TaskCardSummary = ({ tasks }) => {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === "Completed").length;
  const pending = tasks.filter((t) => t.status === "Pending").length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      <div className="bg-gray-800 p-4 rounded-lg text-center">
        <h2 className="text-lg font-semibold">{total}</h2>
        <p className="text-gray-400 text-sm">Total Tasks</p>
      </div>
      <div className="bg-gray-800 p-4 rounded-lg text-center">
        <h2 className="text-lg font-semibold text-green-400">{completed}</h2>
        <p className="text-gray-400 text-sm">Completed</p>
      </div>
      <div className="bg-gray-800 p-4 rounded-lg text-center">
        <h2 className="text-lg font-semibold text-yellow-400">{pending}</h2>
        <p className="text-gray-400 text-sm">Pending</p>
      </div>
    </div>
  );
};
