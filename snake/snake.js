const directions ={
    UP    : 0,
    RIGHT : 1,
    DOWN  : 2,
    LEFT  : 3
};

class SnakeGame{
    constructor(){
        this.title = "Snake";
    }

    load(){
        return new Promise((resolve, reject)=>{
            this.snake = new Snake(width/2,height/2);
            resolve(true);
        });
    }

    run(){
        this.snake.draw();
    }

    keyPressed(keyCode){
        if(this.snake)
            this.snake.setDirection(keyCode);
    }
}

class Snake{
    constructor(x, y){
        this.position = createVector(x,y);
        this.body = [];
        this.direction = directions.UP;
        this.addSegment(this.position.x, this.position.y);
    }

    move(){

    }
    draw(){
        rect(this.position.x, this.position.y, 10,10);
    }

    addSegment(x,y){
        this.body.push(rect(x, y, 5,5));
    }

    setDirection(keyCode){
        switch(keyCode){
            case UP_ARROW:
                this.direction = directions.UP;
                break;
            case DOWN_ARROW:
                this.direction = directions.DOWN;
                break;
            case LEFT_ARROW:
                this.direction = directions.LEFT;
                break;
            case RIGHT_ARROW:
                this.direction = directions.RIGHT;
                break;
        }
    }
}