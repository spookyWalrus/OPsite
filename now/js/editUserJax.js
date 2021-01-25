
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

	var inputPassword = document.getElementById('user_pw');
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
	        origName = foundIt[0]['user_name']; // set found name to global variable...

	        userName.value = foundIt[0]['user_name']; // find content that matches 'user_name'  etc etc
	        addr.value = foundIt[0]['user_address'];
	        postNum.value = foundIt[0]['user_postal'];
	        phone.value = foundIt[0]['user_phone'];
	        email.value = foundIt[0]['user_email'];
	        idnum.value = foundIt[0]['user_idnum'];
	        sin.value = foundIt[0]['user_sin'];
	        inputAdminAc.value = foundIt[0]['user_admin_access'];

	        viewInputFields.style.display = 'block';

	        currentView.innerHTML = "You are currently viewing: &nbsp; &nbsp;" + findIt;  // output back to page
		        // console.log(vieweeName);

	        inputPassword.placeholder = "8 or more characters pls";
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
	var pwError = document.getElementById('pwErrorMsg');
	var addressError = document.getElementById('addressErrorMsg');
	var postalError = document.getElementById('postalErrorMsg');
	var phoneError = document.getElementById('phoneErrorMsg');
	var emailError = document.getElementById('emailErrorMsg');
	var idnumError = document.getElementById('idnumErrorMsg');
	var sinError = document.getElementById('sinErrorMsg');

	var userAdminMenu = document.getElementById('admin_access');
	var userAdminError = document.getElementById('adminErrorMsg');

	var errorBox = document.getElementsByClassName('errorBox');


	var inputAllGood = [];

