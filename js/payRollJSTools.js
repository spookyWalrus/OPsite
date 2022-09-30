	// payRollJSTools.js


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

// 4) !!!  (May 16) when you choose a new role/position, it will recalculate wage + income   !!!!!
	// see July 27  DONE

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

//(july 2nd) Adjust() and Revert() functions need to get re-vamped?   DONE
	// Adjust() is not inclusive of changes made both weeks, doesn't add changes to grand total when changes to week 1
		// and week 2 are made
		//>>> ??? make an array or object that contains original and new wage/ hours per DAY and for week Totals
		// on each click, parse through object and make sure to add correct totals depending on which column is selected
			// for adjust() or revert()   >> might need to re-vamp week income/hour totals function ...?

// (july 27)  ALL DONE
	// when adjusting new role, need to check index coherence with week 2. 
		// check with markerObj. May need to sort for week2 and/or do some math

// (August 23)   
	// change 'event name' table cel to a field that can be changed/ edited...
	// If new event/ payment needs to be made on a blank date (a date that is not submitted as show report)
	// how to add adj.hrs/adj. income? >>>   The "GO" is set to not click if data is not present 
		// nope!!  make user fill out a show report if a major adjustment like that needs to be made
			// making show report is so easy so shouldn't be a hassle....

// (August 30)
	// teh auto change when selecting a new role for FOH manager gives an error.
		// also,  selecting '--' at the very top of the menu, should be unselectable? doesn't do anything?

// (Oct 15)  >> making excel sheet hardcopy/ saved doc:   DONE
	// need to calculate duration of breaks, to be submitted as part of time sheet excel doc only!!
		// >> subtract end time of block 1 from start time of block 2 etc etc for all time blocks

	// map out what data points are needed for excel sheet
	// extract / create object of data points via JS
		// probably already exists in payTots[] array, check and add what is missing
	// re-format as PHP object usable for Excel PHP script

//Nov 23
	// For show reports, if person doesn't exist in staff database, should throw up warning that he/she/it is not in database,
		// and needs an entry

// Dec 03
	// Need to revert data cel of Event name and Event location back to normal <div> NOT <input> so user cannot
		// change the data	

var dateStart = document.getElementById('fromHere');
var endDate;
var beginDate;
function add14days(){  // set up dates for searching start date
	var dateSearch  =  dateStart.options[dateStart.selectedIndex].value;
	beginDate = dateSearch;
	var newDate = dateSearch.split('-');
	var next2wks = +newDate[2] + +13;
	var checkDates = checkEndOfMonth(next2wks,'meh'); // check if date overlaps into next month
	// console.log(checkDates);
	newDate[2] = checkDates[0];

	if(newDate[2] >= 1){ // if overlaps, change to new month
		newDate[1] = checkDates[1];
	}else{
		newDate[1] = checkDates[1];
		newDate[2] = checkDates[2];
	}
	endDate = newDate.join('-');
	return endDate;
}

// var dateCol = document.getElementsByClassName('dateColumn');

// set variables for zeroing fields
// var field1 = document.getElementsByClassName('eventCol');
// var field2 = document.getElementsByClassName('eventIn');
// var field3 = document.getElementsByClassName('codeColumn');
// var field4 = document.getElementsByClassName('accntCol');
// var field5 = document.getElementsByClassName('role');
// var field6 = document.getElementsByClassName('start1Col');
// var field7 = document.getElementsByClassName('en1Col');
// var field8 = document.getElementsByClassName('totCol1');
// var field9 = document.getElementsByClassName('start2Col');
// var field10 = document.getElementsByClassName('en2Col');
// var field11 = document.getElementsByClassName('totCol2');
// var field12 = document.getElementsByClassName('start3Col');
// var field13 = document.getElementsByClassName('en3Col');
// var field14 = document.getElementsByClassName('totCol3');
// var field15 = document.getElementsByClassName('subTotHr');
// var field16 = document.getElementsByClassName('otHr');
// var field17 = document.getElementsByClassName('ot2Hr');
// var field18 = document.getElementsByClassName('grTotCol');
// var field19 = document.getElementsByClassName('rateCol');
// var field20 = document.getElementsByClassName('inCol');
// var field21 = document.getElementsByClassName('OTrateCol');
// var field22 = document.getElementsByClassName('OT2rateCol');
// var field23 = document.getElementsByClassName('adjHrCol');
// var field24 = document.getElementsByClassName('wageAdjCol');

let field = ['eventCol','eventIn','codeColumn','codeColumn','accntCol','role','start1Col','en1Col','totCol1','start2Col','en2Col','totCol2','start3Col','en3Col','totCol3','subTotHr','otHr','ot2Hr','grTotCol','rateCol','inCol','OTrateCol','OT2rateCol','adjHrCol','wageAdjCol'];

