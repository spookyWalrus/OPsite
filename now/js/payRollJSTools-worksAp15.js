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
	zeroFields();
	weekIncomeTots = [];
	weekHoursTots = [];
	findDoubles(); // parse data for doubles, add columns if needed, set dates with columns
	setDates();

}
function otherPayroll(){
	var payData = JSON.parse(sessionStorage.getItem("payrollData"));
	for (var x=0;x<payData.length; x++){
		console.log(payData);
		var date = payData[x]['event_date'];
		// console.log(date);
		// splitSetDate(date,x); // old setDate function
		// setDates(date,x);
		// resetMarkers(date,x); // reset markers so they work with this page

		var eventName = payData[x]['event_name'];
		setEventName(eventName,x);
		var eventIn = payData[x]['event_location'];
		seteventIn(eventIn, x);
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

		console.log("End of set: " + x);
		// return;	
		// console.log(dayHoursIncome);
	}
	weekIncome(); // once week data is set, calculate weekly income
	weekHourCount(); // calculate weekly hours

}


// add adj. hours and adj.rate, add to total hours and total income (calculate when adj.rate is entered? button?)
	// >> set up arrays that collects total hours and total income and day marker (indices independent)
	// >> on click, parse through these arrays. if day marker matches with adjusted day, then calculate adj. income
	// then add hours and income to parsed values. display values. DONE DONE DONE
// >> adjust total hours/income for end of week and totals for whole pay period  DONE
	// How to add negative numbers to subtract hours/income?  DONE
	//>> add a REVERT button for each column for corrections  DONE
	//>>  REVERT should affect total week calculations too DONE

// 3b) set up sort strategy for events with same date 
	//>>(set two dates, two columns with same date?
	// >> if there are 2 same dates: double up day of the week, sort day by increase week by # of doubles 
		// >> output data but each  
// 3c) reset no. of columns + arrays etc for each search
		//>> split page so table is a separate php page
			// reload table page for each 'Search' click
			// check if there are doubles for data set
			// if doubles, add new columns
			// if no doubles, don't change anything

// 6) submit + save, >> also as pdf? excel? email text?
// 7) add button that toggles the start/end times and shows only total hours


// ........................... header functions ...............

// var markers = []; // array to know which column has data assigned to it
// function splitSetDate(date, index){
function resetMarkers(date, index){ // delete eventually, old function to set date
	var dateSearch  =  dateStart.options[dateStart.selectedIndex].value;
	var dateCol = document.getElementsByClassName('dateColumn');

	// array/object used to hold objects for columns/dates. made in other JS page
	// markerObj[x].date; 

	// var startDay = dateSearch.split('-');
	// var theDate = date;
	// var splitDate = theDate.split('-'); // date found from SQL
	// var i = index;
	// for (var x=0;x<v14;x++){
	// 	var testIt = +startDay[2] + +x;
	//  	if (splitDate[2] == testIt){
	//  		// dateCol[x].innerHTML = splitDate[2];
	//  		markers[i] = x; // set columns (days) that have data
	//  	} 
	//  	// dateCol[x].innerHTML = +startDay[2] + +x; // puts date with days of pay period
	// }
	// console.log('new markers: ',markers);


	// go through all dates
	// if date matches against array that contains all the double dates: print double date
	// if date doesn't match, print 'reguar' date
	// var isSameDay=0;
	// var testIt;
	// var workDay;
	// console.log(markers);
	// for (var x=0;x<v14;x++){
	// 	var testIt = +startDay[2] + +x;
	//  	if (splitDate[2] !== isSameDay){ // check if double dates exist. If NOT:
	// 	 	// dateCol[x].innerHTML = splitDate[2]; // puts date with days of pay period
	//  		dateCol[x].innerHTML = +startDay[2] + +x; // puts date with days of pay period
	//  		isSameDay = splitDate[2]; // set variable to check against next data set 
	//  	} else if (splitDate[2] == isSameDay){ // check if double dates exist. if YES:
	//  		dateCol[x].innerHTML = splitDate[2]; // puts date with days of pay period
	// }
		// if (splitDate[2] == testIt) { 
		//  		dateCol[x].innerHTML = splitDate[2]; // set date of reg work
		// 		isSameDay = splitDate[2]; // set variable to check double date
		// 		console.log(testIt, 'is reg date');
		// } else if (splitDate[2] == isSameDay){
	 // 		dateCol[x].innerHTML = splitDate[2]; // set date of reg work
		// 	console.log(splitDate[2], 'is double date');
		// }
		// } else if (testIt == workDay){
		//  	dateCol[x].innerHTML = splitDate[2]; // puts date with days of pay period
// 		isSameDay = splitDate[2]; // set variable to check against next data set 
		// }
	// }

	// var dateCol = document.getElementsByClassName('dateColumn');
 // 	isSameDay = 0;
	// for (var x=0;x<vv14;x++){ // set dates and display dates for each day
	//  	if (splitDate[2] !== isSameDay){
	// 	 	dateCol[x].innerHTML = +startDay[2] + +x; // puts date with days of pay period
	//  		isSameDay = splitDate[2]; // set variable to check against next data set 
	// 		continue;
	// 	} else if (splitDate[2] == isSameDay){
	// 	 	dateCol[x].innerHTML = splitDate[2]; // puts date with days of pay period
	// 	}
	// }

}

