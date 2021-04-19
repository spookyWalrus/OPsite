<?php
if (session_status() === PHP_SESSION_NONE){
// if(!isset($_SESSION)){
    
        session_start(); 
    }; 

// AJAX call to set name from HomePage
if (isset($_POST['user_name'])){
	
	// $_SESSION['logged_user'] = htmlentities($_POST['user_name']); // user-icon name set here
	if (isset($_SESSION['logged_user'])){
		$userName = $_SESSION['logged_user'];
		// echo "Session data exists<br>";

		echo $userName;

	}
	// print_r($_SESSION); // when homePage loads, this is to check array
	// echo "sessName";

	else {
	$noSession = "No session data<br>";
	echo $noSession;
	print_r($_SESSION);
	}
}

echo "checkSession.php page loaded";
?>