
<?php
// Nov 12   DONE
  // need record of when report was submitted and by whom


// Dec 4  DONE
	// make separate queries depending on what dates are available:
		//Year only, year and month, full date

// Dec 11	 DONE 
	// PDO object should connect only once and be re-used 
		// make PDO object global variable and referred to it for every connection attempt instead of making 
		// new connection for every DB query

// Dec 13 + 16 DONE (see dec 23)
	// Make sure overwrite vs new file is checked for every save viewReport OR showReport DONE
		// for showReport: verify for exisitng show report
			// if exists: don't save and tell user to change event name to save current submission
				// overwrite does not exist for showReport
		// for viewReport: can only overwrite existing record
			// have option to delete current file that is open (see Dec 23)
	
// Dec 23	DONE
	//>>>>>>  gave user option to save as new or to save edits in viewReport, script won't check for existing!
		// need to give option to delete file  (see dec 29)

// Dec 29	DONE
	// deleting file acting weird, deletes wrong record (the previously viewed file?)
		//>> what array is being passed to php page to check conditions?
		//>>> check what conditions are being met for DELETE sql command?
		// >> need to empty arrays/fields etc for delete command AND save command?

// Jan 05	DONE
	// nothing happens when updating report and staff is deleted / set name/position/hours to 'na'
		// need to check DB which name/position got deleted (as 'na') 

// Jan 07  DONE
	// when adding a new name to an existing record in view mode, need to check DB if new name exists
		// if yes, update.  If not, insert new name
		// >> currently having issues with fetching existing or non existing name (jan 08)

// establish PDO for database communication
$pdo = new PDO('mysql:host=localhost;dbname=conUdb', 'root', '');
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);

// ================= below is for finding / searching a report to view ================

// ---------------  on window load, fill name and date ranges from Ajax call --------------
if (isset($_POST['action'])) { // names
	try {
		// Connect to our MySQL database using the PDO extension.
		// $pdo = new PDO('mysql:host=localhost;dbname=conUdb', 'root', '');
		// $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		// $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);

		// retrieve the names that are in the 'staff list' DB 
		// for default look on page load...
		$sql = "SELECT user_name FROM staff_list";
		//Prepare the select statement.
		$stmt = $pdo->prepare($sql);
		//Execute the statement.
		$stmt->execute();

		 //Retrieve the rows using fetchAll.
		$staff = $stmt->fetchAll(PDO::FETCH_ASSOC);
		// // echo back data to AJAX call
		// print_r($staff);			
		echo json_encode($staff);
		// exit();
	} 
	catch (PDOException $e) {
		print "Error: " . $e->getMessage();
				exit();
	}
}