function setEventName(eventName,index){
	var eventName = eventName;
	var i = index;
	var eventCol = document.getElementsByClassName('eventCol');
	for (var x=0;x<v14;x++){
		if (x == markers[i]){
			eventCol[x].innerHTML = eventName; 
			return;
		}
	}

}
function seteventIn(eventInation,index){
	var eventInation = eventInation;
	var i = index;
	var eventIn = document.getElementsByClassName('eventIn');
	for (var x=0;x<v14;x++){
		if (x == markers[i]){
			eventIn[x].value = eventInation; 
			return;
		}
	}

}
function setEventCode(data,index){
	var eventData = data;
	var i = index;
	var column = document.getElementsByClassName('codeColumn');
	for (var x=0;x<v14;x++){
		if (x == markers[i]){
			column[x].value = eventData; 
			return;
		}
	}
}

var position; // variable to access position or role. Used to calculate wages down below
function setEventRole(data,index){
	var eventData = data; // data = position of staff
	var i = index;
	var column = document.getElementsByClassName('role');
	for (var x=0;x<v14;x++){
		if (x == markers[i]){
			column[x].value = eventData; 
			position = eventData;
			wageSet(eventData, i);
			return;
		}
	}
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
	for (var x=0;x<v14;x++){
		if ((role == 'SS') && x == markers[i]) {
			rateSet = 26; // set universal rate
			column[x].innerHTML = '$'+rateSet +'/hr';  // reg rate set
			column3[x].innerHTML = '$' +(rateSet*1.5) +'/hr'; // OT rate set
			column4[x].innerHTML = '$' +(rateSet*2) +'/hr'; // OT2 rate set
		}
		if ((role == 'HA' || role == 'HLX' || role == 'HR') && x == markers[i]) {
			rateSet = 20; // set universal rate
			column[x].innerHTML = '$'+rateSet +'/hr';  // reg rate set
			column3[x].innerHTML = '$' +(rateSet*1.5) +'/hr'; // OT rate set
			column4[x].innerHTML = '$' +(rateSet*2) +'/hr'; // OT2 rate set
		}
		if (role == 'ST' && (x == markers[i])) {
			rateSet = 18; // set universal rate
			column[x].innerHTML = '$'+rateSet +'/hr';  // reg rate set
			column3[x].innerHTML = '$' +(rateSet*1.5) +'/hr'; // OT rate set
			column4[x].innerHTML = '$' +(rateSet*2) +'/hr'; // OT2 rate set
		}
		if (role == 'USH' && (x == markers[i])) {
			rateSet = 13; // set universal rate
			column[x].innerHTML = '$'+rateSet +'/hr';  // reg rate set
			column3[x].innerHTML = '$' +(rateSet*1.5) +'/hr'; // OT rate set
			column4[x].innerHTML = '$' +(rateSet*2) +'/hr'; // OT2 rate set
		}
		if (role == 'SSIP' && (x == markers[i])) {
			rateSet = v14; // set universal rate
			column[x].innerHTML = '$'+rateSet +'/hr';  // reg rate set
			column3[x].innerHTML = '$' +(rateSet*1.5) +'/hr'; // OT rate set
			column4[x].innerHTML = '$' +(rateSet*2) +'/hr'; // OT2 rate set
		}
		if (role == 'FOH' && (x == markers[i])) {
			rateSet = v14; // set universal rate
			column[x].innerHTML = '$'+rateSet +'/hr';  // reg rate set
			column3[x].innerHTML = '$' +(rateSet*1.5) +'/hr'; // OT rate set
			column4[x].innerHTML = '$' +(rateSet*2) +'/hr'; // OT2 rate set
		}
		if ((role == 'na') && x == markers[i]) {
			rateSet = 0; // set universal rate
			column[x].innerHTML = '$'+rateSet +'/hr';  // reg rate set
			column3[x].innerHTML = '$' +(rateSet*1.5) +'/hr'; // OT rate set
			column4[x].innerHTML = '$' +(rateSet*2) +'/hr'; // OT2 rate set
		}
	}
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
	for (var x=0;x<v14;x++){
		if (x == markers[i]){
			column[x].innerHTML = eventData; 
			return;
		}
	}
}
function setEnd1(data,index){
	var eventData = data;
	var i = index;
	var column = document.getElementsByClassName('en1Col');
	for (var x=0;x<v14;x++){
		if (x == markers[i]){
			column[x].innerHTML = eventData; 
			return;
		}
	}
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
	for (var x=0;x<v14;x++){
		if (x == markers[i]){
			column[x].innerHTML = total; 
			hoursCollect[0]= total;
			// console.log(i +" is marker," +total +" is total");
			return;
		}
	}
}
function setStart2(data,index){ // block 2
	var eventData = data;
	var i = index;
	var column = document.getElementsByClassName('start2Col');
	for (var x=0;x<v14;x++){
		if (x == markers[i]){
			column[x].innerHTML = eventData; 
			return;
		}
	}
}
function setEnd2(data,index){
	var eventData = data;
	var i = index;
	var column = document.getElementsByClassName('en2Col');
	for (var x=0;x<v14;x++){
		if (x == markers[i]){
			column[x].innerHTML = eventData; 
			return;
		}
	}
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
	for (var x=0;x<v14;x++){
		if (x == markers[i]){
			column[x].innerHTML = total; 
			hoursCollect[1]= total;
			// console.log(i +" is marker," +total +" is total");
			return;
		}
	}
}
function setStart3(data,index){ // block 3
	var eventData = data;
	var i = index;
	var column = document.getElementsByClassName('start3Col');
	for (var x=0;x<v14;x++){
		if (x == markers[i]){
			column[x].innerHTML = eventData; 
			return;
		}
	}
}
function setEnd3(data,index){
	var eventData = data;
	var i = index;
	var column = document.getElementsByClassName('en3Col');
	for (var x=0;x<v14;x++){
		if (x == markers[i]){
			column[x].innerHTML = eventData; 
			return;
		}
	}
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
	for (var x=0;x<v14;x++){
		if (x == markers[i]){
			column[x].innerHTML = total; 
			hoursCollect[2]= total;
			// totalHoursMath(i); // trigger calculation of total hours 
			// return;
		}
	}
	// return;
}


