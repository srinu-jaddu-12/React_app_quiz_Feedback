import React, { useState } from "react";

export default function QuestionCard({ question, onSelect }) {
  const [selectedOption, setSelectedOption] = useState(null);
  
  if (!question) return null;
  
  const handleSubmit = () => {
    if (selectedOption !== null) {
      onSelect(selectedOption);
      setSelectedOption(null);
    }
  };
  
  return (
    <div style={{
      backgroundColor: "#f9f9f9",
      padding: "24px",
      borderRadius: "8px",
      border: "2px solid #e0e0e0",
      marginTop: "20px"
    }}>
      <h3 style={{
        fontSize: "1.3em",
        color: "#333",
        marginBottom: "20px",
        lineHeight: "1.6"
      }}>
        {question.question}
      </h3>
      
      <div style={{ display: "grid", gap: "12px", marginBottom: "20px" }}>
        {question.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => setSelectedOption(i)}
            style={{
              padding: "16px",
              textAlign: "left",
              backgroundColor: selectedOption === i ? "#667eea" : "#fff",
              border: selectedOption === i ? "2px solid #667eea" : "2px solid #e0e0e0",
              borderRadius: "6px",
              cursor: "pointer",
              transition: "all 0.3s ease",
              fontSize: "1em",
              color: selectedOption === i ? "white" : "#333",
              width: "100%"
            }}
            onMouseEnter={(e) => {
              if (selectedOption !== i) {
                e.currentTarget.style.backgroundColor = "#f0f0f0";
                e.currentTarget.style.borderColor = "#667eea";
              }
            }}
            onMouseLeave={(e) => {
              if (selectedOption !== i) {
                e.currentTarget.style.backgroundColor = "#fff";
                e.currentTarget.style.borderColor = "#e0e0e0";
              }
            }}
          >
            {String.fromCharCode(65 + i)}. {opt}
          </button>
        ))}
      </div>
      
      <button
        onClick={handleSubmit}
        disabled={selectedOption === null}
        style={{
          width: "100%",
          padding: "14px",
          backgroundColor: selectedOption === null ? "#ccc" : "#28a745",
          color: "white",
          border: "none",
          borderRadius: "6px",
          fontSize: "1.1em",
          fontWeight: "bold",
          cursor: selectedOption === null ? "not-allowed" : "pointer",
          transition: "all 0.3s ease"
        }}
      >
        Submit Answer
      </button>
    </div>
  );
}
