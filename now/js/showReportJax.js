// Dec 03   ALL DONE
    // Need warning sign if search doesn't have results   DONE
    // Change submit button to: save changes DONE
        //  also have a warning if user is certain about over-writing existing file NOT NECESSARY


// DEC 21  DONE
    // show report saves even when a start time/end time field is blank
        // the error message doesn't show

// Dec 23  DONE
    // How to distinguish submit buttons for view report? 
        // currently, new report = 1, update report = 2, but the class names are different for showReport and viewReport
        // so causes error when retrieving comments
            // >>>>>  fixed by having only one class of buttons so they are same for report and view page

// Jan 06
    // Refactor functions?
    // Move functions to Tools page, keep only ajax on ajax page?

//Jan 08  DONE
    // In viewReport, when saving a new staff hours, need error flags to show when name/position/hours aren't filled
        // currently not happening!!  (see JSTools.js)


// Jan 19   DONE
  // When user confirms to overwriting file when clicking "SAVE AS NEW REPORT", file is supposed to overwrite existing 
    // file but it saves as NEW file in show_report only, NOT in staff_hours



// --------------------- below is for searching for report to view --------------------------

var menu = document.getElementById('searchUserMenu'); //get select menu id
function fillMenu(){ //for the moment, this function is not used for searching a report to view....(dec 08)
        $.ajax({
            type: 'post', 
            url: 'showReportTools.php',
            data:'action', // in PHP page, this will correspond with: $_POST['action'] == 'fillMenu' 
            dataType: 'json',
            success: function (data) {  
           
            }, 
            error: function(data){
              alert("something's gone wrong");
              console.log(data);
              // alert(data);
          }
        });
  // });
};



function findThisDate(){ // get values from user page, execute AJAX search function
    var searchThis = [];
    searchThis[0] = document.getElementById('theYear').value;
    searchThis[1] = document.getElementById('theMonth').value;
    searchThis[2] = document.getElementById('theDate').value;
    var date = [searchThis.join('-')];

    if(searchThis[2] == ''){ // if no day date 
        var dateless = setDatelessDate(date); // function in showReportJSTools.js
        ajaxThisDate(dateless);
    }else if((searchThis[0] || searchThis[1]) == ''){ // if no year present
        alert('Please select year and month'); 
    }else{
        ajaxThisDate(date); // see below
    }
}

var searchResults; // used to pass an data to fillOutReport();
function ajaxThisDate(date){ // pass values to showReportTools.php page, search and return query
    var resultTitle = document.getElementById('searchResultTitle');
    var resultMenu = document.getElementById('viewShowResultMenu');
    resultMenu.innerHTML = ''; // clears umenu out
    $.ajax({
            type: 'post', 
            url: 'showReportTools.php',
            data: {'findDate':date}, 
            dataType: 'json',
            success: function (data) {  
                searchResults = data; // use this data for query for fillOutReport() below....
                if(!(date[1])){ // this is for title of search query
                    resultTitle.innerHTML = "Search result for: " + date[0];
                }else if(date[1]){
                    resultTitle.innerHTML = "Search result for: " + date[0] + "   -->   "+ date[1];
                }
                // fill menu with pay periods received from php query
                for (var i = 0; i < data.length; i++) { 
                    resultMenu.innerHTML = resultMenu.innerHTML +
                        '<option value=" ' + i + ' ">' + data[i].event_date + "   :   "+
                        data[i].event_name + " @ "+
                        data[i].event_location + " #"+ data[i].event_code +'</option>';
                }
            }, 
            error: function(data){
              alert("No matches for your search");
              resultTitle.innerHTML = "Search result for: " + date[0] +' --> ' +date[1];
              // console.log(data);
          }
        });
}

