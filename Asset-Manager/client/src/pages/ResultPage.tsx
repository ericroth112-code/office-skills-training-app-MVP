import { useEffect } from "react";
import { useRoute, Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Trophy, ArrowRight, RotateCcw, BookOpen } from "lucide-react";
import { getExerciseById, getLessonById } from "@/lib/mock-data";
import { useProgress } from "@/hooks/use-app-state";

export default function ResultPage() {
  const [, params] = useRoute("/result/:lessonId/:exerciseId");
  const [, setLocation] = useLocation();
  const { getExerciseScore } = useProgress();

  const lesson = getLessonById(params?.lessonId || "");
  const exercise = getExerciseById(params?.lessonId || "", params?.exerciseId || "");
  const score = getExerciseScore(params?.exerciseId || "");

  const isSuccess = score === 100;

  useEffect(() => {
    if (isSuccess) {
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

      const interval: any = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
      }, 250);

      return () => clearInterval(interval);
    }
  }, [isSuccess]);

  if (!lesson || !exercise || score === null) {
    return <div className="p-8 text-center">Үр дүн олдсонгүй.</div>;
  }

  // Find next exercise
  const currentExIndex = lesson.exercises.findIndex(e => e.id === exercise.id);
  const nextExercise = lesson.exercises[currentExIndex + 1];

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", bounce: 0.4, duration: 0.6 }}
        className="w-full max-w-lg"
      >
        <div className="bg-white rounded-[2.5rem] p-10 shadow-2xl shadow-slate-200/50 border border-slate-100 text-center relative overflow-hidden">
          {/* Decor background depending on success */}
          <div className={`absolute inset-0 opacity-10 pointer-events-none ${isSuccess ? 'bg-[url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%2322c55e\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")]' : ''}`}></div>

          <div className="relative z-10">
            <motion.div 
              initial={{ scale: 0 }} 
              animate={{ scale: 1 }} 
              transition={{ delay: 0.2, type: "spring" }}
              className={`w-28 h-28 mx-auto rounded-full flex items-center justify-center mb-6 shadow-lg
                ${isSuccess ? 'bg-gradient-to-br from-green-400 to-green-600 shadow-green-500/30 text-white' : 'bg-gradient-to-br from-amber-400 to-orange-500 shadow-amber-500/30 text-white'}
              `}
            >
              {isSuccess ? <Trophy className="w-14 h-14" /> : <RotateCcw className="w-14 h-14" />}
            </motion.div>

            <h2 className="text-4xl font-display font-black text-slate-900 mb-4">
              {isSuccess ? "Гайхалтай!" : "Дахин оролдоорой"}
            </h2>
            
            <div className="bg-slate-50 rounded-2xl p-6 mb-8 text-left border border-slate-100">
              <h3 className="font-bold text-slate-700 mb-2">Тайлбар:</h3>
              <p className="text-slate-600 leading-relaxed">
                {exercise.explanation}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {!isSuccess && (
                <button
                  onClick={() => setLocation(`/exercise/${lesson.id}/${exercise.id}`)}
                  className="px-6 py-3.5 rounded-xl font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-5 h-5" /> Дахин хийх
                </button>
              )}
              
              {isSuccess && nextExercise ? (
                <button
                  onClick={() => setLocation(`/exercise/${lesson.id}/${nextExercise.id}`)}
                  className="px-8 py-3.5 rounded-xl font-bold text-white bg-primary hover:bg-blue-700 shadow-lg shadow-primary/30 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                >
                  Дараагийн дасгал <ArrowRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  onClick={() => setLocation(`/lesson/${lesson.id}`)}
                  className={`px-8 py-3.5 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
                    isSuccess 
                      ? 'text-white bg-primary hover:bg-blue-700 shadow-lg shadow-primary/30 hover:-translate-y-0.5' 
                      : 'text-white bg-slate-800 hover:bg-slate-900'
                  }`}
                >
                  <BookOpen className="w-5 h-5" /> Бүлэг рүү буцах
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
