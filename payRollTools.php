<?php
if(!isset($_SESSION)) 
	{ 
		session_start(); 
	};

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
$GLOBALS['dateToday'] = $whatIsToday;



// establish first sunday of this year's pay period
// create interval from that date
// print out only the interval dates for whole year
// css every month to have different bg color


// =========  on window load, fill name and date ranges from Ajax call =======
if (isset($_POST['action'])) { // names
	try {
		// Connect to our MySQL database using the PDO extension.
		// $pdo = new PDO('mysql:host=localhost;dbname=conUdb', 'root', '');
		$pdo = new PDO('mysql:host=sql203.epizy.com;dbname=epiz_28394007_conUdb', 'epiz_28394007', 'gGvzSUWdFQMVez');
		$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		$pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);

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
if (isset($_POST['dateRange'])){ // from ajax call
	$firstSun = date('Y-m-d', strtotime('first sunday of january this year')); // need to check every year what day pay period starts
	$biWeek = [];
	$biWeek[0] = $firstSun;
	// parse through all dates, every 14 days
	for ($x=1;$x<26;$x++){ 
		$fourTeen = $x * 14; 
		$twoWeeks = date('Y-m-d', strtotime($firstSun. ' + ' .$fourTeen .' days'));
		$biWeek[$x] = $twoWeeks;
	}

	// echo json_encode($biWeek);
	echo json_encode($theDate);
}



$currentName; // used in function to save payroll data below....
if (isset($_POST['findPayPeriod'])){ // get date range
		// $pdo = new PDO('mysql:host=localhost;dbname=conUdb', 'root', '');
		$pdo = new PDO('mysql:host=sql203.epizy.com;dbname=epiz_28394007_conUdb', 'epiz_28394007', 'gGvzSUWdFQMVez');
		$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		$pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);
	$findIt = $_POST['findPayPeriod'];
	$name = $findIt[0]; // name to match
	$dateStart = $findIt[1]; // start date5
	$dateEnd =  date('Y-m-d', strtotime($dateStart. ' + 13 days'));
	// global $currentName;
	// $currentName = $name;

	try { // retrieve initial date range from staff_hours DB
		$stmt = $pdo->prepare("SELECT staff_name,event_date,event_name,event_location,event_code,position,start1,end1,start2,end2,start3,end3 FROM staff_hours WHERE staff_name = ? AND event_date BETWEEN  ? AND  ? ORDER BY event_date ASC,event_location ASC, event_name ASC");
		
		$stmt->execute([$name,$dateStart,$dateEnd]); 


		$dates = $stmt->fetchAll(PDO::FETCH_ASSOC);  

		// include "payRollpg1.php";

		echo json_encode($dates);

	} catch (PDOException $e) {
		print "Error: " . $e->getMessage();
			exit();
	}

}



// aug 7
	// 1) change column order in DB or the prepare statement below so it matches order of data in array     DONE
	// 2) set PDO statements so that data is separated to 2 DB tables: staff_hours / payroll_totals  DONE
		// ( also see 4) and Aug.23 )
		// >> need to make sure in payroll view mode to compile data from these two tables
		// >> currently, PHP commands in fetching staff_hours retrieves specific columns, so when
			// fetching data to view a completed payroll, need to specify which columns in staff_hours table
	// 3) change order of columns in DB. order logic is wonky...   DONE
	// 4) parse for week totals and grand total:
		// set dates to have: pay period, date of payroll creation  <<<< DO THIS

// (Aug. 23)  ALL DONE
	// setting data for a single index of '$payRollData' into 'staff_hours' works, now need to loop all indices of '$payRollData'
	// payroll_totals DB needs to have: event_name and event_location columns  NOPE
		// need to re-format this table, currently has wrong columns  DONE
	// set up conditional so when at last index of $payRollData, need to:  DONE
		// target payroll_totals
		// set up how data and variables are parsed and set
		// change SQL statement

