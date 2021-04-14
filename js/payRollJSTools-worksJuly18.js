	// payRollJSTools.js
var dateStart = document.getElementById('fromHere');

function add14days(){  // set up dates for searching start date
	var dateSearch  =  dateStart.options[dateStart.selectedIndex].value;
	var newDate = dateSearch.split('-');
	var next2wks = +newDate[2] + +13;
	newDate[2] = next2wks;
	var endDate = newDate.join('-');
	return endDate;
}

// var dateCol = document.getElementsByClassName('dateColumn');

// set variables for zeroing fields
var field1 = document.getElementsByClassName('eventCol');
var field2 = document.getElementsByClassName('eventIn');
var field3 = document.getElementsByClassName('codeColumn');
var field4 = document.getElementsByClassName('accntCol');
var field5 = document.getElementsByClassName('role');
var field6 = document.getElementsByClassName('start1Col');
var field7 = document.getElementsByClassName('en1Col');
var field8 = document.getElementsByClassName('totCol1');
var field9 = document.getElementsByClassName('start2Col');
var field10 = document.getElementsByClassName('en2Col');
var field11 = document.getElementsByClassName('totCol2');
var field12 = document.getElementsByClassName('start3Col');
var field13 = document.getElementsByClassName('en3Col');
var field14 = document.getElementsByClassName('totCol3');
var field15 = document.getElementsByClassName('subTotHr');
var field16 = document.getElementsByClassName('otHr');
var field17 = document.getElementsByClassName('ot2Hr');
var field18 = document.getElementsByClassName('grTotCol');
var field19 = document.getElementsByClassName('rateCol');
var field20 = document.getElementsByClassName('inCol');
var field21 = document.getElementsByClassName('OTrateCol');
var field22 = document.getElementsByClassName('OT2rateCol');
var field23 = document.getElementsByClassName('adjHrCol');
var field24 = document.getElementsByClassName('wageAdjCol');
function zeroFields(){ // zero all fields before setting data 
	for (var x=1;x<25; x++){
	 	var row = window['field'+[x]];
	 	if (x == 1){
	 		for (var y=0;y<v14;y++){
	 			row[y].innerHTML = '';		
	 		} 
		} else if (x > 1 && x < 4){
	 		for (var y=0;y<v14;y++){
	 			row[y].value = '';		
	 		} 
 		
 		} else if (x == 5){
	 			for (var y=0;y<v14;y++){
	 			field5[y].value = "--";
	 			}
 		} else if (x > 5 && x < 23) {
 			for (var y=0;y<v14;y++){
	 		row[y].innerHTML = '';
	 		}
	 	}	else if (x > 22){
	 		for (var y=0;y<v14;y++){
	 			row[y].value = '';		
	 		} 
 		
 		} 
	}
}

var weekHoursTots; // array used to collect total hours for week calculation
// ..............  main function to sort data retrieved by Jax page, outputs to display  ...............
function sortPayroll(){
	// zeroFields();
	weekIncomeTots = [];
	weekHoursTots = [];
	findDoubles(); // parse data for doubles, add columns if needed, set dates with columns
	// setDates();
// }
// function otherPayroll(){
	var payData = JSON.parse(sessionStorage.getItem("payrollData"));
	for (var x=0;x<payData.length; x++){
		// console.log(markerObj[x]);
		// var date = payData[x]['event_date'];
		// console.log(payData);
		// splitSetDate(date,x); // old setDate function
		// setDates(date,x);
		// resetMarkers(date,x); // reset markers so they work with this page

		var eventName = payData[x]['event_name'];
		setEventName(eventName,x);
		// break;
		var eventLoc = payData[x]['event_location'];
		seteventLoc(eventLoc, x);
		var eventCode = payData[x]['event_code'];
		setEventCode(eventCode, x);
		var eventRole = payData[x]['position']; // on completion, calls function to set rate for income calculation
		setEventRole(eventRole, x);
		var start1 = payData[x]['start1'];
		setStart1(start1, x);
		var end1 = payData[x]['end1']; // block 1
		setEnd1(end1, x);
		block1Hours(end1, start1, x);
		var start2 = payData[x]['start2']; // block 2
		setStart2(start2, x);
		var end2 = payData[x]['end2'];
		setEnd2(end2, x);
		block2Hours(end2, start2, x);
		var start3 = payData[x]['start3']; // block 3
		setStart3(start3, x);
		var end3 = payData[x]['end3'];
		setEnd3(end3, x);
		block3Hours(end3, start3, x); 

		totalHoursMath(x); // trigger calculation of total hours 
		incomeCalc(x);  // calculate income

		// console.log("End of set: " + x);
		// return;	
		// console.log(dayHoursIncome);
	}
	weekIncome(); // once week data is set, calculate weekly income
	weekHourCount(); // calculate weekly hours
	// console.log(dayHoursIncome);
	makeHrInTotsObject(); // function found in payRollIncomeAdjust.js page


}


// add adj. hours and adj.rate, add to total hours and total income (calculate when adj.rate is entered? button?)
	// >> set up arrays that collects total hours and total income and day marker (indices independent)
	// >> on click, parse through these arrays. if day marker matches with adjusted day, then calculate adj. income
	// then add hours and income to parsed values. display values. DONE DONE DONE
// >> adjust total hours/income for end of week and totals for whole pay period  DONE
	// How to add negative numbers to subtract hours/income?  DONE
	//>> add a REVERT button for each column for corrections  DONE
	//>>  REVERT should affect total week calculations too DONE

// 3b) set up sort strategy for events with same date  ALL DONE
	//>>(set two dates, two columns with same date?
	// >> if there are 2 same dates: double up day of the week, sort day by increase week by # of doubles 
		// >> output data but each  


// 3c) reset no. of columns + arrays etc for each search  DONE
		//>> split page so table is a separate php page
			// reload table page for each 'Search' click
			// check if there are doubles for data set
			// if doubles, add new columns
			// if no doubles, don't change anything

// 4) (May 16) when you choose a new role/position, it will recalculate wage + income 

// 6) submit + save, >> also as pdf? excel? email text version?
// 7) add button that toggles the start/end times and shows only total hours  DONE (SEE JUNE 30TH NOTE)

// ???? (may 16) would it be smarter to separate staff hours into each person's work hours 
//     as soon as show report is submitted? ?????
				//>>  would need to compile data vai SQL for pay roll etc ....

// (june 08) adjust wage function stopped working!! DONE 
	// SEE adustIncome() function below for more notes    DONE
		// (june 09) >> need to adjust accordingly weekly totals math and wage REVERT DONE
		// (june 12) code 'Adjust' and 'Revert' buttons for week totals  DONE

// (june 12) what happens for 'Adjust' and 'Revert' when you have doubles/multiples of same date?  DONE
		// >> column number increases. How to find/address column # when adjust() and revert() functions
		// execute?  >> assign column# when creating new columns???

//(june 14) change 'venue' cell so that it is a dropdown <select> menu instead of text field

//(june 25) weekly totals wage adjust + revert don't work properly >>(see june 08)   DONE
	// 1) column# and index poorly set so DOM function can't id element properly for adjust() and revert() functions
	// 2) resetting indexes bc of doubles also needs to be looked into DONE

// (june 30) Add a showHours() button that toggles from the hideHours() button     DONE
	// >> also check the stylings as buttons on page 1 and 2 are different...
	// SEE JULY 1ST NOTE....

// (july 1st)  Is it possible to animate show/hide of table cells?
// (july 1st) The adjust() and revert() functions don't work properly for Week Totals when it's non-doubles work days DONE

//(july 2nd) Adjust() and Revert() functions need to get re-vamped? 
	// Adjust() is not inclusive of changes made both weeks, doesn't add changes to grand total when changes to week 1
		// and week 2 are made
		//>>> ??? make an array or object that contains original and new wage/ hours per DAY and for week Totals
		// on each click, parse through object and make sure to add correct totals depending on which column is selected
			// for adjust() or revert()   >> might need to re-vamp week income/hour totals function ...?


// ........................... header functions ...............

