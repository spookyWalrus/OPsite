

$(document).ready(showUser()); // calls below function on load
	

// ============== ajax call to  fill out account details of user ========================
function showUser(){ 
							
	// var findIt = document.getElementById('searchUserMenu').value;

	var currentView = document.getElementById('youUser');
	var inputName = document.getElementById('user_name');
	var inputPassword = document.getElementById('nu_pw');
	var inputAdminAc = document.getElementById('admin_access');

		$.ajax({
	        type: 'post',
	        url: 'editOwnAccountTools.php',
	        data:'findYou',
	        dataType: 'json',	
            success: function(foundIt){
	    	console.log(foundIt);
	        var vieweeName = foundIt[0]['user_name']; // find content that matches 'user_name'  etc etc

	        var vieweeAdminAc = foundIt[0]['user_admin_access'];

		    currentView.innerHTML = "Account settings: " +vieweeName; // output back to page
	        inputName.value = vieweeName;
	        inputPassword.placeholder = "8 or more characters pls";
	        inputAdminAc.value = vieweeAdminAc;	    	
	        // console.log(foundIt); // spit out your json contents
	        },
	        error: function(){

	        	alert("filling out your data has gone wrong");
	        }
	    });
	// });
};


// ==================== set variables:  for update / save data ===================
	var nameError = document.getElementById('nameErrorMsg');

	var pwError = document.getElementById('pwErrorMsg');

	var userAdminMenu = document.getElementById('admin_access');
	var userAdminError = document.getElementById('adminErrorMsg');

	var errorBox = document.getElementsByClassName('errorBox');

	var inputAllGood = [];

// ==================  check input for mistakes =======
// All error messages are embedded as div's in the page
function checkInput(){ // this parameter is sent from onclick() 

	// check name
	var name = document.getElementById('user_name').value;
	if (name.length == 0){
		nameError.style.visibility = 'visible';
		errorBox[0].classList.add('has-error');

		inputAllGood[0] = 0;

	} else if (name.length > 0){	
		nameError.style.visibility = 'hidden';
		errorBox[0].classList.remove('has-error');

		inputAllGood[0] = 1;

	}

	// check admin access
	var adminMenuValue = userAdminMenu.options[userAdminMenu.selectedIndex].text;
	if (adminMenuValue == "--"){
		userAdminError.style.visibility = 'visible';
		userAdminMenu.style.borderColor = '#B43232';

		inputAllGood[2] = 0;


	} else if ((adminMenuValue == "Yes") || (adminMenuValue == "No")){
		userAdminError.style.visibility = 'hidden';
		userAdminMenu.style.borderColor = 'black';

		inputAllGood[2] = 1;

	}

	//  this counts if there are any errors. If there are none,
	// (when i = 0), then it will proceed to submit the form via AJAX
	var i = 0;
	for (var x=0; x < inputAllGood.length; x++) {
		if (inputAllGood[x] == 0){
		i = i + 1;	
		}
	}
	if (i == 0){
		updateThePHP(); // the same parameter is passedon to the function below...
		// alert(xyz);
		// alert("submitting to PHP");
	} 
}


//  =================== Ajax call to save changes to DB. Requires libraries+plug-in as seen in footer.php
function clearMenu(){ // clear menu upon document load and when user updates account info ======
	var searchMenu = document.getElementById('searchUserMenu');
	searchMenu.innerHTML = '';

}


function updateThePHP(){

	var icon = document.getElementById('user-name-icon');
	var currentView = document.getElementById('youUser');

	// get value from input fields to be passed on to PHP
	var currentView = document.getElementById('youUser');

    var nuName = document.getElementById('user_name').value; 
    var nuAdminAcc = document.getElementById('admin_access').value;
   	// etc etc - each variable also has be in array below
   	
   	var nuValues = [nuName, nuAdminAcc]; // put all values into single variable as an array. 

          $.ajax({
            type: 'post',	
            url: 'editOwnAccountTools.php',
            data: {'upDateIt':nuValues}, // {'name of PHP array': variable to be passed as content of PHP array}
            dataType: 'text',	// this is the format of your return data from PHP page. This can be changed to 'json'
            success: function(data) {  // this is where you can determine what to do with returned data.
             	var newName = data;
             	alert(data +": account settings successfuly changed");
   				icon.innerHTML = "You are logged in as: " + newName;
		        currentView.innerHTML = "Account settings for: " +newName; // output back to page

            },
            error: function(data){
            	alert("updating you  gone wrong");
            	console.log(data);
	        }

        });

}


// =========== check password =====================
function checkPW(){
	var nupw = document.getElementById('nu_pw').value;


	if (nupw.length <= 7){ // must be min. 8 char long
		pwError.style.visibility = 'visible';
		errorBox[1].classList.add('has-error');	 // ** remember to increment array value when adding more parameters to the account
		// inputAllGood[1] = 0;
		alert("pw, itsa no good");


	} else if (nupw.length > 7){
		pwError.style.visibility = 'hidden';
		errorBox[1].classList.remove('has-error'); // ** remember to increment array value when adding more parameters to the account
		// alert("submitting to PHP-W");
		updatePW();
	}
}
//============== ajax function to update password ==============
function updatePW(){
          // e.preventDefault();  // check for validation by JS before preceding
	
	// get value from input fields to be passed on to PHP
	var name = document.getElementById('user_name').value;
    var nuPWid = document.getElementById('nu_pw');

    var nuPW = nuPWid.value; 
   	var nuValues = [nuPW, name]; // put all values into single variable as an array. 

          $.ajax({
            type: 'post',
            url: 'editOwnAccountTools.php',
            data: {'upDatePW':nuValues}, 
            dataType: 'text',	
            success: function (data) {  // this is just a success message...
             	var success = data;
             	alert(success);
            },
            error: function(data){
            	alert("something's gone wrong");
            	console.log(data);
	        }
          // });

        });

}
// ============== delete account: AJAX call ==========
function deleteAccount(){
          // e.preventDefault();  // check for validation by JS before preceding
	
	// get value from input fields to be passed on to PHP
	var findIt = document.getElementById('searchUserMenu').value;
	// alert("deleting " + findIt);

          $.ajax({	
            type: 'post',
            url: 'editUserTools.php',
            data: {'deleteIt':findIt}, 
            dataType: 'text',	
            success: function (data) {  // this is just a success message...
             	alert(data);
             	clearMenu(); // clear out menu of old listings first
             	fillMenu(); // re-fill menu with recent listing
             	// searchUser();
            },
            error: function(data){
            	alert("something's gone wrong");
            	console.log(data);
	        }
          // });

        });

}
function deleteIt(pqr){
	if (pqr == 1){
		var checkDelete = confirm("Are you sure you want to delete yourself?  You will be logged out");
		if (checkDelete){
			deleteAccount();
			killSession();	
		}
	} else {
		var checkDelete = confirm("Are you sure you want to delete the account?");
		if (checkDelete){
			deleteAccount();
			// alert("account deleted!");
		}
	} 
}
