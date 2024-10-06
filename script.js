const questions = [
    { audio: ['aani1,1.mp3', 'aani1,2.mp3', 'aani1,3.mp3'], correct: 1, img1: 'kuva1.avif', img2: 'kuva2.avif' },
    { audio: ['aani2,1.mp3', 'aani2,2.mp3', 'aani2,3.mp3'], correct: 2, img1: 'kuva5.avif', img2: 'kuva2.avif' },
    { audio: ['aani3,1.mp3', 'aani3,2.mp3', 'aani3,3.mp3'], correct: 1, img1: 'kuva3.avif', img2: 'kuva4.avif' },
    { audio: ['aani4,1.mp3', 'aani4,2.mp3', 'aani4,3.mp3'], correct: 2, img1: 'kuva7.avif', img2: 'kuva4.avif' },
    { audio: ['aani5,1.mp3', 'aani5,2.mp3', 'aani5,3.mp3'], correct: 1, img1: 'kuva5.avif', img2: 'kuva1.avif' },
    { audio: ['aani6,1.mp3', 'aani6,2.mp3', 'aani6,3.mp3'], correct: 2, img1: 'kuva2.avif', img2: 'kuva6.avif' },
    { audio: ['aani7,1.mp3', 'aani7,2.mp3', 'aani7,3.mp3'], correct: 1, img1: 'kuva7.avif', img2: 'kuva2.avif' },
    { audio: ['aani8.mp3'], correct: 1, img1: 'kuva8.avif', img2: 'kuva6.avif' },
    { audio: ['aani1,1.mp3', 'aani1,2.mp3', 'aani1,3.mp3'], correct: 2, img1: 'kuva5.avif', img2: 'kuva1.avif' },
    { audio: ['aani2,1.mp3', 'aani2,2.mp3', 'aani2,3.mp3'], correct: 1, img1: 'kuva2.avif', img2: 'kuva3.avif' },
    { audio: ['aani3,1.mp3', 'aani3,2.mp3', 'aani3,3.mp3'], correct: 2, img1: 'kuva7.avif', img2: 'kuva3.avif' },
    { audio: ['aani4,1.mp3', 'aani4,2.mp3', 'aani4,3.mp3'], correct: 1, img1: 'kuva4.avif', img2: 'kuva7.avif' },
    { audio: ['aani5,1.mp3', 'aani5,2.mp3', 'aani5,3.mp3'], correct: 2, img1: 'kuva2.avif', img2: 'kuva5.avif' },
    { audio: ['aani6,1.mp3', 'aani6,2.mp3', 'aani6,3.mp3'], correct: 1, img1: 'kuva6.avif', img2: 'kuva8.avif' },
    { audio: ['aani7,1.mp3', 'aani7,2.mp3', 'aani7,3.mp3'], correct: 2, img1: 'kuva5.avif', img2: 'kuva7.avif' },

];

let currentQuestions = [];
let currentQuestion = 0;
let selectedOption = 0;
let correctAnswers = 0;
let checkButtonClicked = false;
let currentAudio = null;

function startGame() {
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('question-container').style.display = 'block';
    document.getElementById('stars-container').style.display = 'block';
    currentQuestions = getRandomQuestions(5);
    loadQuestion();
    playAudio('valitse.mp3', () => {
        playQuestionAudio();
    });
}

