<?php include "header.php";?>
<?php include "indexTools.php"; ?>

        </div>
    </div>

<!-- 
======================    Login  Fields ======================================
-->
    <div class="container">
        <div class="row">
            <div class="col-md-4 col-md-offset-4">
                <div class="well" id="loginBox">
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
                    <div id="loginErrorMsg">
                    </div>
                </div>
            </div>
        </div>
    </div>
<script type="text/javascript">
         <!-- var em = "<?php echo $errorMess; ?>"; -->
         var em = "<?php $show_errors(); ?>";
        var idem = document.querySelector("#loginErrorMsg");
        // function showError(){
            if (em !== 'nil'){
                idem.innerHTML = em;
            }else{
                idem.innerHTML = 'waiting for login'
            };
            console.log(em);
        // }
        
</script>
  


    </body>
</html> 
