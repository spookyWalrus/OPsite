<?php
if(!isset($_SESSION)) 
	{ 
		session_start(); 
	};

// =========  on window load, fill menu from Ajax call =======
if (isset($_POST['action'])) {
// function populateMenu(){
	try {
		// Connect to our MySQL database using the PDO extension.
		// $pdo = new PDO('mysql:host=localhost;dbname=conUdb', 'root', '');
		$pdo = new PDO('mysql:host=sql203.epizy.com;dbname=epiz_28394007_conUdb', 'epiz_28394007', 'gGvzSUWdFQMVez');
		$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		$pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);

		//Our select statement. This will retrieve the data that we want.
		$sql = "SELECT user_name FROM staff_list";

		//Prepare the select statement.
		$stmt = $pdo->prepare($sql);

		//Execute the statement.
		$stmt->execute();

		// //Retrieve the rows using fetchAll.
		$users = $stmt->fetchAll(PDO::FETCH_ASSOC);
		// $users = "dude";
		// // echo back data to AJAX call
		echo json_encode($users);
		// exit();
	} catch (PDOException $e) {
		print "Error: " . $e->getMessage();
			exit();
	}
};

// =========== when name is selected and search now button clicked to make AJAX call...  ===================
 if (isset($_POST['doIt'])){
 	// global $currentName;
 	try {
	 	$findHimHer = $_POST['doIt'];

	 	// Connect to our MySQL database using the PDO extension.
		// $pdo = new PDO('mysql:host=localhost;dbname=conUdb', 'root', '');
		$pdo = new PDO('mysql:host=sql203.epizy.com;dbname=epiz_28394007_conUdb', 'epiz_28394007', 'gGvzSUWdFQMVez');
		$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		$pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);

		// //Our select statement. This will retrieve the data that we want.
		$sql = "SELECT user_name, user_address, user_postal, user_phone, user_email, user_idnum, user_sin, user_admin_access FROM staff_list WHERE user_name = (?) ";

		// //Prepare the select statement.
		$stmt = $pdo->prepare($sql);

		// //Execute the statement.
		$stmt->execute([$findHimHer]);
		// if ($stmt){

			// //Retrieve the rows using fetchAll.
			$viewee = $stmt->fetchAll(PDO::FETCH_ASSOC);
			
			// // echo back data to AJAX call

			echo json_encode($viewee);
			
			// print_r($viewee);
			// exit();
		// } else {
		// 	$error =  array("pee pee snake");
		// 	print $error;
		// }
	} catch (PDOException $e) {
		print "Error: " . $e->getMessage();
			exit();
	}
} ;

//  ====================  response to AJAX call when user data is updated =========
if (isset($_POST['upDateIt'] )){

	// update_data();
	$nuValues = $_POST['upDateIt'];
	$nuName = $nuValues[0];
	$nuAddress = $nuValues[1];
	$nuPost = $nuValues[2];
	$nuPhone = $nuValues[3];
	$nuEmail = $nuValues[4];
	$nuIdnum = $nuValues[5];
	$nuSin = $nuValues[6];
	$nuAdminYN = $nuValues[7];
	$origName = $nuValues[8];
	// $currentName = $_SESSION['logged_user'];
	// $nuSessVal='';
	// if (isset($nuValues[3])){
	// 	$nuSessVal = $nuValues[3];
	// }; // this is set by the variable setSessVal in editUserJax.php
 	// $matchName = $nuValues[0];
	try {
	 	// Connect to our MySQL database using the PDO extension.
		// $pdo = new PDO('mysql:host=localhost;dbname=conUdb', 'root', '');
		$pdo = new PDO('mysql:host=sql203.epizy.com;dbname=epiz_28394007_conUdb', 'epiz_28394007', 'gGvzSUWdFQMVez');
		$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		$pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);

			// $sql = 'UPDATE conUdb SET staff_list WHERE (user_name, user_admin_access)
			// 				 VALUES(?,?,)';
			$stmt2 = $pdo->prepare('UPDATE staff_list SET user_name = :nu_name, user_address = :nu_address, user_postal = :nu_post, 
				user_phone = :nu_phone, user_email = :nu_email, user_idnum = :nu_idnum, user_sin = :nu_sin, user_admin_access = :nu_adminYN 
									WHERE user_name = :current_name');
			$stmt2->bindParam(':nu_name', $nuName);  // this is how you plug in your variables for PDO UPDATE,
			$stmt2->bindParam(':nu_address', $nuAddress);  // this is how you plug in your variables for PDO UPDATE,
			$stmt2->bindParam(':nu_post', $nuPost);  // this is how you plug in your variables for PDO UPDATE,
			$stmt2->bindParam(':nu_phone', $nuPhone);  // this is how you plug in your variables for PDO UPDATE,
			$stmt2->bindParam(':nu_email', $nuEmail);  // this is how you plug in your variables for PDO UPDATE,
			$stmt2->bindParam(':nu_idnum', $nuIdnum);  // this is how you plug in your variables for PDO UPDATE,
			$stmt2->bindParam(':nu_sin', $nuSin);  // this is how you plug in your variables for PDO UPDATE,
			$stmt2->bindParam(':nu_adminYN', $nuAdminYN);  // bind your variables as parameters
			$stmt2->bindParam(':current_name', $origName);  

			$stmt2->execute();
			
			// $newInside = $stmt2->fetchAll(PDO::FETCH_ASSOC);


			if ($stmt2){ // if PDO or Mysql operation is succesful, echo success message
			
				$success = $nuName;
				echo $success;
 
			} else { // if unsuccesful, echo this
				$bad = "bad computer operation error";
				echo $bad;
			}


	} catch (PDOException $e) {
		print "Error: " . $e->getMessage();
	}

}

