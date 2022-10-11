<?php include("header.php"); ?>
<?php include("menu-Bar.php"); ?>
<?php include("editUserTools.php"); ?>

  </div>
</div>


<!-- 
	======================    Edit Account ======================================
 -->
	<div class="container">
		<div class="row">
			<div class="col-xs-6 col-md-offset-3">
				<div class="" id="createUserBox">
					<h2>View or Edit an account </h2>
				</div>
<!--  ==================== select staff name menu  ===================================  -->
				<div id="searchUserBox"> 
					<form method="post" action="" class="newUserWell" id="findUser">
						<div class="searchUserMenuTitle">Please find person</div>
							<select class="col-xs-6 " id="searchUserMenu" name="searcUserMenuPhp" value="">
							   
							</select>
						<button class="btn btn-primary " id="searchUserButton" type="button" onclick="searchUser();" name="submit" 
							value=""> Search now </button>
					</form>
				</div>
<!-- ===================== view and edit fields for user account ==========================  -->
				<div class="viewTheUser">
					<div >
						<h4 id="viewingThisUser" name="viewingThisUserPhp"></h4>
					</div>
		<!-- ..........  Name ................ -->
					<form method="post" action="" class="newUserWell editUserForm" id="viewUser">
						<div class="input-group newUserField ">
								<span class="input-group-addon">Name</span>
									<div class="form-group errorBox">
											<input type="text" class="form-control" id="user_name"  placeholder="FirstName LastName" aria-describedby="basic-addon1">
									</div>
						</div>
						<div id="nameErrorMsg" class="errorMessages">
								<p >Please enter name</p>
						</div>
<!-- ............................. -->
					 	<div class="input-group newUserField top25">
							<span class="input-group-addon" >Address</span>
								<div class="form-group errorBox">
									<input type="text" class="form-control" id="user_address" placeholder="123 Address st" aria-describedby="basic-addon1">
								</div>
						</div>
						<div id="addressErrorMsg" class="errorMessages">
								<p >Please enter Address</p>
						</div>
<!-- ....................... -->
						<div class="input-group newUserField top25">
							<span class="input-group-addon" >Postal code</span>
								<div class="form-group errorBox">
									<input type="text" class="form-control" id="user_postal" placeholder="A1B 2C3" aria-describedby="basic-addon1">
								</div>
						</div>
						<div id="postalErrorMsg" class="errorMessages">
								<p >Please enter Postal Code</p>
						</div>
<!-- ...................... -->
						<div class="input-group newUserField top25">
							<span class="input-group-addon" >Phone number</span>
								<div class="form-group errorBox" >
									<input type="text" class="form-control phoneBox" id="user_phone" placeholder="(555)987-6543 (include area code)" aria-describedby="basic-addon1">
								</div>
						</div>
						<div id="phoneErrorMsg" class="errorMessages">
								<p >Please enter Phone number (10 digits)</p>
						</div>
<!-- ...................... -->
						<div class="input-group newUserField top25">
							<span class="input-group-addon" >Email address</span>
								<div class="form-group errorBox">
									<input type="text" class="form-control emailBox" id="user_email" placeholder="name@mail.com" aria-describedby="basic-addon1">
								</div>
						</div>
						<div id="emailErrorMsg" class="errorMessages">
								<p >Please enter Email address</p>
						</div>
		<!-- ................ -->
						<div class="input-group newUserField top25">
							<span class="input-group-addon" >ID Number</span>
								<div class="form-group errorBox">
									<input type="text" class="form-control idBox" id="user_idnum" placeholder="909808 (6 digits)" aria-describedby="basic-addon1">
								</div>
						</div>
						<div id="idnumErrorMsg" class="errorMessages">
								<p >Please enter ID Number (6 digits)</p>
						</div>
	<!-- ................... -->
						<div class="input-group newUserField top25">
							<span class="input-group-addon" >SIN Number</span>
								<div class="form-group errorBox">
									<input type="text" class="form-control sinBox" id="user_sin" placeholder="111 222 333 (9 digits)" aria-describedby="basic-addon1">
								</div>
						</div>
						<div id="sinErrorMsg" class="errorMessages">
								<p >Please enter SIN Number (9 digits)</p>
						</div>

<!-- .............................. -->
						<div class="input-group newUserField">
								<!-- <span class="input-group-addon" id="user_admin_access">Admin access</span>
										<input type="checkbox" class="form-control"  aria-label="...">
								</span> -->
								<span class="input-group-addon "   >Admin access</span>
										<select  class="col-xs-3 " id="admin_access" name="adminPhp_access">
												<!-- <span class="input-group-addon" id="user_admin_access">Admin access</span> -->
												<!-- <option value="null" >--</option> -->
												<option value="No" >No</option>
												<option value="Yes" >Yes</option>
										</select>
						</div>
						<div id="adminErrorMsg" class="errorMessages">
								<p >Please select admin access rights</p>
						</div>						
						<div class="container">
							<button class="btn btn-primary submitText" id="saveChangesButton" type="button" onclick="checkInput();" name="" 
							> SAVE CHANGES 
							</button>
						</div>
					</form>

<!-- =========  separate form to reset password ================ -->
					<form method="post" action="" class="newUserWell editUserForm" id="resetPasswordField">
							<div class="input-group newUserField">
						  <span class="input-group-addon"  name="userPHP-pw">New Password?</span>
							<div class="form-group errorBox">
								<input type="text" class="form-control" id="user_pw" name="userPhp_pw" placeholder="8 or more characters pls" value="" aria-describedby="basic-addon1">
							</div>
						</div>
						<div id="pwErrorMsg" class="errorMessages">
							<p >Please enter valid password (8 char. minimum)</p>
						</div>
						<div class="container">
							<button class="btn btn-primary submitText" id="reset_PasswordButton" type="button" onclick="checkPW();" name="submitPw" 
						value=""> SAVE NEW PASSWORD </button>
						</div>
					</form>
					<div >
						<button class="btn btn-danger submitText" id="deleteAccount" type="button" onclick="deleteIt();" name="submitPw" 
						value=""> DELETE ACCOUNT </button>
					</div>


				</div>

				<div>


			</div>
		</div>
	 
	</div>
<script type="text/javascript" src="js/editUserJax.js"></script>

<?php include("footer.php"); ?> 

