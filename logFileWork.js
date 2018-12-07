$(document).ready(function(){
	var log = "";
	
	$('#logFORM').submit(function(event){
    event.preventDefault();
			var value = $('textarea#logDIV').val();
			 $.ajax({
			  type:'POST',
			  url:'php.php',
			  data:'log='+value,
				 success:function(msg){
					 if(msg=='success'){
						 alert("written to file");
					 }else{
						 alert("!failed to write into file");
					 }
				 }
			 }); 
	return false;
		}		
	);
});