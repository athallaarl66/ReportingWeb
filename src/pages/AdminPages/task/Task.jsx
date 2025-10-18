import React from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { TaskContent } from "@/components/ComponentAdmin/task-component/TaskContent";

export const Task = () => {
  return (
    <div className="flex h-screen bg-gray-900">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        <main>
          <TaskContent />
        </main>
      </div>
    </div>
  );
};
