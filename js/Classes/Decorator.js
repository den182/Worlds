function Decorator(canvas) {
  
  this.canvas = canvas;
  
  this.init = function() {
    this.drawWelcomeScreen();
  };
  
  this.drawWelcomeScreen = function() {
    this.canvas.fillStyle = '#ccc';
    this.canvas.fillRect(0, 0, 825, 825);
  };
}