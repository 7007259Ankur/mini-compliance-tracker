const BASE = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

export const getClients = () => fetch(`${BASE}/clients`).then((r) => r.json());

export const getTasks = (clientId, filters = {}) => {
    const params = new URLSearchParams();
    if (filters.status) params.set("status", filters.status);
    if (filters.category) params.set("category", filters.category);
    return fetch(`${BASE}/tasks/client/${clientId}?${params}`).then((r) => r.json());
};

export const createTask = (data) =>
    fetch(`${BASE}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    }).then((r) => r.json());

export const updateTaskStatus = (id, status) =>
    fetch(`${BASE}/tasks/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
    }).then((r) => r.json());
