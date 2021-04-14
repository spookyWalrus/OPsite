
// Nov 14   DONE
  // 'no intermision: na' causes an error,  need a fix
  // also add date/time and who filled out show report  DONE (see Dec 21 in php page)

// Dec 08   DONE
  // Need alert if staff person doesn't exist in DB >> won't save data????  or???
      // >>> Should save anyone bc sometimes new people dont' have profile in DB when they work

// Dec 14   ALL DONE
    // For save changes on reportView, need to empty cache/array/variable that is used to check if
    // fields are empty. Currently it saves even if fields are empty bc the DB query has filled those
    // variables so script thinks the fields are filled...
        // should prevent save from saving??? >> check 'createShowReport.php' as well just in case

    // Error messages for staff hours table: spacing wonky, need to fix width/div sizes for each message
        //>> check same for createReport page

    // show report saves even if error message pops up for missing staff hours...

//Dec 16
    // automatically email show report? 
        // how to save as PDF?
        // or a screen cap?

// DEC 21  DONE
    // show report saves even when a name field is blank

// Dec 22  DONE
    // add indices to parse through for comments (added 3 new comment fields)

// Dec 23   DONE
    // Staff hours aren't being filled for view report mode.
        // Need to clear fields first? Not sure what error is
          // >>> YEp, need to reset all fields first: name, pos, hours

// Jan 05   DONE
    // Need to clear error messages when viewing a report in the header / staff fields
    // Error messages doubled when staff time field is empty when saving changes in viewReport  DONE

//Jan 08    DONE
    // In viewReport, when saving a new staff hours, need error flags to show when name/position/hours aren't filled
        // currently not happening!!

// Jan 13   DONE
    // When saving an old report as a new one, check and make sure that you aren't duplicating a report.
        // >> prompt user to make sure event name/location/code are different if they are not


// ....................  variables for input fields   ...............
var eventDate = document.getElementById('event_date');
var eventName = document.getElementById('event_name');
var eventLoc = document.getElementById('event_location');
var eventCode = document.getElementById('event_code');
var eventWthr = document.getElementById('event_weather');
var eventStrt = document.getElementById('event_start');
var eventEnd = document.getElementById('event_end');
var eventInt = document.getElementById('event_intermission');

var tLName = document.getElementById('tL_name');
var t1Name = document.getElementById('t1_name');
var t2Name = document.getElementById('t2_name');
var t3Name = document.getElementById('t3_name');
var t4Name = document.getElementById('t4_name');
var t5Name = document.getElementById('t5_name');

var tLeader = document.getElementById('tL');
var t1Pos = document.getElementById('t1_position');
var t2Pos = document.getElementById('t2_position');
var t3Pos = document.getElementById('t3_position');
var t4Pos = document.getElementById('t4_position');
var t5Pos = document.getElementById('t5_position');


// error message/ input fields...
var eroHrsMssg = document.getElementById('erorHrsMssg');
var stffHrsErr = document.getElementById('staffHourErrors');
var stffBrkErr = document.getElementById('staffBreaksErrors');
var eroHrs = document.getElementsByClassName('errorHours');
var eroMsg = document.getElementsByClassName('errorMessages');
var rlSlct = document.getElementsByClassName('roleSelect');
var eroHrStr = document.getElementsByClassName('errorHourStr');
var eroHrEnd = document.getElementsByClassName('errorHourEnd');
var eroBrk1 = document.getElementsByClassName('errorBrk1');
var eroBrk2 = document.getElementsByClassName('errorBrk2');
var eroBrk3 = document.getElementsByClassName('errorBrk3');

var inputAllGood = [];
// -----------------------------functions used for creating new show report  ----------------

// ........................... test date format ...................
function checkDateFormat(){
    var date = eventDate.value;
    var nuDate = date.replace(/-/g, ',');
    var noSpace = nuDate.replace(/\s/g, '');
    var dateArray = noSpace.split(',');

    if (!(dateArray.length == 3)){ 
    var msg = ("Bad date");
                 return msg;
     }
    // console.log(dateArray);
        for (var x=0; x < dateArray.length; x++){
            if (x == 0){          //check for proper year
                if (!(dateArray[x] === '2020')){
                 var msg = ("Check year format");
                 return msg;
                }
            } 
            if (x == 1){        // check month
                if (!(dateArray[x] > 0 && dateArray[x] < 13)){
                   var msg = ("Check month format");
                 return msg;
                }
            } 
            if (x == 2){        // check day
                if (!(dateArray[x] > 0 && dateArray[x] < 32)){
                   var msg = ("Check day format");
                 return msg;
                }
            } 
        }
        sessionStorage.setItem("theDate", date); // HTML session storage to pass date  back to showReportJax.js
    
}

