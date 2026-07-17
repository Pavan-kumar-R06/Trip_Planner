import { createContext, useContext, useMemo, useState } from "react";
import { CheckCircle2, Info, TriangleAlert, X } from "lucide-react";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = "info") => {
    const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    setToasts((prev) => [...prev, { id, message, type }]);

    window.setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const value = useMemo(() => ({ addToast }), []);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed top-4 right-4 z-[100] flex w-[min(92vw,24rem)] flex-col gap-2">
        {toasts.map((toast) => {
          const styles = {
            success: "border-emerald-500/20 bg-emerald-500/10 text-emerald-700",
            error: "border-red-500/20 bg-red-500/10 text-red-700",
            info: "border-primary/20 bg-primary/10 text-primary",
          };

          const Icon = {
            success: CheckCircle2,
            error: TriangleAlert,
            info: Info,
          }[toast.type] || Info;

          return (
            <div key={toast.id} className={`flex items-start gap-2 rounded-2xl border px-3 py-3 shadow-lg backdrop-blur ${styles[toast.type] || styles.info}`}>
              <Icon className="mt-0.5 h-4 w-4 shrink-0" />
              <p className="flex-1 text-sm font-medium">{toast.message}</p>
              <button onClick={() => removeToast(toast.id)} className="ml-2 shrink-0 rounded-full p-1 hover:bg-black/5" aria-label="Dismiss notification">
                <X className="h-4 w-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
