import { Sidebar } from "@/components/layout/Sidebar";
import { AddTaskForm } from "@/components/ComponentAdmin/task-component/AddTaskForm";
import { useAddTaskPageLogic } from "@/hooks/useAddTaskPageLogic";
import { useTaskManager } from "@/hooks/useTaskManager";

export const AddTaskPage = () => {
  const navigate = useNavigate();
  const { handleAddTask } = useTaskManager();

  const onTaskSubmit = (newTaskData) => {
    handleAddTask(newTaskData);
    navigate("/");
  };
  return (
    <div className="flex h-screen bg-gray-900 text-gray-200">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-y-auto">
        <main className="p-4 sm:p-6 lg:p-8">
          a
          <header className="mb-8">
            <h1 className="text-2xl font-bold text-white">Add New Task</h1>
            <p className="text-gray-400">
              Fill in the details below to create a new task.
            </p>
          </header>
          <AddTaskForm onSubmit={onTaskSubmit} onCancel={() => navigate("/")} />
        </main>
      </div>
    </div>
  );
};
