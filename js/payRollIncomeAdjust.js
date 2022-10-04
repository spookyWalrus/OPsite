	
var hrInTotsObj = []; // object to store hours/income values
var wk1x;  //  index for week1/ week2 columns
var wk2x;
var w1Dx; // array index of week1 in hrInTotsOb
var w2Dx; 
var w1HT; // week1 hour total
var w2HT;
var w1InT; // week1 income total
var w2InT;
var clicked = [];  // object to check add/revert clicks

function makeIncomeObject(index){// use index for modifying/updating, otherwise make new

	if(!(index)){ // make new 
		// console.log('making new hrInTotsObj');
		for (var x =0;x<markerObj.length;x++){
			// console.log('going through markerObj');
			if (markerObj[x].week == "week1"){
				// console.log('at index ',x,' it is week1');
				var obj = {};
				obj.week = 'week1';
				obj.col = markerObj[x].col;
				obj.hours = dayHoursIncome[x].hours;
				obj.income = dayHoursIncome[x].income;
				obj.date = markerObj[x].date;

				hrInTotsObj[x] = obj;
			} else if (markerObj[x].week == "week2"){
				// console.log('at index ',x,' it is week2');
					var obj = {};
					obj.week = 'week2';
					obj.col = (markerObj[x].col + 1); // adding 1 to match indices written in html, page 2
					obj.hours = dayHoursIncome[x].hours;
					obj.income = dayHoursIncome[x].income;
					obj.date = markerObj[x].date;
					
					hrInTotsObj[x] = obj;
			}
		}
		if (doublesNo > 0){ // if doubles exist
			wk1x = ((totalDays-2)-dubWeek2)-7; // set index for week1 totals 
			wk2x = totalDays - 1; // set index for week2 totals
			var obj = {};
			obj.week = 'week1tot';
			obj.col = wk1x;
			obj.hours = week1hrs;
			obj.income = week1Inc
			hrInTotsObj.push(obj);
			w1Dx = hrInTotsObj.length - 1; // array index for week1 totals

			var obj2 = {};
			obj2.week = 'week2tot';
			obj2.col = wk2x;
			obj2.hours = week2hrs;
			obj2.income = week2Inc
			hrInTotsObj.push(obj2);
			w2Dx = hrInTotsObj.length - 1; // array index for week2 totals

		} else if (doublesNo == 0){ // no doubles
				// console.log('checking for weekTots, no doubles');
			wk1x = 7; // index for week1 totals
			wk2x = 15; // index for week2 totals
			var obj = {};
			obj.week = 'week1tot';
			obj.col = wk1x;
			obj.hours = week1hrs;
			obj.income = week1Inc;
			hrInTotsObj.push(obj);
			w1Dx = hrInTotsObj.length - 1; // array index for week1 totals

			var obj2 = {};
			obj2.week = 'week2tot';
			obj2.col = wk2x;
			obj2.hours = week2hrs;
			obj2.income = week2Inc;
			hrInTotsObj.push(obj2);
			w2Dx = hrInTotsObj.length - 1; // array index for week1 totals
		}
	} else if (index){ // update 
		console.log('updating hrInTotsObj, index: ',index);
		if(index == hoursNow[1]){
		nuHours = hoursNow[0];
		}
		if(index == incomeNow[1]){ // values set in payROllJsTOols.js
		nuIncome = incomeNow[0];
		}	
		
		for(var y=0;y<hrInTotsObj.length;y++){
			if(y == index){ //update date
				console.log('updating values for week dates');
				// hrInTotsObj[y].hours = dayHoursIncome[x].hours;
				// hrInTotsObj[y].income = dayHoursIncome[x].income;
				hrInTotsObj[y].hours = nuHours;
				hrInTotsObj[y].income = nuIncome;
				// break;
			}
			if(hrInTotsObj[y].week == 'week1tot'){ // update week tots
				hrInTotsObj[y].hours = week1hrs;
				hrInTotsObj[y].income = week1Inc;
			}else if(hrInTotsObj[y].week == 'week2tot'){
				hrInTotsObj[y].hours = week2hrs;
				hrInTotsObj[y].income = week2Inc;
			}
		}



	}
	// console.log(hrInTotsObj);
	// console.log('w1Dx: ',w1Dx, i, ' and w2Dx: ',w2Dx,j);
	w1HT = week1hrs;
	w1InT = week1Inc;
	w2HT = week2hrs;
	w2InT = week2Inc;

		// hrInTotsObj.sort();
		// fill clicked object
	var zero = 0;
	for (var i = 0;i<hrInTotsObj.length;i++){ // set key/value pairs for clicked object
		var obj3 = {};
		obj3.click = zero;
		var ix = hrInTotsObj[i].col;
		obj3.ndx = ix;
		clicked.push(obj3);
	}
		// clicked[[i]] = kv2[[i]:0]; // used for clicked object????? maybe delete it...

		// console.log('hrInTotsObj now at: ',hrInTotsObj);
}




