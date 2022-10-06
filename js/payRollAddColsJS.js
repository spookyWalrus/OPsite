



// sort entries, find ones with same date
// sort dates alphabetically by venue, 
	// 	(if venues are same, then sort alphabetically by event name) DONE VIA SQL
// 	=> ( put these dates in order in to an array) DONE
// count number of events 
	// (this number minus one is how many extra dates/columns to add: store number in a variable)
	// (add  number to special variable already set at 14, used for looping through all columns in all functions)
	// change '14' value to variable-14 name in all loops
	// check+change increment values so it reflects extra dates 

//add extra days and dates (in splitSetDate() )
	// (0-6 = sun-sat. week1, 7-14 = sun-sat week2 == dateNo
	//  get extra day number variable
	// 	check split  and loop with v14, check if it:
	// 1) matches against selected date search
	// 2) check match and see if repeats against itself 
	// 	 => for each match, the v14 value is the dateNo that repeats in the week
		// get columnID of tr/td and write HTML of extra day with:
		 	// dateNo as <tr> position and day
		 	// set date from splitDate
	// 3) add v14 to markers[] 

// new columns aren't being 'inserted', just taking over existing columns,
	// need to re-write columns that are after the new columns?


// ^^^^^^^^^  (june 02) most likely above is complete, needs revision... ^^^^^^^^^


// April 16: create col/date objects and put in to array. The array needs to be same indices
// as main data set....

// June 02 DONE
// fix setDate() so that the work dates are properly set as object data and can be read in JSTools.js
		// currently, JSTools.js is reading the data so that the order of index of the array is used to set data.
		// so check: 1) make sure objects are written in correct format in setDates() and
		// 2) make sure data is being read properly and accoridngly to object representation on JSTools.js

// June 03 DONE
// weird bug: when selecting Paul/02-16-2020, sat. 29th doesn't show up as date but everyone else's does 
	// RESOLVED : issue was markerObj[] was missing values so throwing error, script couldn't load/calculate
	// date



// June 17 DONE
// Trying to figure out how to create new doubles columns with the right indices for buttons...   DONE
	// Separated out column creation in findDoubles().  Need to establish the markerObj array first? YUP
		// From this array, we  can then see the indices of each work day column. 
	// Looking at findDoubles() to see if work day and doubled day can be sorted out to show indices needed....
	// **(june 25) Better to re-number  button indices after doubled columns and markerObj[] is created. YUP
		// 1) Use markerObj.col to determine which columns to target and change indices accordingly
		// 2) Use 'doublesNo' to figure out how much to bump forward dates that come after the double dates
			// >> need to do math if it's week1 or week2 ? 

// july 25
	// last 2 double dates don't have their 'role' selected, though other double dates do have it  DONE
// (july 25)
	// the start times don't exist for week1 or aren't visible when a pay period gets selected  DONE

// Nov 14  DONE
	// Having double dates in week1, and doubles in week1 and week2,  causes error and no output in payRoll.php

// Nov 21  ALL DONE
	// MAJOR HEADACHE:  How to fix dates when calendar reaches end of month and dates start again at 01?
		// somehow flag the last date and make substitute in the date (but preserve everything else)
	// After re-doing the set double dates function, getting weird bug where position/roles are being set   
	// to HeadAudio on empty dates subsequent to work dates    DONE
		// something to do with re-writing/ re-assigning new columns??    // DONE 

//Nov 23   DONE
	// The DAYS are not doubling correctly when there are double work days. The dates are ok though...

