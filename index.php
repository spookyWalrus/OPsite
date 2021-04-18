<?php include("header.php"); ?>

      </div>
    </div>
             
<!-- 
    ======================    Login  Fields ======================================
 -->
    <div class="container">
      <div class="row">
        <div class="col-md-4 col-md-offset-4">
          <div class="well" id="loginBox">
              <div id="loginErrorMsg"></div>
                <form method="POST" action="">
                  <div class="enterBox">User: &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<input type="text" name="user_name" placeholder="uh... who?" >
                  </div>
                  <br>
                  <div class="enterBox">Password: <input type="text" name="user_pw" placeholder="Don't mess this up" >
                  </div>
                  <br>
                  <div >
                    <input class="btn btn-primary submitText" type="submit" name="login_submit" value="Submit your soul">
                </div>
                </form>
              

          </div>
          <div><h4>Text here for email tester</h4>
          </div>
        </div>
      </div>
    </div>

    <?php include("indexTools.php"); ?> 
    <script type="text/javascript" src="js/footerJS.js"></script>

    </body>
</html>