// var markers = []; // array to know which column has data assigned to it
// function splitSetDate(date, index){
function resetMarkers(date, index){ // delete eventually, old function to set date
	var dateSearch  =  dateStart.options[dateStart.selectedIndex].value;
	var dateCol = document.getElementsByClassName('dateColumn');

	// var startDay = dateSearch.split('-');
	// var theDate = date;
	// var splitDate = theDate.split('-'); // date found from SQL
	// var i = index;
	// for (var x=0;x<v14;x++){
	// 	var testIt = +startDay[2] + +x;
	//  	if (splitDate[2] == testIt){
	//  		// dateCol[x].innerHTML = splitDate[2];
	//  		markerObj[x].date = x; // set columns (days) that have data
	//  	} 
	//  	// dateCol[x].innerHTML = +startDay[2] + +x; // puts date with days of pay period
	// }
	// console.log('new markers: ',markers);
}

function setEventName(eventName,index){
	var eventName = eventName;
	var i = index;
	var eventCol = document.getElementsByClassName('eventCol');
	// for (var x=0;x<v14;x++){
	// 	if (markerObj[x].date == markers[i]){
	// 		eventCol[markerObj[x].col].innerHTML = eventName;
	// 		// console.log('index: ',i,' marker: ',markers[i],' event name: ',eventName,
	// 		// 			',v14-x: ',x,'event date: ',markerObj[x].date,' col: ',markerObj[x].col);
	// 		break;
	// 		// return;
	// 	}

	// }
	eventCol[markerObj[i].col].innerHTML = eventName;
}

function seteventLoc(eventVenue,index){
	var eventLoc = eventVenue;
	var i = index;
	var eventIn = document.getElementsByClassName('eventIn');
	// for (var x=0;x<v14;x++){
	// 	if (markerObj[x].date == markers[i]){
	// 	// if (x == markerObj[x].date){
	// 		eventIn[markerObj[x].col].value = eventLoc; 
	// 		// return;
	// 		break;
	// 	}
	// }
	eventIn[markerObj[i].col].value = eventLoc; 


}
function setEventCode(data,index){
	var eventData = data;
	var i = index;
	var column = document.getElementsByClassName('codeColumn');
	// for (var x=0;x<v14;x++){
	// 	if (markerObj[x].date == markers[i]){
	// 	// if (x == markerObj[x].date){
	// 		column[markerObj[x].col].value = eventData; 
	// 		// return;
	// 		console.log('col is: ',markerObj[x].col);
	// 		break;
	// 	}
	// }
	column[markerObj[i].col].value = eventData; 

}

var position; // variable to access position or role. Used to calculate wages down below
function setEventRole(data,index){
	var eventData = data; // data = position of staff
	var i = index;
	var column = document.getElementsByClassName('role');
	// for (var x=0;x<v14;x++){
	// 	if (markerObj[x].date == markers[i]){
	// 	// if (x == markerObj[x].date){
	// 		column[markerObj[x].col].value = eventData; 
	// 		position = eventData;
	// 		wageSet(eventData, i);
	// 		// return;
	// 		break;
	// 	}
	// }
	column[markerObj[i].col].value = eventData; 
	position = eventData;
	wageSet(position, i);
}


//  .......................    calculate wage rate based on position, display wage rate (called after header functions)
var rateSet; // universal rate to be used for income calculation
function wageSet(data,index){
	var role = data;
	var i = index;
	var rate;
	var column = document.getElementsByClassName('rateCol'); // reg.rate 
	// var column2 = document.getElementsByClassName('inCol');
	var column3 = document.getElementsByClassName('OTrateCol');
	var column4 = document.getElementsByClassName('OT2rateCol');
	// for (var x=0;x<v14;x++){
		// if ((role == 'SS') && x == markerObj[x].date) {
		if (role == 'SS'){
			rateSet = 26; // set universal rate
			column[markerObj[i].col].innerHTML = '$'+rateSet +'/hr';  // reg rate set
			column3[markerObj[i].col].innerHTML = '$' +(rateSet*1.5) +'/hr'; // OT rate set
			column4[markerObj[i].col].innerHTML = '$' +(rateSet*2) +'/hr'; // OT2 rate set
		}
		// if ((role == 'HA' || role == 'HLX' || role == 'HR') && x == markerObj[x].date) {
		if (role == 'HA' || role == 'HLX' || role == 'HR') {
			rateSet = 20; // set universal rate
			column[markerObj[i].col].innerHTML = '$'+rateSet +'/hr';  // reg rate set
			column3[markerObj[i].col].innerHTML = '$' +(rateSet*1.5) +'/hr'; // OT rate set
			column4[markerObj[i].col].innerHTML = '$' +(rateSet*2) +'/hr'; // OT2 rate set
		}
		// if (role == 'ST' && (x == markerObj[x].date)) {
		if (role == 'ST') {
			rateSet = 18; // set universal rate
			column[markerObj[i].col].innerHTML = '$'+rateSet +'/hr';  // reg rate set
			column3[markerObj[i].col].innerHTML = '$' +(rateSet*1.5) +'/hr'; // OT rate set
			column4[markerObj[i].col].innerHTML = '$' +(rateSet*2) +'/hr'; // OT2 rate set
		}
		// if (role == 'USH' && (x == markerObj[x].date)) {
		if (role == 'USH') {
			rateSet = 13; // set universal rate
			column[markerObj[i].col].innerHTML = '$'+rateSet +'/hr';  // reg rate set
			column3[markerObj[i].col].innerHTML = '$' +(rateSet*1.5) +'/hr'; // OT rate set
			column4[markerObj[i].col].innerHTML = '$' +(rateSet*2) +'/hr'; // OT2 rate set
		}
		// if (role == 'SSIP' && (x == markerObj[x].date)) {
		if (role == 'SSIP') {
			rateSet = 15; // set universal rate
			column[markerObj[x].col].innerHTML = '$'+rateSet +'/hr';  // reg rate set
			column3[markerObj[x].col].innerHTML = '$' +(rateSet*1.5) +'/hr'; // OT rate set
			column4[markerObj[x].col].innerHTML = '$' +(rateSet*2) +'/hr'; // OT2 rate set
		}
		// if (role == 'FOH' && (x == markerObj[x].date)) {
		if (role == 'FOH') {
			rateSet = 15; // set universal rate
			column[markerObj[x].col].innerHTML = '$'+rateSet +'/hr';  // reg rate set
			column3[markerObj[x].col].innerHTML = '$' +(rateSet*1.5) +'/hr'; // OT rate set
			column4[markerObj[x].col].innerHTML = '$' +(rateSet*2) +'/hr'; // OT2 rate set
		}
		// if ((role == 'na') && x == markerObj[x].date) {
		if (role == 'na') {
			rateSet = 0; // set universal rate
			column[markerObj[x].col].innerHTML = '$'+rateSet +'/hr';  // reg rate set
			column3[markerObj[x].col].innerHTML = '$' +(rateSet*1.5) +'/hr'; // OT rate set
			column4[markerObj[x].col].innerHTML = '$' +(rateSet*2) +'/hr'; // OT2 rate set
		}
	// }
}

// ........................ block functions ..................

var hoursCollect = []; // array to collect hours to do math on totals, OT etc

function minFrac(minutes){ // convert minutes to hour decimal/ fractions
	var m = minutes;
	var frac;
	if (m >= 0 && m < 08){
		frac = 0;
	} else if (m <23 && m > 07){
		frac = 0.25;
	} else if (m>22 && m<38){
		frac = 0.5;
	} else if (m>37&& m<54){
		frac = 0.75;
	} else if (m>53 && m<61){
		frac = 1;
	}
	// console.log(m +" is minutes, " +frac + " is frac");
	return frac;
}

