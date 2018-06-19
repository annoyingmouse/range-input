const gameStates= {
    ERROR   : -1,
    WAITING : 0,
    LOADING : 1,
    RUNNING : 2,
    END     : 3
};
let gameState;
let errorMessage;

const defaultGame = {
    title: "PLACEHOLDER",
    load: function(){
        text("LOADING", width*0.5, height *0.5);
        setTimeout(()=>gameState=gameStates.RUNNING, 3000);

    },
    run: function(){
        text("RUNNING", width*0.5, height *0.5);
        setTimeout(()=>gameState=gameStates.END,3000);

    }
};

let game;
function setup(){
    createCanvas(400,400);
    gameState = gameStates.WAITING;
    textAlign(CENTER, CENTER);

    //load GAME
    game = new SnakeGame();
}

function draw(){
    //Standard bits
    background(51);
    fill(255);
    try{
        switch(gameState){
            case gameStates.ERROR:
                background(255,0,0);
                text("ERROR", width*0.5, height *0.4);
                text(errorMessage, width*0.5, height *0.5);
                break;
            case gameStates.WAITING:
                text(game.title.toUpperCase(), width*0.5, height *0.4);
                text("Press SPACE to start", width*0.5, height *0.5);
                break;
            case gameStates.LOADING:
                game.load().then(
                    res=>{
                        gameState=gameStates.RUNNING;
                    },
                    err=>{
                        throw err;
                    }
                ).catch(e=>{throw e;});
                break;
            case gameStates.RUNNING:
                game.run();
                break;
            case gameStates.END:
                console.log("END");
                text("Game Over.", width*0.5, height *0.5);
                setTimeout(()=>gameState=gameStates.WAITING, 3000);
                break;
            default:
                throw "Unknown gameState: "+gameState;
        }
    }catch(e){
        errorMessage = e;
        gameState = gameStates.ERROR;
    }
}

function keyPressed(){
    if(keyCode== 32 && gameState == gameStates.WAITING){
        gameState = gameStates.LOADING;
    }
    if(game)
        game.keyPressed(keyCode);
}