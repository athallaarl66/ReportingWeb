import { useState, useEffect } from "react";
import {
  Search,
  ArrowUpDown,
  Filter,
  Upload,
  ChevronDown,
  Menu,
  MoreVertical,
} from "lucide-react";

const initialTasks = [
  {
    id: 1,
    name: "Review Code",
    department: "IT",
    role: "Developer",
    date: "2023-10-01",
    status: "Pending",
  },
  {
    id: 2,
    name: "Design UI",
    department: "Design",
    role: "Designer",
    date: "2023-10-02",
    status: "Completed",
  },
  {
    id: 3,
    name: "Test Features",
    department: "QA",
    role: "Tester",
    date: "2023-10-03",
    status: "In Progress",
  },
  {
    id: 4,
    name: "Deploy App",
    department: "IT",
    role: "DevOps",
    date: "2023-10-04",
    status: "Pending",
  },
];

export const SearchHeader = ({
  onFilteredChange,
  onMenuClick, // Prop untuk membuka sidebar mobile
  initialTasks: propInitialTasks = initialTasks,
}) => {
  const [tasks] = useState(propInitialTasks);
  const [filteredTasks, setFilteredTasks] = useState(propInitialTasks);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("A-Z");
  const [filterDept, setFilterDept] = useState("All");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isActionsMenuOpen, setIsActionsMenuOpen] = useState(false);

  const departments = [...new Set(tasks.map((task) => task.department))];

  useEffect(() => {
    let processedTasks = [...tasks];

    if (filterDept !== "All") {
      processedTasks = processedTasks.filter(
        (task) => task.department === filterDept
      );
    }

    if (searchTerm) {
      processedTasks = processedTasks.filter((task) =>
        task.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortOrder === "A-Z") {
      processedTasks.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOrder === "Z-A") {
      processedTasks.sort((a, b) => b.name.localeCompare(a.name));
    }

    setFilteredTasks(processedTasks);
    onFilteredChange?.(processedTasks);
  }, [searchTerm, filterDept, sortOrder, tasks, onFilteredChange]);

  const handleSortToggle = () => {
    setSortOrder((prev) => (prev === "A-Z" ? "Z-A" : "A-Z"));
    setIsActionsMenuOpen(false);
  };

  const handleFilterChange = (value) => {
    setFilterDept(value);
    setIsFilterOpen(false);
    setIsActionsMenuOpen(false);
  };

  const handleExport = () => {
    setIsActionsMenuOpen(false);
  };

  return (
    <header className="px-4 sm:px-6 lg:px-8 py-4 ...">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative w-full max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search tasks..."
              className="pl-10 pr-4 py-2 w-full bg-gray-800 border border-gray-700 rounded-lg text-white text-sm"
            />
          </div>
        </div>
        {/* Tampilan desktop */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={handleSortToggle}
              className="flex items-center gap-2 px-3 py-2 text-sm text-gray-300 bg-gray-800 border border-gray-700 rounded-lg"
            >
              <ArrowUpDown className="h-4 w-4" /> SORT: {sortOrder}
            </button>
            <div className="relative">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-300 bg-gray-800 border border-gray-700 rounded-lg"
              >
                <Filter className="h-4 w-4" /> Filter: {filterDept}{" "}
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    isFilterOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isFilterOpen && (
                <div className="absolute right-0 mt-2 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-10 w-40">
                  <button
                    onClick={() => handleFilterChange("All")}
                    className="block w-full px-3 py-2 text-left text-sm text-gray-300 hover:bg-gray-700"
                  >
                    All
                  </button>
                  {departments.map((dept) => (
                    <button
                      key={dept}
                      onClick={() => handleFilterChange(dept)}
                      className="block w-full px-3 py-2 text-left text-sm text-gray-300 hover:bg-gray-700"
                    >
                      {dept}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-3 py-2 text-sm text-gray-300 bg-gray-800 border border-gray-700 rounded-lg"
            >
              <Upload className="h-4 w-4" /> Export
            </button>
          </div>

          {/* Tampilan Mobile */}
          <div className="relative sm:hidden">
            <button
              onClick={() => setIsActionsMenuOpen(!isActionsMenuOpen)}
              className="p-2 text-gray-300 bg-gray-800 border border-gray-700 rounded-lg"
            >
              <MoreVertical size={20} />
            </button>
            {isActionsMenuOpen && (
              <div className="absolute right-0 mt-2 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-10 w-48">
                <button
                  onClick={handleSortToggle}
                  className="flex items-center gap-3 w-full px-4 py-3 text-left text-sm text-gray-300 hover:bg-gray-700"
                >
                  <ArrowUpDown className="h-4 w-4" /> Sort ({sortOrder})
                </button>
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="flex items-center justify-between w-full px-4 py-3 text-left text-sm text-gray-300 hover:bg-gray-700"
                >
                  <div className="flex items-center gap-3">
                    <Filter className="h-4 w-4" /> Filter
                  </div>{" "}
                  <span>
                    {filterDept}{" "}
                    <ChevronDown className="inline-block h-4 w-4" />
                  </span>
                </button>
                {/* filter mobile */}
                {isFilterOpen && (
                  <div className="bg-gray-700/50 pl-8">
                    <button
                      onClick={() => handleFilterChange("All")}
                      className="block w-full py-2 text-left text-sm text-gray-300 hover:bg-gray-600"
                    >
                      All
                    </button>
                    {departments.map((dept) => (
                      <button
                        key={dept}
                        onClick={() => handleFilterChange(dept)}
                        className="block w-full py-2 text-left text-sm text-gray-300 hover:bg-gray-600"
                      >
                        {dept}
                      </button>
                    ))}
                  </div>
                )}
                <button
                  onClick={handleExport}
                  className="flex items-center gap-3 w-full px-4 py-3 text-left text-sm text-gray-300 hover:bg-gray-700"
                >
                  <Upload className="h-4 w-4" /> Export
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
