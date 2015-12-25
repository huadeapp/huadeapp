function startzhongchou(){
var xuehao = $api.getStorage('xuehao'); 
if(xuehao!=null){	
		function getNowFormatDate(date) {
			// var date = new Date();
			var seperator1 = "-";
			var seperator2 = ":";
			var month = date.getMonth() + 1;
			var strDate = date.getDate();
			if (month >= 1 && month <= 9) {
				month = "0" + month;
			}
			if (strDate >= 0 && strDate <= 9) {
				strDate = "0" + strDate;
			}
			var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate + " " + date.getHours() + seperator2 + date.getMinutes() + seperator2 + date.getSeconds();
			return currentdate;
		}
		function getEndDate(day){
			var newdate = new Date();
			var newtimems = newdate.getTime();
			var endtimems = newtimems +(day*24*60*60*1000);
			var enddate = new Date(endtimems);
			return getNowFormatDate(enddate);
		}
		function getRadio(){
			var domRadio = document.getElementsByName("radiodemo1");
			var str;
			for(var i=0;i<domRadio.length-1;i++){
				if(domRadio[i].checked){
					str = domRadio[i].value;
					break;
				}
			}
				if(domRadio[domRadio.length-1].checked){
					str = document.getElementById("diy").value;						
				}
			return str;
		}
		var strjine = getRadio();
		var jine = parseFloat(strjine);
		if(document.getElementById('liyou').value.length == 0 || document.getElementById('liyou').value.length > 30){
					// document.getElementById('liyou').focus();
					api.toast({
						msg : '理由字数不合规范'
					});
				} else if(document.getElementById('tianshu').value < 10 || document.getElementById('tianshu').value > 60) {
					// document.getElementById('tianshu').focus();
					api.toast({
						msg : '天数不合规范！'
					});
					return;
				} else if(jine<=0 || jine==null){
					api.toast({
						msg : '贡献金额不能小于0'
					});
				} else {
					var liyou = document.getElementById('liyou').value;
					var tianshu = document.getElementById('tianshu').value;
					// 获取当前时间    格式“yyyy-MM-dd HH:MM:SS”
					var newdate = new Date();
					var regTime = getNowFormatDate(newdate);
					var endTime = getEndDate(tianshu);
					var ip = $api.getStorage('ip');
					api.ajax({
						//172.17.123.4
						//192.168.64.80
						url: 'http://'+ip+':3000/startchou?q='+dimage+"|"+dtitle+"|"+dprice+"|"+disbn+"|"+tianshu+"|"+liyou+"|"+regTime+"|"+endTime,
						method: 'get',
						timeout: 5,
						dataType: 'json',
						returnAll: false
					},function(ret,err){
						if(ret){
	            			var obj = JSON.stringify(ret);
							if(obj=='["one"]'){
								api.toast({msg:(' 发起众筹失败，这本书正在众筹中！')});
							}
							if(obj=='["two"]'){
								api.ajax({
									//172.17.123.4
									//192.168.64.80
									url: 'http://'+ip+':3000/jiachou?q='+xuehao+"|"+disbn+"|"+jine+"|"+regTime,
									method: 'get',
									timeout: 5,
									dataType: 'json',
									returnAll: false
								},function(ret,err){
			            			var obj = JSON.stringify(ret);
									if(obj=='["one"]'){
										api.toast({msg:(' 众筹成功，贡献金额失败！')});
									}
									if(obj=='["two"]'){
										api.alert({msg:('众筹成功！')});	
									    api.openWin({
								        name: 'frame3',
								        url: 'html/footer_tab_3.html'
								        });
								        api.closeWin();
									}									
								});													
								}						
						}else{
			        		api.toast({
		                	msg:'神马年代了还塞网络!',
		                	duration:5000
		            		});
						}
					});

				} 
    }else{
		api.alert({msg:('没有登录！')});	    	
    }
}