// do this for establishing dayIndex
function checkEndOfMonth(date,doWhat){
	// console.log('checking: ',date,doWhat);
	var monEnds = [31,28,31,30,31,30,31,31,30,31,30,31];
	var dayIndex; // variable to set in whatDay();
	var dateSearch  =  dateStart.options[dateStart.selectedIndex].value; // get start day from html
	var dateSplit = dateSearch.split('-');
	var startDay = dateSplit[2];
	// console.log('startDay is: ', dateSplit[2]);
	var mon = dateSplit[1];  // isolate just the month
	var yr = dateSplit[0];
	var checkIt = (yr - 2020/4);
	var leapYr = Number.isInteger(checkIt); // check for leap year
	var leap; // variable to bump up if it's a leap  year
	// var firstDay = startDay;
	// console.log('mon is: ',mon,' startday is: ',startDay);

	if (doWhat == 'whut'){
		// console.log('checking for dayIndex');
		for(x=0;x<monEnds.length;x++){ 
			if(mon == x+1){ //check what month of first day of pay period
				if((mon == 2)&&(leapYr)){ // check if it's feb and it's a leap year
					leap = 1;
				// console.log('leap year');
				}else{
					leap = 0;
					// console.log('not a leap year');
				}
				if(date < startDay){
					// var math = parseInt(monEnds[x]) + parseInt(date) + leap;
					var math = monEnds[x] + parseInt(date) + leap;
					dayIndex =	math - startDay;
					// console.log('leap: ',dayIndex);
					break;
				}else if(date >= startDay){
					dayIndex = date - startDay;
					// console.log('normal, dayIndex: ',dayIndex);
					break;
				}
			}
		}
		// console.log('date is: ',date,' dayIndex is: ',dayIndex);
		return dayIndex;
	}else if(doWhat == 'blah'){// check date for end of month overlap
		// console.log('checking for date overlap');
			for(x=0;x<monEnds.length;x++){ 
				if(mon == x+1){ //check month of first day of pay period
					if((mon == 2)&&leapYr){ // if its feb and leap year
						leap = 1;
						if(date > monEnds[x]+leap){ // check if date goes past last day of month
							// console.log('date is: ',date,' switching to first of month');
							// var nuDate = 1;
							date = 1;
							return date;
						} else{
							// console.log('date lapped')
							return date;
						}
					}else{ // its not feb and not leap year
						if(date > monEnds[x]){ // check if date goes past last day of month
							// console.log('date is: ',date,' switching to first of month');
							// var nuDate = 1;
							date = 1;
							return date;
						} else{
							// console.log('date lapped')
							return date;
						}

					}
				}
				
			}
		// console.log('missing startDay, so checking date for end of month overlap');
		// console.log('date to check: ',date);
	}else if(doWhat == 'meh'){// check date for end of month overlap
		// console.log('checking for month overlap');
			for(x=0;x<monEnds.length;x++){ 
				if(mon == x+1){ //check month of first day of pay period
					if((mon == 2)&&leapYr){ // if its feb and leap year
						leap = 1;
						if(date > (monEnds[x]+leap) ){ // check if date goes past last day of month
							// console.log('leap year, end of month is: ',monEnds[x]+leap);
							// console.log('date is: ',date,' switching to first of month');
							var nuDate = [];
							var nuMon = parseInt(mon) + 1;
							nuDate = [1,nuMon];
							// console.log(nuDate,'leapYr, month is: ',mon);
							return nuDate;
						} else{
							var nuDate = [date,mon];
							// console.log(nuDate,'month is: ',mon);
							return nuDate;
						}
					}else{
						if(date > monEnds[x]){ //otherwise its not feb and not leap year
							// console.log('leap year, end of month is: ',monEnds[x]+leap);
							// console.log('date is: ',date,' switching to first of month');
							var nuDate = [];
							var nuMon = parseInt(mon) + 1;
							var math = date - monEnds[x];
							var dateMath = (math).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
							var dateMonth = (nuMon).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})

							nuDate = [dateMath,dateMonth];	
							// console.log('did the dateMath',nuDate);
							return nuDate;
							
						} else{
							var nuDate = [date,mon];
							// console.log(nuDate,'month is: ',mon);
							return nuDate;
						}
					}
				
				}
			}
		// console.log('missing startDay, so checking date for end of month overlap');
		// console.log('date to check: ',date);
	}

}


// var theDoubles =[];   // array contains the doubled day as an index + name of doubled day
var dayData = [];   // array contains the doubled day as an index + name of doubled day
function whatDay(date, startDay){
	// var day = date; // date number to check
	// var startDay = startDay;
	var theDays = ['Sun','Mon','Tues','Wed','Thu','Fri','Sat']; // 0-6
	// var dayIndex = day - startDay;
	var dayIndex = checkEndOfMonth(date,'whut');
	// var dayData = [];   // array contains the doubled day as an index + name of doubled day
	if (dayIndex<7){ // week1
		dayData[0] = dayIndex + 2; // adding 2 bc there is a heading column
		dayData[1] = theDays[dayIndex];
		theDoubles = dayData;
		return dayData;
	} else if (dayIndex>6){ // week2
		dayIndex = dayIndex - 7;
		dayData[0] = dayIndex + 2; // adding 2 bc there is a heading column
		dayData[1] = theDays[dayIndex];
		theDoubles = dayData;
		return dayData;
	}

}


