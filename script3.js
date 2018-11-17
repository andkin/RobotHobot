window.onload = function(){
	
let holding = document.getElementById("holding");
holding.style.backgroundColor = "white";
};

let colors = ["red","green","blue","orange","purple","yellow"];
let c = ["r","g","b","o","p","y"];

let p=0,w=0;
let pArr=[],wArr=[];

function getter(){//получить кол-во проводов и портов
	p = document.getElementById("getPorts").value;
	w = document.getElementById("getWires").value;
	
	for(let i=0;i<w;i++)wArr[i]=colors[i];
	for(let i=0;i<p;i++)pArr[i]=i+1;
	
	drawField();
}

let newRobot = document.createElement("div");
let newObject = document.createElement("div");
function drawField(){
	let port = document.getElementById("ports");
	let wire = document.getElementById("wires");
	let space = document.getElementById("space");
	//let robot = document.getElementById("robots");
	
	//порты
	for(let i=0;i<pArr.length;i++){
	let newDiv = document.createElement("div");
		port.appendChild(newDiv);
		newDiv.innerHTML = "<b>"+pArr[i]+"</b>";
		newDiv.style.backgroundColor = "white";
		newDiv.className = "port";
	}
	//провода
	for(let i=0;i<wArr.length;i++){
	let newDiv = document.createElement("div");
		wire.appendChild(newDiv);
		newDiv.style.background = wArr[i];
		newDiv.className = "wire";
	}
	//простронство
	let newDiv = document.createElement("div");
	space.appendChild(newDiv);
	newDiv.style.height = Math.max(p,w)*(100+2)-2+"px";
	newDiv.className = "space";
	
	//robat hobat	
	space.appendChild(newRobot);
	newRobot.id = "robot";
	let Robostyle = newRobot.style;
	Robostyle.top = "0px";
	Robostyle.left = "100px";
	
}

	function addObject(){
		let space = document.getElementById("space");
		space.appendChild(newObject);
		newObject.id = "unobj";
		let Robostyle = newObject.style;
		Robostyle.top = "50px";
		Robostyle.right = "200px";

	}

	function removeObject() {
		space.removeChild(newObject);
	}

let Time, Speed = 20;
let timerID1, timerID2;
let wait;

function animate(finalTop,finalLeft, action){
	let Robostyle = newRobot.style;
	let currentTop = parseInt(Robostyle.top);
	let currentLeft = parseInt(Robostyle.left);
	let Ktop = 0;//индикатор
	Time = (Math.abs(finalTop-currentTop)+Math.abs(finalLeft-currentLeft))/Speed +1500;
	
	//top
	if(finalTop>currentTop){
		let i=currentTop;
		timerID1 = setInterval(function(){
			if(finalTop<=i){clearInterval(timerID1);sweech(action)} else{
				i++;
				Robostyle.top = i+"px";
			}
		},Speed);
		
		}else{
		let i=currentTop;
		timerID1 = setInterval(function(){
			if(finalTop>=i){clearInterval(timerID1);sweech(action)} else{
				i--;
				Robostyle.top = i+"px";
			}
		},Speed);
		Ktop=1;
	}
	
	//left
		if(finalLeft>currentLeft){
		let i=currentLeft;
		timerID2 = setInterval(function(){
			if(finalLeft<=i){clearInterval(timerID2);sweech(action)} else{
				i++;
				Robostyle.left = i+"px";
			}
		},Speed);
		
		}else{
		let i=currentLeft;
		timerID2 = setInterval(function(){
		if(finalLeft>=i){clearInterval(timerID2);sweech(action)} else{
				i--;
				Robostyle.left = i+"px";
			}
		},Speed);
		
	}	
}

function move(param, action){
	//let param = document.getElementById("move").value;
	let Robostyle = newRobot.style;
	if(param!=null){
		if(isNaN(parseInt(param))){			
			let finalLeft = 200;//Сместить робота максимально вправо
			let multip=0;
			while(param!=c[multip]){
				multip++;
			}
			let finalTop = multip*100;
			animate(finalTop, finalLeft, action);
		}else{
			let finalLeft = 0;//Сместить робота максимально влево
			let multip = param-1;
			let finalTop = multip*100;
			animate(finalTop, finalLeft, action);
		}
	}
}

function take(){
	let Robostyle = newRobot.style;
	if(Robostyle.left=="200px" && holding.style.backgroundColor=="white"){
		let colNum = parseInt(Robostyle.top)/100;
		holding.style.backgroundColor = colors[colNum];
	}
}

function put(){
	let Robostyle = newRobot.style;
	if(Robostyle.left=="200px"){
		let colNum = parseInt(Robostyle.top)/100;
		if(holding.style.backgroundColor==colors[colNum]){
			holding.style.backgroundColor = "white";
		}
	}
}

function plug(){
	let Robostyle = newRobot.style;
	let allPorts = document.getElementsByClassName("port");
	if(Robostyle.left == "0px" && holding.style.backgroundColor!="white"){
		let colNum = parseInt(Robostyle.top)/100;
		allPorts[colNum].style.backgroundColor = holding.style.backgroundColor;
		holding.style.backgroundColor = "white";
	}
}
function unplug(){
	let Robostyle = newRobot.style;
	let allPorts = document.getElementsByClassName("port");
	if(Robostyle.left == "0px"&& holding.style.backgroundColor=="white"){
		let colNum = parseInt(Robostyle.top)/100;
		if(allPorts[colNum].style.backgroundColor!="white"){
			holding.style.backgroundColor = allPorts[colNum].style.backgroundColor;
			allPorts[colNum].style.backgroundColor = "white";
			
		}
	}
}

function RadiobuttonChange(but){
	if (but.name=="first"){
		if(but.value=="take" || but.value=="put"){
			let SecondRowRadio = document.getElementsByName("second");
			for(let i=0;i<2;i++){
				SecondRowRadio[i].disabled = true;
				SecondRowRadio[i+2].disabled = false;
				}
		}else{
			let SecondRowRadio = document.getElementsByName("second");
			for(let i=0;i<2;i++){
				SecondRowRadio[i].disabled = false;
				SecondRowRadio[i+2].disabled = true;
				}
		}
	}
}

function handler(){
	let firstWay = document.getElementById("movefrom");
	let secondWay = document.getElementById("moveto");
	let FirstRowRadio = document.getElementsByName("first");
		let firstAction;
	let SecondRowRadio = document.getElementsByName("second");
		let secondAction;
	if(firstWay!=null&&secondWay!=null){
		let i=0;
		while(!FirstRowRadio[i].checked){
			i++;
		}
		firstAction = FirstRowRadio[i].value;
		let j=0;
		while(!SecondRowRadio[j].checked){
			j++;
		}
		secondAction = SecondRowRadio[j].value;
		
		//выполнение
		move(firstWay.value, firstAction);
		let g=0;
		wait = setInterval(function(){
			if(g>Time){
				clearInterval(wait);
				move(secondWay.value,secondAction);
			}else{
				g++;
				console.log("animating");
			}
		},1);
	
}}

function sweech(val){
	switch(val){
			case "take":
			take();
			break;
			case "put":
			put();
			break;
			case "plug":
			plug();
			break;
			case "unplug":
			unplug();
			break;
		}
}