// .................	 Calculate + display hours worked for Reg.rate, OT, OT2   ..............
var hoursSorted = []; // array for  hours worked sorted per category
// hoursCollect[0 - 2]  = array used to store total hours worked per block: blocks 1=[0],block2=[1], block3=[2]
//  weekHoursTots; == array used to store total week hours
var dayHoursIncome = {}; // object used to store total hours+income for each day, accessed for adj.hours/adj.income
// hoursSorted [0 - 4] = 0=marker,1=total,2=reg,3=OT,4=OT2
var oldHours = []; // array used to revert to original hours
function totalHoursMath(x){
	hoursSorted = []; // zero all values in array
	// weekHoursTots = [];

	var i = markers[x];
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
	var day = i; 
	dayHoursIncome[day]={}; // set up object with subset property, day is indices of nested object
	dayHoursIncome[[day]]['hours'] = totalHours; //set hours to be used for adj. hours/rate 
	oldHours[i] = dayHoursIncome[[day]]['hours']; // set original calculation for reverting adj.hours rate
	
	// display total hours worked for regular rate and OT, OT2, then set these hours in to hoursSorted array
	for (var y=0;y<v14;y++){ 
		if (totalHours < 9 && (y == i)){
			column[y].innerHTML = totalHours;
			column2[y].innerHTML = 0;
			column3[y].innerHTML = 0;	
			column4[y].innerHTML = totalHours;	
			hoursSorted[0] = markers[i];
			hoursSorted[1] = totalHours; // this is just reg hours
			hoursSorted[2] = 0;	
			hoursSorted[3] = 0;
			// hoursSorted[4] = totalHours;
			weekHoursTots[y] = totalHours;

		} else if ((totalHours > 8 && totalHours <= 12) && (y == i)){
			var otHrs = totalHours - 8;
			// var reghrs = totalHours - otHrs;
			column[y].innerHTML = 8;
			column2[y].innerHTML = otHrs;
			column3[y].innerHTML = 0;
			column4[y].innerHTML = totalHours;	
			hoursSorted[0] = markers[i];
			hoursSorted[1] = 8;
			hoursSorted[2] = otHrs;
			hoursSorted[3] = 0;
			// hoursSorted[4] = totalHours;
			weekHoursTots[y] = totalHours;
		} else if (totalHours > 12 && (y == i)){
			var ot2Hrs = totalHours - 12;
			// var reghrs = totalHours - otHrs;
			// var ot2Hrs = otHrs - 4;
			column[y].innerHTML = 8;
			column2[y].innerHTML = 4;
			column3[y].innerHTML = ot2Hrs;	
			column4[y].innerHTML = totalHours;	
			hoursSorted[0] = markers[i];
			hoursSorted[1] = 8;
			hoursSorted[2] = 4;
			hoursSorted[3] = ot2Hrs;
			// hoursSorted[4] = totalHours;
			weekHoursTots[y] = totalHours;
			// console.log(markers[i] +": marker, OT2 hours: " +hoursSorted[3]);
		}
		// console.log(weekHoursTots[y] + " is weekly totals, mark: " +markers[i]);

	}
	
}

