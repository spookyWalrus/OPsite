
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
}

// vvvvvvvvvvv    adding extra hours fields functions on button clicks vvvvvvv   
	var count;
	var loop;
	// var nodeNum;
	var reportTable = document.getElementById('reportMain');
	var nodeBelow = document.getElementById('nodeBelow');



function makeThings() {
	var i;
	var num;

	if (count > 0){
		i = count;
		} else {
			i = 0;
			count = 0;
		};

	var cellNo = i + 2;
	var nodeNo = i + 10;
	var header;


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



	// var endNum;
	// alert("count is " +count+ " and i is " +i);
	if (loop == 1) {
		header = " start";	

	nuCellHeader.innerHTML = 	'Break' + cellNo + header;
	nuCell1.innerHTML = '<input class="reportInput-s" type="text" name="SS_break' + cellNo + '_s" placeholder="" value="' + phpReturn1 +'">';
	nuCell2.innerHTML = '<input class="reportInput-s" type="text" name="SS_break' + cellNo + '_s" placeholder="" value="' + phpReturn1 +'">';
	nuCell3.innerHTML = '<input class="reportInput-s" type="text" name="SS_break' + cellNo + '_s" placeholder="" value="' + phpReturn1 +'">';
	nuCell4.innerHTML = '<input class="reportInput-s" type="text" name="SS_break' + cellNo + '_s" placeholder="" value="' + phpReturn1 +'">';
	
		
	alert("inserting before node no " +nodeNo);	
	reportTable.insertBefore(nuRow, reportTable.childNodes[nodeNo]);
	}	else if (loop == 2) {
		// cellNo =  i + 2 ;
		num = nodeNo + 1;
	header = " end";
	
	nuCellHeader.innerHTML = 	'Break' + cellNo + header;
	nuCell1.innerHTML = '<input class="reportInput-s" type="text" name="SS_break' + cellNo + '_s" placeholder="" value="' + phpReturn1 +'">';
	nuCell2.innerHTML = '<input class="reportInput-s" type="text" name="SS_break' + cellNo + '_s" placeholder="" value="' + phpReturn1 +'">';
	nuCell3.innerHTML = '<input class="reportInput-s" type="text" name="SS_break' + cellNo + '_s" placeholder="" value="' + phpReturn1 +'">';
	nuCell4.innerHTML = '<input class="reportInput-s" type="text" name="SS_break' + cellNo + '_s" placeholder="" value="' + phpReturn1 +'">';
	

	alert("inserting before node no " + num);	
	reportTable.insertBefore(nuRow, reportTable.childNodes[num]);
		// alert("nodeNo is " +nodeNo);
		// endNum = cellNo - i;
		// cellNo = 
		// header = " end";
		// alert(count);
	}

	// var nuRow = document.createElement("tr");
	// var nuCellHeader = document.createElement("td");
	// var nuCell1 = document.createElement("td");
	// var nuCell2 = document.createElement("td");
	// var nuCell3 = document.createElement("td");
	// var nuCell4 = document.createElement("td");

	// var phpReturn1 = " <?php echo $user; ?> ";


	// nuCellHeader.className = "reportHeading";
	// nuRow.appendChild(nuCellHeader);
	// nuRow.appendChild(nuCell1);
	// nuRow.appendChild(nuCell2);
	// nuRow.appendChild(nuCell3);
	// nuRow.appendChild(nuCell4);


	// nuCellHeader.innerHTML = 	'Break' + cellNo + header;
	// nuCell1.innerHTML = '<input class="reportInput-s" type="text" name="SS_break' + cellNo + '_s" placeholder="" value="' + phpReturn1 +'">';
	// nuCell2.innerHTML = '<input class="reportInput-s" type="text" name="SS_break' + cellNo + '_s" placeholder="" value="' + phpReturn1 +'">';
	// nuCell3.innerHTML = '<input class="reportInput-s" type="text" name="SS_break' + cellNo + '_s" placeholder="" value="' + phpReturn1 +'">';
	// nuCell4.innerHTML = '<input class="reportInput-s" type="text" name="SS_break' + cellNo + '_s" placeholder="" value="' + phpReturn1 +'">';
	
	// alert("inserting before node no " +nodeNo);	
	// reportTable.insertBefore(nuRow, reportTable.childNodes[nodeNo]);

// 	if (loop == 2) {
// 	// i++;
// }	
	// i++;
	// loop++;
	// count = i;
	// alert("count is at " + count);
	// nodeNum = nodeNo; 
	// loop = loop * -1;
	loop++;
	// return count;
}




// function delShifts() {
// 	var k;
// 	if (count > 0) {
// 		k = count;
// 		// alert("count is at " + k);
// 	    reportTable.removeChild(reportTable.childNodes[nodeNum]	);
	    
// 	    k--;	
// 	    // alert("k is now at " + k);
// 		count = k;
// 		// alert("count is now at " + count);
// 		nodeNum--;  
// 		return count;
// 		};
// };

function addShifts() {
	loop = 1;
	
	for (x = 0; x < 2; x++) {
		makeThings();

		// if (x == 2){
		// makeThings();
		// }	
	}
	count++;
	alert("new count is " +count);

}

function delShifts(){
	var num;

	if (count <= 1){

	nodeNo = count;
	// alert("deleting node " + nodeNo);
    goHere.removeChild(goHere.childNodes[nodeNo]);
	// alert("node deleted is " +nodeNo);
	// count--;
	num = nodeNo - 1;
	// nodeNo = count + 1;
	// alert("deleting node " +num);
	goHere.removeChild(goHere.childNodes[num]);
	// alert("node deleted is " +nodeNo);
	count--;
	alert("count is now at " + count);
	} else if (count > 1){

	nodeNo = count * 2 - 1;
	// nodeNo = count + 10  - 1;
	alert("deleting node " +nodeNo);
    goHere.removeChild(goHere.childNodes[nodeNo]);
	// alert("node deleted is " +nodeNo);
	// count--;
	num = nodeNo - 1;
	// nodeNo = count + 1;
	// alert("deleting node " +num);
	goHere.removeChild(goHere.childNodes[num]);
	// alert("node deleted is " +nodeNo);
	count--;
	alert("count is now at " + count);
	}else {

	}
}


// need to create/attach each row of data,
 // then attach to nuRow

// sub in new name-values as count goes up for each new 
// addition of Shift table cells