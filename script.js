const Player = (name, mark)=>{

    return {name,mark}
};

const game = (()=>{
    const player1 = Player("Player 1", "X");
    const player2 = Player("Player 2", "O");
    let players = [null,player1,player2];
    let currentPlayer = player1;
    let moveCounter = 0;

    const board = document.querySelector("#board");
    const allChildren = Array.from(board.children);
    board.addEventListener("click", makeMove);
    function makeMove(e){
        const number = Array.from(this.children).indexOf(e.path[0]);
        if(number==-1)return;
        const item = e.path[0];
        if(!item.classList.contains("empty"))return;

        item.innerHTML = currentPlayer.mark;
        item.classList.remove("empty");
        moveCounter++;
        changePlayer();
        checkGame();
    }
    function checkGame(){
        const newArr = allChildren.map(mappeo);

        function mappeo(item){
            if(item.innerHTML=="X")return 1;
            if(item.innerHTML=="O")return 2;
            return 0;
        }

        for(let i = 0;i<3;i++){
            if(newArr[i*3+0]==newArr[i*3+1] && newArr[i*3+0]==newArr[i*3+2]){
                if(newArr[i*3+0]==0)continue;
                winner(players[newArr[i*3+0]]);
                return;
            }
            if(newArr[0*3+i]==newArr[1*3+i] && newArr[0*3+i]==newArr[2*3+i]){
                if(newArr[0*3+i]==0)continue;
                winner(players[newArr[0*3+i]]);
                return;
            }
        }
        if(newArr[0*3+0]==newArr[1*3+1] && newArr[0*3+0]==newArr[2*3+2] && newArr[0]!=0){
            winner(players[newArr[0*3+0]]);
            return;                
        }
        if(newArr[2]==newArr[4] && newArr[2]==newArr[6] && newArr[2]!=0){
            winner(players[2]);
            return;
        }
        if(moveCounter>=9)tie();


    }
    function changePlayer(){
        if(currentPlayer==player1){
            currentPlayer=player2;
        }else{
            currentPlayer=player1;
        }
    }
    function winner(player){
        document.querySelector("#winner-modal-container").style.display = "flex";
        const dialog = player.name+" won the game!!";
        document.querySelector("#winner-modal h1").innerHTML = dialog;
    }
    function tie(){
        document.querySelector("#winner-modal-container").style.display = "flex";
        const dialog = "TIE!!!!";
        document.querySelector("#winner-modal h1").innerHTML = dialog;
    }

    function restart(){
        document.querySelector("#winner-modal-container").style.display = "none";        
        allChildren.forEach((child)=>{
            child.innerHTML = " ";
            child.classList.add("empty");
        });
        moveCounter=0;
    }
    return{restart,checkGame};
})();