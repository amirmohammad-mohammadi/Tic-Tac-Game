const statusDisplay = document.querySelector('.game--status');

let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];
function line(x){
    let line=document.getElementById('lin')
    switch (x) {
        case 0:
            line.style.display="block";
            line.style.marginTop="17%"
            break;
        case 1:
            line.style.display="block";
            line.style.marginTop="50%"
            break;
        case 2:
            line.style.display="block";
            line.style.marginTop="85%"
            break;
        case 3:
            line.style.display="block";
            line.style.transform = "rotate(90deg)"
            line.style.marginTop="50%"
            line.style.marginLeft="-33%"
            break;
        case 4:
            line.style.display="block";
            line.style.transform = "rotate(90deg)"
            line.style.marginTop="50%"
            break;
        case 5:
            line.style.display="block";
            line.style.transform = "rotate(90deg)"
            line.style.marginTop="50%"
            line.style.marginLeft="34%"
            break;
        case 6:
            line.style.display="block";
            line.style.transform = "rotate(45deg)"
            line.style.marginTop="50%"
            break;
        case 7:
            line.style.display="block";
            line.style.transform = "rotate(-45deg)"
            line.style.marginTop="50%"
            break;

    }

}

const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

statusDisplay.innerHTML = currentPlayerTurn();

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}

function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            line(i);
            break
        }
    }

    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }

    handlePlayerChange();
}

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));


    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

function handleRestartGame() {
    let line=document.getElementById('lin')
    line.style.display="none";
    line.style.margin="0"
    line.style.transform = "rotate(0deg)"
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}


document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.game--restart').addEventListener('click', handleRestartGame);
// document.querySelector(".wrapper").addEventListener('click', (e)=>{
//     console.log(e.currentTarget);
//     if (e.currentTarget.className === "wrapper" && !gameActive ) {
//     handleRestartGame()
//     }
//     })