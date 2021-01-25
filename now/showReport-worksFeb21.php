 
<?php include("header.php"); ?>
<?php include("menu-bar.php"); ?> 
<?php include("showReportTools.php"); ?> 
		</div>
	</div>
<!-- ================  show report page ======================== -->

 	<div class="container" id="showReportMainBox" >
        <div class="row" >
	        <div class="col-sm-12 col-md-12" id="mainContentRow" >
	        	<h2 class="text-center">Create show report </h2>
                <form method="POST" action="" id="showReportForm">
 					<!-- <div class="errors text-center" id="$errorM1"></div> -->
		          	<div class="well well-sm col-sm-6 col-sm-offset-3 reportWidth">
		                <!-- <form method="POST" action=""> -->
	              		<!-- <input class=""  type="submit" name="resetPage" value="go">Refresh Page</input> -->

	 					<table class="table showReportTable col-xs-4">
							<tr>
								<td class="showHeader">Event date (yyyy-mm-dd)</td>
								<td><input class="headerInputs errorReport" id="event_date" name="event_date" >
									<span class="errorMessages">Need date</span></td>
								<!-- <td><input class="reportInput-s" id="date_of_event" name="event_date" value="<?php echo "$ev_date"; ?>" > -->
									  <!-- <td id="reportDate"></td> -->
							</tr>
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
					    <table class="table showReportTable2" >
					    	<tbody>
								<tr>
									<td >Show Start time
									<td >Show End time
									<td >Intermission (in min)
								</tr>
								<tr>
									<td><input class="headerInputs2 errorReport" type="text" id="event_start" value="" placeholder="use 4 digit, 24hr time"></td>
									<td><input class="headerInputs2 errorReport" type="text" id="event_end" value="" placeholder=""></td>
									<td><input class="headerInputs2 errorReport" type="text" id="event_intermission" value="" ></td>
								</tr>
								<tr>
									<td class="errorMessages">Need start time</td>
									<td class="errorMessages">Need end time</td>
									<td class="errorMessages">Intermission in minutes?</td>
								</tr>
								<!-- <tr >
									<td ></td>
									<td >Use 'n/a' for no start/end time</td>
								</tr> -->
							</tbody>
						
						</table>
						<div class="col-xs-12 col-xs-offset-3" id="noteNA"> <p>Please use 4-digit, 24 hour time. Use 'na' if not applicable<br>Use forward slash to seperate multiple start/ end times </p> </div>

	                </div> <!-- end of class="well" col-sm-8 -->

 					<!-- <div class="errors2 text-center"><?php echo "$errorM2"; ?></div> -->
					<!-- <div class="col-xs-12 col-xs-offset-3" id="noteNA"> <h5>Please use 4-digit, 24 hour time.    Use 'n/a' if start/end time is not applicable </h5> </div> -->

	    			<div class="well col-xs-12 reportWell reportWidth">	
	    				<div class="row">
	    					<div class="" id="erorHrsMssg">Error: name or position. To leave empty, type and select 'na'</div>
	    					<div class="" id="staffHourErrors"> Error: start or end time.  Use 4 digit, 24hr time </div>
	    					<div class="" id="staffBreaksErrors"> Error: break time. Check format.</div>
	    				</div>
	    				<div class="row">
	    					<div class="table report-table">
	    						<!-- <div class=""> -->
									<table class="table-striped">
										<col span="7" class="wideColumn">

										<theader>
											<tr>
												<td class="inputHeader">NAME</td>
		    									<td><input class="reportInputs errorHours" type="text" id="tL_name" value=""></td>
			    								<td><input class="reportInputs errorHours" type="text" id="t1_name" value=""></td>
			    								<td><input class="reportInputs errorHours" type="text" id="t2_name" value=""></td>
			    								<td><input class="reportInputs errorHours" type="text" id="t3_name" value=""></td>
			    								<td><input class="reportInputs errorHours" type="text" id="t4_name" value=""></td>
			    								<td><input class="reportInputs errorHours" type="text" id="t5_name" value=""></td>
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
																<option value="null">n/a</option>
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
																<option value="null">n/a</option>
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
																<option value="nul">n/a</option>
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
																<option value="null">n/a</option>
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
																<option value="null">n/a</option>
															</select>
													</div>
												</td>			
				    						</tr>
				    					</theader>
				    						<tr>
				    							<td class="tableDivider"><br><br>
					                   				<!-- <span id="staffHourErrors">Mistakes with hours entered</span> -->
				                   				</td>
				                   			</tr> 
			    						<tbody>
											<tr class="form-group has-error">
												<td class="inputHeader">START TIME 1</td>
				    							<td><input class="reportInputs errorHourStr" type="text" id="tL_start1" placeholder="use 4 digit, 24hr time" value="" ></td>
				    							<td><input class="reportInputs errorHourStr" type="text" id="t1_start1" placeholder="" value=""></td>
				    							<td><input class="reportInputs errorHourStr" type="text" id="t2_start1" placeholder="" value=""></td>
				    							<td><input class="reportInputs errorHourStr" type="text" id="t3_start1" placeholder="" value=""></td>
				    							<td><input class="reportInputs errorHourStr" type="text" id="t4_start1" placeholder="" value=""></td>
				    							<td><input class="reportInputs errorHourStr" type="text" id="t5_start1" placeholder="" value=""></td>
					                   		</tr>
											<tr>
				    							<td class="inputHeader">End time 1</td>
						                   		<td><input class="reportInputs errorHourEnd" type="text" id="tL_end1" placeholder="" value=""></td>
				    							<td><input class="reportInputs errorHourEnd" type="text" id="t1_end1" placeholder="" value=""></td>
				    							<td><input class="reportInputs errorHourEnd" type="text" id="t2_end1" placeholder="" value=""></td>
				    							<td><input class="reportInputs errorHourEnd" type="text" id="t3_end1" placeholder="" value=""></td>
				    							<td><input class="reportInputs errorHourEnd" type="text" id="t4_end1" placeholder="" value=""></td>
				    							<td><input class="reportInputs errorHourEnd" type="text" id="t5_end1" placeholder="" value=""></td>
					                   		</tr>
					                   		<tr class="fadeRow">
				    							<td class="inputHeader">BREAK 1<br>(in minutes)</td>
						                   		<td><input class="reportInputs errorBrk1" type="text" id="tL_bk1" placeholder="" value="na"></td>
				    							<td><input class="reportInputs errorBrk1" type="text" id="t1_bk1" placeholder="" value="na"></td>
				    							<td><input class="reportInputs errorBrk1" type="text" id="t2_bk1" placeholder="" value="na"></td>
				    							<td><input class="reportInputs errorBrk1" type="text" id="t3_bk1" placeholder="" value="na"></td>
				    							<td><input class="reportInputs errorBrk1" type="text" id="t4_bk1" placeholder="" value="na"></td>
				    							<td><input class="reportInputs errorBrk1" type="text" id="t5_bk1" placeholder="" value="na"></td>
					                   		</tr>	
					                   		<tr>
				    							<td class="inputHeader">BREAK 2<br>(in minutes)</td>
						                   		<td><input class="reportInputs errorBrk2" type="text" id="tL_bk2" placeholder="" value="na"></td>
				    							<td><input class="reportInputs errorBrk2" type="text" id="t1_bk2" placeholder="" value="na"></td>
				    							<td><input class="reportInputs errorBrk2" type="text" id="t2_bk2" placeholder="" value="na"></td>
				    							<td><input class="reportInputs errorBrk2" type="text" id="t3_bk2" placeholder="" value="na"></td>
				    							<td><input class="reportInputs errorBrk2" type="text" id="t4_bk2" placeholder="" value="na"></td>
				    							<td><input class="reportInputs errorBrk2" type="text" id="t5_bk2" placeholder="" value="na"></td>
					                   		</tr>	
					                   		<tr>
				    							<td class="inputHeader">BREAK 3<br>(in minutes)</td>
						                   		<td><input class="reportInputs errorBrk3" type="text" id="tL_bk3" placeholder="" value="na"></td>
				    							<td><input class="reportInputs errorBrk3" type="text" id="t1_bk3" placeholder="" value="na"></td>
				    							<td><input class="reportInputs errorBrk3" type="text" id="t2_bk3" placeholder="" value="na"></td>
				    							<td><input class="reportInputs errorBrk3" type="text" id="t3_bk3" placeholder="" value="na"></td>
				    							<td><input class="reportInputs errorBrk3" type="text" id="t4_bk3" placeholder="" value="na"></td>
				    							<td><input class="reportInputs errorBrk3" type="text" id="t5_bk3" placeholder="" value="na"></td>
					                   		</tr>	
				                   			<tr>
				                   				<td class="tableDivider">  <br></td>
						                    <tr>
				    							<td class="inputHeader">End time</td>
						                   		<td><input class="reportInputs errorHourEnd" type="text" id="tL_end" placeholder="" value=""></td>
				    							<td><input class="reportInputs errorHourEnd" type="text" id="t1_end" placeholder="" value=""></td>
				    							<td><input class="reportInputs errorHourEnd" type="text" id="t2_end" placeholder="" value=""></td>
				    							<td><input class="reportInputs errorHourEnd" type="text" id="t3_end" placeholder="" value=""></td>
				    							<td><input class="reportInputs errorHourEnd" type="text" id="t4_end" placeholder="" value=""></td>
				    							<td><input class="reportInputs errorHourEnd" type="text" id="t5_end" placeholder="" value=""></td>
					                   		</tr>
					                   	</tbody>
			                   		</table>
			                   		
			                   	<!-- </div> -->
	            			</div>
            			</div>
            			 <!-- <div class="moreBreaksButtons" >
				       		<button type="button" class="addBreaks" onclick="javascript:addBreaks(); return false">Add extra break periods</td>
					  	  	<button type="button" class="lessBreaks" onclick="javascript:delBreaks(); return false">Delete extra break periods</td>
					  	</div> -->
		          	</div>