function setStart1(data,index){ // block 1
	var eventData = data;
	var i = index;
	var column = document.getElementsByClassName('start1Col');
	// for (var x=0;x<v14;x++){
	// 	if (x == markerObj[x].date){
	// 		column[markerObj[x].col].innerHTML = eventData; 
	// 		return;
	// 	}
	// }
	column[markerObj[i].col].innerHTML = eventData; 

}
function setEnd1(data,index){
	var eventData = data;
	var i = index;
	var column = document.getElementsByClassName('en1Col');
	// for (var x=0;x<v14;x++){
	// 	if (x == markerObj[x].date){
	// 		column[markerObj[x].col].innerHTML = eventData; 
	// 		return;
	// 	}
	// }
	column[markerObj[i].col].innerHTML = eventData; 

}
function block1Hours(end, start, index){
	var total;
	if (end == 'na' || start == 'na'){
		total = 'na';
	} else {
	var end = end.split(':');
	var start = start.split(':');
	var fracE = minFrac(end[1]);
	var fracS = minFrac(start[1]);
	var e1 = +end[0] + +fracE;
	var s1 = +start[0] + +fracS;
		if (end[0] > start[0]){
			total = e1 - s1;
		} else if (end[0] < start[0]){
		 	total = (24 - s1) + e1;
		 	// console.log(total +" is total, " + end[0] +" is end hour");
		}
	}
	var i = index;
	var column = document.getElementsByClassName('totCol1');
	// for (var x=0;x<v14;x++){
	// 	if (x == markerObj[x].date){
	// 		column[markerObj[x].col].innerHTML = total; 
	// 		hoursCollect[0]= total;
	// 		// console.log(i +" is marker," +total +" is total");
	// 		return;
	// 	}
	// }
	column[markerObj[i].col].innerHTML = total; 
	hoursCollect[0]= total;
}
function setStart2(data,index){ // block 2
	var eventData = data;
	var i = index;
	var column = document.getElementsByClassName('start2Col');
	// for (var x=0;x<v14;x++){
	// 	if (x == markerObj[x].date){
	// 		column[markerObj[x].col].innerHTML = eventData; 
	// 		return;
	// 	}
	// }
	column[markerObj[i].col].innerHTML = eventData; 

}
function setEnd2(data,index){
	var eventData = data;
	var i = index;
	var column = document.getElementsByClassName('en2Col');
	// for (var x=0;x<v14;x++){
	// 	if (x == markerObj[x].date){
	// 		column[markerObj[x].col].innerHTML = eventData; 
	// 		return;
	// 	}
	// }
	column[markerObj[i].col].innerHTML = eventData; 

}
function block2Hours(end, start, index){
	var total;
	if (end == 'na' || start == 'na'){
		total = 'na';
	} else {
	var end = end.split(':');
	var start = start.split(':');
	var fracE = minFrac(end[1]);
	var fracS = minFrac(start[1]);
	var e1 = +end[0] + +fracE;
	var s1 = +start[0] + +fracS;
		 if (e1 > s1){
			total = e1 - s1;
		} else if (e1<s1){
		 	total = (24 - s1) + e1;
		}
	}
	var i = index;
	var column = document.getElementsByClassName('totCol2');
	// for (var x=0;x<v14;x++){
	// 	if (x == markerObj[x].date){
	// 		column[markerObj[x].col].innerHTML = total; 
	// 		hoursCollect[1]= total;
	// 		// console.log(i +" is marker," +total +" is total");
	// 		return;
	// 	}
	// }
	column[markerObj[i].col].innerHTML = total; 
	hoursCollect[1]= total;
}
function setStart3(data,index){ // block 3
	var eventData = data;
	var i = index;
	var column = document.getElementsByClassName('start3Col');
	// for (var x=0;x<v14;x++){
	// 	if (x == markerObj[x].date){
	// 		column[markerObj[x].col].innerHTML = eventData; 
	// 		return;
	// 	}
	// }
	column[markerObj[i].col].innerHTML = eventData; 

}
function setEnd3(data,index){
	var eventData = data;
	var i = index;
	var column = document.getElementsByClassName('en3Col');
	// for (var x=0;x<v14;x++){
	// 	if (x == markerObj[x].date){
	// 		column[markerObj[x].col].innerHTML = eventData; 
	// 		return;
	// 	}
	// }
	column[markerObj[i].col].innerHTML = eventData; 

}
function block3Hours(end, start, index){
	var total;
	if (end == 'na' || start == 'na'){
		total = 'na';
	} else {
	var end = end.split(':');
	var start = start.split(':');
	var fracE = minFrac(end[1]);
	var fracS = minFrac(start[1]);
	var e1 = +end[0] + +fracE;
	var s1 = +start[0] + +fracS;
 	 	if (e1 > s1){
			total = e1 - s1;
		} else if (e1<s1){
		 	total = (24 - s1) + e1;
		}
	}
	var i = index;
	var column = document.getElementsByClassName('totCol3');
	// for (var x=0;x<v14;x++){
	// 	if (x == markerObj[x].date){
	// 		column[markerObj[x].col].innerHTML = total; 
	// 		hoursCollect[2]= total;
	// 		// totalHoursMath(i); // trigger calculation of total hours 
	// 		// return;
	// 	}
	// }
	column[markerObj[i].col].innerHTML = total; 
	hoursCollect[2]= total;
	// return;
}


// .................	 Calculate + display hours worked for Reg.rate, OT, OT2   ..............
var hoursSorted = []; // array for  hours worked sorted per category
// hoursCollect[0 - 2]  = array used to store total hours worked per block: blocks 1=[0],block2=[1], block3=[2]
//  weekHoursTots; == array used to store total week hours
var dayHoursIncome = {}; // object used to store total hours+income for each day, accessed for adj.hours/adj.income
// hoursSorted [0 - 4] = 0=marker,1=total,2=reg,3=OT,4=OT2
var oldHours = []; // array used to revert to original hours
function totalHoursMath(index){
	hoursSorted = []; // zero all values in array
	// weekHoursTots = [];


	// var i = markers[x];
	var y = index;
	var column = document.getElementsByClassName('subTotHr');
	var column2 = document.getElementsByClassName('otHr');
	var column3 = document.getElementsByClassName('ot2Hr');
	var column4 = document.getElementsByClassName('grTotCol');
	// var column5 = document.getElementsByClassName('weekGrTot');

	var totalHours = 0;
	for (var x=0;x<3;x++){
		if (hoursCollect[x] == 'na'){
			hoursCollect[x] = 0;
		}
		// totalHours = hoursCollect[0] + hoursCollect[1] + hoursCollect[2];
	}
	totalHours = hoursCollect[0] + hoursCollect[1] + hoursCollect[2]; // total hours worked in the day
	var day = y; 
	dayHoursIncome[day]={}; // set up object with subset property, day is indices of nested object
	dayHoursIncome[[day]]['hours'] = totalHours; //set hours to be used for adj. hours/rate 
	oldHours[y] = dayHoursIncome[[day]]['hours']; // set original calculation for reverting adj.hours rate
	
	// display total hours worked for regular rate and OT, OT2, then set these hours in to hoursSorted array
	// for (var y=0;y<v14;y++){ 
		// if (totalHours < 9 && (y == i)){
		if (totalHours < 9){
			// console.log(markerObj[y].col);
			column[markerObj[y].col].innerHTML = totalHours;
			column2[markerObj[y].col].innerHTML = 0;
			column3[markerObj[y].col].innerHTML = 0;	
			column4[markerObj[y].col].innerHTML = totalHours;	
			hoursSorted[0] = markerObj[y].date;
			hoursSorted[1] = totalHours; // this is just reg hours
			hoursSorted[2] = 0;	
			hoursSorted[3] = 0;
			// hoursSorted[4] = totalHours;
			weekHoursTots[y] = totalHours;

		// } else if ((totalHours > 8 && totalHours <= 12) && (y == i)){
		} else if (totalHours > 8 && totalHours <= 12){
			var otHrs = totalHours - 8;
			// var reghrs = totalHours - otHrs;
			column[markerObj[y].col].innerHTML = 8;
			column2[markerObj[y].col].innerHTML = otHrs;
			column3[markerObj[y].col].innerHTML = 0;
			column4[markerObj[y].col].innerHTML = totalHours;	
			hoursSorted[0] = markerObj[y].date;
			hoursSorted[1] = 8;
			hoursSorted[2] = otHrs;
			hoursSorted[3] = 0;
			// hoursSorted[4] = totalHours;
			weekHoursTots[y] = totalHours;
		// } else if (totalHours > 12 && (y == i)){
		} else if (totalHours > 12){
			var ot2Hrs = totalHours - 12;
			// var reghrs = totalHours - otHrs;
			// var ot2Hrs = otHrs - 4;
			column[markerObj[y].col].innerHTML = 8;
			column2[markerObj[y].col].innerHTML = 4;
			column3[markerObj[y].col].innerHTML = ot2Hrs;	
			column4[markerObj[y].col].innerHTML = totalHours;	
			hoursSorted[0] = markerObj[y].date;
			hoursSorted[1] = 8;
			hoursSorted[2] = 4;
			hoursSorted[3] = ot2Hrs;
			// hoursSorted[4] = totalHours;
			weekHoursTots[y] = totalHours;
			// console.log(markerObj[x].date +": marker, OT2 hours: " +hoursSorted[3]);
		}
		// console.log(weekHoursTots[y] + " is weekly totals, mark: " +markerObj[x].date);

	// }
	
}

