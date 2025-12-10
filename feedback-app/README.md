# 💬 Feedback Collection App

A modern React application for collecting and displaying user feedback with real-time statistics.

## Features

✅ **Form Submission**
- Name, Email, Rating (1-5), Comments fields
- Form validation with error messages
- Real-time form submission with loading/success/error states

✅ **React Hooks Implementation**
- `useState` - Form fields, feedback list, sort state
- `useEffect` - Fetch feedback on component mount
- `useMemo` - Calculate statistics and sorted feedback
- Custom `useFeedback` hook - Encapsulates all feedback logic

✅ **API Integration**
- POST feedback to `/feedback` endpoint
- GET all feedback entries from `/feedback` endpoint
- Auto-refresh feedback list after submission

✅ **Statistics Dashboard**
- Total feedback count
- Average rating calculation
- Rating distribution with visual bars
- Real-time updates

✅ **Feedback Display**
- Display all feedback entries
- Sort by recent or highest rating
- User-friendly card layout
- Timestamp display

## Project Structure

```
feedback-app/
├── src/
│   ├── components/
│   │   ├── FeedbackForm.jsx      # Form with validation
│   │   ├── FeedbackList.jsx      # Display feedback with sorting
│   │   └── Statistics.jsx        # Statistics dashboard
│   ├── hooks/
│   │   └── useFeedback.js        # Custom hook for API calls
│   ├── App.jsx                   # Main app component
│   ├── main.jsx                  # Entry point
│   └── index.css                 # Global styles
├── index.html
├── package.json
└── vite.config.js
```

## Installation

```bash
# Navigate to feedback-app directory
cd feedback-app

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will run on `http://localhost:5175`

## API Requirements

Make sure `json-server` is running with the feedback endpoint:

```bash
json-server --watch db.json --port 4000
```

The `db.json` should include:
```json
{
  "feedback": []
}
```

## React Concepts Used

| Concept | Usage |
|---------|-------|
| `useState` | Form fields (name, email, rating, comments), loading states, error handling |
| `useEffect` | Fetch feedback on mount, auto-refresh after submission |
| `useMemo` | Calculate average rating, sort feedback, rating distribution |
| `useRef` | (Can be extended for focus management) |
| Custom Hooks | `useFeedback` hook for all feedback operations |

## Component Details

### FeedbackForm
- Controlled components with `useState`
- Form validation with error messages
- Loading, success, and error states
- Auto-clear form after successful submission

### FeedbackList
- Displays all feedback entries
- `useMemo` for sorting by recent or rating
- Interactive card UI with hover effects
- Shows timestamp in user's locale

### Statistics
- `useMemo` to calculate:
  - Total feedback count
  - Average rating
  - Rating distribution percentages
- Visual bar chart for rating distribution
- Real-time updates on new feedback

### useFeedback Hook
- Encapsulates all API logic
- Fetch feedback list
- Submit new feedback
- Error handling
- Loading states

## Styling

- Modern gradient backgrounds
- Responsive grid layout
- Smooth animations and transitions
- Color-coded ratings and statuses
- Mobile-friendly design

## Future Enhancements

- Delete feedback functionality
- Edit existing feedback
- Filter by rating
- Export feedback data
- Pagination for large datasets
- Search/filter by name or email
