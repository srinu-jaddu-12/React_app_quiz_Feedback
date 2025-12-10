# 🎯 Timed Quiz Game

A React-based timed quiz application. Answer multiple-choice questions under time pressure!

## Features

✅ **30-second timer** per question with auto-progression  
✅ **5 React-focused questions** fetched from API  
✅ **Real-time scoring** system  
✅ **Responsive design** with beautiful UI  
✅ **Results saved** to API database  
✅ **Restart functionality**

## Tech Stack

- React 19
- Vite 7
- Custom Hooks (useQuiz)
- React Hooks: useState, useEffect, useMemo, useRef

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Server
```bash
npm run dev
```

The app will open at `http://localhost:5173`

### 3. Make sure json-server is running
In another terminal:
```bash
cd ..
npx json-server --watch db.json --port 4000
```

## How to Play

1. Enter your name
2. Click "Start Quiz"
3. Answer 5 questions (30 seconds each)
4. See your results
5. Click "Try Again" to restart

## React Concepts Used

### useState
- Player name
- Quiz state (questions, index, score, timer)
- Loading & error states

### useEffect
- Fetch questions on mount
- Timer logic with cleanup
- Auto-submit results

### useMemo
- Calculate percentage score

### useRef
- Store timer interval for cleanup

### Custom Hook: useQuiz
- Manages all quiz logic
- Handles timer with proper cleanup
- Returns quiz state and functions

## Project Structure

```
quiz-app/
├── src/
│   ├── hooks/
│   │   └── useQuiz.js          ← Custom hook
│   ├── components/
│   │   ├── QuestionCard.jsx
│   │   ├── Quiz.jsx
│   │   └── Result.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
├── vite.config.js
└── index.html
```

## Building for Production

```bash
npm run build
npm run preview
```

## Notes

- The API must be running on port 4000
- Questions are fetched from `http://localhost:4000/questions`
- Results are posted to `http://localhost:4000/results`
- Timer automatically moves to next question when time runs out