var markers = []; // array to know which column has data assigned to it
var v14 = 14; // variable + value used to loop through columns, changes if doubles exist
var doublesNo; // variable to keep count of doubles, global variable
var dubWeek1 = 0; // variables to keep track # of doubles in week 1
var dubWeek2 = 0; // variables to keep track # of doubles in week 2
function findDoubles(date, index){
	var newColumn = document.getElementsByClassName('week-days'); // get row for adding new columns
	var newTD = document.getElementsByClassName('weekdayDay'); // get <td> for adding new column
	var payData = JSON.parse(sessionStorage.getItem("payrollData")); // get data from AJAX call

	var dateSearch  =  dateStart.options[dateStart.selectedIndex].value; // get start day from html
	var startDay = dateSearch.split('-'); // get full date from html selection
	
	// check for doubles
	var isSameDay = 0; // variable to check double day
	doublesNo = 0; // initialize value for count no of doubles

	markers = []; // initialize markers
	markerObj = []; //initialize markerObj;
	console.log('markers initialized as: ',markers);
	console.log('initialize markerObj: ', markerObj);
	// dubWeek1 = 0;
	// dubWeek2 = 0;

	for (var x=0;x<payData.length;x++){ // no. of data sets returned = no. of markers indices
		var theDate = payData[x]['event_date'];  // get date from data array
		var splitDate = theDate.split('-');// get day number only out of data set
		var dayLookUp = whatDay(splitDate[2], startDay[2]); // figure out day index of week, day of week from function above
		var dayIndex =  dayLookUp[0]; // index ie: 0-6
		var dayDay = dayLookUp[1]; //actual day ie: 'Thu'

	 	if (splitDate[2] !== isSameDay){ // check if double dates exist. If NOT:
	 		markers[x] = parseInt(splitDate[2]);  // set marker index bc data exist for the date
	 		console.log('no double dates,markers set at: ',markers[x],parseInt(splitDate[2]));
	 		isSameDay = splitDate[2]; // set variable to check against next data set 
	 		// console.log('reg work day is: ' + markers[x]);
	 		// console.log('reg day, button index change is: ' + (doublesNo);

	 	} else if (splitDate[2] == isSameDay){ // check if double dates exist. if YES:
	 		markers[x] = parseInt(splitDate[2]); // set marker index bc data exists for that date
	 		++doublesNo; // increase counter for # of doubles

	 		// create extra columns and cels
	 		if (splitDate[2] <= (parseInt(startDay[2]) + 6)){ // check for week 1
		 		// var nuIndx =  doublesNo + markers[x];
	 			// console.log('week1, bump index by '+doublesNo+'(doublesNo) + ' +markers[x]+'(marker match) = ' +nuIndx);
		 		makeColumns('week1',dayIndex, dayDay);
		 		++dubWeek1; // count # of doubles for week1
	 		} else if (splitDate[2] > (parseInt(startDay[2]) + 6)){ // check for week 2
		 		// var nuIndx =  doublesNo + markers[x];
	 			// console.log('week2, bump index by '+doublesNo+'(doublesNo) + ' +markers[x]+'(marker match) = ' +nuIndx);
		 		makeColumns('week2',dayIndex, dayDay);
		 		++dubWeek2; // count # of doubles week2
	 		}
	 	
		}

	}
	v14 = v14 + doublesNo; // set new value for all columns to loop through - used in payRollJSTools.js

	// check doubles count and set dates accordingly
	if (doublesNo > 0){
		setDoubleDates(sortPayroll); 
		// console.log('doubledates are found');
	} else {
		setDates(sortPayroll);
		// console.log('only single dates');
	}

} // end of findDoubles()


var countMakeRow = 0;

