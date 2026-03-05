import { useLocalStorage } from "./use-local-storage";
import type { User, Progress } from "@shared/schema";

// Default empty progress
const DEFAULT_PROGRESS: Progress = {
  completedExercises: [],
  lessonStatus: {},
  scores: {}
};

export function useUser() {
  const [user, setUser] = useLocalStorage<User | null>("app_user", null);
  
  const login = (name: string) => {
    const newUser = { id: crypto.randomUUID(), name };
    setUser(newUser);
    return newUser;
  };

  const logout = () => {
    setUser(null);
  };

  return { user, login, logout, isAuthenticated: !!user };
}

export function useProgress() {
  const [progress, setProgress] = useLocalStorage<Progress>("app_progress", DEFAULT_PROGRESS);

  const saveExerciseScore = (exerciseId: string, lessonId: string, score: number) => {
    setProgress((prev) => {
      const newScores = { ...prev.scores, [exerciseId]: score };
      const newCompleted = prev.completedExercises.includes(exerciseId) 
        ? prev.completedExercises 
        : [...prev.completedExercises, exerciseId];
      
      // Basic logic to set lesson as in_progress or completed could go here
      const newLessonStatus = { ...prev.lessonStatus, [lessonId]: "in_progress" as const };

      return {
        ...prev,
        scores: newScores,
        completedExercises: newCompleted,
        lessonStatus: newLessonStatus
      };
    });
  };

  const getExerciseScore = (exerciseId: string) => {
    return progress.scores[exerciseId] ?? null;
  };

  const isExerciseCompleted = (exerciseId: string) => {
    return progress.completedExercises.includes(exerciseId);
  };

  return {
    progress,
    saveExerciseScore,
    getExerciseScore,
    isExerciseCompleted
  };
}
