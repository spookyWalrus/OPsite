
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

	var today = year + " " + month +" "+ date +" "+ day;

	document.getElementById("reportDate").placeholder = today;
}

// vvvvvvvvvvv    adding extra hours fields functions on button clicks vvvvvvv   
	var count;
	var count2;
	var nodeNum;
	var nodeNum2;
	var reportTable = document.getElementById('reportMain');



function makeShifts() {
	var i;

	if (count > 0){
		i = count;
		} else {
			i = 0;
		} ;
	var cellNo =  i + 2;
	var nodeNo = i + 10;

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


	nuCellHeader.innerHTML = 	'Break' + cellNo + ' start';
	nuCell1.innerHTML = '<input class="reportInput-s" type="text" name="SS_break' + cellNo + '_s" placeholder="" value="' + phpReturn1 +'">';
	nuCell2.innerHTML = '<input class="reportInput-s" type="text" name="SS_break' + cellNo + '_s" placeholder="" value="' + phpReturn1 +'">';
	nuCell3.innerHTML = '<input class="reportInput-s" type="text" name="SS_break' + cellNo + '_s" placeholder="" value="' + phpReturn1 +'">';
	nuCell4.innerHTML = '<input class="reportInput-s" type="text" name="SS_break' + cellNo + '_s" placeholder="" value="' + phpReturn1 +'">';
		
	reportTable.insertBefore(nuRow, reportTable.childNodes[nodeNo]);

	i++;

	count = i;
	// alert("count is at " + count);
	nodeNum = nodeNo; 
	return count;
}




function delShifts() {
	var k;
	if (count > 0) {
		k = count;
		// alert("count is at " + k);
	    reportTable.removeChild(reportTable.childNodes[nodeNum]	);
	    
	    k--;	
	    // alert("k is now at " + k);
		count = k;
		// alert("count is now at " + count);
		nodeNum--;  
		return count;
		};
};

function addShifts() {
	for (x = 0; x < 3; x++) {
		makeShifts();
		alert("make thing");
	})
};


// need to create/attach each row of data,
 // then attach to nuRow

// sub in new name-values as count goes up for each new 
// addition of Shift table cells