function makeColumns(weekNo,dayIndex, dayDay){

	// console.log('dayIndex is: ' + dayIndex);
	// console.log('weekNo: ' + weekNo, ' dayIndex: ' +dayIndex, ' nuIndx: ' +nuIndx);
	// console.log('dayDay: ' +dayDay, ' doublesNo: ' +doublesNo);
	// console.log('day index is: ',dayIndex);
	var week;
	// var dayIx = dayIndex;
	// var nameDay = dayDay;

	// get row for adding new columns, row index will be either 0 or 1: page1 or page2
	var weekDayRow = document.getElementsByClassName('week-days'); 
	var dateRow = document.getElementsByClassName('dateRow'); 
	var eventRow = document.getElementsByClassName('eventRow'); 
	var venueRow = document.getElementsByClassName('venueRow'); 
	var codeRow = document.getElementsByClassName('codeRow'); 
	var accntRow = document.getElementsByClassName('accntRow'); 
	var positRow = document.getElementsByClassName('roleRow'); 
	var st1Row = document.getElementsByClassName('st1Row'); 
	var en1Row = document.getElementsByClassName('en1Row'); 
	var tot1Row = document.getElementsByClassName('totalRow1'); 
	var st2Row = document.getElementsByClassName('st2Row'); 
	var en2Row = document.getElementsByClassName('en2Row'); 
	var tot2Row = document.getElementsByClassName('totalRow2');
	var st3Row = document.getElementsByClassName('st3Row'); 
	var en3Row = document.getElementsByClassName('en3Row'); 
	var tot3Row = document.getElementsByClassName('totalRow3'); 
	var hourSubTot = document.getElementsByClassName('hourSubTotalRow'); 
	var rate = document.getElementsByClassName('wage'); 
	var otHr = document.getElementsByClassName('OTRow'); 
	var rateOt = document.getElementsByClassName('wageOT'); 
	var ot2Hr = document.getElementsByClassName('OT2Row'); 
	var rateOt2 = document.getElementsByClassName('wage2OT'); 
	var ajHr = document.getElementsByClassName('adjHr'); 
	var rateAj = document.getElementsByClassName('wageAdj'); 
	var grTots = document.getElementsByClassName('grTotals'); 
	var money = document.getElementsByClassName('income'); 
	var cancel = document.getElementsByClassName('revert'); 

	var rowArray = [weekDayRow,dateRow,eventRow,venueRow,codeRow,
					accntRow,positRow,st1Row,en1Row,tot1Row,st2Row,en2Row,
					tot2Row,st3Row,en3Row,tot3Row,hourSubTot,rate,otHr,rateOt,
					ot2Hr,rateOt2,ajHr,rateAj,grTots,money,cancel]; // array to loop through rows

	// get <td> to add cel and html content, index will be from day index
	var day = document.getElementsByClassName('weekdayDay'); // get <td> for adding new column
	var date = document.getElementsByClassName('dateColumn'); // get <td> for adding new column
	var eventCol = document.getElementsByClassName('eventCol'); // get <td> for adding new column
	var location = document.getElementsByClassName('eventLoc'); // get <td> for adding new column
	var evCode = document.getElementsByClassName('codeColumn'); // get <td> for adding new column
	var accCode = document.getElementsByClassName('accntCol'); // get <td> for adding new column
	var roleSel = document.getElementsByClassName('roleSelect'); // get <td> for adding new column
	var tdArray = [day,date,eventCol,location,evCode,accCode,roleSel]; // array to loop through <td>

	var selectIndex = dayIndex;

	if(weekNo == 'week1'){
		week = 0;
		// console.log('week is 0');
	} else if (weekNo == 'week2'){
		week = 1;
		// console.log('week is 1');
	}

	var row;
	var td;
	var go;
	// var countMakeRow = 0;
	// at each row, insert # of repeated cels for that row horizontally
	// use classList.add("stylings") for each newly created <td>, 
		// eg:  var element = document.getElementById("myDIV");
   		// element.classList.add("mystyle");
// if(countMakeRow<=doublesNo){
		for (var x=0;x<rowArray.length;x++){

			row = rowArray[x][week];
			// console.log(rowArray[x][1]);
			// console.log(row);
			go = row.insertCell(dayIndex); // insert this row, insert <td> at this index
			// console.log('insert for: ',weekNo,', which is day: ',dayDay,);
			if (x == 0){  // day
				go.innerHTML = '<td>' + dayDay + '</td>'; // set HTML content of <td>
				go.classList.add("weekdayDay");
				// console.log('making a: ',dayDay,' at dayIndex: ',dayIndex);
				continue;
			}
			if (x == 1){ // date
				go.innerHTML = '<td> - </td>'; 
				go.classList.add("dateColumn");
				continue;
			}
			if (x == 2){ // event
				go.innerHTML = '<td> - /td>'; 
				go.classList.add("eventCol");
				continue;
			}
			if (x == 3){ // venue
				go.innerHTML = '<td> - </td>'; 
				go.classList.add("eventLoc");
				continue;
			}
			if (x == 4){ // event code
				go.innerHTML = '<td><input class="codeInput"></input></td>'; 
				go.classList.add("codeColumn");
				continue;
			}
			if (x == 5){ // account code
				go.innerHTML = '<td class="accntCol"><input class="accntInput"></input></td>'; 
				go.classList.add("accntCol");
				continue;
			}
			if (x == 6){ // role select
				go.innerHTML = '<td><div class="roleDiv"><span class="myarrow"></span><select class="role" onchange="roleChange();><option value="--"> -- </option><option value="HA">Head Audio</option><option value="HLX" >Head Lighting </option><option value="HR" >Head Rigger </option><option value="ST" >Stage Technician</option><option value="USH">Usher</option><option value="SSIP">SSIP</option><option value="FOH">FOH Manager</option><option value="SS">Supervisor</option><option value="null">na</option></select></div></td>';
				go.classList.add("roleSelect"); // add class to row
				var theRow = positRow[week].cells;  // target column
				// theRow[dayIndex].firstElementChild.classList.add("role"); // add class to menu
				continue;
			}
			if (x == 7){ // start 1 col
				go.innerHTML = '<td> - </td>'; 
				go.classList.add("start1Col");
				continue;
			}
			if (x == 8){ // end1 col
				go.innerHTML = '<td> - </td>'; 
				go.classList.add("en1Col");
				continue;
			}
			if (x == 9){ // end1 col
				go.innerHTML = '<td> - </td>'; 
				go.classList.add("totCol1");
				continue;
			}
			if (x == 10){ // start 1 col
				go.innerHTML = '<td> - </td>'; 
				go.classList.add("start2Col");
				continue;
			}
			if (x == 11){ // end1 col
				go.innerHTML = '<td> - </td>'; 
				go.classList.add("en2Col");
				continue;
			}
			if (x == 12){ // end1 col
				go.innerHTML = '<td> - </td>'; 
				go.classList.add("totCol2");
				continue;
			}
			if (x == 13){ // start 1 col
				go.innerHTML = '<td> - </td>'; 
				go.classList.add("start3Col");
				continue;
			}
			if (x == 14){ // end1 col
				go.innerHTML = '<td> - </td>'; 
				go.classList.add("en3Col");
				continue;
			}
			if (x == 15){ // end1 col
				go.innerHTML = '<td> - </td>'; 
				go.classList.add("totCol3");
				continue;
			}
			if (x == 16){ // subtotal hours
				go.innerHTML = '<td> - </td>'; 
				go.classList.add("subTotHr");
				continue;
			}
			if (x == 17){ // reg. rate
				go.innerHTML = '<td> - </td>'; 
				go.classList.add("rateCol");
				continue;
			}
			if (x == 18){ // OT hours
				go.innerHTML = '<td> - </td>'; 
				go.classList.add("otHr");
				continue;
			}
			if (x == 19){ // OT rate
				go.innerHTML = '<td> - </td>'; 
				go.classList.add("OTrateCol");
				continue;
			}
			if (x == 20){ // OT2 hours
				go.innerHTML = '<td> - </td>'; 
				go.classList.add("ot2Hr");
				continue;
			}
			if (x == 21){ // OT2 rate
				go.innerHTML = '<td> - </td>'; 
				go.classList.add("OT2rateCol");
				continue;
			}
			if (x == 22){ // adj.hours
				go.innerHTML = '<td><input class="adjHrCol"></input></td>'; 
				// go.classList.add("adjHrCol");
				continue;
			}
			if (x == 23){ // adj rate
				go.innerHTML = '<td><input class="wageAdjCol"></input> <button class="adjRateGo" type="button" onclick="return adjRate(222);">Go</button> </td>'; 
				// go.classList.add("wageAdjCol");
				continue;
			}
			if (x == 24){ // subtotal hours
				go.innerHTML = '<td> - </td>'; 
				go.classList.add("grTotCol");
				continue;
			}
			if (x == 25){ // subtotal hours
				go.innerHTML = '<td> - </td>'; 
				go.classList.add("inCol");
				continue;
			}
			if (x == 26){ // subtotal hours
				go.innerHTML = '<td> <button class="revertGo" type="button" onclick="return revert(222);">Revert</button> </td>'; 
				go.classList.add("revCol");
				continue;
			}

		}
	// }
	// ++countMakeRow;

}

