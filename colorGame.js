let score=-1
function create_sqr(curSqrSide=2){
    window.alert=(e)=>console.log(e)
    alert("sdsd")
    score++
    gameText.innerText="Score :"+score
    curSqrSide>20?curSqrSide=20:curSqrSide
    gameBoard.innerText="" // removing previous squares
    let l=500 // board size
    alert(`${Math.floor(l/curSqrSide)}`)
    let r=generateRandomInteger(255)
    let g=generateRandomInteger(255)
    let b=generateRandomInteger(255)
    let nxt_sqr=generateRandomInteger(curSqrSide**2)
    let high_btn=null
    for(let i=1;i<=curSqrSide**2;i++){
        let btn=document.createElement("BUTTON")
        btn.style=`padding:${Math.floor(l/(curSqrSide*2))};`
        gameBoard.append(btn)
        if(i%curSqrSide==0){
            let be=document.createElement("br")
            gameBoard.append(be)
        }
        if(nxt_sqr==i){
            high_btn=btn
            btn.style.backgroundColor="rgba("+r+","+g+","+b+",0.9)"
            btn.onclick=()=>create_sqr(curSqrSide+1)
        }
        else{
            btn.style.backgroundColor="rgba("+r+","+g+","+b+",1)"
            btn.onclick=()=>{
                // create_sqr(2)
                high_btn.style.border="solid black"
                gameText.innerText="GAME OVER \n Score "+score
                score=0
            }
        }
    }
    
}

function generateRandomInteger(max) {
    return Math.floor(Math.random() * max) + 1;
}

// create_sqr()

// write the function for auto updating the number and dislaying score too
// let last_sqr=true
// function start_game(){
//     for(let i=2;;i++){
//         create_sqr(i);
//     }
//     gameText.innerText="GAME OVER\n SCORE : "+(cnt-1)
// }