
<?php

if (isset($_POST['fillDefaults'])){
	// vvvvvvvvvvvvv    instant date fetch  vvvvvvvvvv
	$today = getdate();
	if ($today['mon'] < 10 ) {
		$theMonth = '0' .$today['mon'];
	} else {
		$theMonth = $today['mon'];
	}
	$whatIsToday = $today['year'] .'-' .$theMonth .'-' .$today['mday'];
	$ev_date = $whatIsToday; // set current date

	echo $ev_date;

}

	// show_form();

	//===========  set up default variable and values for view page =====
	// ============ relate names of technicians to position??,based on block =====


	// $block = 0;	// establish which block you are on (for future new blocks to be added!)
	// // function setBlock(){
	// // 	 if ($blockNo = 1){
	// // 	 	$block = 0;
	// // 	} else if ($blockNo = 2){
	// // 		$block = 3;
	// // 	} else if ($blockNo = 3){
	// // 		$block = 7;
	// // 	}
	// // }
	// // How do you establish (return?) the value of a variable upon load and then that
	// // variable is used for the associated view page?

	// // ========  set naming variable array =======
	// $eventPar = array('date','name', 'location','code','weather','start','end','intermission');

	// =========  set variable default values ========

	// =================  establish DB connection (assuming DB + table are already established)



// try {
// 	$db = new PDO("mysql:host=localhost;dbname=conUdb", 'root','');

// } catch (PDOException $e) {
// 	print "Can't connect: " .$e->getMessage();
// 	exit();
// }
// $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
// $db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);


// // main argument for requests
// // if ($_SERVER['REQUEST_METHOD'] == 'POST'){
// // 	list($errors,$input, $exxes, $evX) = validate_form(); 
// // 	if ($errors) {
// // 		// show_formErrors($errors,$input);
// // 		show_formErrors($errors, $input, $exxes, $evX);
// // 	}	else {
// // 		// valid data, so process form
// // 		process_form($input);
// // 	}
// // }	else {
// // 	show_form();
// // }


// // $input = array();
// 	// $super_name;



// function show_formErrors($errors, $input, $exxes, $evX) {
// 	global $eventPar;
// 	global $super_name;

// // the total number count to parse through tech names needs to be set
// // by how many 'blocks' of technicians' hours are being reported....
// // The default total number count is 4 (ss and 3 techs)
//  // loop through all "tech#_name" variables
	
// // Report Details... Tech Info
// // Parse through error messages, set '*' for missing fields, print out filled fields	
// 	$superYN = array_key_exists(0,$errors); // true if super NO exists
// 	$techsYN = array_key_exists(1,$errors);

// 	if ($superYN && $techsYN) {	// no super, missing techs
// 		foreach($exxes as $i => $x){
// 			if ($x == 0) { // super = *
// 				$super_name = '*'; 
// 			} 
// 			else if ($exxes[$x] > 0) { // give * for missing field
// 					${"tech".$x ."_name"} = '*';
// 			} 
// 		}	

// 		foreach($input as $j => $y){// keep filled fields
// 				// ${"tech".$j ."_name"} = trim($y,"*");
// 				${"tech".$j ."_name"} = $y;
// 		}

// 	}

// 	else if ((! $superYN) && $techsYN) {	// yes super, missing techs
// 		$super_name = trim($_POST['ss_name'], "*"); 

// 		foreach($exxes as $i => $x){
// 			if ($exxes[$x] > 0) { // give * for missing field
// 				${"tech".$x ."_name"} = '*';
// 			} 
// 		}

// 		foreach($input as $j => $y){// keep filled fields
// 				${"tech".$j ."_name"} = trim($y,"*");
// 		}
		
		
// 	} else if ($superYN && (! $techsYN)){ //no super, all techs present
// 		$super_name = '*'; 
// 		foreach($input as $j => $y){// keep filled fields
// 				// ${"tech".$j ."_name"} = trim($y,"*");
// 				${"tech".$j ."_name"} = $y;
// 		}
// 	}



// // Event Params...
// // throw '*' if missing, otherwise pass on inputted fields
// 	for ($x = 0; $x < sizeof($eventPar); $x++){ // set loop functions based on events param array
// 		if (array_key_exists($x, $evX)){ // check if any of the event fields are NOT filled, ie: exists in the $evX arary
// 			${"ev_" .$eventPar[$x]} = '*';   // all unfilled fields get a '*'
// 		} else {
// 			$param = $eventPar[$x]; 
// 			$eventInputs = trim($_POST["event_$param"], '*');  // trim any pre-existing '*'
// 			${"ev_" .$eventPar[$x]} = $eventInputs;
// 		}
// 	}


