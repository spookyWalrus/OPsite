



// vvvvvvvvvvv    functions for adding extra hours on button clicks vvvvvvv   
	var count;
	var loop;
	var reportTable = document.getElementById('reportMain');



function makeThings() {
	var num;
	var cellNo;
	var nodeNo;
	var header;
	// var phpReturn1 = " <?php echo $user; ?> ";

	if (count > 0){
		num = count * 2 + 5;
		} else { // starting point so cellNo 2, insert @ node 5
			num = 5;
			count = 0;
		};


	// var nuCell1 = document.createElement("td");
	// var nuCell2 = document.createElement("td");
	// var nuCell3 = document.createElement("td");
	// var nuCell4 = document.createElement("td");

	// var phpReturn1 = " <?php echo $user; ?> ";

	// nuRow.appendChild(nuCellHeader);
	// nuRow.appendChild(nuCell1);
	// nuRow.appendChild(nuCell2);
	// nuRow.appendChild(nuCell3);
	// nuRow.appendChild(nuCell4);


	if (loop == 1 ) {
		nodeNo = num;
		cellNo = count + 2;
		header = " start";	
		var ss_nuBreak = '<?php echo $ss_bk' + cellNo + '_s ?>';
		var dissed = "disabled";
		// for (var e = 0; e < 4; e++){
		// 	if (e == 0)
		// var nuSelement = 'ss_break' + cellNo + '_s';
		// var nuTelement = 't1_break' + cellNo + '_s';

		var nuRow = reportTable.insertRow(nodeNo);
		var nuCellHeader = nuRow.insertCell(0);
		var nuCell1 = nuRow.insertCell(1);
		var nuCell2 = nuRow.insertCell(2);
		var nuCell3 = nuRow.insertCell(3);
		var nuCell4 = nuRow.insertCell(4);
	

		nuCellHeader.className = "reportHeading";
		nuCellHeader.innerHTML = 	'Break' + cellNo + header;

		nuCell1.innerHTML = '<input class="reportInput-s" type="text" name="ss_break' + cellNo + '_s" placeholder="" id="ss_test" value="" disabled="true">';
		nuCell2.innerHTML = '<input class="reportInput-s" type="text" name="t1_break' + cellNo + '_s" placeholder="" value="<?php echo "$t1_bk' + cellNo + '_s" ?>">';
		nuCell3.innerHTML = '<input class="reportInput-s" type="text" name="t2_break' + cellNo + '_s" placeholder="" value="<?php echo "$t2_bk' + cellNo + '_s" ?>">';
		nuCell4.innerHTML = '<input class="reportInput-s" type="text" name="t3_break' + cellNo + '_s" placeholder="" value="<?php echo "$t2_bk' + cellNo + '_s" ?>">';

		var poo = document.getElementById('ss_test');
		// poo.disabled = "false";


	}	else if (loop == 2) {
		nodeNo = num + 1;
		cellNo = count + 2;
		header = " end";

		var nuRow = reportTable.insertRow(nodeNo);
		var nuCellHeader = nuRow.insertCell(0);
		var nuCell1 = nuRow.insertCell(1);
		var nuCell2 = nuRow.insertCell(2);
		var nuCell3 = nuRow.insertCell(3);
		var nuCell4 = nuRow.insertCell(4);
	

		nuCellHeader.className = "reportHeading";

		nuCellHeader.innerHTML = 	'Break' + cellNo + header;
		nuCell1.innerHTML = '<input class="reportInput-s" type="text" name="ss_break' + cellNo + '_e" placeholder="" value="<?php echo "$ss_bk' + cellNo + '_e" ?>" >';
		nuCell2.innerHTML = '<input class="reportInput-s" type="text" name="tech1_break' + cellNo + '_e" placeholder="" value="<?php echo "$t1_bk' + cellNo + '_e" ?>">';
		nuCell3.innerHTML = '<input class="reportInput-s" type="text" name="tech2_break' + cellNo + '_e" placeholder="" value="<?php echo "$t2_bk' + cellNo + '_e" ?>">';
		nuCell4.innerHTML = '<input class="reportInput-s" type="text" name="tech3_break' + cellNo + '_e" placeholder="" value="<?php echo "$t3_bk' + cellNo + '_e" ?>">';

	}


	var nuRow = document.createElement("tr");
	var nuCellHeader = document.createElement("td");
	var nuCell1 = document.createElement("td");
	var nuCell2 = document.createElement("td");
	var nuCell3 = document.createElement("td");
	var nuCell4 = document.createElement("td");

	var phpReturn1 = " <?php echo $user; ?> ";


	nuCellHeader.className = "reportHeading";
	nuRow.appendChild(nuCellHeader);
	nuRow.appendChild(nuCell1);
	nuRow.appendChild(nuCell2);
	nuRow.appendChild(nuCell3);
	nuRow.appendChild(nuCell4);


	// nuCellHeader.innerHTML = 	'Break' + cellNo + header;
	// nuCell1.innerHTML = '<input class="reportInput-s" type="text" name="SS_break' + cellNo + '_s" placeholder="" value="' + phpReturn1 +'">';
	// nuCell2.innerHTML = '<input class="reportInput-s" type="text" name="SS_break' + cellNo + '_s" placeholder="" value="' + phpReturn1 +'">';
	// nuCell3.innerHTML = '<input class="reportInput-s" type="text" name="SS_break' + cellNo + '_s" placeholder="" value="' + phpReturn1 +'">';
	// nuCell4.innerHTML = '<input class="reportInput-s" type="text" name="SS_break' + cellNo + '_s" placeholder="" value="' + phpReturn1 +'">';

}



function addBreaks() {
	loop = 1;
	
	for (x = 0; x < 2; x++) {
		makeThings();
		loop++;
	
	}
	count++;
	fillFields();
}



function delBreaks(){
	var num;
	var nodeNo;

	if (count > 0){

	nodeNo = count * 2 + 4;
    reportTable.deleteRow(nodeNo);
	
	num = nodeNo - 1;
    reportTable.deleteRow(num);


	count--;
	} else if (count <= 0){
		// alert("no more deleting please");
	}

}


// need to create/attach each row of data,
 // then attach to nuRow

// sub in new name-values as count goes up for each new 
// addition of Shift table cells
// =============== ajax calls ===================

function getHTTPObject(){ // set up XMLHttpRequest object.
	// initialize variable
	var xhr;
	if (window.XMLHttpRequest){ // check support non-IE6
		xhr = new XMLHttpRequest();
	} else if (window.ActiveXObject){ // check for IE6 Ajax
		xhr = new ActiveXObject("Msxm12.XMLHTTP");
	}
	return xhr;	
}


//===  vanilla JS ajax attempt below ======
function fillFields(){

	var request = getHTTPObject();
		// the ID's here need to be interpolated for any other elements
		// that are being added...
	// var fillForm = document.getElementById('ss_test');

	var poop = count;
	console.log('the count is: '+count); // click value
	var url = "reportToolJax.php?nuBreaks=" + poop; // send this to PHP page

	request.onreadystatechange = function(){
		// check if request is ready + succesful
		if (request.readyState === 4 && request.status === 200) {
			// spit out data that comes back
			// fillForm.value = request.responseText; // value returned from PHP
									// directly append response to HTML element
			document.getElementsByName('ss_break2_s')[0].value = request.responseText;
			// console.log(request.responseText);
		}	
		// else {
		// 	// alert("the ajax is not ready");
		// }
	}
		// Get info ready to go
	request.open("GET", url, true);

			// make the call
	// request.send(null); // regular way to send message, w/o extra data
	request.send(); // here, we are asking PHP to process this argument
}


