const STATUS_STYLES = {
  Pending: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
  "In Progress": "bg-blue-50 text-blue-700 ring-1 ring-blue-200",
  Completed: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
};

const PRIORITY_DOT = {
  High: "bg-red-500",
  Medium: "bg-amber-400",
  Low: "bg-slate-300",
};

const CATEGORY_ICON = {
  Tax: "💰",
  Audit: "🔍",
  Legal: "⚖️",
  Payroll: "👥",
};

const NEXT_STATUS = {
  Pending: "In Progress",
  "In Progress": "Completed",
  Completed: null,
};

export default function TaskCard({ task, onStatusChange }) {
  const today = new Date().toISOString().split("T")[0];
  const isOverdue = task.status !== "Completed" && task.due_date < today;
  const next = NEXT_STATUS[task.status];

  const daysInfo = () => {
    const diff = Math.round((new Date(task.due_date) - new Date(today)) / 86400000);
    if (task.status === "Completed") return null;
    if (diff < 0) return { label: `${Math.abs(diff)}d overdue`, cls: "text-red-500" };
    if (diff === 0) return { label: "Due today", cls: "text-amber-500" };
    if (diff <= 3) return { label: `${diff}d left`, cls: "text-amber-500" };
    return { label: `${diff}d left`, cls: "text-slate-400" };
  };

  const days = daysInfo();

  return (
    <div className={`bg-white rounded-xl border p-4 transition-shadow hover:shadow-md ${isOverdue ? "border-red-200 bg-red-50/40" : "border-slate-200"}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-base">{CATEGORY_ICON[task.category] || "📋"}</span>
            <span className="font-semibold text-slate-800 text-sm">{task.title}</span>
            {isOverdue && (
              <span className="text-[10px] font-bold bg-red-100 text-red-600 px-2 py-0.5 rounded-full uppercase tracking-wide">
                Overdue
              </span>
            )}
          </div>
          {task.description && (
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">{task.description}</p>
          )}
        </div>
        <span className={`text-xs font-medium px-2.5 py-1 rounded-full shrink-0 ${STATUS_STYLES[task.status]}`}>
          {task.status}
        </span>
      </div>

      <div className="flex items-center gap-3 mt-3 flex-wrap">
        <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-medium">
          {task.category}
        </span>
        <span className="flex items-center gap-1 text-xs text-slate-500">
          <span className={`w-1.5 h-1.5 rounded-full ${PRIORITY_DOT[task.priority]}`} />
          {task.priority}
        </span>
        <span className="text-xs text-slate-400 flex items-center gap-1">
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {task.due_date}
        </span>
        {days && (
          <span className={`text-xs font-medium ${days.cls}`}>{days.label}</span>
        )}
      </div>

      {next && (
        <div className="mt-3 pt-3 border-t border-slate-100">
          <button
            onClick={() => onStatusChange(task.id, next)}
            className="text-xs font-medium bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
            Mark as {next}
          </button>
        </div>
      )}
    </div>
  );
}
