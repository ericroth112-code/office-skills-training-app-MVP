import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { UserCircle, ArrowRight } from "lucide-react";
import { useUser } from "@/hooks/use-app-state";

export default function AuthPage() {
  const [name, setName] = useState("");
  const [, setLocation] = useLocation();
  const { login } = useUser();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      login(name.trim());
      setLocation("/dashboard");
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
      {/* subtle background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-100/50 blur-[120px]"></div>
        <div className="absolute top-[60%] -right-[10%] w-[40%] h-[40%] rounded-full bg-amber-100/50 blur-[120px]"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-[2rem] p-8 shadow-2xl shadow-slate-200/50 border border-slate-100">
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center">
              <UserCircle className="w-10 h-10 text-primary" />
            </div>
          </div>
          
          <div className="text-center mb-10">
            <h2 className="text-3xl font-display font-bold text-slate-900 mb-2">Тавтай морил</h2>
            <p className="text-slate-500">Сургалтаа эхлүүлэхийн тулд нэрээ оруулна уу.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-bold text-slate-700 block ml-1">
                Таны нэр
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Жишээ: Бат"
                className="w-full px-5 py-4 rounded-xl bg-slate-50 border-2 border-slate-100 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-medium text-lg"
                autoFocus
                required
              />
            </div>

            <button
              type="submit"
              disabled={!name.trim()}
              className="w-full py-4 rounded-xl font-bold text-lg bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 group"
            >
              Үргэлжлүүлэх
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
