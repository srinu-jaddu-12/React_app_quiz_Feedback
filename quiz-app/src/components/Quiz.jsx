import React, { useMemo, useState } from "react";
import useQuiz from "../hooks/useQuiz";
import QuestionCard from "./QuestionCard";
import Result from "./Result";

export default function Quiz({ playerName }) {
  const { questions, loading, error, index, score, timeLeft, isFinished, selectOption, restart } = useQuiz();
  const [postingResult, setPostingResult] = useState(false);
  const [postError, setPostError] = useState(null);

  const total = questions.length;

  // useMemo: Calculate percentage
  const percentage = useMemo(() => {
    if (total === 0) return 0;
    return Math.round((score / total) * 100);
  }, [score, total]);

  // Submit result to API
  const submitResult = async () => {
    setPostingResult(true);
    setPostError(null);
    try {
      const res = await fetch("http://localhost:4000/results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: playerName, score, total })
      });
      if (!res.ok) throw new Error("Failed to save result");
    } catch (err) {
      setPostError(err.message);
    } finally {
      setPostingResult(false);
    }
  };

  // Auto-submit when finished
  React.useEffect(() => {
    if (isFinished && total > 0) {
      submitResult();
    }
  }, [isFinished]);

  if (loading) {
    return <div style={{ textAlign: "center", padding: "40px", color: "#667eea" }}>
      <div style={{ fontSize: "3em", marginBottom: "20px" }}>⏳</div>
      <p>Loading questions...</p>
    </div>;
  }

  if (error) {
    return <div style={{
      textAlign: "center",
      padding: "40px",
      backgroundColor: "#ffe0e0",
      borderRadius: "8px",
      color: "#d32f2f"
    }}>
      <div style={{ fontSize: "3em", marginBottom: "20px" }}>❌</div>
      <p>Error: {error}</p>
      <p style={{ fontSize: "0.9em", marginTop: "10px" }}>Make sure json-server is running on port 4000</p>
    </div>;
  }

  if (isFinished) {
    return (
      <Result
        name={playerName}
        score={score}
        total={total}
        percentage={percentage}
        onRestart={restart}
        postingResult={postingResult}
        postError={postError}
      />
    );
  }

  const current = questions[index];
  const progressPercent = ((index + 1) / total) * 100;

  return (
    <div style={{
      backgroundColor: "white",
      borderRadius: "12px",
      padding: "40px",
      boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)"
    }}>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "20px",
        color: "#666"
      }}>
        <div>👤 {playerName}</div>
        <div>Question {Math.min(index + 1, total)} / {total}</div>
      </div>

      <div style={{
        width: "100%",
        height: "8px",
        backgroundColor: "#e0e0e0",
        borderRadius: "4px",
        overflow: "hidden",
        marginBottom: "20px"
      }}>
        <div style={{
          width: `${progressPercent}%`,
          height: "100%",
          backgroundColor: "#667eea",
          transition: "width 0.3s ease"
        }}></div>
      </div>

      <div style={{
        padding: "16px",
        backgroundColor: timeLeft <= 10 ? "#fff3cd" : "#f0f0f0",
        borderRadius: "8px",
        marginBottom: "20px",
        textAlign: "center"
      }}>
        <div style={{
          fontSize: timeLeft <= 10 ? "1.8em" : "1.5em",
          fontWeight: "bold",
          color: timeLeft <= 10 ? "#ff6b6b" : "#667eea"
        }}>
          ⏱️ {timeLeft}s
        </div>
      </div>

      <QuestionCard question={current} onSelect={selectOption} />
    </div>
  );
}
