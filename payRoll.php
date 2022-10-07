
<?php include("header.php"); ?>
<?php include("menu-Bar.php"); ?> 
<?php include("payRollTools.php"); ?> 
<!--
-->
		</div>
	</div>
	<!-- ===================== payroll page ======================== -->

<!-- .........................   payroll search    ............... -->
	<!-- includes searches with date range? or pay period? -->
	<!-- name, from date, to date -->
	
<div class="container"> <!-- box for search function -->
		<div class="row">
			<div class="col-xs-6 col-xs-offset-3">
				<div id="payRollTitle" >
					<h2>Payroll </h2>
				</div>
				<!-- select year, current year by default -->
				<div  class="row"> 
					<div class="container col-xs-12 findPayPeriod">
						<!-- <div class="searchBox">
							<p class="searchTitle">Select name</p>
							<select class="searchUmenu" id="searchUserMenu" name="searcUserMenuPhp" value="">
							</select>
						</div> -->
						<div class="searchBox custom-select">
							<p class="searchTitle">Select Year</p>
							<!-- <select class="searchUmenu" id="theYears" name="yearsSelect" value="">
							</select> -->
							<p id="theYears"></p>
						</div>
					
						<button class="btn btn-primary" id="searchUserButton" type="button" onclick="getDateRange();"  
							value="">Change pay period year</button>
					</div>
				</div>
				<!-- look up payperiod -->
				<div  class="row" > 
					<div class="container col-xs-12 findPayPeriod">
						<div class="searchBox">
							<p class="searchTitle">Select name</p>
							<select class="searchUmenu" id="searchUserMenu" name="searcUserMenuPhp" value="">
							</select>
						</div>
						<div class="searchBox custom-select">
							<p class="searchTitle">Pay Period Start Date</p>
							<select class="searchUmenu" id="fromHere" name="fromHereDate" value="">
							</select>
						</div>
					
						<button class="btn btn-primary" id="searchUserButton" type="button" onclick="searchPayPeriod();"  
							value=""> Calculate now </button>
					</div>
				</div>
			</div>
		</div>
</div>
	<!-- .......................    pay table  ........................ -->
	<!-- <div class="container"> -->
	<!-- <div class="row"> -->
	<div class="container">
		<div class="col-xs-8 col-xs-offset-3 row">
			<h4 id="viewingThisUser" name="viewingThisUserPhp">Pay Period:</h4>
			<!-- <h4 id="dateRange">Pay period: </h4> -->
			<!-- </h4> -->
		</div>
	</div>
	<div id="prPage"> <!-- this is where rest of payroll pages gets loaded on click of searchPayPeriod() -->






<?php include("payRollpg1.php") ?>
<script type="text/javascript" src="js/payRollJax.js"></script>
<script type="text/javascript" src="js/payRollJSTools.js"></script>
<script type="text/javascript" src="js/payRollAddColsJS.js"></script>
<script type="text/javascript" src="js/payRollIncomeAdjust.js"></script>

<?php include("footer.php") ?>
