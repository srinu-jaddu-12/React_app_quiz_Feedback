import React, { useMemo } from 'react';
import useFeedback from '../hooks/useFeedback';

export default function Statistics({ refreshTrigger }) {
  const { feedbackList, loading, error } = useFeedback(refreshTrigger);

  // useMemo: Calculate statistics
  const stats = useMemo(() => {
    if (feedbackList.length === 0) {
      return {
        totalFeedback: 0,
        averageRating: 0,
        ratingDistribution: {}
      };
    }

    const totalFeedback = feedbackList.length;
    const totalRating = feedbackList.reduce((sum, fb) => sum + fb.rating, 0);
    const averageRating = (totalRating / totalFeedback).toFixed(1);

    // Distribution of ratings
    const ratingDistribution = {
      5: 0,
      4: 0,
      3: 0,
      2: 0,
      1: 0
    };

    feedbackList.forEach(fb => {
      ratingDistribution[fb.rating]++;
    });

    return {
      totalFeedback,
      averageRating: parseFloat(averageRating),
      ratingDistribution
    };
  }, [feedbackList]);

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '20px', color: '#667eea' }}>
      ⏳ Loading...
    </div>;
  }

  if (error) {
    return <div style={{
      padding: '16px',
      backgroundColor: '#ffebee',
      borderRadius: '8px',
      color: '#c62828',
      fontSize: '0.9em'
    }}>
      ❌ Error loading statistics
    </div>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Total Feedback Card */}
      <div style={{
        backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '24px',
        borderRadius: '8px',
        textAlign: 'center',
        boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
      }}>
        <div style={{ fontSize: '2.5em', marginBottom: '8px' }}>📊</div>
        <p style={{ fontSize: '0.95em', opacity: 0.9, marginBottom: '8px' }}>Total Feedback</p>
        <div style={{ fontSize: '2.8em', fontWeight: 'bold' }}>
          {stats.totalFeedback}
        </div>
      </div>

      {/* Average Rating Card */}
      <div style={{
        backgroundColor: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        color: 'white',
        padding: '24px',
        borderRadius: '8px',
        textAlign: 'center',
        boxShadow: '0 4px 12px rgba(245, 87, 108, 0.3)'
      }}>
        <div style={{ fontSize: '2.5em', marginBottom: '8px' }}>⭐</div>
        <p style={{ fontSize: '0.95em', opacity: 0.9, marginBottom: '8px' }}>Average Rating</p>
        <div style={{ fontSize: '2.8em', fontWeight: 'bold' }}>
          {stats.averageRating}
        </div>
        <div style={{ fontSize: '0.85em', opacity: 0.8, marginTop: '8px' }}>
          out of 5
        </div>
      </div>

      {/* Rating Distribution */}
      <div style={{
        backgroundColor: '#f9f9f9',
        padding: '20px',
        borderRadius: '8px',
        border: '2px solid #e0e0e0'
      }}>
        <h4 style={{
          color: '#333',
          marginBottom: '16px',
          fontSize: '1.1em'
        }}>
          ⭐ Rating Distribution
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[5, 4, 3, 2, 1].map(rating => {
            const count = stats.ratingDistribution[rating];
            const percentage = stats.totalFeedback > 0 
              ? ((count / stats.totalFeedback) * 100).toFixed(0) 
              : 0;
            
            return (
              <div key={rating} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ minWidth: '50px' }}>
                  <span style={{
                    display: 'inline-block',
                    backgroundColor: '#ffc107',
                    color: '#fff',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    fontSize: '0.9em',
                    fontWeight: 'bold'
                  }}>
                    {rating}★
                  </span>
                </div>
                <div style={{
                  flex: 1,
                  height: '24px',
                  backgroundColor: '#e0e0e0',
                  borderRadius: '4px',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    height: '100%',
                    width: `${percentage}%`,
                    backgroundColor: rating >= 4 ? '#4caf50' : rating >= 3 ? '#ffc107' : '#f44336',
                    transition: 'width 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    paddingRight: '8px'
                  }}>
                    {percentage > 10 && <span style={{
                      color: 'white',
                      fontSize: '0.75em',
                      fontWeight: 'bold'
                    }}>
                      {percentage}%
                    </span>}
                  </div>
                </div>
                <div style={{
                  minWidth: '40px',
                  textAlign: 'right',
                  fontSize: '0.9em',
                  color: '#666',
                  fontWeight: 'bold'
                }}>
                  {count}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
