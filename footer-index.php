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
            <!-- ======================  my own JS here ========= -->
    <script type='text/javascript' > 
      alert('footer loaded');
      function errorMsg(){
        var theDiv = document.getElementById('loginErrorMsg');
        var error = 'Login unsuccessful. Please re-enter credentials.';
        theDiv.innerHTML = error;
        alert(error);
      };
    </script>;


	</body>
</html> 