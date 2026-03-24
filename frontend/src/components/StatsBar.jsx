function StatCard({ label, value, color, icon }) {
    return (
        <div className="flex-1 bg-white rounded-xl border border-slate-200 px-5 py-4 flex items-center gap-4">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color.bg}`}>
                {icon}
            </div>
            <div>
                <p className={`text-2xl font-bold ${color.text}`}>{value}</p>
                <p className="text-xs text-slate-500 mt-0.5">{label}</p>
            </div>
        </div>
    );
}

export default function StatsBar({ tasks }) {
    const today = new Date().toISOString().split("T")[0];
    const total = tasks.length;
    const pending = tasks.filter((t) => t.status === "Pending").length;
    const completed = tasks.filter((t) => t.status === "Completed").length;
    const overdue = tasks.filter((t) => t.status !== "Completed" && t.due_date < today).length;

    return (
        <div className="flex gap-3 mb-5 flex-wrap">
            <StatCard
                label="Total Tasks"
                value={total}
                color={{ bg: "bg-slate-100", text: "text-slate-700" }}
                icon={<svg className="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2" /></svg>}
            />
            <StatCard
                label="Pending"
                value={pending}
                color={{ bg: "bg-amber-50", text: "text-amber-600" }}
                icon={<svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
            />
            <StatCard
                label="Completed"
                value={completed}
                color={{ bg: "bg-emerald-50", text: "text-emerald-600" }}
                icon={<svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
            />
            <StatCard
                label="Overdue"
                value={overdue}
                color={{ bg: "bg-red-50", text: "text-red-600" }}
                icon={<svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" /></svg>}
            />
        </div>
    );
}