// // parse through error messages and print if they exist...
// 	if (array_key_exists(0, $errors)){
// 		$e1 = $errors[0];
// 	} else {
// 		$e1 = '';
// 	}
// 	if (array_key_exists(1, $errors)){
// 		$e2 = $errors[1];
// 	} else {
// 		$e2 = '';
// 	}
// 	$errorM2 = "$e1 &nbsp; $e2";

// 	if (array_key_exists(2, $errors)){
// 		$e3 = $errors[2];
// 	} else {
// 		$e3 = '';
// 	}
// 	$errorM1 = $e3;
	
// 	$user = '';


// 	include "reportPage.php"; //  print out page
// 	echo '<script type="text/javascript"> errorPopup(); </script>';  // throw error message when page finished loading



// }

// function show_form(){
	
// 	global $eventPar;
	
// 	for ($x = 0; $x < 8; $x++){ // loop through all "tech#_name" variables
// 		if ($x == 0){
// 		$super_name = '';
// 		} else { 				// set default values 
// 		${"tech".$x."_name"} = ''; 

// 		$_POST['t' .$x .'_position'] = 'HA'; // dropdown menu items

// 		}
// 	}
	

// 	for ($x = 0; $x < 8; $x++){ // loop through array to set "event_parameter" variables
	
// 		${"ev_" .$eventPar[$x]} = '';
// 	}
// 	$_POST['event_location'] = 'OP'; // default value for dropdown menu items


// 	global $whatIsToday;
// 	$ev_date = $whatIsToday; // set current date

// 	$e1 = '';
// 	$e2 ='';
// 	$e3 ='';
// 	$user = '';
// 	$errorM1 = ''; // default $error message value
// 	$errorM2 = ''; // default $error message value
// // 	// include "reportPage.php";
// }


// function validate_form(){
// 	global $eventPar;

// 	$errors = array();
// 	$input = array();
// 	$exxes = array();
// 	$evX = array();



// // the total number count to parse through tech names needs to be set
// // by how many 'blocks' of technicians'  are being reported....
// // The default total number count is 4 (ss and 3 techs)

// 	for ($x = 0; $x < 4; $x++){ // set up to loop through all "tech#_name" 
		
// 		if ($x == 0){
// 			$namez = trim($_POST['ss_name'] ?? '');
// 			$namez = trim($namez, "*");  // trim any stars
// 			// $namez = trim($_POST['ss_name'] ?? '');

// 			if (strlen($namez) == 0) { // check if name exists
// 				$errors[0] = '*please enter missing name of supervisor';
// 				$exxes[$x] = $x;
// 			}
// 		} 
// 	 	if ($x > 0) {
// 			$namez = $_POST['t' .$x .'_name']; // loop through tech variables
// 			$namez = trim($namez, '*'); // trim any stars

// 			if (strlen($namez) == 0) {
// 				$errors[1] = '*please enter missing names of technicians';
// 				$exxes[$x] = $x; 
// 			} else if (strlen($namez) > 0){
// 				$input[$x] = $namez;
// 			}
// 		}
// 	}
	
// 	for ($y = 1; $y < sizeof($eventPar); $y++) { // set up to  loop through event parameters...
// 		$params = 'event_' .$eventPar[$y]; // set param names to a variable
// 		$paramsIn = $_POST["$params"];
// 		$eventPz = trim($paramsIn ?? ''); // trim spaces
// 		$eventPz = trim($eventPz, '*');  // trim any stars
		
// 		 if (strlen($eventPz) == 0) {
// 			$errors[2] = '*please enter missing event details';
// 			$evX[$y] = $y;
// 		}
// 	}


// 	return array($errors, $input, $exxes, $evX);
// }


// function process_form($input) {
// 	// global $db;
// // Table to connect to: show_reports
// // 	try {
// // 		$sql = $db->prepare('INSERT INTO show_reports (event_date, event_name)
// // 							 VALUES(?,?)');
// // 		// $do = $db->prepare($sql);
// // 		$sql->execute(array($input['first_name'],$input['family_name'],$input['client_phone'],$input['favorite_dish']));
	
// // 	} catch (PDOExcetion $e){
// // 	}


// 	echo '<script type="text/javascript"> alert("Show report succesfully submitted");</script>';

// 		include "reportPage.php";



// }

// show_form();


?>		