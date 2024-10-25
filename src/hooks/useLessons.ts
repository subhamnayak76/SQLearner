import { useState, useEffect } from 'react';
import { Lesson } from '../types/lesson';
import * as api from '../services/api';

export function useLessons() {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadLessons();
  }, []);

  async function loadLessons() {
    try {
      const data = await api.getLessons();
      setLessons(data);
      if (data.length > 0) {
        setCurrentLesson(data[0]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load lessons');
    } finally {
      setLoading(false);
    }
  }

  function nextLesson() {
    if (!currentLesson) return;
    const currentIndex = lessons.findIndex(l => l.id === currentLesson.id);
    if (currentIndex < lessons.length - 1) {
      setCurrentLesson(lessons[currentIndex + 1]);
    }
  }

  function previousLesson() {
    if (!currentLesson) return;
    const currentIndex = lessons.findIndex(l => l.id === currentLesson.id);
    if (currentIndex > 0) {
      setCurrentLesson(lessons[currentIndex - 1]);
    }
  }

  return {
    lessons,
    currentLesson,
    loading,
    error,
    nextLesson,
    previousLesson,
    setCurrentLesson,
  };
}