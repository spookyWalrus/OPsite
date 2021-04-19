          <!-- ==========    Bootstrap core JavaScript ==================== -->
            <!-- Placed at the end of the document so the pages load faster -->

            <!-- my local jquery and bootstrap js -->
             <!-- // <script src="js/jquery-3.2.1.js"></script> -->
           <!-- // <script src="bootstrap/js/bootstrap.min.js"></script> -->
            <!-- 
            links to external js sources -->

             <!-- // <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script> -->

            <!-- // <script>window.jQuery || document.write('<script src="../../assets/js/vendor/jquery.min.js"><\/script>')</script> -->

         <!--    // <script src="https://code.jquery.com/jquery-3.3.1.min.js"
            // integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>

            // <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>  -->
   <!--  <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.js"></script> 
     <script src="http://malsup.github.com/jquery.form.js"></script> 
  -->  

 <!--  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.form/4.2.2/jquery.form.min.js" integrity="sha384-FzT3vTVGXqf7wRfy8k4BiyzvbNfeYjK+frTVqZeNDFl8woCbF0CYG6g2fMEFFo/i" crossorigin="anonymous"></script>
   <script src="https://code.jquery.com/jquery-3.4.1.min.js" integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous"></script>
-->

            <!-- ======================  my own JS here ========= -->
         <!--  <script type="text/javascript" src="jQuery.js"></script> -->
<script type="text/javascript" src="js/footerJS.js"></script>

 <script type="text/javascript" src="js/OPsite-insertRow.js"></script>
<script type="text/javascript" >sessionName();</script>

      <!-- ====== external/local  script source for converting table to PDF format ===== -->
<!-- <script text="text/javascript" src="js/html2pdf.js"></script> -->
 <!-- this is local -->
<!-- <script text="text/javascript" src="js/table2xls.js"></script>  -->
<!-- this is local -->

<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.1.0/jspdf.umd.min.js"></script> -->
<!-- <script src="cdnjs.cloudflare.com/ajax/libs/jspdf/1.2.61/jspdf.umd.min.js" ></script> -->
<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.3.2/jspdf.min.js"></script>  -->
<!-- <script src="//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script> -->

<?php



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

	</body>
</html> 