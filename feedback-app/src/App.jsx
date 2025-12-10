import React, { useState } from 'react';
import FeedbackForm from './components/FeedbackForm';
import FeedbackList from './components/FeedbackList';

export default function App() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleFeedbackSubmitted = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div style={{
      minHeight: '100vh',
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          padding: '40px 20px',
          textAlign: 'center'
        }}>
          <h1 style={{ fontSize: '2.5em', marginBottom: '10px' }}>💬 Feedback Hub</h1>
          <p style={{ fontSize: '1.1em', opacity: 0.9 }}>Share your valuable feedback with us</p>
        </div>

        {/* Content */}
        <div style={{ padding: '40px 20px' }}>
          {/* Form Section */}
          <div style={{ marginBottom: '40px' }}>
            <h2 style={{
              fontSize: '1.8em',
              color: '#333',
              marginBottom: '20px',
              borderBottom: '3px solid #667eea',
              paddingBottom: '10px'
            }}>
              ✉️ Submit Feedback
            </h2>
            <FeedbackForm onSuccess={handleFeedbackSubmitted} />
          </div>

          {/* Feedback List Section */}
          <div>
            <h2 style={{
              fontSize: '1.8em',
              color: '#333',
              marginBottom: '20px',
              borderBottom: '3px solid #667eea',
              paddingBottom: '10px'
            }}>
              📋 All Feedback
            </h2>
            <FeedbackList refreshTrigger={refreshTrigger} />
          </div>
        </div>
      </div>
    </div>
  );
}
