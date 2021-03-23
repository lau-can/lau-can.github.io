const buttonArray = document.getElementsByClassName('calc-button');
console.log(buttonArray);

let result = '';
let isNumber = true;

let isEqual = true;
let isOperation = false;
let allPushedButton = [];
for (let button of buttonArray) {

	button.addEventListener("click", () => {

		allPushedButton.push(button.innerText);
		
		if (button.innerText === '+' || button.innerText === '-' || button.innerText === '/' || button.innerText === '*'){
			isOperation = true;
		} else {
			isOperation = false;
		}

		isNumber = (!isNaN(Number(button.innerText))) ? true : false;

		// if (!isNaN(Number(button.innerText))){
		// 	isNumber = true;
		// } else {
		// 	isNumber = false;
		// }

		if (button.id === 'BKS'){
			result = result.substring(0, result.length - 1);
		}

		isEqual = (button.id === 'EQL') ? true : false;

		if (result.length===0 && !isNumber) {
			result = '0';
		}
		
		for(let i = 0; i< result.length; i++){
			console.log(result);
			if(result[i] === '0'){
				result = result.substr(i+1, result.length-1);
			}
			else {
				break;
			}
		}

		if (button.id === 'CLR') {
			result = '';
			document.getElementById('RES').innerText = '0';
		}

		if (button.id === 'EQL') {
			document.getElementById('RES').innerText = String(eval(result));
			result = String(eval(result));
		}
		else if (!(button.id === 'CLR')){
			if (!isNumber && isNaN(Number(result[result.length-1])) ) {
				result = result.substring(0, result.length - 1)+button.innerText;
			}
			else if ((allPushedButton[allPushedButton.length-2] !== '=' || isOperation) && button.id !== 'BKS') {
				result += button.innerText;
			} else if (isNumber) {
				result = button.innerText;
			}
			document.getElementById('RES').innerText = result;
		}
	});
}