<!-- ............... comments section ...................................... -->
		          	<!-- <div class="well col-xs-12 reportWidth row">
		          		<div class="container">
		          			<h4 style="text-align:center">Comments</h4>
		          			<div class="row">
			          			<div class="container">
			          			  	<div class="miniComments" >
			          					<h5>Technical</h5>
			          					<textarea  id="commentsTechnical" form="showReportForm"></textarea>
			          				</div>
				          			<div class="container  miniComments" >
				          				<h5>Facilities</h5>
				          				<textarea  id="commentsFacilities" form="showReportForm"></textarea>
				          			</div>
				          			<div class="container  miniComments" >
				          				<h5>Client experience</h5>
				          				<textarea  id="commentsClient" form="showReportForm"></textarea>
				          			</div>
				          		</div>

			          		</div>
			          		<br>
			          		<div class="row">
			          			<div class="container col-xs-8 col-xs-offset-2">
			          				<h5 style="text-align: center">General</h5>
			          				<textarea  id="commentsGeneral" form="showReportForm"></textarea>
			          			</div>
			          		</div>
			          	</div>

	          		</div> -->
		          	



		          	 <!-- end of class="report well" col-xs-12 -->
		       <!--  <div class="addBreaks" >
		       		<button type="button" onclick="javascript:addShifts(); return false">Add extra break periods</td>
			  	  	<button type="button" onclick="javascript:delShifts(); return false">Delete extra break periods</td>
			  	</div> -->
			  

			  <!-- 	<div>
			  	  	<button type="button" class="addTechs" onclick="#; return false">Add more technicians</td>
				</div>
-->				
				<!-- <div> -->
				<div class="submitReport">
					<button class="btn btn-primary submitText" id="createShowReportGo" type="button" onclick="return checkShowReportHeader();"  
										> SUBMIT SHOW REPORT </button>
              		 <!-- <input class="submitShowReport"  type="submit" name="Showreport_submit" value="Submit show report"></input> -->
	          	<!-- </div>  -->
	          	</form>
	        </div> <!-- end of col-sm-12, id="mainContentRow" -->
        </div> <!-- end of row -->
    </div> <!-- end of container -->
    



<!-- <?php include("reportToolsNow.php"); ?> -->
<script type="text/javascript" src="js/showReportJSTools.js"></script>
<script type="text/javascript" src="js/showReportJax.js"></script>

<!-- <script type="text/javascript" src="js/OPsite-insertRow.js"></script> -->
<?php include("footer.php"); ?>