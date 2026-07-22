const API_BASE = (import.meta.env.VITE_API_URL || "https://trip-planner-git-main-pavankumar060905-8109s-projects.vercel.app").replace(/\/$/, "");
console.log("API_BASE =", API_BASE);

// Simple in-memory cache to avoid refetching on route transitions
const _cache = new Map();
function cached(key, fetcher) {
  if (_cache.has(key)) return Promise.resolve(_cache.get(key));
  return fetcher().then((res) => {
    _cache.set(key, res);
    return res;
  });
}
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

  // if (!res.ok) {
  //   const body = await res.json().catch(() => ({}));
  //   throw new Error(body.message || `Request failed: ${res.status}`);
  // }
if (!res.ok) {
  const text = await res.text();
  console.error("API Error:", res.status, text);
  throw new Error(text || `Request failed: ${res.status}`);
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

  getDestinations: () => cached("destinations", () => request("/destinations")),
  getDestination: (slug) => cached(`destination:${slug}`, () => request(`/destinations/${slug}`)),
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
  getAdminTrips: () => cached("adminTrips", () => request("/trips/admin")),
  getUsers: () => request("/users"),
  deleteUser: (id) => request(`/users/${id}`, { method: "DELETE" }),

  getPlannerOptions: () => cached("plannerOptions", () => request("/planner/options")),

  getItinerary: (dest, days, category) =>
    cached(`itinerary:${dest}:${days}:${category}`, () =>
      request(`/planner/itinerary?dest=${encodeURIComponent(dest)}&days=${days}&category=${category}`)
    ),

  getBudget: (dest, days, category) =>
    cached(`budget:${dest}:${days}:${category}`, () =>
      request(`/planner/budget?dest=${encodeURIComponent(dest)}&days=${days}&category=${category}`)
    ),
  
  // expose synchronous cache getter for UI to read cached responses immediately
  getCached: (key) => _cache.get(key),

  saveTrip: (trip) =>
    request("/trips", {
      method: "POST",
      body: JSON.stringify(trip),
    }),

  


  getRecentTrips: (userId, limit = 5) =>
    request(`/trips/recent?userId=${userId}&limit=${limit}`),

getTripStats: (userId) =>
    request(`/trips/stats?userId=${userId}`),
};