var totalDays;// variable to calculate index for week totals, used on other page.
var markerObj =[]; // global array w/objects to use as markers in payRollJSTools.js
var dateCol = document.getElementsByClassName('dateColumn');
//sessionStorage.clear(); //  ----> moved to payRollJax.js to avoid confusion...

function setDates(callBackSortPayRoll){
	// console.log("setting regular dates");
	// console.log(markers +" is markers");
	var dateSearch  =  dateStart.options[dateStart.selectedIndex].value;
	// var dateCol = document.getElementsByClassName('dateColumn');

	var startDay = dateSearch.split('-');

	var y = 0; // index for markers[]
	var wkDate=[]; // number of the week
	var z = parseInt(startDay[2]);
	var oldWD = 0;
	var a;
 	var obj; 

	
	// console.log('markers for doubles: ', markers);
	for (var x = 0;x<v14;x++){
		z = checkEndOfMonth(z,'blah');
		console.log('z value is: ',z);
		console.log('markerObj is at: ',markerObj);

		dateCol[x].innerHTML = z; // create dates of the week, straight up;
		// z = checkOfMonth(z);
		a = z + x; // I don't think this does anything...
		// console.log('x = '+x,', z = '+z,', a = ' +a);
		if (z == markers[y]){ // if start day matches marker days, set index and date into object
			// console.log('markers is at ' + markers[y]);
		
			obj = window['mkobj'+[y]];
		 	obj = {};
			obj.col = x; // this is the column number
			obj.date = z; // this is the date
			if (x < 7){ // z = start day
				// obj.col = x; // this is the column number
				obj.week = 'week1';
				// console.log('set as week1');
			} else if (z > 6){
				// obj.col = x+1; // this is the column number, added 1 to match indices marked in html, page2
				obj.week = 'week2';
				// console.log('set as week2');
			}
			markerObj[y]=obj;
			console.log('markerObj is NOW at: ',markerObj);
			y++;
			console.log('markers now at: ',markers[y]);
		}else{
			console.log('z date doesnt match with markers[y]: ',z, markers[y]);
		}
		z++;
	}
	totalDays = dubWeek1 + dubWeek2 + v14; 
	console.log('markerObj in payRollAddCols.js: ',markerObj);
	sessionStorage.theMarkerObj = JSON.stringify(markerObj);
	callBackSortPayRoll();
} // close setDates()


