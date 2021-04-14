 <?php 
// if starting from scratch and DB doesn't exist, 
//load OPDBFC-dbSetup.php to initialize and set up your db schema
 // and all your tables 


// =================  establish DB connection (assuming DB + table are already established)

// try {
// 	$db = new PDO("mysql:host=localhost;dbname=conUdb", 'root','');
// 	$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
// 	$db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);


// 	} catch (PDOException $e) {
// 		print "Couldn't connect: " . $e->getMessage();
// 			exit();
// }

// $errors;

 
// // ==================================   main argument for requests
// if ($_SERVER['REQUEST_METHOD'] == 'POST'){
// 	 list($errors) = validate_form(); 
// 		if ($errors) { //echo errors if there are any
			
// 			// $info = array('error1' => $errors);
// 			// echo json_encode($info);
			
// 			echo $errors; // this value is sent back to AJAX function


// 		}	else {	// if no errors, process and enter data		
// 			process_form();
// 		};
// }



// function validate_form(){
// 	global $errors;
// 	$errors = array();
// 	$name = $_POST['userPhp_name'];

// 		// $name = trim($input ?? ''); // strip any spaces
// 		if (strlen($name) == 1) { // check if name entered or not
// 				$errors[] = "You're back baby";
// 					return $errors;

// 		} else if (strlen($name) == 2){
// 			$errors[] = "Ass";
// 				return $errors;

// 		} 		


	// 	$numb = trim($_POST['user_phone'] ?? '-');// strip anything non-number
	// 	$number = trim($numb ?? '(' );
	// 	$numnumber = trim($number ?? ')' )
	// 	if (! is_numeric($numnumber){ // check if numbers exist
	// 		$errors[0] = '*enter phone number';
	// 	}


	// 	$adminYN = $_POST['user_adminYN'];

	// $input['is_spicy'] = $_POST['is_spicy'] ?? '';
	// if (! array_key_exists($input['is_spicy'], $GLOBALS['spicy_choices'])) {
	// 	$errors[]= 'Please chood valid spicy option.';
	// }

// }

function show_formErrors($errors){

	$message = $errors;

	echo $message;
	

	// =====================  make ajax call to show errors and highlight where error is

};



if (isset($_POST['createNu'])){
// function process_form() {
	
	$name = $_POST['userPhp_name'];
	$password = password_hash($_POST['userPhp_pw'], PASSWORD_DEFAULT);
	$adminAccess = $_POST['adminPhp_access'];
	
	global $db;
// Table to connect to: show_reports
	try {
		$db = new PDO("mysql:host=localhost;dbname=conUdb", 'root','');
		$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		$db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);

		$sql = $db->prepare('INSERT INTO staff_list (user_name, user_password, user_admin_access)
							 VALUES(?,?,?)');
		// $do = $db->prepare($sql);
		$sql->execute(array($name,$password,$adminAccess));

		if ($sql){
			$success = "Account creation successful!";

			echo $success;
		}
	
	} catch (PDOExcetion $e){
		$errors =  "Something went wrong with entering data to the database.";
		echo $errors;
	}

	

}



	// $addDATA = "INSERT INTO staff_list 
	// 				(user_name VARCHAR(255),
	// 				user_address VARCHAR(255),
	// 				user_phone VARCHAR(255),
	// 				user_email VARCHAR(255),
	// 				user_idnum VARCHAR(255),
	// 				user_password VARCHAR(255),
	// 				user_admin_access VARCHAR(255) ) VALUES
					// (
					// 	)

	// 				)";
	


	// $addDATA = $db->exec("INSERT INTO staff_list(
	// 	user_name,
	// 	user_password,
	// 	user_admin_access) VALUES(
	// 	'Sesame seed poof',
	// 	2.50, 0)
	// ");


	

	


?>	