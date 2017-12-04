var drag = false;
var rot=0, rot_speed = 0;
var drag_start_mouseX, drag_start_mouseY;
var drag_start_angle, drag_angle;

function preload(){
  img = loadImage("assets/keizai.png");
}

function setup() {
  pixelDensity(1);
  var myCanvas = createCanvas(windowWidth * 0.8, windowHeight * 0.75);
  myCanvas.parent('sketch-holder');

  background(216);
  imageMode(CENTER);
  translate(width/2,height/2);
  image(img, 0, 0);
}

function draw() {
  background(216);
  push();
    translate(width/2,height/2);
    update();
    image(img, 0, 0);
  pop();
}


function update(){
  if(drag){
    var drag_end_angle = atan2(mouseX - width/2,mouseY - height/2);
    drag_angle = drag_end_angle-drag_start_angle;
    if(abs(drag_angle)>PI){
      drag_angle = drag_angle>0? TWO_PI-drag_angle: drag_angle+TWO_PI;
    }
    push();
      translate(-width/2,-height/2);
      strokeWeight(32);
      colorMode(HSB)
      stroke(144-constrain(abs(drag_angle*120),0,144),50,100,64);
      line(drag_start_mouseX,drag_start_mouseY,mouseX,mouseY);
    pop();
    rot_speed = 0;
  }else{
    rot += rot_speed;
    rot_speed = 0.98 * rot_speed;
  }


  rotate(rot);
}

function touchStarted(){
  drag_start_angle = atan2(mouseX - width/2,mouseY - height/2);
  drag_start_mouseX = mouseX; drag_start_mouseY = mouseY;
  drag = true;
}

function touchEnded(){
  drag = false;
  rot_speed = drag_angle;
}

function touchMoved(){
  if(mouseX>0 && mouseX<width && mouseY>0 && mouseY < height){
    return false;
  }
}