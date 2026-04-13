import React, { useState } from "react";

const questions = [
  {
    question: "How do you prefer to spend your weekend?",
    options: [
      { text: "Stay at home reading or watching", trait: "introvert" },
      { text: "Go out with friends", trait: "extrovert" }
    ]
  },
  {
    question: "When solving a problem, you rely on:",
    options: [
      { text: "Logic and facts", trait: "logical" },
      { text: "Creativity and ideas", trait: "creative" }
    ]
  },
  {
    question: "In a group project, you:",
    options: [
      { text: "Work quietly on your part", trait: "introvert" },
      { text: "Lead discussions", trait: "extrovert" }
    ]
  }
];

function App() {
  const [current, setCurrent] = useState(0);
  const [scores, setScores] = useState({
    introvert: 0,
    extrovert: 0,
    logical: 0,
    creative: 0
  });
  const [finished, setFinished] = useState(false);

  const handleAnswer = (trait) => {
    setScores((prev) => ({
      ...prev,
      [trait]: prev[trait] + 1
    }));

    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      setFinished(true);
    }
  };

  const getResult = () => {
    return Object.entries(scores)
      .sort((a, b) => b[1] - a[1])
      .map(([trait]) => trait)
      .slice(0, 2)
      .join(" & ");
  };

  if (finished) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>Your Personality</h1>
        <h2>{getResult()}</h2>
        <button onClick={() => window.location.reload()}>
          Restart
        </button>
      </div>
    );
  }

  const q = questions[current];

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>
        Question {current + 1} / {questions.length}
      </h2>
      <p>{q.question}</p>

      {q.options.map((opt, i) => (
        <div key={i}>
          <button
            style={{ margin: "10px", padding: "10px 20px" }}
            onClick={() => handleAnswer(opt.trait)}
          >
            {opt.text}
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;