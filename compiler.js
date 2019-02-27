
let actions = {
	"Взять":"take",
	"Положить":"put",
	"Подключить":"plug",
	"Отключить":"uplug"
};
let availColors = {
	"r":"red",
	'g':'green',
	'b':'blue',
	'o':'orange',
	'p':'purple',
	'y':'yellow'
};
function compile(){
let file = document.getElementById("fileToCompile");
let IDE = document.getElementById("otladchik");
if(file.value != "		Файл не выбран"){
	IDE.innerHTML = "<b style='color:green;'>Код был загружен... Идет проверка...</b><br>";
	let code = file.value;
	console.log(code);
	let cursor = 0;
	let stringCounter = 1;
	let errorsCounter = 0;
	let operator = true;
	let parameter = false;
	let previousCursor = 0;
	while(cursor != code.length){
		let temporaryString = "";
		let temporaryArray = [];
		if(code[cursor] == ";"){
			for(let i = previousCursor;i<cursor;i++){
				temporaryString += code[i];
			}
			previousCursor=cursor+2;
			temporaryArray = temporaryString.split(" ");
			if(temporaryArray.length>2){
				IDE.innerHTML += "Функция не может принимать более одного параметра! <i>на строке "+stringCounter+"</i><br>";
				errorsCounter++;
			}
			console.log(temporaryArray);
			if(actions[temporaryArray[0]]){
				if(availColors[temporaryArray[1]] || temporaryArray[1]>0 && temporaryArray[1]<6){
					if(!errorsCounter)
						addToChain(temporaryArray[0],temporaryArray[1]);
				}else{
					IDE.innerHTML += "Был указан неверный диапазон значений: <b style='color:red'>"+temporaryArray[1] + "</b><i> на строке "+stringCounter+"</i><br>";
					errorsCounter++;
				}
			}else{
				if(temporaryArray[0] != "		программа"){
					IDE.innerHTML += "Допущена ошибка в названии оператора: <b style='color:red'>"+temporaryArray[0] + "</b> <i> на строке "+stringCounter+"</i><br>";
					errorsCounter++;
				}
			}
			stringCounter++;
			console.log("strnum = "+stringCounter);
		}else{
			if(code[cursor] == '.'){
				console.log("Завершено выполнение программы");
				if(!errorsCounter)
					IDE.innerHTML += "<br><i style='color:green'>Ошибок не найдено</i>";
			}
		}
		cursor++;
	}
}else{
	IDE.innerHTML = "<b style='color:red;'>Вы не выбрали файл!</b>";
}
//alert(file.value.length);
};