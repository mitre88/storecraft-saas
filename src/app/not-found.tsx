import Link from "next/link";
import { ShoppingBag } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 mb-8 shadow-xl shadow-indigo-500/20">
          <ShoppingBag className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-7xl font-bold bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent mb-4">
          404
        </h1>
        <h2 className="text-2xl font-bold mb-3">Page not found</h2>
        <p className="text-muted-foreground mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center h-11 px-6 rounded-lg bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-medium hover:from-indigo-600 hover:to-violet-700 transition-all shadow-lg shadow-indigo-500/25"
          >
            Go Home
          </Link>
          <Link
            href="/store/demo"
            className="inline-flex items-center justify-center h-11 px-6 rounded-lg border font-medium hover:bg-muted transition-all"
          >
            Visit Demo Store
          </Link>
        </div>
      </div>
    </div>
  );
}