// ..................   calculate income ..............................................
// var rateSet; // universal rate to be used for income calculation
// hoursSorted [0 - 4] = 0=marker,1=reg,2=OT,3=OT2,4=total hours per category
// hoursCollect[0 - 2]  = array used to store total hours worked per block: blocks 1=[0],block2=[1], block3=[2]
var weekIncomeTots = []; // array used to collect total income
var oldIncome = [];// array used to revert to original calculation
function incomeCalc(x)	{

	var i = markers[x]; // marker index
	var incomeTotal;
	var column = document.getElementsByClassName('inCol');
	var day = i; // variable used for object
	// for (var y=0;y<5;y++){
		// console.log(hoursSorted[y] +' hours for array index ' +y)
	// }
	// console.log(rateSet +' is the rate for this block');
	for (var x = 0;x<v14;x++){
		if (x == i){
			var regIncome = rateSet * hoursSorted[1];
			var otIncome = (rateSet * 1.5) * hoursSorted[2]; 
			var ot2Income = (rateSet * 2) * hoursSorted[3]; 
			incomeTotal = regIncome + otIncome + ot2Income;
			column[x].innerHTML = '$' +incomeTotal; // display total income

			weekIncomeTots[i] = incomeTotal; // set values for week income array, each index is day's income
			dayHoursIncome[[day]]['income'] = incomeTotal; // set day income into object, for adj.hours/rates 
			oldIncome[i] = dayHoursIncome[[day]]['income'];
		}
	}
	// weekHourCount(i);
	// return;
}

