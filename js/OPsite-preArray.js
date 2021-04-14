
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
	document.getElementById("reportDate").value = today;
};



// vvvvvvvvvvv    adding extra hours fields functions on button clicks vvvvvvv   
	var num; num();
	var nodeNum;

	var reportTable = document.getElementById('reportMain');



function makeShifts() {
	var i;
	var startEnd;
	var count = num[0];
	var se = num[1];

	if (count > 0){
		i = count;
		} else {
			i = 0;
		} 

	var cellNo =  i + 2;
	var nodeNo = i + 10;

	if (se = 1) {
		startEnd = " start";
		alert("flippy is " + se);

	} else if (se = -1 ){
			startEnd = " end";
			cellNo = i - 1;	
			alert("flippy is " + se);
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


	nuCellHeader.innerHTML = 	"Break" + cellNo + startEnd;
	nuCell1.innerHTML = '<input class="reportInput-s" type="text" name="SS_break' + cellNo + '_s" placeholder="" value="' + phpReturn1 +'">';
	nuCell2.innerHTML = '<input class="reportInput-s" type="text" name="SS_break' + cellNo + '_s" placeholder="" value="' + phpReturn1 +'">';
	nuCell3.innerHTML = '<input class="reportInput-s" type="text" name="SS_break' + cellNo + '_s" placeholder="" value="' + phpReturn1 +'">';
	nuCell4.innerHTML = '<input class="reportInput-s" type="text" name="SS_break' + cellNo + '_s" placeholder="" value="' + phpReturn1 +'">';
		
	reportTable.insertBefore(nuRow, reportTable.childNodes[nodeNo]);
	
	// se = flippy * (-1);
	i++;
	se = se * (-1);

	count = i;
	
	// alert("count is at " + count);
	nodeNum = nodeNo; 
	// alert("SE is now " + se);
	var num1 = count;
	var num2 = loop;
	return [num1, num2];
};




function delShifts() {
	var k;
	if (num[0] > 0) {
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

function addShifts(	) {
	se = 1;
	for (x = 0; x < 2; x++) {

		makeShifts();
		se = se * (-1);

		// return se;

		// alert("SE is " + se);

	};
};


// need to create/attach each row of data,
 // then attach to nuRow

// sub in new name-values as count goes up for each new 
// addition of Shift table cells