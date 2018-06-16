const gravity=1.5;
const FPS = 30;

let canvas;
let player;
let pipes;
let activePipeIndex;
let paused;
let won;
let screenWidth;
let screenHeight;
let bot;

let background_image;
let background_x;
let pause_text;
let you_win_text;

function setup(){
  screenWidth = 800;
  screenHeight = 500;
  populationSize = 30;
  background_image = document.getElementById('background');
  background_x = 0;
  pause_text = document.getElementById('text');
  you_win_text = document.getElementById('you_win');

  player = new Bird(200, 225);
  player.image = document.getElementById('kosa');
  bot = new Bird(200, 225, Network.fromJSON(best_bird_json));
  bot.image = document.getElementById('harmasz');
  pipes = [];
  pipes.push(new Pipe(800));
  pipes.push(new Pipe(1100));
  pipes.push(new Pipe(1400))
  activePipeIndex=0;
  paused = true;
}

function draw(){
  //updates
  if (!paused){
    player.update();
    bot.update();
    bot.think(pipes[activePipeIndex].x, pipes[activePipeIndex].hole_y);
    if (player.y + player.height > screenHeight)  return setup();

    for (i in pipes) pipes[i].update();
    if (pipes[activePipeIndex].x + pipes[activePipeIndex].width < player.x) activePipeIndex++;
    if (activePipeIndex >= pipes.length) activePipeIndex=0;

    if (pipes[activePipeIndex].checkCollision(player.getBounds())) setup();
    if (pipes[activePipeIndex].checkCollision(bot.getBounds())){
      bot.alive=false;
      won=true;
    }

    background_x-=pipes[0].velocity/2;
    if (background_x <= -852) background_x = 0;
  }

  //drawing
  canvas.drawImage(background_image, background_x, 0, 852, 500);
  canvas.drawImage(background_image, background_x + 852, 0, 852, 500);
  if (paused && !won) canvas.drawImage(pause_text, 400, 100, 400, 300);
  canvas.fillStyle = 'red';
  bot.draw(canvas);
  canvas.fillStyle = 'blue';
  player.draw(canvas);

  canvas.fillStyle = 'green';
  for (i in pipes) pipes[i].draw(canvas);
  if (won) canvas.drawImage(you_win_text, 0, 0, 800, 500);
}

function keyPressed(e){
  if(e.keyCode == 32){
    mouseDown();
  }
}

function mouseDown(){
  if(paused) won=false;
  paused=false;
  player.jump();
}

window.onload = () => {
  let canvas_object = document.getElementById('game_canvas')
  canvas = canvas_object.getContext('2d');

  setup();
  setInterval(draw, 1000/FPS);
  document.addEventListener('keydown', keyPressed);
  document.addEventListener('mousedown', mouseDown);
}
