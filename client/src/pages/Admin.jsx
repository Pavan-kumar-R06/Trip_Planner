import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useToast } from "@/components/toast-provider";

const blankDestination = {
  slug: "",
  name: "",
  state: "",
  tagline: "",
  image: "",
  description: "",
  baseBudget: 0,
  rating: 0,
  bestTime: "",
  idealDays: "",
  attractions: [{ name: "", description: "" }],
  highlights: [""],
  itinerary: [{ title: "", activities: [""], attractions: [""], meals: "", estimatedExpense: 0 }],
};

export default function AdminPage({ currentUser }) {
  const [destinations, setDestinations] = useState([]);
  const [trips, setTrips] = useState([]);
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState(blankDestination);
  const [editingSlug, setEditingSlug] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { addToast } = useToast();

  const loadData = async () => {
    const [destResponse, tripResponse, userResponse] = await Promise.all([
      api.getDestinations(),
      api.getAdminTrips(),
      api.getUsers(),
    ]);
    setDestinations(destResponse);
    setTrips(tripResponse);
    setUsers(userResponse);
  };

  useEffect(() => {
    loadData().catch(() => setMessage("Unable to load admin data"));
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setForm(blankDestination);
    setEditingSlug(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      if (editingSlug) {
        await api.updateDestination(editingSlug, form);
        setMessage("Destination updated");
        addToast("Destination updated successfully.", "success");
      } else {
        await api.createDestination(form);
        setMessage("Destination created");
        addToast("Destination created successfully.", "success");
      }
      await loadData();
      resetForm();
    } catch (error) {
      setMessage(error.message || "Action failed");
      addToast(error.message || "Action failed", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (slug) => {
    if (!window.confirm("Are you sure you want to delete this destination?")) return;
    setLoading(true);
    try {
      await api.deleteDestination(slug);
      await loadData();
      setMessage("Destination deleted");
      addToast("Destination deleted successfully.", "success");
    } catch (error) {
      setMessage(error.message || "Delete failed");
      addToast(error.message || "Delete failed", "error");
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (destination) => {
    setEditingSlug(destination.slug);
    setForm({ ...destination });
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    if (id === currentUser?.id) {
      setMessage("You cannot remove your own admin account from this panel.");
      return;
    }
    try {
      await api.deleteUser(id);
      await loadData();
      setMessage("User deleted");
      addToast("User deleted successfully.", "success");
    } catch (error) {
      setMessage(error.message || "Delete failed");
      addToast(error.message || "Delete failed", "error");
    }
  };

  if (currentUser?.role !== "admin") {
    return (
      <section className="mx-auto max-w-6xl px-4 py-16 text-center">
        <h1 className="text-3xl font-semibold text-foreground">Access denied</h1>
        <p className="mt-3 text-muted-foreground">Only administrators can manage destinations and trips.</p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:px-6">
      <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Admin portal</p>
          <h1 className="text-3xl font-semibold text-foreground">Manage destinations and trip activity</h1>
          <p className="mt-2 text-muted-foreground">Welcome, {currentUser?.name}. Add, edit, or remove destinations and review recent user trip submissions.</p>
        </div>
        <button onClick={resetForm} className="rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground">
          {editingSlug ? "Cancel edit" : "Reset form"}
        </button>
      </div>

      {message && <div className="mb-6 rounded-2xl border border-primary/20 bg-primary/10 px-4 py-3 text-sm text-primary">{message}</div>}

      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <form onSubmit={handleSubmit} className="space-y-4 rounded-3xl border border-border/70 bg-card p-6 shadow-sm">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">Slug</label>
              <input name="slug" value={form.slug} onChange={handleChange} required className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">Name</label>
              <input name="name" value={form.name} onChange={handleChange} required className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">State</label>
              <input name="state" value={form.state} onChange={handleChange} required className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">Tagline</label>
              <input name="tagline" value={form.tagline} onChange={handleChange} required className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">Image URL</label>
              <input name="image" value={form.image} onChange={handleChange} required className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">Base Budget</label>
              <input name="baseBudget" type="number" value={form.baseBudget} onChange={handleChange} required className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">Rating</label>
              <input name="rating" type="number" step="0.1" value={form.rating} onChange={handleChange} required className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">Best Time</label>
              <input name="bestTime" value={form.bestTime} onChange={handleChange} required className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">Ideal Days</label>
              <input name="idealDays" value={form.idealDays} onChange={handleChange} required className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm" />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows="3" required className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm" />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Highlights (comma separated)</label>
            <input value={form.highlights.join(", ")} onChange={(event) => setForm((prev) => ({ ...prev, highlights: event.target.value.split(",").map((item) => item.trim()).filter(Boolean) }))} className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm" />
          </div>

          <button type="submit" disabled={loading} className="w-full rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground disabled:opacity-70">
            {loading ? "Saving..." : editingSlug ? "Update destination" : "Create destination"}
          </button>
        </form>

        <div className="space-y-6">
          <div className="rounded-3xl border border-border/70 bg-card p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-foreground">Destinations</h2>
            <div className="mt-4 space-y-3">
              {destinations.map((destination) => (
                <div key={destination._id} className="rounded-2xl border border-border/70 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-foreground">{destination.name}</p>
                      <p className="text-sm text-muted-foreground">{destination.state}</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => startEdit(destination)} className="rounded-full border border-border px-3 py-1 text-sm">Edit</button>
                      <button onClick={() => handleDelete(destination.slug)} className="rounded-full border border-red-500/30 px-3 py-1 text-sm text-red-600">Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-border/70 bg-card p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-foreground">User accounts</h2>
            <div className="mt-4 space-y-3">
              {users.map((user) => (
                <div key={user.id} className="rounded-2xl border border-border/70 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-foreground">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email} • {user.role}</p>
                      <p className="mt-1 text-sm text-muted-foreground">Trips: {user.tripCount} • Last trip: {user.lastTrip || "None"}</p>
                    </div>
                    <button onClick={() => handleDeleteUser(user.id)} className="rounded-full border border-red-500/30 px-3 py-1 text-sm text-red-600">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-border/70 bg-card p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-foreground">User trip submissions</h2>
            <div className="mt-4 space-y-3">
              {trips.slice(0, 5).map((trip) => (
                <div key={trip._id} className="rounded-2xl border border-border/70 p-4">
                  <p className="font-semibold text-foreground">{trip.destinationName}</p>
                  <p className="text-sm text-muted-foreground">Traveler: {trip.travelerName || "Guest"} • {trip.days} days • {trip.category}</p>
                  <p className="mt-1 text-sm font-medium text-primary">Budget: ₹{trip.totalBudget?.toLocaleString("en-IN")}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
