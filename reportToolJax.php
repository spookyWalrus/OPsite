<?php
// deal with ajax calls for report Page


$breakNo = 1; // temporarily setting variable here, don't need it if this
				// code block/page is in the 'reportTools' page

$techTotals = 4; // default max is 4 per 'block'



// ==== function to set variable value ====
function new_breaks(){ //this param set by ajax response below
	// get value from Ajax call.  First click means a new break period was added to
	// the first, default break period, so add 1 to break period to have 2 break period...
	// global $breakNo; // by default this is 1, value bumped up from ajax call (see below)

	global $breakNo;
	global $techTotals;
	// set default values for new break periods...
	for ($x = 0; $x < $techTotals; $x++ ){
		if ($x == 0) {
			${"ss_bk".$breakNo ."_s"} = 'unchi'; // super break start
			${"ss_bk".$breakNo ."_e"} = ''; // super break end
		} else {
		${"t".$x."_bk".$breakNo."_s" } = ''; //tech break start
		${"t".$x."_bk".$breakNo."_e"} = ''; //tech break end
		}
	};

	// echo variable values back to report page
	for ($x = 0; $x < $techTotals; $x++ ){
		if ($x == 0) {

		echo ${"ss_bk".$breakNo ."_s"}; // super break start
		echo ${"ss_bk".$breakNo ."_e"}; // super break end
		} else {
		echo ${"t".$x."_bk".$breakNo."_s"}; //tech break start
		echo ${"t".$x."_bk".$breakNo."_e"}; //tech break end
		}
	}
	
	// $ss_bk2_s = "yay";

	// echo $ss_bk2_s;
	// echo "<br>end of function!";
	// return $breakNo;
}

	// print "got the last message";
// ====== Response from Ajax call =======
// if (isset($_GET['nuBreaks']) ){
if ($_GET['nuBreaks'] >= 1 ){
	$clikNo = $_GET['nuBreaks']; // this value increments from the JS page
	$breakNo = $clikNo + 1; // receiving ajax call means at least a 2nd block of
						// breaks were added, default # of breaks is already 1.
	// new_breaks($breakNo); // execute above function to variable values
	new_breaks();

	// print "poopy pants, value in field is: $breakNo";

// } else {
// 	print "no breaks received";
}




?>