// ..................   calculate income ..............................................
// var rateSet; // universal rate to be used for income calculation
// hoursSorted [0 - 4] = 0=marker,1=reg,2=OT,3=OT2,4=total hours per category
// hoursCollect[0 - 2]  = array used to store total hours worked per block: blocks 1=[0],block2=[1], block3=[2]
var weekIncomeTots = []; // array used to collect total income
var oldIncome = [];// array used to revert to original calculation
function incomeCalc(index)	{

	// var i = markers[x]; // marker index
	var i = index;

	var incomeTotal;
	var column = document.getElementsByClassName('inCol');
	var day = i; // variable used for object
	// for (var y=0;y<5;y++){
		// console.log(hoursSorted[y] +' hours for array index ' +y)
	// }
	// console.log(rateSet +' is the rate for this block');
	// for (var x = 0;x<v14;x++){
	// for (var x = 0;x<v14;x++){
		// if (x == i){
			var regIncome = rateSet * hoursSorted[1];
			var otIncome = (rateSet * 1.5) * hoursSorted[2]; 
			var ot2Income = (rateSet * 2) * hoursSorted[3]; 
			incomeTotal = regIncome + otIncome + ot2Income;
			column[markerObj[i].col].innerHTML = '$' +incomeTotal; // display total income

			weekIncomeTots[i] = incomeTotal; // set values for week income array, each index is day's income
			dayHoursIncome[[day]]['income'] = incomeTotal; // set day income into object, for adj.hours/rates 
			oldIncome[i] = dayHoursIncome[[day]]['income'];
		// }
	// }
	// weekHourCount(i);
	// return;
}

// ....................  weekIncome calculation  (called when all data sets are parsed)  .....................
var weekTotalIncome;  // array for week income total
var	week1Inc;
var	week2Inc;
function weekIncome(nuWeekValue,weekNo){
	// console.log('weekIncomeTots array: ' + weekIncomeTots);
	// var weekIn;
	// var weekIn2;
	week1Inc = 0;
	week2Inc = 0;

	// var nuValue = 0;
	// nuValue = nuWeekValue;
	var nuWkIn;

	if ((nuWeekValue !== 0) && (nuWeekValue)){ 
		nuWkIn = parseFloat(nuWeekValue); // variable to check if week Total values are adjusted
		// console.log('new week total value is: ', nuWkIn);
	} else if ((nuWeekValue == 0)||(!nuWeekValue)){
		nuWkIn = 0;
		// console.log('no new week total value');
	}

	var week = weekNo;

	var column = document.getElementsByClassName('weekInTot');
	var column2 = document.getElementById('grandTotalIncome');
	var nuTotIn = document.getElementById('nuTotalIncome');

	var dateSearch  =  dateStart.options[dateStart.selectedIndex].value;
	var datesplit = dateSearch.split('-');
	var startDay = parseInt(datesplit[2]);
	var week1End = startDay + 6;
	var week2Start = startDay + 7;
	var week2End = startDay + 13;
	// console.log('startday: ', startDay, ',week1End: ',week1End);
	for (var z=0;z<markerObj.length;z++){ // refer to work days in markers
		if (markerObj[z].date <= week1End){
			// console.log('income date: ',markerObj[z].date);
			// weekIn = weekIncomeTots[z] + week1;
			week1Inc = weekIncomeTots[z] + week1Inc;
			// console.log('week1 income math: ',week1);
		} else if (markerObj[z].date > week1End){
			// console.log(markerObj[z].date);
			// weekIn2 = weekIncomeTots[z] + week2;
			week2Inc = weekIncomeTots[z] + week2Inc;
			// console.log('week2 income math: ',week2);
		}
	}


	if (nuWkIn > 0){
		weekTotalIncome = week1Inc + week2Inc + nuWkIn;
		// console.log(week1 +" is week1, " + week2 + " is week2");
		
		if (week == 0){
			// console.log('week 1 added income: ',nuWkIn);
			column[0].innerHTML = '$' + (parseInt(week1Inc) + nuWkIn);
		  	column[0].style.color = '#2b42f2'; // change color
			column[1].innerHTML = '$' + parseInt(week2Inc);
			// column2.innerHTML = weekTotalIncome;
			nuTotIn.innerHTML = '$'+weekTotalIncome;		
			nuTotIn.style.color = '#2b42f2';		
		} else if (week == 1){
			// console.log('week 2 added income: ',nuWkIn);
			column[0].innerHTML = '$' + parseInt(week1Inc);
			column[1].innerHTML = '$' + (parseFloat(week2Inc) + nuWkIn);
		  	column[1].style.color = '#2b42f2'; // change color
			// column2.innerHTML = weekTotalIncome;	
			nuTotIn.innerHTML = '$'+weekTotalIncome;		
			nuTotIn.style.color = '#2b42f2';
		}
	} else if (nuWkIn == 0){
		weekTotalIncome = week1Inc + week2Inc;
		column[0].innerHTML = '$' + parseFloat(week1Inc);
		column[1].innerHTML = '$' + parseFloat(week2Inc);
		// column2.innerHTML = weekTotalIncome;
		nuTotIn.innerHTML = '$'+weekTotalIncome;		
	}

}
// ....................   week hour count (called when all data sets are parsed)  ....................
var weekTotalHours; // variable to set total week hours
var week1hrs=0;
var week2hrs=0;
function weekHourCount(nuWeekHours,weekNo){
	
	var nuWkHr; 
	if ((nuWeekHours) && (nuWeekHours !== 0)) { //week total hour adjust 
		nuWkHr = parseInt(nuWeekHours); // variable to check if week Total values are adjusted
		// console.log('nu week total hours, week1hrs is: ',week1hrs,' week2hrs is: ',week2hrs);
		// console.log('weekend total adjust:' + nuWeekHours);
	} else if ((!nuWeekHours)||(nuWeekValue == 0)){ // reg day adjust
		nuWkHr = 0;
		// console.log('no new or reverted week hours, week1hrs is: ',week1hrs,' week2hrs is: ',week2hrs);
		// console.log('week day adjust');
		week1hrs = 0;
		week2hrs = 0;
	}
	var week = weekNo;


	var column = document.getElementsByClassName('weekGrTot');

	// console.log('weekHourTots array: ' + weekHoursTots);
	var dateSearch  =  dateStart.options[dateStart.selectedIndex].value;
	var datesplit = dateSearch.split('-');
	var startDay = parseInt(datesplit[2]);
	var week1End = startDay + 6;
	var week2Start = startDay + 7;
	var week2End = startDay + 13;
	
	if (nuWkHr !== 0){ // weekend total adjust
		weekTotalHours = week1hrs + week2hrs + nuWkHr;
		
		
		if (week == 0){ // week 1 adjust
			// console.log('new week1 total: ',week1hrs+nuWkHr, ', week2 total: ',week2hrs);
			// console.log(weekTotalHours);
			var nuweekEnd = week1hrs + nuWkHr;
			column[0].innerHTML = nuweekEnd;
		  	column[0].style.color = '#00fff9';
			// console.log('week1hrs: ',nuweekEnd,' week2hrs: ',week2hrs);
			column[1].innerHTML = week2hrs;
		
		} else if (week == 1){ // week 2 adjust
			// console.log('week1 total: ',week1hrs, ', new week2 total: ',week2hrs+nuWkHr);
			// console.log(weekTotalHours);
			var nuweekEnd = week2hrs + nuWkHr;
			column[0].innerHTML = week1hrs;
			column[1].innerHTML = nuweekEnd;
			// console.log('week1hrs: ',week1hrs,' week2hrs: ',nuweekEnd);
		  	column[1].style.color = '#00fff9';

		}
	} else if (nuWkHr == 0){
		for (var z=0;z<markers.length;z++){ // refer to work days in markers
			if (markerObj[z].date <= week1End){
				// console.log(weekHoursTots[z], ' is weekHoursTots date at week1: ',z);
				// weekHr = weekHoursTots[z] + week1hrs;
				week1hrs = parseFloat(weekHoursTots[z] + week1hrs);
				// console.log('week1 total hours: ',week1hrs);
			} else if (markerObj[z].date > week1End){
				// console.log(weekHoursTots[z], ' is weekHoursTots date at week2: ',z);
				// weekHr2 = weekHoursTots[z] + week2hrs;
				week2hrs = parseFloat(weekHoursTots[z] + week2hrs);
				// console.log('week2 total hours: ',week2hrs);

			}
		}
		weekTotalHours = week1hrs + week2hrs;
		// console.log('week1 total: ',week1hrs, ', week2 total: ',week2hrs);
		// console.log(weekTotalHours);

		column[0].innerHTML = week1hrs;
	  	column[0].style.color = '#ffffff';

		column[1].innerHTML = week2hrs ;
	  	column[1].style.color = '#ffffff';

	}
}

