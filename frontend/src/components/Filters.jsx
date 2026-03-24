const STATUSES = ["", "Pending", "In Progress", "Completed"];
const CATEGORIES = ["", "Tax", "Audit", "Legal", "Payroll"];

export default function Filters({ filters, onChange }) {
    return (
        <div className="flex gap-3 mb-4">
            <select
                value={filters.status}
                onChange={(e) => onChange({ ...filters, status: e.target.value })}
                className="text-sm border border-gray-200 rounded-md px-3 py-1.5 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
                {STATUSES.map((s) => (
                    <option key={s} value={s}>{s || "All Statuses"}</option>
                ))}
            </select>
            <select
                value={filters.category}
                onChange={(e) => onChange({ ...filters, category: e.target.value })}
                className="text-sm border border-gray-200 rounded-md px-3 py-1.5 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
                {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c || "All Categories"}</option>
                ))}
            </select>
        </div>
    );
}
