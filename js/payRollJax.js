// payRollJax.js
var menu = document.getElementById('searchUserMenu'); //get select menu id
function fillMenu(){ // fill menu with staff to search
        $.ajax({
            type: 'post',	
            url: 'payRollTools.php',
            data:'action', // in PHP page, this will correspond with: $_POST['action'] == 'fillMenu' 
            dataType: 'json',
            success: function (data) {  
	            // console.log(data);
	        	var staff = data;
		        for (var i = 1; i < staff.length; i++) {
		            // POPULATE SELECT ELEMENT WITH JSON.
		        	var item = staff[i].user_name;
		            menu.innerHTML = menu.innerHTML +
			                '<option value="' + item + '">' + item + '</option>';
		        }
		        getDateRange();
            }, 
            error: function(data){
            	alert("something's gone wrong");
            	console.log(data);
            	// alert(data);
	        }
      	});
	// });
}; 

var dateStart = document.getElementById('fromHere');
function emptyMenu(dates){ // clear out date menu
	var options = dateStart.getElementsByTagName('option');
	for (var i=options.length; i--;) {
	    dateStart.removeChild(options[i]);
	}
	setDateMenu(dates);
}
function setDateMenu(dates){
	// emptyMenu(); // empty date menu first
	var monthor = '01';
	for (var i = 0; i < dates.length; i++) {  // fill date menu with new dates
		var item = dates[i];
		var month = item.split('-'); // set up another variable for testing
		if (month[1] == monthor){ // if month repeats, set value in menu
			dateStart.innerHTML = dateStart.innerHTML +
		        '<option value="' + item + '">' + item + '</option>';
		} else if (month[1] != monthor){ // if month changes, set divider, set value in menu
			dateStart.innerHTML = dateStart.innerHTML +
		            '<option disabled="disabled">----</option>';
			dateStart.innerHTML = dateStart.innerHTML +
		            '<option value="' + item + '">' + item + '</option>';
		}
	monthor = month[1]; // month to be tested, changes on each iteration
	}
}

function getDateRange(){ // fill up search menu with all pay period for the year
	let currentYear =  new Date().getFullYear();// curretn year
	let year;
	let yearSelect = document.getElementById('theYears').value;
	if (yearSelect != currentYear){ // check if year selection changed
		year = yearSelect; // set year to selected year
	}else{
		year = currentYear; // otherwise use current year
	}
	$.ajax({
            type: 'post',	
            url: 'payRollTools.php',
            // data:'dateRange', 
            data: {'dateRange': year},
            dataType: 'json',
            success: function (data) {  
	        	// console.log(data);
	        	// console.log('year selected is: ',year);
	        	var dates = data;
	        	emptyMenu(dates); 
	        	// setDateMenu(dates); // populate dropdown menu with new payroll year
            }, 
            error: function(data){
            	alert("your date defaults gone wrong");
            	console.log(data);
            	// alert(data);
	        }
      	});

}


// var userName = document.getElementById('user_name');
// var dateStartSearch = dateStart.value;
// var dateEnd = document.getElementById('toThere');
// var dateRange = document.getElementById('dateRange');
// var findIt = document.getElementById('searchUserMenu').value;