// .............................. test and format for 24hr time ......................
var time24hr; // universal variable to pass back/forth re-formatted time.
var errorMess;  // must be empty at beginning of test
function formatTime(timeValue){
  sessionStorage.clear();
  errorMess = "";

  var list =  timeValue.replace("/", ',');
  var tight = list.replace(/\s/g,'');
  var arrr = tight.split(',');
  // console.log(arrr);
  for (x=0; x<arrr.length;x++){
        var time = arrr[x];
        if (time == 'na'){ //    if n/a is present, loop stops and is set in to array, continue with looping other values
          arrr[x] = time;
          continue;
        } else if (!(time == 'na')){  // if 'na' NOT present, keep testing
            var dots = time.includes(':');
            if (!dots || time == ''){   // test for colon or blank field
              errorMess = "Need colon or bad format";
              arrr[x] = errorMess;
              continue;
        }
      // check if there are non-numbers, format time for testing
            var noDots = time.replace(/:/g, ',');
            var killAM = noDots.replace(/AM/g, '');
            var killPM = killAM.replace(/PM/g, '');
            var killAm = killPM.replace(/am/g, '');
            var killPm = killAm.replace(/pm/g, '');
            var killComma = killPm.replace(/,/g, '');

             if (isNaN(killComma)){ // check for letters
              errorMess = "Numbers only";
              arrr[x] = errorMess;
              continue;
            }

            var checkIt = []; 
            checkIt = killPm.split(','); // split hours,minutes up into array
            if (checkIt[1] > 59){ // check for valid minutes
                errorMess = "time is no good";
                arrr[x] = errorMess;
                continue;
            }
            if (checkIt.length > 2){ // check for extra seconds etc
                errorMess = "hour and minutes only";
                arrr[x] = errorMess;
                continue;
            }
            var isAm = time.includes('am');
            var isPm = time.includes('pm');
            if (time.includes('AM')){
                isAm = true;
            } else if (time.includes('PM')){
              isPm = true;
            }

            if (isPm){ 
                    if (checkIt[0] < 12){ 
                    var nuHour = +(checkIt[0]) + +12; // add 12 to make it 24hr time
                    var armyTime = nuHour + ":" + checkIt[1];
                    arrr[x] = armyTime;
                    continue;
                } 
            } else if (isPm && (checkIt[0] == 12)){ // do nothing if it's 12 noon...
                    var armyTime = checkIt[0] + ":" + checkIt[1];
                    // console.log(armyTime + " is noon");  
                    arrr[x] = armyTime;
                    continue;
            } 

          // format time for 24-hour if AM symbol exists
            if (isAm && (checkIt[0] < 12 && checkIt[0] > 9)){  // if hours between 10 and 12...
                var armyTime = checkIt[0] + ":" + checkIt[1];
                // console.log(armyTime + " isAm");  
                arrr[x] = armyTime;
                continue;
            } else if (isAm && (checkIt[0] < 10)){  // if hours between 1 and 9, check first digit
                var hours = checkIt[0];
                var isZero = hours.charAt(0);
                if (isZero > 0){        
                    var armyTime = "0" + checkIt[0] + ":" + checkIt[1]; // add a zero to beginning if missing, or, 
                    // console.log(armyTime + " isAm");  
                    arrr[x]= armyTime;
                    continue;
                } else if (isZero == 0){
                  var armyTime = checkIt[0] + ":" + checkIt[1]; // don't add a zero to beginning if already there
                    arrr[x] = armyTime;
                    continue;
                }
            } else if (isAm && (checkIt[0] == 12)){ // if they enter 12 in the morning...
                var nuHour = +(checkIt[0]) + +12;  // add 12 to make it 24hr time
                var armyTime = nuHour + ":" + checkIt[1];
                arrr[x] = armyTime;
                continue;
            } else if (isAm && (checkIt[0] > 11)){ // if 24hr format but has AM added...
              errorMess = "is it morning or night?";
              continue;
            } 
          // in case am or pm is not indicated...
            var hourAgain = checkIt[0];
            var isZeroAgain = hourAgain.charAt(0); // variable to check first digit of 'hours'

            if (!isAm){
                  if (!isPm && (checkIt[0] == 00)){   // if 00 is used to indicate midnight, change format
                      var armyTime =  "24:" + checkIt[1]; 
                      arrr[x] = armyTime;
                      continue;
                  } else if (isZeroAgain == 0){  // if 0 exists to indicate morning time, 
                        var armyTime =  checkIt[0] + ":" + checkIt[1]; //  leave time as is, or,
                        arrr[x] = armyTime;
                        continue;
                  } else if ((isZeroAgain > 0) && (checkIt[0] < 10)){ // if 0 is missing to single digit 'hour', or, 
                        errorMess = "Use 4-digit, 24hr time";
                       continue;
                  } else if ((checkIt[0] > 9) && (checkIt[0] < 12)){ // leave as-is if 'hour' is double digit,
                        // if (checkIt[0] < 12){
                        var armyTime =   checkIt[0] + ":" + checkIt[1]; 
                        arrr[x] = armyTime;
                       continue;
                  }
            }   
          // if format is correct and it's morning
            if ((isAm) && checkIt[0] < 12){ 
                var armyTime = checkIt[0] + ":" + checkIt[1];
                // console.log(armyTime + " in morning");  
                arrr[x] = armyTime;
                continue;
            }
          // if format is correct and afternoon  
            if (checkIt[0] > 11 && checkIt[0] < 25){ 
                var armyTime = checkIt[0] + ":" + checkIt[1];
                // console.log(armyTime + " in afternoon");  
                arrr[x] = armyTime;
                continue;
            } 
          // if format is correct but beyond 24...
            if (checkIt[0] > 24){ 
             errorMess = "Bad time";
              continue;
            }
        }
     
  } 
  if (arrr.length == 1){
    time24hr= arrr[0];
    // console.log(time24hr);
    sessionStorage.setItem("time24hr", time24hr); // HTML session storage to pass date  back to showReportJax.js
  } else if (arrr.length == 2){
    var time1 = arrr[0];
    var time2 = arrr[1];
    time24hr = time1+ " / "+time2;
    // console.log(time24hr);
    sessionStorage.setItem("time24hr", time24hr); // HTML session storage to pass date  back to showReportJax.js
  }
  return;
}


