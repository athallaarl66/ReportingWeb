import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { motion } from "framer-motion";

const useCountUp = (end, duration = 1000) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime;
    let frameId;

    const animateCount = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const current = Math.min(Math.floor((progress / duration) * end), end);
      setCount(current);
      if (progress < duration) {
        frameId = requestAnimationFrame(animateCount);
      }
    };

    frameId = requestAnimationFrame(animateCount);
    return () => cancelAnimationFrame(frameId);
  }, [end, duration]);

  return count;
};

/* card */
const StatCard = ({ title, value, unit = "" }) => {
  const animatedValue = useCountUp(value);

  return (
    <motion.div
      variants={itemVariants}
      className="bg-gray-800/60 p-5 rounded-xl border border-gray-700 backdrop-blur-sm 
                 hover:scale-[1.02] hover:bg-gray-800 transition-all duration-300"
    >
      <p className="text-gray-400 text-sm">{title}</p>
      <div className="flex items-center justify-between mt-2">
        <p className="text-3xl font-bold text-white">
          {animatedValue}
          <span className="text-2xl text-gray-300">{unit}</span>
        </p>
        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-green-500/20">
          <ArrowUp className="h-5 w-5 text-green-400" />
        </div>
      </div>
    </motion.div>
  );
};

/*  Gerakan animasi gaul  */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.4 } },
};

/*  Main Dashboard Cards  */
export const DashboardCards = ({ tasks }) => {
  const taskCount = tasks.length;
  const completedCount = tasks.filter((t) => t.status === "Completed").length;
  const incompletedCount = taskCount - completedCount;
  const completedPercentage =
    taskCount > 0 ? Math.round((completedCount / taskCount) * 100) : 0;

  const totalAnimated = useCountUp(taskCount);

  return (
    <motion.section
      className="px-4 sm:px-6 md:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* card kiri */}
      <motion.div
        variants={itemVariants}
        className="bg-gray-800/60 p-6 rounded-xl border border-gray-700 flex flex-col justify-between hover:bg-gray-800 transition-all duration-300"
      >
        <div>
          <p className="text-gray-400 text-sm">Total Tasks</p>
          <p className="text-5xl font-extrabold text-indigo-400 mt-3">
            {totalAnimated}
          </p>
        </div>
        <div className="flex items-center justify-between mt-4">
          <span className="text-sm text-gray-400">Progress</span>
          <div className="flex items-center gap-2">
            <ArrowUp className="h-4 w-4 text-green-400" />
            <span className="text-sm text-green-400 font-medium">
              {completedPercentage}%
            </span>
          </div>
        </div>
      </motion.div>

      {/* card kanan */}
      <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
        <StatCard title="Tasks Shown" value={taskCount} />
        <StatCard title="Completed (%)" value={completedPercentage} unit="%" />
        <StatCard title="Completed Count" value={completedCount} />
        <StatCard title="Incompleted Count" value={incompletedCount} />
      </div>
    </motion.section>
  );
};
