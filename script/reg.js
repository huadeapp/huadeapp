function reg(){
		function getNowFormatDate() {
			var date = new Date();
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

			document.getElementById('reg').onclick = function() {
				// if (document.getElementById('email').value.length == 0) {
				// 	document.getElementById('email').focus();
				// 	api.toast({
				// 		msg : '邮箱不能为空'
				// 	});
				// 	return;
				// } else 
				if(document.getElementById('name').value.length == 0 || document.getElementById('name').value.length > 15){
					document.getElementById('name').focus();
					api.toast({
						msg : '用户名长度不合规范'
					});
				} else if (document.getElementById('password').value.length == 0 || document.getElementById('password').value.length > 20) {
					document.getElementById('password').focus();
					api.toast({
						msg : '密码长度不合规范！'
					});
					return;
				} else if(document.getElementById('xuehao').value.length != 10){
					document.getElementById('xuehao').focus();
					api.toast({
						msg : '学号长度不合规范！'
					});
				} else {
					// var emailVal = document.getElementById('email').value;
					var nameVal = document.getElementById('name').value;
					var passwordVal = document.getElementById('password').value;
					var xuehaoVal = document.getElementById('xuehao').value;

					// 获取当前时间    格式“yyyy-MM-dd HH:MM:SS”
					var regTime = getNowFormatDate();
					// 将注册信息提交到数据库中(此处应该判断用户名是否已经存在！！！！)
					var ip = $api.getStorage('ip');
					api.ajax({
						//172.17.123.4
						//192.168.64.80
						url: 'http://'+ip+':3000/reg?q='+nameVal+"|"+passwordVal+"|"+xuehaoVal,
						method: 'get',
						timeout: 3,
						dataType: 'json',
						returnAll: false,
					},function(ret,err){
						if(ret){
							// api.toast({msg:(ret)});
            				var obj = JSON.stringify(ret);
            					// api.toast({msg:(obj)});
							if(obj=='["one"]'){
								api.toast({msg:('用户名或学号已存在，注册失败！')});
							}
							if(obj=='["two"]'){
								api.alert({msg:('注册成功！')});	
								api.setPrefs({
									key : 'userinfo',
									value : {
										name : nameVal,
										pwd : passwordVal,
										xuehao:xuehaoVal
										// regtime : regTime
									}
								});
								api.setPrefs({
									key : 'name',
									value : nameVal
										// regtime : regTime
								});
								api.setPrefs({
									key : 'pwd',
									value : passwordVal,								
									
								});
								$api.setStorage('xuehao',xuehaoVal);
								api.setPrefs({
									key : 'xuehao',
									value : xuehaoVal									
								});
																// 广播事件
								api.sendEvent({
									name : 'reg_login_successEvent',
									extra : {
										name : nameVal,
										pwd : passwordVal,
										xuehao:xuehaoVal,					
										regtime : regTime
									}
								});
								// 回到首页
								api.closeToWin({
									name : 'root'
								});
								// api.closeFrame();						
							}

						}else{
			        		api.toast({
		                	msg:'神马年代了还塞网络!',
		                	duration:5000
		            		});
						}
					});
					//数据库操作
					// selectSql(dbname, "select * from User where name='" + nameVal + "';", function(data) {
					// 	if (data && data.length > 0) {
					// 		alert("用户名已存在！");
					// 	} else {
					// 		alert("查询数据库成功，该用户名可以注册");
					// 		// 插入数据
					// 		executeSql(dbname, "insert into User(name,pwd,regtime) values('" + nameVal + "','" + passwordVal + "','" + regTime + "');", function() {
					// 			alert("插入数据库成功，也就是注册成功！");
					// 			// 将注册信息保存到setPrefs中
					// 			api.setPrefs({
					// 				key : 'userinfo',
					// 				value : {
					// 					name : nameVal,
					// 					pwd : passwordVal,
					// 					regtime : regTime
					// 				}
					// 			});
					// 			// 广播事件
					// 			api.sendEvent({
					// 				name : 'reg_login_successEvent',
					// 				extra : {
					// 					name : nameVal,
					// 					pwd : passwordVal,
					// 					regtime : regTime
					// 				}
					// 			});
					// 			// 回到首页
					// 			api.closeToWin({
					// 				name : 'root'
					// 			});
					// 		});
					// 	}
					// });
				}
			}
}