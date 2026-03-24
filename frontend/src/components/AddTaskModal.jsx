import { useState } from "react";

const CATEGORIES = ["Tax", "Audit", "Legal", "Payroll"];
const PRIORITIES = ["Low", "Medium", "High"];

function Field({ label, children }) {
    return (
        <div>
            <label className="text-xs font-medium text-slate-600 block mb-1">{label}</label>
            {children}
        </div>
    );
}

const inputCls = "w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white placeholder:text-slate-300";

export default function AddTaskModal({ clientId, onClose, onAdd }) {
    const [form, setForm] = useState({
        title: "", description: "", category: "Tax",
        due_date: "", priority: "Medium", status: "Pending",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.title.trim() || !form.due_date) {
            setError("Title and due date are required.");
            return;
        }
        setLoading(true);
        setError("");
        try {
            await onAdd({ ...form, client_id: clientId });
            onClose();
        } catch {
            setError("Failed to create task. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md animate-in fade-in">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                    <div>
                        <h3 className="font-semibold text-slate-800">Add New Task</h3>
                        <p className="text-xs text-slate-400 mt-0.5">Fill in the details below</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="px-6 py-5 flex flex-col gap-4">
                    {error && (
                        <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-100 px-3 py-2 rounded-lg">
                            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                            </svg>
                            {error}
                        </div>
                    )}

                    <Field label="Title *">
                        <input
                            value={form.title}
                            onChange={(e) => set("title", e.target.value)}
                            className={inputCls}
                            placeholder="e.g. Q2 Tax Filing"
                        />
                    </Field>

                    <Field label="Description">
                        <textarea
                            value={form.description}
                            onChange={(e) => set("description", e.target.value)}
                            rows={2}
                            className={`${inputCls} resize-none`}
                            placeholder="Optional details..."
                        />
                    </Field>

                    <div className="grid grid-cols-2 gap-3">
                        <Field label="Category *">
                            <select value={form.category} onChange={(e) => set("category", e.target.value)} className={inputCls}>
                                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                            </select>
                        </Field>
                        <Field label="Priority">
                            <select value={form.priority} onChange={(e) => set("priority", e.target.value)} className={inputCls}>
                                {PRIORITIES.map((p) => <option key={p}>{p}</option>)}
                            </select>
                        </Field>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <Field label="Due Date *">
                            <input
                                type="date"
                                value={form.due_date}
                                onChange={(e) => set("due_date", e.target.value)}
                                className={inputCls}
                            />
                        </Field>
                        <Field label="Status">
                            <select value={form.status} onChange={(e) => set("status", e.target.value)} className={inputCls}>
                                <option>Pending</option>
                                <option>In Progress</option>
                                <option>Completed</option>
                            </select>
                        </Field>
                    </div>

                    <div className="flex justify-end gap-2 pt-1">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg transition-colors font-medium"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-5 py-2 text-sm bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-lg transition-colors font-medium disabled:opacity-50 flex items-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                    </svg>
                                    Adding...
                                </>
                            ) : "Add Task"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
