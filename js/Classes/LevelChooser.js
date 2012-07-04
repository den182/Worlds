function LevelChooser (userID, canvas, levelCount, jCanvas) { 
  
  this.userID = userID;
  
  this.canvas = canvas;
  
  this.levelCount = levelCount;
  
  this.jCanvas = jCanvas;
  
  this.canvasWidth = canvas.canvas.clientWidth;
  
  this.canvasHeight = canvas.canvas.clientHeight;
  
  this.buttonRowCount = 5;
  
  this.fontSize = Math.floor((this.canvasWidth / 825) * 28);
  
  this.buttons = new Array(this.levelCount);
  
  this.spaceWidth = ((20 * this.canvasWidth) / 100) / (this.buttonRowCount + 1);
  
  this.buttonWidth = ((80 * this.canvasWidth) / 100) / this.buttonRowCount;    
  
  this.spaceHeight = ((20 * this.canvasHeight) / 100) / (Math.ceil(this.levelCount / this.buttonRowCount) + 1);  
  
  this.buttonHeight = ((80 * this.canvasHeight) / 100) / Math.ceil(this.levelCount / this.buttonRowCount);
      
  this.init = function() {
    this.getUserLevels(); 
  };
  
  this.getUserLevels = function() {
    var level;
    jQuery.ajax({
       type: "POST",
       context : this,
       async : false,
       url: "php/getLevel.php?userID=" + this.userID,
       success : function(data){
         this.userLevels = data;
         this.createButtons();
         this.draw();
       },
    }); 
  };
  
  this.draw = function() {
    this.drawBackground();
    this.drawButtons();
  };
  
  this.drawBackground = function() {
    this.canvas.fillStyle = '#eee';
    this.canvas.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.canvas.fillStyle = '#fafafa';
    this.canvas.font = 'bold 100pt Arial';
    this.canvas.fillText('Choose level', 5, 450);
  };
  
  this.drawButtons = function() {
    var counter = 0;
    for (var i = 1; i <= Math.ceil(this.levelCount / this.buttonRowCount); i++) {
      for (var j = 1; j <= this.buttonRowCount; j++) {
        if (this.levelCount >= counter) {
          this.drawButton(i, j, counter);
        }
        counter++;
      }
    }
  };
  
  this.drawButton = function(i, j, counter) {
    this.canvas.strokeStyle = '#ddd';
    this.canvas.strokeRect(this.buttons[counter].x1, this.buttons[counter].y1, this.buttonWidth, this.buttonHeight);
    if (counter <= this.userLevels - 1) {
      this.canvas.fillStyle = '#fefefe'; 
    }
    else {
      this.canvas.fillStyle = '#dedede';
    }       
    this.canvas.font = "italic " + this.fontSize + "pt Arial";
    this.canvas.textBaseline = "center";
    this.canvas.textAlign = "center";
    this.canvas.textBaseline = "bottom";
    var textX = (this.buttons[counter].x1 + this.buttonWidth / 2);
    var textY = (this.buttons[counter].y1 + this.buttonHeight / 2) + this.spaceHeight;
    this.canvas.fillText(counter + 1, textX, textY);
  }
  
  this.createButtons = function() {
    var counter = 0;  
    for (var i = 1; i <= Math.ceil(this.levelCount / this.buttonRowCount); i++) {
      for (var j = 1; j <= this.buttonRowCount; j++) {
        var x = (this.spaceWidth * j) + (this.buttonWidth * (j - 1));
        var y = (this.spaceHeight * i) + (this.buttonHeight * (i - 1));
        this.buttons[counter] = {
          x1 : x,
          y1 : y,
          x2 : x + this.buttonWidth,
          y2 : y + this.buttonHeight,
        };
        counter++; 
      }
    }
  };
  
  this.checkChoose = function(x, y) {
    for (var i = 0; i < this.buttons.length; i++) {
      if ((x >= this.buttons[i].x1) && (y >= this.buttons[i].y1) && (x <= this.buttons[i].x2) && (y <= this.buttons[i].y2)) {
        if (i <= this.userLevels - 1) {
          return i + 1;
        }  
        else {
          return 0;
        }
      }
    }        
    return 0;
  };
}