var headerData; // values set here to be used to delete a report if needed...
function fillOutReport(){
    let menuSelection = parseInt(document.getElementById("viewShowResultMenu").value);
    let found = searchResults[menuSelection]; // isolate object from array
    let fetchThisReport=[];
    Object.values(found).forEach(val=>fetchThisReport.push(val)); // push object items to array

    clearFields(); // clear out all fields
    // for(var x =0;x<4;x++){ // clear out comments fields
    //    var comments = document.getElementsByClassName('sRTextArea')[x].value;
    //    comments.value = '';
    // }
    // need function to clear out name, position and hours fields
      // put function in showReportJSTools.js page

    let selectedDate = found.event_date;
    let selectedEvent = found.event_name; // console.log(fetchThisReport);
    let selectionShow = document.getElementById('viewThisReport');
    selectionShow.innerHTML = "You selected: \""+selectedEvent+"\" on "+selectedDate;
    $.ajax({
        type: 'post',
        url: 'showReportTools.php',
        data: {'fillOutTheFields':fetchThisReport},
        dataType:'json',
        success: function(data){
            // console.log('header info from php: ',data[0]);
            fillOutHeader(data[0]); // fill out headr info from showReportJSTools.js
            headerData = data[0];
            fillOutStaffHours(data); // fill out staff info from showReportTOols.js

        },
        error: function(data){
            alert("filling out fields Error");
            // var result = JSON.parse(data);
            console.log(data);
        }
    });
}




// -------------- below is for filling out / editing report and saving ------------------------------

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
              // console.log(daDate);
              	// these variable names set in showReportJSTools.js
                eventDate.value = daDate;
                tLeader.value = 'SS'; 
                for(var x=1;x<6;x++){
                    var pos = window['t'+[x]+'Pos'];
                    pos.value = null;
                    // pos.options[pos.selectedIndex].value = 'na'

                    // console.log(pos.value)
                }
	           
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
function checkShowReportHeader(num){ // num is used to check if button is from showReport.php or viewShowReport.php
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
    var intNa = intermission.includes('Na');
    var intna = intermission.includes('na');
    if (intermission.length == 0) { // error if no values 
        eroMsg[7].style.visibility = 'visible';
        eventInt.style.borderColor = '#B43232';
        inputAllGood[7] = 1;
    }else if(!(min||intNa||intna)){ // no min, Na, na
        eroMsg[7].style.visibility = 'visible';
        eventInt.style.borderColor = '#B43232';
        inputAllGood[7] = 1;
    // }
    // }else if (intermission.length>0 && !(intNa) ){ // error if 'na' not included
    //     eroMsg[7].style.visibility = 'visible';
    //     eventInt.style.borderColor = '#B43232';
    //     inputAllGood[7] = 1;
    } else if ((intermission.length > 0 && (min||intNa||intna)) ) { // has min or is only na
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
       console.log(ii, 'ii value');
       alert("errors");
    } else if (ii == 0) { // no errors, continue to next process
        // array values set to be used for data entry via PHP
       let comments = getComments(num); // retrieve comments from comment field, pass num value;
       let showView = num; // number passed from click to identify if create new or view mode of show report
       headerValues = [date, nameEvent, venue, code, weather, startTime, endTime, intermission,comments,showView];
       // console.log(comments);
       checkStaffNamePos(num);
    }


}