// (july 12)   ALL DONE
	//weektotals object needs: new adjusted totals for hours/income when a work day OR week totals is adjusted
		//.. this gets set and displayed for any adjustments made
		// initial value set when hrInTotsObj is created
	// when a day OR total week  gets adjusted: do math on that day (nuHrs + reg.hours) && (nuInc + reg.Inc)
				//, add that value to adjusted week total value, display and set adjusted total
	// when a day OR total week gets reverted: do math (nuHrs + reg.hours) && (nuInc + reg.Inc),
			// subtract that value to adjusted week total value, display and set adjusted total
	// day adjusts = new week tots - new day = new day tots & new week tots
	// day revert = new week tots - old day = new day tots & new week tots
	// week adjust =  new week tots + week adjusts = new week tots
	// week revert = new week tots - week reverts = new week tots

// (juuly 15)
	// correct grand total income display DONE
	// make revert work for week totals DONE

//(july 16) 
	// make add/revert buttons so they are one-time clickable >> set in adjRate() and revert() functions   DONE
		// clicked? initial set to 0. Add changes it to 1 (along with index)
		// Add checks if current index also has click value of 0. If yes, continue + set click value = 1
			// if not, don't add
		// Revert checks if current index has click value of 1. If yes, continue + set clck value = 0
			// if not, don't add
				// >>>>  on each add: check if index click count == 0
					// if yes, then count++, set index: 	
					// default setting, click count set to 0
				// >>>> on each revert, check if index click count == 1
					// if yes, then count-- , set index: 0

	// change css for week totals so if there are any adjusted days, colours remain changed (see july 18 too)


//(july 17)
	// clean up weekHourCount() and weekIncome() on tools page to, reduce redundancy
	// change css so that if there are any adustments made, the grand total income colour remains blue
		// see july 18

//(july 18)  ALL DONE
	// make function that changes colour of text for hour/income adjust for week totals and grand income total
		// loop through clicked() to see if there are any 1's
			//>>> yes, check for which week, make colours change(d) for that week and grand total
			// >>> no, check for which week, make colours original for that week and grand total

//(july 22)  DONE
	// fix bug where clicking on random, empty, non-work day causes add functions to occur
		// need to put in check add/rev (or somewhere) to match button index with work index
			// to allow function to happen

// (july 25)
	// income adjust doesn't work for double work days  DONE
		// look at how indices match with clicked() function and makeIncomeObject()???
			// >>> changed 'break' when index doesn't match in checkClick() loop, check if this works for non double days
			// math works but values aren't changing in display boxes for week and weektots
				// need to set condition for double dates: check for week tots index (w2D) only ??
	// week totals math is wonky: week2 totals gets week1 totals when week2 days are adjusted or reverted  DONE

// july 25
	// when add is clicked on an empty day, input fields should go blank    DONE
		// get rev() to send back empty value to payRollJSTools.js page when this happens?

// Nov 14  DONE
	// Weekly total maths when doubles exist in week 2 show up in week 1 totals, no totals appear at all for week 2
	// Doing position adjustments/changes causes error/ no changes for: FOH manager,SSIP and empty days

// Nov 23  DONE
	// Having no work days causes error message with dayHoursIncome array (undefined)
		// potential cause of random role/position being selected in calendar....
	// Colour doesn't change when adjusting rate/wages  DONE

// Nov 29 DONE(sort of: tell user to just REVERT values before changing role)
	// making income/wage adjustments and then changing role/position does not carry over the 
		// adjustments on to the new role/position. It causes week totals to have NAN and the math is wonky
			//  >>  the adjustments DO work if you clear the fields first and then change role/position
			// and then make adjustments for new role/position
			// >> need to look a functions below and decide if you want to keep the adjustments and then
				// add those adjustments with the new wage calculations automaticallly (better)
				// or reset the calculations and force user to re-do adjustments (easier)
	// Should changing role/position also have week totals blink and change?  DONE

	
var adjustedValues = [];  // use this set innerHTML for adjusted values for work day
var adjustedValuesTots = []; // use this to set HTML for adjusted values for week totals
var grandIncomeTotal; // use this for ultimate final income math