// below is new block to sort doubles to set dates and make markerObject array
function setDoubleDates(callBackSortPayRoll){

	var dateSearch  =  dateStart.options[dateStart.selectedIndex].value;
	var dateCol = document.getElementsByClassName('dateColumn');
	var dayOne = dateSearch.split('-');
	var startDay = parseInt(dayOne[2]);	 // first day of pay period

	var dubObj = [];  // used to isolate doubles
	var a = 0; // counter for marker object indices
	var z = 0;// index for loop, increments each time function is called

	markers.forEach(checkDubs,z); // fill markers array

	var count;// counter to increment if a double is found in array
	function checkDubs(date,index){ //go through markers array for each day of pay period, find doubles
		count = 0;
		for(var x = z;x<markers.length;x++){
			if(date == markers[x]){ 
				++count;
			}
		// }
			if (count >= 2){ // a double work date
				// console.log('this is a double of: '+date);
				
				let obj = window['mkobj'+[a]];
			 	obj = {};
				obj.date = date;
				obj.isDbl = 'y';
				obj.indx = x; // index of double in marker
				obj.dblCount = count;
				dubObj[a]=obj;
				++a;
				break;
			}
		}
		++z;
	}	// close checkDubs()
	// console.log('dubObj: ',dubObj);

	// create/ fill markerObj with all work dates
	// var markerObj = [];  // already declared in higher scope, redundant. This array gets cleared when script re-loads on new search
	
	var b = 0; // indices for markerObj, gets bumped
	var y = 0; // indices for dubObj
	var w = 0;  // indices for col, gets bumped every time a double exists.
	markers.forEach(makeMarkObj,y);
	function makeMarkObj(date,index){
		var col;// to assign col position

		let obj = window['mkobj'+[index]];
	 	obj = {};
		obj.date = date;
		if (date <= (startDay+6)){
			// console.log(date+' is week1');
			obj.week = 'week1';
		}else if(date > (startDay+6)){
			// console.log(date+' is week2');
			obj.week = 'week2';
		}
		obj.isDbl = 'n';
		col = date-startDay+w;
		obj.col = col;
		// console.log('date is: ',date,' index is: ',index,' col is: ',col);
		// console.log('y is: ',y);
		if(y<dubObj.length){ // check if date is a double date
			if(date == dubObj[y].date){ // does date match with object in dubObj?
				// console.log('date matches dubObj date: ',date);
				if(dubObj[y].isDbl == 'y'){ 
					if(dubObj[y].indx == index){// is date NOT first iteration?
						col = col+1;  
						// console.log('index matches, date is double: ',date,' col is: ',col);
						obj.isDbl = 'y';
						obj.col = col;
						dateCol[col].innerHTML == date;
						// console.log('DOUBLE! date for col: ',col,' set to: ',date);
						++y;
						++w;
								
					}else if(dubObj[y].indx != index){// is date IS first iteration, so not a double
						// console.log('index no match, date is primary: ',date,' col is: ',col);
						obj.isDbl = 'n';
						obj.col = col;
					}
				}
			}
		}
		// console.log('y is now: ',y);
		markerObj[b]=obj;
		b++;
	}
	console.log('markerObj from doubledates(): ',markerObj);
	sessionStorage.theMarkerObj = JSON.stringify(markerObj);

	modIndex();

// set dates for calendar...
	var b = 0; // bump value when a double exists...
	var c = 0; // loop start pont for markerobject..., gets bumped
	// console.log('total days is: ',v14);
	for(var n=0;n<v14;n++){	
		// console.log('check col at:',n); //index of column
		var date = n+startDay-b; // date for column
		// console.log('check col at: ',n,', date is at: ',date);
		// console.log('c, lenth of markersObj, is at: ',c);
		if (c==markers.length){
			// console.log('reached markers length limit, col: ',n,' date: ',date);
			var xyz = checkEndOfMonth(date,'blah');

			dateCol[n].innerHTML = xyz;
		} else{
		loop2:
			for(y=c;y<markerObj.length;y++){ // loop through work dates by matching col#
				// console.log('markerObj index: ',y);
				if(n == markerObj[y].col){// check if col matches a col in markersObj
					// console.log('n matches the col in markerOBj: ',markerObj[y].col);
					if(markerObj[y].isDbl == 'y'){// if matches, is the date is a double?
					// console.log('matches and IS double, col is: ',n,' date: ',markerObj[y].date);
					dateCol[n].innerHTML = markerObj[y].date; // as a double, set date to the col
					// console.log('col ',n,' is at DOUBLE date: ',date);
					++b;
					++c;
					// console.log('breaking loop2');
					break loop2;
					// continue;
					}else{ // if not matches, set the column with 
						// console.log('matches, but not a double, col:  ',n,', date: ',date);
						dateCol[n].innerHTML = date;
						++c;
						// console.log('breaking loop2');
						break loop2;
						// continue;
					}
				}else{
					// console.log('a NO match markerObj col');
					dateCol[n].innerHTML = date;
					// console.log('no matches, col: ',n,', date: ',date);
					// console.log('breaking loop2');
					break loop2;
					// continue;
				}
				// }
			}
		}	
		// if (c==markers.length){
		// 	console.log('reached markers length limit, col: ',n,' date: ',date);
		// 	dateCol[n].innerHTML = date;
		// }
			
	}

	callBackSortPayRoll();		
} //close setDoubleDates()

