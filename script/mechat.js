function meChat(){
var obj = api.require('meChat');
obj.initMeChat({
    appkey:'739306c7ee6abbee6672e887f49976b5'
});
obj.specifyAlloc({
    groupId: '4338'
});
obj.addUserInfo({
    realName:'晓风残月',
    job:'客服服务'
    });
obj.addOtherInfo({
    foo:'bar',
    hello:'world',
    你好:'世界'
});
obj.show();	
}