function checkHrInTotsObject(index){
	// console.log('checking hrInTotsObj');
	// console.log('index is: ',index);
	if ((hrInTotsObj.length == 0) && markerObj){ // make sure income object exists
		// console.log('making hrInTotsObj');
		makeIncomeObject();
	} else {
		// console.log('modifying hrInTotsObj at index: ',index);
		makeIncomeObject(index);
	}
}

function incomeMaths(index,week,nuHours,nuIncome){

	// checkHrInTotsObject(index);
	// console.log(hrInTotsObj);
	// console.log('w1Dx and w2Dx: ',w1Dx,w2Dx);
	
	if ((index !== wk1x)&&(index !== wk2x) ){ // make sure it's a work day, not week total
		for (var x =0;x<hrInTotsObj.length;x++){
			if (hrInTotsObj[x].col == index){  // check object if exists with work day
				hrInTotsObj[x].addHrs = nuHours;	// save adjustments made
				hrInTotsObj[x].addInc = nuIncome;
				var nuH = hrInTotsObj[x].hours + nuHours; // add orig. value to new value
				var nuIn = hrInTotsObj[x].income + nuIncome;
				hrInTotsObj[x].nuHrs = nuH;	// save new values to object for later recall
				hrInTotsObj[x].nuInc = nuIn;
				adjustedValues = [nuH, nuIn];
				incomeMathWeekTots(index,week,nuHours,nuIncome); // calculate week totals
				break;
			}
		}
		// console.log('checking hrInTotsObj');
		// checkHrInTotsObject(index);
	} else if (index == wk1x || index == wk2x){ 
		// console.log('calculating math for week totals');
		incomeMathWeekTots(index,week,nuHours,nuIncome); // calculate week totals
	}
}

function incomeMathWeekTots(index,week,nuHours,nuIncome){
	console.log('income week tots - nuHours: ',nuHours, 'nuIncome: ',nuIncome);
	console.log('w1HT is: ',w1HT, 'w1InT is: ',w1InT);
	console.log('w2HT is: ',w2HT, 'w1InT is: ',w2InT);
	console.log('week totals math, index is: ',index);

	// calculate totals when week totals was NOT clicked
	if ((index !== wk1x)&&(index !== wk2x)){ 
		console.log('week totals button not clicked');
		if (week == 0){ // week 1, this value directly from html click button
			w1HT = w1HT + nuHours; // add added hours to current week total
			w1InT = w1InT + nuIncome; // add added income to current week total
			// console.log('new week1 hours is: ',w1HT);
			// console.log('new week1 income is: ',w1InT);
			// console.log('reg work day, adjust the week1 tots');

		} else if (week == 1){
			w2HT = w2HT + nuHours; // add added hours to current week total
			w2InT = w2InT + nuIncome; // add added income to current week total
			// console.log('new week2 hours is: ',w2HT);
			// console.log('new week2 income is: ',w2InT);
			// console.log('reg work day, adjust the week2 tots');
		}
	grandIncomeTotal = w1InT + w2InT;

	} else if (index == wk1x){ // week1 total
		// console.log('week1 totals button clicked');
		for (var x=0;x<hrInTotsObj.length;x++){
			if (hrInTotsObj[x].col == index){ // make sure index matches with object content

				hrInTotsObj[x].nuHrs = nuHours; // set week adj. hours
				hrInTotsObj[x].nuInc = nuIncome; // set week adj. income
				w1HT = w1HT + nuHours; // add added hours to current week total
				w1InT = w1InT + nuIncome; // add added income to current week total
				// console.log('new week1 hours is: ',w1HT);
				// console.log('new week1 income is: ',w1InT);
				// console.log('week1 tots, adjust the week1 tots');
				break;
			}
		}
		grandIncomeTotal = w1InT + w2InT;
	} else if (index == wk2x){ // week2 total
		// console.log('week2 totals button clicked');
		for (var x=0;x<hrInTotsObj.length;x++){
			if (hrInTotsObj[x].col == index){
				hrInTotsObj[x].nuHrs = nuHours; // set week adj. hours
				hrInTotsObj[x].nuInc = nuIncome; // set week adj. income
				w2HT = w2HT + nuHours; // add added hours to current week total
				w2InT = w2InT + nuIncome; // add added income to current week total
				// console.log('new week2 hours is: ',w2HT);
				// console.log('new week2 income is: ',w2InT);
				// console.log('week2 tots, adjust the week2 tots');
				break;
			}
		}
		grandIncomeTotal = w1InT + w2InT;		
	} 
}

