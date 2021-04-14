
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

// var tLStart = document.getElementById('tL_start');
// var t1Start = document.getElementById('t1_start');
// var t2Start = document.getElementById('t2_start');
// var t3Start = document.getElementById('t3_start');
// var t4Start = document.getElementById('t4_start');
// var t5Start = document.getElementById('t5_start');

// var tLEnd = document.getElementById('tL_end');
// var t1End = document.getElementById('t1_end');
// var t2End = document.getElementById('t2_end');
// var t3End = document.getElementById('t3_end');
// var t4End = document.getElementById('t4_end');
// var t5End = document.getElementById('t5_end');

// var idStart;
// var idEnd;
// var idNum;
// for (x=1;x<3;x++){
//   if (x == 0){
//     idNum = window["tL"+"_start"+[x];
//     idStart = "document.getElementById(idNum)";
//     console.log(idStart).value; // output id  
//   }
//   if (x > 0){
//     idNum = window["t"+[x]+"_start"+[x]];
//     idStart = "document.getElementById(idNum)";
//     console.log(idStart); // output id
//     console.log(idStart.value);
//   }
// }


// var tL_bk1 = document.getElementById('tL_bk1');
// var t1_bk1 = document.getElementById('t1_bk1');
// var t2_bk1 = document.getElementById('t2_bk1');
// var t3_bk1 = document.getElementById('t3_bk1');
// var t4_bk1 = document.getElementById('t4_bk1');
// var t5_bk1 = document.getElementById('t5_bk1');

// var tL_bk2 = document.getElementById('tL_bk2');
// var t1_bk2 = document.getElementById('t1_bk2');
// var t2_bk2 = document.getElementById('t2_bk2');
// var t3_bk2 = document.getElementById('t3_bk2');
// var t4_bk2 = document.getElementById('t4_bk2');
// var t5_bk2 = document.getElementById('t5_bk2');

// var tL_bk3 = document.getElementById('tL_bk3');
// var t1_bk3 = document.getElementById('t1_bk3');
// var t2_bk3 = document.getElementById('t2_bk3');
// var t3_bk3 = document.getElementById('t3_bk3');
// var t4_bk3 = document.getElementById('t4_bk3');
// var t5_bk3 = document.getElementById('t5_bk3');

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
// ------------------ functions used by show report  ---------

function checkDateFormat(){
    var date = eventDate.value;
    var nuDate = date.replace(/-/g, ',');
    var noSpace = nuDate.replace(/\s/g, '');2
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
  // check if name exists or not...
  for (var x=0; x < 6; x++){
      if (x == 0){ 
        staffName = tLName.value;
            if (!(staffName == null) || (staffName == '')){
            //   nameArray[0] == null;
            // } else {
              nameArray[0] = staffName;
            }
      }
      if (x > 0) {
          staffId = window["t"+[x]+"Name"]; //parse through all staff id's...
          staffName = staffId.value;
          if (!(staffName == null)|| (staffName == '')){ // if it is NOT empty, put name into array
              nameArray[x] = staffName;
            }
      }
  // console.log(nameArray[x]);

  } // variable is an array, so need to encode as JSON object to pass bw scripts ...
  sessionStorage.setItem("nameArray", JSON.stringify(nameArray)); // HTML session storage to pass date  back to showReportJax.js
}

// .... function to check break time in minutes ....
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

