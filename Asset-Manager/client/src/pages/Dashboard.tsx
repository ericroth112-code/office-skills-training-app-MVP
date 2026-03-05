import { useEffect } from "react";
import { useLocation, Link } from "wouter";
import { motion } from "framer-motion";
import { BookOpen, CheckCircle2, ChevronRight, Briefcase, Scale, FileText } from "lucide-react";
import { useUser, useProgress } from "@/hooks/use-app-state";
import { MOCK_LESSONS } from "@/lib/mock-data";

const ICON_MAP: Record<string, any> = {
  Briefcase: Briefcase,
  Scale: Scale,
  FileText: FileText,
};

export default function Dashboard() {
  const { user, isAuthenticated } = useUser();
  const { progress } = useProgress();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      setLocation("/auth");
    }
  }, [isAuthenticated, setLocation]);

  if (!isAuthenticated) return null;

  const totalExercises = MOCK_LESSONS.reduce((acc, l) => acc + l.exercises.length, 0);
  const completedExercises = progress.completedExercises.length;
  const globalProgress = totalExercises > 0 ? Math.round((completedExercises / totalExercises) * 100) : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="text-4xl font-display font-bold text-slate-900 mb-2">
          Сайн уу, <span className="text-primary">{user?.name}</span> 👋
        </h1>
        <p className="text-slate-500 text-lg">Өнөөдөр юу сурмаар байна даа?</p>
      </motion.div>

      {/* Stats Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 mb-12 flex flex-col md:flex-row items-center gap-8 justify-between relative overflow-hidden"
      >
        <div className="absolute right-0 top-0 w-64 h-64 bg-amber-100 rounded-full blur-[80px] -z-10 translate-x-1/2 -translate-y-1/2 opacity-50"></div>
        
        <div className="flex-1 w-full">
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Нийт ахиц</h3>
          <div className="flex items-end gap-4 mb-4">
            <span className="text-5xl font-display font-extrabold text-slate-900">{globalProgress}%</span>
            <span className="text-slate-500 font-medium mb-1.5">{completedExercises} / {totalExercises} дасгал</span>
          </div>
          
          <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${globalProgress}%` }}
              transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
              className="h-full bg-primary rounded-full"
            />
          </div>
        </div>

        <div className="hidden md:flex w-px h-24 bg-slate-200"></div>

        <div className="flex-1 w-full flex justify-around">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto bg-green-50 text-green-600 rounded-xl flex items-center justify-center mb-3">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <p className="text-2xl font-bold text-slate-900">{completedExercises}</p>
            <p className="text-sm text-slate-500 font-medium">Дууссан</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 mx-auto bg-blue-50 text-primary rounded-xl flex items-center justify-center mb-3">
              <BookOpen className="w-6 h-6" />
            </div>
            <p className="text-2xl font-bold text-slate-900">{MOCK_LESSONS.length}</p>
            <p className="text-sm text-slate-500 font-medium">Бүлэг сэдэв</p>
          </div>
        </div>
      </motion.div>

      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-display font-bold text-slate-900">Бүлгүүд</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_LESSONS.map((lesson, idx) => {
          const Icon = lesson.icon ? ICON_MAP[lesson.icon] || BookOpen : BookOpen;
          
          // Calculate lesson progress
          const lessonExercisesCompleted = lesson.exercises.filter(ex => progress.completedExercises.includes(ex.id)).length;
          const lessonTotal = lesson.exercises.length;
          const lessonProgressPct = lessonTotal > 0 ? Math.round((lessonExercisesCompleted / lessonTotal) * 100) : 0;
          
          return (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + idx * 0.1 }}
              key={lesson.id}
            >
              <Link href={`/lesson/${lesson.id}`}>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-xl hover:border-primary/30 transition-all duration-300 cursor-pointer group h-full flex flex-col hover:-translate-y-1">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    {lessonProgressPct === 100 && (
                      <span className="flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 px-2.5 py-1 rounded-full">
                        <CheckCircle2 className="w-3 h-3" />
                        Дууссан
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors">{lesson.title}</h3>
                  <p className="text-slate-500 text-sm line-clamp-2 mb-6 flex-1">{lesson.description}</p>
                  
                  <div className="mt-auto pt-4 border-t border-slate-100">
                    <div className="flex justify-between items-center text-sm font-medium mb-2">
                      <span className="text-slate-500">{lessonExercisesCompleted}/{lessonTotal} дасгал</span>
                      <span className={lessonProgressPct > 0 ? "text-primary" : "text-slate-400"}>{lessonProgressPct}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${lessonProgressPct === 100 ? 'bg-green-500' : 'bg-primary'}`}
                        style={{ width: `${lessonProgressPct}%` }}
                      />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
