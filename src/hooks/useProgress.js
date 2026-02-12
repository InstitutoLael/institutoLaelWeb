import { useState, useEffect } from 'react';

const STORAGE_KEY = 'lael_lms_progress_v1';
const NOTES_KEY = 'lael_lms_notes_v1';
const STREAK_KEY = 'lael_lms_streak_v1';

export function useProgress() {
  const [progress, setProgress] = useState({});
  const [notes, setNotes] = useState({});
  const [streak, setStreak] = useState({ count: 0, lastLogin: null });

  // Load from localStorage on mount
  useEffect(() => {
    const savedProgress = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    const savedNotes = JSON.parse(localStorage.getItem(NOTES_KEY) || '{}');
    const savedStreak = JSON.parse(localStorage.getItem(STREAK_KEY) || '{"count": 0, "lastLogin": null}');
    
    setProgress(savedProgress);
    setNotes(savedNotes);
    setStreak(savedStreak);

    // Update streak logic
    const today = new Date().toDateString();
    if (savedStreak.lastLogin !== today) {
      const newCount = (savedStreak.lastLogin === new Date(Date.now() - 86400000).toDateString()) 
        ? savedStreak.count + 1 
        : 1;
      
      const newStreak = { count: newCount, lastLogin: today };
      setStreak(newStreak);
      localStorage.setItem(STREAK_KEY, JSON.stringify(newStreak));
    }
  }, []);

  const markLessonComplete = (courseId, lessonId, isComplete = true) => {
    const newProgress = {
      ...progress,
      [courseId]: {
        ...(progress[courseId] || {}),
        [lessonId]: isComplete
      }
    };
    setProgress(newProgress);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));
  };

  const saveNote = (lessonId, text) => {
    const newNotes = { ...notes, [lessonId]: text };
    setNotes(newNotes);
    localStorage.setItem(NOTES_KEY, JSON.stringify(newNotes));
  };

  const getCourseProgress = (courseId, totalLessons) => {
    const courseData = progress[courseId] || {};
    const completedCount = Object.values(courseData).filter(Boolean).length;
    return totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;
  };

  return {
    progress,
    notes,
    streak: streak.count,
    markLessonComplete,
    saveNote,
    getCourseProgress,
    isLessonCompleted: (courseId, lessonId) => !!progress[courseId]?.[lessonId],
    getNote: (lessonId) => notes[lessonId] || ''
  };
}
