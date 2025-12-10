import React, { useState, useMemo } from 'react';
import useFeedback from '../hooks/useFeedback';

export default function FeedbackList({ refreshTrigger }) {
  const { feedbackList, loading, error } = useFeedback(refreshTrigger);
  const [sortBy, setSortBy] = useState('recent'); // 'recent' or 'rating'

  // useMemo: Sort feedback based on selected option
  const sortedFeedback = useMemo(() => {
    if (sortBy === 'rating') {
      return [...feedbackList].sort((a, b) => b.rating - a.rating);
    } else {
      return [...feedbackList].sort((a, b) => 
        new Date(b.timestamp) - new Date(a.timestamp)
      );
    }
  }, [feedbackList, sortBy]);

  if (loading) {
    return <div style={{
      textAlign: 'center',
      padding: '40px',
      color: '#667eea'
    }}>
      <div style={{ fontSize: '2em', marginBottom: '10px' }}>⏳</div>
      <p>Loading feedback...</p>
    </div>;
  }

  if (error) {
    return <div style={{
      padding: '20px',
      backgroundColor: '#ffebee',
      borderRadius: '8px',
      color: '#c62828',
      borderLeft: '4px solid #c62828'
    }}>
      ❌ Error: {error}
    </div>;
  }

  if (feedbackList.length === 0) {
    return <div style={{
      padding: '40px',
      textAlign: 'center',
      backgroundColor: '#f5f5f5',
      borderRadius: '8px',
      color: '#999'
    }}>
      <div style={{ fontSize: '2em', marginBottom: '10px' }}>📭</div>
      <p>No feedback yet. Be the first to share!</p>
    </div>;
  }

  return (
    <div>
      {/* Sort Controls */}
      <div style={{
        display: 'flex',
        gap: '10px',
        marginBottom: '20px',
        alignItems: 'center'
      }}>
        <label style={{ fontWeight: 'bold', color: '#333' }}>Sort by:</label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={{
            padding: '10px 15px',
            border: '2px solid #667eea',
            borderRadius: '6px',
            cursor: 'pointer',
            backgroundColor: 'white',
            fontSize: '1em'
          }}
        >
          <option value="recent">🕐 Most Recent</option>
          <option value="rating">⭐ Highest Rating</option>
        </select>
        <span style={{ color: '#999', fontSize: '0.9em' }}>
          ({sortedFeedback.length} entries)
        </span>
      </div>

      {/* Feedback Cards */}
      <div style={{
        display: 'grid',
        gap: '16px'
      }}>
        {sortedFeedback.map((feedback, index) => (
          <div key={index} style={{
            backgroundColor: 'white',
            border: '2px solid #e0e0e0',
            borderRadius: '8px',
            padding: '20px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 8px 16px rgba(102, 126, 234, 0.2)';
            e.currentTarget.style.borderColor = '#667eea';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
            e.currentTarget.style.borderColor = '#e0e0e0';
          }}>
            {/* Header with Name and Rating */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '12px'
            }}>
              <div>
                <p style={{
                  fontSize: '1.1em',
                  fontWeight: 'bold',
                  color: '#333',
                  margin: '0 0 4px 0'
                }}>
                  👤 {feedback.name}
                </p>
                <p style={{
                  fontSize: '0.85em',
                  color: '#999',
                  margin: 0
                }}>
                  {feedback.email}
                </p>
              </div>
              <div style={{
                textAlign: 'right'
              }}>
                <span style={{
                  display: 'inline-block',
                  backgroundColor: '#667eea',
                  color: 'white',
                  padding: '4px 10px',
                  borderRadius: '12px',
                  fontSize: '0.85em',
                  fontWeight: 'bold'
                }}>
                  {feedback.rating}/5
                </span>
              </div>
            </div>

            {/* Comments */}
            <p style={{
              backgroundColor: '#f9f9f9',
              padding: '12px',
              borderRadius: '6px',
              color: '#555',
              lineHeight: '1.5',
              margin: '12px 0',
              borderLeft: '4px solid #667eea'
            }}>
              {feedback.comments}
            </p>

            {/* Timestamp */}
            <div style={{
              fontSize: '0.8em',
              color: '#bbb',
              textAlign: 'right'
            }}>
              🕐 {new Date(feedback.timestamp).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