// -------------------------------------------  check staff work hours etc --------------------
var workHours = []; // Master array used to collect work data from below functions and submitted on AJAX call
var checkFinalErrors = []; // array used to check if everything is good to submit with AJAX 
function checkStaffNamePos(num){
    sessionStorage.clear();
    var inputAllGood1 =[];
    var inputAllGood2 = [];  // arrays used to check error messages and move to next function
   
    var names = []; // array used to collect data
    var position = [];  // collect data

// ...... staff names ........
    checkStaffName();
    names = JSON.parse(sessionStorage.getItem("nameArray")); // decode JSON object, from: showReportJSTools.js
    for (x=0; x < names.length; x++){
        if (names[0] == ''){   // if name is blank, show error, or,
          eroHrs[0].style.borderColor = '#B43232';
          inputAllGood1[0] = 1;
        } else if (names[0].length > 0){ // if not blank, move on
          eroHrs[0].style.borderColor = '#96979a';
          inputAllGood1[0] = 0;
        } 
        if ((x > 0) && (names[x] == '')){
          eroHrs[x].style.borderColor = '#B43232';
          inputAllGood1[x] = 1;
        } else if ((x > 0) && (names[x].length > 0)){
          eroHrs[x].style.borderColor = '#96979a';
          inputAllGood1[x] = 0;
        }
       
    }
    //check staff positions...
    for (var x=0; x < 6; x++){
        var role;
        if (x == 0){
            // role = tLeader.options[tLeader.selectedIndex].value;
            role = tLeader.value;
            if (role == "--"){
              rlSlct[0].style.borderColor = '#B43232';
              inputAllGood2[0] = 1;
            } else if (role == "SS" || role == "FOH"){
              rlSlct[0].style.borderColor = '#96979a';
              rlSlct[0].style.borderColor = '#d7d7d7';
               inputAllGood2[0] = 0;
              position[0] = role; // assign role in to array
            }
        }
        if (x > 0){ 
            var staffPosition = window["t"+[x]+"Pos"];
            // role = staffPosition.options[staffPosition.selectedIndex].value;
            role = staffPosition.value;
            if (role == "--"){
              rlSlct[x].style.borderColor = '#B43232';
              inputAllGood2[x] = 1;
            } else if (!(role == "--")){
              // rlSlct[x].style.borderColor = '#96979a';
              rlSlct[x].style.borderColor = '#d7d7d7';
              inputAllGood2[x] = 0;
              position[x] = role; // assign role into array
            }
        }
    }

    // test values to see if entry fields are good to go for data entry...
    // function testErrorsNamePos(){
      var j=0;
      for (var x=0; x < inputAllGood1.length; x++) { // test errors for names
            j = inputAllGood1[x] + j;
            // console.log('j is: ',j);
      }
      if (j > 0) { // show error message, do not continue
          eroHrsMssg.style.display ='inline-block';
            eroHrsMssg.style.visibility = 'visible';
            checkFinalErrors[0] = 1;  
           alert("errors!!");
            // console.log('errors, whole up');
            return;
            // checkStaffHours();  // delete this for final rendition....!!!!!
        } else if (j == 0){ // move on to next function/process
          eroHrsMssg.style.display ='none';
           eroHrsMssg.style.visibility = 'hidden';
            // workHours = [name, position];
            checkInputAG2();
        }
    function checkInputAG2(){ // test errors for position
      var k=0;
      for (var x=0; x < inputAllGood2.length; x++) { 
            k = inputAllGood2[x] + k;
            // console.log('k is: ',k);
      }
      if (k > 0) { // show error message, do not continue
          eroHrsMssg.style.display ='inline-block';
            eroHrsMssg.style.visibility = 'visible';
            checkFinalErrors[0] = 1;  
           alert("errors!!");
            // console.log('errors, whole up');
            return;
            // checkStaffHours();  // delete this for final rendition....!!!!!
        } else if (k == 0){ // move on to next function/process
          eroHrsMssg.style.display ='none';
           eroHrsMssg.style.visibility = 'hidden';
            // checkFinalErrors[0] = 0;
            // console.log('k is 0, move on');
            console.log('all the names are: ',names);
            workHours = [names, position];
            checkStaffHours(num);
        }

}

function checkStaffHours(num){
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
                              // alert("errors!");
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
                              // alert("errors!");
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
            for (var z=0;z<6;z++){ // block 3 end time
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
            k = staffEndGood2[x]+ k;
            l = staffStartGood3[x] + l;
            m = staffEndGood3[x] + m;
      }
      // console.log('h,i,j,k,l,m: ',h,i,j,k,l,m);
      if (h+i+j+k+l+m == 0){
      // if ((h == 0)&&(i == 0)&&(j == 0)&&(k == 0)&&(l == 0)&&(m == 0)) { // move on to next function/process
           stffHrsErr.style.visibility = 'hidden';
           // console.log('the letters: ',h,i,j,k,l,m);
      //      // console.log("no errors");
      //      // array to be sent via AJAX for submission
            // workHours[2] = [names, position, teamStartTimes1, teamEndTimes1, 
            //             teamStartTimes2, teamEndTimes2, teamStartTimes3, teamEndTimes3];
            workHours[2] = teamStartTimes1;
            workHours[3] = teamEndTimes1;
            workHours[4] = teamStartTimes2;
            workHours[5] = teamEndTimes2;
            workHours[6] = teamStartTimes3;
            workHours[7] = teamEndTimes3;
            // alert("submitting data");
      //       // console.log(headerValues);
      //       // console.log(workHours);
            prepStaffHourArray(num);  // execute next function when no errors
        // } else if ((h > 0)||(i > 0)||(j,k,l,m > 0)) { // show error message, do not continue
      }else if ( !(h+i+j+k+l+m == 0) ){
            stffHrsErr.style.visibility = 'visible';
           // console.log('the letters: ',h,i,j,k,l,m);

           // console.log("errors!!");
           alert("errors!!");
         }
            // workHours = [names, position, teamStartTimes1, teamEndTimes1, 
                        // teamStartTimes2, teamEndTimes2, teamStartTimes3, teamEndTimes3]; // delete for final rendition
            // prepStaffHourArray();

            // checkFinalErrors[1] = 1; 
       
  }
}

