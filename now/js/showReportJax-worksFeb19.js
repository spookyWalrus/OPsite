// showReportJax.js

// var datePHP ='';
//   ..................    fill out default values in report  .............
function fillDefaults(){
        $.ajax({
            type: 'post',	
            url: 'showReportTools.php',
            data: 'fillDefaults', 
            dataType: 'text',
            success: function (data) {
            	var daDate = data;  
            	// console.log(data);
              	eventDate.value = daDate;
              	// eventLoc.value = 'OP';
                tLeader.value = 'SS';
                t1Pos.value = 'HA';
                t2Pos.value = 'HLX';
                t3Pos.value = 'ST';
	           
            }, 
            error: function(data){
            	alert("something's gone wrong");
            	console.log(data);
            	// alert(data);
	        },
      	});
	// });
}; 

$(document).ready(fillDefaults());

//  --------------   function to check show report header input -----------

var date;  // need this to get date value from other JS script...

var headerValues;  // this will be the array used to send all data back for PHP data entry

function checkShowReportHeader(){

  // check date
   var dateBad = checkDateFormat();
   if (dateBad){
      eroMsg[0].innerHTML = dateBad;
      eroMsg[0].style.visibility = 'visible';
      eventDate.style.borderColor = '#B43232';
      inputAllGood[0] = 1;
   } else {
    eroMsg[0].style.visibility = 'hidden';
      eventDate.style.borderColor = '#cec7c7';
      inputAllGood[0] = 0;
      date = sessionStorage.getItem("theDate"); // data retrieved through HTML session from showReportJSTools.js
   }
    //check event name
    var name = eventName.value;
    if (name.length == 0){
      eroMsg[1].style.visibility = 'visible';
      eventName.style.borderColor = '#B43232';
      inputAllGood[1] = 1;
    } else if (name.length > 0){
      eroMsg[1].style.visibility = 'hidden';
      eventName.style.borderColor = '#cec7c7';
      inputAllGood[1] = 0;
    }
    //check event location
    var venue = eventLoc.options[eventLoc.selectedIndex].value;
    if (venue == "null"){
      eroMsg[2].style.visibility = 'visible';
      eventLoc.style.borderColor = '#B43232';
      inputAllGood[2] = 1;
    } else if (venue == "OP" || venue == "DB" || venue == "FC"){
      eroMsg[2].style.visibility = 'hidden';
      eventLoc.style.borderColor = '#cec7c7';
      inputAllGood[2] = 0;
    }
    //check event code
    var code = eventCode.value;
    if (code.length == 0){
      eroMsg[3].style.visibility = 'visible';
      eventCode.style.borderColor = '#B43232';
      inputAllGood[3] = 1;
    } else if ((name.length > 0) || (name == 'n/a')){
      eroMsg[3].style.visibility = 'hidden';
      eventCode.style.borderColor = '#cec7c7';
      inputAllGood[3] = 0;
    }
    //check event weather
    var weather = eventWthr.value;
    if (weather.length == 0){
      eroMsg[4].style.visibility = 'visible';
      eventWthr.style.borderColor = '#B43232';
      inputAllGood[4] = 1;
    } else if (weather.length > 0){
      eroMsg[4].style.visibility = 'hidden';
      eventWthr.style.borderColor = '#cec7c7';
      inputAllGood[4] = 0;
    }
    //check event start
    var startTime = eventStrt.value;
    var checkTime = formatTime(startTime); // test and re-format time
    var newTime = sessionStorage.getItem("time24hr");
         if (errorMess.length == 0){  
            eroMsg[5].style.visibility = 'hidden';
            eventStrt.style.borderColor = '#cec7c7';
            inputAllGood[5] = 0;
            eventStrt.value = newTime;
          } else if (errorMess.length > 0){
            eroMsg[5].style.visibility = 'visible';
            eroMsg[5].innerHTML = errorMess;
            eventStrt.style.borderColor = '#B43232';
            inputAllGood[5] = 1;
        } 

     //check event end
    var endTime = eventEnd.value;
    var checkEndTime = formatTime(endTime); // re-format time
    var newTime = sessionStorage.getItem("time24hr");
        if (errorMess.length == 0){  
         eroMsg[6].style.visibility = 'hidden';
        eventEnd.style.borderColor = '#cec7c7';
        inputAllGood[6] = 0;
        eventEnd.value = newTime;
       } else if (errorMess.length > 0){
         eroMsg[6].style.visibility = 'visible';
        eroMsg[6].innerHTML = errorMess;
        eventEnd.style.borderColor = '#B43232';
        inputAllGood[6] = 1;
    }
    
     //check event intermission
    var intermission = eventInt.value;
    var min = intermission.includes('min');
    if (intermission.length == 0 || !(min)){
      eroMsg[7].style.visibility = 'visible';
      eventInt.style.borderColor = '#B43232';
      inputAllGood[7] = 1;
    } else if (intermission.length > 0 && (min) ){
      eroMsg[7].style.visibility = 'hidden';
      eventInt.style.borderColor = '#cec7c7';
      inputAllGood[7] = 0;
    }

// array values set to be used for data entry via PHP
  headerValues = [date, name, venue, code, weather, startTime, endTime, intermission];

// check values to see if entry fields are good to go for data entry...
  var i = 0;
  for (var x=0; x < inputAllGood.length; x++) {
       i = inputAllGood[x] + i;;
  }
  if (i > 0){ // show error message/ do not continue
    // alert("some mistakes with report details");
     // checkStaffHoursHeader();  // delete this for final rendition

  } else if (i == 0) { // continue to next function / process
     // checkStaffHoursHeader(); 
  }

}

