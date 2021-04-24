 
<?php include("header.php"); ?>
<?php include("menu-Bar.php"); ?> 
<?php include("showReportTools.php"); ?> 
		</div>
	</div>

<!-- TO DO: -->
<!-- - filter through staff hours so that anyone that has start time of 'na' in block 1 is not entered into database at all -->


<!-- ===================== search show report to view (by week/date or name?) =================  -->
<div class="container"> <!-- box for search function -->
		<div class="row">
			<div class="col-xs-5 center-block noFloat" >
				<div id="viewReportTitle" >
					<h2>View / Edit Show Report </h2>
				</div>
				<!-- <div class="container col-xs-12"> -->
				<div  class="row" id="viewReportPeriod"> 
					<div class="container col-xs-12" style="margin-top:5px">
						<div class="viewBox custom-select">
							<p class="viewDate">Year: </p>
							<input id="theYear"></input>
						</div>
						<div class="viewBox custom-select">
							<p class="">Month:</p>
							<select class="searchUmenu" id="theMonth" name="thisMonth">
								<option value="01">January</option>
								<option value="02">February</option>
								<option value="03" >March </option>
								<option value="04" >April </option>
								<option value="05" >May</option>
								<option value="06">June</option>
								<option value="07">July</option>
								<option value="08">August</option>
								<option value="09">September</option>
								<option value="10">October</option>
								<option value="11">November</option>
								<option value="12">December</option>
							</select>
						</div>
						<div class="viewBox">
							<p class="viewDate">Date:</p>
							<input id="theDate"></input>
						</div>
						<div class="viewBox">
							<button class="btn btn-primary" id="viewReportDateButton" type="button" onclick="findThisDate();"  
								value=""> Search 
							</button>
							
						</div>
						<p>* If specific date is unknown, search just by year and month
							</p>
						<div class="viewReportLine"></div>

						<div class="viewBox2">
							<p class="" id="searchResultTitle">Search results</p>
							<select class="searchUmenu" id="viewShowResultMenu" name="thisMonth">
								<!-- <option value="  "></option> -->
							</select>
						</div>
						<div class="viewBox2">
							<button class="btn btn-primary" id="viewReportDateButton" type="button" onclick="fillOutReport();"  
								value=""> Select this report 
							</button>
						</div>

					</div>
				</div>
			</div>
		</div>
</div>


