
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
			console.log(number);
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

	// check password
	var pw = document.getElementById('user_pw').value;
	var pwBox = document.getElementsByClassName('pwBox');
	if (pw.length <= 7){ // must be min. 8 char long
		pwError.style.visibility = 'visible';
		pwBox[0].style.borderColor = '#B43232';
		inputAllGood[7] = 0;
	} else if (pw.length > 7){
		pwError.style.visibility = 'hidden';
		pwBox[0].style.borderColor = '#cec7c7';
		inputAllGood[7] = 1;
	}

	// check admin access
	var adminMenuValue = userAdminMenu.options[userAdminMenu.selectedIndex].text;
	if (adminMenuValue == "--"){
		userAdminError.style.visibility = 'visible';
		userAdminMenu.style.borderColor = '#B43232';
		inputAllGood[8] = 0;
	} else if ((adminMenuValue == "Yes") || (adminMenuValue == "No")){
		userAdminError.style.visibility = 'hidden';
		userAdminMenu.style.borderColor = 'black';
		inputAllGood[8] = 1;

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
	var nuName = document.getElementById('user_name').value; 
	var nuAddress = document.getElementById('user_address').value;
	var nuPostal = document.getElementById('user_postal').value;
	var nuPhone = document.getElementById('user_phone').value;
	var nuEmail = document.getElementById('user_email').value;
	var nuID = document.getElementById('user_idnum').value;
	var nuSin = document.getElementById('user_sin').value;
	var nuPw = document.getElementById('user_pw').value;
    var nuAdminAcc = document.getElementById('admin_access').value;
   	var nuValues = [nuName,nuAddress,nuPostal, nuPhone, nuEmail, nuID, nuSin, nuPw, nuAdminAcc]; // put all values into single variable as an array. 

        $.ajax({
            type: 'post',
            url: 'createUserTools.php',
            data: {'createNu':nuValues},
            dataType: 'text',	// this is the format of your return data from PHP page. This can be changed to 'json'
            success: function (data) {  // this is where you can determine what to do with returned data.
              alert(data);
              // console.log(data);   // returned data that has lots of content works well when it's treated like an array. 
              					// ie (data[0].key) etc etc 
            },
            error: function(data){
            	alert("something's gone wrong");
            	console.log(data);
	        }
        });

}




