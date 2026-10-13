let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let mainContainer = document.querySelector("main");
let turnO = true;
let count = 0;
 const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
 ];
 const resetGame = () => {
    turnO =true;
    enableBoxes();
    msgContainer.classList.add("hide");
    mainContainer.style.display = "block";
 };
 boxes.forEach((box) => {
    box.addEventListener("click",() =>{
    console.log("box was clicked");
    if(turnO){
     box.innerText ="O"; 
     box.style.color ="#34495e";
     turnO=false;  
    } else{
        box.innerText ="X";
        turnO = true;
    }
    box.disabled = true;
     checkWinner();
    });
 });
 const gameDraw =() =>{
    msg.innerText =`Game was a Draw.`;
    msgContainer.classList.remove("hide");
    mainContainer.style.display = "none";
    disableBoxes();
 };
const disableBoxes = ()=>{
   for(let box of boxes){
    box.disabled = true;
   }
};
const enableBoxes =  ()=>{
    for(let box of boxes){
        box.disabled = false;
        box.innerText="";
    }
};
const showWinner = (winner) =>{
    msg.innerText =`Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    mainContainer.style.display ="none";
    disableBoxes();
};
    const checkWinner = ()=>{
    for(let pattern of winPatterns){
       // console.log([pattern[0]], [pattern[1]], [pattern[2]]);
        //console.log(boxes[pattern[0]].innerText, boxes[pattern[1]].innerText, boxes[pattern[2]].innerText);
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;
    if(pos1val != "" && pos2val != "" && pos3val != ""){
        if(pos1val === pos2val && pos2val === pos3val){
            console.log("winner",pos1val);
            showWinner(pos1val);
        }
    }
 }   
};
newGameBtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);