// (Aug 24) (updated: Aug. 30)
	// need to check via SQL statement if record already exists and to UPDATE or create NEW 
		// 1) check if record exists with name + start /end date  DONE
		// 2) insert data if record doesn't exist already   DONE
		// 3) query if user wants to update if record does exist
			// >>> need to create separate AJAX call to check existing record
				//  write new PHP function that queries record and echos back confirmation via AJAX
					// parse only for name, start/end dates
					// echo back user if wants to create new record or overwrite existing
			// update AJAX function to execute update/insert payroll data (use existing)
		// 4) change table column type for date/ timestamp
			// is there a way to automatically time stamp it through SQL?

// Dec 02
	// If user changes event name/venue/account code when doing payroll, need to update staff_hours data accordingly....
		// >> if event name changes, how to ID that show report? 
			// if you check for dates, what if you have a double work date?
				// check start/end times?
				// SOLUTION: if report has too many mistakes or needs that many changes when processing
				// payroll, need to edit it via VIEW show report and make changes there!!!!
	// What happens when show report is wrong and need to DELETE or completely change show report?
		// >> maybe in VIEW show report, you can search for wrong show report and have option to delete?
			// need to prompt user to select correct report if there are doubles


if (isset($_POST['checkRecords'])){
	 $startDate;
	 $endDate;
	 $name;	
	$payRollData = $_POST['checkRecords']; // array 'checkThis', made in payRollJSTools.js,  is received as POST data
	try {
		// $db = new PDO('mysql:host=localhost;dbname=conUdb', 'root', '');
		$db = new PDO('mysql:host=sql203.epizy.com;dbname=epiz_28394007_conUdb', 'epiz_28394007', 'gGvzSUWdFQMVez');
		$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		$db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);

		$index1 = $payRollData[0];

		foreach($index1 as $key => $value){// parse through object, set each item to variable and set to array
			if ($key == 'staffName'){
				$name = $value;
				continue;
			}
			if ($key == 'start_Date'){
				$startDate = $value;
				continue;
			}
			if ($key == 'end_Date'){
				$endDate = $value;
				continue;
			}
		}

		$testSH = $db->query(" SELECT * FROM payroll_totals
							 WHERE staff_name='$name' AND period_start='$startDate' AND period_end='$endDate' ");

		$testResult = $testSH->fetch();
		
		if ($testResult){ // triggers prompt for user decision: overwrite or save
			echo "Exists";
			// echo json_encode($payRollData);
			// new ajax call triggered depending on user decision
		} else {
			echo "Save";
			// new ajax call triggered depending on user decision
		}
	} catch (PDOException $e) {
		$errors =  "Check record Error! PDO exception";
		echo $errors;
	}
}


	

