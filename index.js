const boxes = document.querySelectorAll(".box")
const gameInfo = document.querySelector(".game-info")
const newGameBtn = document.querySelector(".btn")

//creating variables for
//1-> current player
//2-> grid ka variable create karna jispar puri gmae kheli ja rahi hai
//3-> winning position -> kis kis position par mai ye mar kar sakti hu that player jeet gaya vo sare position store karna hai
//4-> new game ke liye function banana hai


let currentPlayer;
let gameGrid;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

//creating a function to initialise the game
function initGame() {
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    //UI par empty bhi karna padega boxes ko when we call the new game vali btn
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all"
        //initialize boxes with css properties again
        box.classList = `box box${index+1}`;
    });
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`
}

initGame();

function swapTurn(){
    if(currentPlayer === "X"){
        currentPlayer = "O";
    }
    else{
        currentPlayer = "X";
    }
    // UI update
    gameInfo.innerText = `Current Player - ${currentPlayer}`
}

function checkGameOver(){
    let answer = "";

    winningPositions.forEach((position) => {
        // all three boxes should be non-empty ans exactly same in value
        if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "")
            && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])){
                
                //check if winner is X
                if(gameGrid[position[0]] === "X"){
                    answer = "X";
                }
                else{
                    answer = "O"
                }

                //disable pointer event
                boxes.forEach((box) => {
                    box.style.pointerEvents = "none";
                })

                // now we know that either X or O is the winner to green vala background lana hai
                boxes[position[0]].classList.add("win");
                boxes[position[1]].classList.add("win");
                boxes[position[2]].classList.add("win");
        }
    })    

    // it means we have a winner
    if(answer != ""){
        gameInfo.innerText = `Winner Player - ${answer}`;
        newGameBtn.classList.add("active")
        return;
    }

    //let's check whether there is no winner
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box !== ""){
            fillCount++;
        }
    })

    //bored is filled, game is tie
    if(fillCount === 9){
        gameInfo.innerText = `Game Tied !`
        newGameBtn.classList.add("active")
    }
}

//1-> if(box cicked empty hai to hi aage badhna)
//2-> unclickable kar dena
//3-> box value X/0
//4-> player change
//5-> swap turn--> take care of current player
//6-> check koi jeeta to nahi
function handleClick(index){
    if(gameGrid[index] === ""){
        //below like ui mai changes karengi about the X/0
        boxes[index].innerText = currentPlayer;
        //below line will make the changes in the array that we made
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        //swap karo turn ko
        swapTurn();
        //check karo koi jeet to nahi gaya
        checkGameOver();
    }
}

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index); 
    })
})

newGameBtn.addEventListener("click", initGame);