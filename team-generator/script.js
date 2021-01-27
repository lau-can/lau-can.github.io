function genTeam() {
	var namesList = document.getElementById("namesList").value;
	var Nteams = parseFloat(document.getElementById("Nteams").value);
	var Npeople = parseFloat(document.getElementById("Npeople").value);
	namesList = namesList.split('\n');
	//console.log(namesList);

	//console.log(getRandomInt(namesList.length));
	//console.log(Nteams);
	//console.log(Npeople);

	var i = 0;
	var j = 0;
	var Team = [];
	var currentNameIdx;
	var currentName;
	var HTMLtable = [];
	var temp;
	while (i < Nteams) {
		//console.log(i);
		Team[i]=[];
		while (j < Npeople) {
			currentNameIdx = getRandomInt(namesList.length);
				//console.log("currentNameIdx: "+currentNameIdx);
			currentName = namesList[currentNameIdx-1];
				//console.log("currentName: "+currentName);
			Team[i][j] = currentName;
				//console.log("Team[i][j]: "+Team[i][j]);
			namesList.splice(currentNameIdx-1,1);
				//console.log("namesList: "+namesList);
			j++;
				//console.log("j: "+j);
			temp = Team[i];
			console.log("temp: "+temp);
			
		}
		i++;
		j=0;
		//document.getElementById("results").innerHTML = "<p>"+Team+"</p><br />";
		HTMLtable = HTMLtable+"Team "+i+": "+temp.toString()+"<br/>";
	  }

	// var i,j;
	// var Team = [];
	// for (i = 0; i < Nteams; i++) {
	// 	Team[i]=[];
	// 	for (j = 0; j < Npeople; j++) {
	// 		var idx = getRandomInt(namesList.length);
	// 		Team[i][j]=i*j;
	// 	}
	// }

	console.log(Team);
	console.log(temp.toString());

	document.getElementById("results").innerHTML = HTMLtable;

	//document.getElementById("results").value=Team;

}



function getRandomInt(max) {
	return Math.ceil(Math.random() * Math.floor(max));
}