function zeroFields(){ // zero all fields before setting data 
	console.log('v14 = ',v14);
	for (var x=1;x<field.length; x++){
	 	// var row = window['field'+[x]];
	 	console.log('x is: ',field[x]);
	 	let row = document.getElementsByClassName(`'${x}'`);
	 	console.log('row is: ',row);
	 	if (x == 1){
	 		for (var y=0;y<v14;y++){
	 			console.log('x=1,row y at: ',row[y]);
	 			row[y].innerHTML = '';		
	 		} 
		} else if (x > 1 && x < 4){
	 		for (var y=0;y<v14;y++){
	 			console.log('1>x<4,row y at: ',row[y]);
	 			row[y].value = '';		
	 		} 
 		
 		} else if (x == 5){
	 			for (var y=0;y<v14;y++){
	 			row[y].value = "--";
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
	console.log('fields zeroed');
	sortPayroll();
}

var weekHoursTots; // array used to collect total hours for week calculation
// ..............  main function to sort data retrieved by Jax page, outputs to display  ...............
var payData; // variable to set retrieved data from SQL query
// var markerObj;
function sortPayroll(){
	// zeroFields();
	weekIncomeTots = [];
	weekHoursTots = [];
	findDoubles(); // parse data for doubles, add columns if needed, set dates with columns
	// setDates();
// }
// function otherPayroll(){
	payData = JSON.parse(sessionStorage.getItem("payrollData"));
	markerObj = JSON.parse(sessionStorage.getItem('theMarkerObj'));
	// console.log('in payRollJSTools, markerObj: ',markerObj);

	for (var x=0;x<payData.length; x++){

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

	}
	weekIncome(); // once week data is set, calculate weekly income
	weekHourCount(); // calculate weekly hours
	checkHrInTotsObject(); // function found in payRollIncomeAdjust.js page
	// hideHours(33,0);
	// hideHours(33,1);
	// makeHrInTotsObject();

}

// ........................... header functions ...............

// function splitSetDate(date, index){
function resetMarkers(date, index){ // delete eventually, old function to set date
	var dateSearch  =  dateStart.options[dateStart.selectedIndex].value;
	var dateCol = document.getElementsByClassName('dateColumn');
}

function setEventName(nameOfEvent,index){
	var eventName = nameOfEvent;
	var i = index;
	var eventCol = document.getElementsByClassName('eventCol');
	eventCol[markerObj[i].col].innerHTML= nameOfEvent;
}

function seteventLoc(eventVenue,index){
	var eventLoc = eventVenue;
	var i = index;
	var eventIn = document.getElementsByClassName('eventLoc');
	eventIn[markerObj[i].col].innerHTML = eventLoc; 
}

function setEventCode(data,index){
	var eventData = data;
	var i = index;
	var column = document.getElementsByClassName('codeInput');
	column[markerObj[i].col].value = eventData; 
}

var position; // variable to access position or role. Used to calculate wages down below
function setEventRole(data,index){
	var eventData = data; // data = position of staff
	var i = index;
	var column = document.getElementsByClassName('role');
	
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

		if (role == 'SS'){
			rateSet = 26; // set universal rate
			column[markerObj[i].col].innerHTML = '$'+rateSet +'/hr';  // reg rate set
			column3[markerObj[i].col].innerHTML = '$' +(rateSet*1.5) +'/hr'; // OT rate set
			column4[markerObj[i].col].innerHTML = '$' +(rateSet*2) +'/hr'; // OT2 rate set
		}
		if (role == 'HA' || role == 'HLX' || role == 'HR') {
			rateSet = 20; // set universal rate
			column[markerObj[i].col].innerHTML = '$'+rateSet +'/hr';  // reg rate set
			column3[markerObj[i].col].innerHTML = '$' +(rateSet*1.5) +'/hr'; // OT rate set
			column4[markerObj[i].col].innerHTML = '$' +(rateSet*2) +'/hr'; // OT2 rate set
		}
		if (role == 'ST') {
			rateSet = 18; // set universal rate
			column[markerObj[i].col].innerHTML = '$'+rateSet +'/hr';  // reg rate set
			column3[markerObj[i].col].innerHTML = '$' +(rateSet*1.5) +'/hr'; // OT rate set
			column4[markerObj[i].col].innerHTML = '$' +(rateSet*2) +'/hr'; // OT2 rate set
		}
		if (role == 'USH') {
			rateSet = 13; // set universal rate
			column[markerObj[i].col].innerHTML = '$'+rateSet +'/hr';  // reg rate set
			column3[markerObj[i].col].innerHTML = '$' +(rateSet*1.5) +'/hr'; // OT rate set
			column4[markerObj[i].col].innerHTML = '$' +(rateSet*2) +'/hr'; // OT2 rate set
		}
		if (role == 'SSIP') {
			rateSet = 15; // set universal rate
			column[markerObj[i].col].innerHTML = '$'+rateSet +'/hr';  // reg rate set
			column3[markerObj[i].col].innerHTML = '$' +(rateSet*1.5) +'/hr'; // OT rate set
			column4[markerObj[i].col].innerHTML = '$' +(rateSet*2) +'/hr'; // OT2 rate set
		}
		if (role == 'FOH') {
			rateSet = 15; // set universal rate
			column[markerObj[i].col].innerHTML = '$'+rateSet +'/hr';  // reg rate set
			column3[markerObj[i].col].innerHTML = '$' +(rateSet*1.5) +'/hr'; // OT rate set
			column4[markerObj[i].col].innerHTML = '$' +(rateSet*2) +'/hr'; // OT2 rate set
		}
		if (role == 'na') {
			rateSet = 0; // set universal rate
			column[markerObj[i].col].innerHTML = '$'+rateSet +'/hr';  // reg rate set
			column3[markerObj[i].col].innerHTML = '$' +(rateSet*1.5) +'/hr'; // OT rate set
			column4[markerObj[i].col].innerHTML = '$' +(rateSet*2) +'/hr'; // OT2 rate set
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
	return frac;
}

function setStart1(data,index){ // block 1
	var eventData = data;
	var i = index;
	var column = document.getElementsByClassName('start1Col');
	
	column[markerObj[i].col].innerHTML = eventData; 
}

function setEnd1(data,index){
	var eventData = data;
	var i = index;
	var column = document.getElementsByClassName('en1Col');
	
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
		}
	}
	var i = index;
	var column = document.getElementsByClassName('totCol1');
	
	column[markerObj[i].col].innerHTML = total; 
	hoursCollect[0]= total;
}

function setStart2(data,index){ // block 2
	var eventData = data;
	var i = index;
	var column = document.getElementsByClassName('start2Col');
	
	column[markerObj[i].col].innerHTML = eventData; 

}

function setEnd2(data,index){
	var eventData = data;
	var i = index;
	var column = document.getElementsByClassName('en2Col');
	
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

	column[markerObj[i].col].innerHTML = total; 
	hoursCollect[1]= total;
}

function setStart3(data,index){ // block 3
	var eventData = data;
	var i = index;
	var column = document.getElementsByClassName('start3Col');
	
	column[markerObj[i].col].innerHTML = eventData; 

}

function setEnd3(data,index){
	var eventData = data;
	var i = index;
	var column = document.getElementsByClassName('en3Col');

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

	column[markerObj[i].col].innerHTML = total; 
	hoursCollect[2]= total;
}


// .................	 Calculate + display hours worked for Reg.rate, OT, OT2   ..............
var hoursSorted = []; // array for  hours worked sorted per category
// hoursCollect[0 - 2]  = array used to store total hours worked per block: blocks 1=[0],block2=[1], block3=[2]
//  weekHoursTots; == array used to store total week hours
var dayHoursIncome = {}; // object used to store total hours+income for each day, accessed for adj.hours/adj.income
// hoursSorted [0 - 4] = 0=marker,1=total,2=reg,3=OT,4=OT2
var oldHours = []; // array used to revert to original hours
var hoursNow = []; //used to set updated values in hrInTotsObject
function totalHoursMath(index){
	hoursSorted = []; // zero all values in array
	var y = index;
	var column = document.getElementsByClassName('subTotHr');
	var column2 = document.getElementsByClassName('otHr');
	var column3 = document.getElementsByClassName('ot2Hr');
	var column4 = document.getElementsByClassName('grTotCol');

	var totalHours = 0;
	for (var x=0;x<3;x++){
		if (hoursCollect[x] == 'na'){
			hoursCollect[x] = 0;
		}
	}

	totalHours = hoursCollect[0] + hoursCollect[1] + hoursCollect[2]; // total hours worked in the day
	// console.log('totalHoursMatrs: ',totalHours,hoursCollect[0],hoursCollect[1], hoursCollect[2]); // total hours worked in the day
	hoursNow = [totalHours,index]; // set values to be used in hrInTotsObject in paryRollIncomeAdjust.js

	var day = y; 
	dayHoursIncome[day]={}; // set up object with subset property, day is indices of nested object
	dayHoursIncome[[day]]['hours'] = totalHours; //set hours to be used for adj. hours/rate 
	oldHours[y] = dayHoursIncome[[day]]['hours']; // set original calculation for reverting adj.hours rate
	
	// display total hours worked for regular rate and OT, OT2, then set these hours in to hoursSorted array
		if (totalHours < 9){
			column[markerObj[y].col].innerHTML = totalHours;
			column2[markerObj[y].col].innerHTML = 0;
			column3[markerObj[y].col].innerHTML = 0;	
			column4[markerObj[y].col].innerHTML = totalHours;	
			hoursSorted[0] = markerObj[y].date;
			hoursSorted[1] = totalHours; // this is just reg hours
			hoursSorted[2] = 0;	
			hoursSorted[3] = 0;
			weekHoursTots[y] = totalHours;

		} else if (totalHours > 8 && totalHours <= 12){
			var otHrs = totalHours - 8;
			column[markerObj[y].col].innerHTML = 8;
			column2[markerObj[y].col].innerHTML = otHrs;
			column3[markerObj[y].col].innerHTML = 0;
			column4[markerObj[y].col].innerHTML = totalHours;	
			hoursSorted[0] = markerObj[y].date;
			hoursSorted[1] = 8;
			hoursSorted[2] = otHrs;
			hoursSorted[3] = 0;
			weekHoursTots[y] = totalHours;
		} else if (totalHours > 12){
			var ot2Hrs = totalHours - 12;
			column[markerObj[y].col].innerHTML = 8;
			column2[markerObj[y].col].innerHTML = 4;
			column3[markerObj[y].col].innerHTML = ot2Hrs;	
			column4[markerObj[y].col].innerHTML = totalHours;	
			hoursSorted[0] = markerObj[y].date;
			hoursSorted[1] = 8;
			hoursSorted[2] = 4;
			hoursSorted[3] = ot2Hrs;
			weekHoursTots[y] = totalHours;
		}
	
}

// ..................   calculate income ..............................................
// var rateSet; // universal rate to be used for income calculation
// hoursSorted [0 - 4] = 0=marker,1=reg,2=OT,3=OT2,4=total hours per category
// hoursCollect[0 - 2]  = array used to store total hours worked per block: blocks 1=[0],block2=[1], block3=[2]
var weekIncomeTots = []; // array used to collect total income
var oldIncome = [];// array used to revert to original calculation
var incomeNow = []; // updating hrInTotsObject refers to this to update its  values in payRollIncomeAdjust.js
function incomeCalc(index)	{

	var i = index;

	var incomeTotal;
	var column = document.getElementsByClassName('inCol');
	var day = i; // variable used for object

	var regIncome = rateSet * hoursSorted[1];
	var otIncome = (rateSet * 1.5) * hoursSorted[2]; 
	var ot2Income = (rateSet * 2) * hoursSorted[3]; 
	incomeTotal = regIncome + otIncome + ot2Income;
	// console.log('income math: ',incomeTotal, regIncome, otIncome, ot2Income);
	column[markerObj[i].col].innerHTML = '$' +incomeTotal; // display total income
	incomeNow = [incomeTotal,index]; // set values to update hrInTotObject
	weekIncomeTots[i] = incomeTotal; // set values for week income array, each index is day's income
	dayHoursIncome[[day]]['income'] = incomeTotal; // set day income into object, for adj.hours/rates 
	oldIncome[i] = dayHoursIncome[[day]]['income'];
}

// ....................  weekIncome calculation  (called when all data sets are parsed)  .....................
var weekTotalIncome;  // array for week income total
var	week1Inc;
var	week2Inc;
function weekIncome(nuWeekValue,weekNo){
	
	week1Inc = 0;
	week2Inc = 0;
	var nuWkIn;

	if ((nuWeekValue !== 0) && (nuWeekValue)){ 
		nuWkIn = parseFloat(nuWeekValue); // variable to check if week Total values are adjusted
	} else if ((nuWeekValue == 0)||(!nuWeekValue)){
		nuWkIn = 0;
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
	if(markerObj !== null){
		for (var z=0;z<markerObj.length;z++){ // refer to work days in markers
				if (markerObj[z].date <= week1End){
					week1Inc = weekIncomeTots[z] + week1Inc;
				} else if (markerObj[z].date > week1End){
					week2Inc = weekIncomeTots[z] + week2Inc;
				}
		}
	}


	if (nuWkIn > 0){
		weekTotalIncome = week1Inc + week2Inc + nuWkIn;
		
		if (week == 0){
			column[0].innerHTML = '$' + (parseFloat(week1Inc) + nuWkIn);
		  	column[0].style.color = '#2b42f2'; // change color
			column[1].innerHTML = '$' + parseFloat(week2Inc);
			nuTotIn.innerHTML = '$'+weekTotalIncome;		
			nuTotIn.style.color = '#2b42f2';		
		} else if (week == 1){
			column[0].innerHTML = '$' + parseFloat(week1Inc);
			column[1].innerHTML = '$' + (parseFloat(week2Inc) + nuWkIn);
		  	column[1].style.color = '#2b42f2'; // change color
			nuTotIn.innerHTML = '$'+weekTotalIncome;		
			nuTotIn.style.color = '#2b42f2';
		}
	} else if (nuWkIn == 0){
		weekTotalIncome = week1Inc + week2Inc;
		column[0].innerHTML = '$' + parseFloat(week1Inc);
		column[1].innerHTML = '$' + parseFloat(week2Inc);
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
		nuWkHr = parseFloat(nuWeekHours); // variable to check if week Total values are adjusted
	} else if ((!nuWeekHours)||(nuWeekValue == 0)){ // reg day adjust
		nuWkHr = 0;
		week1hrs = 0;
		week2hrs = 0;
	}
	var week = weekNo;
	var column = document.getElementsByClassName('weekGrTot');
	var dateSearch  =  dateStart.options[dateStart.selectedIndex].value;
	var datesplit = dateSearch.split('-');
	var startDay = parseInt(datesplit[2]);
	var week1End = startDay + 6;
	var week2Start = startDay + 7;
	var week2End = startDay + 13;
	
	if (nuWkHr !== 0){ // weekend total adjust
		weekTotalHours = week1hrs + week2hrs + nuWkHr;
		
		if (week == 0){ // week 1 adjust
			var nuweekEnd = week1hrs + nuWkHr;
			column[0].innerHTML = nuweekEnd;
		  	column[0].style.color = '#00fff9';
			column[1].innerHTML = week2hrs;
		
		} else if (week == 1){ // week 2 adjust
			var nuweekEnd = week2hrs + nuWkHr;
			column[0].innerHTML = week1hrs;
			column[1].innerHTML = nuweekEnd;
		  	column[1].style.color = '#00fff9';

		}
	} else if (nuWkHr == 0){
		for (var z=0;z<markers.length;z++){ // refer to work days in markers
			if (markerObj[z].date <= week1End){
				week1hrs = parseFloat(weekHoursTots[z] + week1hrs);
			} else if (markerObj[z].date > week1End){
				week2hrs = parseFloat(weekHoursTots[z] + week2hrs);
			}
		}
		weekTotalHours = week1hrs + week2hrs;
		column[0].innerHTML = week1hrs;
	  	column[0].style.color = '#ffffff';
		column[1].innerHTML = week2hrs ;
	  	column[1].style.color = '#ffffff';

	}
}

// .....................  adjust hour and wage calculation  .........................

// dayHoursIncome[[day]]['income'] = incomeTotal; // set day income into object, for adj.hours/rates 
// weekHoursTots    array of week hour totals
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
	var i = parseInt(index);
	var wk = week;
	var hrIn = 0;
	var incmIn = 0;
	var adjHr;
	var adjRate;
	var adjIncome;
	var adjHours;
	var weekHours;
	var w1D = ((totalDays-2)-dubWeek2)-7; // math to figure out if week 1
	var w2D = totalDays-1; // math to figure if week 2
	var w1;
	var w2;
	if (doublesNo > 0){  // set weekend totals index to check against clicked index
		w1 = w1D;
		w2 = w2D;
	} else if (doublesNo == 0){
		w1 = 7;
		w2 = 15;
	}

	hrIn = column[i].value;
	adjHr = parseFloat(hrIn);

	adjRate = column2[i].value;
	var nuRate = adjRate.replace(/$/g, '');
	adjIncome = adjHr * parseFloat(nuRate); // new income with adjusted rate

	var add = 'add'; // used to check button clicked status...
	checkClick(i,wk,adjHr,adjIncome,add); // check if button already clicked: payRollIncomeAdjust.js

	if (notAWorkDay == 'yes'){  // variable set in revert() function: payRollIncomeAdjust.js
		// console.log('not a work day, erasing input fields');
		column[i].value = ''; // set input fields to blank
		column2[i].value = '';
	}

	if (addedAlreadyYN =='no'){
	// console.log('week1tots hr,inc: ',w1HT,w1InT);
	// console.log('week2tots hr,inc: ',w2HT,w2InT);
	console.log('index is: ',i);
	console.log('index of w1tots and w2tots: ',w1, w2);

		if (wk == 0){ // week 1
			if (i == w1 ){ // week1 total only
				wk1Hr.innerHTML = w1HT; // nuWT value: adjusted week total hours
				wk1Hr.style.color = '#00fff9';
				wk1In.innerHTML = '$' + w1InT; // nuIT value: adjusted week total income
				wk1In.style.color = '#2b42f2';
				column7.innerHTML = '$' + grandIncomeTotal;
				column7.style.color = '#2b42f2';
				// console.log('adjusting week1 tots only');
				// console.log('hr, income,grand total: ',w1HT, w1InT,grandIncomeTotal);
			} else if (i !== w1){ // work day and week1 total
				column3[i].innerHTML = adjustedValues[0]; // day hours total
				column3[i].style.color = '#00fff9';
				column4[i].innerHTML = '$' + adjustedValues[1]; // day income total
				column4[i].style.color = '#2b42f2';

				wk1Hr.innerHTML = w1HT; // nuWT value: adjusted week total hours
				wk1Hr.style.color = '#00fff9';
				wk1In.innerHTML = '$' + w1InT; // nuIT value: adjusted week total income
				wk1In.style.color = '#2b42f2';
				column7.innerHTML = '$' + grandIncomeTotal;
				column7.style.color = '#2b42f2';
				// console.log('adjusting reg work day and week1 tots');
				// console.log('hr, income,grand total: ',w1HT, w1InT,grandIncomeTotal);
				console.log('week1tots hr,inc: ',w1HT,w1InT);

			}
		} else if (wk == 1){
			if (i == w2){ // week2s total only
				wk2Hr.innerHTML = w2HT; // nuWT value: adjusted week total hours
				wk2Hr.style.color = '#00fff9';
				wk2In.innerHTML = '$' + w2InT; // nuIT value: adjusted week total income
				wk2In.style.color = '#2b42f2';
				column7.innerHTML = '$' + grandIncomeTotal;
				column7.style.color = '#2b42f2';
				// console.log('adjusting week2 tots only');
			} else if (i !== w2){ // work day and week2 total
				i = i - 1;
				console.log('i is: ',i);
				column3[i].innerHTML = adjustedValues[0]; // day hours total
				column3[i].style.color = '#00fff9';
				column4[i].innerHTML = '$' + adjustedValues[1]; // day income total
				column4[i].style.color = '#2b42f2';

				wk2Hr.innerHTML = w2HT; // nuWT value: adjusted week total hours
				wk2Hr.style.color = '#00fff9';
				wk2In.innerHTML = '$'+  w2InT; // nuIT value: adjusted week total income
				wk2In.style.color = '#2b42f2';
				column7.innerHTML = '$' + grandIncomeTotal;
				column7.style.color = '#2b42f2';	
				// console.log('adjusting reg work day and week2 tots');
				console.log('week2tots hr,inc: ',w2HT,w2InT);

			}
		}	
		// console.log('grandIncomeTotal is: ',grandIncomeTotal);

	}
}

function revert(index,week){

	var i = index;
	// var wk = week;
	var rev = 'rev';
	var a = 'blah'; // place holder variables to make checkClick() work properly....
	var b = 'blah'; // place holder variables to make checkClick() work properly....
	
	checkClick(index, week,a,b, rev); // function to check if button clicked: payRollIncomeAdjust.js
	// return indexWeek;

}

function revertResult(index, week){
// 	test(index,week);
	var i = index;
	// var week = indexWeek[1];
	column[i].value = ''; // set input fields to blank
	column2[i].value = '';
	var w1D = ((totalDays-2)-dubWeek2)-7; // math to figure out if week 1
	var w2D = totalDays-1; // math to figure if week 2
	var w1;
	var w2;

	if (doublesNo > 0){  // set weekend totals index to check against clicked index
		w1 = w1D;
		w2 = w2D;
	} else if (doublesNo == 0){
		w1 = 7;
		w2 = 15;
	}

	
	if (revertAlreadyYN == 'no'){
		if (week == 0){ // week 1
			if (i == w1){ // week1 total only
				wk1Hr.innerHTML = w1HT; // nuWT value: adjusted week total hours
				wk1In.innerHTML = '$'+w1InT; // nuIT value: adjusted week total income
				column7.innerHTML = '$'+grandIncomeTotal;

				if (anyChangesWk1 == 'orig'){
				wk1Hr.style.color = '#ffffff';
				wk1In.style.color = '#000000';
				}
				if ((anyChangesWk1 =='orig')&&(anyChangesWk2 == 'orig')){ // check for week tots colours
					column7.style.color = '#000000';		
				}
				console.log('week1 tots reverting');
			} else if (i !== w1){ // work day and week1 total
				// console.log('i for targeting column is: ',i);
				console.log('adjusted values are for week1 workday: ',adjustedValues);
				column3[i].innerHTML = adjustedValues[0]; // day hours total
				column3[i].style.color = '#ffffff';
				column4[i].innerHTML = '$'+adjustedValues[1]; // day income total
				column4[i].style.color = '#000000';

				wk1Hr.innerHTML = w1HT; // nuWT value: adjusted week total hours
				wk1In.innerHTML = '$' + w1InT; // nuIT value: adjusted week total income
				column7.innerHTML = '$' + grandIncomeTotal;

				if (anyChangesWk1 == 'orig'){
					wk1Hr.style.color = '#ffffff';
					wk1In.style.color = '#000000';
				} 

				if ((anyChangesWk1 =='orig')&&(anyChangesWk2 == 'orig')){ // check for week tot colours
					column7.style.color = '#000000';		
				}
				// console.log('work day and week1 reverting');
			}

		} else if (week == 1){
			if (i == w2){ // week2s total only
				wk2Hr.innerHTML = w2HT; // nuWT value: adjusted week total hours
				wk2In.innerHTML = '$'+w2InT; // nuIT value: adjusted week total income
				column7.innerHTML = '$'+grandIncomeTotal;

				if (anyChangesWk2 == 'orig'){
					wk2Hr.style.color = '#ffffff';
					wk2In.style.color = '#000000';
					} 
				if ((anyChangesWk1 =='orig')&&(anyChangesWk2 == 'orig')){
					column7.style.color = '#000000';		
				}
				// console.log('week2 tots reverting');
			} else if (i !== w2){ // work day and week2 total
				i = i - 1;
				// console.log('i for targeting week2 column is: ',i);
				// console.log('wk2Hr and wk2InT is: ',wk2Hr, w2InT);
				column3[i].innerHTML = adjustedValues[0]; // day hours total
				column3[i].style.color = '#ffffff';
				column4[i].innerHTML = '$'+adjustedValues[1]; // day income total
				column4[i].style.color = '#000000';
				wk2Hr.innerHTML = w2HT;// nuWT value: adjusted week total hours
				wk2In.innerHTML = '$'+w2InT; // nuIT value: adjusted week total income
				column7.innerHTML = '$'+grandIncomeTotal;

				if (anyChangesWk2 == 'orig'){
					// console.log('week2tot now going back to: ',anyChangesWk2);
					wk2Hr.style.color = '#ffffff';
					wk2In.style.color = '#000000';
					} 
				if ((anyChangesWk1 =='orig')&&(anyChangesWk2 == 'orig')){
					column7.style.color = '#000000';		
				}
				// console.log('work day and week2 reverting');

			}
		}
		// console.log('grandIncomeTotal is: ',grandIncomeTotal);
	}
}
	

function hideHours(showhide,weekNo){ // hides hours button, on click from payRollpg1.php and pg2
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

				startcol[0].style.display = show;
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
				rate[1].style.display = show;
				rateOT[1].style.display = show;
				rateOT2[1].style.display = show;

				hButt[1].style.display = show;
				sButt[1].style.display = 'none';		
			}
		}
	}

}


