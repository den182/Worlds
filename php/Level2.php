<?php
$canvasHeight = 825;
$canvasWidth = 825;

//????? ????????
$floor = NULL;
$death = NULL;  
$drag = NULL;
$jump = NULL;

//???? ??? ???? 1
$floor[] = array('x1' => 700, 'y1' => 200, 'x2' => 800, 'y2' => 200);

// ???? ??? ???? 1
//$death[] = array('x1' => 0, 'y1' => $canvasHeight, 'x2' => $canvasWidth, 'y2' => $canvasHeight);

//?????????? ????????? ??? ???? 1   
$drag[] = array('x1' => 100, 'y1' => 700, 'x2' => 200, 'y2' => 700, 'startX' => 0, 'startY' =>700, 'endX' => 725, 'endY' => 700, 'speedX' => 2, 'speedY' => 0, 'dirX' => 'front', 'dirY' => 'front');
$drag[] = array('x1' => 100, 'y1' => 300, 'x2' => 200, 'y2' => 300, 'startX' => 0, 'startY' =>300, 'endX' => 725, 'endY' => 300, 'speedX' => 1, 'speedY' => 0, 'dirX' => 'front', 'dirY' => 'front');
$drag[] = array('x1' => 100, 'y1' => 100, 'x2' => 200, 'y2' => 100, 'startX' => 0, 'startY' =>100, 'endX' => 725, 'endY' => 100, 'speedX' => 3, 'speedY' => 0, 'dirX' => 'front', 'dirY' => 'front');

$jump[] = array('x1' => 0, 'y1' => 800, 'x2' => 200, 'y2' => 800, 'jump' => 30);

//?????? ??? ???? 1

//$jump[] = array('x1' => 200, 'y1' => 700, 'x2' => 400, 'y2' => 700, 'jump' => 30);

// ????????????? ???? 1
$world1['floor'] = $floor;
$world1['death'] = $death;
$world1['drag'] = $drag;       
$world1['jump'] = $jump;
$objects['world'][] = $world1;

//????? ????????
$floor = NULL;
$death = NULL;  
$drag = NULL;
$jump = NULL;


//???? ??? ???? 2
$floor[] = array('x1' => 700, 'y1' => 200, 'x2' => 800, 'y2' => 200);

// ???? ??? ???? 2
//$death[] = array('x1' => 0, 'y1' => $canvasHeight, 'x2' => $canvasWidth, 'y2' => $canvasHeight);

$drag[] = array('x1' => 100, 'y1' => 400, 'x2' => 200, 'y2' => 400, 'startX' => 0, 'startY' =>400, 'endX' => 725, 'endY' => 400, 'speedX' => 4, 'speedY' => 0, 'dirX' => 'front', 'dirY' => 'front');
$drag[] = array('x1' => 100, 'y1' => 600, 'x2' => 200, 'y2' => 600, 'startX' => 0, 'startY' =>600, 'endX' => 725, 'endY' => 600, 'speedX' => 2, 'speedY' => 0, 'dirX' => 'front', 'dirY' => 'front');



// ????????????? ???? 2
$world2['floor'] = $floor;
$world2['death'] = $death;
$world2['drag'] = $drag;       
$world2['jump'] = $jump;
$objects['world'][] = $world2;


//????? ????????
$floor = NULL;
$death = NULL;  
$drag = NULL;
$jump = NULL;


//???? ??? ???? 3
$floor[] = array('x1' => 700, 'y1' => 200, 'x2' => 800, 'y2' => 200);

// ???? ??? ???? 2
//$death[] = array('x1' => 0, 'y1' => $canvasHeight, 'x2' => $canvasWidth, 'y2' => $canvasHeight);

$drag[] = array('x1' => 100, 'y1' => 200, 'x2' => 200, 'y2' => 200, 'startX' => 0, 'startY' =>200, 'endX' => 725, 'endY' => 200, 'speedX' => 2, 'speedY' => 0, 'dirX' => 'front', 'dirY' => 'front');
$drag[] = array('x1' => 100, 'y1' => 500, 'x2' => 200, 'y2' => 500, 'startX' => 0, 'startY' =>500, 'endX' => 725, 'endY' => 500, 'speedX' => 4, 'speedY' => 0, 'dirX' => 'front', 'dirY' => 'front'); 

// ????????????? ???? 3
$world3['floor'] = $floor;
$world3['death'] = $death;
$world3['drag'] = $drag;       
$world3['jump'] = $jump;
$objects['world'][] = $world3;

//????? ????????
$floor = NULL;
$death = NULL;  
$drag = NULL;
$jump = NULL;


//????????????? ????? ?????????, ??????????? ????? ? ??????
$objects['worldCount'] = 3;
$objects['startPoint'] = array('x' => 100, 'y' => 825);
$objects['exit'] = array('x' => 750, 'y' => 200);
print json_encode($objects);