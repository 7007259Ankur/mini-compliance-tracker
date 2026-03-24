const STATUSES = ["", "Pending", "In Progress", "Completed"];
const CATEGORIES = ["", "Tax", "Audit", "Legal", "Payroll"];

function Select({ value, onChange, options, placeholder }) {
    return (
        <div className="relative">
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="appearance-none text-sm border border-slate-200 rounded-lg pl-3 pr-8 py-2 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent cursor-pointer shadow-sm"
            >
                {options.map((o) => (
                    <option key={o} value={o}>{o || placeholder}</option>
                ))}
            </select>
            <svg className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
        </div>
    );
}

export default function Filters({ filters, onChange }) {
    const hasFilters = filters.status || filters.category;

    return (
        <div className="flex items-center gap-2 mb-4 flex-wrap">
            <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
            </svg>
            <Select
                value={filters.status}
                onChange={(v) => onChange({ ...filters, status: v })}
                options={STATUSES}
                placeholder="All Statuses"
            />
            <Select
                value={filters.category}
                onChange={(v) => onChange({ ...filters, category: v })}
                options={CATEGORIES}
                placeholder="All Categories"
            />
            {hasFilters && (
                <button
                    onClick={() => onChange({ status: "", category: "" })}
                    className="text-xs text-slate-400 hover:text-slate-600 px-2 py-1 rounded hover:bg-slate-100 transition-colors"
                >
                    Clear
                </button>
            )}
        </div>
    );
}