// ....................  weekIncome calculation  (called when all data sets are parsed)  .....................
var weekTotalIncome;  // array for week income total
var	week1;
var	week2;
function weekIncome(){
	var weekIn;
	var weekIn2;
	week1 = 0;
	week2 = 0;
	var column = document.getElementsByClassName('weekInTot');
	var column2 = document.getElementById('grandTotalIncome');
	for (var z=0;z<v14;z++){
		if (markers[z] !== undefined){
			var i = markers[z];
			// console.log(weekIncomeTots[i]);	
			// for (var x =0;x<weekIncomeTots.length;x++){
				if  (i < 8){
					weekIn = weekIncomeTots[i] + week1;
					week1 = weekIn;
				} else if (i > 7){
					weekIn2 = weekIncomeTots[i] + week2;
					week2 = weekIn2;
				}
		}
	}
	weekTotalIncome = week1 + week2;
	// console.log(week1 +" is week1, " + week2 + " is week2");
	column[0].innerHTML = '$' +week1;
	column[1].innerHTML = '$' +week2;
	// console.log("Total is: " + weekTotalIncome);
	column2.innerHTML = 'Total gross income for pay period: $'+weekTotalIncome;
	// console.log("Total week1 is: " + week1);
	// console.log("Total week2 is: " + week2);
	// console.log("Total is: " + weekTotalIncome);
	// return;

}
// ....................   week hour count (called when all data sets are parsed)  ....................
var weekTotalHours; // variable to set total week hours
function weekHourCount(){
	// var i = index;
	var weekIn;
	var weekIn2;
	var week1hrs=0;
	var week2hrs=0;
	// var weekTotals;
	var column = document.getElementsByClassName('weekGrTot');

	for (var x =0;x<15;x++){

		if ((x < 7)&&(weekHoursTots[x] !== undefined)) {
			// console.log([x] +" and array is: " +weekHoursTots[x]);
			weekIn = weekHoursTots[x] + week1hrs;
			week1hrs = weekIn;
		}
		if ((x > 6)&&(weekHoursTots[x] !== undefined)) {
		// console.log([x] +" and array is: " +weekHoursTots[x]);
		weekIn2 = weekHoursTots[x] + week2hrs;
		week2hrs = weekIn2;
		}
	}	
	weekTotalHours = week1hrs + week2hrs;
	column[0].innerHTML = week1hrs;
	// console.log(week1 +" is week1 total");
	// console.log(week2 +" is week2 total");
	column[1].innerHTML = week2hrs;
	// console.log(weekTotalHours +" is the pay period hour total");

}

