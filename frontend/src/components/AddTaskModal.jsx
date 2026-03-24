import { useState } from "react";

const CATEGORIES = ["Tax", "Audit", "Legal", "Payroll"];
const PRIORITIES = ["Low", "Medium", "High"];

export default function AddTaskModal({ clientId, onClose, onAdd }) {
    const [form, setForm] = useState({
        title: "",
        description: "",
        category: "Tax",
        due_date: "",
        priority: "Medium",
        status: "Pending",
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
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                    <h3 className="font-semibold text-gray-800">Add New Task</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl leading-none">&times;</button>
                </div>
                <form onSubmit={handleSubmit} className="px-6 py-4 flex flex-col gap-4">
                    {error && <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded">{error}</p>}

                    <div>
                        <label className="text-xs font-medium text-gray-600 block mb-1">Title *</label>
                        <input
                            value={form.title}
                            onChange={(e) => set("title", e.target.value)}
                            className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="e.g. Q2 Tax Filing"
                        />
                    </div>

                    <div>
                        <label className="text-xs font-medium text-gray-600 block mb-1">Description</label>
                        <textarea
                            value={form.description}
                            onChange={(e) => set("description", e.target.value)}
                            rows={2}
                            className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="text-xs font-medium text-gray-600 block mb-1">Category *</label>
                            <select
                                value={form.category}
                                onChange={(e) => set("category", e.target.value)}
                                className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                            >
                                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="text-xs font-medium text-gray-600 block mb-1">Priority</label>
                            <select
                                value={form.priority}
                                onChange={(e) => set("priority", e.target.value)}
                                className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                            >
                                {PRIORITIES.map((p) => <option key={p}>{p}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="text-xs font-medium text-gray-600 block mb-1">Due Date *</label>
                            <input
                                type="date"
                                value={form.due_date}
                                onChange={(e) => set("due_date", e.target.value)}
                                className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                        <div>
                            <label className="text-xs font-medium text-gray-600 block mb-1">Status</label>
                            <select
                                value={form.status}
                                onChange={(e) => set("status", e.target.value)}
                                className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                            >
                                <option>Pending</option>
                                <option>In Progress</option>
                                <option>Completed</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md">
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md disabled:opacity-50"
                        >
                            {loading ? "Adding..." : "Add Task"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