function getRandomQuestions(count) {
    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

function loadQuestion() {
    const question = currentQuestions[currentQuestion];
    document.getElementById('option1').src = question.img1;
    document.getElementById('option2').src = question.img2;
    document.getElementById('check-button').style.display = 'block';
    document.getElementById('next-arrow').style.display = 'none';
    checkButtonClicked = false;
    selectedOption = 0;
    
    document.querySelectorAll('.option').forEach(option => {
        option.classList.remove('selected', 'correct', 'incorrect');
    });
    
    updateCheckButtonState();
}

function selectOption(option) {
    selectedOption = option;
    const options = document.querySelectorAll('.option');
    options.forEach(optionElement => {
        optionElement.classList.remove('selected');
    });
    document.getElementById(`option${option}`).classList.add('selected');
    updateCheckButtonState();
}

function updateCheckButtonState() {
    const checkButton = document.getElementById('check-button');
    checkButton.disabled = selectedOption === 0;
    checkButton.classList.toggle('disabled', selectedOption === 0);
}

function checkAnswer() {
    if (checkButtonClicked || selectedOption === 0) return;
    
    checkButtonClicked = true;
    const question = currentQuestions[currentQuestion];
    
    const selectedElement = document.getElementById(`option${selectedOption}`);
    if (selectedOption === question.correct) {
        selectedElement.classList.add('correct');
        correctAnswers++;
        updateStars();
        playAudio('oikein.mp3');
    } else {
        selectedElement.classList.add('incorrect');
        document.getElementById(`option${question.correct}`).classList.add('correct');
        playAudio('vaarin.mp3');
    }
    document.getElementById('check-button').style.display = 'none';
    document.getElementById('next-arrow').style.display = 'block';
}

function updateStars() {
    const starsContainer = document.getElementById('stars-container');
    starsContainer.innerHTML = '<img src="tahti.avif" alt="Star" class="star-icon">'.repeat(correctAnswers);
}

function playQuestionAudio() {
    const question = currentQuestions[currentQuestion];
    const audioFiles = question.audio;
    const randomAudioFile = audioFiles[Math.floor(Math.random() * audioFiles.length)];
    playAudio(randomAudioFile);
}

function nextQuestion() {
    stopAllAudio();
    document.querySelectorAll('.option').forEach(option => {
        option.classList.remove('correct', 'incorrect', 'selected');
    });
    currentQuestion++;
    if (currentQuestion >= currentQuestions.length) {
        showResult();
    } else {
        loadQuestion();
        playQuestionAudio();
    }
}

function showResult() {
    const questionContainer = document.getElementById('question-container');
    questionContainer.innerHTML = `
        <h1>MITÄ KISSA SANOO?</h1>
        <p id="result">SAIT ${correctAnswers} / ${currentQuestions.length} OIKEIN</p>
        <div id="final-stars-container">${'<img src="tahti.avif" alt="Star" class="star-icon">'.repeat(correctAnswers)}</div>
        <button onclick="restartGame()">PELAA UUDELLEEN</button>
    `;
    document.getElementById('stars-container').style.display = 'none';
}

function restartGame() {
    stopAllAudio();
    currentQuestion = 0;
    selectedOption = 0;
    correctAnswers = 0;
    checkButtonClicked = false;
    currentQuestions = getRandomQuestions(5);
    
    const questionContainer = document.getElementById('question-container');
    questionContainer.innerHTML = `
        <h2>VALITSE OIKEA KUVA:</h2>
        <div class="options">
            <img id="option1" class="option" onclick="selectOption(1)">
            <img id="option2" class="option" onclick="selectOption(2)">
        </div>
        <div id="game-controls">
            <button id="check-button" onclick="checkAnswer()">TARKISTA</button>
            <img id="next-arrow" src="nuoli.png" onclick="nextQuestion()">
        </div>
    `;
    
    document.getElementById('stars-container').innerHTML = '';
    document.getElementById('stars-container').style.display = 'block';
    
    loadQuestion();
    playAudio('valitse.mp3', () => {
        playQuestionAudio();
    });
}

function stopAllAudio() {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        currentAudio = null;
    }
}

function playAudio(src, callback) {
    stopAllAudio();
    currentAudio = new Audio(src);
    currentAudio.play().catch(error => console.error('Error playing audio:', error));
    if (callback) {
        currentAudio.onended = callback;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('start-button').addEventListener('click', startGame);

    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowRight' && document.getElementById('next-arrow').style.display !== 'none') {
            nextQuestion();
        }
    });
});
