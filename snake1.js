let grid = document.querySelector(".grid");
let popup = document.querySelector(".popup");
let playAgain = document.querySelector(".playAgain");
let scoreDisplay = document.querySelector(".scoreDisplay");
let highScoreDisplay = document.querySelector(".highScore");
let difficultyLevels = document.querySelector(".difficulty");
let width = 20;
let currentIndex = 0;
let appleIndex = 0;
let currentSnake = [2, 1, 0];
let direction = 1;
let score = 0;
let speed = 0.8;
let intervalTime = 0;
let interval = 0;
let highScore = '';

document.addEventListener('click', difficultyLevels)
// First make a button that starts the game
// Event listener for click
// Then make two more buttons
// That each have their own event listener
// The callback function should set a value for the game speed before starting it



document.addEventListener('DOMContentLoaded', function () {
    document.addEventListener('keyup', control);
    createBoard();
    startGame();
    playAgain.addEventListener('click', replay);
});

const createBoard = () => {
    popup.style.display = 'none';
    for (let i = 0; i < 400; i++) {
        let div = document.createElement('div');
        grid.appendChild(div);
    }
}

const startGame = () => {
    let squares = document.querySelectorAll('.grid div');
    randomApple(squares);
    direction = 1;
    scoreDisplay.innerHTML = score;
    intervalTime = 1000;
    currentSnake = [2, 1, 0];
    currentIndex = 0;
    currentSnake.forEach((index) => squares[index].classList.add('snake'));
    interval = setInterval(moveOutcome, intervalTime);
}

let moveOutcome = () => {
    let squares = document.querySelectorAll('.grid div');
    if (checkForHits(squares)) {
        alert('You hit something');
        popup.style.display = 'flex';
        return clearInterval(interval);
    }
    else {
        moveSnake(squares);
    }
}

let moveSnake = (squares) => {
    let tail = currentSnake.pop();
    squares[tail].classList.remove('snake');
    currentSnake.unshift(currentSnake[0] + direction);  //movement ends here
    eatApple(squares, tail);
    squares[currentSnake[0]].classList.add('snake')
}

let checkForHits = (squares) => {
    if (
        (currentSnake[0] + width >= width * width && direction === width) ||
        (currentSnake[0] % width === width - 1 && direction === 1) ||
        (currentSnake[0] % width === 0 && direction === -1) ||
        (currentSnake[0] - width <= 0 && direction === -width) ||
        squares[currentSnake[0] + direction].classList.contains("snake")
    ) {
        return true;
      } 
      else {
        return false;
      }
}

let eatApple = (squares, tail) => {
    if (squares[currentSnake[0]].classList.contains("apple")) {
        squares[currentSnake[0]].classList.remove("apple");
        squares[tail].classList.add("snake");
        currentSnake.push(tail);
        randomApple(squares);
        score++;
        scoreDisplay.textContent = score;
        clearInterval(interval);
        intervalTime = intervalTime * speed;
        interval = setInterval(moveOutcome, intervalTime);
    }
}

let randomApple = (squares) => {
    do {
        appleIndex = Math.floor(Math.random() * squares.length);
      } 
    while (squares[appleIndex].classList.contains("snake"));
      squares[appleIndex].classList.add("apple");
}

let control = (e) => {
    switch (e.key) {
        case "ArrowUp":
               direction = -width
            console.log("snake moves up"); //tester
            break;
        case "ArrowDown":
               direction = width
            console.log("snake moves down"); //tester
            break;
        case "ArrowLeft":
            if (direction === 1) {
                break;
            }
            direction = -1
            console.log("snake moves left"); //tester
            break;
        case "ArrowRight":
            if (direction === -1) {
                break;
            }
               direction = 1
            console.log("snake moves right"); //tester
            break;      
        default:
            console.log("wrong key"); //tester
            break;        
    }
        
}
document.addEventListener('keydown', control);


function replay() {
    grid.innerHTML = "";
    createBoard();
    highScore = score;
    highScoreDisplay.innerText= highScore;
    score = 0;
    startGame();
    popup.style.display = "none";
}