function revertMaths(index,week){

	if ((index !== wk1x)&&(index !== wk2x)){ // make sure it's a work day, not week total
		// console.log('week day calcuation, reverting');
		for (var x =0;x<hrInTotsObj.length;x++){
			if (hrInTotsObj[x].col == index){  // check object if exists with work day
				var oldH = hrInTotsObj[x].hours; // subtract orig. value to new value
				var oldIn = hrInTotsObj[x].income;
				// hrInTotsObj[x].nuHrs = 0;
				// hrInTotsObj[x].nuInc = 0;
				// console.log('subtracting this: hrs,income: ',hrInTotsObj[x].nuHrs,hrInTotsObj[x].nuInc);

				adjustedValues = [oldH, oldIn];
				revertMathWeekTots(index,week); // calculate week totals
				console.log('reverted values are: ',oldH,oldIn);	
				break;
			}
		}
	} else { // it's a week total calculation
		// console.log('week total caluclation, reverting');
		revertMathWeekTots(index,week); // calculate week totals
	}
}

function revertMathWeekTots(index,week){
	// console.log(hrInTotsObj);
	// console.log('revert weekTots - index is: ',index, 'wk1x is: ',wk1x,' wk2x is: ',wk2x);
	// console.log('w1HT is: ',w1HT, 'w1InT is: ',w1InT);
	// console.log('w2HT is: ',w2HT, 'w1InT is: ',w2InT);
	// console.log('adjustedValuesTots-wk1: ',adjustedValuesTots[0], 'adjustedValuesTots-wk2: ',adjustedValuesTots[1]);

	// calculate totals when week totals was NOT clicked
	if ((index !== wk1x)&&(index !== wk2x)){ 
		if (week == 0){ // week 1, this value directly from html click button
			for (var x=0;x<hrInTotsObj.length;x++){
				if (hrInTotsObj[x].col == index){ // make sure index matches with object content

					w1HT = w1HT - hrInTotsObj[x].addHrs; // subtract added hours to current week total
					w1InT = w1InT - hrInTotsObj[x].addInc; // subtract added income to current week total
					console.log('adjusted hour, income: ',hrInTotsObj[x].nuHrs, hrInTotsObj[x].nuInc);
					console.log('new week1 hours is: ',w1HT);
					console.log('new week1 income is: ',w1InT);
					break;
				}
			}
			
		} else if (week == 1){
			for (var x=0;x<hrInTotsObj.length;x++){
				if (hrInTotsObj[x].col == index){ // make sure index matches with object content
				
					w2HT = w2HT - hrInTotsObj[x].addHrs; // subtract added hours to current week total
					w2InT = w2InT  - hrInTotsObj[x].addInc; // subtract added income to current week total
					console.log('adjusted hour, income: ',hrInTotsObj[x].nuHrs, hrInTotsObj[x].nuInc);
					console.log('new week2 hours is: ',w2HT);
					console.log('new week2 income is: ',w2InT);
					break;
				}
			}
		}
	} if (index == wk1x){ // week1 total
		for (var x=0;x<hrInTotsObj.length;x++){
			if (index == hrInTotsObj[x].col){ // make sure index matches with object content

				w1HT = w1HT - hrInTotsObj[x].nuHrs; // subtract  hours from current week total
				w1InT = w1InT - hrInTotsObj[x].nuInc; // subtract  income from current week total
				// console.log('new week1 hours is: ',w1HT);
				// console.log('new week1 income is: ',w1InT);
				break;
			}
		}

	} else if (index == wk2x){ // week2 total
		for (var x=0;x<hrInTotsObj.length;x++){

			if (hrInTotsObj[x].col == index){
				w2HT = w2HT - hrInTotsObj[x].nuHrs; // add added hours to current week total
				w2InT = w2InT - hrInTotsObj[x].nuInc; // add added income to current week total
				// console.log('new week2 hours is: ',w2HT);
				// console.log('new week2 income is: ',w2InT);
				break;
			}
		}	
	} 
	console.log('wk1 and wk2 tots: ',w1InT,w2InT);
	grandIncomeTotal = w1InT + w2InT;	
	checkColour();
	revertResult(index,week);


}
		
