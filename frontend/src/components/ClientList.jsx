export default function ClientList({ clients, selectedId, onSelect }) {
    return (
        <aside className="w-64 shrink-0 bg-white border-r border-gray-200 flex flex-col">
            <div className="px-4 py-4 border-b border-gray-200">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-500">Clients</h2>
            </div>
            <ul className="flex-1 overflow-y-auto">
                {clients.map((c) => (
                    <li key={c.id}>
                        <button
                            onClick={() => onSelect(c)}
                            className={`w-full text-left px-4 py-3 border-b border-gray-100 hover:bg-blue-50 transition-colors ${selectedId === c.id ? "bg-blue-50 border-l-4 border-l-blue-500" : ""
                                }`}
                        >
                            <p className="font-medium text-gray-800 text-sm">{c.company_name}</p>
                            <p className="text-xs text-gray-400 mt-0.5">
                                {c.entity_type} · {c.country}
                            </p>
                        </button>
                    </li>
                ))}
            </ul>
        </aside>
    );
}
