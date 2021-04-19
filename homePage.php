<?php include("header.php"); ?>



		</div>
	</div>
</div>

 <!-- =================================  homePage =============== -->
<div class="row" id="homePage">
	 <div class="container " id="procrastinate">
	    <p> Stop procrastinating and get back to work</p><br>
	</div>

	<div class="col-xs-12 col-xs-offset-1">
		<embed id="trexGame" >

		<!-- <embed id="trexGame" src="https://apps.thecodepost.org/trex/trex.html"> -->
	</div>


</div>
<?php include("checkSession.php"); ?>
<?php include("footer.php") ?>

<script type="text/javascript">
		var mainMenu = document.getElementByClassName('menuButton');
	    var userMenu = document.getElementById('userNavMenu');
        mainMenu.style.visibility = "visible";
        userMenu.style.visibility = "visible";
</script>