// .....................  adjust hour and wage calculation  .........................

// var adjHr = 0; // variable used for totalHourMath() as well
// var adjIncome = 0; // variable used for incomeCalc() as well
// dayHoursIncome[[day]]['income'] = incomeTotal; // set day income into object, for adj.hours/rates 
// weekHoursTots    array of week hour totals
// week1 = hour totals for week 1
// week2 = hour totals for week 2
	var column = document.getElementsByClassName('adjHrCol');
	var column2 = document.getElementsByClassName('wageAdjCol');
	var column3 = document.getElementsByClassName('grTotCol'); // day` hour total display
	var column4 = document.getElementsByClassName('inCol'); // day income total display

	var column5 = document.getElementsByClassName('weekInTot'); // week income
	var column6 = document.getElementsByClassName('weekGrTot'); // week hours
	var column7 = document.getElementById('nuTotalIncome');

	var wk1Hr = document.getElementById('week1HrTot');
	var wk2Hr = document.getElementById('week2HrTot');
	var wk1In = document.getElementById('wk1InTot');
	var wk2In = document.getElementById('wk2InTot');
function adjRate(index, week){
	// console.log(dayHoursIncome);
	// console.log(markerObj);
	// console.log('oldIncome array: ',oldIncome);
// 	incomeMaths();	
// 	console.log(hrInTotsObj);
// }

// function adjRateOld(index,week){ //  index = number received from button click = column # to target
	// console.log(dayHoursIncome);
	// console.log(markerObj);
	// console.log('oldIncome array: ',oldIncome);
	// incomeMaths();

	var i = parseInt(index);
	var wk = week;
	// var column = document.getElementsByClassName('adjHrCol');
	// var column2 = document.getElementsByClassName('wageAdjCol');
	// var column3 = document.getElementsByClassName('grTotCol'); // day` hour total display
	// var column4 = document.getElementsByClassName('inCol'); // day income total display

	// var column5 = document.getElementsByClassName('weekInTot'); // week income
	// var column6 = document.getElementsByClassName('weekGrTot'); // week hours
	// var column7 = document.getElementById('nuTotalIncome');

	// var wk1Hr = document.getElementById('week1HrTot');
	// var wk2Hr = document.getElementById('week2HrTot');
	// var wk1In = document.getElementById('wk1InTot');
	// var wk2In = document.getElementById('wk2InTot');

	var hrIn = 0;
	var incmIn = 0;
	var adjHr;
	var adjRate;
	var adjIncome;
	var adjHours;
	var weekHours;

	var w1D = ((totalDays-2)-dubWeek2)-7; // math to figure out if week 1
	var w2D = totalDays-1; // math to figure if week 2
	var w1 = 7;
	var w2 = 15;


	hrIn = column[i].value;
	adjHr = parseFloat(hrIn);

	// incmIn = column2[i].value;
	adjRate = column2[i].value;
	var nuRate = adjRate.replace(/$/g, '');
	adjIncome = adjHr * parseFloat(nuRate); // new income with adjusted rate

	// console.log('index: ',i,' week: ',week);

	var add = 'add'; // used to check button clicked status...
	checkClick(i,wk,adjHr,adjIncome,add); // check if button already clicked: payRollIncomeAdjust.js
	// incomeMaths(i,wk,adjHr,adjIncome,add); // function on payRollIncomeAdjust.js
	// console.log('values to set are: ',adjustedValues[0],adjustedValues[1]);
	// console.log('week total values to set are: ',adjustedValuesTots[0],adjustedValuesTots[1]);

	// if (doublesNo > 0){ // .... if doubles exist ..... ??? do I even need this?
	if (addedAlreadyYN =='no'){
		if (wk == 0){ // week 1
			if ((i == w1D) || (i == w1) ){ // week1 total only
				wk1Hr.innerHTML = adjustedValuesTots[0]; // nuWT value: adjusted week total hours
				wk1Hr.style.color = '#00fff9';
				wk1In.innerHTML = '$' + adjustedValuesTots[1]; // nuIT value: adjusted week total income
				wk1In.style.color = '#2b42f2';
				column7.innerHTML = '$' + grandIncomeTotal;
				column7.style.color = '#2b42f2';
				console.log('adjusting week1 tots only');
				console.log('hr, income,grand total: ',adjustedValuesTots[0], adjustedValuesTots[1],grandIncomeTotal);
			} else if ((i !== w1D) && (i !== w1)){ // work day and week1 total
				// console.log('i is: ',i);
				column3[i].innerHTML = adjustedValues[0]; // day hours total
				column3[i].style.color = '#00fff9';
				column4[i].innerHTML = '$' + adjustedValues[1]; // day income total
				column4[i].style.color = '#2b42f2';
				// column7.style.color = '#2b42f2';
				//week totals
				wk1Hr.innerHTML = adjustedValuesTots[0]; // nuWT value: adjusted week total hours
				wk1Hr.style.color = '#00fff9';
				wk1In.innerHTML = '$' + adjustedValuesTots[1]; // nuIT value: adjusted week total income
				wk1In.style.color = '#2b42f2';
				column7.innerHTML = '$' + grandIncomeTotal;
				column7.style.color = '#2b42f2';
				console.log('adjusting reg work day and week1 tots');
				console.log('hr, income,grand total: ',adjustedValuesTots[0], adjustedValuesTots[1],grandIncomeTotal);

			}
		} else if (wk == 1){
			// console.log('i is: ', i);
			// console.log('w2 and w2D is: ',w2,w2D);
			if ((i == w2D) || (i == w2) ){ // week2s total only
				wk2Hr.innerHTML = adjustedValuesTots[0]; // nuWT value: adjusted week total hours
				wk2Hr.style.color = '#00fff9';
				wk2In.innerHTML = '$' + adjustedValuesTots[1]; // nuIT value: adjusted week total income
				wk2In.style.color = '#2b42f2';
				column7.innerHTML = '$' + grandIncomeTotal;
				column7.style.color = '#2b42f2';
				console.log('adjusting week2 tots only');
				// return;
			// } else if (i !== (w2D || w2)){
			} else if ((i !== w2D) && (i !== w2)){ // work day and week2 total
			// } else {
				i = i - 1;
				console.log('i is: ',i);
				column3[i].innerHTML = adjustedValues[0]; // day hours total
				column3[i].style.color = '#00fff9';
				column4[i].innerHTML = '$' + adjustedValues[1]; // day income total
				column4[i].style.color = '#2b42f2';
				// column7.style.color = '#2b42f2';	
				wk2Hr.innerHTML = adjustedValuesTots[0]; // nuWT value: adjusted week total hours
				wk2Hr.style.color = '#00fff9';
				wk2In.innerHTML = '$'+  adjustedValuesTots[1]; // nuIT value: adjusted week total income
				wk2In.style.color = '#2b42f2';
				column7.innerHTML = '$' + grandIncomeTotal;
				column7.style.color = '#2b42f2';	
				console.log('adjusting reg work day and week2 tots');

			}
		}	
		console.log('grandIncomeTotal is: ',grandIncomeTotal);

	}
}

