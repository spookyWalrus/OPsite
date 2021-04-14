<script type="text/javascript" src="js/footerJS.js"></script>

<?php
if(!isset($_SESSION)) 
	{ 
		session_start(); 
	}; 

$errors ='';
// $errMsg = '';
// echo $errMsg;

if ($_SERVER['REQUEST_METHOD'] == 'POST'){
	list($errors) = validate_form(); // check for blank input fields
	if ($errors) { // If validate_form() returns errors,
		show_errors($errors);			// show error messages			

	}	else { 
	// if there are no blank input fields, check input with database
		checkDB();
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
	// print_r($errors);

	// echo $errors[0]; // used to check if login works properly

// this function is defined in index.php...
	echo '<script type="text/javascript" > errMsg(); </script>';

}


function validate_form(){
		// $errors = array();
		$userCu = trim($_POST['user_name'] ?? ''); 
		$userPw = trim($_POST['user_pw'] ?? '');

		if (strlen($userCu) == 0){
			$errors[] = "Please enter name";
			show_errors($errors);
			return $errors;
		} else if (strlen($userPw) == 0) {
			$errors[] = "Please enter password";
			show_errors($errors);
			return $errors;
		} 
}
	

function checkDB(){
		$userCu = htmlentities($_POST['user_name']); 
		$userPw = htmlentities($_POST['user_pw']);

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
		$stmt->execute([$userCu]);  // substitute in user input name here

		// // SQL query compares DB name and input name...
		// //Retrieve the rows using fetchAll.
		$credentials = $stmt->fetchAll(PDO::FETCH_ASSOC);

		// if SQL query succesful, check results 
		if ($stmt){
			if (empty($credentials)){ // is returned array empty? ie, query has a match?
				$errors[] = "name not in DB"; // if empty, then show error
			// echo $errors;	
				show_errors($errors);
				return $errors;

			} else { // if query has a match, then set variable value
				$returnedName = $credentials[0]['user_name'];

			}
		// } else {	
		// 	$errors[] = "name not in DB"; // if empty, then show error
		// 	return $errors;

		}

		// on succesful name match, check password
		if ($returnedName == $userCu) { 
			$sql = "SELECT user_password FROM staff_list WHERE user_name = ? ";
			$stmt2 = $db->prepare($sql);
			$stmt2->execute([$userCu]);

			$credentialsPw = $stmt2->fetchAll(PDO::FETCH_ASSOC);
			
			// check if password matches
			if ($stmt2){ // on succesful SQL query...
				// if yes, set pw to variable
				$returnedPw = ($credentialsPw[0]['user_password']); 
				// compare passwords
				if (password_verify($userPw, $returnedPw)){
		
					process_form();  // if matched, load to new page

				} else { // if not, throw error
					$errors[] = "Password does not match";

					show_errors($errors);
					return $errors;
				}
			// }
			// } else { // if no, throw error
			// 	$errors[] = "password no exist";
			// 	echo $errors;
			// 	show_errors($errors);
			// 	return $errors;
			// }

			// // compare input password with database password
			// if (password_verify($userPw, $returnedPw)){
		
			// 	process_form();   

			// } else {
			// 	$errors[] = "Password does not match";

			// 	show_errors($errors);
			// 	return $errors;
			// }

			// } else {
			// $errors = "Password doesn't exist in db";

			// show_errors($errors);
			// return $errors;
			}
		}

	} 
	catch (PDOException $e) {
	    echo 'Connection failed: ' . $e->getMessage();
	    exit();
	}
	// $errors[] = "You fail";
}	






?>	
