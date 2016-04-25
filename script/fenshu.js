function fenshu(rating){
	var rat = Math.round(rating);
	if(rat<2){
		var url = "../image/images/fenshu_01.png";
		var dom=$api.byId('xing');
		$api.attr(dom,"src",url);
	}else{
		var url = "../image/images/fenshu_0"+rat+".gif";
		var dom=$api.byId('xing');
		$api.attr(dom,"src",url);		
	}
	
}