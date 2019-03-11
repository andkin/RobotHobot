function smooth_scrolling(to){
	let current_position = parseInt(window.pageYOffset);
		console.log(current_position);
		setInterval(function(){
			if(current_position>to || current_position<to){
				let diff = to-current_position;
				if(Math.abs(diff)<10){
					current_position=to;
				}else{
					let sign = diff/Math.abs(diff);
					current_position+=sign*3;
				}
				window.scrollTo(0,current_position);
			}
				},1);
}
