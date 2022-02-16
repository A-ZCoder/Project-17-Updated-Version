var END;
var PLAY;
var gameState = "serve";

var life = 2;
var sta = 0; 

var obstacleGroup;
var bol;
var reset, resetImg;
var luks, luksImg, vads, vadsImg;
var space, spaceImg;
var model, modelImg;
var box, boxImg;
var button, buttonImg;
var bomb, bomb2, bombImg;
var met, metImg, met2, met2Img;
var star, starImg;
var bank;
var boImg;

var bombGroup;
var starGroup;
var metGroup;
var met2Group;

function preload(){
  spaceImg = loadImage("space.jpg");
  modelImg = loadImage("mode.jpg");
  boxImg = loadImage("paper.png");
  buttonImg = loadImage("start.png");
  luksImg = loadImage("luks.png");
  vadsImg = loadImage("vd.png");
  bombImg = loadImage("bomb.png");
  metImg = loadImage("Meteorite.png");
  met2Img = loadImage("ket.png");
  starImg = loadImage("star.png");
  boImg = loadImage("bo.png");
  resetImg = loadImage("res.webp");
}


function setup(){
createCanvas(1350,650);
space = createSprite(465,300)
space.addImage(spaceImg);
space.scale = 1.4;

bol = createSprite(1280,500,10,2000)
bol.visible = false;

box = createSprite(669,340);
box.addImage(boxImg);
box.scale = 0.99;

button = createSprite(663,580);
button.addImage(buttonImg);
button.scale = 0.17;

model = createSprite(680,180);
model.addImage(modelImg);
model.scale = 0.4;

luks = createSprite(630,350);
luks.addImage(luksImg);
luks.scale = 0.28
luks.visible = false;
luks.debug = false;
luks.setCollider("rectangle", -47, -2, 917,636)

vads = createSprite(7,350);
vads.addImage(vadsImg);
vads.scale = 0.38
vads.mirrorX(-1)
vads.visible = false;

bank = createSprite(1200,300)
bank.addImage(starImg);
bank.scale = 0.5;
bank.visible = false;

reset = createSprite(660,500)
reset.addImage(resetImg);
reset.scale = 0.1
reset.visible = false;

life = 2;
sta = 0;

bombGroup = new Group()
starGroup = new Group()
met2Group = new Group()
metGroup = new Group()
obstacleGroup = new Group()
}

function draw() {
  background(0);

  if(gameState == "PLAY") {
    button.destroy();
    box.destroy();
    model.destroy();

    bank.visible = false;


edges = createEdgeSprites()
luks.collide(edges);

space.velocityX = -7

if(space.x < 490) {
  space.x = width/2
}


    luks.visible = true;
    vads.visible = true;

vads.y = luks.y;

if(bombGroup.isTouching(met2Group)) {
  met2Group.destroyEach();
  bombGroup.destroyEach();
}

if(bombGroup.isTouching(metGroup)) {
  metGroup.destroyEach();
  bombGroup.destroyEach();
}


if(keyDown(UP_ARROW)) {
  luks.y = luks.y-5
}

if(keyDown(DOWN_ARROW)) {
  luks.y = luks.y+5
}

if(luks.isTouching(starGroup)) {
  sta = sta+1
  starGroup.destroyEach();
}

if(metGroup.isTouching(luks)) {
  life = life-1;
  metGroup.destroyEach();
}

if(met2Group.isTouching(luks)) {
  life = life-2;
  met2Group.destroyEach();
}

if(luks.isTouching(bombGroup)) {
  life = life-1
  bombGroup.destroyEach()
}

if(Math.round(frameCount%4444 === 0)) {
  sta = -1;
}

if(sta < 0) {
  victory()
}

if(luks.isTouching(bol)) {
  vads.destroy();
  obstacleGroup.destroyEach();
  luks.destroy();
  obstacleGroup.visible = false;
  box = createSprite(669,340);
box.addImage(boxImg);
box.scale = 0.99;
}

createBomb()
createStar()
createMeteor1()
createMeteor2()

if(life < 1) {
 
  space.velocityX = 0;
  met2Group.destroyEach()
  metGroup.destroyEach()
  starGroup.destroyEach()
  bombGroup.destroyEach()
  vads.velocityX = 4;
  life  = life*0
} 

if(vads.isTouching(luks)) {
  gameState = END;
}

} else if(gameState === END) {
  luks.visible = false
  vads.visible = false
  reset.visible = true

  if(mousePressedOver(reset)) {
      rest()
  }


}







  drawSprites();

  if(sta < 0) {
    textSize(50)
    fill("blue")
    text("You Won", 500,300)

    textSize(30)
    fill("blue")
    text("New levels coming soon", 500,500)
  } 

  

if(gameState == "serve") {
  textSize(30)
  fill("red")
  text("Don't let Vader catch you", 500,360)
  textSize(30)
  fill("red")
  text("Dodge his Ammunition", 520,400)
  textSize(30)
  fill("red")
  text("Dodge his Ammunition", 520,400)

  textSize(30)
  text("  "+sta, 1177,350)
  bank.visible = true

} else  {
  gameState == "PLAY"
}

if(mousePressedOver(button)) {
  gameState = "PLAY";
}

if(gameState == "PLAY") {
  textSize(30)
  fill("purple")
  text("Stars :"+sta, 1100,70)

  textSize(30)
  fill("red")
  text("Lives :"+life, 1100,100)
}


//draw
}
 
