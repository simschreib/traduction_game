<?php 

  include 'config.php';

  $res = $pdo->query('SELECT * FROM words ORDER BY Rand() ASC LIMIT 1');
  print (json_encode($res->fetch(PDO::FETCH_ASSOC))) ;