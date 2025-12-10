# 🚀 Feedback App - Setup & Run Guide

## Quick Start

### 1️⃣ Install Dependencies

```bash
cd feedback-app
npm install
```

### 2️⃣ Start Development Server

```bash
npm run dev
```

The app will automatically open at `http://localhost:5175`

### 3️⃣ Ensure Backend is Running

Make sure json-server is running with the shared db.json:

```bash
# From the React-Js directory (parent directory)
npx json-server --watch db.json --port 4000
```

---

## What's Included

### ✅ Components
- **FeedbackForm.jsx** - Form with validation for Name, Email, Rating, Comments
- **FeedbackList.jsx** - Display all feedback with sort functionality
- **Statistics.jsx** - Dashboard showing stats and rating distribution

### ✅ Custom Hook
- **useFeedback.js** - Handles all API operations (fetch, submit, loading states)

### ✅ React Hooks Used

| Hook | Where | Purpose |
|------|-------|---------|
| `useState` | FeedbackForm | Form fields, validation errors, submission states |
| `useState` | FeedbackList | Sort toggle state |
| `useEffect` | useFeedback hook | Fetch feedback on mount and refresh |
| `useMemo` | FeedbackList | Sort feedback by recent or rating |
| `useMemo` | Statistics | Calculate average, distribution, totals |

### ✅ Features

1. **Form Validation**
   - Name required
   - Valid email format
   - Comments required
   - Real-time error display

2. **Feedback Submission**
   - POST to `/feedback` endpoint
   - Loading state during submission
   - Success/error messages
   - Auto-refresh after submit

3. **Statistics Dashboard**
   - Total feedback count
   - Average rating (memoized)
   - Rating distribution chart

4. **Feedback List**
   - Sort by most recent (default)
   - Sort by highest rating
   - Hover effects
   - Formatted timestamps

---

## Folder Structure

```
feedback-app/
├── src/
│   ├── components/
│   │   ├── FeedbackForm.jsx
│   │   ├── FeedbackList.jsx
│   │   └── Statistics.jsx
│   ├── hooks/
│   │   └── useFeedback.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## API Endpoints Used

- `GET http://localhost:4000/feedback` - Fetch all feedback
- `POST http://localhost:4000/feedback` - Submit new feedback

---

## Build for Production

```bash
npm run build
npm run preview
```

---

## Troubleshooting

### App shows "Error loading feedback"
- ✅ Check if json-server is running on port 4000
- ✅ Verify db.json has `"feedback": []` array

### Form submission fails
- ✅ Ensure json-server backend is running
- ✅ Check browser console for error details

### Statistics not updating
- ✅ Refresh the page after submitting feedback
- ✅ Check if useMemo is recalculating (dependency array)

---

## Next Steps

Ready to enhance the app? Try:
- 🗑️ Add delete feedback functionality
- ✏️ Add edit feedback feature
- 🔍 Add search/filter by name or email
- 📄 Add pagination for large datasets
- 📊 Export feedback data to CSV
- 🌙 Add dark mode toggle
