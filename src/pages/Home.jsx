import React, { useState } from "react";
import { SearchHeader } from "@/components/home/SearchHeader";
import { Sidebar } from "../components/layout/Sidebar";
import { DashboardCards } from "@/components/home/DashboardCards";
import { TasksTable } from "@/components/home/TaskTable";
import { useTaskManager } from "@/hooks/useTaskManager";

export const Home = () => {
  // 2. Panggil hook untuk mendapatkan semua data dan fungsi
  const {
    allTasks,
    displayTasks,
    handleAddTask,
    handleUpdateTask,
    handleDeleteTask,
    handleFilter,
  } = useTaskManager();

  // 3. Komponen sekarang hanya fokus pada tampilan
  return (
    <div className="flex h-screen bg-gray-900 text-gray-200">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-y-auto">
        <main className="p-4 sm:p-6 lg:p-8">
          <SearchHeader masterTasks={allTasks} onFiltered={handleFilter} />

          <div className="mt-8 space-y-8">
            <DashboardCards tasks={displayTasks} />

            <TasksTable
              tasks={displayTasks}
              onAddTask={handleAddTask}
              onUpdateTask={handleUpdateTask}
              onDeleteTask={handleDeleteTask}
            />
          </div>
        </main>
      </div>
    </div>
  );
};
