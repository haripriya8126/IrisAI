/**
 * API client — talks to the Flask backend.
 * In dev, Vite proxies /api to http://127.0.0.1:5000
 */

const API_BASE = "/api";

async function handleResponse(response) {
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error || `Request failed (${response.status})`);
  }
  return data;
}

/** Load dashboard charts and model metrics */
export async function fetchDashboard() {
  const res = await fetch(`${API_BASE}/dashboard`);
  return handleResponse(res);
}

/** Predict species from four measurements (cm) */
export async function predictFlower(measurements) {
  const res = await fetch(`${API_BASE}/predict`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(measurements),
  });
  return handleResponse(res);
}

/** Health check — useful to verify backend is running */
export async function checkHealth() {
  const res = await fetch(`${API_BASE}/health`);
  return handleResponse(res);
}
