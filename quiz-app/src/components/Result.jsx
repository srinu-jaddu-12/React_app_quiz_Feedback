import React from "react";

export default function Result({ name, score, total, percentage, onRestart, postingResult, postError }) {
  const getPerformanceMessage = () => {
    if (percentage >= 80) return "🌟 Outstanding!";
    if (percentage >= 60) return "👍 Good job!";
    if (percentage >= 40) return "💪 Nice try!";
    return "📚 Keep practicing!";
  };

  const getPerformanceColor = () => {
    if (percentage >= 80) return "#4caf50";
    if (percentage >= 60) return "#2196f3";
    if (percentage >= 40) return "#ff9800";
    return "#f44336";
  };

  return (
    <div style={{
      backgroundColor: "white",
      borderRadius: "12px",
      padding: "40px",
      boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
      textAlign: "center",
      border: `3px solid ${getPerformanceColor()}`
    }}>
      <div style={{ fontSize: "5em", marginBottom: "20px" }}>
        {percentage >= 80 ? "🎉" : percentage >= 60 ? "😊" : percentage >= 40 ? "😐" : "😞"}
      </div>

      <h2 style={{
        color: getPerformanceColor(),
        marginBottom: "10px",
        fontSize: "2.2em"
      }}>
        Quiz Completed!
      </h2>

      <p style={{
        fontSize: "1.3em",
        color: "#666",
        marginBottom: "40px"
      }}>
        {getPerformanceMessage()}
      </p>

      <div style={{
        backgroundColor: getPerformanceColor(),
        padding: "40px",
        borderRadius: "12px",
        marginBottom: "30px",
        color: "white"
      }}>
        <p style={{ fontSize: "1.2em", marginBottom: "15px", opacity: 0.9 }}>
          👤 <strong>{name}</strong>
        </p>
        <div style={{ fontSize: "4.5em", fontWeight: "bold", marginBottom: "15px" }}>
          {percentage}%
        </div>
        <p style={{ fontSize: "1.1em", opacity: 0.95 }}>
          You scored <strong>{score} out of {total}</strong> questions correctly
        </p>
      </div>

      <div style={{
        marginBottom: "20px",
        padding: "12px",
        backgroundColor: postError ? "#ffe0e0" : "#e8f5e9",
        borderRadius: "6px",
        color: postError ? "#d32f2f" : "#388e3c",
        fontSize: "0.9em"
      }}>
        {postingResult ? "💾 Saving result..." : postError ? "⚠️ Error saving result" : "✅ Result saved!"}
      </div>

      <button
        onClick={onRestart}
        style={{
          width: "100%",
          padding: "14px",
          fontSize: "1.1em",
          backgroundColor: "#667eea",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontWeight: "bold",
          transition: "all 0.3s ease"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#5568d3";
          e.currentTarget.style.transform = "scale(1.02)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "#667eea";
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        Try Again
      </button>
    </div>
  );
}
