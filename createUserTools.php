 <?php 
// if starting from scratch and DB doesn't exist, 
//load OPDBFC-dbSetup.php to initialize and set up your db schema
 // and all your tables 



// function show_formErrors($errors){

// 	$message = $errors;

// 	echo $message;
	

// =====================  make ajax call to show errors and highlight where error is

// };



if (isset($_POST['createNu'])){
// function process_form() {
	$nuValues = $_POST['createNu'];
	// $nuValues = [];
	$name = htmlentities($nuValues[0]);
	$address = htmlentities($nuValues[1]);
	$postal = htmlentities($nuValues[2]);
	$phone = htmlentities($nuValues[3]);
	$email = htmlentities($nuValues[4]);
	$idnum = htmlentities($nuValues[5]);
	$sin = htmlentities($nuValues[6]);
	$password = password_hash($nuValues[7], PASSWORD_DEFAULT);
	$adminAccess = htmlentities($nuValues[8]);
	
	global $db;
// Table to connect to: show_reports
	try {
		// $db = new PDO("mysql:host=localhost;dbname=conUdb", 'root','');
		$db = new PDO('mysql:host=sql203.epizy.com;dbname=epiz_28394007_conUdb', 'epiz_28394007', 'gGvzSUWdFQMVez');
		$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		$db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);

		$sql = $db->prepare('INSERT INTO staff_list (user_name, user_address, user_postal, user_phone,
		user_email, user_idnum, user_sin, user_password, user_admin_access)
							 VALUES(?,?,?,?,?,?,?,?,?)');
		// $do = $db->prepare($sql);
		$sql->execute(array($name,$address,$postal,$phone,$email,$idnum,$sin,$password,$adminAccess));

		if ($sql){
			$success = "Account creation successful!";

			echo $success;
		}
	
	} catch (PDOExcetion $e){
		$errors =  "Something went wrong with entering data to the database.";
		echo $errors;
	}

	

}

?>	