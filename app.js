// let boxes = document.querySelectorAll(".box");
// let resetBtn = document.querySelector("#reset-btn");
// let newGameBtn = document.querySelector("#new-btn");
// let msgContainer = document.querySelector(".msg-container");
// let msg = document.querySelector("#msg");
// let mainContainer = document.querySelector("main");
// let turnO = true;
// let count = 0;
//  const winPatterns = [
//     [0, 1, 2],
//     [0, 3, 6],
//     [0, 4, 8],
//     [1, 4, 7],
//     [2, 5, 8],
//     [2, 4, 6],
//     [3, 4, 5],
//     [6, 7, 8],
//  ];
//  const resetGame = () => {
//     turnO =true;
//     enableBoxes();
//     msgContainer.classList.add("hide");
//     mainContainer.style.display = "block";
//  };
//  boxes.forEach((box) => {
//     box.addEventListener("click",() =>{
//     console.log("box was clicked");
//     if(turnO){
//      box.innerText ="O"; 
//      box.style.color ="#34495e";
//      turnO=false;  
//     } else{
//         box.innerText ="X";
//         turnO = true;
//     }
//     box.disabled = true;
//      checkWinner();
//     });
//  });
//  const gameDraw =() =>{
//     msg.innerText =`Game was a Draw.`;
//     msgContainer.classList.remove("hide");
//     mainContainer.style.display = "none";
//     disableBoxes();
//  };
// const disableBoxes = ()=>{
//    for(let box of boxes){
//     box.disabled = true;
//    }
// };
// const enableBoxes =  ()=>{
//     for(let box of boxes){
//         box.disabled = false;
//         box.innerText="";
//     }
// };
// const showWinner = (winner) =>{
//     msg.innerText =`Congratulations, Winner is ${winner}`;
//     msgContainer.classList.remove("hide");
//     mainContainer.style.display ="none";
//     disableBoxes();
// };
//     const checkWinner = ()=>{
//     for(let pattern of winPatterns){
//        // console.log([pattern[0]], [pattern[1]], [pattern[2]]);
//         //console.log(boxes[pattern[0]].innerText, boxes[pattern[1]].innerText, boxes[pattern[2]].innerText);
//         let pos1val = boxes[pattern[0]].innerText;
//         let pos2val = boxes[pattern[1]].innerText;
//         let pos3val = boxes[pattern[2]].innerText;
//     if(pos1val != "" && pos2val != "" && pos3val != ""){
//         if(pos1val === pos2val && pos2val === pos3val){
//             console.log("winner",pos1val);
//             showWinner(pos1val);
//         }
//     }
//  }   
// };
// newGameBtn.addEventListener("click",resetGame);
// resetBtn.addEventListener("click",resetGame);


let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let mainContainer = document.querySelector("main");

let turnO = true;
let count = 0;
let gameOver = false;

// All possible winning combinations
const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

// Reset the game
const resetGame = () => {
    turnO = true;
    count = 0;
    gameOver = false;

    enableBoxes();

    msgContainer.classList.add("hide");
    mainContainer.style.display = "block";
};

// Disable all boxes
const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

// Enable all boxes and clear them
const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

// Show winner
const showWinner = (winner) => {
    msg.innerText = `Congratulations! Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    mainContainer.style.display = "none";

    gameOver = true;
    disableBoxes();
};

// Check winner
const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if (pos1 !== "" && pos1 === pos2 && pos2 === pos3) {
            showWinner(pos1);
            return true;
        }
    }

    return false;
};

// Check draw
const checkDraw = () => {
    if (count === 9 && !gameOver) {
        msg.innerText = "Game was a Draw!";
        msgContainer.classList.remove("hide");
        mainContainer.style.display = "none";

        gameOver = true;
        disableBoxes();
    }
};

// Computer's move
const computerMove = () => {
    if (gameOver) return;

    let emptyBoxes = [];

    boxes.forEach((box, index) => {
        if (box.innerText === "") {
            emptyBoxes.push(index);
        }
    });

    if (emptyBoxes.length === 0) return;

    let randomIndex = Math.floor(Math.random() * emptyBoxes.length);
    let computerChoice = emptyBoxes[randomIndex];

    boxes[computerChoice].innerText = "X";
    boxes[computerChoice].disabled = true;

    count++;

    if (!checkWinner()) {
        checkDraw();
    }
};

// Player's move
boxes.forEach((box) => {
    box.addEventListener("click", () => {

        if (gameOver || !turnO || box.disabled) return;

        // Player plays O
        box.innerText = "O";
        box.disabled = true;

        count++;

        if (checkWinner()) return;

        checkDraw();

        if (!gameOver) {
            turnO = false;

            // Computer plays automatically
            computerMove();

            turnO = true;
        }
    });
});

// Reset buttons
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