var workHours = []; // Master array used to collect work hours from below functions and used for AJAX call
    var names = []; // need these arrays to be outside of function to be entered into above array
    var position = [];
var checkFinalErrors = []; // array used to check if everything is good to submit with AJAX

function checkStaffHoursHeader(){
    sessionStorage.clear();
    var inputAllGood2 = [];  // array used to check error messages and move to next function

// ...... staff names 
    var names = [];
    checkStaffName();
    names = JSON.parse(sessionStorage.getItem("nameArray")); // decode JSON object, from: showReportJSTools.js
    for (x=0; x < names.length; x++){
        if (names[0] == ''){   // if name is blank, show error, or,
          eroHrs[0].style.borderColor = '#B43232';
          inputAllGood2[0] = 1;
        } else if (names[0].length > 0){ // if not blank, move on
          eroHrs[0].style.borderColor = '#96979a';
          inputAllGood2[0] = 0;
        } 
        if ((x > 0) && (names[x] == '')){
          eroHrs[x].style.borderColor = '#B43232';
          inputAllGood2[1] = 1;
        } else if ((x > 0) && (names[x].length > 0)){
          eroHrs[x].style.borderColor = '#96979a';
          inputAllGood2[1] = 0;
        }
       
    }
//check staff positions...
    // var position = [];
    for (var x=0; x < 6; x++){
        var role;
        if (x == 0){
            role = tLeader.options[tLeader.selectedIndex].value;
            if (role == "--"){
              rlSlct[0].style.borderColor = '#B43232';
              inputAllGood2[2] = 1;
            } else if (role == "SS" || role == "FOH"){
              rlSlct[0].style.borderColor = '#96979a';
               inputAllGood2[2] = 0;
              position[0] = role; // assign role in to array
            }
        }
        if (x > 0){ 
            var staffPosition = window["t"+[x]+"Pos"];
            role = staffPosition.options[staffPosition.selectedIndex].value;
            if (role == "--"){
              rlSlct[x].style.borderColor = '#B43232';
              inputAllGood2[3] = 1;
            } else if (!(role == "--")){
              rlSlct[x].style.borderColor = '#96979a';
              inputAllGood2[3] = 0;
              position[x] = role; // assign role into array
            }
        }
    }

// test values to see if entry fields are good to go for data entry...
    var j=0;
    for (var x=0; x < inputAllGood2.length; x++) { 
          j = inputAllGood2[x] + j;
    }
      if (j == 0){ // move on to next function/process
         eroHrsMssg.style.visibility = 'hidden';
          checkFinalErrors[0] = 0;
          checkStaffHours();
      } else if (j > 0) { // show error message, do not continue
          eroHrsMssg.style.visibility = 'visible';
          checkFinalErrors[0] = 1;
          checkStaffHours();  // delete this for final rendition....!!!!!
      }
}