// var comments; // variable to store comments data
function getComments(num){ // output of this gets stored with header info. num variable triggered
    var comments = []; // variable to store comments data

    // if(num == 1){
        comments[0] = document.getElementsByClassName('sRTextArea')[0].value;
        comments[1] = document.getElementsByClassName('sRTextArea')[1].value;
        comments[2] = document.getElementsByClassName('sRTextArea')[2].value;
        comments[3] = document.getElementsByClassName('sRTextArea')[3].value;
    // } else if (num == 2){
        // comments = document.getElementById('vRTextArea').value; 
        // comments[0] = document.getElementsByClassName('vRTextArea')[0].value;
        // comments[1] = document.getElementsByClassName('vRTextArea')[1].value;
        // comments[2] = document.getElementsByClassName('vRTextArea')[2].value;
        // comments[3] = document.getElementsByClassName('vRTextArea')[3].value;    }
    // console.log(comments);
    return comments;
}


// ------------------  rearrange data to prepare array for each individual  -------------
var indivHoursArray = []; // universal array to submit each individual arrays for AJAX call
function prepStaffHourArray(num){
  // arrays to parse through
  // console.log(names);
  var name = workHours[0];
  var position = workHours[1];
  var start1 = workHours[2];
  var end1 = workHours[3];
  var start2 = workHours[4];
  var end2 = workHours[5];
  var start3 = workHours[6];
  var end3 = workHours[7];
    for (var x=0;x<6;x++){ // max is 6 bc there are 6 data points in each index of workHours;
      staffHour = []; //  array to store all data sests for each individual
        if((name[x] == 'na')||(name[x]==undefined)||(name[x] == (undefined + " : na")) ){
          continue;
        }
        if (name[x].includes(" : na")){
            var check = confirm("Are you sure you want to delete the hours for a staff member?");
          if (check==true){
              staffHour[0] = name[x];
              staffHour[1] = headerValues[0]; // date
              staffHour[2] = headerValues[1]; // name event
              staffHour[3] = headerValues[2]; // venue
              staffHour[4] = headerValues[3]; // event code
              staffHour[5] = position[x];
              staffHour[6] = start1[x];
              staffHour[7] = end1[x];
              staffHour[8] = start2[x];
              staffHour[9] = end2[x]; 
              staffHour[10] = start3[x];
              staffHour[11] = end3[x];
              
             indivHoursArray[x] = staffHour;
          }else if (check== false){
              alert("save aborted");
          }
      }else{
          staffHour[0] = name[x];
          staffHour[1] = headerValues[0]; // date
          staffHour[2] = headerValues[1]; // name event
          staffHour[3] = headerValues[2]; // venue
          staffHour[4] = headerValues[3]; // event code
          staffHour[5] = position[x];
          staffHour[6] = start1[x];
          staffHour[7] = end1[x];
          staffHour[8] = start2[x];
          staffHour[9] = end2[x]; 
          staffHour[10] = start3[x];
          staffHour[11] = end3[x];
          
         indivHoursArray[x] = staffHour;
      }
    }

      console.log(indivHoursArray);
            // alert("making AJAX call");
      submitHeader(num);
}