function revert(index,week){

	var i = index;
	column[i].value = ''; // set input fields to blank
	column2[i].value = '';
	var w1D = ((totalDays-2)-dubWeek2)-7; // math to figure out if week 1
	var w2D = totalDays-1; // math to figure if week 2
	var w1 = 7;
	var w2 = 15;

	var rev = 'rev';
	var a,b = 'blah'; // place holder variables to make checkClick() work properly....
	
	console.log('checking colour', clicked);
	checkClick(index, week,a,b, rev); // function to check if button clicked: payRollIncomeAdjust.js
	// revertMaths(index, week); // function on payRollIncomeAdjust.js
	// var anyChangesWk1 = checkColour(index,week);
	// var anyChangesWk2 = checkColour(index,week);
	// checkClick(index);

	if (revertAlreadyYN == 'no'){
		if (week == 0){ // week 1
			if ((i == w1D) || (i == w1) ){ // week1 total only
				wk1Hr.innerHTML = adjustedValuesTots[0]; // nuWT value: adjusted week total hours
				wk1In.innerHTML = '$'+adjustedValuesTots[1]; // nuIT value: adjusted week total income
				column7.innerHTML = '$'+grandIncomeTotal;

				if (anyChangesWk1 == 'orig'){
				wk1Hr.style.color = '#ffffff';
				wk1In.style.color = '#000000';
				}
				// if ((anyChangesWk[3] && anyChangesWk[4]) == true){ // check for week tots colours
				if ((anyChangesWk[3] && anyChangesWk[4]) == true){ // check for week tots colours
				// column7.innerHTML = '$' + grandIncomeTotal;
					column7.style.color = '#000000';		
				}
				console.log('week1 tots reverting');

				// column7.style.color = '#000000';
				// }
			} else if ((i !== w1D) && (i !== w1)){ // work day and week1 total
			// } else {
				console.log('i is: ',i);
				column3[i].innerHTML = adjustedValues[0]; // day hours total
				column3[i].style.color = '#ffffff';
				column4[i].innerHTML = '$'+adjustedValues[1]; // day income total
				column4[i].style.color = '#000000';
				// column7.style.color = '#2b42f2';
				//week totals
				wk1Hr.innerHTML = adjustedValuesTots[0]; // nuWT value: adjusted week total hours
				// wk1Hr.style.color = '#ffffff';
				wk1In.innerHTML = '$' + adjustedValuesTots[1]; // nuIT value: adjusted week total income
				column7.innerHTML = '$' + grandIncomeTotal;
				// wk1In.style.color = '#000000';
				// if (anyChangesWk[3]){
				if (anyChangesWk1 == 'orig'){
					wk1Hr.style.color = '#ffffff';
					wk1In.style.color = '#000000';
					// console.log('colors back to orig,week1tot');
				} 
				// column7.innerHTML = '$' + grandIncomeTotal;
				if ((anyChangesWk[3] && anyChangesWk[4]) == true){ // check for week tot colours
				// column7.innerHTML = '$' + grandIncomeTotal;
					column7.style.color = '#000000';		
				}
				// column7.style.color = '#000000';
				console.log('work day and week1 reverting');
				// console.log('colors remain');
				
			}
		} else if (week == 1){
			console.log('i is: ', i);
			if ((i == w2D) || (i == w2) ){ // week2s total only
				wk2Hr.innerHTML = adjustedValuesTots[0]; // nuWT value: adjusted week total hours
				// wk2Hr.style.color = '#ffffff';
				wk2In.innerHTML = '$'+adjustedValuesTots[1]; // nuIT value: adjusted week total income
				column7.innerHTML = '$'+grandIncomeTotal;
				// wk2In.style.color = '#000000';
				// if (anyChangesWk[4]){
				if (anyChangesWk2 == 'orig'){
					wk2Hr.style.color = '#ffffff';
					wk2In.style.color = '#000000';
					// console.log('colors back to orig, week2 tots');
					} 
				if ((anyChangesWk[3] && anyChangesWk[4]) == true){
				// column7.innerHTML = '$' + grandIncomeTotal;
					column7.style.color = '#000000';		
				}
				// column7.innerHTML = '$'+grandIncomeTotal;
				// column7.style.color = '#000000';
				console.log('week2 tots reverting');
			} else if ((i !== w2D) && (i !== w2)){ // work day and week2 total
			// } else {
				i = i - 1;
				console.log('i is: ',i);
				column3[i].innerHTML = adjustedValues[0]; // day hours total
				column3[i].style.color = '#ffffff';
				column4[i].innerHTML = '$'+adjustedValues[1]; // day income total
				column4[i].style.color = '#000000';
				// column7.style.color = '#2b42f2';		
				wk2Hr.innerHTML = adjustedValuesTots[0];// nuWT value: adjusted week total hours
				// wk2Hr.style.color = '#ffffff';
				wk2In.innerHTML = '$'+adjustedValuesTots[1]; // nuIT value: adjusted week total income
				column7.innerHTML = '$'+grandIncomeTotal;
				// wk2In.style.color = '#000000';
				// column7.innerHTML = '$' + grandIncomeTotal;
				
				// if (anyChangesWk[4]){
				if (anyChangesWk2 = 'orig'){
					wk2Hr.style.color = '#ffffff';
					wk2In.style.color = '#000000';
					// console.log('colors back to orig,workday');
					} 
				if (anyChangesWk[3] && anyChangesWk[4] == true){
				// column7.innerHTML = '$' + grandIncomeTotal;
					column7.style.color = '#000000';		
				}
				console.log('work day and week2 reverting');

			}
		}
		console.log('grandIncomeTotal is: ',grandIncomeTotal);
	}
}
	

	// if (i == w1 || i == w1D){ // adjust week1 totals
	// 	// console.log('added hours is: ',adjHr,' and week is: ', wk);
	// 	wk1Hr.innerHTML = adjustedValuesTots[0] // nuWT value: adjusted week total hours
	// 	wk1Hr.style.color = '#00fff9';
	// 	wk1In.innerHTML = adjustedValuesTots[1] // nuIT value: adjusted week total income
	// 	wk1In.style.color = '#2b42f2';
		// column7.style.color = '#2b42f2';
		
	
 // 	}  else if (i == w2||i == w2D){ 	// adjust week2 totals
 // 		// console.log('added hours is: ',adjHr,' and week is: ', wk);
	// 	wk2Hr.innerHTML = adjustedValuesTots[0] // nuWT value: adjusted week total hours
	// 	wk2Hr.style.color = '#00fff9';
	// 	wk2In.innerHTML = adjustedValuesTots[1] // nuIT value: adjusted week total income
	// 	column7.style.color = '#2b42f2';

	// // } else if (wk == 0){ // for week1
	// // } else if ( ((i !== w1)||(i !== w2)) || ((i!== w1D)||i !==w2D)) { // for any other workday
	// } else if ((wk == 0)&&(i !==(w1||w1D)||(w2||w2D)) ){ // week 1 workday
	// 	console.log('i is: ',i);
	// 	column3[i].innerHTML = adjustedValues[0]; // day hours total
	// 	column3[i].style.color = '#00fff9';
	// 	column4[i].innerHTML = adjustedValues[1]; // day income total
	// 	column4[i].style.color = '#2b42f2';
	// 	column7.style.color = '#2b42f2';
	// } else if ((wk == 1)&&(i !==(w1||w1D)||(w2||w2D)) ){ // week 1 workday
	// 	i = i - 1;
	// 	console.log('i is: ',i);
	// 	column3[i].innerHTML = adjustedValues[0]; // day hours total
	// 	column3[i].style.color = '#00fff9';
	// 	column4[i].innerHTML = adjustedValues[1]; // day income total
	// 	column4[i].style.color = '#2b42f2';
	// 	column7.style.color = '#2b42f2';

	// // 	column[i].innerHTML = adjustedValues; // day hours total
	// // 	column2[i].innerHTML = adjustedValues; // day hours total
	// // }
	// }
// }

	// } else if (doublesNo == 0){ // ...... if NO double days exist .......
	// 	console.log('setting week totals, no doubles');
	// 	if ((i == 7)&&(wk == 0)){ // adjust week1 totals 
	//  		wk1Hr.innerHTML = adjustedValues[0] // nuWT value: adjusted week total hours
	// 		wk1Hr.style.color = '#2b42f2';
	// 		wk1In.innerHTML = adjustedValues[1] // nuIT value: adjusted week total income
	// 		wk1In.style.color = '#2b42f2';
	// 		column7.style.color = '#2b42f2';
		
	//  	}  else if ((i == 15)&&(wk == 1)){ 	// adjust week2 totals
	//  		wk2Hr.innerHTML = adjustedValues[0] // nuWT value: adjusted week total hours
	// 		wk2Hr.style.color = '#2b42f2';
	// 		wk2In.innerHTML = adjustedValues[1] // nuIT value: adjusted week total income
	// 		wk2Hr.style.color = '#2b42f2';
	// 		column7.style.color = '#2b42f2';

	// 	} else if (wk == 0){ // for week1

	// 	}	else if (wk == 1){ // for week2

	// 	}
	// }
