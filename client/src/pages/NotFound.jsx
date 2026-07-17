import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-24 text-center">
      <h1 className="text-4xl font-bold text-foreground">404</h1>
      <p className="mt-2 text-muted-foreground">This page doesn't exist.</p>
      <Link to="/" className="mt-6 inline-flex items-center gap-1.5 text-primary hover:underline">
        <ArrowLeft className="h-4 w-4" /> Back home
      </Link>
    </div>
  );
}
