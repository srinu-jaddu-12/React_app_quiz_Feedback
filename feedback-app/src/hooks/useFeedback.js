import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:4000/feedback';

export default function useFeedback(refreshTrigger = 0) {
  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Fetch all feedback
  const fetchFeedback = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Failed to fetch feedback');
      const data = await response.json();
      setFeedbackList(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
      setFeedbackList([]);
    } finally {
      setLoading(false);
    }
  };

  // Submit new feedback
  const submitFeedback = async (feedbackData) => {
    setSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...feedbackData,
          timestamp: new Date().toISOString()
        })
      });
      if (!response.ok) throw new Error('Failed to submit feedback');
      setSubmitSuccess(true);
      await fetchFeedback(); // Refresh list after submit
      return true;
    } catch (err) {
      setSubmitError(err.message);
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  // Fetch on mount and when refreshTrigger changes
  useEffect(() => {
    fetchFeedback();
  }, [refreshTrigger]);

  return {
    feedbackList,
    loading,
    error,
    submitting,
    submitError,
    submitSuccess,
    submitFeedback,
    fetchFeedback
  };
}
