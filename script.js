const quizData = [
  {
    question: "What does HTML stand for?",
    options: ["HyperText Markup Language", "HighText Machine Language", "Home Tool Markup Language", "None of the above"],
    answer: "HyperText Markup Language"
  },
  {
    question: "Which CSS property controls text size?",
    options: ["font-style", "text-size", "font-size", "text-style"],
    answer: "font-size"
  },
  {
    question: "Which language runs in a web browser?",
    options: ["Java", "C", "Python", "JavaScript"],
    answer: "JavaScript"
  },
  {
    question: "Inside which HTML element do we put JavaScript?",
    options: ["<js>", "<scripting>", "<script>", "<javascript>"],
    answer: "<script>"
  },
  {
    question: "Which method adds an element at the end of an array?",
    options: ["push()", "pop()", "shift()", "unshift()"],
    answer: "push()"
  }
];

const quizForm = document.getElementById("quiz-form");
const submitBtn = document.getElementById("submit-btn");
const restartBtn = document.getElementById("restart-btn");
const showAnswersBtn = document.getElementById("show-answers-btn");
const resultBox = document.getElementById("result");
const progressText = document.getElementById("progress-text");
const timerText = document.getElementById("timer");

let timeLeft = 60;
let timer;

function loadQuiz() {
  quizForm.innerHTML = '';
  resultBox.textContent = '';
  timeLeft = 60;
  updateProgress();
  updateTimerDisplay();

  quizData.forEach((q, i) => {
    const questionDiv = document.createElement("div");
    questionDiv.classList.add("question");

    const questionText = document.createElement("p");
    questionText.textContent = `${i + 1}. ${q.question}`;
    questionDiv.appendChild(questionText);

    const optionsDiv = document.createElement("div");
    optionsDiv.classList.add("options");

    q.options.forEach(opt => {
      const label = document.createElement("label");
      const input = document.createElement("input");
      input.type = "radio";
      input.name = `question${i}`;
      input.value = opt;

      label.appendChild(input);
      const span = document.createElement("span");
      span.textContent = opt;
      label.appendChild(span);

      optionsDiv.appendChild(label);
    });

    questionDiv.appendChild(optionsDiv);
    quizForm.appendChild(questionDiv);
  });

  startTimer();
  submitBtn.disabled = false;
  restartBtn.style.display = 'none';
  showAnswersBtn.style.display = 'none';
  showAnswersBtn.disabled = false;
}

function calculateScore() {
  let score = 0;
  quizData.forEach((q, i) => {
    const selected = document.querySelector(`input[name="question${i}"]:checked`);
    if (selected && selected.value === q.answer) {
      score++;
    }
  });

  resultBox.textContent = `You scored ${score} out of ${quizData.length} correctly.`;
  clearInterval(timer);
  submitBtn.disabled = true;
  restartBtn.style.display = 'inline-block';
  showAnswersBtn.style.display = 'inline-block';
}

function updateProgress() {
  let answered = 0;
  quizData.forEach((q, i) => {
    if (document.querySelector(`input[name="question${i}"]:checked`)) {
      answered++;
    }
  });
  progressText.textContent = `Answered: ${answered} / ${quizData.length}`;
}

function updateTimerDisplay() {
  timerText.textContent = `Time Left: ${timeLeft}s`;
}

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();
    if (timeLeft <= 0) {
      clearInterval(timer);
      calculateScore();
    }
  }, 1000);
}

quizForm.addEventListener("change", (e) => {
  if (e.target.type === "radio") {
    const group = document.querySelectorAll(`input[name="${e.target.name}"]`);
    group.forEach(r => r.parentNode.classList.remove("selected"));
    e.target.parentNode.classList.add("selected");
    updateProgress();
  }
});

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  calculateScore();
});

restartBtn.addEventListener("click", () => {
  loadQuiz();
});

showAnswersBtn.addEventListener("click", () => {
  quizData.forEach((q, i) => {
    const inputs = document.querySelectorAll(`input[name="question${i}"]`);
    inputs.forEach(input => {
      const label = input.parentNode;
      const isCorrect = input.value === q.answer;
      const isSelected = input.checked;

      if (isCorrect) {
        label.classList.add('correct');
      } else if (isSelected && input.value !== q.answer) {
        label.classList.add('incorrect');
      }
    });
  });
  showAnswersBtn.disabled = true;
});

loadQuiz();
