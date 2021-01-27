function genTeam() {
	
	var namesList = document.getElementById("namesList").value;
	var Nteams = parseFloat(document.getElementById("Nteams").value);
	var Npeople = parseFloat(document.getElementById("Npeople").value);
	namesList = namesList.split('\n');

	var i = 0;
	var j = 0;
	var Team = [];
	var currentNameIdx;
	var currentName;
	var HTMLtable = [];
	var temp;

	while (i < Nteams) {
		Team[i]=[];
		while (j < Npeople) {
			currentNameIdx = getRandomInt(namesList.length);
			currentName = namesList[currentNameIdx-1];
			Team[i][j] = currentName;
			namesList.splice(currentNameIdx-1,1);
			j++;
			temp = Team[i];
			console.log("temp: "+temp);
		}
		i++;
		j=0;
		HTMLtable = HTMLtable+"Team "+i+": "+temp.toString()+"<br/>";
	  }
	document.getElementById("results").innerHTML = HTMLtable;

}

function getRandomInt(max) {
	return Math.ceil(Math.random() * Math.floor(max));
}