function createBomb() 
{
if(Math.round(frameCount%250 === 0)) {
  bomb = createSprite(100,300);
  bomb.addImage(bombImg);
  bomb.velocityX = 3;
  bomb.scale = 0.35
  bomb.y = vads.y;
obstacleGroup.add(bomb)

  bomb2 = createSprite(100,300);
  bomb2.addImage(bombImg);
  bomb2.velocityX = 4;
  bomb2.scale = 0.35
  obstacleGroup.add(bomb2)
  bombGroup.add(bomb);
  bombGroup.add(bomb2);

  bomb.debug = false;
  bomb.setCollider("circle", 0, 0, 150)
  bomb2.debug = false;
  bomb2.setCollider("circle", 0, 0, 150)
}
}


function createStar() 
{
if(Math.round(frameCount%70 === 0)) {
  star = createSprite(1270,300);
  star.addImage(starImg);
  star.scale = 0.3;
  star.velocityX = -7;
  star.y = Math.round(random(50, 560))
  starGroup.add(star)
  obstacleGroup.add(star)
  star.debug = false;
  star.setCollider("circle", 0, 0, 100)
}
}

function createMeteor1() 
{
if(Math.round(frameCount%266 === 0)) {
  met = createSprite(1270,500);
  met.addImage(metImg);
  met.scale = 0.3;
  met.velocityX = -11;
  met.velocityY = 2;
  met.y = Math.round(random(30,400))
  metGroup.add(met)
  obstacleGroup.add(met)
  met.debug = false;
  met.setCollider("circle", 0, 0, 215)
}
}


function createMeteor2() 
{
if(Math.round(frameCount%277 === 0)) {
  met2 = createSprite(1270,10);
  met2.addImage(met2Img);
  met2.scale = 0.52;
  met2.velocityX = -10;
  met2.velocityY = 2;
  met2.y = Math.round(random(30,400))
  met2Group.add(met2);
  obstacleGroup.add(met2)
  met2.debug = false;
  met2.setCollider("circle", 0, 0, 150)
}
}


function rest()
{
  reset.visible = false
gameState = "serve"
box = createSprite(669,340);
box.addImage(boxImg);
box.scale = 0.99;
button = createSprite(663,580);
button.addImage(buttonImg);
button.scale = 0.17;

model = createSprite(680,180);
model.addImage(modelImg);
model.scale = 0.4;

luks = createSprite(630,350);
luks.addImage(luksImg);
luks.scale = 0.28
luks.visible = false;

vads = createSprite(7,350);
vads.addImage(vadsImg);
vads.scale = 0.38
vads.mirrorX(-1)
vads.visible = false;
vads.velocityX = 0

life = 2
sta = 0
}

function victory()
{
  met2Group.destroyEach();
   metGroup.destroyEach();
   starGroup.destroyEach();
   vads.velocityX = -2;
   space.velocityX = 0;
   luks.velocityX = 5;
   bombGroup.destroyEach();
}


