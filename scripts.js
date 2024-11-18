
const quizData = [
    { question: "What is phishing?", options: ["A type of fishing sport", "A cyber attack to steal sensitive information", "A legitimate business email"], correct: 1 },
    { question: "Which of these is a sign of phishing?", options: ["Spelling errors in emails", "Emails from known senders", "Secure HTTPS links"], correct: 0 },
    { question: "What should you do if you suspect phishing?", options: ["Click the link to verify", "Report and delete the email", "Ignore it"], correct: 1 },
    { question: "Which of the following is not a preventative measure of phishing?", options: ["Verify sender authenticity", "Check URLs carefully", "Use any free antivirus available to download from any website"], correct:2},    
    { question: "What is spear phishing?", options: ["Phishing using malwares", "Phishing targeted at specific individuals or groups", "Phishing targeted at high-level executives"], correct: 1},
    { question: "How can you protect yourself from phishing?", options: ["Use a strong password and enable 2FA", "Click on links from unknown senders","Use public WI-FI for online banking"], correct: 0},
    { question: "What to do if you've fallen victim to phishing attack?", options: ["Change your password immediately", "Report the incident to IT and monitor accounts", "Pay the ransom demand in bitcoin"], correct: 1}
];

let userAnswers = [];
let quizContainer = document.getElementById('quiz-container');

function startQuiz() {
    document.querySelector('.education').style.display = 'none';
    document.querySelector('.quiz').style.display = 'block';
    loadQuiz();
}

function loadQuiz() {
    quizContainer.innerHTML = '';
    quizData.forEach((item, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';
        questionDiv.innerHTML = `<h3>${index + 1}. ${item.question}</h3>`;
        item.options.forEach((option, i) => {
            questionDiv.innerHTML += `
                <label>
                    <input type="radio" name="question${index}" value="${i}"> ${option}
                </label><br>`;
        });
        quizContainer.appendChild(questionDiv);
    });
}

function submitQuiz() {
    userAnswers = [];
    let correctCount = 0;
    quizData.forEach((item, index) => {
        const selected = document.querySelector(`input[name="question${index}"]:checked`);
        const answer = selected ? parseInt(selected.value) : null;
        userAnswers.push(answer);
        if (answer === item.correct) correctCount++;
    });
    displayResults(correctCount);
}

function displayResults(score) {
    document.querySelector('.quiz').style.display = 'none';
    document.querySelector('.results').style.display = 'block';
    document.querySelector('.result').textContent = `You scored ${score} out of ${quizData.length}.`;
}

function reviewAnswers() {
    quizContainer.innerHTML = '';
    quizData.forEach((item, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';
        questionDiv.innerHTML = `<h3>${index + 1}. ${item.question}</h3>`;
        item.options.forEach((option, i) => {
            const isCorrect = i === item.correct;
            const userAnswer = userAnswers[index];
            questionDiv.innerHTML += `
                <label class="${isCorrect ? 'correct' : userAnswer === i ? 'incorrect' : ''}">
                    ${option} ${isCorrect ? '(Correct)' : ''}
                </label><br>`;
        });
        quizContainer.appendChild(questionDiv);
    });
    document.querySelector('.quiz').style.display = 'block';
    document.querySelector('.results').style.display = 'none';
}

function retakeQuiz() {
    userAnswers = [];
    document.querySelector('.results').style.display = 'none';
    document.querySelector('.quiz').style.display = 'block';
    loadQuiz();
}

// Home button function to return to the awareness page
function goHome() {
    document.querySelector('.quiz').style.display = 'none';
    document.querySelector('.results').style.display = 'none';
    document.querySelector('.education').style.display = 'block';
}