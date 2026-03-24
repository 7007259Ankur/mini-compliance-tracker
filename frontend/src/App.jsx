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
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-3.5 flex items-center gap-3 shadow-sm">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-sm">
          <svg width="18" height="18" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="14" width="20" height="3" rx="1.5" fill="white" opacity="0.9" />
            <rect x="10" y="22" width="32" height="3" rx="1.5" fill="white" opacity="0.75" />
            <rect x="10" y="30" width="26" height="3" rx="1.5" fill="white" opacity="0.75" />
            <circle cx="46" cy="46" r="10" fill="#22C55E" />
            <path d="M41 46.5l3 3 6-6" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div>
          <h1 className="font-semibold text-slate-800 text-sm leading-tight">Compliance Tracker</h1>
          <p className="text-xs text-slate-400 leading-tight">LedgersCFO</p>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden" style={{ height: "calc(100vh - 57px)" }}>
        <ClientList clients={clients} selectedId={selected?.id} onSelect={setSelected} />

        <main className="flex-1 overflow-y-auto p-6 bg-slate-50">
          {!selected ? (
            <div className="flex flex-col items-center justify-center h-full text-slate-400">
              <svg className="w-12 h-12 mb-3 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <p className="text-sm">Select a client to view tasks</p>
            </div>
          ) : (
            <>
              {/* Page header */}
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-xl font-semibold text-slate-800">{selected.company_name}</h2>
                  <p className="text-xs text-slate-400 mt-0.5">{selected.entity_type} &middot; {selected.country}</p>
                </div>
                <button
                  onClick={() => setShowModal(true)}
                  className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm px-4 py-2 rounded-lg transition-colors shadow-sm font-medium"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Task
                </button>
              </div>

              <StatsBar tasks={tasks} />
              <Filters filters={filters} onChange={setFilters} />

              {loading ? (
                <div className="flex items-center gap-2 text-sm text-slate-400 mt-6">
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Loading tasks...
                </div>
              ) : tasks.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-slate-400">
                  <svg className="w-10 h-10 mb-2 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2" />
                  </svg>
                  <p className="text-sm">No tasks found</p>
                </div>
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
