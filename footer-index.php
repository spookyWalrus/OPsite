<?php include("checkSession.php"); 

  // <!-- === log out behavoiur ============== -->

// AJAX call to kill session
if (isset($_POST['killSess'])){

    unset($_SESSION['logged_user']);

    // session_destroy();
    $_SESSION = array(); 
    if (!isset($_SESSION['logged_user'])){
      // echo "session unset";
    }
    exit();
}
?>

    <script type='text/javascript'> 
      function errorMsg(){
        var theDiv = document.getElementById('loginErrorMsg');
        var error = 'Login unsuccessful. Please re-enter credentials.';
        theDiv.innerHTML = error;
        alert(error);
      };
    </script>;


	</body>
</html> 