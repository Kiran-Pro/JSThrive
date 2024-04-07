import express from 'express';
import cors from 'cors';

// Mock data
interface Lesson {
  id: number;
  title: string;
  linkTo: string;
}

const lessons:Lesson[] = [
  { id: 1, title: "Lesson 1: Introduction to Web Development and Setup", linkTo: "/lesson1" },
  { id: 2, title: "Lesson 2: Adding Structure to the Quiz App", linkTo: "/lesson2" },
  { id: 3, title: "Lesson 3: Making the Quiz Interactive with JavaScript", linkTo: "/lesson3" },
  { id: 4, title: "Lesson 4: Enhancing the Quiz with Styling", linkTo: "/lesson4" },
  { id: 5, title: "Lesson 5: Adding Feedback and Score Tracking", linkTo: "/lesson5" },
  { id: 6, title: "Lesson 6: Implementing Quiz Restart and High Score Tracking", linkTo: "/lesson6" },
  { id: 7, title: "Lesson 7: Enhancing the Quiz with Local Storage for Persistent Data", linkTo: "/lesson7" },
  { id: 8, title: "Lesson 8: Implementing Answer Validation and Feedback", linkTo: "/lesson8" },
  { id: 9, title: "Lesson 9: Enhancing User Experience and Finalizing the Quiz App", linkTo: "/lesson9" }
];


// Initialize Express app and middleware
const app = express();
app.use(cors()); // Enable CORS for all requests

// API endpoint to get lessons
app.get('/lessons', (req, res) => {
  res.json(lessons);
});

// Start the server
const port = 4000;
app.listen(port, () => {
  console.log(`API server listening at http://localhost:${port}/lessons`);
});
