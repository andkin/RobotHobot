<?php
   setlocale( LC_ALL, "fa_IR.UTF-8");
   header('content-type: text/html; charset=utf-8');
?>

<!DOCTYPE html>
<html lang="en_US">
<head>
<title>Visualizacia of Robot</title>
<meta charset="utf-8">
<link rel="stylesheet" href="css2.css">
<meta charset="utf-8">
<script src="script3.js"></script>
<script src="compiler.js"></script>
<script
		src="https://code.jquery.com/jquery-1.12.3.min.js"
		integrity="sha256-aaODHAgvwQW1bFOGXMeX+pC4PZIPsvn2h1sArYOhgXQ="
		crossorigin="anonymous"></script>
	<script src="logFileWork.js"></script>
</head>
<body>

<input type="text" placeholder="Розетки" id="getPorts" value="5">
<input type="text" placeholder="Провода" id="getWires" value="5">
<input type="submit" value="Proceed" onclick="getter()">
	<input type="button" value="reload" onclick="location.reload()">

<div id="field">
	<div id="ports"></div>
	<div id="space"></div>
	<div id="wires"></div>
</div>
<div id="holding"></div>

<div id="control">
	<div id="thechain" style="height:80px;">

	</div>
	<input type="button" value="GO" onclick="go_handler()"><br>
	
	<br>
	<input type="button" name="first" onclick="stopByButton()" value="Остановить"><br>
	<input type="button" name="first" onclick="addObject()" value="Неопределенный объект"><br>
	<input type="button" onclick="removeObject()" value="Удалить объект"><br>
	<form enctype='multipart/form-data' method="post" action="index.php">
	Загрузить код программы<br>
	<input type="file" name="program">
	<input type="submit" value="Загрузить">
	</form>
	<input type="button" onclick="compile()" value="Компилировать"><br>
	Отладчик:
	<div id="IDE">
	<textarea id="fileToCompile" style="width:400px;height:100px;">
		<?php

	if(isset($_FILES['program']) && $_FILES['program']['name']!=null){
		$content = file_get_contents($_FILES['program']['tmp_name']);
		//$content = mb_convert_encoding($content, 'HTML-ENTITIES', "UTF-8");
		$content = iconv('windows-1251', 'utf-8', $content);
		echo $content;
		unset($_FILES['program']);
	}else{
		echo "Файл не выбран";
		//header("Location: index.php");
	}
?>
</textarea><br>
<div id="otladchik">
</div>
	</div>
				<div style="display:none">
					Движение В <input type="text" id="moveto" onchange="" value="b"><br>
					Взять <input type="radio" name="first" checked onchange="" value="take"><br>
					Положить <input type="radio" name="first" onchange="" value="put"><br>
					Подключить <input type="radio" name="first" onchange="" value="plug"><br>
					Отключить <input type="radio" name="first" onchange="" value="unplug"><br>
					<input type="button" onclick="addToChain()" value="Добавить в цепочку событий"><br>
					<input type="button" onclick="clearChain()" value="Новая задача"><br>
					<input type="button" onclick="priorityInterrupt()" value="Прерывания с приоритетами"><br>
					Приоритет первого прерывания<input type="text" id="interrupt1" value="1"><br>
					Приоритет прерывания с объектом<input type="text" id="interrupt2" value="2"><br>
				</div>

</div>

<form id="logFORM" method="post" action="">
<textarea name="logdata" id="logDIV">
</textarea>
<input type="submit" id="goLOG" value="LOG">
</form>

</body>
</html>