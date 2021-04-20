<?php
// if (session_status() == PHP_SESSION_NONE){
// // if(!isset($_SESSION)){
    
//         session_start(); 
//     }; 
if(!isset($_SESSION)){
		session_start(); 
}; 
?>
<script type="text/javascript">console.log("logged name is: ");
console.log( <?php echo $_SESSION['logged_user'] ?> );
</script>
<?php
// AJAX call to set name from HomePage
if (isset($_POST['sessName'])){
	// $sessName = $_POST['sessName'];
	// if ($sessName == 'goDo'){
		?><script type="text/javascript">alert( "sessName received from footerJS");
		<?php
		// $_SESSION['logged_user'] = htmlentities($_POST['user_name']); // user-icon name set here
		if (isset($_SESSION['logged_user'])){
			$userName = $_SESSION['logged_user'];
			// echo "Session data exists<br>";

			echo $userName; // Where doees this go? Where do you see this?

		}
		// print_r($_SESSION); // when homePage loads, this is to check array
		// echo "sessName";

		else {
			echo "didn't receive sessName from footerJS";
		$noSession = "No session data<br>";
		echo $noSession;
		print_r($_SESSION);
		}
	// }
}
echo "checkSession loaded";
?>