// .....................  adjust hour and wage calculation  .........................
// var adjHr = 0; // variable used for totalHourMath() as well
// var adjIncome = 0; // variable used for incomeCalc() as well
// dayHoursIncome[[day]]['income'] = incomeTotal; // set day income into object, for adj.hours/rates 
// weekHoursTots    array of week hour totals
// week1 = hour totals for week 1
// week2 = hour totals for week 2
function adjRate(index){ // index received from button click

	var i = index;
	var column = document.getElementsByClassName('adjHrCol');
	var column2 = document.getElementsByClassName('wageAdjCol');
	var column3 = document.getElementsByClassName('grTotCol');
	var column4 = document.getElementsByClassName('inCol');

	var column5 = document.getElementsByClassName('weekInTot'); // income
	var column6 = document.getElementsByClassName('weekGrTot'); // hours
	var column7 = document.getElementById('grandTotalIncome');
	var hrIn = 0;
	var incmIn = 0;
	var adjHr;
	var adjRate;
	var adjIncome;
	var adjHours;
	var weekHours;

	hrIn = column[i].value;
	adjHr = parseInt(hrIn);
	// incmIn = column2[i].value;
	adjRate = column2[i].value;
	var nuRate = adjRate.replace(/$/g, '');
	adjIncome = adjHr * parseInt(nuRate); // new income with adjusted rate

	if (i == 7) {
		weekHours = 0;
		for (var x=0; x<7;x++){
			if (weekHoursTots[x] !== undefined){
			weekHours = weekHours + weekHoursTots[x]; // array values already set by totalHoursMath();
			}
		}
		adjHours = adjHr + weekHours; // array values set by totalHoursMath();
		console.log(adjHours + " is adjusted hours");
		column6[0].innerHTML = adjHours;

		// console.log(week1 + " is week1 income");
		week1 = week1 + adjIncome; // value of week1 is set by weekIncome();
		column5[0].innerHTML = '$'+ week1;
		console.log(week1 + " is nu week1 income, week hours is: " + adjHours);
	
		weekTotalIncome = week1 + week2;
		column7.innerHTML = 'Total gross income for pay period: $'+ weekTotalIncome;

 	}  else if (i == 15){
		weekHours = 0;
		for (var x=7; x<v14;x++){
			if (weekHoursTots[x] !== undefined){
			weekHours = weekHours + weekHoursTots[x]; // array values already set by totalHoursMath();
			}
		}
		adjHours = adjHr + weekHours; // array values set by totalHoursMath();
		console.log(adjHours + " is adjusted hours");
		column6[1].innerHTML = adjHours;

		// console.log(week2 + " is week2 income");
		week2 = week2 + adjIncome;  // value of week2 is set by weekIncome();
		column5[1].innerHTML = '$'+ week1;
		console.log(week2 + " is nu week2 income, week hours is: " +adjHours);

		weekTotalIncome = week1 + week2;
		column7.innerHTML = 'Total gross income for pay period: $'+weekTotalIncome;

	}	else {
		for (var x = 0;x<v14;x++){
			// console.log(dayHoursIncome[x]);
			var dHI = dayHoursIncome;
			for (var x in dHI) {
		        for (var key2 in dHI[x]) {
	  			  // console.log(x, key2, dHI[x][key2]); // (date marker, type, value)
		  			  // if ((x == markers[x])&&(key2 == 'income')){
		  			 if ((x == i)&&(key2 == 'income')){
		  			  	var nuIncome = dHI[x][key2] + adjIncome;
		  			  	// console.log(nuIncome + " is new income");
		  			  	column4[x].innerHTML = "$" + nuIncome; // display new income value
		  			  	column4[x].style.color = '#2b42f2'; // change color
		  			  	weekIncomeTots[i] = nuIncome;
						dayHoursIncome[[i]]['income'] = nuIncome;		  			   
		  			  // if ((x == markers[x])&&(key2 == 'hours')){
		  			} 
		  			if ((x == i)&&(key2 == 'hours')){
		  			  	var hours = parseInt(dHI[x][key2]);
		  			  	var nuHours = hours + adjHr;
					  	column3[x].innerHTML = nuHours;
		  			  	column3[x].style.color = '#00fff9';
		  			  	weekHoursTots[i] = nuHours; // set new values to object for
						dayHoursIncome[[i]]['hours'] = nuHours;	// set new values to object for continual re-calculation	  			  
	  			  	}
		    	}
			}
		}
		weekIncome();
		weekHourCount();
	}
	// return;
}

// fetch  total hours : weekHoursTots[i], each index = day
// fetch  total income of day: weekIncomeTots[i], each index = day
// var oldHours; // original hours calculation per day
// var oldIncome; // original income calculation per day	  	
function revert(index){ //index from button click
	var i = index;
	var column = document.getElementsByClassName('adjHrCol');
	var column2 = document.getElementsByClassName('wageAdjCol');
	var column3 = document.getElementsByClassName('grTotCol');
	var column4 = document.getElementsByClassName('inCol');

	column[i].value = '';
	column2[i].value = '';

	// console.log(oldHours[i], 'old hours'); 
	// console.log(oldIncome[i], 'old income');

	weekHoursTots[i] = oldHours[i];
	column3[i].innerHTML = weekHoursTots[i];
  	column3[i].style.color = '#ffffff';

	weekIncomeTots[i] = oldIncome[i]; 
	column4[i].innerHTML = weekIncomeTots[i];
  	column4[i].style.color = '#000000';

	// console.log(weekHoursTots[i], 'day hours reset');
	// console.log(weekIncomeTots[i], 'day income reset');
	weekIncome();  // recalculate weekly values....
	weekHourCount();
}




