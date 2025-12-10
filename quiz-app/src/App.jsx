import React, { useState } from "react";
import Quiz from "./components/Quiz";

export default function App() {
  const [playerName, setPlayerName] = useState("");
  const [quizStarted, setQuizStarted] = useState(false);

  const handleStartQuiz = () => {
    if (playerName.trim()) {
      setQuizStarted(true);
    }
  };

  return (
    <div style={{
      backgroundColor: "white",
      borderRadius: "12px",
      padding: "40px",
      boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
      textAlign: "center"
    }}>
      {!quizStarted ? (
        <>
          <h1 style={{ color: "#667eea", marginBottom: "20px", fontSize: "2.5em" }}>
            🎯 Timed Quiz Game
          </h1>
          <p style={{ color: "#666", marginBottom: "30px", fontSize: "1.1em" }}>
            Test your React knowledge! Enter your name to begin.
          </p>
          <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
            <input
              type="text"
              placeholder="Enter your name"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleStartQuiz()}
              autoFocus
              style={{ flex: 1 }}
            />
            <button
              onClick={handleStartQuiz}
              disabled={!playerName.trim()}
              style={{
                opacity: playerName.trim() ? 1 : 0.5,
                cursor: playerName.trim() ? "pointer" : "not-allowed"
              }}
            >
              Start Quiz
            </button>
          </div>
          <p style={{ color: "#999", fontSize: "0.9em" }}>
            ⏱️ Each question has 30 seconds
          </p>
        </>
      ) : (
        <>
          <button
            onClick={() => setQuizStarted(false)}
            style={{
              marginBottom: "20px",
              backgroundColor: "#999",
              alignSelf: "flex-start"
            }}
          >
            ← Back
          </button>
          <Quiz playerName={playerName} />
        </>
      )}
    </div>
  );
}
