
<div class="btn-group menuButton ">
  	<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
	    So what you wanna do?&nbsp; &nbsp;  <span class="caret"></span>
	</button>
	<ul class="dropdown-menu" id="daMenu">
	    <li><a href="homePage.php">Continue procrastination</a></li>
	    <li><a href="showReport.php">Create Show report</a></li>
      <li><a href="viewReport.php">View Show report</a></li>
      <li role="separator" id="divider">         </li>
	    <li><a href="createUser.php">Create Account</a></li>
	    <li><a href="editUser.php">View/ Edit Account</a></li>
      <li role="separator" id="divider">         </li>
	    <li><a href="https://mojopizza.in/">Order pizza</a></li>
      <li role="separator" id="divider">         </li>
	    <li><a href="payRoll.php">Do Payroll</a></li>
	</ul>
</div>

<nav class="navbar navbar-inverse navbar-static-top" role="navigation" id="userNavMenu">
  <div class="container">
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" id="userNavMenuToggle" data-toggle="collapse" data-target="#userNavMenuCollapsed">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
    </div>

    <!-- Collect the nav links, forms, and other content for toggling -->
    <div class="collapse navbar-collapse" id="userNavMenuCollapsed">
      <ul class="nav navbar-nav" id="userNavMenuList">
        <label id="user-name-icon" >Your name</label>
        <li><a href="editOwnAccount.php">Account settings</a></li>
        <li><a href="https://mojopizza.in/">Order another pizza</a></li>
        <li role="separator" id="divider">         </li>
        <li><a onclick="javascript: killSession();" >Log Out</a></li>
    
      </ul>
    </div>
  </div>
</nav>


