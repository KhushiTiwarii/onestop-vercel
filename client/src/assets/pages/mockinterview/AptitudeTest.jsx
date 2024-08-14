import React, { useState } from 'react';
import Sidebar from '../../../components/SideBar';

const categories = {
  Aptitude: [
    { question: "What is the process of converting analog signals into digital data called?", options: ["Encoding", "Decoding", "Encryption", "Modulation"], correctAnswer: "Encoding" },
    { question: "What is the square root of 144?", options: ["10", "11", "12", "13"], correctAnswer: "12" },
    { question: "Which number is a prime number?", options: ["4", "6", "9", "11"], correctAnswer: "11" },
    { question: "What is the value of Pi?", options: ["3.12", "3.14", "3.16", "3.18"], correctAnswer: "3.14" },
    { question: "What is 7 multiplied by 8?", options: ["54", "56", "58", "60"], correctAnswer: "56" },
    { question: "What is the next number in the series: 2, 4, 6, 8, ...?", options: ["10", "12", "14", "16"], correctAnswer: "10" },
    { question: "What is 100 divided by 4?", options: ["20", "25", "30", "35"], correctAnswer: "25" },
    { question: "Which shape has four equal sides?", options: ["Triangle", "Rectangle", "Square", "Circle"], correctAnswer: "Square" },
    { question: "What is 5 squared?", options: ["10", "15", "20", "25"], correctAnswer: "25" },
    { question: "What is the value of the binary number 101?", options: ["4", "5", "6", "7"], correctAnswer: "5" }
  ],
  DataStructures: [
    { question: "What data structure uses LIFO order?", options: ["Queue", "Stack", "Array", "Tree"], correctAnswer: "Stack" },
    { question: "Which data structure uses FIFO order?", options: ["Queue", "Stack", "Array", "Tree"], correctAnswer: "Queue" },
    { question: "Which data structure is used in a Breadth-First Search?", options: ["Stack", "Queue", "Heap", "Graph"], correctAnswer: "Queue" },
    { question: "What is the time complexity of binary search?", options: ["O(n)", "O(n^2)", "O(log n)", "O(n log n)"], correctAnswer: "O(log n)" },
    { question: "Which of the following is not a linear data structure?", options: ["Array", "Linked List", "Tree", "Queue"], correctAnswer: "Tree" },
    { question: "Which data structure is used to implement a recursive function?", options: ["Stack", "Queue", "Array", "Linked List"], correctAnswer: "Stack" },
    { question: "Which data structure is used to implement graphs?", options: ["Array", "Linked List", "Both", "None"], correctAnswer: "Both" },
    { question: "What is the worst-case time complexity of QuickSort?", options: ["O(n)", "O(n log n)", "O(n^2)", "O(log n)"], correctAnswer: "O(n^2)" },
    { question: "Which data structure is used to implement priority queues?", options: ["Array", "Stack", "Heap", "Tree"], correctAnswer: "Heap" },
    { question: "What is the result of in-order traversal of a binary search tree?", options: ["Unsorted order", "Reverse order", "Sorted order", "Random order"], correctAnswer: "Sorted order" }
  ],
  Reasoning: [
    { question: "What is the missing number in the series: 2, 6, 12, 20, ...?", options: ["28", "30", "32", "36"], correctAnswer: "30" },
    { question: "What comes next in the sequence: 1, 4, 9, 16, ...?", options: ["20", "24", "25", "30"], correctAnswer: "25" },
    { question: "Which word does not belong with the others?", options: ["Apple", "Banana", "Carrot", "Date"], correctAnswer: "Carrot" },
    { question: "What is the odd one out: 2, 3, 5, 9, 11?", options: ["2", "3", "5", "9"], correctAnswer: "9" },
    { question: "What is the next number in the series: 5, 10, 20, 40, ...?", options: ["60", "70", "80", "90"], correctAnswer: "80" },
    { question: "Which word is different from the others?", options: ["Dog", "Cat", "Bird", "Fish"], correctAnswer: "Bird" },
    { question: "What comes next in the sequence: 3, 6, 9, 12, ...?", options: ["14", "15", "16", "18"], correctAnswer: "15" },
    { question: "Which number is the odd one out: 8, 12, 18, 20?", options: ["8", "12", "18", "20"], correctAnswer: "18" },
    { question: "What comes next in the sequence: 1, 2, 4, 8, ...?", options: ["10", "12", "14", "16"], correctAnswer: "16" },
    { question: "Which shape does not belong with the others?", options: ["Circle", "Square", "Triangle", "Rectangle"], correctAnswer: "Circle" }
  ],
  SoftSkills: [
    { question: "Which of the following is most important in effective communication?", options: ["Speaking", "Listening", "Writing", "Reading"], correctAnswer: "Listening" },
    { question: "What is a key element of teamwork?", options: ["Individualism", "Collaboration", "Competition", "Leadership"], correctAnswer: "Collaboration" },
    { question: "What is the best way to handle conflict in a team?", options: ["Avoidance", "Confrontation", "Negotiation", "Ignoring"], correctAnswer: "Negotiation" },
    { question: "Which of the following is a leadership quality?", options: ["Dominance", "Empathy", "Passivity", "Impatience"], correctAnswer: "Empathy" },
    { question: "What is crucial for time management?", options: ["Procrastination", "Prioritization", "Multitasking", "Delegation"], correctAnswer: "Prioritization" },
    { question: "Which skill is important for giving constructive feedback?", options: ["Criticism", "Empathy", "Aggressiveness", "Impatience"], correctAnswer: "Empathy" },
    { question: "What is the best approach to problem-solving?", options: ["Reactive", "Proactive", "Indifferent", "Avoidant"], correctAnswer: "Proactive" },
    { question: "Which skill is vital for building professional relationships?", options: ["Networking", "Criticism", "Isolation", "Confrontation"], correctAnswer: "Networking" },
    { question: "What is essential for effective public speaking?", options: ["Fear", "Confidence", "Silence", "Reading"], correctAnswer: "Confidence" },
    { question: "Which of these is a soft skill?", options: ["Coding", "Empathy", "Mathematics", "Physics"], correctAnswer: "Empathy" }
  ]
};
function AptitudeTest() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setQuestions(categories[category].slice(0, 10)); // Select first 10 questions
    setCurrentQuestion(0);
    setSelectedOption('');
    setIsCorrect(null);
    setShowResult(false);
    setScore(0);
    setShowScore(false);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsCorrect(option === questions[currentQuestion].correctAnswer);
    if (option === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextClick = () => {
    setShowResult(true);
    setTimeout(() => {
      setShowResult(false);
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption('');
        setIsCorrect(null);
      } else {
        setShowScore(true);
      }
    }, 2000);
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col items-center justify-center flex-grow p-8">
        {!selectedCategory && (
          <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-8">
            <h2 className="text-xl font-bold mb-4">Select Category</h2>
            <div className="space-y-2">
              {Object.keys(categories).map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategorySelect(category)}
                  className="w-full text-left p-3 border rounded-lg bg-gray-100 hover:bg-gray-200"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        )}
        {selectedCategory && !showScore && (
          <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-8">
            <h2 className="text-xl font-bold mb-4">{selectedCategory} Test</h2>
            <div className="mb-4">
              <span className="font-semibold">Question {currentQuestion + 1} / {questions.length}</span>
              <div className="bg-gray-200 h-1 w-full rounded mt-2 overflow-hidden">
                <div className="bg-purple-600 h-full" style={{ width: `${(currentQuestion + 1) / questions.length * 100}%` }}></div>
              </div>
            </div>
            <p className="text-lg mb-4">{questions[currentQuestion].question}</p>
            <div className="space-y-2">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionClick(option)}
                  className={`w-full text-left p-3 border rounded-lg ${selectedOption === option ? 'bg-purple-200' : 'bg-gray-100'}`}
                >
                  {option}
                </button>
              ))}
            </div>
            {showResult && (
              <div className={`mt-4 p-3 rounded-lg text-white ${isCorrect ? 'bg-green-500' : 'bg-red-500'}`}>
                {isCorrect ? 'Correct answer' : 'Wrong answer'}
              </div>
            )}
            <button
              onClick={handleNextClick}
              className="mt-6 w-full bg-purple-600 text-white p-3 rounded-lg"
              disabled={!selectedOption}
            >
              Next
            </button>
          </div>
        )}
        {showScore && (
          <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Your Score</h2>
            <p className="text-lg mb-4">{score} out of {questions.length}</p>
            <button
              onClick={() => setSelectedCategory('')}
              className="mt-6 w-full bg-purple-600 text-white p-3 rounded-lg"
            >
              Retake Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AptitudeTest;
