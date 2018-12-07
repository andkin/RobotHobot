<?php
if(isset($_POST['log']) && $_POST['log'] != ''){
	$file = 'log.txt';
	// Open the file to get existing content
	$current = file_get_contents($file);
	// Append a new person to the file
	$current .= $_POST['log'];
	// Write the contents back to the file
	file_put_contents($file, $current);
	echo "success";
}else{
	echo "failed";
}
?>