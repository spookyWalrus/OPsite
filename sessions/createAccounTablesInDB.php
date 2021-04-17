<?php
try{
	// establish connectino to your db
	// $db = new PDO("mysql:host=localhost;dbname=conUdb",'root','');
	$db = new PDO('mysql:host=sql203.epizy.com;dbname=epiz_28394007_conUdb', 'epiz_28394007', 'gGvzSUWdFQMVez');
	$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

	// make new table
	$newTable = "CREATE TABLE account_sessions
				(session_id VARCHAR(255) NOT NULL,
				account_id INT(10) UNSIGNED NOT NULL,
				login_time timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
				)
				DEFAULT CHARSET = utf8 ";
	// add primary key
	// $addPrimKey = "ALTER TABLE account_sessions
					// ADD PRIMARY KEY (sesssion_id);"

	$db->exec($newTable);
	echo "new Table created";

	// $db->exec($addPrimKey);
	// echo "added primary key";
} catch (PDOException $e) {
	print "Can't connect: " .$e->getMessage();
	exit();
}


?>