function roleChange(index) {
	// console.log('index is: ',index);
	// console.log(markerObj);
     // console.log(hrInTotsObj);
     console.log('markerObj: ',markerObj,' index: ',index);
	var z = index;
    var nuRole = document.getElementsByClassName("role")[index];
    var selectedValue = nuRole.options[nuRole.selectedIndex].value;
    var x; // set index to parse through payData for below functions
    var week;
    for (var y=0;y<markerObj.length;y++){
    	if(index == markerObj[y].col){ // if clicked index matches col of markerObj,
     		// x = y;  // the index of markerObj is used to parse payData 
     		if(markerObj[y].week == 'week1'){
     			week = 0;
     		}else if (markerOb[y].week == 'week2'){
     			week = 1;
     		}
     		x = y;  // the index of markerObj is used to parse payData 
     	break;
     	}
     }
     revert(index,week);
     setEventRole(selectedValue,x);
     document.getElementsByClassName('adjHrCol')[index].value = '';
     document.getElementsByClassName('wageAdjCol')[index].value = '';
	goBlinky(index);
	setTimeout(recalcTots,1500,x);
 }

 function recalcTots(x){ // re-calculate income
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

 	totalHoursMath(x);
    incomeCalc(x);
    weekIncome(); // once week data is set, calculate weekly income
	weekHourCount(); // calculate weekly hours
	checkHrInTotsObject(x); // update hrInTotsObject
 } 