// ...... function used to check name...
var nameArray = []; // array to be passed to other JS page: showReporJax.js
function checkStaffName(){ 
  var staffName;
  console.log('the names currently are: ',currentNames);
  // check if name exists or not...
  for (var x=0; x < 6; x++){ 
      if (x == 0){ 
        staffName = tLName.value;
            if (!(staffName == null) || !(staffName == '')|| !(staffName == 'na')){
            //   nameArray[0] == null;
            // } else {
              nameArray[0] = staffName;
            }else{
              nameArray[0] ='';
            }
      }
      if (x > 0) {
          staffId = window["t"+[x]+"Name"]; //parse through all staff id's...
          staffName = staffId.value;
          var checkName = staffName.replace("\s",''); // cut out any white spaces
          // console.log('checked name is: ',checkName);
          if  ((checkName == null)|| (checkName.length == 0) ){ // if name is empty
              nameArray[x] = '';
          }else{ // name value 
              if (staffName == currentNames[x]) { // if name hasn't changed
                nameArray[x] = staffName;
                  console.log('staff name not changed: ',staffName);
              } else if (currentNames[x] == "undefined"){ // if no name exists at index, thus is new name
                  console.log('current index does not exist, so name set as: ',staffName);
                  nameArray[x] = staffName;
              } else if ((currentNames[x] != "undefined") && (staffName != currentNames[x])){ // if a name exists at index and has changed
                      if(staffName == 'na'){ // name changed to 'na', to be deleted
                        var oldNew = currentNames[x] +' : na';
                        nameArray[x] = oldNew;
                        console.log('name deleted to: ',nameArray[x]);
                      }else if (staffName != currentNames[x]){ // name changed to another name, save new name
                          nameArray[x] = staffName;
                      }
              }
              
              
          }
      }
  // console.log(nameArray[x]);

  } // variable is an array, so need to encode as JSON object to pass bw scripts ...
  sessionStorage.setItem("nameArray", JSON.stringify(nameArray)); // HTML session storage to pass date  back to showReportJax.js
}