// ==================  check input for mistakes =======
// All error messages are embedded as div's in the page 
function checkInput(){ // this parameter is sent from onclick() on editUser.php

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
	var addr = document.getElementById('user_address').value;
	if (addr.length == 0){
		addressError.style.visibility = 'visible';
		errorBox[1].classList.add('has-error');
		inputAllGood[1] = 0;
	} else if (addr.length > 0){
		addressError.style.visibility = 'hidden';
		errorBox[1].classList.remove('has-error');
		inputAllGood[1] = 1;
	}

		// check postal
	var postNum = document.getElementById('user_postal').value;
	var post = postNum.replace(/\s/g, '');
	if (post.length < 6 || post.length > 6){
		postalError.style.visibility = 'visible';
		errorBox[2].classList.add('has-error');
		inputAllGood[2] = 0;
	} else if (post.length == 6){
		postalError.style.visibility = 'hidden';
		errorBox[2].classList.remove('has-error');
		inputAllGood[2] = 1;
	}
		// check phone
	var number = document.getElementById('user_phone').value;
	var phoneBox = document.getElementsByClassName('phoneBox');
	var phoneNum = number.replace(/\s/g, '');
	var phone = phoneNum.replace(/[()-]/g, '');
	function checkLength(){
		if ((phone.length < 10) || (phone.length > 10)){
		phoneError.style.visibility = 'visible';
		phoneBox[0].style.borderColor = '#B43232';
		inputAllGood[3] = 0;
		} else {
			phoneErrorMsg.style.visibility = 'hidden';
			phoneBox[0].style.borderColor = '#cec7c7';

			inputAllGood[3] = 1;
			// console.log(number);
		}
	}
	if (!isNaN(phone)){
		checkLength();
	
	} else if (isNaN(phone)){
		phoneError.style.visibility = 'visible';
		phoneBox[0].style.borderColor = '#B43232';
	}

	// check email
	var email = document.getElementById('user_email').value;
	var emailBox = document.getElementsByClassName('emailBox');
	if (!(email.indexOf('@') > -1)){
		emailError.style.visibility = 'visible';
		emailBox[0].style.borderColor = '#B43232';
		inputAllGood[4] = 0;

	} else if (email.indexOf('@' > -1)){
		emailError.style.visibility = 'hidden';
		emailBox[0].style.borderColor = '#cec7c7';
	
		inputAllGood[4] = 1;
	}

	// check id number
	var idnum = document.getElementById('user_idnum').value;
	var idBox = document.getElementsByClassName('idBox');
	function checkID(){
		if (idnum.length < 6 || idnum.length > 6){
			idnumError.style.visibility = 'visible';
			idBox[0].style.borderColor = '#B43232';
			// errorBox[4].classList.add('has-error');
			inputAllGood[5] = 0;
		} else if (idnum.length == 6){
			idnumError.style.visibility = 'hidden';
			idBox[0].style.borderColor = '#cec7c7';
			// errorBox[4].classList.remove('has-error');
			inputAllGood[5] = 1;
		}
	}
	if (!isNaN(idnum)){
		checkID();
	}	else {
		idnumError.style.visibility = 'visible';
			idBox[0].style.borderColor = '#B43232';
			inputAllGood[5] = 0;
	}
	

	// check sin number
	var sin = document.getElementById('user_sin').value;
	var sinnum = sin.replace(/\s/g, '');
	var sinBox = document.getElementsByClassName('sinBox');
	function checkSIN(){
		if (sinnum.length < 9 || sinnum.length > 9){
			sinError.style.visibility = 'visible';
			sinBox[0].style.borderColor = '#B43232';
			// errorBox[4].classList.add('has-error');
			inputAllGood[6] = 0;
		} else if (sinnum.length == 9){
			sinError.style.visibility = 'hidden';
			sinBox[0].style.borderColor = '#cec7c7';
			// errorBox[4].classList.remove('has-error');
			inputAllGood[6] = 1;
		}
	}
	if (!isNaN(sinnum)){
		checkSIN();
	}	else {
			sinError.style.visibility = 'visible';
			sinBox[0].style.borderColor = '#B43232';
			inputAllGood[6] = 0;
	}

	// check admin access
	var adminMenuValue = userAdminMenu.options[userAdminMenu.selectedIndex].text;
	if (adminMenuValue == "--"){
		userAdminError.style.visibility = 'visible';
		userAdminMenu.style.borderColor = '#B43232';
		inputAllGood[7] = 0;
	} else if ((adminMenuValue == "Yes") || (adminMenuValue == "No")){
		userAdminError.style.visibility = 'hidden';
		userAdminMenu.style.borderColor = 'black';
		inputAllGood[7] = 1;

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
// get value from input fields to be passed on to PHP
	var nuName = document.getElementById('user_name').value;
	var nuAddr = document.getElementById('user_address').value;
	var nuPost = document.getElementById('user_postal').value;
	var nuPhone = document.getElementById('user_phone').value;
	var nuEmail = document.getElementById('user_email').value;
	var nuIdnum = document.getElementById('user_idnum').value;
	var nuSin = document.getElementById('user_sin').value;
    // var nuPw = document.getElementById('user_pw').value; 
	var nuAdminAc = document.getElementById('admin_access').value;

	var currentName = origName; //>>> this value is already set at top of page

   	var nuValues = [nuName,nuAddr,nuPost,nuPhone,nuEmail,nuIdnum,nuSin,nuAdminAc, currentName]; // put all values into single variable as an array. 

	// var title = document.getElementById('thisUser'); //... not sure what this points to......

          $.ajax({
            type: 'post',	
            url: 'editUserTools.php',
            data: {'upDateIt':nuValues}, // {'name of PHP array': variable to be passed as content of PHP array}
            dataType: 'text',	// this is the format of your return data from PHP page. This can be changed to 'json'
            success: function(data) {  // this is where you can determine what to do with returned data.
             	alert("Updated account for: " + currentName);   
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
	var nupw = document.getElementById('user_pw').value;


	if (nupw.length <= 7){ // must be min. 8 char long
		pwError.style.visibility = 'visible';
		errorBox[1].classList.add('has-error');	
		// inputAllGood[1] = 0;
		// alert("bad pw!");


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
    var nuPw = document.getElementById('user_pw').value; 

	var currentName2 = origName; //>>> this value is already set at top of page

   	var nuValues = [nuPw, currentName2]; // put all values into single variable as an array. 

          $.ajax({
            type: 'post',
            url: 'editUserTools.php',
            data: {'upDatePW':nuValues}, 
            dataType: 'text',	
            success: function (data) {  // this is just a success message...
             	// var matched = data;
             	alert(data);
             	inputPassword.value = '';
             	clearMenu(); // clear out menu of old listings first
             	fillMenu(); // re-fill menu with recent listing
 		        viewInputFields.style.display = 'none';
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
    // var oldPw = document.getElementById('user_pw');

          $.ajax({	
            type: 'post',
            url: 'editUserTools.php',
            data: {'deleteIt':findIt}, 
            dataType: 'text',	
            success: function (data) {  // this is just a success message...
             	alert(data);
             	clearMenu(); // clear out menu of old listings first
             	inputPassword.value = '';
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
