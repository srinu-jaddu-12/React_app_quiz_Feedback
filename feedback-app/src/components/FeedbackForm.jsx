import React, { useState, useEffect } from 'react';
import useFeedback from '../hooks/useFeedback';

export default function FeedbackForm({ onSuccess }) {
  const { submitting, submitError, submitSuccess, submitFeedback } = useFeedback();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: 5,
    comments: ''
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.comments.trim()) newErrors.comments = 'Comments are required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const success = await submitFeedback(formData);
    if (success) {
      setFormData({ name: '', email: '', rating: 5, comments: '' });
      setErrors({});
      onSuccess();
      
      // Clear success message after 3 seconds
      setTimeout(() => {}, 3000);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    }}>
      {/* Name Field */}
      <div>
        <label style={{
          display: 'block',
          marginBottom: '8px',
          fontWeight: 'bold',
          color: '#333'
        }}>
          👤 Name
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your name"
          style={{
            width: '100%',
            padding: '12px',
            border: errors.name ? '2px solid #f44336' : '2px solid #e0e0e0',
            borderRadius: '6px',
            fontSize: '1em'
          }}
        />
        {errors.name && <p style={{ color: '#f44336', fontSize: '0.85em', marginTop: '4px' }}>
          {errors.name}
        </p>}
      </div>

      {/* Email Field */}
      <div>
        <label style={{
          display: 'block',
          marginBottom: '8px',
          fontWeight: 'bold',
          color: '#333'
        }}>
          📧 Email
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          style={{
            width: '100%',
            padding: '12px',
            border: errors.email ? '2px solid #f44336' : '2px solid #e0e0e0',
            borderRadius: '6px',
            fontSize: '1em'
          }}
        />
        {errors.email && <p style={{ color: '#f44336', fontSize: '0.85em', marginTop: '4px' }}>
          {errors.email}
        </p>}
      </div>

      {/* Rating Field */}
      <div>
        <label style={{
          display: 'block',
          marginBottom: '8px',
          fontWeight: 'bold',
          color: '#333'
        }}>
          ⭐ Rating (1-5)
        </label>
        <select
          name="rating"
          value={formData.rating}
          onChange={handleChange}
          style={{
            width: '100%',
            padding: '12px',
            border: '2px solid #e0e0e0',
            borderRadius: '6px',
            fontSize: '1em',
            cursor: 'pointer',
            backgroundColor: 'white'
          }}
        >
          <option value={1}>⭐ 1 - Poor</option>
          <option value={2}>⭐⭐ 2 - Fair</option>
          <option value={3}>⭐⭐⭐ 3 - Good</option>
          <option value={4}>⭐⭐⭐⭐ 4 - Very Good</option>
          <option value={5}>⭐⭐⭐⭐⭐ 5 - Excellent</option>
        </select>
      </div>

      {/* Comments Field */}
      <div>
        <label style={{
          display: 'block',
          marginBottom: '8px',
          fontWeight: 'bold',
          color: '#333'
        }}>
          💭 Comments
        </label>
        <textarea
          name="comments"
          value={formData.comments}
          onChange={handleChange}
          placeholder="Share your detailed feedback..."
          rows="5"
          style={{
            width: '100%',
            padding: '12px',
            border: errors.comments ? '2px solid #f44336' : '2px solid #e0e0e0',
            borderRadius: '6px',
            fontSize: '1em',
            resize: 'vertical',
            fontFamily: 'inherit'
          }}
        />
        {errors.comments && <p style={{ color: '#f44336', fontSize: '0.85em', marginTop: '4px' }}>
          {errors.comments}
        </p>}
      </div>

      {/* Status Messages */}
      {submitError && <div style={{
        padding: '12px',
        backgroundColor: '#ffebee',
        color: '#c62828',
        borderRadius: '6px',
        fontSize: '0.9em',
        borderLeft: '4px solid #c62828'
      }}>
        ❌ Error: {submitError}
      </div>}

      {submitSuccess && <div style={{
        padding: '12px',
        backgroundColor: '#e8f5e9',
        color: '#2e7d32',
        borderRadius: '6px',
        fontSize: '0.9em',
        borderLeft: '4px solid #2e7d32'
      }}>
        ✅ Feedback submitted successfully!
      </div>}

      {submitting && <div style={{
        padding: '12px',
        backgroundColor: '#e3f2fd',
        color: '#1565c0',
        borderRadius: '6px',
        fontSize: '0.9em',
        borderLeft: '4px solid #1565c0'
      }}>
        💾 Submitting your feedback...
      </div>}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={submitting}
        style={{
          padding: '14px',
          backgroundColor: submitting ? '#ccc' : '#667eea',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          fontSize: '1.1em',
          fontWeight: 'bold',
          cursor: submitting ? 'not-allowed' : 'pointer',
          marginTop: '10px'
        }}
      >
        {submitting ? '📤 Submitting...' : '✉️ Submit Feedback'}
      </button>
    </form>
  );
}
