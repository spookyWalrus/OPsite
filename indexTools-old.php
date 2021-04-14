<script type="text/javascript" src="js/footerJS.js"></script>

<?php
if(!isset($_SESSION)) 
	{ 
		session_start(); 
	}; 

$errors = '';
$errMsg = '';
// echo $errMsg;


if ($_SERVER['REQUEST_METHOD'] == 'POST'){
	list($errors) = validate_form(); // check for blank input fields
	if ($errors) { // If validate_form() returns errors,
		show_errors($errors);			// show error messages			

	}	else { 
	// if there are no blank input fields, check input with database
		checkDB();
		// process_form(); 
	}
}	
	


//  on succesful login, this function is called to redirect page
function process_form(){

	 	$_SESSION['logged_user'] = htmlentities($_POST['user_name']); // user-icon name set here

	 	if (isset($_SESSION['logged_user'])){
		 	session_regenerate_id(true);
			header("Location: /OPsite/now/homePage.php");
			exit();
		}	else {
			echo "Session wasn't set so not redirecting";
			exit();
		}	
		
} 

function show_errors($errors){
// this function is defined in index.php...
	echo '<script type="text/javascript" > errMsg(); </script>';
	// echo $errors;
	echo $errors[0];
	// $errMsg = "Login unsuccessful. Please re-enter credentials."; 	
	// echo $errMsg;
	// echo $errMsg;


// <script type="text/javascript" src="js/footerJS.js"> alert("earrr"); </script>

}


function validate_form(){
		$errors = array();
		$userCu = trim($_POST['user_name'] ?? ''); 
		$userPw = trim($_POST['user_pw'] ?? '');

		if (strlen($userCu) == 0){
			$errors[] = "Please enter name";
				return $errors;
		} else if (strlen($userPw) == 0) {
			$errors[] = "Please enter password";
				return $errors;
		} 
}
	

function checkDB(){
		$userCu = $_POST['user_name']; 
		$userPw = $_POST['user_pw'];

	try {
	 	// Connect to our MySQL database using the PDO extension.
		$db = new PDO('mysql:host=localhost;dbname=conUdb', 'root', '');
	    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	    $db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);
		
		//Our select statement. This will retrieve the data that we want.
		$sql = "SELECT user_name FROM staff_list WHERE user_name = ? ";
		// //Prepare the select statement.
		$stmt = $db->prepare($sql);
		// //Execute the statement.
		$stmt->execute([$userCu]);  // substitute in user input here
		// //Retrieve the rows using fetchAll.
		$credentials = $stmt->fetchAll(PDO::FETCH_ASSOC);

		// if SQL query succesful, check name 
		if ($stmt){
			if (empty($credentials)){ // is returned array empty?
				$errors = "name not in DB"; // if empty, then show error
			// echo $errors;
			show_errors($errors);
			return $errors;

			} else { // if array filled, then set variable value
				$returnedName = $credentials[0]['user_name'];

			}
		}

		// if name exists in db, compare given name with database name
		if ($returnedName == $userCu) { // if it's a match, compare password
			$sql = "SELECT user_password FROM staff_list WHERE user_name = ? ";
			$stmt2 = $db->prepare($sql);
			$stmt2->execute([$userCu]);

			$credentialsPw = $stmt2->fetchAll(PDO::FETCH_ASSOC);
			
			// check if password exists
			if ($stmt2){ // 
				// if yes, set pw to a variable
				$returnedPw = ($credentialsPw[0]['user_password']); 
			} else { // if no, throw error
				$errors = "password no exist";
				echo $errors;
				show_errors($errors);
				return $errors;
			}

			// compare input password with hashed database password
			if (password_verify($userPw, $returnedPw)){
				// echo "it's a hash party<br>";
				// print $returnedPw;
				// call function, go to homepage.php...
				process_form();   

			} else {
				$errors[] = "Password does not match";
				// echo "Password does not match";

				show_errors($errors);
				return $errors;
			}

		} else {
			$errors = "Name and password doesn't match.";
			// echo $errors;
			show_errors($errors);
			return $errors;
		}

	} 
	catch (PDOException $e) {
	    echo 'Connection failed: ' . $e->getMessage();
	    exit();
	}
}	






?>	