var target,target2,target3,target4,target5;
  function goBlinky(index){
  	target = document.getElementsByClassName('rateCol')[index].classList.add('blink'); // add blinking css
  	target2 = document.getElementsByClassName('OTrateCol')[index].classList.add('blink'); // add blinking css
  	target3 = document.getElementsByClassName('OT2rateCol')[index].classList.add('blink'); // add blinking css
  	// console.log('blinkin on!! index: ',index);
  	setTimeout(blinkyOff,700,index); //triger remove bliking css after 3s

  }
  function blinkyOff(index){
  	// console.log('blinky off, index: ',index);
	target = document.getElementsByClassName('rateCol')[index].classList.remove('blink'); // add blinking css
  	target2 = document.getElementsByClassName('OTrateCol')[index].classList.remove('blink'); // add blinking css
  	target3 = document.getElementsByClassName('OT2rateCol')[index].classList.remove('blink'); // add blinking css
  	goBlinky2(index);
  }
   function goBlinky2(index){
  	target4 = document.getElementsByClassName('grTotCol')[index].classList.add('blink'); // add blinking css
  	target5 = document.getElementsByClassName('inCol')[index].classList.add('blink'); // add blinking css
 	setTimeout(blinkyOff2,700,index); //triger remove bliking css after 3s
  }
	function blinkyOff2(index){
  	// console.log('blinky off, index: ',index);
  		target4 = document.getElementsByClassName('grTotCol')[index].classList.remove('blink'); // add blinking css
  		target5 = document.getElementsByClassName('inCol')[index].classList.remove('blink'); // add blinking css
 		setTimeout(blinkWeekTots,100,index);
	}
	function blinkWeekTots(index){
		for (var x=0;x<markerObj.length;x++){
		  	if(markerObj[x].col == index){
		  		if(markerObj[x].week == 'week1'){
			  	target6 = document.getElementById('week1HrTot').classList.add('blink');
		  		target7 = document.getElementById('wk1InTot').classList.add('blink');
				}else if(markerObj[x].week == 'week2'){	  	
			  	target6 = document.getElementById('week2HrTot').classList.add('blink');
		  		target7 = document.getElementById('wk2InTot').classList.add('blink');
		  		}
		  	}
		}
 		setTimeout(blinkOffWeekTots,700,index);

	}
	function blinkOffWeekTots(index){
	  	for (var x=0;x<markerObj.length;x++){
		  	if(markerObj[x].col == index){
	  			if(markerObj[x].week == 'week1'){
				  	target6 = document.getElementById('week1HrTot').classList.remove('blink');
	  				target7 = document.getElementById('wk1InTot').classList.remove('blink');
				}else if(markerObj[x].week == 'week2'){	  	
			  	target6 = document.getElementById('week2HrTot').classList.remove('blink');
	  			target7 = document.getElementById('wk2InTot').classList.remove('blink');
				}
			}
	  	}
	}

