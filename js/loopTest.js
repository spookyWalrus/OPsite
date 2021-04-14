

var goHere = document.getElementById("tester");
var count;
var loop;
var nodeNum;

function makeThings(){

	var i;

	if (count > 0){
			i = count;
			} else {
				i = 0;
				count = 0;
				// alert("count is 0");
			} ;
	var action = "stuff";
	var cellNo =  i + 2;
	var nodeNo = i + 10;
	// var nodeNo = i;


	if (loop == 1){
		action = " good";
	} else if (loop == 2){
		action = " bad ";
	}
	var nuDiv = document.createElement("tr");

	nuDiv.innerHTML = "Do the things " + cellNo+ action;
	goHere.insertBefore(nuDiv, goHere.childNodes[nodeNo]);
	// count = i;
	// i++;
	loop++;
	// count = i;
	// alert("Loop is " +loop);
	// alert("count is " +count);


}

function addShifts() {
	loop = 1;

	for (x = 0; x < 2; x++) {
		makeThings();

		if (x == 2){
		makeThings();
		}	
	}
	count++;
	alert("new count is " +count);

}


function deleteShifts(){
	var num;

	if (count <= 1){

	nodeNo = count + 7;
	// alert("deleting node " + nodeNo);
    goHere.removeChild(goHere.childNodes[nodeNo]);
	// alert("node deleted is " +nodeNo);
	// count--;
	num = nodeNo - 1;
	// nodeNo = count + 1;
	// alert("deleting node " +num);
	goHere.removeChild(goHere.childNodes[num]);
	// alert("node deleted is " +nodeNo);
	count--;
	alert("count is now at " + count);
	} else if (count > 1){

	nodeNo = count + 9;
	alert("deleting node " +nodeNo);
    goHere.removeChild(goHere.childNodes[nodeNo]);
	// alert("node deleted is " +nodeNo);
	// count--;
	num = nodeNo - 1;
	// nodeNo = count + 1;
	// alert("deleting node " +num);
	goHere.removeChild(goHere.childNodes[num]);
	// alert("node deleted is " +nodeNo);
	count--;
	alert("count is now at " + count);
	}else {

	}
// }

// function deleteShifts() {
// 		eraseThings();

	// for (x = 0; x < 2; x++) {
	// 	eraseThings();

	// 	if (x == 2){
	// 	eraseThings();
	// 	count--;
	// 	}	
	// }
	// count++;
	// alert("new count is " +count);

// }





