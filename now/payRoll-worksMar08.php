<?php include("header.php"); ?>
<?php include("menu-bar.php"); ?> 
<?php include("payRollTools.php"); ?> 

		</div>
	</div>
	<!-- ===================== payroll page ======================== -->

<!-- .........................   payroll search    ............... -->
	<!-- includes searches with date range? or pay period? -->
	<!-- name, from date, to this date -->
	
<div class="container"> <!-- box for search function -->
		<div class="row">
			<div class="col-xs-5 col-xs-offset-4">
				<div id="payRollTitle" >
					<h2>Payroll </h2>
				</div>
				<!-- <div class="container col-xs-12"> -->
				<div  class="row" id="findPayPeriod"> 
					<div class="container col-xs-12">

					<!-- <form method="post" action="" class="well " id="findUser"> -->
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
							value=""> Search now </button>
					</div>
				</div>
			</div>
		</div>
</div>

<!-- .......................    pay table  ........................ -->
<!-- <div class="container"> -->
	<!-- <div class="row"> -->
		<div class="container">
			<div class="col-xs-6 col-xs-offset-4 row">
				<h4 id="viewingThisUser" name="viewingThisUserPhp">Payroll for: </h4>
				<!-- <h4 id="dateRange">Pay period: </h4> -->
				<!-- </h4> -->
			</div>
		</div>

	<div class="payRollContainer">
		<form method="post" action="" class="newUserWell editUserForm" id="viewUser">
			<div class="col-xs-12">
				<div class="row">
				<!-- <p class="tickets-title-md">ADULTE</p> -->
					<div class="weekNo">Week 1</div>
				  	<table class="table payrollTable ">
				  		<!-- ............ report details............ -->
				  		<!-- <tr class="weekRange">
				  			<td class="weekNo">Week 1</td>
				  		</tr> -->
				  		<tr class="week-days">
				  			<td></td>
				  			<td>Sun</td>
				  			<td>Mon</td>
				  			<td>Tues</td>
				  			<td>Wed</td>
				  			<td>Thu</td>
				  			<td>Fri</td>
				  			<td>Sat</td>
				  		</tr>
				  		<tr class="dateRow">
						    <th class="itemColumn">Date:
						    </th>
						    <td class="dateColumn"> -  
						    </td>
						    <td class="dateColumn"> - 
						    </td>
						    <td class="dateColumn"> - 
						    </td>
						    <td class="dateColumn"> - 
						    </td>
						    <td class="dateColumn"> - 
						    </td>
						    <td class="dateColumn"> - 
						    </td>
						    <td class="dateColumn"> - 
						    </td> 
						    <td class="dateColumnBlank"> </td>
						    <!-- <td class="dateColumnBlank">//</td> -->
						</tr>
						<tr class="eventRow">
							<th class="itemColumn">Event
							</th>
							<td class="eventCol"> -
							</td>
							<td class="eventCol"> -
							</td>
							<td class="eventCol"> -
							</td>
							<td class="eventCol"> -
							</td>
							<td class="eventCol"> -
							</td>
							<td class="eventCol"> -
							</td>
							<td class="eventCol"> -
							</td>
						</tr>
						<tr class="codeRow">
							<th class="itemColumn">Event Location
							</th>
							<td class="eventLoc"><input class="accntInput"></input>
							</td>
							<td class="eventLoc"> -
							</td>
							<td class="eventLoc"> -
							</td>
							<td class="eventLoc"> -
							</td>
							<td class="eventLoc"> -
							</td>
							<td class="eventLoc"> -
							</td>
							<td class="eventLoc"> -
							</td>
						</tr>
						<tr class="codeRow">
							<th class="itemColumn">Event #
							</th>
							<td class="codeColumn"> <input class="accntInput"></input>
							</td>
							<td class="codeColumn"> -
							</td>
							<td class="codeColumn"> -
							</td>
							<td class="codeColumn"> -
							</td>
							<td class="codeColumn"> -
							</td>
							<td class="codeColumn"> -
							</td>
							<td class="codeColumn"> -
							</td>
						</tr>
						<tr class="accntRow">
							<th class="itemColumn">Account #
							</th>
							<td class="accntCol"><input class="accntInput"></input>
							</td>
							<td class="accntCol"> -
							</td>
							<td class="accntCol"> -
							</td>
							<td class="accntCol"> -
							</td>
							<td class="accntCol"> -
							</td>
							<td class="accntCol"> -
							</td>
							<td class="accntCol"> -
							</td>
						</tr>
						<tr class="roleRow">
							<th class="itemColumn">Position
							</th>
							<td class="role"> -
							</td>
							<td class="role"> -
							</td>
							<td class="role"> -
							</td>
							<td class="role"> -
							</td>
							<td class="role"> -
							</td>
							<td class="role"> -
							</td>
							<td class="role"> -
							</td>
						</tr>
						<!-- ......................  new start/end ..................... -->
						<tr class="st1Row">
							<th class="itemColumn">Start 1:
							</th>
							<td class="start1Col">  -
							</td>
							<td class="start1Col">  -
							</td>
							<td class="start1Col">  -
							</td>
							<td class="start1Col">  -
							</td>
							<td class="start1Col">  -
							</td>
							<td class="start1Col">  -
							</td>
							<td class="start1Col">  -
							</td>
						</tr>
						<tr class="en1Row">
							<th class="itemColumn">End 1:
							</th>
							<td class="en1Col">  -
							</td>
							<td class="en1Col">  -
							</td>
							<td class="en1Col">  -
							</td>
							<td class="en1Col">  -
							</td>
							<td class="en1Col">  -
							</td>
							<td class="en1Col">  -
							</td>
							<td class="en1Col">  -
							</td>
						</tr>
						<tr class="totalRow">
							<th class="itemColumn">Hours:
							</th>
							<td class="totCol1"> -
							</td>
							<td class="totCol1"> -
							</td>
							<td class="totCol1"> -
							</td>
							<td class="totCol1"> -
							</td>
							<td class="totCol1"> -
							</td>
							<td class="totCol1"> -
							</td>
							<td class="totCol1"> -
							</td>
							
						</tr>
						<!-- ......................  new start/end ..................... -->
						<tr class="st2Row">
							<th class="itemColumn">Start 2:
							</th>
							<td class="start2Col"> -
							</td>
							<td class="start2Col"> -
							</td>
							<td class="start2Col"> -
							</td>
							<td class="start2Col"> -
							</td>
							<td class="start2Col"> -
							</td>
							<td class="start2Col"> -
							</td>
							<td class="start2Col"> -
							</td>
						</tr>
						<tr class="en2Row">
							<th class="itemColumn">End 2:
							</th>
							<td class="en2Col"> -
							</td>
							<td class="en2Col"> -
							</td>
							<td class="en2Col"> -
							</td>
							<td class="en2Col"> -
							</td>
							<td class="en2Col"> -
							</td>
							<td class="en2Col"> 
							</td>
							<td class="en2Col"> -
							</td>
							
						</tr>
						<!-- .............. totals row ............................ -->
						<tr class="totalRow2">
							<th class="itemColumn">Hours:
							</th>
							<td class="totCol2"> -
							</td>
							<td class="totCol2"> -
							</td>
							<td class="totCol2"> -
							</td>
							<td class="totCol2"> -
							</td>
							<td class="totCol2"> -
							</td>
							<td class="totCol2"> -
							</td>
							<td class="totCol2"> -
							</td>
							
						</tr>
						<!-- ......................  3rd block   ..................... -->
						<tr class="st3Row">
							<th class="itemColumn">Start 3:
							</th>
							<td class="start3Col"> -
							</td>
							<td class="start3Col"> -
							</td>
							<td class="start3Col"> -
							</td>
							<td class="start3Col"> -
							</td>
							<td class="start3Col"> -
							</td>
							<td class="start3Col"> -
							</td>
							<td class="start3Col"> -
							</td>
						</tr>
						<tr class="en3Row">
							<th class="itemColumn">End 3:
							</th>
							<td class="en3Col"> -
							</td>
							<td class="en3Col"> -
							</td>
							<td class="en3Col"> -
							</td>
							<td class="en3Col"> -
							</td>
							<td class="en3Col"> -
							</td>
							<td class="en3Col"> -
							</td>
							<td class="en3Col"> -
							</td>
							
						</tr>
						<!-- .............. totals row 3 ............................ -->
						<tr class="totalRow3">
							<th class="itemColumn">Hours:
							</th>
							<td class="totCol3"> -
							</td>
							<td class="totCol3"> -
							</td>
							<td class="totCol3"> -
							</td>
							<td class="totCol3"> -
							</td>
							<td class="totCol3"> -
							</td>
							<td class="totCol3"> -
							</td>
							<td class="totCol3"> -
							</td>
							<td class="totalsColumn"> Week Total
						    </td> 
						    <!-- <td class="totalsColumn">
						    	earnings
						    </td> --> 
						</tr>
						<!-- ................. hours sub total ............. -->
						<tr class="hourSubTotalRow">
							<th class="itemColumn">Total Hrs @ Reg Rate:
							</th>
							<td class="subTotHr"> -
							</td>
							<td class="subTotHr"> -
							</td>
							<td class="subTotHr"> -
							</td>
							<td class="subTotHr"> -
							</td>
							<td class="subTotHr"> -
							</td>
							<td class="subTotHr"> -
							</td>
							<td class="subTotHr"> -
							</td>
							<td class="weekSubTot"> -
							</td>
							<!-- <td class="weekRateCol"> 4
							</td>
							<td class="weekEarnCol"> 4
							</td> -->
						</tr>
						<tr class="wage">
							<th class="rateH">Reg. Rate:
							</th>
							<td class="rateCol"> -
							</td>
							<td class="rateCol"> -
							</td>
							<td class="rateCol"> -
							</td>
							<td class="rateCol"> -
							</td>
							<td class="rateCol"> -
							</td>
							<td class="rateCol"> -
							</td>
							<td class="rateCol"> -
							</td>
							<td class="weekRtTot"> -
							</td>
							<!-- <td class="weekRateCol"> 4
							</td>
							<!-- <td class="weekEarnCol"> 4
							</td> -->
						</tr> 
						<tr class="OTRow">
							<th class="itemColumn">OT:
							</th>
							<td class="otHr"> -
							</td>
							<td class="otHr"> -
							</td>
							<td class="otHr"> -
							</td>
							<td class="otHr"> -
							</td>
							<td class="otHr"> -
							</td>
							<td class="otHr"> -
							</td>
							<td class="otHr"> -
							</td>
							<td class="weekOtHr"> -
							</td>
							<!-- <td class="weekRateCol"> 4
							</td> -->
							<!-- <td class="weekEarnCol"> 4
							</td>
 -->					</tr>
						<tr class="wageOT">
							<th class="rateH">OT Rate:
							</th>
							<td class="rateCol"> -
							</td>
							<td class="rateCol"> -
							</td>
							<td class="rateCol"> -
							</td>
							<td class="rateCol"> -
							</td>
							<td class="rateCol"> -
							</td>
							<td class="rateCol"> -
							</td>
							<td class="rateCol"> -
							</td>
							<td class="weekRtTot"> -
							</td>
							<!-- <td class="weekRateCol"> 4
							</td>
							<!-- <td class="weekEarnCol"> 4
							</td> -->
						</tr> 
						<tr class="OT2Row">
							<th class="itemColumn">OT x2:
							</th>
							<td class="ot2Hr"> -
							</td>
							<td class="ot2Hr"> -
							</td>
							<td class="o2tHr"> -
							</td>
							<td class="ot2Hr"> -
							</td>
							<td class="ot2Hr"> -
							</td>
							<td class="ot2Hr"> -
							</td>
							<td class="ot2Hr"> -
							</td>
							<td class="weekOt2Hr"> -
							</td>
							<!-- <td class="weekRateCol"> 4
							</td> -->
						<!-- 	<td class="weekEarnCol"> 4
							</td> -->
						</tr>
						<tr class="wage2OT">
							<th class="rateH">OT Rate:
							</th>
							<td class="rate2Col"> -
							</td>
							<td class="rate2Col"> -
							</td>
							<td class="rate2Col"> -
							</td>
							<td class="rate2Col"> -
							</td>
							<td class="rate2Col"> -
							</td>
							<td class="rate2Col"> -
							</td>
							<td class="rate2Col"> -
							</td>
							<td class="weekRtTot"> -
							</td>
							<!-- <td class="weekRateCol"> 4
							</td>
							<!-- <td class="weekEarnCol"> 4
							</td> -->
						</tr> 
						<tr class="grTotals">
							<th class="grTotsColumn">Total Hours:
							</th>
							<td class="grTotCol"> -
							</td>
							<td class="grTotCol"> -
							</td>
							<td class="grTotCol"> -
							</td>
							<td class="grTotCol"> -
							</td>
							<td class="grTotCol"> -
							</td>
							<td class="grTotCol"> -
							</td>
							<td class="grTotCol"> -
							</td>
							<td class="weekGrTot"> -
							</td>
							<!-- <td class="weekRateCol"> 4
							</td> -->
							<!-- <td class="weekEarnCol"> 4
							</td> -->
						</tr>
						<tr class="income">
							<th class="inH">Earnings:
							</th>
							<td class="inCol"> -
							</td>
							<td class="inCol"> -
							</td>
							<td class="inCol"> -
							</td>
							<td class="inCol"> -
							</td>
							<td class="inCol"> -
							</td>
							<td class="inCol"> -
							</td>
							<td class="inCol"> -
							</td>
							<td class="weekInTot"> -
							</td>
							<!-- <td class="weekRateCol"> 4
							</td> -->
							<!-- <td class="weekEarnCol"> 4
							</td> -->
						</tr>

					</table>
					<!-- <div class="payRollComments" >Pay Roll Comments
						<textarea rows="5" ></textarea>	
					</div>	 -->

					<div class="payRollComments">Pay Roll Comments
						<textarea row="20" cols="20"></textarea>	
					</div>	
				</div>
			</div>
			<!-- <div class="col-xs-12">
				<button class="btn btn-primary submitText" id="saveChangesButton" type="button" onclick="checkPayRollInput();" name="" 
					 > SAVE AND SUBMIT PAYROLL </button> -->
			


			<!-- </div> -->
		<!-- </form> -->
	</div>
	

<?php include("payRollp2.php"); ?> 