//  ......   Staff work hours .....
function checkStaffHours(){
// ...... staff start times.........  
    var staffStartGood = [];  // array used to check error messages and move to next function
    var teamStartTimes = []; // array to collect data
    for (x = 0; x < 6; x++){
        var startTime;
        var checkTime;
        if (x == 0){ // SS start time
            startTime = tLStart.value;
            checkTime = formatTime(startTime); // re-format time    
            if (checkTime && (checkTime == 'n/a')){  // format ok
                eroHrStr[0].style.borderColor = '#96979a';
              staffStartGood[0] = 0;
            } else if (checkTime){   // time is bad
                eroHrStr[0].style.borderColor = '#B43232';
                staffStartGood[0] = 1;
            } else if (!checkTime){ // time is good
              eroHrStr[0].style.borderColor = '#96979a';
              staffStartGood[0] = 0;
              teamStartTimes[0] = startTime; // start time for team leader
            }
        }
        if (x > 0){
            var staffTime = window["t"+[x]+"Start"];
            startTime = staffTime.value;
            checkTime = formatTime(startTime); // re-format time    
            if (startTime && (startTime == 'n/a')){  // not enough time
                eroHrStr[x].style.borderColor = '#96979a';
              staffStartGood[x] = 0;
            } else if (checkTime){   // time is bad
                eroHrStr[x].style.borderColor = '#B43232';
                staffStartGood[x] = 1;
            } else if (!checkTime){ // time is good
              eroHrStr[x].style.borderColor = '#96979a';
              staffStartGood[x] = 0;
              teamStartTimes[x] = startTime; // start time for other staff
            } 
        }
    }
// ...........  check staff End Times ...........
     var staffEndGood = [];  // array used to check error messages and move to next function
    var teamEndTimes = []; // array to collect data
    for (x = 0; x < 6; x++){
        var endTime;
        var checkTime;
        if (x == 0){ // SS start time
            endTime = tLEnd.value;
            checkTime = formatTime(endTime); // re-format time    
            if (checkTime && (checkTime == 'n/a')){  // format ok
                eroHrEnd[0].style.borderColor = '#96979a';
              staffEndGood[0] = 0;
            } else if (checkTime){   // time is bad
                eroHrEnd[0].style.borderColor = '#B43232';
                staffEndGood[0] = 1;
            } else if (!checkTime){ // time is good
              eroHrEnd[0].style.borderColor = '#96979a';
              staffEndGood[0] = 0;
              teamEndTimes[0] = endTime; // start time for team leader
            }
        }
        if (x > 0){
            var staffTime = window["t"+[x]+"End"];
            endTime = staffTime.value;
            checkTime = formatTime(endTime); // re-format time    
            if (endTime && (endTime == 'n/a')){  // not enough time
                eroHrEnd[x].style.borderColor = '#96979a';
              staffEndGood[x] = 0;
            } else if (checkTime){   // time is bad
                eroHrEnd[x].style.borderColor = '#B43232';
                staffEndGood[x] = 1;
            } else if (!checkTime){ // time is good
              eroHrEnd[x].style.borderColor = '#96979a';
              staffEndGood[x] = 0;
              teamEndTimes[x] = endTime; // start time for other staff
            } 
        }
    }
    // check start and end values to see if entry fields are good to continue...
    var h = 0;
    var i = 0;
    for (var x=0; x < staffStartGood.length; x++) { // test for valid input
          h = staffStartGood[x] + h;
          i = staffEndGood[x] + i;
    }
    if ((i == 0) && (h == 0)){
       stffHrsErr.style.visibility = 'hidden';
      checkFinalErrors[1] = 0;
    } else if ((i > 0) || (h>0)) {  // or there's an error
        stffHrsErr.style.visibility = 'visible';
        checkFinalErrors[1] = 1;
        
    }

//  .............. check break 1
    var breaks1Good = []; // array to check error exists or not
    var staffBreaks1 = [];  // array to collect data for AJAX
    for (x=0; x < 6; x++){
          var breakTime; // input value
          var checkTime; 
          if (x == 0){
              breakTime = tL_bk1.value;
              checkTime = checkBreaks(breakTime);
              if (breakTime == ''){
                eroBrk1[0].style.borderColor = '#B43232';
                breaks1Good[0] = 1;
                // console.log(checkTime + ' space');
              } else if (checkTime){
                eroBrk1[0].style.borderColor = '#B43232';
                breaks1Good[0] = 1;
                // console.log(checkTime);
              } else if (!checkTime){
                eroBrk1[0].style.borderColor = '#96979a';
                breaks1Good[0] = 0;
                staffBreaks1[0] = breakTime; // collect data to array
                // console.log(breakTime);
              }
          }
          if (x > 0){
              breakTime = window["t"+[x]+"_bk1"].value;
              checkTime = checkBreaks(breakTime);
              // console.log(checkTime);
              if (breakTime == ''){
                eroBrk1[x].style.borderColor = '#B43232';
                breaks1Good[x] = 1;
                // console.log(checkTime + ' space');
              } else if (checkTime){
                eroBrk1[x].style.borderColor = '#B43232';
                breaks1Good[x] = 1;
                // console.log(checkTime);
              } else if (!checkTime){
                eroBrk1[x].style.borderColor = '#96979a';
                breaks1Good[x] = 0;
                staffBreaks1[x] = breakTime; // collect data to array
                // console.log(breakTime);
              }
          }
    }

//  .............. check break 2
    var breaks2Good = [];  // array to check for errors
    var staffBreaks2 = [];  // array to collect data for AJAX

    for (x=0; x < 6; x++){
          var breakTime; // input value
          var checkTime; 
          if (x == 0){
              breakTime = tL_bk2.value;
              // breakTime = window["t"+[x]+"_bk1"].value;
              checkTime = checkBreaks(breakTime);
              // console.log(checkTime);
              if (breakTime == ''){
                eroBrk2[0].style.borderColor = '#B43232';
                breaks2Good[0] = 1;
                // console.log(checkTime + ' space');
              } else if (checkTime){
                eroBrk2[0].style.borderColor = '#B43232';
                breaks2Good[0] = 1;
                // console.log(checkTime);
              } else if (!checkTime){
                eroBrk2[0].style.borderColor = '#96979a';
                breaks2Good[0] = 0;
                staffBreaks2[0] = breakTime; // collect data to array
                // console.log(breakTime);
              }
          }
          if (x > 0){
              var staff = window["t"+[x]+"_bk2"];
              breakTime = staff.value;
              checkTime = checkBreaks(breakTime);
              if (breakTime == ''){
                eroBrk2[x].style.borderColor = '#B43232';
                breaks2Good[x] = 1;
              } else if (checkTime){
                eroBrk2[x].style.borderColor = '#B43232';
                breaks2Good[x] = 1;
              } else if (!checkTime){
                eroBrk2[x].style.borderColor = '#96979a';
                breaks2Good[x] = 0;
                staffBreaks2[x] = breakTime; // collect data to array
              }
          }
    }

//  .............. check break 3
    var breaks3Good = []; // array to check error exists or not
    var staffBreaks3 = [];  // array to collect data for AJAX
    for (x=0; x < 6; x++){
          var breakTime; // input value
          var checkTime; 
          if (x == 0){
              breakTime = tL_bk3.value;
              checkTime = checkBreaks(breakTime);
              if (breakTime == ''){
                eroBrk3[0].style.borderColor = '#B43232';
                breaks3Good[0] = 1;
                // console.log(checkTime + ' space');
              } else if (checkTime){
                eroBrk3[0].style.borderColor = '#B43232';
                breaks3Good[0] = 1;
                // console.log(checkTime);
              } else if (!checkTime){
                eroBrk3[0].style.borderColor = '#96979a';
                breaks3Good[0] = 0;
                staffBreaks3[0] = breakTime; // collect data to array
                // console.log(breakTime);
              }
          }
          if (x > 0){
              breakTime = window["t"+[x]+"_bk3"].value;
              checkTime = checkBreaks(breakTime);
              // console.log(checkTime);
              if (breakTime == ''){
                eroBrk3[x].style.borderColor = '#B43232';
                breaks3Good[x] = 1;
                // console.log(checkTime + ' space');
              } else if (checkTime){
                eroBrk3[x].style.borderColor = '#B43232';
                breaks3Good[x] = 1;
                // console.log(checkTime);
              } else if (!checkTime){
                eroBrk3[x].style.borderColor = '#96979a';
                breaks3Good[x] = 0;
                staffBreaks3[x] = breakTime; // collect data to array
                // console.log(breakTime);
              }
          }
    }

// check values for breaks1,2,3 to see if entry fields are good to go for data entry...
    var j = 0;
    var k = 0;
    var l = 0;
    for (var x=0; x < breaks3Good.length; x++) { // test for valid input
          j = breaks1Good[x] + j;
          k = breaks2Good[x] + k;
          l = breaks3Good[x] + l;
      }
      if ((j == 0) && ( k == 0) && (l == 0)) { // no errors, continue on
         stffBrkErr.style.display = 'none';
         checkFinalErrors[2] = 0;
      } else if ((j>0) || (k>0) || (l > 0)) { // errors, show error message
          stffBrkErr.style.display = 'inline';
           checkFinalErrors[2] = 1;
          // return;
      }
// final check for errors for all groups, then submit to AJAX if all good......
    var m = 0;
    for (var x=0; x < checkFinalErrors.length; x++){
        m = checkFinalErrors[x] + m;
      }
      if (m == 0){
       workHours = [names, position, teamStartTimes, teamEndTimes, staffBreaks1, staffBreaks2, staffBreaks3]
       console.log(workHours);
      alert("subitting hours");
      // submit to AJAX
      } else if (m > 0){
        return;
      }
     

// fill array to be used for AJAX call



    // //check staff end
    // var staffEnd = []; // array to collect data
    // for (x=0;x<6; x++){
    //     // var errorMessageYN = [];
    //     var endTime;
    //     var checkTime;
    //     if (x == 0){ // SS start time
    //         endTime = tLEnd.value;
    //         checkTime = formatTime(endTime); // re-format time    
    //         if ((endTime.length < 4)||(startTime == '')){  // not enough time
    //             eroHrStr[0].style.borderColor = '#B43232';
    //             // errorMessageYN[0] = 0;
    //             inputAllGood2[0] = 1;
    //             // eroHrsMssg.style.visibility = 'visible';
    //           // errorMessageYN[1] = 0;
    //           inputAllGood2[1] = 0;
    //         } else if (checkTime){   // time is bad
    //             eroHrStr[0].style.borderColor = '#B43232';
    //             // errorMessageYN[1] = 0;
    //             inputAllGood2[0] = 1;
    //         } else if (!checkTime){ // time is good
    //           eroHrStr[0].style.borderColor = '#96979a';
    //           // errorMessageYN[1] = 1;
    //           inputAllGood2[0] = 0;
    //           staffStart[0] = startTime; // collect data to array
    //         }
    //     }
    //     if (x > 0){
    //         var staffTime = window["t"+[x]+"Start"];
    //         startTime = staffTime.value;
    //         checkTime = formatTime(startTime); // re-format time    
    //         if ((startTime.length < 4)||(startTime == '')){  // not enough time
    //             eroHrStr[x].style.borderColor = '#B43232';
    //           inputAllGood2[1] = 1;
    //         } else if (checkTime){   // time is bad
    //             eroHrStr[x].style.borderColor = '#B43232';
    //             // errorMessageYN[0] = 0;
    //             inputAllGood[1] = 1;
    //         } else if (!checkTime){ // time is good
    //           eroHrStr[x].style.borderColor = '#96979a';
    //           // errorMessageYN[1] = 1;
    //           inputAllGood2[1] = 0;
    //           staffStart[x] = startTime; //collect data to array
    //         }   


    //     }
    // }

// check values to see if entry fields are good to go for data entry...
    // var i=0;
    // for (var x=0; x < inputAllGood2.length; x++) { // test for valid input
    //       i = inputAllGood2[x] + i;;
    // }
    // if (i == 0){
    //    stffHrsErr.style.visibility = 'hidden';
    //    workHours[2] = staffStart // enter array in to Master array
    //   console.log(workHours);
    //   // submitHeaderInfo();  // if no errors, submit Master array data through AJAX call
    // } else if (i > 0) {
    //     stffHrsErr.style.visibility = 'visible';
    // }
// fill array to be used for AJAX call
// workHours = [names, position, staffStart, ]


// test to show/hide error message
// check values to see if entry fields are good to go for data entry...

    // if (inputAllGood2[1] == 0){
    //     stffHrsErr.style.visibility = 'visible';
    // } else if (inputAllGood2[1] > 0){
    //     stffHrsErr.style.visibility = 'hidden';
    //     alert("submitting hours to database");
    //     console.log(workHours);

    // }
    //     }
    // }
    // if (i == 0){
    //   alert("submitting hours to database");
    //   // eroHrsMssg.style.visibility = 'hidden';
    //   // submitHeaderInfo();     // if no errors, call function below

    // } else if (i > 0) {
    //   // alert("some mistakes with staff hours");
    //   // eroHrsMssg.style.visibility = 'visible';
    // }


// fill array to be used for AJAX call
// workHours = [names, position, teamStartTimes, ]

}

// ---------- ajax call to input data -----------
function submitHeaderInfo(){
        $.ajax({
            type: 'post',
            url: 'showReportTools.php',
            data: {'fillHeaderInfo':headerValues}, // content of this array from above function
            dataType: 'text', // this is the format of your return data from PHP page. This CAN be changed to 'json'
            success: function (data) {  
              alert(data);
            },
            error: function(data){
              alert("something's gone wrong");
              console.log(data);
          }
        });

}



