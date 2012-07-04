<?php 
define('LEVEL_COUNT', 30);

@$userID = $_REQUEST['userID'];
@$level = $_REQUEST['level'];
@$secret = $_REQUEST['secret'];

if (@strpos($_SERVER['HTTP_REFERER'], 'api_url=http://api.vk.com/api') && @strpos($_SERVER['HTTP_REFERER'], $secret)) {

  require_once('Classes/IniFile.php');
  $path = '../users.ini';
  $users = parse_ini_file($path);

  if (is_numeric($userID)) {
    if (isset($users[$userID])) {
      if ($users[$userID] + 1 <= LEVEL_COUNT && $users[$userID] + 1 == $level) {
        $users[$userID]++;
      }
    }
    else {
      $users[$userID] = 1;
    }
  }

  write_ini_file($path, $users);

  print "done";

}
else {
  print "Don't try hack me !!!";
}

