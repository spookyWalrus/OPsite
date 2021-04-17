<?php


// $host = 'localhost';
$host = 'sql203.epizy.com';
// $schema = 'conudb';
$schema = 'epiz_28394007_conUdb';
// $user = 'root';
$user = 'epiz_28394007';
// $pw = '';
$pw = 'gGvzSUWdFQMVez';

$dsn = 'mysql:host='.$host.';dbname='.$schema;

try{
	// $pdo = new PDO('mysql:host=localhost;dbname=conUdb', 'root', '');
	$pdo = new PDO($dsn,$user,$pw);
	$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);
} catch (PDOException $e) {
		print "Error: " . $e->getMessage();
				exit();
}

?>