// when script finishes loading, execute hide sections of the table
function hideTables(){
	var startcol = document.getElementsByClassName('st1Row')[0];
	if(typeof(startcol) !='undefined' && (typeof(startcol) != 'null')){
	// if (document.readyState === 'complete'){	// if (startcol){
		hideHours(33,0);
		hideHours(33,1);
	} else {
		console.log('startcol not set, trying again');
		if(startcol){
			hideHours(33,0);
			hideHours(33,1);
		}
	  	// setTimeout(hideTables(),100); 
		// if (document.readyState === 'complete'){
		// 	hideTables();
		// }
	}
	// }
}
// window.onload = hideTables();
// document.addEventListener("DOMContentLoaded", hideTables());

// window.onload = alert("unicornkittycupcakefacepandabuttttmoonsparkpro ofroblox mhahahaha i'msooooo smart! i loveicecream! ihavelongggggggggggggggggg h");



// ---------------------  everything below this is for submitting finalized data ------------------
// ---------------------  everything below this is for submitting finalized data ------------------
// ---------------------  everything below this is for submitting finalized data ------------------
	


var checkThis;
function getCheckRecordInfo(){
	var obj = {};
	checkThis = [];
	obj.staffName = userName;
	obj.start_Date = beginDate;
	obj.end_Date = endDate;
	checkThis[0] = obj;

}

