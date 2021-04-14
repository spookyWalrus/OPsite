

	<div class="payRollContainer" >
		<form method="post" action="" class="newUserWell editUserForm" id="viewUser">
		<div>
			<button class="hideButton" type="button" onclick="return hideHours(33,0);">Hide Hours</button>
			<button class="showButton" type="button" onclick="return hideHours(55,0);">Show Hours</button>
		</div>
			<div class="col-xs-12" >
				<div class="row">
					<!-- <div class="tableDiv"> -->
					<div class="weekNo col-xs-12">Week 1</div>
  					<!-- <div class="container tableDiv"> -->

					  	<table class="table payrollTable " id="table1">
					  		<!-- ............ report details............ -->
					  		<!-- <tr id="weekRange">
					  			<td class="weekNo">Week 1</td>
					  		</tr> -->
					  		<tr class="week-days">
					  			<th class="weekdayDay itemColumn noTopBorder"></th>
					  			<td class="weekdayDay">Sun</td>
					  			<td class="weekdayDay">Mon</td>
					  			<td class="weekdayDay">Tues</td>
					  			<td class="weekdayDay">Wed</td>
					  			<td class="weekdayDay">Thu</td>
					  			<td class="weekdayDay">Fri</td>
					  			<td class="weekdayDay">Sat</td>
					  			<td class="weekdayDay totalsCel weekTotalFont">Week Totals</td>
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
							    <td class="dateColumnBlank weekTotalFont">&#8595; </td>
							    <!-- <td class="dateColumnBlank">//</td> -->
							</tr>
							<tr class="eventRow">
								<th class="itemColumn">Event
								</th>
								<td class="eventCol">
								</td>
								<td class="eventCol">
								</td>
								<td class="eventCol">
								</td>
								<td class="eventCol">
								</td>
								<td class="eventCol">
								</td>
								<td class="eventCol">
								</td>
								<td class="eventCol">
								</td>
							</tr>
							<tr class="venueRow">
								<th class="itemColumn">Venue
								</th>
								<td class="eventLoc">
								</td>
								<td class="eventLoc">
								</td>							
								<td class="eventLoc">
								</td>
								<td class="eventLoc">
								</td>
								<td class="eventLoc">
								</td>							
								<td class="eventLoc">
								</td>
								<td class="eventLoc">
								</td>							
							</tr>
							<tr class="codeRow">
								<th class="itemColumn">Event code
								</th>
								<td class="codeColumn"><input class="codeInput"></input>
								</td>
								<td class="codeColumn"><input class="codeInput"></input>
								</td>
								<td class="codeColumn"><input class="codeInput"></input>
								</td>
								<td class="codeColumn"><input class="codeInput"></input>
								</td>
								<td class="codeColumn"><input class="codeInput"></input>
								</td>
								<td class="codeColumn"><input class="codeInput"></input>
								</td>
								<td class="codeColumn"><input class="codeInput"></input>
								</td>
							</tr>
							<tr class="accntRow">
								<th class="itemColumn">Account code
								</th>
								<td class="accntCol"><input class="accntInput"></input>
								</td>
								<td class="accntCol"><input class="accntInput"></input>
								</td>
								<td class="accntCol"><input class="accntInput"></input>
								</td>
								<td class="accntCol"><input class="accntInput"></input>
								</td>
								<td class="accntCol"><input class="accntInput"></input>
								</td>
								<td class="accntCol"><input class="accntInput"></input>
								</td>
								<td class="accntCol"><input class="accntInput"></input>
								</td>
							</tr>
							<tr class="roleRow">
								<th class="itemColumn">Position
								</th>
								<td class="roleSelect2" >
									<div class="roleDiv">
								      <span class="myarrow"></span>
										<select class="role" onchange="roleChange(0);">
											<option value="--"> -- </option>
											<option value="HA">Head Audio</option>
											<option value="HLX" >Head Lighting </option>
											<option value="HR" >Head Rigger </option>
											<option value="ST" >Stage Technician</option>
											<option value="USH">Usher</option>
											<option value="SSIP">SSIP</option>
											<option value="FOH">FOH Manager</option>
											<option value="SS">Supervisor</option>
											<option value="null">na</option>
										</select>
									</div>
								</td>
								<td class="roleSelect2" >
									<div class="roleDiv">
								      <span class="myarrow"></span>
										<select  class="role" onchange="roleChange(1);">
											<option value="--"> -- </option>
											<option value="HA">Head Audio</option>
											<option value="HLX" >Head Lighting </option>
											<option value="HR" >Head Rigger </option>
											<option value="ST" >Stage Technician</option>
											<option value="USH">Usher</option>
											<option value="SSIP">SSIP</option>
											<option value="FOH">FOH Manager</option>
											<option value="SS">Supervisor</option>
											<option value="null">na</option>
										</select>
									</div>
								</td>
								<td class="roleSelect2" >
									<div class="roleDiv">
								      <span class="myarrow"></span>
										<select  class="role" onchange="roleChange(2);">
											<option value="--"> -- </option>
											<option value="HA">Head Audio</option>
											<option value="HLX" >Head Lighting </option>
											<option value="HR" >Head Rigger </option>
											<option value="ST" >Stage Technician</option>
											<option value="USH">Usher</option>
											<option value="SSIP">SSIP</option>
											<option value="FOH">FOH Manager</option>
											<option value="SS">Supervisor</option>
											<option value="null">na</option>
										</select>
									</div>
								</td>
								<td class="roleSelect2" >
									<div class="roleDiv">
								      <span class="myarrow"></span>
										<select  class="role" onchange="roleChange(3);">
											<option value="--"> -- </option>
											<option value="HA">Head Audio</option>
											<option value="HLX" >Head Lighting </option>
											<option value="HR" >Head Rigger </option>
											<option value="ST" >Stage Technician</option>
											<option value="USH">Usher</option>
											<option value="SSIP">SSIP</option>
											<option value="FOH">FOH Manager</option>
											<option value="SS">Supervisor</option>
											<option value="null">na</option>
										</select>
									</div>
								</td>
								<td class="roleSelect2" >
									<div class="roleDiv">
								      <span class="myarrow"></span>
										<select  class="role" onchange="roleChange(4);">
											<option value="--"> -- </option>
											<option value="HA">Head Audio</option>
											<option value="HLX" >Head Lighting </option>
											<option value="HR" >Head Rigger </option>
											<option value="ST" >Stage Technician</option>
											<option value="USH">Usher</option>
											<option value="SSIP">SSIP</option>
											<option value="FOH">FOH Manager</option>
											<option value="SS">Supervisor</option>
											<option value="null">na</option>
										</select>
									</div>
								</td>
								<td class="roleSelect2" >
									<div class="roleDiv">
								      <span class="myarrow"></span>
										<select  class="role" onchange="roleChange(5);">
											<option value="--"> -- </option>
											<option value="HA">Head Audio</option>
											<option value="HLX" >Head Lighting </option>
											<option value="HR" >Head Rigger </option>
											<option value="ST" >Stage Technician</option>
											<option value="USH">Usher</option>
											<option value="SSIP">SSIP</option>
											<option value="FOH">FOH Manager</option>
											<option value="SS">Supervisor</option>
											<option value="null">na</option>
										</select>
									</div>
								</td>
								<td class="roleSelect2" >
									<div class="roleDiv">
								      <span class="myarrow"></span>
										<select  class="role" onchange="roleChange(6);">
											<option value="--"> -- </option>
											<option value="HA">Head Audio</option>
											<option value="HLX" >Head Lighting </option>
											<option value="HR" >Head Rigger </option>
											<option value="ST" >Stage Technician</option>
											<option value="USH">Usher</option>
											<option value="SSIP">SSIP</option>
											<option value="FOH">FOH Manager</option>
											<option value="SS">Supervisor</option>
											<option value="null">na</option>
										</select>
									</div>
								</td>

								<!-- <td class="role"> -
								</td> -->
								<!-- <td class="role"> -
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
								</td> -->
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
							<tr class="totalRow1">
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
								<!-- <td class="totalsColumn"> Week Total
							    </td>  -->
							    <!-- <td class="totalsColumn">
							    	earnings
							    </td> --> 
							</tr>
							<!-- ................. hours sub total ............. -->
							<tr class="hourSubTotalRow">
								<th class="itemColumn">Total Hours:
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
								<!-- <td class="weekSubTot"> -
								</td> -->
								<!-- <td class="weekRateCol"> 4
								</td>
								<td class="weekEarnCol"> 4
								</td> -->
							</tr>
							<tr class="wage">
								<th class="rateH itemColumn">Reg. Rate:
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
								<!-- <td class="weekRtTot"> -
								</td> -->
								<!-- <td class="weekRateCol"> 4
								</td>
								<!-- <td class="weekEarnCol"> 4
								</td> -->
							</tr> 
							<tr class="OTRow">
								<th class="itemColumn">OT Hrs:
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
								<!-- <td class="weekOtHr"> -
								</td> -->
								<!-- <td class="weekRateCol"> 4
								</td> -->
								<!-- <td class="weekEarnCol"> 4
								</td>
	 -->					</tr>
							<tr class="wageOT">
								<th class="rateH itemColumn">OT Rate:
								</th>
								<td class="OTrateCol"> -
								</td>
								<td class="OTrateCol"> -
								</td>
								<td class="OTrateCol"> -
								</td>
								<td class="OTrateCol"> -
								</td>
								<td class="OTrateCol"> -
								</td>
								<td class="OTrateCol"> -
								</td>
								<td class="OTrateCol"> -
								</td>
								<!-- <td class="weekOTRtTot"> -
								</td> -->
								<!-- <td class="weekRateCol"> 4
								</td>
								<!-- <td class="weekEarnCol"> 4
								</td> -->
							</tr> 
							<tr class="OT2Row">
								<th class="itemColumn">OT x2 Hrs:
								</th>
								<td class="ot2Hr"> -
								</td>
								<td class="ot2Hr"> -
								</td>
								</td>
								<td class="ot2Hr"> -
								</td>
								<td class="ot2Hr"> -
								</td>
								<td class="ot2Hr"> -
								</td>
								<td class="ot2Hr"> -
								</td>
								<td class="ot2Hr"> -
								</td>
								<!-- <td class="weekOt2Hr"> -
								</td> -->
								<!-- <td class="weekRateCol"> 4
								</td> -->
							<!-- 	<td class="weekEarnCol"> 4
								</td> -->
							</tr>
							<tr class="wage2OT">
								<th class="rateH itemColumn">OT x2 Rate:
								</th>
								<td class="OT2rateCol"> -
								</td>
								<td class="OT2rateCol"> -
								</td>
								<td class="OT2rateCol"> -
								</td>
								<td class="OT2rateCol"> -
								</td>
								<td class="OT2rateCol"> -
								</td>
								<td class="OT2rateCol"> -
								</td>
								<td class="OT2rateCol"> -
								</td>
								<td class="totalsColumn weekTotalFont">
							    </td> 
								<!-- <td class="weekRateCol"> 4
								</td>
								<!-- <td class="weekEarnCol"> 4
								</td> -->
							</tr> 
							<tr class="adjHr">
								<th class="itemColumn">Adj. Hours:
								</th>
								<td><input class="adjHrCol"></input>
								</td>
								<td><input class="adjHrCol"></input>
								</td>
								<td><input class="adjHrCol"></input>
								</td>
								<td><input class="adjHrCol"></input>
								</td>
								<td><input class="adjHrCol"></input>
								</td>
								<td><input class="adjHrCol"></input>
								</td>
								<td><input class="adjHrCol"></input>
								</td>
								<td class="totalsColumn"><input class="adjHrCol"></input>
								</td>
								<!-- <td class="weekRateCol"> 4
								</td>
								<td class="weekEarnCol"> 4
								</td> -->
							</tr>
							<tr class="wageAdj">
								<th class="rateH itemColumn">Adj. Rate/ hr
								</th>
								<td><input class="wageAdjCol"></input>
									<button class="adjRateGo" type="button" onclick="return adjRate(0,0);">Go</button>
								</td>
								<td><input class="wageAdjCol"></input>
									<button class="adjRateGo" type="button" onclick="return adjRate(1,0);">Go</button>
								</td>
								<td><input class="wageAdjCol"></input>
									<button class="adjRateGo" type="button" onclick="return adjRate(2,0);">Go</button>
								</td>
								<td><input class="wageAdjCol"></input>
									<button class="adjRateGo" type="button" onclick="return adjRate(3,0);">Go</button>
								</td>
								<td><input class="wageAdjCol"></input>
									<button class="adjRateGo" type="button" onclick="return adjRate(4,0);">Go</button>
								</td>
								<td><input class="wageAdjCol"></input>
									<button class="adjRateGo" type="button" onclick="return adjRate(5,0);">Go</button>
								</td>
								<td><input class="wageAdjCol"></input>
									<button class="adjRateGo" type="button" onclick="return adjRate(6,0);">Go</button>
								</td>
								<td class="totalsColumn"><input class="wageAdjCol"></input>
									<button class="adjRateGo" type="button" onclick="return adjRate(7,0);">Go</button>
								</td>
								<!-- <td class="weekRateCol"> 4
								</td>
								<td class="weekEarnCol"> 4
								</td> -->
							</tr> 
							<tr class="grTotals">
								<th class="grTotsColumn itemColumn">Gr. Total Hrs:
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
								<td class="weekGrTot totalsColumn" id="week1HrTot"> -
								</td>
								<!-- <td class="weekRateCol"> 4
								</td> -->
								<!-- <td class="weekEarnCol"> 4
								</td> -->
							</tr>
							<tr class="income">
								<th class="inH itemColumn">Earnings:
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
								<td class="weekInTot totalsColumn" id="wk1InTot"> -
								</td>
								<!-- <td class="weekRateCol"> 4
								</td> -->
								<!-- <td class="weekEarnCol"> 4
								</td> -->
							</tr>
							<tr class="revert">
								<th class="revH itemColumn">Cancel adj. hrs
								</th>
								<td class="revCol">
									<button class="revertGo" type="button" onclick="return revert(0,0);">Revert</button>
								</td>
								<td class="revCol">
									<button class="revertGo" type="button" onclick="return revert(1,0);">Revert</button>
								</td>
								<td class="revCol">
									<button class="revertGo" type="button" onclick="return revert(2,0);">Revert</button>
								</td>
								<td class="revCol">
									<button class="revertGo" type="button" onclick="return revert(3,0);">Revert</button>
								</td>
								<td class="reCol">
									<button class="revertGo" type="button" onclick="return revert(4,0);">Revert</button>
								</td>
								<td class="revCol">
									<button class="revertGo" type="button" onclick="return revert(5,0);">Revert</button>
								</td>
								<td class="revCol">
									<button class="revertGo" type="button" onclick="return revert(6,0);">Revert</button>
								</td>
								<td class="revCol">
									<button class="revertGo" type="button" onclick="return revert(7,0);">Revert</button>
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
					</div>

						<!-- <div class="payRollComments">Pay Roll Comments
							<textarea class="commentTextArea" row="20" cols="20"></textarea>	
						</div>	 -->
					<!-- </div> -->

				</div>

			</div>
			<!-- <div class="col-xs-12">
				<button class="btn btn-primary submitText" id="saveChangesButton" type="button" onclick="checkPayRollInput();" name="" 
					 > SAVE AND SUBMIT PAYROLL </button> -->
			


			<!-- </div> -->
		<!-- </form> -->
	</div>
	
	<?php include("payRollpg2.php"); ?>