// ..................... function to check break time in minutes   ...............
var timeInMin; // universal variable to re-format time.
function checkBreaks(timeValue){
  // checkNA();
  // sessionStorage.clear();

  var time = timeValue;
  var minYa = time.includes('min');
  var minutesYa = time.includes('minutes');
  var timeGo = !isNaN(time);
  var timeNo = isNaN(time);

  // var timeNum = /^\d+$/.test(time); // check if 
      if (time == 'n/a'){ // return no message, bypass rest of function
        return;
      } else if (!(time == 'n/a')){ // check for other values
          if (minYa){  // if 'min' exists,
                if (timeGo){  // and time is only numbers,
                  timeInMin = time;  // set variable value for data, or, 
                // console.log('min exists');
                }
          } else if (minutesYa){ // if 'minutes' exists,
                if (timeGo){  // and time is only numbers
                      timeInMin = time;  // set variable value for data, or,
                    // console.log('minutes exist');
                    }
          } else if (timeGo){  // only numbers exists
                      timeInMin = time;  // set variable value for data 
                      // console.log('only numbers');
          } else {   // make error message
            var errorMess = "Bad minutes format";
            // console.log('everything else');
            return errorMess;
          }

         
      }
}

function setDatelessDate(dateArray){
    // console.log(date);
    var date = dateArray[0];
    var monEnds = [31,28,31,30,31,30,31,31,30,31,30,31];
    var fullDate = date.split('-');
    var year = fullDate[0];
    var month = fullDate[1];
    var checkIt = (year - 2020/4);
    var leapYr = Number.isInteger(checkIt); // check for leap year
    var startEndDates = []; // array to send back for ajax call...

    for(var x = 0;x<monEnds.length;x++){
        if(month == x+1){ // check what month it is
            if((month == 2)&&(leapYr)){ // if it's feb and a leap yar
                startEndDates[0] = year +"-"+month+"-"+01; // start of month
                startEndDates[1] = year +"-"+month+"-"+(monEnds[x]+1); // end of month
            }else{ // otherwise set dates as normal....
                startEndDates[0] = year +"-"+month+"-"+01; // start of month
                startEndDates[1] = year +"-"+month+"-"+(monEnds[x]); // end of month
            }

        }

    }
    return startEndDates;
}

// ------------------------------ functions used for view Report mode -----------------------

function clearFields(){
    var thing = [eventDate,eventName,eventLoc,eventCode,eventWthr,eventStrt,eventEnd,eventInt];
    for(var x=0;x<thing.length;x++){ // clear out header fields
      var field = thing[x];
      field.value ='';
    }
      // console.log('headers cleared');
    
    var names = [tLName,t1Name,t2Name,t3Name,t4Name,t5Name];
    var position = [tLeader,t1Pos,t2Pos,t3Pos,t4Pos,t5Pos];
    var nameL = names[0];
    var posL = position[0];
      nameL.value = 'na'; // clear out SS name
      posL.value = '--'; // clear out SS position
    for(var y = 1;y<4;y++){ // clear out rest of SS fields
        var startId = 'tL'+'_start'+`${y}`;    
        var endId = 'tL'+'_end'+`${y}`;
        var eleIdStar= document.getElementById(startId);
        var eleIdEnd= document.getElementById(endId);
          eleIdStar.value = 'na';
          eleIdEnd.value ='na';   
    }
    // console.log('super fields cleared');
    for(var y = 1;y<(names.length);y++){ // clear out all fields for rest of techs/ staff
        var name = names[y];
        var pos = position[y];
        name.value = 'na';
        pos.value = 'na';
        for (var x=1;x<4;x++){
          var startId = 't'+`${y}`+'_start'+`${x}`;    
          var endId = 't'+`${y}`+'_end'+`${x}`;
          var eleIdStar= document.getElementById(startId);
          var eleIdEnd= document.getElementById(endId);
          eleIdStar.value = 'na';
          eleIdEnd.value = 'na';
        }
    }
    // console.log('staff fields cleared');

     for(var x =0;x<4;x++){ // clear out comments fields
       var comments = document.getElementsByClassName('sRTextArea')[x].value;
       comments.value = '';
    }
    // console.log('comments cleared');

}

