import { useState, useEffect } from "react";
import { useRoute, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Check, X, HelpCircle } from "lucide-react";
import { getExerciseById, getLessonById } from "@/lib/mock-data";
import { useProgress } from "@/hooks/use-app-state";

export default function ExercisePage() {
  const [, params] = useRoute("/exercise/:lessonId/:exerciseId");
  const [, setLocation] = useLocation();
  const { saveExerciseScore } = useProgress();

  const lesson = getLessonById(params?.lessonId || "");
  const exercise = getExerciseById(params?.lessonId || "", params?.exerciseId || "");

  const [userAnswerStr, setUserAnswerStr] = useState<string>("");
  const [userAnswerArr, setUserAnswerArr] = useState<string[]>([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    // Reset state when exercise changes
    setUserAnswerStr("");
    setUserAnswerArr([]);
    setHasSubmitted(false);
    setIsCorrect(false);
  }, [exercise?.id]);

  if (!lesson || !exercise) {
    return <div className="p-8 text-center font-bold">Дасгал олдсонгүй</div>;
  }

  const handleSelectOption = (id: string) => {
    if (hasSubmitted) return;
    setUserAnswerStr(id);
  };

  const handleToggleWord = (id: string) => {
    if (hasSubmitted) return;
    if (userAnswerArr.includes(id)) {
      setUserAnswerArr(prev => prev.filter(item => item !== id));
    } else {
      setUserAnswerArr(prev => [...prev, id]);
    }
  };

  const canSubmit = exercise.type === 'identity_guess' ? !!userAnswerStr : userAnswerArr.length === exercise.options?.length;

  const handleSubmit = () => {
    if (!canSubmit) return;

    let correct = false;
    if (exercise.type === 'identity_guess') {
      correct = userAnswerStr === exercise.correctAnswer;
    } else if (exercise.type === 'definition_matching') {
      const correctArr = exercise.correctAnswer as string[];
      correct = userAnswerArr.length === correctArr.length && 
                userAnswerArr.every((val, index) => val === correctArr[index]);
    }

    setIsCorrect(correct);
    setHasSubmitted(true);
    saveExerciseScore(exercise.id, lesson.id, correct ? 100 : 0);

    // Wait a brief moment to show validation state, then go to result
    setTimeout(() => {
      setLocation(`/result/${lesson.id}/${exercise.id}`);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 min-h-[calc(100vh-4rem)] flex flex-col">
      <button 
        onClick={() => setLocation(`/lesson/${lesson.id}`)}
        className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-800 font-medium mb-6 self-start"
      >
        <ArrowLeft className="w-4 h-4" /> Хаах
      </button>

      <div className="flex-1 flex flex-col">
        <div className="bg-white rounded-[2rem] p-8 sm:p-12 shadow-xl shadow-slate-200/50 border border-slate-100 flex-1 flex flex-col relative overflow-hidden">
          
          <div className="mb-8">
            <span className="inline-block px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-sm font-bold tracking-wide uppercase mb-4">
              {exercise.title}
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 leading-tight">
              {exercise.instructions}
            </h2>
            <div className="mt-6 p-5 rounded-2xl bg-blue-50/50 border border-blue-100 text-lg text-slate-800 font-medium">
              {exercise.question}
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-center">
            {/* Type A: Identity Guess (Multiple Choice) */}
            {exercise.type === 'identity_guess' && exercise.options && (
              <div className="space-y-3">
                {exercise.options.map((opt) => {
                  const isSelected = userAnswerStr === opt.id;
                  const showValidation = hasSubmitted;
                  const isActuallyCorrect = opt.id === exercise.correctAnswer;
                  
                  let borderClass = "border-slate-200 hover:border-primary/40 hover:bg-slate-50";
                  let icon = null;

                  if (isSelected) {
                    borderClass = "border-primary bg-blue-50/50 ring-2 ring-primary/20";
                  }

                  if (showValidation) {
                    if (isActuallyCorrect) {
                      borderClass = "border-green-500 bg-green-50 ring-2 ring-green-200";
                      icon = <Check className="w-5 h-5 text-green-600" />;
                    } else if (isSelected && !isActuallyCorrect) {
                      borderClass = "border-red-400 bg-red-50 ring-2 ring-red-200";
                      icon = <X className="w-5 h-5 text-red-500" />;
                    } else {
                      borderClass = "border-slate-200 opacity-50";
                    }
                  }

                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleSelectOption(opt.id)}
                      disabled={hasSubmitted}
                      className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-200 flex items-center justify-between group ${borderClass}`}
                    >
                      <span className={`text-lg font-medium ${isSelected && !showValidation ? 'text-primary' : 'text-slate-700'}`}>
                        {opt.text}
                      </span>
                      {icon && <span className="shrink-0 ml-4">{icon}</span>}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Type B: Definition Matching (Sentence Ordering) */}
            {exercise.type === 'definition_matching' && exercise.options && (
              <div className="space-y-8">
                {/* Answer Dropzone */}
                <div className="min-h-[100px] p-6 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 flex flex-wrap gap-3 items-center content-start">
                  <AnimatePresence>
                    {userAnswerArr.length === 0 ? (
                      <motion.span 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="text-slate-400 font-medium"
                      >
                        Үгсийг энд дарж байрлуулна уу...
                      </motion.span>
                    ) : (
                      userAnswerArr.map((id, index) => {
                        const opt = exercise.options!.find(o => o.id === id);
                        
                        let bgClass = "bg-primary text-white border-transparent shadow-md";
                        if (hasSubmitted) {
                          const correctArr = exercise.correctAnswer as string[];
                          if (correctArr[index] === id) {
                            bgClass = "bg-green-500 text-white border-transparent";
                          } else {
                            bgClass = "bg-red-500 text-white border-transparent";
                          }
                        }

                        return (
                          <motion.button
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            key={id}
                            onClick={() => handleToggleWord(id)}
                            disabled={hasSubmitted}
                            className={`px-4 py-2.5 rounded-xl font-medium text-lg transition-colors border ${bgClass}`}
                          >
                            {opt?.text}
                          </motion.button>
                        );
                      })
                    )}
                  </AnimatePresence>
                </div>

                {/* Available Options */}
                <div className="flex flex-wrap gap-3 justify-center">
                  {exercise.options.filter(o => !userAnswerArr.includes(o.id)).map(opt => (
                    <motion.button
                      layout
                      key={opt.id}
                      onClick={() => handleToggleWord(opt.id)}
                      disabled={hasSubmitted}
                      className="px-4 py-2.5 rounded-xl border-2 border-slate-200 bg-white text-slate-700 font-medium text-lg hover:border-primary/40 hover:text-primary hover:bg-slate-50 transition-all shadow-sm"
                    >
                      {opt.text}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="mt-10 pt-6 border-t border-slate-100 flex justify-end">
            <button
              onClick={handleSubmit}
              disabled={!canSubmit || hasSubmitted}
              className={`px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg ${
                !canSubmit 
                  ? 'bg-slate-100 text-slate-400 shadow-none cursor-not-allowed' 
                  : hasSubmitted
                    ? isCorrect ? 'bg-green-500 text-white shadow-green-500/30' : 'bg-red-500 text-white shadow-red-500/30'
                    : 'bg-primary text-primary-foreground hover:shadow-primary/40 hover:-translate-y-0.5 active:translate-y-0'
              }`}
            >
              {hasSubmitted ? (isCorrect ? 'Зөв байна!' : 'Буруу байна') : 'Шалгах'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
