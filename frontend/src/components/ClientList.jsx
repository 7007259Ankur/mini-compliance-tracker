function Avatar({ name }) {
    const initials = name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();
    const colors = [
        "bg-blue-100 text-blue-700",
        "bg-violet-100 text-violet-700",
        "bg-emerald-100 text-emerald-700",
        "bg-orange-100 text-orange-700",
        "bg-pink-100 text-pink-700",
    ];
    const color = colors[name.charCodeAt(0) % colors.length];
    return (
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${color}`}>
            {initials}
        </div>
    );
}

export default function ClientList({ clients, selectedId, onSelect }) {
    return (
        <aside className="w-64 shrink-0 bg-white border-r border-slate-200 flex flex-col">
            <div className="px-4 py-4 border-b border-slate-100">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">Clients</p>
                <p className="text-xs text-slate-500 mt-0.5">{clients.length} total</p>
            </div>
            <ul className="flex-1 overflow-y-auto py-1">
                {clients.map((c) => {
                    const isSelected = selectedId === c.id;
                    return (
                        <li key={c.id}>
                            <button
                                onClick={() => onSelect(c)}
                                className={`w-full text-left px-3 py-2.5 mx-1 rounded-lg flex items-center gap-3 transition-all my-0.5 ${isSelected
                                        ? "bg-blue-50 ring-1 ring-blue-200"
                                        : "hover:bg-slate-50"
                                    }`}
                                style={{ width: "calc(100% - 8px)" }}
                            >
                                <Avatar name={c.company_name} />
                                <div className="min-w-0">
                                    <p className={`text-sm font-medium truncate ${isSelected ? "text-blue-700" : "text-slate-700"}`}>
                                        {c.company_name}
                                    </p>
                                    <p className="text-[11px] text-slate-400 truncate">
                                        {c.entity_type} &middot; {c.country}
                                    </p>
                                </div>
                            </button>
                        </li>
                    );
                })}
            </ul>
        </aside>
    );
}
