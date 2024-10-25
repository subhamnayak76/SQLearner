export interface Lesson {
  id: number;
  title: string;
  content: string;
  example: string;
  solution: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  expectedOutput?: any[];
}

export interface LessonProgress {
  lessonId: number;
  completed: boolean;
  lastAttempt?: string;
  success?: boolean;
}