// <script type="text/javascript">
// function setName(){
//    var icon = document.getElementById('user-name-icon');
//    icon.innerHTML = "You are logged in as: " + sessionName;
// }
// login error message
// function errMsg(){
//     // alert("error");
//     // console.log("errors");
//       var theDiv = document.getElementById('loginErrorMsg');
//       var error = "Login unsuccessful. Please re-enter credentials.";
//       theDiv.innerHTML = error;
//   }

//====== AJAX log in behaviour ========== 
// $(document).ready(function(){
function sessionName(){
  alert('sessionName function called');
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
            url: 'footer.php',
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
      // alert('showMenus executed');
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