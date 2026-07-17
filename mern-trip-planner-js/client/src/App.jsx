import { useMemo, useState, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate, useNavigationType } from "react-router-dom";
import { Navbar } from "@/components/navbar";
import { useToast } from "@/components/toast-provider";
import { Footer } from "@/components/footer";
import HomePage from "@/pages/Home";
import DestinationsPage from "@/pages/Destinations";
import DestinationDetailPage from "@/pages/DestinationDetail";
import PlannerPage from "@/pages/Planner";
import CalculatorPage from "@/pages/Calculator";
import DashboardPage from "@/pages/Dashboard";
import AboutPage from "@/pages/About";
import NotFoundPage from "@/pages/NotFound";
import AuthPage from "@/pages/Auth";
import AdminPage from "@/pages/Admin";

export default function App() {
  const { addToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const navigationType = useNavigationType();
  const [currentUser, setCurrentUser] = useState(() => {
    const stored = localStorage.getItem("tripwise-user");
    if (!stored) return null;

    const parsed = JSON.parse(stored);
    return parsed?.user || parsed;
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("tripwise-user", JSON.stringify(currentUser));
    }
  }, [currentUser]);

  useEffect(() => {
    if (!currentUser && ["/admin", "/dashboard"].includes(location.pathname)) {
      navigate("/", { replace: true });
    }
  }, [currentUser, location.pathname, navigate]);

  const authContext = useMemo(
    () => ({
      currentUser,
      login: (authResponse) => {
        const user = authResponse?.user || authResponse;
        if (user) {
          localStorage.setItem("tripwise-user", JSON.stringify(user));
          setCurrentUser(user);
        }
      },
      logout: () => {
        localStorage.removeItem("tripwise-user");
        localStorage.removeItem("tripwise-auth");
        sessionStorage.removeItem("tripwise-user");
        setCurrentUser(null);
        addToast("You have been logged out.", "info");
        navigate("/", { replace: true });
      },
    }),
    [currentUser, addToast, navigate]
  );

  return (
    <>
      <Navbar currentUser={currentUser} onLogout={authContext.logout} />
      <main className="min-h-screen">
        <div
          key={location.pathname}
          className="animate-[fadeIn_0.25s_ease-out]"
          style={{ animationName: navigationType === "POP" ? "none" : "fadeIn" }}
        >
          <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/destinations" element={<DestinationsPage />} />
          <Route path="/destinations/:slug" element={<DestinationDetailPage />} />
          <Route path="/planner" element={<PlannerPage />} />
          <Route path="/calculator" element={<CalculatorPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/auth" element={<AuthPage onAuthSuccess={authContext.login} currentUser={currentUser} />} />
          <Route path="/admin" element={<AdminPage currentUser={currentUser} />} />
          <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </main>
      <Footer />
    </>
  );
}
