
	var nameError = document.getElementById('nameErrorMsg');
	var pwError = document.getElementById('pwErrorMsg');

	var userAdminMenu = document.getElementById('admin_access');
	var userAdminError = document.getElementById('adminErrorMsg');

	var errorBox = document.getElementsByClassName('errorBox');

	var inputAllGood = [];

// ================= check input for mistakes =============
// All error messages are embedded as div's in the page 'createUser.php'
function checkInput(){
	// alert("checking submitted data");
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
	// check password
	var pw = document.getElementById('user_pw').value;
	if (pw.length <= 7){ // must be min. 8 char long
		pwError.style.visibility = 'visible';
		errorBox[1].classList.add('has-error');

		inputAllGood[1] = 0;

	} else if (pw.length > 7){
		pwError.style.visibility = 'hidden';
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
	submitThePHP(); // if no errors, call function below
	// alert("submitting to php");
	} else if (i > 0) {
		alert("some mistakes with what you did");
	}
	
}

//  =================== Ajax call based on jquery ajax() object. Requires libraries+plug-in as seen in footer.php
function submitThePHP(){
		
        $.ajax({
            type: 'post',
            url: 'createUserTools.php',
            data: $('#createUser').serialize(),  // this takes all your Input data and serializes as a single list
            dataType: 'text',	// this is the format of your return data from PHP page. This can be changed to 'json'
            success: function (data) {  // this is where you can determine what to do with returned data.
              alert(data);
              // console.log(data);   // returned data that has lots of content works well when it's treated like an array. 
              					// ie (data[0].key) etc etc 
            },
            error: function(data){
            	alert("something's gone wrong");
            	alert(data);
	        }
        });

}


//  =====================    below is ajax calls done by text book methods. Needs tweaking to make it 
// ========================   work the way you want it...
function getHTTPObject(){ // set up XMLHttpRequest object.
	// initialize variable
	var xhr;
	if (window.XMLHttpRequest){ // check support non-IE6
		xhr = new XMLHttpRequest();
	} else if (window.ActiveXObject){ // check for IE6 Ajax
		xhr = new ActiveXObject("Msxm12.XMLHTTP");
	}
	return xhr;	
}


//===  vanilla JS ajax attempt below ======
function ajaxGo(){
	var request = getHTTPObject();
		// the ID's here need to be interpolated for any other elements
		// that are being added...
	// var fillForm = document.getElementById('ss_test');

	var submitPHP = "createUserTools.php?formGood=1"; // send this to PHP page, success will 

	request.onreadystatechange = function(){
		// check if request is ready + succesful
		if (request.readyState === 4 && request.status === 200) {
			// spit out data that comes back
			// fillForm.value = request.responseText; // value returned from PHP
									// directly append response to HTML element
			// document.getElementById('errorMessage').innerHTML = request.responseText;
			// document.getElementById('errorMessage').innerHTML = request.responseText;
			alert(request.responseText);
			// var json = request.responseText; // reponseText returns the entire JSON file and we assign it to a javascript variable "json".

            // for (var i = 0, len = json.length; i < len; ++i){
            	// console.log(json[i]);

                // document.getElementById('errorMessage').innerHTML = json[i]; //get first value with "title" element
            // } 

		}	
		else {
			console.log("the ajax is not ready");
		}
	}
		// Get info ready to go
	request.open("get", submitPHP, true);

			// make the call
	// request.send(null); // regular way to send message, w/o extra data
	request.send(); // here, we are asking PHP to process this argument

}






