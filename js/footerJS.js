
// ======== login error message ==========
function errMsg(errorMessage){
      var theDiv = document.getElementById('loginErrorMsg');
      // var error = "Login unsuccessful. Please re-enter credentials.";
        console.log(errorMessage);
        theDiv.innerHTML = errorMessage;
};
//====== AJAX log in behaviour ========== 
// $(document).ready(function(){
function login(){
        $.ajax({
            type: 'post', 
            url: 'indexTools.php',
            data:'logAttempt', 
            dataType: 'text',
            success: function (data) {  
              var loginYN = data;
              // console.log();
            
            }, 
            error: function(data){
              // var mess = JSON.parse(data);
              var mess = data;
              console.log(mess);
              errMsg(mess);
              // alert(data);
            }
        });
};  

//====== AJAX set name in user menu once logged in  ========== 
// $(document).ready(function(){
function sessionName(){
        $.ajax({
            type: 'post', 
            url: 'checkSession.php',
            data:'sessName', 
            dataType: 'text',
            success: function (data) {  
              var userName = data;
              // console.log(userName);
              // alert(data);
           		// var userName = data;
			 	      var icon = document.getElementById('user-name-icon');
   				   icon.innerHTML = "You are:<br>" + userName;
              showMenus();
            }, 
            error: function(data){
              alert("something's gone wrong on entry");
              console.log(data);
              // alert(data);
            }
        });
};  





  function killSession(){
        $.ajax({
            type: 'post', 
            url: 'checkSession.php',
            data:'killSess', // in PHP page, this will correspond with: $_POST['action'] == 'fillMenu' 
            dataType: 'text',
            success: function (data) {  
              
              // console.log(data);
            	alert("Bye bye");
              
               document.querySelector('.menuButton').style.visibility = "hidden";
                document.getElementById('userNavMenu').style.visibility = "hidden";

				      window.location = "index.php";
 
            }, 
            error: function(data){
              alert("something's gone wrong on exit");
              console.log(data);
              // alert(data);
          }
        });
};  

// makes menubars visible
function showMenus(){
    document.querySelector('.menuButton').style.visibility = "visible";
    document.getElementById('userNavMenu').style.visibility = "visible";
};

// this closes navbar menu when clicked outside of the menu
$(document).ready(function () {
    $(document).click(function (event) {
        var clickover = $(event.target);
        var _opened = $(".navbar-collapse").hasClass("navbar-collapse collapse in");
        if (_opened === true && !clickover.hasClass("navbar-toggle")) {
            $("button.navbar-toggle").click();
        }
    });
});