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
            	var dataDate = data;  
            	// console.log(data);
              var daDate = dataDate.replace(/\s/g, '');
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

//  ---------------------   function to check show report header input -----------
var date;  // need this to get date value from other JS script...
var headerValues = [];  //  array used to send header data for AJAX call, PHP data entry
function checkShowReportHeader(){
    var inputAllGood = [];

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
    var nameEvent = eventName.value;
    if (nameEvent.length == 0){
      eroMsg[1].style.visibility = 'visible';
      eventName.style.borderColor = '#B43232';
      inputAllGood[1] = 1;
    } else if (nameEvent.length > 0){
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
    } else if ((code.length > 0) || (name == 'n/a')){
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
         if (errorMess.length == 0){  // errorMess value is set on JSTools.js page
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
        if (errorMess.length == 0){  // errorMess value is set on JSTools.js page
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

// check values to see if entry fields are good to go for data entry...
    var ii = 0;
    for (var x=0; x < inputAllGood.length; x++) {
         ii = inputAllGood[x] + ii;
    }

    if (ii > 0){ // errors present, do not continue
       // checkStaffHours();  // delete this for final rendition
       // alert("errors");
    } else if (ii == 0) { // no errors, continue to next process
        // array values set to be used for data entry via PHP
       // checkStaffHours(); 
       headerValues = [date, nameEvent, venue, code, weather, startTime, endTime, intermission];
       checkStaffHours();
    }

}


// ---------------------------  check staff work hours etc --------------------
var workHours = []; // Master array used to collect work data from below functions and submitted on AJAX call
var checkFinalErrors = []; // array used to check if everything is good to submit with AJAX 
function checkStaffHours(){
    sessionStorage.clear();
    var inputAllGood2 = [];  // array used to check error messages and move to next function
    var names = []; // array used to collect data
    var position = [];  // collect data

// ...... staff names ........
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
          workHours = [name, position];
          // checkStaffHours();
      } else if (j > 0) { // show error message, do not continue
          eroHrsMssg.style.visibility = 'visible';
          checkFinalErrors[0] = 1;
          // checkStaffHours();  // delete this for final rendition....!!!!!
      }

//  ......   Staff work hours .....
    // array used to check error messages and move to next function
    var staffStartGood = [];  
    var staffEndGood = [];   
    var staffStartGood2 = [];  
    var staffEndGood2 = [];   
    var staffStartGood3 = []; 
    var staffEndGood3 = [];   
    // arrays to collect data
    var teamStartTimes1 = []; 
    var teamEndTimes1 = []; 
    var teamStartTimes2 = []; 
    var teamEndTimes2 = []; 
    var teamStartTimes3 = []; 
    var teamEndTimes3 = []; 
    // variables used in below functions...
    var idStart;
    var idEnd;
    var idNum;
    var startTime;
    var endTime;
    var checkTime;
    var newTime;

    for (var x=1;x<4;x++){ // parse through all blocks, 1 - 3...
        if (x == 1){ // block 1 loop
            for (y=0;y<6;y++){  // parse through start block 1
                  if (y == 0){ // y = the row #, x = block #
                      idStart = window["tL"+"_start1"];
                      // idStart = window["tL"+"_start1"];
                      idNum = "document.getElementById(idStart)";
                      startTime = idStart.value;
                      checkTime = formatTime(startTime); // cehck + re-format time    
                      newTime = sessionStorage.getItem("time24hr"); // fetch re-formatted time
                          if (errorMess.length == 0){  // errorMess value is set on JSTools.js page
                              eroHrStr[y].style.borderColor = '#96979a';
                              staffStartGood[y] = 0; // no errors, flag as 0
                              idStart.value = newTime;
                              teamStartTimes1[0] = newTime;
                            } else if (errorMess.length > 0){
                              eroHrStr[y].style.borderColor = '#B43232';
                              staffStartGood[y] = 1; // error exists, flag as 1
                          }
                  }
                  if (y > 0){
                      idStart = window["t"+[y]+"_start"+[x]];
                      idNum = "document.getElementById(idStart)";
                      startTime = idStart.value;
                      checkTime = formatTime(startTime); // check + re-format time    
                      newTime = sessionStorage.getItem("time24hr"); // fetch re-formatted time
                          if (errorMess.length == 0){  // errorMess value is set on JSTools.js page
                              eroHrStr[y].style.borderColor = '#96979a';
                              staffStartGood[y] = 0; // no errors, flag as 0
                              idStart.value = newTime;
                              teamStartTimes1[y] = newTime;
                            } else if (errorMess.length > 0){
                              eroHrStr[y].style.borderColor = '#B43232';
                              staffStartGood[y] = 1;  // error exists, flag as 1
                          }
                  } // end loop for each cel 
            } // end loop for start1
            for (z=0;z<6;z++){
                    if (z == 0){
                      idEnd = window["tL"+"_end"+[x]];
                      idNum = "document.getElementById(idEnd)";
                      endTime = idEnd.value;
                      checkTime = formatTime(endTime); // cehck + re-format time    
                      newTime = sessionStorage.getItem("time24hr"); // fetch re-formatted time
                          if (errorMess.length == 0){  // errorMess value is set on JSTools.js page
                              eroHrEnd[z].style.borderColor = '#96979a';
                              staffEndGood[z] = 0; // no errors, flag as 0
                              idEnd.value = newTime;
                              teamEndTimes1[0] = newTime;
                            } else if (errorMess.length > 0){
                              eroHrEnd[z].style.borderColor = '#B43232';
                              staffEndGood[z] = 1; // error exists, flag as 1
                          }
                    }
                    if (z > 0){
                      idEnd = window["t"+[z]+"_end"+[x]];
                      idNum = "document.getElementById(idEnd)";
                      endTime = idEnd.value;
                      checkTime = formatTime(endTime); // check + re-format time    
                      newTime = sessionStorage.getItem("time24hr"); // fetch re-formatted time
                          if (errorMess.length == 0){  // errorMess value is set on JSTools.js page
                              eroHrEnd[z].style.borderColor = '#96979a';
                              staffEndGood[z] = 0; // no errors, flag as 0
                              idEnd.value = newTime;
                              teamEndTimes1[z] = newTime;
                            } else if (errorMess.length > 0){
                              eroHrEnd[z].style.borderColor = '#B43232';
                              staffEndGood[z] = 1;  // error exists, flag as 1
                          }
                    } // end loop for each cel 
            } // end of loop for end1
        } //   end of block 1 ...............
        if (x == 2){  // block 2 
            for (var y=0;y<6;y++){  // parse through start block 2
                  var a = y + 6;  // bump up value to nth child of input field
                  if (y == 0){ // y = the row #, x = block #
                      idStart = window["tL"+"_start"+[x]];
                      idNum = "document.getElementById(idStart)";
                      startTime = idStart.value;
                      checkTime = formatTime(startTime); // cehck + re-format time    
                      newTime = sessionStorage.getItem("time24hr"); // fetch re-formatted time
                          if (errorMess.length == 0){  // errorMess value is set on JSTools.js page
                              eroHrStr[a].style.borderColor = '#96979a';
                              staffStartGood2[y] = 0; // no errors, flag as 0
                              idStart.value = newTime;
                              teamStartTimes2[0] = newTime;
                            } else if (errorMess.length > 0){
                              eroHrStr[a].style.borderColor = '#B43232';
                              staffStartGood2[y] = 1; // error exists, flag as 1
                          }
                  }
                  if (y > 0){
                      a = y + 6;
                      idStart = window["t"+[y]+"_start"+[x]];
                      idNum = "document.getElementById(idStart)";
                      startTime = idStart.value;
                      checkTime = formatTime(startTime); // check + re-format time    
                      newTime = sessionStorage.getItem("time24hr"); // fetch re-formatted time
                          if (errorMess.length == 0){  // errorMess value is set on JSTools.js page
                              eroHrStr[a].style.borderColor = '#96979a';
                              staffStartGood2[y] = 0; // no errors, flag as 0
                              idStart.value = newTime;
                              teamStartTimes2[y] = newTime;
                            } else if (errorMess.length > 0){
                              eroHrStr[a].style.borderColor = '#B43232';
                              staffStartGood2[y] = 1;  // error exists, flag as 1
                          }
                  } // end loop for each cel 
            } // end loop for start2
            for (var z=0;z<6;z++){  // end2
                    var b = z + 6;  // bump up value to nth child of input field
                    if (z == 0){
                      idEnd = window["tL"+"_end"+[x]];
                      idNum = "document.getElementById(idEnd)";
                      endTime = idEnd.value;
                      checkTime = formatTime(endTime); // cehck + re-format time    
                      newTime = sessionStorage.getItem("time24hr"); // fetch re-formatted time
                          if (errorMess.length == 0){  // errorMess value is set on JSTools.js page
                              eroHrEnd[b].style.borderColor = '#96979a';
                              staffEndGood2[z] = 0; // no errors, flag as 0
                              idEnd.value = newTime;
                              teamEndTimes2[0] = newTime;
                            } else if (errorMess.length > 0){
                              eroHrEnd[b].style.borderColor = '#B43232';
                              staffEndGood2[z] = 1; // error exists, flag as 1
                          }
                    }
                    if (z > 0){
                      b = z + 6;
                      idEnd = window["t"+[z]+"_end"+[x]];
                      idNum = "document.getElementById(idEnd)";
                      endTime = idEnd.value;
                      checkTime = formatTime(endTime); // check + re-format time    
                      newTime = sessionStorage.getItem("time24hr"); // fetch re-formatted time
                          if (errorMess.length == 0){  // errorMess value is set on JSTools.js page
                              eroHrEnd[b].style.borderColor = '#96979a';
                              staffEndGood2[z] = 0; // no errors, flag as 0
                              idEnd.value = newTime;
                              teamEndTimes2[z] = newTime;
                            } else if (errorMess.length > 0){
                              eroHrEnd[b].style.borderColor = '#B43232';
                              staffEndGood2[z] = 1;  // error exists, flag as 1
                          }
                    } // end loop for each cel 
            } // end of loop for end2
        } // end of block 2
        if (x == 3){ // check block 3
            for (var y=0;y<6;y++){  // parse through start block 3
                  var a = y + 12;  // bump up value to nth child of input field
                  if (y == 0){ // y = the row #, x = block #
                      idStart = window["tL"+"_start"+[x]];
                      idNum = "document.getElementById(idStart)";
                      startTime = idStart.value;
                      checkTime = formatTime(startTime); // cehck + re-format time    
                      newTime = sessionStorage.getItem("time24hr"); // fetch re-formatted time
                          if (errorMess.length == 0){  // errorMess value is set on JSTools.js page
                              eroHrStr[a].style.borderColor = '#96979a';
                              staffStartGood3[y] = 0; // no errors, flag as 0
                              idStart.value = newTime;
                              teamStartTimes3[0] = newTime;
                            } else if (errorMess.length > 0){
                              eroHrStr[a].style.borderColor = '#B43232';
                              staffStartGood3[y] = 1; // error exists, flag as 1
                          }
                  }
                  if (y > 0){
                      a = y + 12;
                      idStart = window["t"+[y]+"_start"+[x]];
                      idNum = "document.getElementById(idStart)";
                      startTime = idStart.value;
                      checkTime = formatTime(startTime); // check + re-format time    
                      newTime = sessionStorage.getItem("time24hr"); // fetch re-formatted time
                          if (errorMess.length == 0){  // errorMess value is set on JSTools.js page
                              eroHrStr[a].style.borderColor = '#96979a';
                              staffStartGood3[y] = 0; // no errors, flag as 0
                              idStart.value = newTime;
                              teamStartTimes3[y] = newTime;
                            } else if (errorMess.length > 0){
                              eroHrStr[a].style.borderColor = '#B43232';
                              staffStartGood3[y] = 1;  // error exists, flag as 1
                          }
                  } // end loop for each cel 
            } // end loop for start1
            for (var z=0;z<6;z++){
                    var b = z + 12;  // bump up value to nth child of input field
                    if (z == 0){
                      idEnd = window["tL"+"_end"+[x]];
                      idNum = "document.getElementById(idEnd)";
                      endTime = idEnd.value;
                      checkTime = formatTime(endTime); // cehck + re-format time    
                      newTime = sessionStorage.getItem("time24hr"); // fetch re-formatted time
                          if (errorMess.length == 0){  // errorMess value is set on JSTools.js page
                              eroHrEnd[b].style.borderColor = '#96979a';
                              staffEndGood3[z] = 0; // no errors, flag as 0
                              idEnd.value = newTime;
                              teamEndTimes3[0] = newTime;
                            } else if (errorMess.length > 0){
                              eroHrEnd[b].style.borderColor = '#B43232';
                              staffEndGood3[z] = 1; // error exists, flag as 1
                          }
                    }
                    if (z > 0){
                      b = z + 12;
                      idEnd = window["t"+[z]+"_end"+[x]];
                      idNum = "document.getElementById(idEnd)";
                      endTime = idEnd.value;
                      checkTime = formatTime(endTime); // check + re-format time    
                      newTime = sessionStorage.getItem("time24hr"); // fetch re-formatted time
                          if (errorMess.length == 0){  // errorMess value is set on JSTools.js page
                              eroHrEnd[b].style.borderColor = '#96979a';
                              staffEndGood3[z] = 0; // no errors, flag as 0
                              idEnd.value = newTime;
                              teamEndTimes3[z] = newTime;
                            } else if (errorMess.length > 0){
                              eroHrEnd[b].style.borderColor = '#B43232';
                              staffEndGood3[z] = 1;  // error exists, flag as 1
                          }
                    } // end loop for each cel 
            } // end of loop for end3
        } // end of block 3
    } // end block loop

// test if there are any errors
    var h=0,i=0,j=0,k=0,l=0,m=0;
      for (var x=0; x < 6; x++) { 
            h = staffStartGood[x] + h;
            i = staffEndGood[x] + i;
            j = staffStartGood2[x] + j;
            k = staffEndGood2[x] + k;
            l = staffStartGood3[x] + l;
            m = staffEndGood3[x] + m;
      }
        if ((h == 0)&&(i == 0)&&(j,k,l,m == 0)) { // move on to next function/process
           stffHrsErr.style.visibility = 'hidden';
           console.log("no errors");
           // array to be sent via AJAX for submission
            workHours = [names, position, teamStartTimes1, teamEndTimes1, 
                        teamStartTimes2, teamEndTimes2, teamStartTimes3, teamEndTimes3];
            alert("submitting data, making AJAX call");
            // console.log(headerValues);
            // console.log(workHours);
            submitHeader();
            // checkFinalErrors[0] = 0;
        } else if ((h > 0)||(i > 0)||(j,k,l,m > 0)) { // show error message, do not continue
            stffHrsErr.style.visibility = 'visible';
           console.log("errors!!");
            // checkFinalErrors[1] = 1; 
        }
// final check before AJAX call
    // if ((checkFinalErrors[0] + checkFinalErrors[1]) == 0){
    //   // no errors, submit data, make AJAX call
    //   alert("submitting data, making AJAX call");
    //   console.log(headerValues);
    //   console.log(workHours);
      // submitHeader();
    // }
}
// ---------------------- ajax call to submit Header data -------------------------
function submitHeader(){
        $.ajax({
            type: 'post',
            url: 'showReportTools.php',
            data: {'headerData':headerValues}, // content of this array set from above function
            dataType: 'text', // this is the format of your return data from PHP page. This CAN be changed to 'json'
            success: function (data) {  
              alert(data);
              submitHours(); // on succesful data entry, move on to this function
            },
            error: function(data){
              alert("something's gone wrong");
              console.log(data);
          }
        });

}
// ---------------------- ajax call to submit Hours data -------------------------
function submitHours(){
        $.ajax({
            type: 'post',
            url: 'showReportTools.php',
            data: {'workData':workHours}, // content of this array set from above function
            dataType: 'text', // this is the format of your return data from PHP page. This CAN be changed to 'json'
            success: function (data) {  
              alert(data);
              checkStaffHours(); // on succesful data entry, move on to this function
            },
            error: function(data){
              alert("something's gone wrong");
              console.log(data);
          }
        });

}



