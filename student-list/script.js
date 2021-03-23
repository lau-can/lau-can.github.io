let read_url = "http://apps.loopevo.com/apis/students/students.php";
let upd_url = "http://apps.loopevo.com/apis/students/update-student.php";
let add_url = "http://apps.loopevo.com/apis/students/add-new-student.php";
let del_url = "http://apps.loopevo.com/apis/students/delete.php";

let dataContainer = {};

function readData(url) {

	// LOAD persons data
	let requestRead = new XMLHttpRequest();
	requestRead.open("GET", url, true);
	requestRead.send();

	// LOADER
	requestRead.onreadystatechange = function () {
		if (requestRead.readyState == 4) {
			if (requestRead.status == 200) {
				dataContainer = JSON.parse(requestRead.responseText);
				generateForm(dataContainer, 'student-table');
				return true;
			}
		}
	};
}

function generateForm(data, id) {

	let output = '';
	let container = document.getElementById(id);
	let tableHeader = '<tr><th>#</th><th>First Name</th><th>Last Name</th><th>Email</th><th>Actions</th></tr>';
	let updateButtonHtml = '<button id="update" onclick="updateStudentPage(this)">Update</button>';
	let deleteButtonHtml = '<button id="delete" onclick="deleteStudent(this)">Delete</button>';
	data.forEach(element => {
		output += 	'<tr>'+
					'<td>'+ element.id + '</td>' +
					'<td>'+ element.first_name + '</td>' +
					'<td>'+ element.last_name + '</td>' +
					'<td>'+ element.email + '</td>' +
					'<td>'+ updateButtonHtml + '</td>' +
					'<td>'+ deleteButtonHtml + '</td>' +
					'</tr>'
	});

	container.innerHTML = tableHeader + output;
}

function htmlAddStudent(){

	let localFirstName = document.getElementById("first_name").value;
	let localLastName = document.getElementById("last_name").value;
	let localEmail = document.getElementById("email").value;

	let requestWrite = new XMLHttpRequest();

	requestWrite.open("POST", add_url, true);
	requestWrite.setRequestHeader("Content-Type", "application/json");
	requestWrite.send(JSON.stringify({ firstName: localFirstName, lastName: localLastName, email: localEmail }));

	requestWrite.onreadystatechange = function () {
		if (requestWrite.readyState == 4) {
			if (requestWrite.status == 200) {
				location.href = "index.html";
				readData(read_url);
				clearInput();
				return true;
			}
		}
	};
}

function clearInput() {
	document.getElementById("first_name").value = '';
	document.getElementById("last_name").value = '';
	document.getElementById("email").value = '';
}

function deleteStudent(id) {
	console.log(id);
	let idDeleteStudent = id.parentNode.parentNode.childNodes[0].innerText;

	let deleteStudent = new XMLHttpRequest();
	deleteStudent.open('POST',del_url,true);
	deleteStudent.send(JSON.stringify({id:idDeleteStudent}));

	deleteStudent.onreadystatechange = function () {
		if (deleteStudent.readyState == 4) {
			if (deleteStudent.status == 200) {
				readData(read_url);
			}
		}
	}
}

function updateStudentPage(id) {

	sessionStorage.setItem("idUpdateStudent",id.parentNode.parentNode.childNodes[0].innerText);
	sessionStorage.setItem("students",JSON.stringify({dataContainer}));
	location.href = "update-student.html";

}

function htmlPopulateForm(){

	let localId = sessionStorage.getItem("idUpdateStudent");
	let students = JSON.parse(sessionStorage.getItem("students"));

	let studentToUpdate = students.dataContainer.find(x => x.id === localId);

	document.getElementById('id').value = studentToUpdate.id;
	document.getElementById('first_name').value = studentToUpdate.first_name;
	document.getElementById('last_name').value = studentToUpdate.last_name;
	document.getElementById('email').value = studentToUpdate.email;

}

function htmlUpdateStudent() {

	let localFirstName = document.getElementById("first_name").value;
	let localLastName = document.getElementById("last_name").value;
	let localEmail = document.getElementById("email").value;
	let localId = document.getElementById('id').value;

	let requestUpdate = new XMLHttpRequest();

	requestUpdate.open("POST", upd_url, true);
	requestUpdate.setRequestHeader("Content-Type", "application/json");
	requestUpdate.send(JSON.stringify({id:localId, firstName: localFirstName, lastName: localLastName, email: localEmail }));

	requestUpdate.onreadystatechange = function () {
		if (requestUpdate.readyState == 4) {
			if (requestUpdate.status == 200) {
				location.href = "index.html";
				readData(read_url);
				document.getElementById('id').value = '';
				clearInput();
				return true;
			}
		}
	};

}