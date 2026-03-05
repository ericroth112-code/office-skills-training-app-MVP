import { Link, useLocation } from "wouter";
import { BookOpen, LogOut, User as UserIcon } from "lucide-react";
import { useUser } from "@/hooks/use-app-state";

export function Navbar() {
  const { user, logout, isAuthenticated } = useUser();
  const [, setLocation] = useLocation();

  const handleLogout = () => {
    logout();
    setLocation("/");
  };

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-xl bg-white/80 border-b border-slate-200 shadow-sm shadow-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group cursor-pointer">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white shadow-md shadow-primary/20 group-hover:scale-105 transition-transform">
            <BookOpen className="w-5 h-5" />
          </div>
          <span className="font-display font-bold text-xl text-slate-900 tracking-tight">
            Edu<span className="text-primary">Office</span>
          </span>
        </Link>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full">
                <UserIcon className="w-4 h-4 text-slate-500" />
                <span className="text-sm font-medium text-slate-700">{user?.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 text-slate-500 hover:text-destructive hover:bg-destructive/10 rounded-full transition-colors"
                title="Гарах"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </>
          ) : (
            <Link 
              href="/auth"
              className="px-6 py-2.5 rounded-xl font-semibold bg-primary text-primary-foreground hover:bg-primary/90 shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 transition-all active:scale-95"
            >
              Нэвтрэх
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