<!-- ================  show report page ======================== -->
<!-- ===============================  show report page ======================== -->

 	<div class="container" id="showReportMainBox" >
	        <div class="col-sm-12 col-md-12" id="mainContentRow" >
	        	<div>
	        		<p id="viewThisReport">You are viewing: 'event' on 'date';
	        		</p>
	        	</div>
	        	<!-- <h2 class="text-center">Create show report </h2> -->
	          	<!-- <div class="well well-sm col-sm-6 col-sm-offset-3 reportWidth"> -->
	            <form method="POST" action="" id="showReportForm">
 					<!-- <div class="errors text-center" id="$errorM1"></div> -->
		          	<div class="well col-xs-6 center-block noFloat reportHead">
		                <!-- <form method="POST" action=""> -->
	              		<!-- <input class=""  type="submit" name="resetPage" value="go">Refresh Page</input> -->

	 					<table class="tableReport showReportTable col-xs-4">
							<tr>
								<td class="showHeader">Event date (yyyy-mm-dd)</td>
								<td><input class="headerInputs errorReport" id="event_date" name="event_date" >
									<span class="errorMessages">Need date</span></td>

							<tr>
								<td class="showHeader">Event name</td>
								<td><input class="headerInputs errorReport" type="text" id="event_name"  value="" placeholder="">
									<span class="errorMessages">Need name of event</span></td>
								</td>
							</tr>
							<tr>	
								<td class="showHeader" >Event location</td>
									<td>
										<select class="headerInputs errorReport" id="event_location">
											<option value="null" >--</option>
											<option value="OP" >OPCH</option>
											<option value="DB" >DB Clarke</option>
											<option value="FC" >FC Smith</option>
										</select>
										<span class="errorMessages">Need event location</span>
									</td>
								
								</td>
							</tr>
							<tr>
								<td class="showHeader">Event code</td>
								<td><input class="headerInputs errorReport" type="text" id="event_code" value="">
									<span class="errorMessages">Need event code</span></td>
								</td>
							</tr>    							
							<tr>
								<td class="showHeader">Weather</td>
								<td><input class="headerInputs errorReport" type="text" id="event_weather"  value="" placeholder="">
									<span class="errorMessages">What was the weather?</span></td>
								</td>
							</tr>
						</table>
						<br>
					    <table class="table tableReport showReportTable2" >
					    	<tbody>
								<tr>
									<td >Show Start time
									<td >Show End time
									<td >Intermission (in min)
								</tr>
								<tr>
									<td><input class="headerInputs2 errorReport" type="text" id="event_start" value="" placeholder="use 4 digit, 24hr time"></td>
									<td><input class="headerInputs2 errorReport" type="text" id="event_end" value="" placeholder=""></td>
									<td><input class="headerInputs2 errorReport" type="text" id="event_intermission" value="" placeholder="eg: 20min"></td>
								</tr>
								<tr>
									<td class="errorMessages">Need start time</td>
									<td class="errorMessages">Need end time</td>
									<td class="errorMessages">Intermission in minutes?</td>
								</tr>
							</tbody>
						
						</table>
						<div id="noteNA"> <p>Please use 4-digit, 24 hour time. Use 'na' if not applicable<br>Use forward slash to seperate multiple start/ end times </p> </div>

	                </div> <!-- end of class="well" col-sm-8 -->

	<!-- ============================= end of header info ==================================================== -->
	<!-- ============================= end of header info ==================================================== -->

	    			<div class="well col-xs-12 reportWell reportWidth">	
	    				<div class="row text-center">
	    					<div class="" id="erorHrsMssg">Error: name or position. To leave empty, type and select 'na'</div>
	    					<div class="" id="staffHourErrors"> Error: start and/or end times.  Use 4 digit, 24hr time, or use 'na' </div>
	    					<!-- <div class="" id="staffBreaksErrors"> Error: break time. Check format.</div> -->
	    				</div>
	    				<div class="row">
	    					<div class="tablez">
	    						<!-- <div class=""> -->
									<table class="table-striped tableReport" id="staffHoursTable">
										<col span="7" class="wideColumn">

										<!-- <theader> -->
											<tr>
												<td class="inputHeader">NAME</td>
		    									<td><input class="reportInputs errorHours" type="text" id="tL_name" value="na"></td>
			    								<td><input class="reportInputs errorHours" type="text" id="t1_name" value="na"></td>
			    								<td><input class="reportInputs errorHours" type="text" id="t2_name" value="na"></td>
			    								<td><input class="reportInputs errorHours" type="text" id="t3_name" value="na"></td>
			    								<td><input class="reportInputs errorHours" type="text" id="t4_name" value="na"></td>
			    								<td><input class="reportInputs errorHours" type="text" id="t5_name" value="na"></td>
		    								</tr>
											<tr>
				    							<td class="inputHeader">POSITION</td>
				    							<td><div class="reportInputs">
				    										<select id="tL" class="roleSelect">
																<option value="--"> -- </option>
																<option value="SS">Supervisor</option>
																<option value="FOH">FOH Manager</option>
															</select>
				    							</td>
												<td><div class="reportInputs">
															<select id="t1_position" class="roleSelect">
																<option value="--"> -- </option>
																<option value="HA">Head Audio</option>
																<option value="HLX" >Head Lighting </option>
																<option value="ST" >Stage Technician</option>
																<option value="USH">Usher</option>
																<option value="SSIP">SSIP</option>
																<option value="FOH">FOH Manager</option>
																<option value="SS">Supervisor</option>
																<option value="null">na</option>
															</select>
													</div>
												</td> <!-- above menu is same for rest of technicians where name="$t(x)_position" is the variable,
															and for ALL menus! -->
												<td><div class="reportInputs">
															<select id="t2_position" class="roleSelect">
																<option value="--"> -- </option>
																<option value="HA">Head Audio</option>
																<option value="HLX" >Head Lighting </option>
																<option value="ST" >Stage Technician</option>
																<option value="USH">Usher</option>
																<option value="SSIP">SSIP</option>
																<option value="FOH">FOH Manager</option>
																<option value="SS">Supervisor</option>
																<option value="null">na</option>
															</select>
													</div>
												</td>
												<td><div class="reportInputs">
															<select id="t3_position" class="roleSelect">
																<option value="--"> -- </option>
																<option value="HA">Head Audio</option>
																<option value="HLX" >Head Lighting </option>
																<option value="ST" >Stage Technician</option>
																<option value="USH">Usher</option>
																<option value="SSIP">SSIP</option>
																<option value="FOH">FOH Manager</option>
																<option value="SS">Supervisor</option>
																<option value="null">na</option>
															</select>
													</div>
												</td>
												<td><div class="reportInputs">
															<select id="t4_position" class="roleSelect">
																<option value="--"> -- </option>
																<option value="HA">Head Audio</option>
																<option value="HLX" >Head Lighting </option>
																<option value="ST" >Stage Technician</option>
																<option value="USH">Usher</option>
																<option value="SSIP">SSIP</option>
																<option value="FOH">FOH Manager</option>
																<option value="SS">Supervisor</option>
																<option value="null">na</option>
															</select>
													</div>
												</td>
												<td><div class="reportInputs">
															<select id="t5_position" class="roleSelect">
																<option value="--"> -- </option>
																<option value="HA">Head Audio</option>
																<option value="HLX" >Head Lighting </option>
																<option value="ST" >Stage Technician</option>
																<option value="USH">Usher</option>
																<option value="SSIP">SSIP</option>
																<option value="FOH">FOH Manager</option>
																<option value="SS">Supervisor</option>
																<option value="null">na</option>
															</select>
													</div>
												</td>			
				    						</tr>
				    					<!-- </theader> -->
				    						<tr>
											<!-- <div class="viewReportLine"></div> -->
				    							<td class="tableDivider "><br>
					                   				<!-- <span id="staffHourErrors">Mistakes with hours entered</span> -->
				                   				</td>
				                   			</tr> 
			    						<tbody>
											<tr class="form-group has-error">
												<td class="inputHeader">START TIME 1</td>
				    							<td><input class="reportInputs errorHourStr" type="text" id="tL_start1" placeholder="use 4 digit, 24hr time" value="" ></td>
				    							<td><input class="reportInputs errorHourStr" type="text" id="t1_start1" placeholder="" value="na"></td>
				    							<td><input class="reportInputs errorHourStr" type="text" id="t2_start1" placeholder="" value="na"></td>
				    							<td><input class="reportInputs errorHourStr" type="text" id="t3_start1" placeholder="" value="na"></td>
				    							<td><input class="reportInputs errorHourStr" type="text" id="t4_start1" placeholder="" value="na"></td>
				    							<td><input class="reportInputs errorHourStr" type="text" id="t5_start1" placeholder="" value="na"></td>
					                   		</tr>
											<tr>
				    							<td class="inputHeader">END TIME 1</td>
						                   		<td><input class="reportInputs errorHourEnd" type="text" id="tL_end1" placeholder="" value=""></td>
				    							<td><input class="reportInputs errorHourEnd" type="text" id="t1_end1" placeholder="" value="na"></td>
				    							<td><input class="reportInputs errorHourEnd" type="text" id="t2_end1" placeholder="" value="na"></td>
				    							<td><input class="reportInputs errorHourEnd" type="text" id="t3_end1" placeholder="" value="na"></td>
				    							<td><input class="reportInputs errorHourEnd" type="text" id="t4_end1" placeholder="" value="na"></td>
				    							<td><input class="reportInputs errorHourEnd" type="text" id="t5_end1" placeholder="" value="na"></td>
					                   		</tr>
					                   		<tr class="form-group has-error">
												<td class="inputHeader">START TIME 2</td>
				    							<td><input class="reportInputs errorHourStr" type="text" id="tL_start2" placeholder="" value="na"></td>
				    							<td><input class="reportInputs errorHourStr" type="text" id="t1_start2" placeholder="" value="na"></td>
				    							<td><input class="reportInputs errorHourStr" type="text" id="t2_start2" placeholder="" value="na"></td>
				    							<td><input class="reportInputs errorHourStr" type="text" id="t3_start2" placeholder="" value="na"></td>
				    							<td><input class="reportInputs errorHourStr" type="text" id="t4_start2" placeholder="" value="na"></td>
				    							<td><input class="reportInputs errorHourStr" type="text" id="t5_start2" placeholder="" value="na"></td>
					                   		</tr>
											<tr>
				    							<td class="inputHeader">END TIME 2</td>
						                   		<td><input class="reportInputs errorHourEnd" type="text" id="tL_end2" placeholder="" value="na"></td>
				    							<td><input class="reportInputs errorHourEnd" type="text" id="t1_end2" placeholder="" value="na"></td>
				    							<td><input class="reportInputs errorHourEnd" type="text" id="t2_end2" placeholder="" value="na"></td>
				    							<td><input class="reportInputs errorHourEnd" type="text" id="t3_end2" placeholder="" value="na"></td>
				    							<td><input class="reportInputs errorHourEnd" type="text" id="t4_end2" placeholder="" value="na"></td>
				    							<td><input class="reportInputs errorHourEnd" type="text" id="t5_end2" placeholder="" value="na"></td>
					                   		</tr>
					                   		<tr class="form-group has-error">
												<td class="inputHeader">START TIME 3</td>
				    							<td><input class="reportInputs errorHourStr" type="text" id="tL_start3" placeholder="" value="na" ></td>
				    							<td><input class="reportInputs errorHourStr" type="text" id="t1_start3" placeholder="" value="na"></td>
				    							<td><input class="reportInputs errorHourStr" type="text" id="t2_start3" placeholder="" value="na"></td>
				    							<td><input class="reportInputs errorHourStr" type="text" id="t3_start3" placeholder="" value="na"></td>
				    							<td><input class="reportInputs errorHourStr" type="text" id="t4_start3" placeholder="" value="na"></td>
				    							<td><input class="reportInputs errorHourStr" type="text" id="t5_start3" placeholder="" value="na"></td>
					                   		</tr>
											<tr>
				    							<td class="inputHeader">END TIME 3</td>
						                   		<td><input class="reportInputs errorHourEnd" type="text" id="tL_end3" placeholder="" value="na"></td>
				    							<td><input class="reportInputs errorHourEnd" type="text" id="t1_end3" placeholder="" value="na"></td>
				    							<td><input class="reportInputs errorHourEnd" type="text" id="t2_end3" placeholder="" value="na"></td>
				    							<td><input class="reportInputs errorHourEnd" type="text" id="t3_end3" placeholder="" value="na"></td>
				    							<td><input class="reportInputs errorHourEnd" type="text" id="t4_end3" placeholder="" value="na"></td>
				    							<td><input class="reportInputs errorHourEnd" type="text" id="t5_end3" placeholder="" value="na"></td>
					                   		</tr>
					                   		
					                   	</tbody>
			                   		</table>
			                   		
			                   	<!-- </div> -->
	            			</div>
            			</div>
		          	</div>

				<!-- ............... comments section ...................................... -->
		          	
					<!-- <div class="showReportComments">Show Report Comments -->
						<!-- <textarea class="showReportTextArea" row="20" cols="20"></textarea>	 -->
						<!-- <textarea id="vRTextArea" row="20" cols="20"></textarea>	 -->
					<!-- </div> -->
					<!-- <div class="submitReport"> -->
						<!-- <button class="btn btn-primary submitText center-block" id="createShowReportGo" type="button" onclick="return checkShowReportHeader(2);"   -->
											<!-- > SAVE CHANGES </button> -->
	              		 <!-- <input class="submitShowReport"  type="submit" name="Showreport_submit" value="Submit show report"></input> -->
		          	<!-- </div>  -->
		          	<div class="showReportComments">
						<h4 class="text-center showReportMainTitle">Show Report Comments</h4>
						<div class="row center-block com-tecFacCl">
							<div class="showReportTitles ">Technical
								<textarea class="sRTextArea" row="20" cols="20"></textarea>
							</div>
							<div class="showReportTitles ">Facilities
								<textarea class="sRTextArea" row="20" cols="20"></textarea>
							</div>
							<div class="showReportTitles ">Client Experience
								<textarea class="sRTextArea" row="20" cols="20"></textarea>
							</div>
						</div>
						<div class="showReportTitles row top25">Event summary / other
							<textarea class="sRTextArea" style="height:150px" row="20" cols="20"></textarea>	
						</div>
						<!-- <textarea class="showReportTextArea" row="20" cols="20"></textarea>	 -->
					</div>
					<div class="container-fluid">
						<div class="submitReport row">
							<!-- <div class="col-xs-4 col-xs-offset-1"> -->
							<div class="col-xs-4">
								<button class="btn btn-primary submitText center-block reportButtons" id="createShowReportGo2" type="button" onclick="return checkShowReportHeader(1);"  
												> SAVE AS NEW REPORT </button>	
							</div>
							<!-- <div class="col-xs-4 col-xs-offset-2"> -->
							<div class="col-xs-4">
								<button class="btn btn-primary submitText center-block reportButtons" id="viewShowReportGo" type="button" onclick="return checkShowReportHeader(2);"  
												> SAVE EDITS / CHANGES </button>
							</div>
							<!-- <div class="col-xs-4 col-xs-offset-2"> -->
							<div class="col-xs-4">
								<button class="btn btn-primary submitText center-block reportButtons" id="deleteShowReportGo" type="button" onclick="deleteShowReportHeader();"  
												> DELETE CURRENT REPORT </button>
							</div>
						</div>
					</div>	
	          	</form>
	        </div> <!-- end of col-sm-12, id="mainContentRow" -->
        </div> <!-- end of row -->
    </div> <!-- end of container -->
    



<!-- <?php include("reportToolsNow.php"); ?> -->
<script type="text/javascript" src="js/showReportJSTools.js"></script>
<script type="text/javascript" src="js/showReportJax.js"></script>

<!-- <script type="text/javascript" src="js/OPsite-insertRow.js"></script> -->
<?php include("footer.php"); ?>