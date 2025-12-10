# 🚀 React.js Project - Two Applications

A comprehensive React project containing two fully-functional applications demonstrating modern React patterns, hooks, and best practices.

---

## 📁 Project Structure

```
React-Js/
├── quiz-app/                 # Quiz Application
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   ├── README.md            # Quiz App Documentation
│   └── SETUP.md             # Quiz App Setup Guide
│
├── feedback-app/             # Feedback Collection Application
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   ├── README.md            # Feedback App Documentation
│   └── SETUP.md             # Feedback App Setup Guide
│
├── db.json                   # Shared Mock Database
└── README.md                 # This file
```

## 🎯 Quick Overview

### 1️⃣ **Quiz App** - Timed Quiz Game
**Location:** `quiz-app/`

A high-speed quiz application with a timer, score tracking, and result persistence.

**Key Features:**
- ⏱️ 30-second timer per question
- 🎯 Multiple choice questions
- 📊 Score calculation and percentage display
- 💾 Results saved to API
- 📈 Progress tracking

**React Concepts:** `useState`, `useEffect`, `useMemo`, `useRef`, custom hooks

👉 **See:** `quiz-app/README.md` for detailed documentation

---

### 2️⃣ **Feedback App** - Feedback Collection System
**Location:** `feedback-app/`

A feedback collection system with form validation, statistics, and feedback display.

**Key Features:**
- 📝 Form with validation (Name, Email, Rating, Comments)
- 📊 Real-time statistics
- 🔄 Sort feedback by recent or rating
- ✅ Success/error states
- 💾 Persistent storage via API

**React Concepts:** `useState`, `useEffect`, `useMemo`, custom hooks

👉 **See:** `feedback-app/README.md` for detailed documentation

---

## 🛠️ Tech Stack

- **React** 19.2.1 - UI Framework
- **Vite** 7.2.7 - Build Tool
- **json-server** - Mock REST API
- **CSS3** - Styling with gradients and transitions

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v14+)
- npm or yarn
- json-server installed globally (or use npx)

### Backend Setup (Required for Both Apps)

1. Install json-server globally:
```bash
npm install -g json-server
```

2. Start json-server from the project root:
```bash
json-server --watch db.json --port 4000
```

This will start the API on `http://localhost:4000`

### Running Individual Apps

#### **Quiz App**
```bash
cd quiz-app
npm install
npm run dev
```
Opens on `http://localhost:5174`

#### **Feedback App**
```bash
cd feedback-app
npm install
npm run dev
```
Opens on `http://localhost:5175`

---

## 📚 React Hooks Used

| Hook | Apps | Purpose |
|------|------|---------|
| `useState` | Both | State management for form fields, UI states |
| `useEffect` | Both | Data fetching on mount, cleanup |
| `useMemo` | Both | Performance optimization & calculations |
| `useRef` | Quiz | Timer reference management |
| Custom Hooks | Both | Encapsulate business logic |

---

## 🔌 API Endpoints

Both apps use the same `json-server` backend with the following endpoints:

### Quiz App
- `GET /questions` - Fetch all quiz questions
- `POST /results` - Save quiz results

### Feedback App
- `GET /feedback` - Fetch all feedback entries
- `POST /feedback` - Submit new feedback

---

## 📂 Database Schema

**db.json** structure:
```json
{
  "questions": [
    {
      "id": 1,
      "question": "Which React hook is used for managing state in a function component?",
      "options": ["useEffect", "useState", "useMemo", "useRef"],
      "correctIndex": 1
    },
    {
      "id": 2,
      "question": "Which hook would you use to perform side effects like data fetching?",
      "options": ["useState", "useEffect", "useMemo", "useContext"],
      "correctIndex": 1
    },
    {
      "id": 3,
      "question": "Which hook can be used to memoize expensive calculations?",
      "options": ["useState", "useEffect", "useMemo", "useReducer"],
      "correctIndex": 2
    }
  ],
  "results": [],
  "feedback": []
}
```

---

## 📖 Separate Documentation

Each application has its own comprehensive documentation:

### **Quiz App Documentation**
- **Location:** `quiz-app/README.md`
- **Contains:** Features, architecture, react hooks used, setup instructions

### **Feedback App Documentation**
- **Location:** `feedback-app/README.md`
- **Contains:** Features, architecture, react hooks used, setup instructions

---

## ✨ Features Implemented

### Quiz App ✅
- [x] Multiple choice questions
- [x] Countdown timer (30 seconds/question)
- [x] Auto-progression when time expires
- [x] Score tracking
- [x] Percentage calculation
- [x] Result persistence
- [x] Player name input
- [x] Progress bar
- [x] Form validation
- [x] Submit answer button per question

### Feedback App ✅
- [x] Form with validation
- [x] Email validation
- [x] Rating selection (1-5)
- [x] Loading/success/error states
- [x] Feedback submission
- [x] Feedback list display
- [x] Sort by recent/rating
- [x] Responsive design
- [x] Timestamp display

---

## 🎨 Styling

Both apps feature:
- 🎨 Purple gradient theme
- ✨ Smooth animations and transitions
- 📱 Responsive design
- 🌐 Modern CSS3 styling
- ⚡ Hover effects and interactions

---

## 🔄 Data Flow

### Quiz App
```
App → Quiz Component
      ↓
useQuiz Hook → API (/questions)
      ↓
User selects answer → Submit Answer
      ↓
Score updates
      ↓
Auto-submit to API (/results)
      ↓
Result screen with percentage
```

### Feedback App
```
App → FeedbackForm + FeedbackList
      ↓
User submits form
      ↓
useFeedback Hook → API POST (/feedback)
      ↓
Fetch updated list from API
      ↓
Display with sorting
```

---

## 🚀 Build & Deploy

### Quiz App
```bash
cd quiz-app
npm run build
npm run preview
```

### Feedback App
```bash
cd feedback-app
npm run build
npm run preview
```

---

## 🐛 Troubleshooting

### Apps show "Error loading data"
- ✅ Ensure json-server is running on port 4000
- ✅ Check that db.json exists in project root
- ✅ Verify network requests in browser DevTools

### Form submission fails
- ✅ Check json-server is running
- ✅ Look at browser console for error messages
- ✅ Verify db.json has correct structure

### Vite dev server won't start
- ✅ Kill existing processes on ports 5174 & 5175
- ✅ Clear node_modules and reinstall: `npm install`
- ✅ Check Node.js version is v14+

---

## 🎓 Learning Outcomes

After exploring these projects, you'll understand:

✅ React Hooks (useState, useEffect, useMemo, useRef)
✅ Custom hooks for code reuse
✅ Controlled components
✅ Form validation
✅ API integration with fetch
✅ Error handling and loading states
✅ Component composition
✅ State management patterns
✅ Performance optimization
✅ Vite build tool setup

---

## 📝 Notes

- Both apps share the same database (db.json) and API server
- Each app is independent and can run on separate ports
- Custom hooks encapsulate business logic for reusability
- useMemo optimizes expensive calculations
- All styling is done with inline CSS (no external libraries)

---

## 🤝 Contributing

Feel free to enhance these projects by:
- Adding new features
- Improving UI/UX
- Optimizing performance
- Adding tests
- Extending functionality

---

## 📧 Contact & Support

For questions about specific applications, refer to the individual README files in each app folder.

---

**Happy Coding! 🎉**
