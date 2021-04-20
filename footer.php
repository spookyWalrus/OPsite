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
         <!--  <script type="text/javascript" src="jQuery.js"></script> -->
<!-- <script type="text/javascript" src="js/footerJS.js"></script> -->
 <script type="text/javascript" src="js/OPsite-insertRow.js"></script>
<script type="text/javascript"  src="js/footerJS.js">
alert('calling sessionName()');
// sessionName();
console.log('this would call sess function');
</script>


	</body>
</html> 