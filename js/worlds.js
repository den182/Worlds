jQuery(window).load(function(){
  WELCOME_STATE = 0;
  CHOOSE_STATE = 1;
  PLAY_STATE = 2;
  
  worlds = {
    vars : {},
    settings : {},
    init : function(settings) {
      this.settings = settings;
      this.vars.gameState = WELCOME_STATE;
      this.vars.canvasWidth = this.settings.canvas.canvas.clientWidth;
      this.vars.canvasHeight = this.settings.canvas.canvas.clientHeight;
      this.vars.Decorator = new Decorator(this.settings.canvas);
      this.vars.Decorator.init();
      this.eventHandler();
    },
    initLevel : function(level) {
      //TODO load level
      // init vars
      // start game    
      this.vars.levelProcessor = new LevelProcessor(this.settings.userID, this.settings.canvas, level);
      this.vars.levelProcessor.init(); 
      window.timer = setInterval(function(){worlds.gameLoop(worlds)}, 1000 / 60);
    },
    eventHandler : function() {
      var $this = this;
      this.settings.jCanvas.click(function(e){ 
        var x = e.pageX - this.offsetLeft;
        var y = e.pageY - this.offsetTop;   
        if ($this.vars.gameState == CHOOSE_STATE) {
          var level = $this.vars.levelChooser.checkChoose(x, y);
          if (level > 0) {
            $this.vars.gameState = PLAY_STATE;
            $this.initLevel(level);
          }
        }
        if ($this.vars.gameState == WELCOME_STATE) {
          $this.vars.gameState = CHOOSE_STATE;
          $this.vars.levelChooser = new LevelChooser($this.settings.userID, $this.settings.canvas, $this.settings.levelCount, $this.settings.jCanvas);
          $this.vars.levelChooser.init();
        }
      });
    },
    gameLoop : function($this) {
      $this.vars.levelProcessor.doStep();
    },
  };
  
  /*
  parts=String(document.location).split("?",2)[1].split("&");
  GET={};
  for (i=0; i<parts.length; i++) {
     curr = parts[i].split('=');
     GET[curr[0]] = curr[1];
  } 
  */ 
   
  worlds.init(settings = {
    canvas : document.getElementById("gameCanv").getContext("2d"),
    jCanvas : jQuery('#gameCanv'),
    levelCount : 30, 
    userID : 52 // GET['viewer_id'],
    //secret : GET['secret'],  
  });    
});