// ==============  password update call from AJAx ===========
if (isset($_POST['upDatePW'] )){

	$nuValues = $_POST['upDatePW'];
	$nuPassword = $nuValues[0];
	$currentName = $nuValues[1];

	$nuPWHash = password_hash($nuPassword, PASSWORD_DEFAULT);

	try {
	 	// Connect to our MySQL database using the PDO extension.
		// $pdo = new PDO('mysql:host=localhost;dbname=conUdb', 'root', '');
		$pdo = new PDO('mysql:host=sql203.epizy.com;dbname=epiz_28394007_conUdb', 'epiz_28394007', 'gGvzSUWdFQMVez');
		$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		$pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);

		$stmt2 = $pdo->prepare('UPDATE staff_list SET user_password = :nu_password  
								WHERE user_name = :current_name');
		$stmt2->bindParam(':nu_password', $nuPWHash);  // this is how you plug in your variables for PDO UPDATE,
		$stmt2->bindParam(':current_name', $currentName);   // bind your variables as parameters

		$stmt2->execute();
		
		if ($stmt2){ // if PDO or Mysql operation is succesful, echo success message
		$success = $currentName ." has changed their password";
		echo $success;
		
		} else { // if unsuccesful, echo this
			$bad = "bad! Computering  error!";
			echo $bad;
		}

	} catch (PDOException $e) {
		print "Error: " . $e->getMessage();
	}
}

// ==============   AJAX call: delete an account =================
 if (isset($_POST['deleteIt'])){
 	// global $currentName;
 	try {
	 	$findHimHer = $_POST['deleteIt'];

	 	// Connect to our MySQL database using the PDO extension.
		// $pdo = new PDO('mysql:host=localhost;dbname=conUdb', 'root', '');
		$pdo = new PDO('mysql:host=sql203.epizy.com;dbname=epiz_28394007_conUdb', 'epiz_28394007', 'gGvzSUWdFQMVez');
		$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		$pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);

		// //Our select statement. This will retrieve the data that we want.
		$sql = "DELETE FROM staff_list WHERE user_name = (?) ";

		// //Prepare the select statement.
		$stmt = $pdo->prepare($sql);

		// //Execute the statement.
		$stmt->execute([$findHimHer]);
		if ($stmt){
			$success = $findHimHer ." has been succesfully deleted";
			echo $success;
			} else { // if unsuccesful, echo this
				$bad = "bad computer operation error";
				echo $bad;
			}
	} catch (PDOException $e) {
		print "Error: " . $e->getMessage();
			exit();
	}
};

//===========  fetch session user name to edit own user's account =======
// if (isset($_POST['whoIsIt'])){

// 	// $name = $_SESSION['logged_user'];
// 	$userName = $name;
// 	echo $userName;
// }



?>
