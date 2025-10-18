import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { Task } from "./pages/AdminPages/task/Task";
// Import komponen baru
import TaskReviewPage from "./components/ComponentAdmin/task-component/TaskReviewPage";

function App() {
  return (
    <Router>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/ReportingWeb" element={<Home />} />
        <Route path="/task" element={<Task />} />
        <Route path="/task/review/:id" element={<TaskReviewPage />} />
        {/* 404 fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