var thisDude = document.getElementById('viewingThisUser');
var userName;
function searchPayPeriod(){
	// loadPage(); // this will re-load and clear your table and all values
	sessionStorage.clear(); // make sure session storage is cleared
	zeroFields(); // clear all fields on page;
	userName = document.getElementById('searchUserMenu').value;
	var dateSearch  =  dateStart.options[dateStart.selectedIndex].value;
	var endDate = add14days(); // this is in payRollJSTools.js
	var findIt =[userName, dateSearch];
		$.ajax({
	        type: 'post',
	        url: 'payRollTools.php',
	        data:{'findPayPeriod':findIt},
	        dataType: 'json',
            success: function(foundIt){
            	// <?php echo include "payRollpg1.php"; ?>
            	// loadPage();
		    	// console.log(foundIt);
		    	thisDude.innerHTML = 'Payroll for:&nbsp;&nbsp;' + userName // set name and pay period
		    	 +'<br> Pay period: ' +dateSearch +'  -->  ' +endDate; 
		    	 // + '<br>Pay period: ' +dateSearch +'  -->  ' +endDate; 
		    	var payrollData = foundIt;
		    	// console.log(foundIt);
		    	// console.log(payrollData);
		    	// console.log('payrolldata: ',payrollData);
		    	if(payrollData.length > 0){
		    	    sessionStorage.setItem("payrollData", JSON.stringify(payrollData)); // HTML session storage to pass date  back to showReportJax.js
		    	    findDoubles(); // checks for double dates, call backs sortPayRoll() and fills fields on completion;
		    	}else{
		    		alert("There are no records that match that date range");
		    	}
	    	    // sortPayroll(); // this parses and sets all values into HTML page
       			// hideTables();
	       			// console.log(foundIt);
	       			// var leya ='i love animals i also love to dance i love pizza cooooooooooooool awsome ';
	       			// alert(leya);
	        },
	        error: function(foundIt){
	        	alert("Error: searching for DATA has gone wrong");
		    	console.log(foundIt);

	        }
	    });
	// });
};

// function loadPage(){ // resets page, flushes arrays/objects to zero by re-loading scripts
    // $("#prPage").load("payRollpg1.php");
	// $.getScript("js/payRollJSTools.js");
 //   	$.getScript("js/payRollAddColsJS.js");
 //   	$.getScript("js/payRollIncomeAdjust.js");

// }

// window.onload = alert("unicornkittycupcakefacepandabuttttmoonsparkpro ofroblox mhahahaha i'msooooo smart! i loveicecarem! ");

var checkResult; // pass on result of below ajax call to be used to trigger save data ajax call
function submitPayRoll(){ // callback to function in payRollJSTools.js.  May not work??
	getCheckRecordInfo(); // found in: payRollJSTools.js.  Gather basic info to check if exists in DB
		$.ajax({
	        type: 'post',
	        url: 'payRollTools.php',
	        data:{'checkRecords':checkThis}, // 1st argument == name of POST array on php page, 2nd arg = array sent
	        dataType: 'text',  // format of returned data
            success: function(foundIt){	
            	
            	if (foundIt == 'Exists'){
            		var check = confirm('Record already exists, over-write data?'); 
            		if (check){
            			// execute other ajax call
            			checkResult = 'overwrite';
            			saveData2DB();
            			// console.log('executing other ajax call to save data to DB')
            			// alert('overwriting data');
            		} else {
            			// alert('cancelled');
            		}
            	} else if (foundIt == 'Save'){
            		checkResult = 'save';
            		alert('saving data');
        			saveData2DB();
            	}
            },
        	 error: function(foundIt){
    	    	console.log("ERROR! JAX function");
		    	console.log(foundIt); // data that was returned from PHP

	        }
	    });
};

function saveData2DB(){ // function called from above
	getFinalData(); // found in: payRollJSTOols.js.  Gathers all your data in to array 'payTots'
	$.ajax({
		type:'post',
		url: 'payRollTools.php',
		data:{'saveDataDB':checkResult,'savePayRoll':payTots},
		dataType: 'text',
		success: function(result){
			// alert('saving results to excel file');
			// console.log(result);
			alert('saving results to excel file');
			window.open('makeExcel.php','');  //open new window and open php file to output as excel page, uses $_SESSION['exceldata'] made in payRollTools.php
			// var kyo = 'i am a fast ninja';
			// alert(kyo);
		},
		error: function(result){
			console.log("Error in php or sql page");
			console.log(result);
		}
	});
}

// load menu items on page, then load table and JS scripts
$(document).ready(function() {
	fillMenu();
	hideTables();
	} );