if (isset($_POST['saveDataDB'])){
// function saveDataDB(){
	$startDate;
	$endDate;
	$name;
	$updOrIns = $_POST['saveDataDB']; // user response to 'overwrite' or 'save' new record
	global $payRollData;
	$payRollData = $_POST['savePayRoll'];  // payroll data
	// $keyNames = ['date','eventCd','accountCd','hours','income','addedHr','addedIn','nuHr','nuIn'];

	$dataArray = array(); // used for excel sheet 
	$dataArray2 = array(); // used to return error info
	$theData;
	date_default_timezone_set("America/New_York");
	$theDate = date("Y-m-d");
	$theTime = date("H:i:s");	
	// $timeStamp = $theDate;

	try {
	// $db = new PDO('mysql:host=localhost;dbname=conUdb', 'root', '');
	$db = new PDO('mysql:host=sql203.epizy.com;dbname=epiz_28394007_conUdb', 'epiz_28394007', 'gGvzSUWdFQMVez');
	$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);

		// set data into staff_hours
		$length = sizeof($payRollData)-1;
		$singleIndex;
		// $startDate;
		// $endDate;
		// $name;
		if ($updOrIns == "overwrite"){ // updates existing records
			for ($x=0;$x<=$length;$x++){ // parse through root array
				$singleIndex = $payRollData[$x];  // set single index (which is an object) to a variable
				if ($x<$length) {     // set data entry into staff_hours
					// $singleIndex = $payRollData[$x];  // set single index (which is an object) to a variable
					$y = 1; // index to increment for below function
					$date=''; // used in sql prepare statement

					foreach($singleIndex as $key => $value){// parse through object, set each item to variable and set to array
						
						// if ($key == 'eventCd'){
						// 	break;
						// }
						if ($key == 'staffName'){
							$name = $value;
							$GLOBALS['name'] = $name;
							continue;
						}
						if ($key == 'date'){
							$date = $value;
							continue;
						}
						if ($key == 'start_Date'){
							$startDate = $value;
							$GLOBALS['startdate'] = $startDate;
							continue;
						}
						if ($key == 'end_Date'){
							$endDate = $value;
							$GLOBALS['enddate'] = $endDate;
							continue;
						}
						if($key == 'hours'){
							$data1 = $value;
						}
						if($key == 'addedHr'){
							$data2 = $value;
						}
						if($key == 'addedWg'){
							if($value == 'NaN'){
								$data3 = 'na';
							}else{
							$data3 = $value;
							}
						}
						if($key =='addedIn'){
							$data4 = $value;
						}
						if($key == 'nuHr'){
							$data5 = $value;
						}
						if($key == 'nuIn'){
							$data6 = $value;
						}
						if($key == 'eventName'){
							$data7 = $value;
							// array_push($dataArray,$value);
						}
						if($key == 'eventLocation'){
							$data8 = $value;
						}
						if($key == 'eventCd'){
							$data9 = $value;
							// array_push($dataArray,$value);

						}
						if($key == 'income'){
							$data10 = $value;
						}
						// if ($value == 'undefined' || $value == null || $value == '' ){
						// 	$value = 'na';
						// }
						// $data = 'data'.$y; //new variable name
						// $$data = $value;
						// array_push($dataArray,$key." : ".$$data);
						// ++$y;
					}
					// insert into staff_hours DB: if name and date match, insert into that row
					// $setSH = $db->prepare("UPDATE staff_hours SET 
					// 						hours_total='$data1',income_total='$data2',added_hours='$data3',added_wage='$data4',added_income='$data5',
					// 						new_total_hours='$data6',new_total_income='$data7'
					// 						WHERE staff_name='$name' AND event_date='$date' ");
						$setSH = $db->prepare("UPDATE staff_hours SET 
											hours_total='$data1',added_hours='$data2',added_wage='$data3',added_income='$data4',
											new_total_hours='$data5',new_total_income='$data6',
											event_location='$data8',event_code='$data9',income_total='$data10'
											WHERE staff_name='$name' AND event_date='$date' and event_name='$data7' ");	
					$setSH->execute();
					
					if ($setSH){
						$success = "staff_hours data UPDATE success! For: ".$name."\n";
						// $thing = json_encode($singleIndex);
						// $thing = json_encode($dataArray);
						// echo $thing;
						// $dataArray = [];
					} else {
						$errors =  "Something went wrong with updating staff_hours";
						echo $errors;
						return;
					}

				} else if ($x == $length ){ // if $x reaches last index in array, set data to payroll_totals
				 // if ($x == ($length -1) ){ // if $x reaches last index in array, set data to payroll_totals
					$y = 1;
					foreach($singleIndex as $key => $value){// parse through object, set each item to variable and set to array
						if ($value == 'undefined' || $value == null || $value == ''){
							$value = 'na';
						}
						$data = 'data'.$y; //new variable name
						$$data = $value;
						// array_push($dataArray2,$$data);
						++$y;
					}
					
					// create new entry in DB
					$setSH2 = $db->prepare("UPDATE payroll_totals SET
										staff_name='$name',period_start='$startDate',period_end='$endDate',week1_hours_total='$data1',week1_income_total='$data2',week2_hours_total='$data3',week2_income_total='$data4',
										pay_period_gross_income='$data5',date_created='$theDate',time_created='$theTime'
										WHERE staff_name='$name' AND period_start='$startDate' AND period_end='$endDate' ");
										
					$setSH2->execute();
						if ($setSH2){
							$success = "Payroll_totals data UPDATED! For: ".$name."\n";
							// $thing= json_encode($dataArray);
							// echo $thing;
							// $out = json_encode($dataArray2);
							// echo $out;
							makeExcelData($payRollData);
						} else {
							$errors =  "WENT WRONG with UPDATING payroll_totals";
							echo $errors;
							return;
						}
				} // end of 'if'
			} // end of loop

		} else if ($updOrIns == "save"){
			for ($x=0;$x<=$length;$x++){ // parse through root array
				$singleIndex = $payRollData[$x];  // set single index (which is an object) to a variable
				if ($x<$length) {     // set data entry into staff_hours
					// $singleIndex = $payRollData[$x];  // set single index (which is an object) to a variable
					$y = 1; // index to increment for below function
					$date=''; // used in sql prepare statement

					foreach($singleIndex as $key => $value){// parse through object, set each item to variable and set to array
						
						// if ($key == 'eventCd'){
						// 	break;
						// }
						if ($key == 'staffName'){
							$name = $value;
							$GLOBALS['name'] = $name;
							continue;
						}
						if ($key == 'date'){
							$date = $value;
							continue;
						}
						if ($key == 'start_Date'){
							$startDate = $value;
							$GLOBALS['startdate'] = $startDate;
							continue;
						}
						if ($key == 'end_Date'){
							$endDate = $value;
							$GLOBALS['endddate'] = $endDate;
							continue;
						}
						if ($value == 'undefined' || $value == null || $value == ''){
							$value = 'na';
						}
						$data = 'data'.$y; //new variable name
						$$data = $value;
						// global $dataArray;
						// array_push($dataArray,$$data);
						++$y;
					}
					// insert into staff_hours DB: if name and date match, insert into that row
						// $setSH3 = $db->prepare("UPDATE staff_hours SET 
						// 						hours_total='$data1',income_total='$data2',added_hours='$data3',added_income='$data4',
						// 						new_total_hours='$data5',new_total_income='$data6'
						// 						WHERE staff_name='$name' AND event_date='$date' ");
							$setSH3 = $db->prepare("UPDATE staff_hours SET 
												hours_total='$data1',added_hours='$data2',added_income='$data3',
												new_total_hours='$data4',new_total_income='$data5',income_total='$data6'
												WHERE staff_name='$name' AND event_date='$date' ");
						$setSH3->execute();
						
						if ($setSH3){
							$success = "staff_hours data SAVED success! For: ".$name."\n";
							// echo $success;
							// $stuff = json_encode($singleIndex);
							// echo $stuff;
							$dataArray = [];
						} else {
							$errors =  "Something went wrong with SAVING staff_hours";
							echo $errors;
							return;
						}

				} else if ($x == $length ){ // if $x reaches last index in array, set data to payroll_totals
				 // if ($x == ($length -1) ){ // if $x reaches last index in array, set data to payroll_totals
					$y = 1;
					foreach($singleIndex as $key => $value){// parse through object, set each item to variable and set to array
						if ($value == 'undefined' || $value == null || $value == ''){
							$value = 'na';
						}
						$data = 'data'.$y; //new variable name
						$$data = $value;
						// global $dataArray2;
						// array_push($dataArray2,$$data);
						++$y;
					}
					// create new entry in DB
					// $setSH4 = $db->prepare(" IF NOT EXISTS ( SELECT 1 FROM payroll_totals
										// WHERE staff_name='$name' AND period_start='startDAte' AND period_end='$period_end')

					$setSH4 = $db->prepare("INSERT INTO payroll_totals (
										staff_name,period_start,period_end,week1_hours_total,week1_income_total,week2_hours_total,week2_income_total,
										pay_period_gross_income,date_created,time_created)
										VALUES ('$name','$startDate','$endDate','$data1','$data2','$data3','$data4',
										'$data5','$theDate','$theTime') ");
					$setSH4->execute();
						if ($setSH4){
							$success = "Payroll_totals data INSERT SAAAVED! For: ".$name."\n";
							echo $success;
							// $out = json_encode($payRollData[$x]);
							// echo $out;	
							makeExcelData($payRollData);
							// var_dump($singleIndex);

						} else {
							$errors =  "WENT WRONG with INSERTING payroll_totals";
							echo $errors;
							return;
						}	
				} // end of 'if'
			} // end of loop
		}
	} catch (PDOException $e) {
		$errors =  "Update or Insert Error! PDO exception";
		// $theData = json_encode($dataArray);
		// $theData = json_encode($singleIndex);
		echo $name;
		echo $date;
		echo $errors;
		// echo $theData;
		echo $e;
	}
}

// Oct.20  make array to be used for excel sheet output DONE
	// loop through saved Data
	// correspond data into array as seen above
	// use saveDataDB and 

// Nov.3 setting excel data:  DONE
	// $singleIndex  array contains: date of work day/ account code/hours worked/income/name/start date/end date  DONE
	// last index of $dataArray contains week totals: wk1hr,wk1inc,wk2hr, wk2inc,grossIn   DONE
		// parse through each iteration of $singleIndex so it fills out array after index 6 (starts on 7)  DONE
		// parse through last iteration of $dataArray (the payroll totals) so it fills out array indices 0 and 3  DONE
	// check to make sure this pattern works for 'Update' and 'new save' for both 
		// >> see Nov.12!!
	
// Nov.4 (c'd)  ALL DONE
	// add name/date start/date end for last array index for $payRollData ??
	// need to parse other arrays or DB to get staff ID   DONE
	// how to check which dates are in week 1 or week 2? >>> compare start date/end date >= || <= work date

//Nov 5   DONE
	// Need to loop through $payRollData all by itself bc much easier to pick indiv. data sets
	// for date...  OK

//Nov 10    DONE
	// how to loop through data and add info to excel array for week2 which is AFTER all data of week1?
		// >>  make separate arrays for week1 and week2 that is in chronological order.
		// >> join week2 array to end of week1 array

//Nov 12
	// Output when saving new payroll entry is weird when there are doubled dates...
		// values for event code and event location are switched in Excel sheet
		// payroll values in DB have wrong values
			//>> maybe bc of doubled dates?  Check array output when parsing for SAVE mode
	// Change naming of excel file so they are unique (for each pay period?) . Currently saves as save date and
		// nothing else...
	// Add when and whom saved each show report


// ------------------------  below is for making excel sheet ----------------------//
function makeExcelData($data){ 
	// var_dump($data);
	global $excel;
	$excel = [];
	$excel[0] = ["PAYROLL"=>'  '];
	
	$firstName; $lastName; $starDate; $endDate; $idnum; 
	
	global $week1;
	$week1[0] = ["week 1"=>'Week 1'];
	$week1[1] = ["Date"=>"Date","Total Hours"=>"TotalHours","Event name"=>"Event name","Event code"=>"Event code","Event location"=>"Event location","Event name"=>"Event name","Income calculated"=>"Income Calculated"]; //header for columns
	global $week2;
	$week2[0] = ["blank"=>' ']; // spacer
	$week2[1] = ["week 2"=>'Week 2'];
	$week2[2] = ["Date"=>"Date","Total Hours"=>"TotalHours","Event name"=>"Event name","Event code"=>"Event code","Event location"=>"Event location","Event name"=>"Event name","Income calculated"=>"Income Calculated"]; //header for columns

	global $workdata;

	try{ // get ID number from database
		$db = new PDO('mysql:host=localhost;dbname=conUdb', 'root', '');
		$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		$db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);
		$fullName = $GLOBALS['name'];
		$getName = $db->query(" SELECT user_idnum FROM staff_list
							 WHERE user_name = '$fullName' ");
		$result = $getName->fetch();
		if($result){
			global $idnum;
			$idnum = $result->user_idnum;
		}else{
			global $idnum;
			$idnum = '###';
		}
	} catch (PDOException $e) {
	$errors =  "Check record Error! PDO exception: ";
	echo $errors;
	}

	$length = sizeof($data)-1;
	for($x=0;$x<sizeof($data);$x++){
		$subArray = $data[$x];
		if ($x<$length) {     // all data except totals at end
			foreach($subArray as $key => $value){
				if(!isset($firstName)){
					if($key == 'staffName'){
						global $firstName;
						global $lastName;
						$fullName = $value;
						$name = explode(" ",$fullName);
						$firstName = $name[0];
						$lastName = $name[1];
					}
				}
				if(!isset($startDate)){
					if($key == 'start_Date'){
						global $startDate;
						$startDate = $value;
					}
				}
				if(!isset($endDate)){
					if($key == 'end_Date'){
						global $endDate;
						$endDate = $value;
					}
				} 
				if($key == 'date'){
					global $workdata;
					$workdata["Date"] = $value;
				}
				if($key == 'hours'){
					global $workdata;
					$workdata["Total Hours"] = $value;
				}
				if($key == 'eventName'){
					global $workdata;
					$workdata["Event Name"] = $value;
				}
				if($key == 'eventCd'){
					global $workdata;
					$workdata["Event Code"] = $value;
				}
				if($key == 'eventLocation'){
					global $workdata;
					$workdata["Event Location"] = $value;
				}
				if($key == 'income'){
					global $workdata;
					$workdata["Income calculated"] = $value;
				}
				if($key == 'eventWeek'){
					if($value == 'week1'){
						array_push($week1,$workdata);
						$workdata = [];		
					}else if($value == 'week2'){
						array_push($week2,$workdata);
						$workdata = [];
					}
				}
			}
		}
	}

	$theDate = $GLOBALS['dateToday'];
	// $theDate = 'bla bla bla';
	$filingDate;
	$filingDate[0] = ["blank"=>' '];// spacer
	$filingDate[1] = ["file date"=>'Filing date:'];
	$filingDate[2] = ["Date"=>$theDate];

	global $startDate;
	global $endDate;
	global $idnum;
	global $week1;
	global $week2;
	global $workdata;
	$excel[1] = ["payroll start"=>'Payroll Start Date', "payroll end"=>'Payroll End Date'];
	$excel[2] = ["Payroll Start" => $startDate, "Payroll End"=>$endDate ];
	$excel[3] = ["blank"=>' ']; // spacer
    $excel[4] = ["firstname"=>'First Name',"lastname"=>'Last Name',"id"=>'ID']; // headers for columns
	$excel[5] = ["First name" => $firstName, "Last name" => $lastName, "ID" => $idnum ];
	$excel[6] = ["blank"=>' ']; //spacer

	$addFileDate = array_merge($week2,$filingDate);
	$subfinal = array_merge($week1,$addFileDate);
	$final = array_merge($excel,$subfinal);
	ksort($final); // sort order of array to be ascending
	// to be used in makeExcel.php
	$_SESSION['exceldata'] = $final; 
	$userName = $GLOBALS['name'];
	$_SESSION['username'] = $GLOBALS['name'];
	$_SESSION['startdate'] = $startDate;
	$_SESSION['enddate'] = $endDate;
	
	exit(); // closes script bc need to load new page when saving to excel
}
	





?>