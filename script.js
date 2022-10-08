let statusText = document.querySelector('.statusText')
let restartBtn = document.querySelector('#restart')
let boxes = document.querySelectorAll(".box")

const winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

let currentPlayer = "X";
let spaces = ["","","","","","","","",""];
let running = false;

startGame();

function startGame(){
    boxes.forEach(box => box.addEventListener('click', boxClicked))
    restartBtn.addEventListener('click', restart);
    statusText.textContent = `${currentPlayer}'s turn`;
    running = true;
}

function boxClicked() {
    const cellIndex = this.getAttribute("cellIndex");

    if(spaces[cellIndex] != "" || !running){
        return;
    }

    updateCell(this, cellIndex);
    playerHasWon();
    
    
}

function playerHasWon(){
    let roundWon = false;

    for(let i = 0; i < winningCombos.length; i++) {
        const condition = winningCombos[i];
        const cellA = spaces[condition[0]];
        const cellB = spaces[condition[1]];
        const cellC = spaces[condition[2]];

        if (cellA == "" || cellB == "" || cellC == "") {
            continue;
        }
        if(cellA == cellB && cellB == cellC){
            roundWon = true;
            break;
        }
    }

    if(roundWon){
        statusText.textContent = `${currentPlayer}wins!`
        running = false;
    }
    else if(!spaces.includes("")){
        statusText.textContent = `Draw!`;
        running = false;
    }
    else {
        changePlayer();
    }
   
}

function updateCell(box, index){
    spaces[index] = currentPlayer;
    box.textContent = currentPlayer;
}
function changePlayer(){
    currentPlayer = (currentPlayer == "X")? "O": "X";
    statusText.textContent = `${currentPlayer}'s turn`;
    
}
restartBtn.addEventListener('click', restart)

function restart() {
    currentPlayer = "X";
    spaces = ["","","","","","","","",""];
    statusText.textContent = `${currentPlayer}'s turn`;
    boxes.forEach(box => box.textContent = "");
    running = true;

}
