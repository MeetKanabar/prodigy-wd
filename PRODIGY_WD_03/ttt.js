let boxes=document.querySelectorAll(".box");
let resetBtn=document.querySelector("#reset");
let newGameBtn=document.querySelector("#new");
let msgconst=document.querySelector(".msg-container");
let msg=document.querySelector("#msg");
let count=0;
let disp=document.querySelector("#noWin");

let turn0=true;  //player 0 if true and player x if false

const winPatterns=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];

boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        count++;
        if (turn0==true){
            box.innerText="X";
            turn0=false;
        }
        else{
            box.innerText="0";
            turn0=true;
        }
        box.disabled=true;

        let isWinner=checkWinner();
        
        if(count==9 &&!isWinner){
            gameDraw();
        }
    })
});

const resetGame = () => {
    count=0;
    turn0=true;
    enableBoxes();
    msgconst.classList.add("hide");
}

const gameDraw = () =>{
    msg.innerText="Game is a draw";
    msgconst.classList.remove("hide");
    disableBoxes();
}

const disableBoxes = () =>{
    for(let box of boxes){
        box.disabled=true;
    }
}

const enableBoxes = () =>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
    }
}

const showWinner=(winner)=>{
    msg.innerText=`Congratulations!!  winner : ${winner}`;
    msgconst.classList.remove("hide");       
    disableBoxes(); 
};

const checkWinner= () =>{
    for(let pattern of winPatterns){
        console.log(pattern[0],pattern[1],pattern[2]);
            let pos1val=boxes[pattern[0]].innerText;
            let pos2val=boxes[pattern[1]].innerText;
            let pos3val=boxes[pattern[2]].innerText;

            if(pos1val!="" && pos2val!="" && pos3val!=""){
                if(pos1val===pos2val && pos2val===pos3val){
                    console.log("Congratulations!!  winner : ",pos1val);
                    showWinner(pos1val);
                    return true;
                }
            }
            
    }
};

resetBtn.addEventListener("click",resetGame);
newGameBtn.addEventListener("click",resetGame);