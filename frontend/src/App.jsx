import { useEffect, useState } from "react";
import ClientList from "./components/ClientList";
import TaskCard from "./components/TaskCard";
import Filters from "./components/Filters";
import StatsBar from "./components/StatsBar";
import AddTaskModal from "./components/AddTaskModal";
import { getClients, getTasks, createTask, updateTaskStatus } from "./api";

export default function App() {
  const [clients, setClients] = useState([]);
  const [selected, setSelected] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [filters, setFilters] = useState({ status: "", category: "" });
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getClients().then((data) => {
      setClients(data);
      if (data.length > 0) setSelected(data[0]);
    });
  }, []);

  useEffect(() => {
    if (!selected) return;
    setLoading(true);
    getTasks(selected.id, filters)
      .then(setTasks)
      .finally(() => setLoading(false));
  }, [selected, filters]);

  const handleStatusChange = async (id, status) => {
    await updateTaskStatus(id, status);
    getTasks(selected.id, filters).then(setTasks);
  };

  const handleAddTask = async (data) => {
    await createTask(data);
    getTasks(selected.id, filters).then(setTasks);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center gap-3">
        <div className="w-7 h-7 bg-blue-600 rounded-md flex items-center justify-center">
          <span className="text-white text-xs font-bold">CT</span>
        </div>
        <h1 className="font-semibold text-gray-800">Compliance Tracker</h1>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <ClientList clients={clients} selectedId={selected?.id} onSelect={setSelected} />

        {/* Main */}
        <main className="flex-1 overflow-y-auto p-6">
          {!selected ? (
            <p className="text-gray-400 text-sm">Select a client to view tasks.</p>
          ) : (
            <>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">{selected.company_name}</h2>
                  <p className="text-xs text-gray-400">{selected.entity_type} · {selected.country}</p>
                </div>
                <button
                  onClick={() => setShowModal(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-md transition-colors"
                >
                  + Add Task
                </button>
              </div>

              <StatsBar tasks={tasks} />
              <Filters filters={filters} onChange={setFilters} />

              {loading ? (
                <p className="text-sm text-gray-400">Loading tasks...</p>
              ) : tasks.length === 0 ? (
                <p className="text-sm text-gray-400">No tasks found.</p>
              ) : (
                <div className="flex flex-col gap-3">
                  {tasks.map((t) => (
                    <TaskCard key={t.id} task={t} onStatusChange={handleStatusChange} />
                  ))}
                </div>
              )}
            </>
          )}
        </main>
      </div>

      {showModal && (
        <AddTaskModal
          clientId={selected?.id}
          onClose={() => setShowModal(false)}
          onAdd={handleAddTask}
        />
      )}
    </div>
  );
}
