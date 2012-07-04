<?php 
define('LEVEL_COUNT', 30);

@$userID = $_REQUEST['userID'];

require_once('Classes/IniFile.php');
$path = '../users.ini';
$users = parse_ini_file($path);

if (is_numeric($userID)) {
  if (!isset($users[$userID])) {  
    $users[$userID] = 1;
    write_ini_file($path, $users);
  }
}

print $users[$userID];
