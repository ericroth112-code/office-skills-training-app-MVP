import { useRoute, Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, PlayCircle, CheckCircle2, ChevronRight, FileText } from "lucide-react";
import { getLessonById } from "@/lib/mock-data";
import { useProgress } from "@/hooks/use-app-state";

export default function LessonPage() {
  const [, params] = useRoute("/lesson/:id");
  const { progress } = useProgress();
  const lesson = getLessonById(params?.id || "");

  if (!lesson) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold text-slate-900">Бүлэг олдсонгүй</h2>
        <Link href="/dashboard" className="text-primary hover:underline mt-4 inline-block">Буцах</Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-24">
      <Link href="/dashboard" className="inline-flex items-center gap-2 text-slate-500 hover:text-primary font-medium mb-8 transition-colors group">
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Дашборд руу буцах
      </Link>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl sm:text-5xl font-display font-bold text-slate-900 mb-4">{lesson.title}</h1>
        <p className="text-lg text-slate-600 max-w-3xl leading-relaxed mb-12">{lesson.description}</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Core Concepts */}
        <div className="lg:col-span-1 space-y-6">
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-6 h-6 text-primary" />
            Үндсэн ойлголтууд
          </h2>
          <div className="space-y-4">
            {lesson.items.map((item, idx) => (
              <motion.div 
                initial={{ opacity: 0, x: -20 }} 
                animate={{ opacity: 1, x: 0 }} 
                transition={{ delay: idx * 0.1 }}
                key={item.id} 
                className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 hover:shadow-md transition-shadow"
              >
                <h3 className="font-bold text-slate-900 text-lg mb-2">{item.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{item.shortDescription}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Exercises */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <PlayCircle className="w-6 h-6 text-primary" />
            Дасгалууд
          </h2>
          
          <div className="space-y-4">
            {lesson.exercises.map((exercise, idx) => {
              const isCompleted = progress.completedExercises.includes(exercise.id);
              const score = progress.scores[exercise.id];

              return (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ delay: 0.2 + idx * 0.1 }}
                  key={exercise.id}
                >
                  <Link href={`/exercise/${lesson.id}/${exercise.id}`}>
                    <div className={`bg-white rounded-2xl p-6 flex items-center justify-between cursor-pointer transition-all duration-300 group border
                      ${isCompleted ? 'border-green-200 hover:border-green-300 bg-green-50/30' : 'border-slate-200 hover:border-primary/30 hover:shadow-lg'}
                    `}>
                      <div className="flex items-center gap-5">
                        <div className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 shadow-sm
                          ${isCompleted ? 'bg-green-100 text-green-600' : 'bg-blue-50 text-primary group-hover:bg-primary group-hover:text-white transition-colors'}
                        `}>
                          {isCompleted ? <CheckCircle2 className="w-7 h-7" /> : <PlayCircle className="w-7 h-7 ml-1" />}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                              {exercise.type === 'definition_matching' ? 'Эвлүүлэх' : 'Сонгох'}
                            </span>
                            {isCompleted && (
                              <span className="text-xs font-bold px-2 py-0.5 rounded text-green-700 bg-green-100">
                                Оноо: {score}%
                              </span>
                            )}
                          </div>
                          <h3 className="font-bold text-lg text-slate-900 group-hover:text-primary transition-colors">{exercise.title}</h3>
                        </div>
                      </div>
                      <ChevronRight className={`w-6 h-6 ${isCompleted ? 'text-green-400' : 'text-slate-300 group-hover:text-primary group-hover:translate-x-1 transition-all'}`} />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
