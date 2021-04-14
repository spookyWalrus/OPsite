
<?php include("header.php"); ?>
<?php include("menu-bar.php"); ?>
		</div>
	</div>
<!-- ================  reportPage ======================== -->
<!-- And more stuff to do... (April 24th) 
	- change report page tables to Bootstrap form-group format
		so error messages will pop up around specific field that has error
			>> this requires form validation to invoke javascript to
				add/erase classes to fields that have errors in them...
	- need to set up JS script to get element by names[0]....
	- set up 'hours' fields like 'names' fields for showFormErrors function

-->


<!-- More things to fix: (April 07):
	- check format of the date, give error message
		and example as feedback
	- check time format of date, make function to change 
		automatically to 24hr format for DB + echo values -->

<!-- !! HEY!  Fix these things (March 07 2019):
- need a refresh button for making a new report???
- 2ndary block to enter work hours needs to stay hidden
- 2ndary block needs button to show/hide (dynamically add 2nd block?)
- all menus need a dynamic way to change the value so it corresponds
	to what item is selected, including supervisor
- test all user submitted values so name+value all correspond correctly to a DB
- add bootstrap/css so that blocks stack on narrow window (in case of split screen mode)
- submit needs confirm alert -> SHOULD submit not reload page but just input values to DB?
- upon submit, stamp with time/date + user name (auto-fill another field?)
- send pdf/email a copy to admin? -->
<!-- <body>
 -->
 	<div class="container">
        <div class="row" >
	        <div class="col-sm-12 col-md-12" id="mainContentRow" >
                <form method="POST" action="">

 					<div class="errors text-center"><?php echo "$errorM1"; ?></div>

		          	<div class="well well-sm col-sm-8 col-sm-offset-2">
		                <form method="POST" action="">
	              		<!-- <input class=""  type="submit" name="resetPage" value="go">Refresh Page</input> -->

	 					<table class="table report-table-head">
							<tr>
								<td class="reportHeading-headTable">Event date (y-m-d)</td>
								<td><input class="reportInput-s" id="date_of_event" name="event_date" value="<?php echo "$ev_date"; ?>" >
								</td>	
									  <!-- <td id="reportDate"></td> -->
							</tr>
							<tr>
								<td class="reportHeading-headTable">Event name</td>
								<td><input class="reportInput" type="text" name="event_name"  value="<?php echo "$ev_name"; ?>" placeholder="Dancehall Fever"></td>
							</tr>
							<tr>	
								<td class="reportHeading-headTable" value="">Event location</td>
									<td>
											<select name="event_location"  id="event_menu">
												<option value="OP" <?=$_POST['event_location'] == "OP" ? ' selected="selected"' : ''?> >OPCH</option>
												<option value="DB" <?=$_POST['event_location'] == "DB" ? ' selected="selected"' : ''?> >DB Clarke</option>
												<option value="FC" <?=$_POST['event_location'] == "FC" ? ' selected="selected"' : ''?> >FC Smith</option>
											</select>
									</td>
								</td>
							</tr>
							<tr>
								<td class="reportHeading-headTable">Event code</td>
								<td><input class="reportHeadingInput-s" type="text" name="event_code" value="<?php echo "$ev_code"; ?>"></td>
							</tr>    							
							<tr>
								<td class="reportHeading-headTable">Weather</td>
								<td><input class="reportInput-s" type="text" name="event_weather"  value="<?php echo "$ev_weather"; ?>" placeholder="Shark Tornados.666C. "></td>
							</tr>
						</table>
						<br>
					    <table class="table report-table-head">
							<tr>
								<td class="reportHeading-headTable">Event Start time</td>
								<td class="reportHeading-headTable">Event End time</td>
								<td class="reportHeading-headTable">Length of intermission</td>
							</tr>
							<tr>
								<td><input class="reportHeadingInput-m" type="text" name="event_start" value="<?php echo "$ev_start"; ?>" placeholder="e.g: 21:00"></td>
								<td><input class="reportHeadingInput-m" type="text" name="event_end" value="<?php echo "$ev_end"; ?>"></td>
								<td><input class="reportHeadingInput-m" type="text" name="event_intermission" value="<?php echo "$ev_intermission"; ?>"></td>
							</tr>
						
						</table>
	                </div> <!-- end of class="well" col-sm-8 -->

 					<div class="errors2 text-center"><?php echo "$errorM2"; ?></div>

	    			<div class="well col-xs-12 reportWell">	

	    				<div class="row">
	    					<table class="table report-table"  >
	    						<tbody id="reportMain" >
    								<tr>
										<td class="reportHeading">Name</td>
		    							<td><input class="reportInput" type="text" name="ss_name"  value="<?php echo "$super_name"; ?>"></td>
		    							<td><input class="reportInput" type="text" name="t1_name" value="<?php echo "$tech1_name"; ?>"></td>
		    							<td><input class="reportInput" type="text" name="t2_name"  value="<?php echo "$tech2_name"; ?>"></td>
		    							<td><input class="reportInput " type="text" name="t3_name" value="<?php echo "$tech3_name"; ?>"></td>
										
									</tr>
									<tr>
		    							<td class="reportHeading">Position</td>
		    							<td class="" name="ss_position" value="supervisor"><strong>SUPERVISOR</strong></td>

										<td class=""><select name="t1_position" >
														<option value="HA"<?=$_POST['t1_position'] == "HA" ? ' selected="selected"' : ''?>>Head Audio Technician</option>
														<option value="HLX" <?=$_POST['t1_position'] == "HLX" ? ' selected="selected"' : ''?>>Head Lighting Technician</option>
														<option value="ST" <?=$_POST['t1_position'] == "ST" ? ' selected="selected"' : ''?>>Stage Technician</option>
														<option value="SS" <?=$_POST['t1_position'] == "SS" ? ' selected="selected"' : ''?>>Supervisor</option>
													</select>
										</td> <!-- above menu is same for rest of technicians where name="$t(x)_position" is the variable,
													and for ALL menus! -->
										<td class=""><select name="t2_position" ><!--value="<?php echo '$t1_pos_select'; ?>" -->
														<option value="HA"<?=$_POST['t2_position'] == "HA" ? ' selected="selected"' : ''?>>Head Audio Technician</option>
														<option value="HLX" <?=$_POST['t2_position'] == "HLX" ? ' selected="selected"' : ''?>>Head Lighting Technician</option>
														<option value="ST" <?=$_POST['t2_position'] == "ST" ? ' selected="selected"' : ''?>>Stage Technician</option>
														<option value="SS" <?=$_POST['t2_position'] == "SS" ? ' selected="selected"' : ''?>>Supervisor</option>
													</select>
										</td>
										<td class=""><select name="t3_position" ><!--value="<?php echo '$t1_pos_select'; ?>" -->
														<option value="HA"<?=$_POST['t3_position'] == "HA" ? ' selected="selected"' : ''?>>Head Audio Technician</option>
														<option value="HLX" <?=$_POST['t3_position'] == "HLX" ? ' selected="selected"' : ''?>>Head Lighting Technician</option>
														<option value="ST" <?=$_POST['t3_position'] == "ST" ? ' selected="selected"' : ''?>>Stage Technician</option>
														<option value="SS" <?=$_POST['t3_position'] == "SS" ? ' selected="selected"' : ''?>>Supervisor</option>
													</select>
										</td>
										
										
		    						</tr>
		    					
									<tr class="form-group has-error">
										<label class="control-label" for="">
										<td class="reportHeading">Start time</td>
		    							<td><input class="reportInput-s" type="text" name="ss_start" placeholder="e.g: 14:00" value="<?php echo "$ss_s"; ?>" ></td>
		    							<td><input class="reportInput-s" type="text" name="t1_start" placeholder="" value="<?php echo "$t1_s"; ?>"></td>
		    							<td><input class="reportInput-s" type="text" name="t2_start" placeholder="" value="<?php echo "$t2_s"; ?>"></td>
		    							<td><input class="reportInput-s" type="text" name="t3_start" placeholder="" value="<?php echo "$t3_s"; ?>"></td>
			                   		</tr>
			                   		<tr>
		    							<td class="reportHeading">Break1 start</td>
				                   		<td><input class="reportInput-s" type="text" name="ss_break1_s" placeholder="" value="<?php echo "$ss_bk1_s"; ?>"></td>
		    							<td><input class="reportInput-s" type="text" name="t1_break1_s" placeholder="" value="<?php echo "$t1_bk1_s"; ?>"></td>
		    							<td><input class="reportInput-s" type="text" name="t2_break1_s" placeholder="" value="<?php echo "$t2_bk1_s"; ?>"></td>
		    							<td><input class="reportInput-s" type="text" name="t3_break1_s" placeholder="" value="<?php echo "$t3_bk1_s"; ?>"></td>
			                   		</tr>	
			                   		<tr>
		    							<td class="reportHeading">Break1 End</td>
				                   		<td><input class="reportInput-s" type="text" name="ss_break1_e" placeholder="" value="<?php echo "$ss_bk1_e"; ?>"></td>
		    							<td><input class="reportInput-s" type="text" name="t1_break1_e" placeholder="" value="<?php echo "$t1_bk1_e"; ?>"></td>
		    							<td><input class="reportInput-s" type="text" name="t2_break1_e" placeholder="" value="<?php echo "$t2_bk1_e"; ?>"></td>
		    							<td><input class="reportInput-s" type="text" name="t3_break1_e" placeholder="" value="<?php echo "$t3_bk1_e"; ?>"></td>
			                   		</tr>
		                   		
		                   			<tr id="nodeBelow"><td></td></tr> <!-- reference node : add add additional shift blocks below this-->
			                   	
			                   		<tr><td></td></tr>
			                   		<tr><td></td></tr>
				                    <tr>
		    							<td class="reportHeading">End time</td>
				                   		<td><input class="reportInput-s" type="text" name="ss_end" placeholder="" value="<?php echo "$ss_e"; ?>"></td>
		    							<td><input class="reportInput-s" type="text" name="t1_end" placeholder="" value="<?php echo "$t1_e"; ?>"></td>
		    							<td><input class="reportInput-s" type="text" name="t2_end" placeholder="" value="<?php echo "$t2_e"; ?>"></td>
		    							<td><input class="reportInput-s" type="text" name="t3_end" placeholder="" value="<?php echo "$t3_e"; ?>"></td>
			                   		</tr>
			                   		
			                   	</tbody>
	            			</table>
            			</div>
            			 <div class="moreBreaksButtons" >
				       		<button type="button" class="addBreaks" onclick="javascript:addBreaks(); return false">Add extra break periods</td>
					  	  	<button type="button" class="lessBreaks" onclick="javascript:delBreaks(); return false">Delete extra break periods</td>
					  	</div>
		          	</div> <!-- end of class="report well" col-xs-12 -->
		       <!--  <div class="addBreaks" >
		       		<button type="button" onclick="javascript:addShifts(); return false">Add extra break periods</td>
			  	  	<button type="button" onclick="javascript:delShifts(); return false">Delete extra break periods</td>
			  	</div> -->
			  	<div>
			  	  	<button type="button" class="addTechs" onclick="#; return false">Add more technicians</td>
				</div>
				<div>
              		<input class="submitShowReport"  type="submit" name="Showreport_submit" value="Submit show report"></input>
	          	</div>
	          	</form>
	        </div> <!-- end of col-sm-12, id="mainContentRow" -->
        </div> <!-- end of row -->
    </div> <!-- end of container -->
    


<?php include("reportToolJax.php"); ?>
<?php include("reportToolsGood.php"); ?>
<?php include("footer.php"); ?>