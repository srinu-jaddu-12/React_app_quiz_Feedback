import { useState, useEffect, useRef } from "react";

export default function useQuiz(options = {}) {
  const apiUrl = options.apiUrl || "http://localhost:4000/questions";
  const timePerQuestion = options.timePerQuestion || 30;
  
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(timePerQuestion);
  const [isFinished, setIsFinished] = useState(false);

  const timerRef = useRef(null);

  // Fetch questions
  const fetchQuestions = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(apiUrl);
      if (!res.ok) throw new Error("Failed to fetch questions");
      const data = await res.json();
      setQuestions(data);
      setIndex(0);
      setScore(0);
      setTimeLeft(timePerQuestion);
      setIsFinished(false);
    } catch (err) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  // Timer effect
  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    
    if (questions.length === 0 || isFinished) return;
    
    setTimeLeft(timePerQuestion);
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          setIndex((i) => {
            const next = i + 1;
            if (next >= questions.length) {
              setIsFinished(true);
            }
            return next;
          });
          return timePerQuestion;
        }
        return t - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [questions, index, isFinished, timePerQuestion]);

  // Select option
  const selectOption = (optionIndex) => {
    if (isFinished || questions.length === 0 || index >= questions.length) return;
    
    const current = questions[index];
    if (current.correctIndex === optionIndex) {
      setScore((s) => s + 1);
    }
    
    const next = index + 1;
    if (next >= questions.length) {
      setIsFinished(true);
      if (timerRef.current) clearInterval(timerRef.current);
    } else {
      setIndex(next);
      setTimeLeft(timePerQuestion);
    }
  };

  // Restart quiz
  const restart = () => {
    fetchQuestions();
  };

  // Fetch on mount
  useEffect(() => {
    fetchQuestions();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return {
    questions,
    loading,
    error,
    index,
    score,
    timeLeft,
    isFinished,
    selectOption,
    restart,
  };
}
