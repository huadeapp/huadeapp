function login(){
			document.getElementById('login').onclick = function() {
				 if (document.getElementById('name').value.length == 0) {
					document.getElementById('name').focus();
					api.toast({
						msg : '用户名不能为空'
					});
					return;
				} else if (document.getElementById('password').value.length == 0) {
					document.getElementById('password').focus();
					api.toast({
						msg : '密码不能为空！'
					});
					return;
				} else {
					var nameVal = document.getElementById('name').value;
					var passwordVal = document.getElementById('password').value;
					var ip = $api.getStorage('ip');
						api.ajax({
						//172.17.123.4
						//192.168.64.80
						url: 'http://'+ip+':3000/login?q='+nameVal+"|"+passwordVal,
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
								api.toast({msg:('用户名或密码错误！')});
							}
							if(ret[0]=="two"){
								// api.toast({msg:('故意用户名或密码错误！'+ret[1])});
								// api.toast({msg:('登陆成功')});
								$api.setStorage('name',nameVal);
								api.setPrefs({
									key : 'name',
									value : nameVal
										// regtime : regTime
								});
								api.setPrefs({
									key : 'pwd',
									value : passwordVal,								
									
								});
								$api.setStorage('xuehao',ret[1]);
								api.setPrefs({
									key : 'xuehao',
									value : ret[1]									
								});
								api.setPrefs({
									key : 'userinfo',
									value : {
										name : nameVal,
										pwd : passwordVal,
										xuehao:	ret[1]									
										// regtime : regTime
									}
								});
								// api.closeFrame();

								// api.setPrefs({
								// key : 'userinfo',
								// value : data[0]
								// });
								// 广播事件
								api.sendEvent({
									name : 'reg_login_successEvent',
									// extra : data[0]
									value : {
										name : nameVal,
										pwd : passwordVal
										// regtime : regTime
									}
								});
								// 回到首页
								api.closeToWin({
									name : 'root'
									// url:'index.html'
								});	
							}
							// if(obj=='["two"]'){
							// 	// api.toast({msg:('登陆成功')});

							// 	api.setPrefs({
							// 		key : 'userinfo',
							// 		value : {
							// 			name : nameVal,
							// 			pwd : passwordVal,
							// 			xuehao:xuehaoVal										
							// 			// regtime : regTime
							// 		}
							// 	});
							// 	// api.closeFrame();

							// 	// api.setPrefs({
							// 	// key : 'userinfo',
							// 	// value : data[0]
							// 	// });
							// 	// 广播事件
							// 	api.sendEvent({
							// 		name : 'reg_login_successEvent',
							// 		// extra : data[0]
							// 		value : {
							// 			name : nameVal,
							// 			pwd : passwordVal
							// 			// regtime : regTime
							// 		}
							// 	});
							// 	// 回到首页
							// 	api.closeToWin({
							// 		name : 'root'
							// 		// url:'index.html'
							// 	});						
							// }

						}else{
							// api.alert({
	      //       			msg:('错误码：'+err.code+'；错误信息：'+err.msg+'网络状态码：'+err.statusCode)
	      //   				});	
	        				api.toast({
		                	msg:'错误!输入正确内容并联网',
		                	duration:5000
		            		});
						}
					});
				}
			}
}