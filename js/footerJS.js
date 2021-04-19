
// <script type="text/javascript">
// function setName(){
//    var icon = document.getElementById('user-name-icon');
//    icon.innerHTML = "You are logged in as: " + sessionName;
// }

// login error message
function errMsg(){
    // alert("error");
    // console.log("errors");
      var theDiv = document.getElementById('loginErrorMsg');
      var error = "Login unsuccessful. Please re-enter credentials.";
      theDiv.innerHTML = error;
  }


//====== AJAX log in behaviour ========== 
// $(document).ready(function(){
function sessionName(){
        $.ajax({
            type: 'post', 
            url: 'checkSession.php',
            data:'sessName', // variable set in bottom of indexTools.php, not really needed...
            dataType: 'text',
            success: function (data) {  
              var userName = data;
              // console.log(userName);
              // alert(data);
           		// var userName = data;
			 	    var icon = document.getElementById('user-name-icon');
   				  icon.innerHTML = "You are:<br>" + userName;
            // alert("You are logged in as: " + userName);
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
            url: 'footer.php',
            data:'killSess', // in PHP page, this will correspond with: $_POST['action'] == 'fillMenu' 
            dataType: 'text',
            success: function (data) {  
              
              // console.log(data);
            	alert("Bye bye");
              var mainMenu = document.getElementByClassName('menuButton');
              var userMenu = document.getElementById('userNavMenu');
              mainMenu.style.visibility = "hidden";
              userMenu.style.visibility = "hidden";

				      window.location = "/index.php";
 
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
    var mainMenu = document.getElementByClassName('menuButton');
      var userMenu = document.getElementById('userNavMenu');
        mainMenu.style.visibility = "visible";
        userMenu.style.visibility = "visible";
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


