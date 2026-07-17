const API_BASE = (import.meta.env.VITE_API_URL || "https://trip-planner-qb1t-git-main-pavankumar060905-8109s-projects.vercel.app").replace(/\/$/, "");
console.log("API_BASE =", API_BASE);
async function request(path, options = {}) {
  const headers = {};

  if (options.body) {
    headers["Content-Type"] = "application/json";
  }

  const res = await fetch(`${API_BASE}/api${path}`, {
    ...options,
    headers: {
      ...headers,
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message || `Request failed: ${res.status}`);
  }

  return res.json();
}

export const api = {
  register: (name, email, password, role = "user") =>
    request("/auth/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password, role }),
    }),

  login: (email, password) =>
    request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  getDestinations: () => request("/destinations"),
  getDestination: (slug) => request(`/destinations/${slug}`),
  createDestination: (payload) =>
    request("/destinations", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  updateDestination: (slug, payload) =>
    request(`/destinations/${slug}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    }),
  deleteDestination: (slug) =>
    request(`/destinations/${slug}`, {
      method: "DELETE",
    }),
  getAdminTrips: () => request("/trips/admin"),
  getUsers: () => request("/users"),
  deleteUser: (id) => request(`/users/${id}`, { method: "DELETE" }),

  getPlannerOptions: () => request("/planner/options"),

  getItinerary: (dest, days, category) =>
    request(`/planner/itinerary?dest=${encodeURIComponent(dest)}&days=${days}&category=${category}`),

  getBudget: (dest, days, category) =>
    request(`/planner/budget?dest=${encodeURIComponent(dest)}&days=${days}&category=${category}`),

  saveTrip: (trip) =>
    request("/trips", {
      method: "POST",
      body: JSON.stringify(trip),
    }),

  getRecentTrips: (limit = 5) => request(`/trips/recent?limit=${limit}`),

  getTripStats: () => request("/trips/stats"),
};
