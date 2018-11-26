window.onload = function(){
	
let holding = document.getElementById("holding");
holding.style.backgroundColor = "white";
};

let colors = ["red","green","blue","orange","purple","yellow"];
let c = ["r","g","b","o","p","y"];

let timerID1, timerID2, wait;//для анимации

let p=0,w=0;
let pArr=[],wArr=[];
let stopped = false;

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
		newDiv.style.backgroundImage = "url(wire.png)";
		newDiv.style.backgroundSize="100% 100%";
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

function priorityInterrupt()
{
	let priorityFirstInterrupt = document.getElementById("interrupt1").value;
	let prioritySecondInterrupt = document.getElementById("interrupt2").value;
	if (priorityFirstInterrupt < prioritySecondInterrupt){
		stopByButton();
		addObject();
	} else {
		addObject();
		stopByButton();
	}
}

function stopRobot(){
	clearInterval(timerID1);
	clearInterval(wait);
	clearInterval(timerID2); 
}

	function addObject(){
		let space = document.getElementById("space");
		space.appendChild(newObject);
		newObject.id = "unobj";
		let Objstyle = newObject.style;
		let x,y;
		x = Math.random()*(2-0)+0;
		y = Math.random()*(5-0)+0;
		Objstyle.top = y*100+"px";
		Objstyle.left = x*100+"px";
		alert('Внимание! Найден объект! Ожидайте столкновения!');
	}

	function removeObject() {
		space.removeChild(newObject);
	}
	
	function isObjectFoundOnTrack(){
		let rtop = parseFloat(document.getElementById("robot").style.top);
		let rleft = parseFloat(document.getElementById("robot").style.left);
		if(document.getElementById("unobj")){
		let otop = parseFloat(document.getElementById("unobj").style.top);
		let oleft = parseFloat(document.getElementById("unobj").style.left);
			//console.log(rtop+" "+otop+" \ "+rleft+" "+oleft);
		if(Math.abs((rtop)-(otop))<100 && Math.abs((rleft)-(oleft))<100){
			console.log("%cWARNING!Remove objects from the track!!",'background: #222; color: red');
			return true;
		}else{
			return false;
		}
		}
	}

	function checkMoveToValue(value){
		if(parseInt(value.length)==0){
			document.getElementById("addObjRadio").disabled=false;
		}else{			
			document.getElementById("addObjRadio").disabled=true;
		}		
	}
	
	function stopByButton(){
		stopped = true;
		alert('Внимание! Прерывание по кнопке!');
	}
	
//addChain
let theChain = [];
let leftVal = 0, topVal = 0;
function addToChain(){
	let radios = document.getElementsByName("first");
	let moveField = document.getElementById("moveto");
	let chainBody = document.getElementById("thechain");
	let chainEntity = document.createElement("div");
	chainEntity.className = "chainEntity";
	let col;
	console.log(moveField.value.length);
	if(moveField.value.length==0){
		chainEntity.style.backgroundImage="url(puzzle/white.png)";
	}else if(isNaN(moveField.value)){
		for(col=0;col<c.length;col++)
			if(c[col]==moveField.value){		
			chainEntity.style.backgroundImage="url(puzzle/"+colors[col]+".png)";
			chainEntity.innerHTML = "go to "+colors[col]+"<br>and ";
			}
	}else {
		if (moveField.value){
			chainEntity.style.backgroundImage="url(puzzle/white.png)";
			chainEntity.innerHTML = "go to "+moveField.value+"<br>and ";
	}
}
	//добавление объекта
	for(let i=0;i<radios.length;i++){
		if(radios[i].checked){
			if(moveField.value.length==0){
				chainEntity.innerHTML += radios[i].value;
				theChain[chainBody.childNodes.length-1] = {
				to:null, action:radios[i].value}
			}else{
				chainEntity.innerHTML += radios[i].value;
				theChain[chainBody.childNodes.length-1] = {
				to:moveField.value, action:radios[i].value}
		}
		}
	}
	//размещение
	if(theChain.length>1){
		leftVal += 80;
	}
	if(theChain.length%6==0){
		chainBody.style.height = parseInt(chainBody.style.height)+80+"px"
		topVal+=80;
		leftVal=0;
	}
	chainEntity.style.left = leftVal+"px";
	chainEntity.style.top = topVal+"px";
	chainBody.appendChild(chainEntity);
	console.log(theChain);
}
function clearChain(){	
	let chainBody = document.getElementsByClassName("chainEntity");
	let i= chainBody.length;
	while (i!=0){
		i--;
	console.log("now removing : "+chainBody[i].innerHTML);
	chainBody[i].remove();
	}
	theChain = [];
	leftVal = 0;
	topVal = 0;
}

	
//anime
let Time, Speed = 3;
function animate(finalTop,finalLeft, action){
	let Robostyle = newRobot.style;
	let currentTop = parseInt(Robostyle.top);
	let currentLeft = parseInt(Robostyle.left);
	let topCompleted = 0;
	//Time = (Math.abs(finalTop-currentTop)+Math.abs(finalLeft-currentLeft))/Speed +1500;
	//console.log("Time to finish task : "+Time);
	
	//top
	if(finalTop>currentTop){
		
		(function iterate(i) {
			timerID1 = setTimeout(function() {	
//console.log("timerID = "+timerID1);			
				if (finalTop>=i && !isObjectFoundOnTrack() && !stopped) {
				Robostyle.top = i+"px";
					iterate(i + 1);
				}else{
					topCompleted=1;
				}
			}, Speed);
		})(currentTop);
		}else{
			(function iterate(i) {
			timerID1 = setTimeout(function() {	
				if (finalTop<=i && !isObjectFoundOnTrack() && !stopped) {	
				Robostyle.top = i+"px";
					iterate(i - 1);		
				}else{
					topCompleted=1;
				}
			}, Speed);
		})(currentTop);
	}
	(function waitForTop(){
		wait = setTimeout(function(){
			if(!topCompleted){
				waitForTop();
			}else{
	//left
		if(finalLeft>currentLeft){
			(function iterate(i) {
			timerID2 = setTimeout(function() {	

//console.log("timerID2 = "+timerID2);		
				if (finalLeft>=i && !isObjectFoundOnTrack() && !stopped) {		
				Robostyle.left = i+"px";
					iterate(i + 1);
				}else{
			sweech(action);
				}
			}, Speed);
		})(currentLeft);
		}else{
			(function iterate(i) {
			timerID2 = setTimeout(function() {	
				if (finalLeft<=i && !isObjectFoundOnTrack() && !stopped) {			
				Robostyle.left = i+"px";
					iterate(i - 1);
				}else{
			sweech(action);
				}
			}, Speed);
			})(currentLeft);
	}	
	
			}
	},1000);})(0)
}

function move(param, action){
	console.log(" p = "+param);
	if(param!=null){
	console.log("Going to "+param+" to "+action);
	//let param = document.getElementById("move").value;
	let Robostyle = newRobot.style;
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
	}else{
		sweech(action);
	}
}


function take(){
	let Robostyle = newRobot.style;
	if(Robostyle.left=="200px" && holding.style.backgroundColor=="white"){
		let colNum = parseInt(Robostyle.top)/100;
		//console.log(colors[colNum]);
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


//go
function handler(){
	stopped = false;
		(function iterate(i) {
	setTimeout(function() {
    	move(theChain[i].to,theChain[i].action);
        if (i < theChain.length-1) {
        	iterate(i + 1);
        }
    }, 7000);
})(0);
	
}

function sweech(val){
	console.log(val+" perfomed");
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
			case "addObject":
			addObject();
			break;
			default:
			console.log("Error in name of action");
		}
}