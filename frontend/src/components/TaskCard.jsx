const STATUS_COLORS = {
    Pending: "bg-yellow-100 text-yellow-700",
    "In Progress": "bg-blue-100 text-blue-700",
    Completed: "bg-green-100 text-green-700",
};

const PRIORITY_COLORS = {
    High: "text-red-600",
    Medium: "text-yellow-600",
    Low: "text-gray-400",
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

    return (
        <div
            className={`bg-white rounded-lg border p-4 flex flex-col gap-2 ${isOverdue ? "border-red-400 bg-red-50" : "border-gray-200"
                }`}
        >
            <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium text-gray-800 text-sm">{task.title}</span>
                        {isOverdue && (
                            <span className="text-xs font-semibold bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
                                OVERDUE
                            </span>
                        )}
                    </div>
                    {task.description && (
                        <p className="text-xs text-gray-500 mt-1">{task.description}</p>
                    )}
                </div>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full shrink-0 ${STATUS_COLORS[task.status]}`}>
                    {task.status}
                </span>
            </div>

            <div className="flex items-center gap-4 text-xs text-gray-500 flex-wrap">
                <span className="bg-gray-100 px-2 py-0.5 rounded">{task.category}</span>
                <span className={`font-medium ${PRIORITY_COLORS[task.priority]}`}>
                    {task.priority} Priority
                </span>
                <span>Due: {task.due_date}</span>
            </div>

            {next && (
                <button
                    onClick={() => onStatusChange(task.id, next)}
                    className="self-start text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md transition-colors mt-1"
                >
                    Mark as {next}
                </button>
            )}
        </div>
    );
}