var weekTotalsAry =[];  // totals for weeks and total income...  is this needed?
var payRollTotals = {};
var payRollTotalsAry = [];
var payTots;

function getFinalData(){
	// var totals = [wk1Hr.innerText,wk2Hr.innerText,wk1In.innerText,wk2In.innerText,column7.innerText];
	// console.log('markerOBj: ',markerObj);
	// console.log('hrInTotsObj:',hrInTotsObj);
	// console.log('payData');
	// console.log(beginDate);
	var weekOnlyTots = (hrInTotsObj.length) - 2;
	// console.log(weekOnlyTots);
	
	payTots = []; // clear out previous data

	var accntCode = document.getElementsByClassName('accntInput'); // get account code from html page


	for (var x = 0;x<markerObj.length;x++){
		var eventName = payData[x]['event_name'];
		// console.log('event name: ',eventName);
		var eventLoc = payData[x]['event_location'];
		var eventCode = payData[x]['event_code'];
		// var eventName = document.getElementsByClassName('evNameIn');
		// var eventLoc = document.getElementsByClassName('eventIn');
		// var eventCd = document.getElementsByClassName('codeInput');
		var eventDate = markerObj[x]['date'];
		var eventWeek = markerObj[x]['week'];
		// console.log('the event dates are: '+ eventDate);
		var obj = {};  // create object, set all data into this object
		var colNo = markerObj[x].col;

		//note: order of object list below is important when outputting data for excel sheet....
		obj.staffName = userName;
		obj.start_Date = beginDate;
		obj.end_Date = endDate;
		obj.date = payData[x]['event_date'];
		obj.hours = hrInTotsObj[x].hours;
		obj.addedHr = hrInTotsObj[x].addHrs;
		var addedWgTots = (hrInTotsObj[x].addInc / hrInTotsObj[x].addHrs);
		// console.log(addedWgTots);
			if(addedWgTots == NaN || addedWgTots == 'NULL' || addedWgTots == 'NaN'){
				addedWgTots = 'na';
			}
		obj.addedWg = addedWgTots;
		obj.addedIn = hrInTotsObj[x].addInc;
		obj.nuHr = hrInTotsObj[x].nuHrs;
		obj.nuIn = hrInTotsObj[x].nuInc;
		if (hrInTotsObj[x].addHrs == undefined){ // if these values are missing, set as 'undefined'
			obj.addedHr = 'undefined';
		}
		if (hrInTotsObj[x].addInc == undefined){
			obj.addedIn = 'undefined';
		}
		if (hrInTotsObj[x].nuHrs == undefined){
			obj.nuHr = 'undefined';
		}
		if (hrInTotsObj[x].nuHrs == undefined){
			obj.nuIn = 'undefined';
		}
		obj.eventName = eventName;
		obj.eventLocation = eventLoc;
		obj.eventCd = eventCode;
		// obj.eventName = eventName;
		obj.accountCd = accntCode[colNo].value;
		// obj.eventName = eventName;
		// obj.eventLocation = eventLoc;
		obj.income = hrInTotsObj[x].income;
		obj.eventWeek = eventWeek;

		payTots[x] = obj;  // set object into array
	}

	// week totals and gross income value
	var totals = [wk1Hr.innerText,wk1In.innerText,wk2Hr.innerText,wk2In.innerText,column7.innerText];
	// console.log('totals rray: ',totals)

	// put totals array info into payTots array;
	var obj = {};
    obj.w1Hr = totals[0];
    obj.w1In = totals[1];
	obj.w2Hr = totals[2];
    obj.w2In = totals[3];
    obj.grossIn = totals[4];

    payTots.push(obj); // add week totals object into end of array

	// console.log('submit payroll clicked\n', payTots);
	// console.log(payTots, 'is payTots');

}

				