// set date range on load...
if (isset($_POST['findDate'])){ // from ajax call
	// $pdo = new PDO('mysql:host=localhost;dbname=conUdb', 'root', '');
	// $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	// $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);
	$thisDate = $_POST['findDate']; // this should be an array: if date is present only 1 indices, 
									// if only year and month present, index 0 is start day of month
									// and index 1 is end day of month
	 
	if(sizeof($thisDate) > 1){ // if only year and month exsit
		$startDate = $thisDate[0];
		$endDate = $thisDate[1];
		try{
			$find = $pdo->query(" SELECT event_date,event_name,event_location,event_code
							FROM show_reports WHERE (event_date >= '$startDate')
							AND (event_date <= '$endDate')
							ORDER BY event_date ASC ");
			$searchResult = $find->fetchAll(PDO::FETCH_ASSOC);  // put this data into a variable to be used for Search
			if ($searchResult){ 
				// echo json_encode($searchResult);
				$GLOBALS['res'] = $searchResult;
				echo json_encode($GLOBALS['res']);
			}

		} catch (PDOException $e) {
			print "Error: " . $e->getMessage();
			// echo $thisDate;
			exit();
		}
	}else if(sizeof($thisDate) == 1){// search for specific date
		try{
			$theDate = $thisDate[0];
			$find = $pdo->query(" SELECT event_date,event_name,event_location,event_code
								FROM show_reports WHERE event_date = '$theDate'
								ORDER BY event_date ASC ");
			$searchResult = $find->fetchAll(PDO::FETCH_ASSOC);  // put this data into a variable to be used for Search
			if ($searchResult){ 
				$GLOBALS['res'] = $searchResult;
				// echo json_encode($searchResult);
				echo json_encode($GLOBALS['res']);
			}

		} catch (PDOException $e) {
			print "Error: " . $e->getMessage();
			echo $thisDate;
			exit();
		}
	}	
}

if(isset($_POST['fillOutTheFields'])){
	global $pdo;
	// $pdo = new PDO('mysql:host=localhost;dbname=conUdb', 'root', '');
	// $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	// $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);
	$headerValue = $_POST['fillOutTheFields']; // 
	global $date,$event,$location,$code;
	$date = $headerValue[0];
	$event = $headerValue[1];
	$location = $headerValue[2];
	$code = $headerValue[3];
	$searchResult = [];  // array for search results

	// define function, then try DB query below it....
	function fillStaffInfo($result){
		global $date,$event,$location,$code,$pdo;

		try{
			$thing = [];
			$find = $pdo->query(" SELECT staff_name, position,start1,end1,start2,end2,start3,end3 FROM staff_hours WHERE 
				event_date ='$date'AND event_name='$event'AND event_location='$location' AND event_code='$code' ");
			$search = $find->fetchAll(PDO::FETCH_ASSOC);  // put this data into a object, gets filled into page
				if ($search){
					$length = sizeof($search);
					$searchResult[0] = $result;
					$searchResult[1] = $search;
					for ($x = 0;$x<$length;$x++){
						// $searchResult[$x+1] = $search[$x];
					}
					// $result=$search;
					// while ($row = mysqli_fetch_assoc($result)){
					// foreach ($search as $key => $value) {
						 // array_push($searchResult,$search); 
						// $i++;
					// 	// $searchResult['Staff'] = 
					// }
					echo json_encode($searchResult);
					// echo json_encode($searchResult);
				}

			} catch (PDOException $e) {
				print "Error: " . $e->getMessage();
				exit();
			}
	};


	// first, fill out the show report header 
	try{
			$find = $pdo->query(" SELECT * FROM show_reports WHERE event_date ='$date'AND event_name='$event'AND
							event_location='$location' AND event_code='$code' ");
			$result = $find->fetchAll(PDO::FETCH_ASSOC);  // put this data into a variable to be used for Search
			if ($result){ 
				fillStaffInfo($result); // if header search is succesful, fill out staff hours info with function above
			}

		} catch (PDOException $e) {
			print "Error: " . $e->getMessage();
			exit();
		};
}

// ============================== below is for editing / saving Report =============================

// ----------------  set date ------------
if (isset($_POST['fillDefaults'])){
	// vvvvvvvvvvvvv    instant date fetch  vvvvvvvvvv
	$theDate = getdate();
	if ($theDate['mon'] < 10 ) {
		$theMonth = '0' .$theDate['mon'];
	} else {
		$theMonth = $theDate['mon'];
	}
	if ($theDate['mday'] < 10){
		$today = '0' . $theDate['mday'];
	}	else {	$today = $theDate['mday'];
	}
	$whatIsToday = $theDate['year'].'-'.$theMonth.'-'.$today;
	echo $whatIsToday;	
	// var_dump($timeNow);
}

// ----------------------------  enter show report header data -------------
// first, check if record exists for new show report. 
	// By default, saving the data for viewing/Editing an existing report means the data exists and you
	// are writing over it 
if (isset($_POST['headerCheck'])){
	$nuValues = $_POST['headerCheck'];
	$date = htmlentities($nuValues[0]);
	$nameEvent = htmlentities($nuValues[1]);
	$venue = htmlentities($nuValues[2]);
	$code = htmlentities($nuValues[3]);
	try{
		$sql= $pdo->query(" SELECT event_name FROM show_reports WHERE 
							event_date='$date' AND event_name='$nameEvent' AND event_location='$venue' AND event_code='$code'
										 ");
		$getEvent = $sql->fetch(PDO::FETCH_ASSOC); 
		$thisEvent = $getEvent['event_name']; 
		// echo $thisEvent;
		if($nameEvent == $thisEvent){ // record already exists
			$exists = true;
			echo $exists;
		}else { // record is fresh...
			$exists = $thisEvent;
			echo $exists;
		}

	} catch (PDOException $e){
		print "Error: " . $e->getMessage();
		$errors =  "Something went wrong with querying header data in database.";
		echo $errors;
	}

}

if (isset($_POST['headerData'])){ // submit data to database
// function process_form($data) {// submit data to database
	$nuValues = $_POST['headerData'];
	// $nuValues = $data;
	// $nuValues = [];
	$date = htmlentities($nuValues[0]);
	$nameEvent = htmlentities($nuValues[1]);
	$venue = htmlentities($nuValues[2]);
	$code = htmlentities($nuValues[3]);
	$weather = htmlentities($nuValues[4]);
	$startTime = htmlentities($nuValues[5]);
	$endTime = htmlentities($nuValues[6]);
	// $password = password_hash($nuValues[7], PASSWORD_DEFAULT);
	$intermission = htmlentities($nuValues[7]);
	$commTech = $nuValues[8][0];
	$commFac = $nuValues[8][1];
	$commCl = $nuValues[8][2];
	$comments = $nuValues[8][3];
	$showView = $nuValues[9]; // create new or view mode of show report. Use this to check if saving new or 
								// over writing existing records
	date_default_timezone_set("America/New_York");
	// global $db;
// Table to connect to: show_reports
	try {
		// $db = new PDO("mysql:host=localhost;dbname=conUdb", 'root','');
		// $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		// $db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);

		if ($showView == 1){ // create new report
			$timeNow = date('Y-m-d'.'@'.'H:i:s');
			$sql = $pdo->prepare('INSERT INTO show_reports (event_date, event_name, event_location, event_code, 
								event_weather, event_start, event_end, intermission,comments_tech,comments_facil,comments_clnt,comments,creation_date)
								 VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)');
			$sql->execute(array($date,$nameEvent,$venue,$code,$weather,$startTime,$endTime,$intermission,$commTech,$commFac,$commCl,$comments,$timeNow));
			if ($sql){
				$success = "Show report header info: save successful!";
				echo $success;
			}
		}else if ($showView == 2){ // update existing report
			$timeNow = date('Y-m-d'.'@'.'H:i:s');
			$sql = $pdo->prepare("UPDATE show_reports SET event_date='$date', event_name='$nameEvent', event_location='$venue', event_code='$code', 
								event_weather='$weather', event_start='$startTime', event_end='$endTime', intermission='$intermission',comments_tech='$commTech',
								comments_facil='$commFac',comments_clnt='$commCl',comments='$comments',creation_date = '$timeNow'
								 WHERE event_date='$date' AND event_name='$nameEvent' and event_location='$venue' AND event_code='$code' ");	
			$sql->execute();
			if ($sql){
				$success = "Show report header info: update successful!";
				echo $success;
				echo $timeNow;
			}
		// $do = $db->prepare($sql);
		}
	
	} catch (PDOException $e){
		print "Error: " . $e->getMessage();
		$errors =  "Something went wrong with entering header data to the database.";
		echo $errors;
	}

}

// indivHoursArray =(name, date, eventName, venue, code, position, start1, end1, start2, end2, start3, end3)
// ------------  enter show report header data -------------
if (isset($_POST['workData'])){
// function process_form() {
	$workDataArray = $_POST['workData'];
	$newOld = $_POST['newOld']; // value to see if new record or update existing
	// global $db;
	// Table to connect to: show_reports
	try {
		// $db = new PDO("mysql:host=localhost;dbname=conUdb", 'root','');
		// $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		// $db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);

		if($newOld == 1){ // new record
			$sql = $pdo->prepare('INSERT INTO staff_hours (staff_name, event_date, event_name, event_location, event_code, 
								position, start1, end1, start2, end2, start3, end3)
								 VALUES(?,?,?,?,?,?,?,?,?,?,?,?)');

			for ($x=0;$x<sizeof($workDataArray);$x++){ // for each individual
				$nuValues = $workDataArray[$x];  // parse through all arrays
					for ($y=0;$y<sizeof($nuValues);$y++){   // parse through individual arrays
						$name = htmlentities($nuValues[0]);
						$date = htmlentities($nuValues[1]);
						$event = htmlentities($nuValues[2]);
						$venue = htmlentities($nuValues[3]);
						$code = htmlentities($nuValues[4]);
						$position = htmlentities($nuValues[5]);
						$startTime1 = htmlentities($nuValues[6]);
						$endTime1 = htmlentities($nuValues[7]);
						$startTime2 = htmlentities($nuValues[8]);
						$endTime2 = htmlentities($nuValues[9]);
						$startTime3 = htmlentities($nuValues[10]);
						$endTime3 = htmlentities($nuValues[11]);
					}
				if ($name == 'na'){
						continue; // prevent data entry if name is 'na' >>> should cause an error flag
				}
				// $do = $db->prepare($sql);
				$sql->execute(array($name,$date,$event,$venue,$code,$position,$startTime1,$endTime1,
										$startTime2,$endTime2,$startTime3,$endTime3));
				if ($sql){
					$success = "Data entry save successful!";
					echo $success;
					// echo $startTime1;
				} else {
					$errors =  "Something went wrong with saving individual data.";
					echo $errors;
					return;
				}
			}
			// $success = "Data entry successful!";
			// // echo $success;
			// return;
		}else if ($newOld == 2){ // update existing record
			for ($x=0;$x<sizeof($workDataArray);$x++){ // for each individual
				$nuValues = $workDataArray[$x];  // parse through all arrays
				
				for ($y=0;$y<sizeof($nuValues);$y++){   // parse through individual arrays
					$name = htmlentities($nuValues[0]);
					$date = htmlentities($nuValues[1]);
					$event = htmlentities($nuValues[2]);
					$venue = htmlentities($nuValues[3]);
					$code = htmlentities($nuValues[4]);
					$position = htmlentities($nuValues[5]);
					$startTime1 = htmlentities($nuValues[6]);
					$endTime1 = htmlentities($nuValues[7]);
					$startTime2 = htmlentities($nuValues[8]);
					$endTime2 = htmlentities($nuValues[9]);
					$startTime3 = htmlentities($nuValues[10]);
					$endTime3 = htmlentities($nuValues[11]);
				}
				if($name == 'na'){
					continue;
				}
			
				if (strpos($name,' : na')){// if person is deleted from upated report (newly set as 'na')
					$deletedName = str_replace(" : na","",$name);
					$sql = $pdo->prepare("DELETE FROM staff_hours WHERE staff_name = '$deletedName' ");
					$sql->execute();
					if($sql){
						$delete = "the name should be delete";
						echo $delete;
					}else{
						$bad = "deleting row error";
						echo $bad;
					}
					continue; 
				}else{ // check if name already exists or not in DB
					$sql= $pdo->query(" SELECT staff_name FROM staff_hours WHERE 
										 staff_name='$name' AND event_date='$date' AND event_name='$event' AND event_code='$code'
										 ");
					$getName = $sql->fetch(PDO::FETCH_ASSOC); 
					$thisName = $getName['staff_name'];
					// print_r($thisName)."\n";

					if (!(isset($thisName))){ // no, name does not exist, create new
						$sql = $pdo->prepare('INSERT INTO staff_hours (staff_name, event_date, event_name, event_location, event_code, 
								position, start1, end1, start2, end2, start3, end3)
								 VALUES(?,?,?,?,?,?,?,?,?,?,?,?)');
						$sql->execute(array($name,$date,$event,$venue,$code,$position,$startTime1,$endTime1,
										$startTime2,$endTime2,$startTime3,$endTime3));
						if ($sql){
							$success = "New staff entry successful!";
							// echo $success."\n";
							// echo "new name entered: ".$name."\n";
							// echo $startTime1;
						} else {
							$errors =  "Something went wrong with saving new staff";
							echo $errors;
							return;
						}
					}else if(isset($thisName)){ // yes, name already exists, update record of existing staff
						$sql = $pdo->prepare("UPDATE staff_hours SET 
								position='$position',start1='$startTime1',end1='$endTime1',start2='$startTime2',end2='$endTime2',
								start3='$startTime3',end3='$endTime3'
								WHERE staff_name='$name' AND event_date='$date' AND event_name='$event' AND event_code='$code' ");	
						$sql->execute();

						if ($sql){
							$success = "Data entry UPDATE successful!";
							// echo $success."\n";
							// echo "fetched name: ".$thisName[0]."\n";
							// echo "name updated: ".$name."\n";
						} else {
							$errors =  "Something went wrong with UPDATING an individual's data.";
							echo $errors;
							return;
						}
					}
				}
			}
		}

	}	catch (PDOException $e) {
				print "Error: " . $e->getMessage();
				$errors =  "Something went wrong with entering individual data.";
				echo $errors;
	}
}

if(isset($_POST['deleteReport'])){
	$nuValues = $_POST['deleteReport'];
	$date = htmlentities($nuValues['event_date']);
	$nameEvent = htmlentities($nuValues['event_name']);
	$venue = htmlentities($nuValues['event_location']);
	$code = htmlentities($nuValues['event_code']);

	try {
		$sql = $pdo->prepare("DELETE FROM show_reports WHERE event_date='$date' AND event_name='$nameEvent' 
							AND event_location='$venue' AND event_code='$code' ");	
		$sql2 = $pdo->prepare("DELETE FROM staff_hours WHERE event_date='$date' AND event_name='$nameEvent' 
							AND event_location='$venue' AND event_code='$code' ");	
				$sql->execute();
				$sql2->execute();
				if ($sql && $sql2){
					$success = "Successfully deleted data from database";
					echo $success;
					// echo $date;
					// echo $code;
					// echo $timeNow;
				}else{
					$bad = "Something went wrong wtih deleting data";
					echo $bad;
				}
		
	} catch (PDOException $e){
		print "Error: " . $e->getMessage();
		$errors =  "Something went wrong deleting record.";
		echo $errors;
	}
}

?>		