// var totalDays = dubWeek1 + dubWeek2 + v14; // variable to calculate index for week totals, used on other page.
function modIndex(){ // function to modify the index # for buttons
	var z = 0; // index for markerObj, gets bumped on every work day match
	var regIndx = 0; // index bumped for every double work day
	var week; // week to target
	var colNo; // column # to target;
	totalDays = dubWeek1 + dubWeek2 + 16;

	for (var x = 0;x<totalDays; x++){ // go through all days
		
		if (x <= (8 + dubWeek1)-1){ // week 1 column #'s
			colno = x + 1;
			// console.log('not work date, week 1, col: ' + colno + ', index is: ' + x );
			// console.log('week 1, column: ' + (x + 1));
			setIndex(0, colno, x);
		// } else if ( (x > (8 + dubWeek1)) && (x <= (totalDays)) ){ // week 2
			}else{
			// colno = ((8 - x) + dubWeek1);
			colno = x - (8 + dubWeek1)+1;
			// console.log(colno);
			// console.log('not work date, index is: ' + x );
			// console.log('not work date, week 2, col: ' + colno + ', index is: ' + x );
			// console.log('week 2, column: ' + ((x - 7 + dubWeek1) + 1));
			// colno = ((x - 7) + dubWeek1);
			setIndex(1, colno, x);
		}
	}

}


