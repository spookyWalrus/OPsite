
// ====================== populates select menu with staff names from database ======================
var menu = document.getElementById('searchUserMenu'); //get select menu id

// ajax call is made when "editUser.php" page loads to fill menu

$(document).ready(fillMenu());
	// alert("filling menu");
function fillMenu(){
        $.ajax({
            type: 'post',	
            url: 'editUserTools.php',
            data:{'action':'fillMenu'}, // in PHP page, this will correspond with: $_POST['action'] == 'fillMenu' 
            dataType: 'json',
            success: function (data) {  
              
	            // console.log(data);
	        	var users = data;
		        for (var i = 1; i < users.length; i++) {
		            // POPULATE SELECT ELEMENT WITH JSON.
		        	var item = users[i].user_name;
		            menu.innerHTML = menu.innerHTML +
			                '<option value="' + item + '">' + item + '</option>';
		              // alert(users[i].user_name);
		        }
            }, 
            error: function(data){
            	alert("something's gone wrong");
            	console.log(data);
            	// alert(data);
	        }
      	});
	// });
};  

//=============  get id names of user fields ==================
	var currentView = document.getElementById('viewingThisUser');
	var userName = document.getElementById('user_name');
	var addr = document.getElementById('user_address');
	var postNum = document.getElementById('user_postal');
	var phone = document.getElementById('user_phone');
	var email = document.getElementById('user_email');
	var idnum = document.getElementById('user_idnum');
	var sin = document.getElementById('user_sin');

	var inputPassword = document.getElementById('nu_pw');
	var inputAdminAc = document.getElementById('admin_access');
	var viewInputFields = document.getElementsByClassName('viewTheUser')[0];

	var orgName; // this is used when user name changes and need reference to original name

// ============== ajax call to search/ match name + fill out fields ========================
function searchUser(){ // value of this parameter is set by editOwnAccount.php, where it is set to 1,
							// where the innerHTML does not get written... as seen below
	// var abc = 0
	var findIt = document.getElementById('searchUserMenu').value;

		$.ajax({
	        type: 'post',
	        url: 'editUserTools.php',
	        data:{'doIt':findIt},
	        dataType: 'json',	
            success: function(foundIt){
	    	// console.log(foundIt);
	        // whoIsIt = findIt;

	        userName.value = foundIt[0]['user_name']; // find content that matches 'user_name'  etc etc
	        addr.value = foundIt[0]['user_address'];
	        postNum.value = foundIt[0]['user_postal'];
	        phone.value = foundIt[0]['user_phone'];
	        email.value = foundIt[0]['user_email'];
	        idnum.value = foundIt[0]['user_idnum'];
	        sin.value = foundIt[0]['user_sin'];
	        inputAdminAc.value = foundIt[0]['user_admin_access'];


	        viewInputFields.style.display = 'block';
		        // if(abc == 0){ 
	        currentView.innerHTML = "You are currently viewing: &nbsp; &nbsp;" + findIt;  // output back to page
		        // };
		        // console.log(vieweeName);
	     
	        inputPassword.placeholder = "8 or more characters pls";
	        // inputAdminAc.value = vieweeAdminAc;	    	
	        // console.log(foundIt); // spit out your json contents
	        },
	        error: function(){
	        	alert("finding that person has gone wrong");
	        }
	    });
	// });
};

// ==================== set variables:  for update / save data ===================
	var nameError = document.getElementById('nameErrorMsg');
	var addressError = document.getElementById('addressErrorMsg');
	var pwError = document.getElementById('pwErrorMsg');

	var userAdminMenu = document.getElementById('admin_access');
	var userAdminError = document.getElementById('adminErrorMsg');

	var errorBox = document.getElementsByClassName('errorBox');

	var inputAllGood = [];

// ==================  check input for mistakes =======
// All error messages are embedded as div's in the page 
function checkInput(){ // this parameter is sent from onclick() on editOwnAccount.php

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
	// check address
	var name = document.getElementById('user_address').value;
	if (name.length == 0){
		addressError.style.visibility = 'visible';
		errorBox[1].classList.add('has-error');

		inputAllGood[1] = 0;

	} else if (name.length > 0){
		addressError.style.visibility = 'hidden';
		errorBox[1].classList.remove('has-error');

		inputAllGood[1] = 1;

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

function clearMenu(){ // clear menu upon document load and when user updates account info ======
	var searchMenu = document.getElementById('searchUserMenu');
	searchMenu.innerHTML = '';

}
//  =================== Ajax call to save changes to DB. Requires libraries+plug-in as seen in footer.php

function updateThePHP(){
		// alert("ajax to PHP");
          // e.preventDefault();  // check for validation by JS before preceding

	var currentUser = document.getElementById('viewingThisUser');
    var nuName = document.getElementById('user_name').value; 
    var nuAddress = document.getElementById('user_address').value;
    var nuAdminAcc = document.getElementById('admin_access').value;
   	
   	var nuValues = [nuName, nuAddress, nuAdminAcc, orgName]; // put all values into single variable as an array. 

	var icon =  document.getElementById('user-name-icon');
	var title = document.getElementById('thisUser');

          $.ajax({
            type: 'post',	
            url: 'editUserTools.php',
            data: {'upDateIt':nuValues}, // {'name of PHP array': variable to be passed as content of PHP array}
            dataType: 'text',	// this is the format of your return data from PHP page. This can be changed to 'json'
            success: function(data) {  // this is where you can determine what to do with returned data.
             	var newName = data;
             	alert("Updated account for: " +newName);   
             	clearMenu(); // clear out menu of old listings first
             	fillMenu(); // re-fill menu with recent listing
 		        viewInputFields.style.display = 'none';

            },
            error: function(data){
            	alert("something's gone wrong");
            	console.log(data);
	        }
        });
}


// =========== check password =====================
function checkPW(){
	var nupw = document.getElementById('nu_pw').value;


	if (nupw.length <= 7){ // must be min. 8 char long
		pwError.style.visibility = 'visible';
		errorBox[1].classList.add('has-error');	
		// inputAllGood[1] = 0;
		alert("bad pw!");


	} else if (nupw.length > 7){
		pwError.style.visibility = 'hidden';
		errorBox[1].classList.remove('has-error');
		// alert("submitting to PHP-W");
		updatePW();	
	}
}
//============== ajax function to update password ==============
function updatePW(){
          // e.preventDefault();  // check for validation by JS before preceding

	// get value from input fields to be passed on to PHP
	var currentName = orgName;
    var nuPW = document.getElementById('nu_pw').value; 
   	var nuValues = [nuPW, currentName]; // put all values into single variable as an array. 

          $.ajax({
            type: 'post',
            url: 'editUserTools.php',
            data: {'upDatePW':nuValues}, 
            dataType: 'text',	
            success: function (data) {  // this is just a success message...
             	var matched = data;
             	alert(matched);
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

          $.ajax({	
            type: 'post',
            url: 'editUserTools.php',
            data: {'deleteIt':findIt}, 
            dataType: 'text',	
            success: function (data) {  // this is just a success message...
             	alert(data);
             	clearMenu(); // clear out menu of old listings first
             	fillMenu(); // re-fill menu with recent listing
            },
            error: function(data){
            	alert("something's gone wrong");
            	console.log(data);
	        }
          // });

        });

}
function deleteIt(){

		var checkDelete = confirm("Are you sure you want to delete the account?");
		if (checkDelete){
			deleteAccount();
	        viewInputFields.style.display = 'none';

		}
}