// }
	
// function adjRateOld(index,week){ //  index = number received from button click = column # to target

// 	if (doublesNo > 0){ // .... if doubles exist .....

// 		if (i == (((totalDays-2)-dubWeek2)-7)){ // adjust week1 totals for doubles
// 			// console.log('added hours is: ',adjHr,' and week is: ', wk);
// 	 		weekIncome(adjIncome,wk);
// 			weekHourCount(adjHr,wk);
// 			column7.style.color = '#2b42f2';
		
// 	 	}  else if (i == (totalDays-1)){ 	// adjust week2 totals
// 	 		// console.log('added hours is: ',adjHr,' and week is: ', wk);
// 	 		weekIncome(adjIncome,wk);
// 			weekHourCount(adjHr,wk);
// 			column7.style.color = '#2b42f2';

// 		} else if (wk == 0){ // for week1
// 			var dHI = dayHoursIncome;
// 			var z; // variable to match markerObj dates and dHI values
// 			var key2;
			
// 			for (var x = 0;x<markerObj.length;x++){
// 				if (markerObj[x].col == i){ // if selected column matches with column set in markerObj
// 			        for (key2 in dHI[x]) {
// 			  			if (key2 == 'income'){
// 			  				// console.log('DHI income matching index of markerObj is ' +dHI[x][key2]);
// 			  				var nuIncome = dHI[x][key2] + adjIncome;
// 			  			  	// console.log('nuIncome is ' +nuIncome);
// 			  			  	column4[i].innerHTML = "$" + nuIncome; // display new income value
// 			  			  	column4[i].style.color = '#2b42f2'; // change color
// 			  			  	column5[0].style.color = '#2b42f2'; // change color
// 			  			  	weekIncomeTots[[x]] = nuIncome;
// 							dayHoursIncome[[x]]['income'] = nuIncome;
// 							// console.log(dayHoursIncome);
// 			  			} else if (key2 == 'hours'){
// 							var theHours = parseInt(dHI[x][key2]);
// 			  			  	var nuHours = theHours + adjHr;
// 			  			  	// console.log('nuHours is ' + nuHours);
// 						  	column3[i].innerHTML = nuHours;
// 			  			  	column3[i].style.color = '#00fff9';
// 			  			  	// column6[0].style.color = '#00fff9';
// 			  			  	weekHoursTots[[x]] = nuHours; // set new values to object for
// 							dayHoursIncome[[x]]['hours'] = nuHours;	// set new values to object for continual re-calculation	  			  
// 		  			  	}
// 			        }
// 				}
// 			}
// 			// console.log('re-calculating week totals');
// 			weekIncome();
// 			weekHourCount();
// 		  	column6[0].style.color = '#00fff9';
// 			column7.style.color = '#2b42f2';

// 		} else if (wk == 1){ // for week2
// 		var dHI = dayHoursIncome;
// 		var z; // variable to match markerObj dates and dHI values
// 		var key2;

// 		i = i - 1; // need to bump down index to match markerObj

// 			for (var x = 0;x<markerObj.length;x++){
				
// 				if (markerObj[x].col == i){ // if selected column matches with column set in markerObj
				
// 			        for (key2 in dHI[x]) {
// 			  			if (key2 == 'income'){
// 			  				// console.log('DHI income matching index of markerObj is ' +dHI[x][key2]);
// 			  				var nuIncome = dHI[x][key2] + adjIncome;
// 			  			  	// console.log('nuIncome is ' +nuIncome);
// 			  			  	column4[i].innerHTML = "$" + nuIncome; // display new income value
// 			  			  	column4[i].style.color = '#2b42f2'; // change color
// 			  			  	column5[1].style.color = '#2b42f2'; // change color
// 			  			  	weekIncomeTots[[x]] = nuIncome;
// 							dayHoursIncome[[x]]['income'] = nuIncome;
// 							// console.log(dayHoursIncome);
// 			  			} else if (key2 == 'hours'){
// 							var theHours = parseInt(dHI[x][key2]);
// 			  			  	var nuHours = theHours + adjHr;
// 			  			  	// console.log('nuHours is ' + nuHours);
// 						  	column3[i].innerHTML = nuHours;
// 			  			  	column3[i].style.color = '#00fff9';
// 			  			  	// column6[1].style.color = '#00fff9';
// 			  			  	weekHoursTots[[x]] = nuHours; // set new values to object for
// 							dayHoursIncome[[x]]['hours'] = nuHours;	// set new values to object for continual re-calculation	  			  
// 		  			  	}
// 			        }
// 				}
// 			}
// 			// console.log('week day adjust, re-calculating week totals');
// 			weekIncome();
// 			weekHourCount();
// 		  	column6[1].style.color = '#00fff9';
// 			column7.style.color = '#2b42f2';
// 		}	

// 	} else if (doublesNo == 0){ // ...... if NO double days exist .......
		
// 		if ((i == 7)&&(wk == 0)){ // adjust week1 totals 
// 			// console.log('added hours is: ',adjHr,' and week is: ', wk);
// 	 		weekIncome(adjIncome,wk);
// 			weekHourCount(adjHr,wk);
// 			column7.style.color = '#2b42f2';
		
// 	 	}  else if ((i == 15)&&(wk == 1)){ 	// adjust week2 totals
// 	 		// console.log('added hours is: ',adjHr,' and week is: ', wk);
// 	 		weekIncome(adjIncome,wk);
// 			weekHourCount(adjHr,wk);
// 			column7.style.color = '#2b42f2';

// 		} else if (wk == 0){ // for week1
// 			var dHI = dayHoursIncome;
// 			var z; // variable to match markerObj dates and dHI values
// 			var key2;
			
// 			for (var x = 0;x<markerObj.length;x++){
// 				if (markerObj[x].col == i){ // if selected column matches with column set in markerObj
// 			        for (key2 in dHI[x]) {
// 			  			if (key2 == 'income'){
// 			  				// console.log('DHI income matching index of markerObj is ' +dHI[x][key2]);
// 			  				var nuIncome = dHI[x][key2] + adjIncome;
// 			  			  	// console.log('nuIncome is ' +nuIncome);
// 			  			  	column4[i].innerHTML = "$" + nuIncome; // display new income value
// 			  			  	column4[i].style.color = '#2b42f2'; // change color
// 			  			  	column5[0].style.color = '#2b42f2'; // change color
// 			  			  	weekIncomeTots[[x]] = nuIncome;
// 							dayHoursIncome[[x]]['income'] = nuIncome;
// 							// console.log(dayHoursIncome);
// 			  			} else if (key2 == 'hours'){
// 							var theHours = parseInt(dHI[x][key2]);
// 			  			  	var nuHours = theHours + adjHr;
// 			  			  	// console.log('nuHours is ' + nuHours);
// 						  	column3[i].innerHTML = nuHours;
// 			  			  	column3[i].style.color = '#00fff9';
// 			  			  	// column6[0].style.color = '#00fff9';
// 			  			  	weekHoursTots[[x]] = nuHours; // set new values to object for
// 							dayHoursIncome[[x]]['hours'] = nuHours;	// set new values to object for continual re-calculation	  			  
// 		  			  	}
// 			        }
// 				}
// 			}
// 			// console.log('re-calculating week totals');
// 			weekIncome();
// 			weekHourCount();
// 		  	column6[0].style.color = '#00fff9';
// 			column7.style.color = '#2b42f2';

// 		} else if (wk == 1){ // for week2
// 		var dHI = dayHoursIncome;
// 		var z; // variable to match markerObj dates and dHI values
// 		var key2;

// 		i = i - 1; // need to bump down index to match markerObj

// 			for (var x = 0;x<markerObj.length;x++){
				
// 				if (markerObj[x].col == i){ // if selected column matches with column set in markerObj
				