function fillOutHeader(data){   
    var fields = [eventDate,eventName,eventLoc,eventCode,eventWthr,eventStrt,eventEnd,eventInt];
    //note: the array in 'data' is established in showReportTools.php
    var header = data[0];
    // console.log('header info: ',header);
    var length = Object.keys(header).length;
        for(var x=0;x<length;x++){
            // x = x-1;
            if((x > 0)&&(x<length-5)){
                var key = Object.keys(header)[x];
                var value = header[key];
                // console.log('key-value is: ',key, value);
                fields[x-1].value = value;
            }else if (x >= length-5){
              if(x == length - 5){
                  var comments = document.getElementsByClassName("sRTextArea")[0];
                  var key = Object.keys(header)[x];
                  comments.innerHTML = header[key];
              } else if(x == length - 4){
                  var comments = document.getElementsByClassName("sRTextArea")[1];
                  var key = Object.keys(header)[x];
                  comments.innerHTML = header[key];
              } else if(x == length - 3){
                  var comments = document.getElementsByClassName("sRTextArea")[2];
                  var key = Object.keys(header)[x];
                  comments.innerHTML = header[key];
              }else if(x == length - 2){
                  var comments = document.getElementsByClassName("sRTextArea")[3];
                  var key = Object.keys(header)[x];
                  comments.innerHTML = header[key];
              }
                
            }
    }

}
// var t1Start = document.getElementById("t1_start1");
// var tLEnd = document.getElementById("tL_end1");


var currentNames = []; // this is referred to when a name is changed/ edited in viewReport
function fillOutStaffHours(data){   
    var names = [tLName,t1Name,t2Name,t3Name,t4Name,t5Name];
    var position = [tLeader,t1Pos,t2Pos,t3Pos,t4Pos,t5Pos];
    var dataset = data.slice(1); // omit index 0 as it contains header info
    // console.log(dataset);
    var ob = dataset[0]; // ob is also an array, so need to loop through to get to objects
    for(var x = 0;x<ob.length;x++){
        // console.log(obob);
        if(x == 0){ // fill out values for supervisor/ team leader
            var obob = ob[x];
            // console.log(obob);
            for(let key in obob){
                if (obob.hasOwnProperty(key)){
                    // console.log(key);
                    switch(key){
                        case 'staff_name':
                        names[x].value = `${obob[key]}`;
                        currentNames[x] = `${obob[key]}`;
                        break;

                        case 'position':
                        position[x].value = `${obob[key]}`;
                        // console.log('position is: '+`${obob[key]}`)
                        break;
                        case 'start1':
                            var varName = document.getElementById('tL_start1');
                            varName.value = `${obob[key]}`;
                        break;
                        case 'end1':
                            var varName = document.getElementById('tL_end1');
                            varName.value = `${obob[key]}`;
                        break;
                        case 'start2':
                            var varName = document.getElementById('tL_start2');
                            varName.value = `${obob[key]}`;
                        break;
                        case 'end2':
                            var varName = document.getElementById('tL_end2');
                            varName.value = `${obob[key]}`;
                        break;
                        case 'start3':
                            var varName = document.getElementById('tL_start3');
                            varName.value = `${obob[key]}`;
                        break;
                        case 'end3':
                            var varName = document.getElementById('tL_end3');
                            varName.value = `${obob[key]}`;
                        break;

                    }
                }
            }
        }else if(x>0){ // fill out values for technicians/ staff
            var obob = ob[x];
            // console.log(obob);
            for(let key in obob){
                if (obob.hasOwnProperty(key)){
                    switch(key){
                        case 'staff_name':
                        // console.log('name: ',obob[key]);
                        // console.log('this: ',names[x]);
                        names[x].value = `${obob[key]}`;
                        currentNames[x] = `${obob[key]}`;
                        break;

                        case 'position':
                        position[x].value = `${obob[key]}`;
                        break;
                         case 'start'+`${x}`:
                            var newId = 't'+`${x}`+'_start'+`${x}`;
                            var varName = document.getElementById(newId);
                            varName.value = `${obob[key]}`;
                        break;
                        case 'end'+`${x}`:
                            var newId = 't'+`${x}`+'_end'+`${x}`;
                            var varName = document.getElementById(newId);
                            varName.value = `${obob[key]}`;
                        break;
                    }
                }
            }
        }
    }
    
}
   

