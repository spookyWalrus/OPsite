<?php 
if(!isset($_SESSION)) 
	{ 
		session_start(); 
	};
?>
<?php include("header.php"); ?>
<?php include("menu-bar.php"); ?>

  </div>
</div>
<!-- 
	======================    Edit Account ======================================
 -->
	<div class="container">
		<div class="row">
			<div class="col-xs-6 col-md-offset-3">
				
<!-- ===================== view and edit fields for user account ==========================  -->
				<div id="#viewOwnAccount" class="">
					<div >
						<h2 id="youUser" name="viewingThisUserPhp" ></h2>
						<input class="hiddenValues" id="searchUserMenu" value=" ">	
					</div>
					<form method="post" action="" class="newUserWell editUserForm" id="viewUser">
						<div class="input-group newUserField ">
							<span class="input-group-addon">Name</span>
								<div class="form-group errorBox">
									<input type="text" class="form-control" id="user_name" name="userPhp_name" value="" placeholder="FirstName LastName" aria-describedby="basic-addon1">
								</div>
						</div>
						<div id="nameErrorMsg">
							<p >Please enter name</p>
						</div>

						<!-- <span class="help-block errorMessage" >Please correct the error</span> -->

					  <!--   <div class="form-group has-error">
							<label class="control-label" for="inputError">Input with error</label>
								<input type="text" class="form-control" id="inputError">
							<span class="help-block">Please correct the error</span>
						</div> -->

					  <!--    <div class="input-group newUserField">
						  <span class="input-group-addon" id="user_address">Address</span>
						  <input type="text" class="form-control" placeholder="123 Sesame st" aria-describedby="basic-addon1">
						</div>
		 -->            <!-- <div class="input-group newUserField">
						  <span class="input-group-addon" id="user_phone" name="user_phone">Phone number</span>
						  <input type="text" class="form-control" placeholder="123-555-9876" aria-describedby="basic-addon1">
						</div> -->
					   <!--   <div class="input-group newUserField">
						  <span class="input-group-addon" id="user_email">Email</span>
						  <input type="text" class="form-control" placeholder="coolDude@hotmail.com" aria-describedby="basic-addon1">
						</div> -->
						<!-- <div class="input-group newUserField">
						  <span class="input-group-addon" id="user_idnum">ID number</span>
						  <input type="text" class="form-control" placeholder="123456" aria-describedby="basic-addon1">
						</div> -->
					<!-- 	<div class="input-group newUserField">
						  <span class="input-group-addon"  name="userPHP-pw">Password</span>
							<div class="form-group errorBox">
								<input type="text" class="form-control" id="user_pw" name="userPhp_pw" placeholder="8 or more characters pls" aria-describedby="basic-addon1">
							</div>
						</div>
						<div id="pwErrorMsg">
							<p >Please enter valid password (8 char. minimum)</p>
						</div> -->
						
						<div class="input-group newUserField">
							<!-- <span class="input-group-addon" id="user_admin_access">Admin access</span>
								<input type="checkbox" class="form-control"  aria-label="...">
							</span> -->
							<span class="input-group-addon "   >Admin access</span>
								<select  class="col-xs-3" id="admin_access" name="adminPhp_access">
									<!-- <span class="input-group-addon" id="user_admin_access">Admin access</span> -->
									<option value="null" >--</option>
									<option value="No" >No</option>
									<option value="Yes" >Yes</option>
								</select>
						</div>
						<div id="adminErrorMsg">
							<p >Please select admin access rights</p>
						</div>

						<button class="btn btn-primary submitText" id="createUserButton" type="button" onclick="checkInput();" value="Do it" 
						> SAVE CHANGES </button>
					</form>

<!-- =========  separate form to reset password ================ -->
					<form method="post" action="" class="newUserWell editUserForm" id="resetPasswordField">
							<div class="input-group newUserField">
						  <span class="input-group-addon"  name="userPHP-pw">New Password?</span>
							<div class="form-group errorBox">
								<input type="text" class="form-control" id="nu_pw" name="userPhp_pw" placeholder="8 or more characters pls" value="" aria-describedby="basic-addon1">
							</div>
						</div>
						<div id="pwErrorMsg">
							<p >Please enter valid password (8 char. minimum)</p>
						</div>
						<button class="btn btn-primary submitText" id="reset_Password" type="button" onclick="checkPW();" name="submitPw" 
						value=""> SAVE NEW PASSWORD </button>
					</form>
<!-- 
					<div>
						<button class="btn btn-danger submitText" id="deleteAccount" type="button" onclick="deleteIt('1');" name="submitPw" 
						value="">DELETE ACCOUNT</button>
					</div> -->


				</div>

				<div>


			</div>
		</div>	
	 	
	</div>


<script type="text/javascript" src="js/editOwnAccnt.js"></script>
<?php include("editOwnAccountTools.php"); ?> 

<?php include("footer.php");?>


