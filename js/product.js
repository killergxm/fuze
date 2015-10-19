$(function(){
	var i=1;
	setTimeout(textShow,500);
	function textShow(){
		$('.product-text'+i).show().animate({top:"170px"},300,'easeOutElastic');
		i++;
		if(i<5)
			setTimeout(textShow,1000);
	}
})