var addedAlreadyYN; // variables to check if button clicked already, used in: payRollJSTools.js
var revertAlreadyYN;
var notAWorkDay;
function checkClick(index,week,nuHours,nuIncome,addOrRev){
	console.log(index,week,nuHours,nuIncome,addOrRev);
	console.log('clicked: ',clicked);
	console.log('hrInTotsObj: ',hrInTotsObj);
	addedAlreadyYN = ''; // variables to check if button clicked already, used in: payRollJSTools.js
	revertAlreadyYN = '';
	notAWorkDay = 'what'; // blank out input fields if clicked index is not a work day, used in payRollJSTools.js

	if (addOrRev == 'add'){
		for (var x = 0;x<hrInTotsObj.length;x++){
			console.log('index: ',index,' x: ',clicked[x].ndx);
			if (index == clicked[x].ndx){ // make sure button matches object content
				if (clicked[x].click == 0){
					clicked[x].click = 1;
					addedAlreadyYN = 'no';
					notAWorkDay = 'what';
					incomeMaths(index, week,nuHours,nuIncome);
					break;
				} else if (clicked[x].click == 1){
					addedAlreadyYN = 'yes';
					break;
				}
			} else {
				// console.log('add,not a work day: ');
				notAWorkDay = 'yes';
			}
		}

	} else if (addOrRev == 'rev'){

		for (var x = 0;x<hrInTotsObj.length;x++){
			if (index == clicked[x].ndx){ // make sure button matches object content
				if (clicked[x].click == 1){
					clicked[x].click = 0;
					revertAlreadyYN = 'no';
					revertMaths(index, week);
					break;
				} else if (clicked[x].click == 0){
					revertAlreadyYN = 'yes';
					// console.log("can't revert anymore");
					break;
				}
			}	else {
				// console.log('rev, not a work day');
			}
		}

	}


}


//(july 18)  ALL DONE
	// make function that changes colour of text for hour/income adjust for week totals and grand income total
		// loop through clicked() to see if there are any 1's
			//>>> yes, check for which week, make colours change(d) for that week and grand total
			// >>> no, check for which week, make colours original for that week and grand total

//(july 22)
	//loop through clicked, if == 1, see what column it is
		// if column == week1tot, then keep week1tot column coloured
		// if no columns are found, then go orig
	// when value reverts in work day in week1, week2tot remains coloured
		// so when weektots are at 0 clicks but work day is adjusted, the other week remains coloured 	 ALL DONE

	// grand total income math fuckky when values adjusted in week1 and week2
		// week1 totals come out weird...

// var colour1; // array used in revert to see if colours need to go back to original
// var colour2; // array used in revert to see if colours need to go back to original
var anyChangesWk1; // variablle to check for colour change, used in payRollJSTools.js
var anyChangesWk2;
function checkColour(index, week){
	var ck1 = 0;
	var ck2 = 0;
	var ck1tot=0;
	var ck2tot=0;
	anyChangesWk1 = 'colour';
	anyChangesWk2 = 'colour';
	for (var x =0;x<clicked.length;x++){
		if ((clicked[x].click == 1)&&(hrInTotsObj[x].week == 'week1')){ // check for work day, week1
			++ck1;
		} else if ((clicked[x].click == 1)&&(hrInTotsObj[x].week == 'week2')){ // check for workday, week2
			++ck2;
		} else if ((clicked[x].click == 1)&&(hrInTotsObj[x].week == 'week1tot')){ // check for workday, week2
			++ck1tot;
		} else if ((clicked[x].click == 1)&&(hrInTotsObj[x].week == 'week2tot')){ // check for workday, week2
			++ck2tot;
		}
	}
// week1
	if ((ck1>0)&&(ck1tot>0)){ // work day and week1tot has adjusts
			anyChangesWk1 = 'colour';
	} else if ((ck1>0)&&(ck1tot==0)){ // only work day has adjusts
			anyChangesWk1 = 'colour';
	} else if ((ck1==0)&&(ck1tot>0)){ // only week1tot has adjusts
			anyChangesWk1 = 'colour';
	} else if ((ck1==0)&&(ck1tot==0)){ // only week1tot has adjusts
			anyChangesWk1 = 'orig';
	}
// week2
	if ((ck2>0)&&(ck2tot>0)){ // work day and week2tot has adjusts
			anyChangesWk2 = 'colour';
	} else if ((ck2>0)&&(ck2tot==0)){ // only work day has adjusts
			anyChangesWk2 = 'colour';
	} else if ((ck2==0)&&(ck2tot>0)){ // only week2tot has adjusts
			anyChangesWk2 = 'colour';
	} else if ((ck2==0)&&(ck2tot==0)){ // only week2tot has adjusts
			anyChangesWk2 = 'orig';	
	}
	// console.log('week1tot: ',anyChangesWk1,' week2tot: ',anyChangesWk2);
}