// indivHoursArray =(name, date, eventName, venue, code, position, start1, end1, start2, end2, start3, end3)



// ---------------------- ajax call to submit Header data -------------------------
function submitHeader(num){ // check if current record already exists, ask user to confirm overwrite or save fresh
        $.ajax({
            type: 'post',
            url: 'showReportTools.php',
            data: {'headerCheck':headerValues}, // content of this array set from above function
            dataType: 'text', // this is the format of your return data from PHP page. This CAN be changed to 'json'
            success: function(data) { 
              if(data == true){
                  if (num == 1){
                    var exists = alert("Record with same date, event name, venue and event code already exists."+"\n"+
                                          "Change these parameters to save as new OR click 'Save Edits/Changes' button to overwrite");
                  }
                  if(num == 2){
                    var exists = confirm("Overwrite existing record?");
                  }
                  if (exists == true){
                      // alert("Confirmed. Overwriting data");
                      saveConfirm(2);
                  } else if (exists == false){
                    alert("save cancelled");
                  }
              }else {
                // console.log(num);
                saveConfirm(num);
                console.log("record is fresh, SAVE");
              }
            },
            error: function(data){
              alert("something's gone wrong");
              console.log(data);
          }
        });

}
function saveConfirm(num){
        $.ajax({
            type: 'post',
            url: 'showReportTools.php',
            data: {'headerData':headerValues}, // content of this array set from above function
            dataType: 'text', // this is the format of your return data from PHP page. This CAN be changed to 'json'
            success: function (data) { 
              // console.log(data);
              submitHours(num);
            },
            error: function(data){
              alert("something's gone wrong with submitting Header data");
              console.log(data);
          }
        });  

}
// ---------------------- ajax call to submit Hours data -------------------------
function submitHours(num){
        $.ajax({
            type: 'post',
            url: 'showReportTools.php',
            data: {'workData':indivHoursArray,'newOld':num}, // content of this array set from above function
            dataType: 'text', // this is the format of your return data from PHP page. This CAN be changed to 'json'
            success: function (data) {  
              console.log(data);
              if (num == 1){
                alert("show report freshly saved");
              } else if (num == 2){
                alert("changes/ edits saved");

              }
              // alert("show report saved");
              // console.log(data);
            },
            error: function(data){
              alert("something's gone wrong");
              console.log(data);
          }
        });

// 
}

function deleteShowReportHeader(){
          console.log('data: ',headerData[0]);
  let check = confirm("Are you sure you want to delete? This will delete show report AND staff hours associated with it.")
  if(check == true){
    // alert("deleting");
    $.ajax({
        type: 'post',
        url: 'showReportTools.php',
        data: {'deleteReport':headerData[0]}, // content of this array set from fillOutReport()
        dataType: 'text', // this is the format of your return data from PHP page. This CAN be changed to 'json'
        success: function (data) {  
          // alert(data);
          console.log(data);
        },
        error: function(data){
          alert("something's gone wrong");
          console.log(data);
      }
    });
  }
}






