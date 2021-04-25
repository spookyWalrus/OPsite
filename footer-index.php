<?php include("checkSession.php"); ?>



    <script type='text/javascript'> 
      function errorMsg(){
        var theDiv = document.getElementById('loginErrorMsg');
        var error = 'Login unsuccessful. Please re-enter credentials.';
        theDiv.innerHTML = error;
        alert(error);
      };
    </script>;

<!-- === log out behavoiur ============== -->

<!-- <?php
if (isset($_POST['killSess'])){

    unset($_SESSION['logged_user']);

    // session_destroy();
    $_SESSION = array(); 
    if (!isset($_SESSION['logged_user'])){
      // echo "session unset";
    }
    exit();
}
?> -->


	</body>
</html> 