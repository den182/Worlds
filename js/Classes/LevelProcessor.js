function LevelProcessor(userID, canvas, level) {
  
  this.userID = userID;
  
  this.canvas = canvas;
  
  this.level = level;
  
  this.canvasWidth = canvas.canvas.clientWidth;
  
  this.canvasHeight = canvas.canvas.clientHeight;
  
  this.gameOver = false;
  
  this.exitPattern = '#cca';
  
  this.exitHeight = ((15 * this.canvasHeight) / 100);
  
  this.exitWidth = ((7 * this.canvasWidth) / 100);
  
  this.floorHeight = ((2 * this.canvasHeight) / 100);
  
  this.dragHeight = ((2 * this.canvasHeight) / 100);
  
  this.jumpHeight = ((2 * this.canvasHeight) / 100);
  
  this.deathHeight = ((3 * this.canvasHeight) / 100);
  
  this.playerWidth = ((7 * this.canvasWidth) / 100);
  
  this.playerHeight = ((15 * this.canvasHeight) / 100);
  
  this.init = function() {
    this.loadLevel();      
  }
  
  this.loadLevel = function() {
   jQuery.ajax({
     type: "POST",
     async : false,
     context : this,
     url: "php/Level" + this.level + ".php",
     success : function(data){
       parseData = jQuery.parseJSON(data);
       this.levelObjects = parseData; 
       this.player = {
         x : parseData.startPoint.x,
         y : parseData.startPoint.y,
         jump : false,
         dropSpeed : 0,
         jumpSpeed : 0,
         points : {
           head :  {dir : 'right'},
           body : {bottomOffsetY : 0},
           leftArm : {offsetX : 0, offsetY : 0, dir : 'in'},
           rightArm : {offsetX : 0, offsetY : 0, dir : 'in'},
           leftLeg : {offsetX : 0, offsetY : 0, dir : 'in'},
           rightLeg : {offsetX : 0, offsetY : 0, dir : 'in'},                               
         }, 
       };
       this.initGame();
     }
   }); 
  };
  
  this.initGame = function() {
    this.currentWorld = 0;
    this.setWorld(this.currentWorld);
  }; 
  
  this.calcPlayerPoints = function() {
    this.player.points.head.x = this.player.x;
    this.player.points.head.y = this.player.y - (7 * (this.playerHeight / 8));
    this.player.points.head.radius = this.playerHeight / 8;
   
    this.player.points.body.topX = this.player.x;
    this.player.points.body.bottomX = this.player.x;
    this.player.points.body.topY = this.player.y - (5.5 * (this.playerHeight / 8));
    this.player.points.body.bottomY = this.player.y - (3 * (this.playerHeight / 8)) + this.player.points.body.bottomOffsetY;
    
    //this.player.points.leftArm.x = this.player.points.body.topX - (this.playerWidth / 3) + this.player.points.leftArm.offsetX;
    this.player.points.leftArm.x = this.player.points.body.topX + this.player.points.leftArm.offsetX;
    this.player.points.leftArm.y = this.player.points.body.topY + (this.playerHeight / 3) + this.player.points.leftArm.offsetY; 
    
    //this.player.points.rightArm.x = this.player.points.body.topX + (this.playerWidth / 3) + this.player.points.rightArm.offsetX;
    this.player.points.rightArm.x = this.player.points.body.topX + this.player.points.rightArm.offsetX;
    this.player.points.rightArm.y = this.player.points.body.topY + (this.playerHeight / 3) + this.player.points.rightArm.offsetY;
    
    this.player.points.leftLeg.x = this.player.points.body.bottomX - (this.playerWidth / 3) + this.player.points.leftLeg.offsetX;   
    this.player.points.leftLeg.y = this.player.points.body.bottomY + (3 * (this.playerHeight / 8)) + this.player.points.leftLeg.offsetY;
    
    this.player.points.rightLeg.x = this.player.points.body.bottomX + (this.playerWidth / 3) + this.player.points.rightLeg.offsetX;
    this.player.points.rightLeg.y = this.player.points.body.bottomY + (3 *(this.playerHeight / 8)) + this.player.points.rightLeg.offsetY;    
  };
  
  this.updatePlayerPoints = function() {
    if ((this.checkStayOnBoard()) && (keydown.right || keydown.left)) {
      if (this.player.points.leftLeg.dir == 'in') {
        this.player.points.leftLeg.offsetX += 2;
        this.player.points.leftArm.offsetX -= 2;
      }
      else {
        this.player.points.leftLeg.offsetX -= 2;
        this.player.points.leftArm.offsetX += 2; 
      }

      if (this.player.points.rightLeg.dir == 'in') {
        this.player.points.rightLeg.offsetX -= 2;
        this.player.points.rightArm.offsetX += 2; 
      }
      else {
        this.player.points.rightLeg.offsetX += 2;
        this.player.points.rightArm.offsetX -= 2; 
      }
    }          
    
    if (this.player.points.leftLeg.offsetX > (this.playerWidth / 4)) {
      this.player.points.leftLeg.dir = 'out';
      this.player.points.rightLeg.dir = 'out'; 
    }
    
    if (this.player.points.leftLeg.offsetX <= 0) {
      this.player.points.leftLeg.dir = 'in';
      this.player.points.rightLeg.dir = 'in'; 
    }
    
    if (this.player.points.body.bottomOffsetY < 0 && (this.checkStayOnBoard())) {
      this.player.points.body.bottomOffsetY += 4;
      this.player.points.rightLeg.offsetY -= 4;
      this.player.points.leftLeg.offsetY -= 4; 
    }
  };
  
  this.setWorld = function(worldNumber) {
    switch (worldNumber) {
      case 0:
        var floorImg = new Image();
        floorImg.src = 'img/world1FloorBG.png';
        this.floorColor = this.canvas.createPattern(floorImg, 'repeat'); 
        this.bgPattern = '#b4f4ff';
        this.playerColor = '#000';
        this.deathColor = '#333';
        this.playerPattern = '#000';
        this.dragPattern = '#6bf265';
        this.jumpPattern = '#4d26f4';
        break;
      case 1:
        var floorImg = new Image();
        floorImg.src = 'img/world2FloorBG.png';
        this.floorColor = this.canvas.createPattern(floorImg, 'repeat'); 
        this.bgPattern = '#f14c50';
        this.playerColor = '#000';
        this.deathColor = '#ce740a';
        this.playerPattern = '#000';
        this.dragPattern = '#bbb';
        this.jumpPattern = '#bbc';
        break;
      case 2:
        this.bgPattern = '#fff';
        this.playerColor = '#fff';
        this.deathColor = '#bbb';
        this.floorColor = '#ccc';
        this.playerPattern = '#ddd';
        this.dragPattern = '#bbb';
        this.jumpPattern = '#bbc';
        break;    
    }
  }
 
  this.doStep = function() {
    this.update();
    this.calculate(); 
    this.draw();
    if (worlds.vars.levelProcessor.gameOver) {
     clearInterval(window.timer);  
    }
  };
  
  this.update = function() {
    if (keydown.left) { 
      if (this.checkStayOnBoard()) {
        this.player.x -= 5;
      }
      else {
        this.player.x -= 2;
      }
      this.player.points.head.dir = 'left';
    }
    
    if (keydown.right) { 
      if (this.checkStayOnBoard()) { 
        this.player.x += 5;
      }
      else {
        this.player.x += 2;
      }
      this.player.points.head.dir = 'right';
    }
    
    if (keydown.space) {
      if (this.player.jumpSpeed < 5) {
        this.player.jump = true;
      }
    } 
    
    if (keydown.z) {
      this.currentWorld = 0;
      this.setWorld(this.currentWorld);
    } 
    
    if (keydown.x) {
      this.currentWorld = 1;
      this.setWorld(this.currentWorld);
    }
    
    if (keydown.c) {
      if (this.levelObjects.worldCount > 2) {
        this.currentWorld = 2;
        this.setWorld(this.currentWorld);
      }
    }
    
    if (keydown.v) {
      if (this.levelObjects.worldCount > 3) {
        this.currentWorld = 3;
        this.setWorld(this.currentWorld);
      }
    } 
  };
  
  this.draw = function() {
    this.drawBackground();
    this.drawObjects();
  };
  
  this.drawBackground = function() {
    this.canvas.fillStyle = this.bgPattern; 
    this.canvas.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
  };
  
  this.drawObjects = function() {
     this.drawDeaths(); 
     this.drawFloors();
     this.drawDrags();
     this.drawJumps();
     this.drawExit(); 
     this.drawPlayer();
  };
  
  this.drawDrags = function() {
    if (this.levelObjects.world[this.currentWorld].drag == null) {
      return false;
    }
    this.canvas.fillStyle = this.dragPattern;
    for (var i = 0; i < this.levelObjects.world[this.currentWorld].drag.length; i++) {
      this.canvas.fillRect(this.levelObjects.world[this.currentWorld].drag[i].x1,  this.levelObjects.world[this.currentWorld].drag[i].y1,  this.levelObjects.world[this.currentWorld].drag[i].x2 -  this.levelObjects.world[this.currentWorld].drag[i].x1, this.dragHeight); 
    }  
  };
  
  this.drawJumps = function() {
    if (this.levelObjects.world[this.currentWorld].jump == null) {
      return false;
    }
    this.canvas.fillStyle = this.jumpPattern;
    for (var i = 0; i < this.levelObjects.world[this.currentWorld].jump.length; i++) {
      this.canvas.fillRect(this.levelObjects.world[this.currentWorld].jump[i].x1,  this.levelObjects.world[this.currentWorld].jump[i].y1,  this.levelObjects.world[this.currentWorld].jump[i].x2 -  this.levelObjects.world[this.currentWorld].jump[i].x1, this.jumpHeight); 
    }  
  };
  
  this.drawDeaths = function() {
    if (this.levelObjects.world[this.currentWorld].death == null) {
      return false;
    } 
    
    this.canvas.beginPath();
    
    this.canvas.fillStyle = this.deathColor; 
    for (var i = 0; i < this.levelObjects.world[this.currentWorld].death.length; i++) {
      var bladeWidth = 20;
      var bladeCount = Math.ceil((this.levelObjects.world[this.currentWorld].death[i].x2 - this.levelObjects.world[this.currentWorld].death[i].x1) / bladeWidth);
      this.canvas.moveTo(this.levelObjects.world[this.currentWorld].death[i].x1 + (bladeWidth * bladeCount), this.levelObjects.world[this.currentWorld].death[i].y2);
      this.canvas.lineTo(this.levelObjects.world[this.currentWorld].death[i].x1, this.levelObjects.world[this.currentWorld].death[i].y1);
      for (var j = 1; j <= bladeCount; j++) {
         this.canvas.lineTo(this.levelObjects.world[this.currentWorld].death[i].x1 + (j * bladeWidth - (bladeWidth / 2)), this.levelObjects.world[this.currentWorld].death[i].y1 - this.deathHeight);
         this.canvas.lineTo(this.levelObjects.world[this.currentWorld].death[i].x1 + (j * bladeWidth), this.levelObjects.world[this.currentWorld].death[i].y1);
      };                      
    }                       
    this.canvas.fill();
    this.canvas.closePath();                                      
  };
  
  this.drawFloors = function() {
    if (this.levelObjects.world[this.currentWorld].floor == null) {
      return false;
    }
    this.canvas.fillStyle = this.floorColor;
    for (var i = 0; i < this.levelObjects.world[this.currentWorld].floor.length; i++) {
      this.canvas.fillRect(this.levelObjects.world[this.currentWorld].floor[i].x1,  this.levelObjects.world[this.currentWorld].floor[i].y1,  this.levelObjects.world[this.currentWorld].floor[i].x2 -  this.levelObjects.world[this.currentWorld].floor[i].x1, this.floorHeight); 
    }
  };
  
  this.drawExit = function() { 
    this.canvas.fillStyle = this.exitPattern; 
    this.canvas.fillRect(this.levelObjects.exit.x - (this.exitWidth / 2), this.levelObjects.exit.y - this.exitHeight, this.exitWidth, this.exitHeight);  
    this.canvas.fillStyle = this.bgPattern;
    this.canvas.fillRect(this.levelObjects.exit.x - (2.5 * (this.exitWidth / 8)), this.levelObjects.exit.y - (7 * (this.exitHeight / 8)), (2 * (this.exitWidth / 8)), (1 * (this.exitHeight / 8)));
    this.canvas.fillRect(this.levelObjects.exit.x + (0.5 * (this.exitWidth / 8)), this.levelObjects.exit.y - (7 * (this.exitHeight / 8)), (2 * (this.exitWidth / 8)), (1 * (this.exitHeight / 8)));
    this.canvas.fillRect(this.levelObjects.exit.x - (2.5 * (this.exitWidth / 8)), this.levelObjects.exit.y - (5.5 * (this.exitHeight / 8)), (2 * (this.exitWidth / 8)), (1 * (this.exitHeight / 8)));
    this.canvas.fillRect(this.levelObjects.exit.x + (0.5 * (this.exitWidth / 8)), this.levelObjects.exit.y - (5.5 * (this.exitHeight / 8)), (2 * (this.exitWidth / 8)), (1 * (this.exitHeight / 8)));
     
  };
  
  this.drawPlayer = function() {    
    this.canvas.lineCap = 'round';
    this.canvas.fillStyle = this.playerPattern;
    this.canvas.strokeStyle = this.playerPattern;
    this.canvas.lineWidth = 3;
    
    this.canvas.beginPath(); 
    this.canvas.arc(this.player.points.head.x, this.player.points.head.y, this.player.points.head.radius, 0, (Math.PI * 2), false); //draw head    
    
    this.canvas.moveTo(this.player.points.head.x, this.player.points.head.y);             //draw body
    this.canvas.lineTo(this.player.points.body.bottomX, this.player.points.body.bottomY);
    
    this.canvas.moveTo(this.player.points.body.topX, this.player.points.body.topY);    //drawLeftArm
    this.canvas.lineTo(this.player.points.leftArm.x, this.player.points.leftArm.y);
    
    this.canvas.moveTo(this.player.points.body.topX, this.player.points.body.topY);    //drawRightArm
    this.canvas.lineTo(this.player.points.rightArm.x, this.player.points.rightArm.y);
    
    this.canvas.moveTo(this.player.points.body.bottomX, this.player.points.body.bottomY); //drawLeftLeg
    this.canvas.lineTo(this.player.points.leftLeg.x, this.player.points.leftLeg.y);
    
    this.canvas.moveTo(this.player.points.body.bottomX, this.player.points.body.bottomY); //drawRightLeg
    this.canvas.lineTo(this.player.points.rightLeg.x, this.player.points.rightLeg.y);
    
    this.canvas.stroke();
    this.canvas.fill();
    this.canvas.closePath();
    
    this.canvas.fillStyle = this.bgPattern;
    this.canvas.strokeStyle = this.bgPattern;
    this.canvas.beginPath();
    if (this.player.points.head.dir == 'left') {
      var eyeX = this.player.points.head.x - 3;
      var mouthX1 = this.player.points.head.x - 5;
      var mouthY = this.player.points.head.y + 6; 
      var mouthX2 = this.player.points.head.x - this.player.points.head.radius;
    }
    else {
      var eyeX = this.player.points.head.x + 3;
      var mouthX1 = this.player.points.head.x + 5;
      var mouthY = this.player.points.head.y + 6;
      var mouthX2 = this.player.points.head.x + this.player.points.head.radius;
    }
    this.canvas.arc(eyeX, this.player.points.head.y - 5, 3, 0, (Math.PI * 2), false); //draw eye
    this.canvas.moveTo(mouthX1, mouthY);
    this.canvas.lineTo(mouthX2, mouthY);
    this.canvas.fill();
    this.canvas.stroke();
    this.canvas.closePath();
  };
  
  this.calculate = function() { 
    this.checkWin(); 
    this.calcPlayerPoints();     
    this.updatePlayerPoints(); 
    this.updateDrags();
    this.checkWorldOut(); 
    this.checkPlayerInsideFloor();
    this.checkPlayerInsideDrag();
    this.checkDeathCrash();     
    this.dropSpeedCalc();
    this.checkJumpDrop();
    this.jumpCalc();
    this.checkPlayerInsideJump();
  };
  
  this.checkJumpDrop = function() {
    if (this.checkStayOnBoard()) {
      this.player.dropSpeed = 0;
      this.player.jumpSpeed = 0;
    }
    else {
      if (this.player.dropSpeed < 5) {
        this.player.dropSpeed = 5;
      }
    }  
  };
  
  this.updateDrags = function() {
    if (this.levelObjects.world[this.currentWorld].drag == null) {
      return false;
    }
    
    for (var i = 0; i < this.levelObjects.world[this.currentWorld].drag.length; i++) {
      if (this.levelObjects.world[this.currentWorld].drag[i].dirX == 'front') {
        if (this.levelObjects.world[this.currentWorld].drag[i].x1 <= this.levelObjects.world[this.currentWorld].drag[i].endX) {
          if (this.checkPlayerStayOnCurrentDrag(i)) {
            this.player.x += this.levelObjects.world[this.currentWorld].drag[i].speedX;
          } 
          this.levelObjects.world[this.currentWorld].drag[i].x1 += this.levelObjects.world[this.currentWorld].drag[i].speedX;
          this.levelObjects.world[this.currentWorld].drag[i].x2 += this.levelObjects.world[this.currentWorld].drag[i].speedX;    
        }
        else {
          this.levelObjects.world[this.currentWorld].drag[i].dirX = 'back';
        }
      }
      else {
        if (this.levelObjects.world[this.currentWorld].drag[i].x1 >= this.levelObjects.world[this.currentWorld].drag[i].startX) {
          if (this.checkPlayerStayOnCurrentDrag(i)) {
            this.player.x -= this.levelObjects.world[this.currentWorld].drag[i].speedX;
          }
          this.levelObjects.world[this.currentWorld].drag[i].x1 -= this.levelObjects.world[this.currentWorld].drag[i].speedX;
          this.levelObjects.world[this.currentWorld].drag[i].x2 -= this.levelObjects.world[this.currentWorld].drag[i].speedX;
        }
        else {
          this.levelObjects.world[this.currentWorld].drag[i].dirX = 'front';
        }
      }
      
      if (this.levelObjects.world[this.currentWorld].drag[i].dirY == 'front') {
        if (this.levelObjects.world[this.currentWorld].drag[i].y1 <= this.levelObjects.world[this.currentWorld].drag[i].endY) {
          if (this.checkPlayerStayOnCurrentDrag(i)) {
            this.player.y += this.levelObjects.world[this.currentWorld].drag[i].speedY;
          } 
          this.levelObjects.world[this.currentWorld].drag[i].y1 += this.levelObjects.world[this.currentWorld].drag[i].speedY;
          this.levelObjects.world[this.currentWorld].drag[i].y2 += this.levelObjects.world[this.currentWorld].drag[i].speedY;    
        }
        else {
          this.levelObjects.world[this.currentWorld].drag[i].dirY = 'back';
        }
      }
      else {
        if (this.levelObjects.world[this.currentWorld].drag[i].y1 >= this.levelObjects.world[this.currentWorld].drag[i].startY) {
          if (this.checkPlayerStayOnCurrentDrag(i)) {
            this.player.y -= this.levelObjects.world[this.currentWorld].drag[i].speedY;
          }
          this.levelObjects.world[this.currentWorld].drag[i].y1 -= this.levelObjects.world[this.currentWorld].drag[i].speedY;
          this.levelObjects.world[this.currentWorld].drag[i].y2 -= this.levelObjects.world[this.currentWorld].drag[i].speedY;
        }
        else {
          this.levelObjects.world[this.currentWorld].drag[i].dirY = 'front';
        }
      }
      
    }
  };
  
  //graviti effect for drop
  this.dropSpeedCalc = function() {
    //check if player dpopping 
    if (this.player.dropSpeed > 0) {
      this.player.y += this.player.dropSpeed;
      this.player.dropSpeed += 0.1;
    }  
  };
  
  //check if player go out of world
  this.checkWorldOut = function() {
    if (this.player.y > this.canvasHeight) {
      this.player.y = this.canvasHeight;
      this.player.dropSpeed = 0;
    }
    
    if (this.player.x + (this.playerWidth / 2) > this.canvasWidth) {
      this.player.x = this.canvasWidth - (this.playerWidth / 2);
    }
    
    if (this.player.x - (this.playerWidth / 2) < 0) {
      this.player.x = this.playerWidth / 2;
    }
  }
  
  this.checkDeathCrash = function() {
    // check if player drop on death then end game
    if (this.levelObjects.world[this.currentWorld].death == null) {
      return false;
    } 
    for (var i = 0; i < this.levelObjects.world[this.currentWorld].death.length; i++) {
      if (
        (this.player.x + (this.playerWidth / 2) >= this.levelObjects.world[this.currentWorld].death[i].x1) &&
        (this.player.x - (this.playerWidth / 2) <= this.levelObjects.world[this.currentWorld].death[i].x2) &&
        (this.player.y >= this.levelObjects.world[this.currentWorld].death[i].y1 - this.deathHeight) &&
        (this.player.y <= this.levelObjects.world[this.currentWorld].death[i].y2)  
        ) {
        clearInterval(window.timer); 
      }
    }  
  };
  
  this.checkStayOnFloor = function() {
    
    if (this.player.y == this.canvasHeight) {
      return true;
    }
    
    if (this.levelObjects.world[this.currentWorld].floor == null) {
      return false;
    }
    //check if player stay on platform
    for (var i = 0; i < this.levelObjects.world[this.currentWorld].floor.length; i++) {
      if (
        (this.player.x + (this.playerWidth / 4) >= this.levelObjects.world[this.currentWorld].floor[i].x1) &&
        (this.player.x - (this.playerWidth / 4) <= this.levelObjects.world[this.currentWorld].floor[i].x2) &&
        (this.player.y == this.levelObjects.world[this.currentWorld].floor[i].y1)
        ) {
        return true;
      }    
    }
    return false;    
  };
  
  this.checkStayOnDrag = function() {
    if (this.levelObjects.world[this.currentWorld].drag == null) {
      return false;
    }
    
    for (var i = 0; i < this.levelObjects.world[this.currentWorld].drag.length; i++) {
      if (
        (this.player.x + (this.playerWidth / 4) >= this.levelObjects.world[this.currentWorld].drag[i].x1) &&
        (this.player.x - (this.playerWidth / 4) <= this.levelObjects.world[this.currentWorld].drag[i].x2) &&
        (this.player.y == this.levelObjects.world[this.currentWorld].drag[i].y1)
        ) {
        return true;
      }    
    }
    return false;
  };
  
  this.checkPlayerStayOnCurrentDrag = function(index) {
    if (
        (this.player.x + (this.playerWidth / 4) >= this.levelObjects.world[this.currentWorld].drag[index].x1) &&
        (this.player.x - (this.playerWidth / 4) <= this.levelObjects.world[this.currentWorld].drag[index].x2) &&
        (this.player.y == this.levelObjects.world[this.currentWorld].drag[index].y1)
        ) {
        return true;
      }
    else {
      return false;
    }  
  };
  
  this.checkStayOnBoard = function() {
    if (this.checkStayOnFloor() || this.checkStayOnDrag()) {
      return true;
    }  
    else {
      return false;
    }
  }
  
  //Jump calculating
  this.jumpCalc = function() {
    //check if jump avalible
    if (this.player.jump == true && (this.checkStayOnBoard())) {
      this.player.jumpSpeed = 12.6;
      this.player.jump = false;
      this.player.points.body.bottomOffsetY = -8;
      this.player.points.rightLeg.offsetY = +8;
      this.player.points.leftLeg.offsetY = +8; 
    }
    
    if (this.player.jumpSpeed > 5) {
      this.player.y -= this.player.jumpSpeed;
      this.player.jumpSpeed -= 0.2;  
    }
    
    if (this.player.jumpSpeed < 5 ) {
      this.player.jumpSpeed = 0;
    }
  };
  
  // if user stay on door
  this.checkWin = function() {
    var deltaX = Math.abs(this.player.x - this.levelObjects.exit.x);
    if (deltaX < 15 && this.player.y == this.levelObjects.exit.y) {
      clearInterval(window.timer);
      this.updateLevel();
    }  
  };
  
  this.checkPlayerInsideFloor = function() {
    // check if player drop on death then end game
    if (this.levelObjects.world[this.currentWorld].floor == null) {
      return false;
    } 
    if (this.player.jumpSpeed > this.player.dropSpeed) {
      return false;
    }
    for (var i = 0; i < this.levelObjects.world[this.currentWorld].floor.length; i++) {
      if (
        (this.player.x + (this.playerWidth / 4) >= this.levelObjects.world[this.currentWorld].floor[i].x1) &&
        (this.player.x - (this.playerWidth / 4) <= this.levelObjects.world[this.currentWorld].floor[i].x2) &&
        (this.player.y >= this.levelObjects.world[this.currentWorld].floor[i].y1) &&
        (this.player.y <= this.levelObjects.world[this.currentWorld].floor[i].y2 + this.floorHeight)  
        ) {
        this.player.y = this.levelObjects.world[this.currentWorld].floor[i].y1;
        this.player.jumpSpeed = 0;
        this.player.dropSpeed = 0; 
      }
    }    
  };
  
  this.checkPlayerInsideJump = function() {
    if (this.levelObjects.world[this.currentWorld].jump == null) {
      return false;
    }
    if (this.player.jumpSpeed > this.player.dropSpeed) {
      return false;
    }  
    for (var i = 0; i < this.levelObjects.world[this.currentWorld].jump.length; i++) {
      if (
        (this.player.x + (this.playerWidth / 4) >= this.levelObjects.world[this.currentWorld].jump[i].x1) &&
        (this.player.x - (this.playerWidth / 4) <= this.levelObjects.world[this.currentWorld].jump[i].x2) &&
        (this.player.y >= this.levelObjects.world[this.currentWorld].jump[i].y1) &&
        (this.player.y <= this.levelObjects.world[this.currentWorld].jump[i].y2 + this.jumpHeight)  
        ) {
        this.player.y = this.levelObjects.world[this.currentWorld].jump[i].y1;
        this.player.jumpSpeed = this.levelObjects.world[this.currentWorld].jump[i].jump;
        this.player.dropSpeed = 5; 
      }
    }
  };
  
  this.checkPlayerInsideDrag = function() {
    if (this.levelObjects.world[this.currentWorld].drag == null) {
      return false;
    }
    if (this.player.jumpSpeed > this.player.dropSpeed) {
      return false;
    } 
    
    for (var i = 0; i < this.levelObjects.world[this.currentWorld].drag.length; i++) {
      if (
        (this.player.x + (this.playerWidth / 4) >= this.levelObjects.world[this.currentWorld].drag[i].x1) &&
        (this.player.x - (this.playerWidth / 4) <= this.levelObjects.world[this.currentWorld].drag[i].x2) &&
        (this.player.y >= this.levelObjects.world[this.currentWorld].drag[i].y1) &&
        (this.player.y <= this.levelObjects.world[this.currentWorld].drag[i].y2 + this.dragHeight)  
        ) {
        this.player.y = this.levelObjects.world[this.currentWorld].drag[i].y1;
        this.player.jumpSpeed = 0;
        this.player.dropSpeed = 0; 
      }
    }      
  };
  
  this.updateLevel = function() {
    var nexLevel = this.level + 1;
    jQuery.ajax({
       type: "POST",
       url: "php/updateLevel.php?userID=" + this.userID + '&level=' + nexLevel + '&secret=' + worlds.settings.secret,
       success : function(data){
         if (worlds.vars.levelProcessor.level < 30) {
           worlds.initLevel(worlds.vars.levelProcessor.level + 1);   
         }
         else {
           // Show titles
         }
       },
    });   
  };
}