export default function StatsBar({ tasks }) {
    const today = new Date().toISOString().split("T")[0];
    const total = tasks.length;
    const pending = tasks.filter((t) => t.status === "Pending").length;
    const completed = tasks.filter((t) => t.status === "Completed").length;
    const overdue = tasks.filter(
        (t) => t.status !== "Completed" && t.due_date < today
    ).length;

    const stat = (label, value, color) => (
        <div className="flex flex-col items-center px-6 py-3">
            <span className={`text-2xl font-bold ${color}`}>{value}</span>
            <span className="text-xs text-gray-500 mt-0.5">{label}</span>
        </div>
    );

    return (
        <div className="flex divide-x divide-gray-200 bg-white border border-gray-200 rounded-lg mb-4">
            {stat("Total", total, "text-gray-800")}
            {stat("Pending", pending, "text-yellow-600")}
            {stat("Completed", completed, "text-green-600")}
            {stat("Overdue", overdue, "text-red-600")}
        </div>
    );
}