function  setIndex(week, colno, index){
	var wk = week;
	var col = colno;
	var x = index;

	var ajHr = document.getElementsByClassName('adjHr'); 
	var rateAj = document.getElementsByClassName('wageAdj'); 
	var button = document.getElementsByClassName('adjRateGo');
	var grTots = document.getElementsByClassName('grTotals'); 
	var money = document.getElementsByClassName('income'); 
	var rev = document.getElementsByClassName('revert'); 
	// console.log('week,colno, index: ',week,colno,index);

	if (wk == 0) { // week1
		// set index of newly created buttons....
		var del = rateAj[0].children[col].children[1]; // first children set targets <td> of wageAdj class,
																// second children set targets <button> element
		del.remove(); // clears entire second children set elements
		var nuTd = rateAj[0].children[col]; // target <td> element for placing correct index
		nuTd.innerHTML = '<input class="wageAdjCol"></input>' + 
		'<button class="adjRateGo" type="button" onclick="return adjRate(' + x + ',' + wk +');">Go</button>';
		//
		var del2 = rev[0].children[col].children[0];
		// console.log(del2);
		del2.remove();
		var nuTd2 = rev[0].children[col]; // target <td> element for placing correct index
		nuTd2.innerHTML = '<button class="revertGo" type="button" onclick="return revert(' + x+','+ wk +');">Revert</button>';
	
		// set index of newly created select dropdown menu.....
		var select = document.getElementsByClassName('role')[x];
		var z = colno-1;
		var funkName = 'roleChange('+z+')';
		// console.log(funkName);
		select.setAttribute("onchange",funkName);

	} else if (wk == 1){ // week2
		// console.log('week 2');
		// set index of newly created buttons....
		var del = rateAj[1].children[col].children[1]; // first children set targets <td> of wageAdj class,
																// second children set targets <button> element
		del.remove(); // clears entire second children set elements
		var nuTd = rateAj[1].children[col]; // target <td> element for placing correct index
		nuTd.innerHTML = '<input class="wageAdjCol"></input>' + 
		'<button class="adjRateGo" type="button" onclick="return adjRate(' + x + ',' + wk +');">Go</button>';
		//
		var del2 = rev[1].children[col].children[0];
		// console.log(del2);
		del2.remove();
		var nuTd2 = rev[1].children[col]; // target <td> element for placing correct index
		nuTd2.innerHTML = '<button class="revertGo" type="button" onclick="return revert(' + x+','+ wk +');">Revert</button>';

		// set index of newly created select dropdown menu.....
		// console.log('is, ', x,' <= ', dubWeek1 + dubWeek2 + 14);
		if(x <= (dubWeek1 + dubWeek2 + 14)){
			var select = document.getElementsByClassName('role')[x-1];
			// console.log(col,x,' is col, index');
			var z = x-1;
			// console.log(z,' is column# of days in 2nd week, should match col in markerObj')
			var funkName = 'roleChange('+z+')';
			// console.log(funkName);
			select.setAttribute("onchange",funkName);
		}
	}
}

