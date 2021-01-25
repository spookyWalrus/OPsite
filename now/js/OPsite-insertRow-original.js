
//   vvvvvv   auto-set date function on page load vvvvvvvvv
function setDate() {	

	var d = new Date();
	var date = d.getDate(); //day as text
	// var dayNo = d.getDay(); // day as number
	var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
	var day = days[d.getDay()];

	var year = d.getFullYear();

	var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
	var month= months[d.getMonth()];

	var today = day + " " + month +" "+ date +" "+ year;

	document.getElementById("reportDate").value = today;
}




// vvvvvvvvvvv    functions for adding extra hours on button clicks vvvvvvv   
	var count;
	var loop;
	var reportTable = document.getElementById('reportMain');



function makeThings() {
	var num;
	var cellNo;
	var nodeNo;
	var header;
	var phpReturn1 = " <?php echo $user; ?> ";

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

		var nuRow = reportTable.insertRow(nodeNo);
		var nuCellHeader = nuRow.insertCell(0);
		var nuCell1 = nuRow.insertCell(1);
	

		nuCellHeader.className = "reportHeading";
		nuCellHeader.innerHTML = 	'Break' + cellNo + header;
		nuCell1.innerHTML = '<input class="reportInput-s" type="text" name="SS_break' + cellNo + '_s" placeholder="" value="' + phpReturn1 +'">';
		
	}	else if (loop == 2) {
		nodeNo = num + 1;
		cellNo = count + 2;
		header = " end";

		var nuRow = reportTable.insertRow(nodeNo);
		var nuCellHeader = nuRow.insertCell(0);
		var nuCell1 = nuRow.insertCell(1);


		nuCellHeader.className = "reportHeading";

		nuCellHeader.innerHTML = 	'Break' + cellNo + header;
		nuCell1.innerHTML = '<input class="reportInput-s" type="text" name="SS_break' + cellNo + '_s" placeholder="" value="' + phpReturn1 +'">';
			// nuCell2.innerHTML = '<input class="reportInput-s" type="text" name="SS_break' + cellNo + '_s" placeholder="" value="' + phpReturn1 +'">';
			// nuCell3.innerHTML = '<input class="reportInput-s" type="text" name="SS_break' + cellNo + '_s" placeholder="" value="' + phpReturn1 +'">';
			// nuCell4.innerHTML = '<input class="reportInput-s" type="text" name="SS_break' + cellNo + '_s" placeholder="" value="' + phpReturn1 +'">';
			

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


	nuCellHeader.innerHTML = 	'Break' + cellNo + header;
	nuCell1.innerHTML = '<input class="reportInput-s" type="text" name="SS_break' + cellNo + '_s" placeholder="" value="' + phpReturn1 +'">';
	nuCell2.innerHTML = '<input class="reportInput-s" type="text" name="SS_break' + cellNo + '_s" placeholder="" value="' + phpReturn1 +'">';
	nuCell3.innerHTML = '<input class="reportInput-s" type="text" name="SS_break' + cellNo + '_s" placeholder="" value="' + phpReturn1 +'">';
	nuCell4.innerHTML = '<input class="reportInput-s" type="text" name="SS_break' + cellNo + '_s" placeholder="" value="' + phpReturn1 +'">';
	
}




function addShifts() {
	loop = 1;
	
	for (x = 0; x < 2; x++) {
		makeThings();
		loop++;
	
	}
	count++;

}



function delShifts(){
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