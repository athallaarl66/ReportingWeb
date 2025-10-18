// src/lib/useAddTaskPageLogic.js

import { useNavigate } from "react-router-dom";
import { useTaskManager } from "@/hooks/useTaskManager";

export const useAddTaskPageLogic = () => {
  const navigate = useNavigate();
  const { handleAddTask } = useTaskManager();

  const onTaskSubmit = (newTaskData) => {
    handleAddTask(newTaskData);
    navigate("/");
  };

  const onCancel = () => {
    navigate("/");
  };

  return {
    onTaskSubmit,
    onCancel,
  };
};
