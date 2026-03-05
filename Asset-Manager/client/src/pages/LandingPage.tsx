import { motion } from "framer-motion";
import { Link, useLocation } from "wouter";
import { ArrowRight, Brain, Trophy, Briefcase, ChevronRight } from "lucide-react";
import { useUser } from "@/hooks/use-app-state";

export default function LandingPage() {
  const { isAuthenticated } = useUser();
  const [, setLocation] = useLocation();

  const handleStart = () => {
    if (isAuthenticated) {
      setLocation("/dashboard");
    } else {
      setLocation("/auth");
    }
  };

  const features = [
    {
      icon: Briefcase,
      title: "Оффисын нэр томьёо",
      description: "Албан харилцааны чухал үг хэллэгүүдийг сурах."
    },
    {
      icon: Brain,
      title: "Интерактив дасгал",
      description: "Кейс болон тоглоомын аргаар мэдлэгээ баталгаажуулах."
    },
    {
      icon: Trophy,
      title: "Явцаа хянах",
      description: "Өөрийн сурлагын ахиц дэвшлийг харж урамших."
    }
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center bg-[url('https://pixabay.com/get/g835b26b78ee39e541d0ad45f7339158f8b380b81d0231ba670d48d21f0eefc1c319584d506192956c11bb72b0eb7ed192a91ccfebdf22309d4cfd2553326a135_1280.jpg')] bg-cover bg-center bg-fixed relative">
      {/* Dark/Light overlay wash for readability */}
      <div className="absolute inset-0 bg-slate-50/90 backdrop-blur-[2px]"></div>

      <main className="relative z-10 flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col items-center justify-center text-center">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100/50 text-primary border border-blue-200 shadow-sm font-medium text-sm mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Шинэ аргаар суралцах
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-extrabold text-slate-900 leading-[1.1]">
            Оффисын ур чадвараа <br />
            <span className="text-gradient">шинэ түвшинд</span> гарга
          </h1>
          
          <p className="text-lg sm:text-xl text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
            Албан хэрэг хөтлөлт, хуулийн кейс болон нэр томьёог интерактив тоглоомын аргаар хялбар бөгөөд хурдан суралцаарай.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={handleStart}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-lg bg-gradient-to-r from-primary to-blue-600 text-white shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              Сурч эхлэх
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mt-24 w-full"
        >
          {features.map((feature, idx) => (
            <div key={idx} className="glass-card rounded-3xl p-8 text-left hover-lift group">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
              <p className="text-slate-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </motion.div>
      </main>
    </div>
  );
}