// 			        for (key2 in dHI[x]) {
// 			  			if (key2 == 'income'){
// 			  				// console.log('DHI income matching index of markerObj is ' +dHI[x][key2]);
// 			  				var nuIncome = dHI[x][key2] + adjIncome;
// 			  			  	// console.log('nuIncome is ' +nuIncome);
// 			  			  	column4[i].innerHTML = "$" + nuIncome; // display new income value
// 			  			  	column4[i].style.color = '#2b42f2'; // change color
// 			  			  	column5[1].style.color = '#2b42f2'; // change color
// 			  			  	weekIncomeTots[[x]] = nuIncome;
// 							dayHoursIncome[[x]]['income'] = nuIncome;
// 							// console.log(dayHoursIncome);
// 			  			} else if (key2 == 'hours'){
// 							var theHours = parseInt(dHI[x][key2]);
// 			  			  	var nuHours = theHours + adjHr;
// 			  			  	// console.log('nuHours is ' + nuHours);
// 						  	column3[i].innerHTML = nuHours;
// 			  			  	column3[i].style.color = '#00fff9';
// 			  			  	// column6[1].style.color = '#00fff9';
// 			  			  	weekHoursTots[[x]] = nuHours; // set new values to object for
// 							dayHoursIncome[[x]]['hours'] = nuHours;	// set new values to object for continual re-calculation	  			  
// 		  			  	}
// 			        }
// 				}
// 			}
// 			// console.log('week day adjust, re-calculating week totals');
// 			weekIncome();
// 			weekHourCount();
// 		  	column6[1].style.color = '#00fff9';
// 			column7.style.color = '#2b42f2';
// 		}	
// 	}
// }

// fetch  total hours : weekHoursTots[i], each index = day
// fetch  total income of day: weekIncomeTots[i], each index = day
// var oldHours; // original hours calculation per day
// var oldIncome; // original income calculation per day	  	
function revertOld(index, week){ //index from button click
	var i = index;
	var wk = week;
	// console.log('index is: ' + i);

	// var column = document.getElementsByClassName('adjHrCol');
	// var column2 = document.getElementsByClassName('wageAdjCol');
	// var column3 = document.getElementsByClassName('grTotCol');
	// var column4 = document.getElementsByClassName('inCol');

	// var column5 = document.getElementsByClassName('weekGrTot'); // week total hours column
	// var column6 = document.getElementsByClassName('weekInTot'); // week total income column
	// var wk1In = document.getElementById('wk1InTot');
	// var wk2In = document.getElementById('wk2InTot');
	
	// var column7 = document.getElementById('nuTotalIncome');


	column[i].value = '';
	column2[i].value = '';

	revertMaths(i,wk);
	if (i == (((totalDays-2) - dubWeek2) - 7)) { // revert week1 totals for doubles
		
		weekIncome(0,0);  // recalculate weekly values....
		weekHourCount();
	  	column6[0].style.color = '#000000'; // change color

	} else if (i == (totalDays-1)){ // revert week2 totals for doubles
		
		weekIncome(0,1);  // recalculate weekly values....
		weekHourCount();
	  	column6[1].style.color = '#000000'; // change color

	} else if (wk == 0) {// revert column for week1 weekday
		// (i < 7){ 
		for (var x = 0;x<markerObj.length;x++){
			if (markerObj[x].col == i){ // if selected column matches with column set in markerObj
			weekHoursTots[x] = oldHours[x];
			dayHoursIncome[[x]]['hours'] = oldHours[x];	// set new values to object for continual re-calculation	  			  
			column3[i].innerHTML = weekHoursTots[x];
		  	column3[i].style.color = '#ffffff';

			weekIncomeTots[x] = oldIncome[x]; 
			dayHoursIncome[[x]]['income'] = oldIncome[x];
			column4[i].innerHTML =  "$" + weekIncomeTots[x];
		  	column4[i].style.color = '#000000';
			}
		}

		weekIncome(0,0);  // recalculate weekly values....
		weekHourCount();
	  	wk1In.style.color = '#000000'; // change color
		column7.style.color = '#000000';
	
	} else if (wk == 1){ // revert column for week2 weekday
		i = i - 1;  // change index # to match markerObj
		for (var x = 0;x<markerObj.length;x++){
			if (markerObj[x].col == i){ // if selected column matches with column set in markerObj
			weekHoursTots[x] = oldHours[x];
			dayHoursIncome[[x]]['hours'] = oldHours[x];	// set new values to object for continual re-calculation	  			  
			column3[i].innerHTML = weekHoursTots[x];
		  	column3[i].style.color = '#ffffff';

			weekIncomeTots[x] = oldIncome[x]; 
			dayHoursIncome[[x]]['income'] = oldIncome[x];
			column4[i].innerHTML =  "$" + weekIncomeTots[x];
		  	column4[i].style.color = '#000000';

			}
		}
		weekIncome(0,1);  // recalculate weekly values....
		weekHourCount();
	  	wk2In.style.color = '#000000'; // change color
		column7.style.color = '#000000';
	}
}

function hideHours(showhide,weekNo){ // hides hours worked in table
	var hButt= document.getElementsByClassName("hideButton");
	var sButt= document.getElementsByClassName("showButton");
	var rate = document.getElementsByClassName('wage');
	var rateOT = document.getElementsByClassName('wageOT');
	var rateOT2 = document.getElementsByClassName('wage2OT');
	var showOrHide = showhide;

	if (showOrHide == 33){ // hide Hide button, show Show button
		if (weekNo == 0){ // week 1
			for (var x = 1;x<4;x++){
				var getStart = "st" + x + "Row";
				var getEnd = "en" + x + "Row";
				var getTotal = "totalRow" + x;
				var startcol = document.getElementsByClassName(getStart);
				var endcol = document.getElementsByClassName(getEnd);
				var totalcol = document.getElementsByClassName(getTotal);

				startcol[0].style.display = 'none';
				endcol[0].style.display = 'none';
				totalcol[0].style.display = 'none';
				rate[0].style.display = 'none';
				rateOT[0].style.display = 'none';
				rateOT2[0].style.display = 'none';

				hButt[0].style.display = 'none';
				sButt[0].style.display = 'inline';

			}
		} else if (weekNo == 1){ // week 2
			for (var x = 1;x<4;x++){
				var getStart = "st" + x + "Row";
				var getEnd = "en" + x + "Row";
				var getTotal = "totalRow" + x;
				var startcol = document.getElementsByClassName(getStart);
				var endcol = document.getElementsByClassName(getEnd);
				var totalcol = document.getElementsByClassName(getTotal);
				
				startcol[1].style.display = 'none';
				endcol[1].style.display = 'none';
				totalcol[1].style.display = 'none';	
				rate[1].style.display = 'none';
				rateOT[1].style.display = 'none';
				rateOT2[1].style.display = 'none';
				
				hButt[1].style.display = 'none';
				sButt[1].style.display = 'inline';		
			}
		}
	} else if (showOrHide == 55){ // hide Show button, show Hide button
		if (weekNo == 0){ // week 1
			for (var x = 1;x<4;x++){
				var getStart = "st" + x + "Row";
				var getEnd = "en" + x + "Row";
				var getTotal = "totalRow" + x;
				var startcol = document.getElementsByClassName(getStart);
				var endcol = document.getElementsByClassName(getEnd);
				var totalcol = document.getElementsByClassName(getTotal);
				var show = 'table-row';

				endcol[0].style.display = show;
				totalcol[0].style.display = show;
				rate[0].style.display = show;
				rateOT[0].style.display = show;
				rateOT2[0].style.display = show;

				hButt[0].style.display = show;
				sButt[0].style.display = 'none';

			}
		} else if (weekNo == 1){ // week 2
			for (var x = 1;x<4;x++){
				var getStart = "st" + x + "Row";
				var getEnd = "en" + x + "Row";
				var getTotal = "totalRow" + x;
				var startcol = document.getElementsByClassName(getStart);
				var endcol = document.getElementsByClassName(getEnd);
				var totalcol = document.getElementsByClassName(getTotal);
				var show = 'table-row';

				startcol[1].style.display = show;
				endcol[1].style.display = show;
				totalcol[1].style.display = show;	
				rate[0].style.display = show;
				rateOT[0].style.display = show;
				rateOT2[0].style.display = show;

				hButt[1].style.display = show;
				sButt[1].style.display = 'none';		
			}
		}
	}

}



